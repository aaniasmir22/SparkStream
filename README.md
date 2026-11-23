<div align="center">

# 🌾 SparkStream 🌾

### *Every stream a power source.*

<img src="screenshots/hero.png" alt="SparkStream pixel village at sunset" width="720">

<br>

![Python](https://img.shields.io/badge/Python-3.10+-9ccc65?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.x-8a5a3b?style=for-the-badge&logo=flask&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-Database-f4a6b8?style=for-the-badge&logo=sqlite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Canvas-ffd54a?style=for-the-badge&logo=javascript&logoColor=black)
![SDG 7](https://img.shields.io/badge/SDG-7_Clean_Energy-fcc30b?style=for-the-badge)

**[🌻 Live Demo](YOUR-LIVE-LINK)** · **[🎬 Demo Video](YOUR-VIDEO-LINK)** · **[📖 About](#-about)**

*Built for the Acodemic × KeebsforWater Global SDG Hackathon*

</div>

---

## 🌿 About

Roughly **700 million people** still live without electricity, and many of them live right beside a stream that could power their homes. The water is already there. What's missing is a simple answer to:

> *"Could my stream power something, and what?"*

**SparkStream** answers that in under a minute. Enter your stream's **flow** and **drop height**, and a Python engine applies real hydropower physics. A pixel-art village then lights up to show what that power could run. 🏡💡

---

## 🕯️ Who gets power first?

SparkStream doesn't just count homes. It serves the community's most important needs in priority order:

| Order | Building | Why it matters |
|:---:|---|---|
| 🏥 1 | Clinic vaccine fridge | Refrigeration protects lives |
| 🏫 2 | School lights and laptops | Learning continues after dark |
| 💧 3 | Village water pump | Clean water without fuel |
| 📱 4 | Phone charging hub | Connection to markets and family |
| 🏡 5 | Homes | Whatever power is left |

---

## ✨ Features

- 🌊 **Live calculator**: sliders for flow and head update the village in real time
- 🎡 **Animated waterwheel**: spins faster as power output grows
- 🌅 **Pixel-art village**: drawn entirely in code with HTML Canvas, no image assets
- 📓 **Village journal**: kW produced, homes lit, CO₂ avoided, and diesel savings
- 🗺️ **Global Spark Map**: plant a glowing pin for your stream and watch the world counter grow
- 🪣 **Beginner guide**: measure your stream with a bucket and a stopwatch

---

## 🌍 SDG Alignment

| SDG | How SparkStream helps |
|:---:|---|
| **7** ⚡ | Makes renewable energy planning accessible to off-grid communities |
| **1** 🌱 | Shows how much diesel spending a community could avoid |
| **3** 💚 | Prioritizes vaccine refrigeration at the clinic |
| **4** 📚 | Powers schools first, and teaches how hydropower works |
| **13** 🌎 | Estimates CO₂ avoided versus diesel generation |

**Example:** 60 L/s with a 20 m drop gives about **7 kW**, enough for all four community buildings plus about **28 homes**, avoiding about **41 tonnes of CO₂ a year**.

---

## 🧮 The Science

```
P = ρ · g · Q · H · η
```

| Symbol | Meaning | Value used |
|:---:|---|---|
| ρ | Density of water | 1000 kg/m³ |
| g | Gravity | 9.81 m/s² |
| Q | Flow rate | user input (L/s) |
| H | Head, the vertical drop | user input (m) |
| η | System efficiency | 60% |

**Other assumptions** (all editable at the top of `app.py`):

| Assumption | Value |
|---|---|
| Uptime (capacity factor) | 85% |
| Average home demand | 0.15 kW |
| Diesel emissions | 0.8 kg CO₂ per kWh |
| Diesel cost | $0.35 per kWh |

> 🌱 SparkStream is a **first-look estimator**, not an engineering survey. Real projects need on-site measurement and a qualified engineer.

---

## 🛠️ Built With

| 🌾 Area | Tools |
|---|---|
| Backend | Python, Flask, SQLite |
| Frontend | HTML5, CSS3, vanilla JavaScript, Canvas API |
| Map | Leaflet.js, OpenStreetMap |
| Fonts | Pixelify Sans, Lora (Google Fonts) |
| Dev tools | VS Code, Git and GitHub |
| AI assistance | Claude (Anthropic) for ideation, code drafting, and copywriting |

---

## 🏡 Run It Locally

```bash
# 1. Clone the repo
git clone https://github.com/YOUR-USERNAME/sparkstream.git
cd sparkstream

# 2. Install dependencies
pip install -r requirements.txt

# 3. Start the app
python app.py
```

Then open **http://127.0.0.1:5000** 🌻

> 🪟 On Windows, if `python` isn't recognized, use `py -m pip install -r requirements.txt` and `py app.py`.

---

## 🗂️ Project Structure

```
sparkstream/
├── app.py              # Flask server, physics engine, SQLite
├── requirements.txt
├── templates/
│   └── index.html      # The village page
└── static/
    ├── style.css       # Cottagecore styling
    └── app.js          # Canvas village, calculator, map
```

---

## 🔌 API

| Method | Endpoint | What it does |
|:---:|---|---|
| `POST` | `/api/calc` | Takes `flow` and `head`, returns power, homes, CO₂, and savings |
| `GET` | `/api/world` | Returns all map pins and world totals |
| `POST` | `/api/plans` | Saves a village pin to the map |

---

## 📸 Screenshots

| The Village | Village Journal | Global Spark Map |
|:---:|:---:|:---:|
| <img src="screenshots/village.png" width="260"> | <img src="screenshots/journal.png" width="260"> | <img src="screenshots/map.png" width="260"> |

---

## 🎨 Design Notes

SparkStream borrows the warmth of cozy farming games and cottagecore illustration. Energy tools often feel like intimidating engineering dashboards, and a hand-crafted world makes the numbers feel friendly.

- 🌅 Peach and pink sunset sky, meadow greens, warm wood
- 🪵 Wooden-sign headers and parchment "journal" panels
- 🎡 Motion that carries meaning: the wheel speeds up with power and windows light up in priority order
- 🔤 Pixelify Sans for charm, Lora for readability

---

## 🌱 Roadmap

- [ ] 🌐 Hindi and Spanish language switcher
- [ ] 🖼️ Shareable Impact Card image
- [ ] 🌧️ Seasonal flow estimates from rainfall data
- [ ] ⚙️ Turbine type recommendations
- [ ] 📴 Offline mode for low-connectivity regions
- [ ] 🌙 Day and night cycle

---

## 🤝 Contributing

Ideas, bug reports, and pull requests are welcome. Open an issue to start a conversation. 🌼

---

## 📜 License

Released under the MIT License. See `LICENSE` for details.

---

<div align="center">

### 🌻 Made with care for a brighter, cleaner world 🌻

*Because the water is already there.*

**By [YOUR-NAME](https://github.com/YOUR-USERNAME)**

</div>
