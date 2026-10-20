'use strict';

/* ==========================================================
   10. PĘTLA GRY, WŁAMANIA, KONIEC NOCY
   ========================================================== */
function breach(what, tip) {
  S.hp--; SFX.breach();
  const r = $("#stage");
  r.classList.remove("shake"); $("#flash").classList.remove("on"); void r.offsetWidth;
  r.classList.add("shake"); $("#flash").classList.add("on");
  say("WŁAMANIE: " + what + "! Zabezpieczenia −1.", "bad");
  if (S.hp <= 0) { stopLoop(); lastTip = tip; lose(); }
}

function tick() {
  const now = performance.now(), dt = Math.min(.5, (now - S.last) / 1000);
  S.last = now; S.t += dt * 1000;

  // nowy alert
  if (S.t >= S.nextSpawn) {
    if (S.active.length < CFG.maxActive[S.night - 1]) spawnThreat();
    S.nextSpawn = S.t + CFG.spawnEvery[S.night - 1] + Math.random() * 3000;
  }
  updateThreats(dt); if (!loop) return;
  updateMails(dt);   if (!loop) return;

  draw();
  if (S.t >= 6 * CFG.hourMs && S.hp > 0) win();
}

function draw() {
  const h = Math.min(6, Math.floor(S.t / CFG.hourMs)), mm = Math.floor((S.t % CFG.hourMs) / CFG.hourMs * 60);
  $("#clock").textContent = (h === 0 ? 12 : h) + ":" + String(mm).padStart(2, "0") + " AM";
  $("#prog").style.width = Math.min(100, S.t / (6 * CFG.hourMs) * 100) + "%";
  $("#hp").textContent = "■".repeat(Math.max(0, S.hp)) + "□".repeat(Math.max(0, CFG.hp - S.hp));
  for (const a of S.active) {
    if (!a.el) continue;
    a.el.querySelector(".bar i").style.width = Math.min(100, a.m) + "%";
    a.el.classList.toggle("warn", a.m >= 50 && a.m < 75);
    a.el.classList.toggle("crit", a.m >= 75);
  }
}

function stopLoop() { clearInterval(loop); loop = null; if (S) S.tt.forEach(clearTimeout); stopHum(); }

function win() {
  stopLoop();
  const n = S.night; save(Math.min(CFG.nights, n + 1));
  $("#m-lesson").textContent = LESSONS[n - 1];
  tone(523, .2, "triangle", .07); tone(659, .2, "triangle", .07, .2); tone(784, .4, "triangle", .07, .4);
  if (n >= CFG.nights) {
    $("#m-title").textContent = "Przetrwałeś! 6:00 AM";
    $("#m-text").textContent = "Konto bezpieczne po pięciu nocach. Hakerzy poszli szukać łatwiejszych celów.";
    $("#m-btn").textContent = "Zagraj od nowa"; $("#m-btn").onclick = () => start(1);
  } else {
    $("#m-title").textContent = "6:00 AM. Noc " + n + " za Tobą";
    $("#m-text").textContent = "Zostało " + (CFG.nights - n) + " nocy. Będzie trochę trudniej.";
    $("#m-btn").textContent = "Noc " + (n + 1); $("#m-btn").onclick = () => start(n + 1);
  }
  show("s-msg");
}

function lose() {
  const n = S.night;
  $("#m-title").textContent = "Konto przejęte";
  $("#m-text").textContent = "Zabezpieczenia padły o " + $("#clock").textContent + ".";
  $("#m-lesson").textContent = "Czego uczy ta porażka: " + lastTip;
  $("#m-btn").textContent = "Spróbuj jeszcze raz (noc " + n + ")"; $("#m-btn").onclick = () => start(n);
  show("s-msg");
}

function home() {
  if (loop) stopLoop(); else stopHum();
  const n = load();
  $("#b-cont").style.display = n > 1 ? "inline-block" : "none";
  $("#b-cont").textContent = "Kontynuuj od nocy " + n;
  show("s-start");
}
