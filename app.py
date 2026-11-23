import os, sqlite3
from flask import Flask, jsonify, render_template, request

app = Flask(__name__)
DB = os.path.join(os.path.dirname(__file__), "sparkstream.db")

# Loads are served in priority order: life-saving first.
LOADS = [("Clinic vaccine fridge", 0.15, "clinic"), ("School lights & laptops", 0.5, "school"),
         ("Village water pump", 0.75, "pump"), ("Phone charging hub", 0.3, "hub")]
HOME_KW, CAPACITY, CO2_KG_KWH, DIESEL_USD_KWH, EFF = 0.15, 0.85, 0.8, 0.35, 0.6

def db():
    c = sqlite3.connect(DB); c.row_factory = sqlite3.Row
    c.execute("""CREATE TABLE IF NOT EXISTS plans(id INTEGER PRIMARY KEY, name TEXT,
                 lat REAL, lng REAL, kw REAL, homes INT, co2 REAL)""")
    return c

def calc(flow_lps, head_m):
    """P = rho * g * Q * H * efficiency  (rho folded in: 1000 kg/m3 -> kW)."""
    kw = 9.81 * (flow_lps / 1000) * head_m * EFF
    avg, powered = kw * CAPACITY, []
    for name, need, key in LOADS:
        if avg >= need:
            powered.append({"name": name, "key": key}); avg -= need
    homes = int(avg // HOME_KW)
    kwh = kw * CAPACITY * 24 * 30
    return {"kw": round(kw, 2), "kwh_month": round(kwh), "powered": powered, "homes": homes,
            "co2_tonnes_year": round(kwh * 12 * CO2_KG_KWH / 1000, 1),
            "usd_saved_year": round(kwh * 12 * DIESEL_USD_KWH)}

@app.route("/")
def index():
    return render_template("index.html")

@app.post("/api/calc")
def api_calc():
    d = request.get_json(force=True)
    return jsonify(calc(float(d["flow"]), float(d["head"])))

@app.route("/api/world")
def world():
    with db() as c:
        pins = [dict(r) for r in c.execute("SELECT name,lat,lng,kw,homes FROM plans ORDER BY id DESC LIMIT 300")]
        t = c.execute("SELECT COUNT(*) n, COALESCE(SUM(homes),0) h, COALESCE(SUM(co2),0) co FROM plans").fetchone()
    return jsonify({"pins": pins, "plans": t["n"], "homes": t["h"], "co2": round(t["co"], 1)})

@app.post("/api/plans")
def save_plan():
    d = request.get_json(force=True)
    r = calc(float(d["flow"]), float(d["head"]))
    name = (d.get("name") or "Unnamed village")[:40]
    with db() as c:
        c.execute("INSERT INTO plans(name,lat,lng,kw,homes,co2) VALUES(?,?,?,?,?,?)",
                  (name, float(d["lat"]), float(d["lng"]), r["kw"], r["homes"], r["co2_tonnes_year"]))
    return world()

if __name__ == "__main__":
    app.run(debug=True)
