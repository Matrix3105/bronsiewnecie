'use strict';

/* ==========================================================
   8. POCZTA
   ========================================================== */
function renderMail() {
  const b = $("#v-ml"); b.innerHTML = "";
  $("#bdg").textContent = S.mails.length ? "(" + S.mails.length + ")" : "";
  if (!S.mails.length) { b.appendChild(el("div", "empty", "Brak nowych wiadomości.")); return; }
  S.mails.forEach(m => {
    const d = el("div", "mail");
    const pb = el("div", "pb"); pb.appendChild(document.createElement("i"));
    const acts = el("div", "mailb");
    const rep = el("button", "", "Zgłoś phishing"), sf = el("button", "", "Bezpieczny");
    rep.onclick = () => answerMail(m, 1); sf.onclick = () => answerMail(m, 0);
    acts.append(rep, sf);
    d.append(el("span", "fr", m.from), el("b", "", m.s), el("div", "", m.b), pb, acts);
    m.el = d; b.appendChild(d);
  });
}

function answerMail(m, saidPhish) {
  S.mails = S.mails.filter(x => x !== m); renderMail();
  if (saidPhish === m.p)  { SFX.ok(); say("Dobra decyzja. " + m.t, "good"); }
  else if (m.p)           { breach("Phishing", "Uwierzyłeś w fałszywy mail. " + m.t); }
  else                    { SFX.bad(); say("Fałszywy alarm, ale bez szkód. " + m.t, "bad"); }
}

function updateMails(dt) {
  if (S.t >= S.nextMail) {
    if (S.mails.length < CFG.mailMax) {
      S.mails.push({...pick(MAILS), age: 0}); renderMail(); SFX.mail();
    }
    S.nextMail = S.t + CFG.mailEvery[S.night - 1] + Math.random() * 4000;
  }
  let changed = false;
  for (const m of [...S.mails]) {
    m.age += dt;
    if (m.age >= CFG.mailTtl) {
      S.mails = S.mails.filter(x => x !== m); changed = true;
      if (m.p) { breach("Phishing", "Zignorowany phishing też bywa groźny. " + m.t); if (!loop) return; }
    } else if (m.el) {
      m.el.querySelector(".pb i").style.width = (100 - m.age / CFG.mailTtl * 100) + "%";
    }
  }
  if (changed) renderMail();
}
