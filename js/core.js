'use strict';

/* ==========================================================
   3. POMOCNICZE FUNKCJE
   ========================================================== */
const $ = s => document.querySelector(s);
const pick = a => a[Math.floor(Math.random() * a.length)];
const shuffle = a => a.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(x => x[1]);
const rand6 = () => String(100000 + Math.floor(Math.random() * 900000));

// szybkie tworzenie elementów (tekst zawsze przez textContent)
function el(tag, cls, txt) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (txt != null) e.textContent = txt;
  return e;
}

/* ==========================================================
   5. STAN GRY, ZAPIS, EKRANY
   ========================================================== */
let S = null;          // stan bieżącej nocy
let loop = null;       // id interwału pętli gry
let lastTip = "";      // lekcja pokazana po porażce

function save(n) { try { localStorage.setItem("cybernoc", String(n)); } catch (e) {} }
function load()  { try { return parseInt(localStorage.getItem("cybernoc")) || 1; } catch (e) { return 1; } }

function show(id) {
  document.querySelectorAll(".screen").forEach(e => e.classList.toggle("on", e.id === id));
  if (id === "s-game") fit();
}
// skaluje scenę 1000×560 tak, by wypełniła całe okno pod paskiem (z zachowaniem proporcji)
function fit() {
  const st = $("#stage"), W = st.clientWidth, H = st.clientHeight;
  if (!W || !H) return;
  const k = Math.min(W / 1000, H / 560);
  const ox = (W - 1000 * k) / 2, oy = (H - 560 * k) / 2;
  $("#room").style.transform = "translate(" + ox + "px," + oy + "px) scale(" + k + ")";
  st.style.setProperty("--k", k);
  $("#floor").style.top = (oy + 410 * k) + "px";     // 410 = górna krawędź biurka w pokoju
}
new ResizeObserver(fit).observe($("#stage"));
addEventListener("resize", fit);

function say(t, c) { const s = $("#st"); s.textContent = "> " + t; s.className = c || ""; }
function later(fn, ms) { S.tt.push(setTimeout(fn, ms)); }   // timery zadań (czyszczone przy zamknięciu zadania)

function view(v) {
  ["al", "ml", "task"].forEach(x => $("#v-" + x).style.display = x === v ? "block" : "none");
  $("#t-al").classList.toggle("on", v === "al" || v === "task");
  $("#t-ml").classList.toggle("on", v === "ml");
  SFX.click();
}

/* ==========================================================
   6. START NOCY
   ========================================================== */
function start(n) {
  ac();
  S = {
    night: n, t: 0, hp: CFG.hp,
    active: [],                 // aktywne alerty: {th, m (0-100), f (zmienność), alarm, el}
    mails: [], nextMail: 7000,
    nextSpawn: 2500, spawned: 0,
    last: performance.now(),
    tt: [], task: null, code: "", need: 0
  };
  $("#nl").textContent = "Noc " + n + "/" + CFG.nights;
  renderAlerts(); renderMail(); view("al"); say("Noc się zaczęła. Czekaj na alerty.");
  show("s-game");
  clearInterval(loop); loop = setInterval(tick, 100);
  startHum();
}
