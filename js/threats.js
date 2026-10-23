'use strict';

function nowyAlert() {
  const f = fab();
  const wolne = ZAGROZENIA.filter(h => (h.from <= poz() || f.faworyci.includes(h.id)) && !stan.aktywne.some(a => a.zag === h));
  let pula = wolne.filter(h => !stan.ostatnieZag.includes(h));   // nie powtarzaj ostatnich
  if (!pula.length) pula = wolne;
  if (!pula.length) return;

  const najnowsze = pula.filter(h => h.from === stan.dzien);
  const ulubione = pula.filter(h => f.faworyci.includes(h.id));
  const wazone = pula.flatMap(h => f.faworyci.includes(h.id) ? [h, h, h] : [h]);
  const pierwsze = stan.dzien === 1 ? ulubione : najnowsze;
  const zag = (stan.pojawione === 0 && pierwsze.length) ? losuj(pierwsze) : losuj(wazone);
  stan.pojawione++;
  stan.ostatnieZag.push(zag); if (stan.ostatnieZag.length > 3) stan.ostatnieZag.shift();
  stan.aktywne.push({zag, m: 0, f: 1, alarm: 0, elem: null});
  rysujAlerty(); DZWIEKI.alarm(); komunikat("Nowy alert: " + zag.nazwa + ".", "bad");
}

function rysujAlerty() {
  const b = $("#v-al"); b.innerHTML = "";
  if (!stan.aktywne.length) { b.appendChild(elem("div", "empty", "Spokojnie. Brak alertów.")); return; }
  stan.aktywne.forEach(a => {
    const d = elem("div", "al"), n = elem("div", "n");
    n.append(elem("b", "", a.zag.nazwa), elem("small", "", opisAlertu(a.zag)));
    const pasek = elem("div", "bar"); pasek.appendChild(document.createElement("i")); n.appendChild(pasek);
    const przycisk = elem("button", "a", "Reaguj"); przycisk.onclick = () => otworzZadanie(a);
    d.append(n, przycisk); a.elem = d; b.appendChild(d);
  });
}

function usunAlert(a) {
  stan.aktywne = stan.aktywne.filter(x => x !== a);
  rysujAlerty();
}

function aktualizujAlerty(delta) {
  const tempo = USTAW.tempoWzrostu[poz() - 1] * faza().tempo;
  for (const a of [...stan.aktywne]) {
    if (a === stan.zadanie) continue;
    if (Math.random() < .02) a.f = .7 + Math.random() * .6;
    a.m += tempo * a.f * delta;
    if (a.m >= 75 && !a.alarm) { a.alarm = 1; DZWIEKI.alarm(); }
    if (a.m >= 100) {
      usunAlert(a);
      wlamanie(a.zag.nazwa + ": nie zdążyłeś zareagować", a.zag.porada);
      if (!petla) return;
    }
  }
}
