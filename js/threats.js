'use strict';

/* ==========================================================
   7. ALERTY
   ========================================================== */
function spawnThreat() {
  const pool = THREATS.filter(h => h.from <= S.night && !S.active.some(a => a.th === h));
  if (!pool.length) return;
  // pierwszy alert nocy to najnowsze zagrożenie, żeby od razu je poznać
  const fresh = pool.filter(h => h.from === S.night);
  const th = (S.spawned === 0 && fresh.length) ? pick(fresh) : pick(pool);
  S.spawned++;
  S.active.push({th, m: 0, f: 1, alarm: 0, el: null});
  renderAlerts(); SFX.alarm(); say("Nowy alert: " + th.name + ".", "bad");
}

function renderAlerts() {
  const b = $("#v-al"); b.innerHTML = "";
  if (!S.active.length) { b.appendChild(el("div", "empty", "Spokojnie. Brak alertów.")); return; }
  S.active.forEach(a => {
    const d = el("div", "al"), n = el("div", "n");
    n.append(el("b", "", a.th.name), el("small", "", a.th.desc));
    const bar = el("div", "bar"); bar.appendChild(document.createElement("i")); n.appendChild(bar);
    const btn = el("button", "a", "Reaguj"); btn.onclick = () => openTask(a);
    d.append(n, btn); a.el = d; b.appendChild(d);
  });
}

function removeAlert(a) {
  S.active = S.active.filter(x => x !== a);
  renderAlerts();
}

function updateThreats(dt) {
  const rate = CFG.threatRate[S.night - 1];
  for (const a of [...S.active]) {
    if (a === S.task) continue;                          // zagrożenie, którym się zajmujesz, stoi w miejscu
    if (Math.random() < .02) a.f = .7 + Math.random() * .6;
    a.m += rate * a.f * dt;
    if (a.m >= 75 && !a.alarm) { a.alarm = 1; SFX.alarm(); }
    if (a.m >= 100) {
      removeAlert(a);
      breach(a.th.name, a.th.tip);
      if (!loop) return;
    }
  }
}
