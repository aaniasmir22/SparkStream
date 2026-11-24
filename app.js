const $ = s => document.querySelector(s);
let res = null, pick = null, t = 0, lastKw = 0;
const cv = $('#scene'), cx = cv.getContext('2d');
const R = (x, y, w, h, c) => { cx.fillStyle = c; cx.fillRect(x | 0, y | 0, w, h); };

// ---------- pixel village ----------
function house(x, y, w, h, roof, lit) {
  R(x, y, w, h, '#f6e7cf'); R(x - 2, y - 6, w + 4, 6, roof); R(x - 1, y - 8, w + 2, 2, roof);
  R(x + w / 2 - 3, y + h - 9, 6, 9, '#8a5a3b');
  if (lit) { cx.globalAlpha = .28; R(x - 3, y - 2, w + 6, h + 4, '#ffe27a'); cx.globalAlpha = 1; }
  R(x + 3, y + 4, 5, 5, lit ? '#ffe27a' : '#7b6a7d');
  if (w > 20) R(x + w - 8, y + 4, 5, 5, lit ? '#ffe27a' : '#7b6a7d');
}
function wheel(x, y, speed) {
  const a = t * speed;
  for (let s = 0; s < 6; s++) for (let r = 2; r < 14; r++) {
    const an = a + s * Math.PI / 3; R(x + Math.cos(an) * r, y + Math.sin(an) * r, 2, 2, '#8a5a3b');
  }
  for (let r = 0; r < 360; r += 20) { const an = r * Math.PI / 180; R(x + Math.cos(an) * 14, y + Math.sin(an) * 14, 2, 2, '#6b4328'); }
  R(x - 2, y - 2, 4, 4, '#4a3226');
}
function draw() {
  t += .016;
  ['#ffd0a0', '#ffc3a3', '#f9b9b0', '#ffe0a8', '#fff0b8'].forEach((c, i) => R(0, i * 20, 320, 22, c));
  R(18, 14, 18, 18, '#fff3a0'); R(22, 10, 10, 26, '#fff3a0'); R(14, 18, 26, 10, '#fff3a0');
  [[40, 40], [200, 28], [260, 52]].forEach(([x, y]) => { const o = (t * 4 + x) % 360 - 20; R(o, y, 28, 6, '#fff'); R(o + 6, y - 4, 16, 4, '#fff'); });
  R(0, 98, 320, 12, '#a9d27a'); R(0, 110, 320, 42, '#9ccc65');
  for (let i = 0; i < 40; i++) { const fx = (i * 83) % 320, fy = 112 + (i * 37) % 36; R(fx, fy, 2, 2, i % 3 ? '#f4a6b8' : '#fff'); }
  R(0, 150, 320, 30, '#6fc3d6');
  for (let i = 0; i < 14; i++) R(((i * 47 + t * 40) % 340) - 10, 154 + (i * 11) % 22, 12, 2, '#bfeaf2');
  R(0, 148, 320, 3, '#c99668');
  const on = k => res && res.powered.some(p => p.key === k);
  house(62, 92, 22, 24, '#e57373', on('clinic'));  R(70, 96, 6, 2, '#e53935'); R(72, 94, 2, 6, '#e53935');
  house(100, 88, 30, 28, '#7986cb', on('school'));
  R(142, 104, 14, 12, '#a0a0a8'); R(144, 106, 10, 6, on('pump') ? '#6fc3d6' : '#555'); R(141, 96, 2, 10, '#8a5a3b'); R(155, 96, 2, 10, '#8a5a3b'); R(141, 94, 16, 3, '#8a5a3b');
  house(168, 96, 18, 20, '#ffb74d', on('hub'));
  const n = res ? res.homes : 0;
  for (let i = 0; i < 4; i++) house(200 + i * 28, 98, 20, 18, i % 2 ? '#f48fb1' : '#e57373', i < n);
  wheel(36, 140, .6 + Math.min(lastKw, 30) * .35);
  requestAnimationFrame(draw);
}

// ---------- calculator ----------
let timer;
async function update() {
  const flow = +$('#flow').value, head = +$('#head').value;
  $('#qv').textContent = flow; $('#hv').textContent = head;
  clearTimeout(timer);
  timer = setTimeout(async () => {
    const r = await fetch('/api/calc', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ flow, head }) });
    res = await r.json(); lastKw = res.kw;
    $('#kw').textContent = res.kw; $('#homes').textContent = res.homes; $('#co2').textContent = res.co2_tonnes_year;
    $('#usd').textContent = `Compared with diesel, that is about $${res.usd_saved_year.toLocaleString()} saved every year.`;
    const all = [['clinic', 'Clinic vaccine fridge'], ['school', 'School lights & laptops'], ['pump', 'Village water pump'], ['hub', 'Phone charging hub']];
    $('#loads').innerHTML = all.map(([k, n]) => `<li class="${on(k) ? 'on' : 'off'}">${on(k) ? '💡' : '🌙'} ${n}</li>`).join('');
    function on(k) { return res.powered.some(p => p.key === k); }
    $('#banner').textContent = res.homes + res.powered.length === 0
      ? 'Not enough power yet. Try more flow or a bigger drop.'
      : `This stream could power ${res.homes} homes${res.powered.length ? ' and ' + res.powered.length + ' community buildings' : ''}!`;
  }, 120);
}
['flow', 'head'].forEach(id => $('#' + id).addEventListener('input', update));

// ---------- world map ----------
const map = L.map('map').setView([20, 78], 3);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(map);
const layer = L.layerGroup().addTo(map);
const icon = L.divIcon({ className: '', html: '<div class="spark">✨</div>', iconSize: [22, 22] });
function showWorld(w) {
  layer.clearLayers();
  w.pins.forEach(p => L.marker([p.lat, p.lng], { icon }).addTo(layer).bindPopup(`<b>${p.name.replace(/</g, '&lt;')}</b><br>${p.kw} kW · ${p.homes} homes`));
  $('#wp').textContent = w.plans; $('#wh').textContent = w.homes; $('#wc').textContent = w.co2;
}
let me;
map.on('click', e => { pick = e.latlng; me && map.removeLayer(me); me = L.marker(pick).addTo(map); });
$('#plant').onclick = async () => {
  if (!pick) { $('#banner').textContent = 'Click the map first to place your stream.'; return; }
  const r = await fetch('/api/plans', { method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: $('#vname').value, lat: pick.lat, lng: pick.lng, flow: +$('#flow').value, head: +$('#head').value }) });
  showWorld(await r.json()); me && map.removeLayer(me); pick = null; $('#banner').textContent = 'Pin planted! Your village is on the map.';
};
fetch('/api/world').then(r => r.json()).then(showWorld);
update(); draw();
