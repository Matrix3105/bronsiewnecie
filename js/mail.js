'use strict';

function rysujPoczte() {
  const b = $("#v-ml"); b.innerHTML = "";
  $("#bdg").textContent = stan.maile.length ? "(" + stan.maile.length + ")" : "";
  if (!stan.maile.length) { b.appendChild(elem("div", "empty", "Brak nowych wiadomości.")); return; }
  stan.maile.forEach(m => {
    const d = elem("div", "mail");
    const pb = elem("div", "pb"); pb.appendChild(document.createElement("i"));
    const akcje = elem("div", "mailb");
    const zglos = elem("button", "", "Zgłoś phishing"), bezpieczny = elem("button", "", "Bezpieczny");
    zglos.onclick = () => odpowiedzNaMaila(m, 1); bezpieczny.onclick = () => odpowiedzNaMaila(m, 0);
    akcje.append(zglos, bezpieczny);
    d.append(elem("span", "fr", m.from), elem("b", "", m.s), elem("div", "", m.b), pb, akcje);
    m.elem = d; b.appendChild(d);
  });
}

function odpowiedzNaMaila(m, zgloszonoPhishing) {
  stan.maile = stan.maile.filter(x => x !== m); rysujPoczte();
  if (zgloszonoPhishing === m.p) {
    const pkt = pktZa(USTAW.punktyMail); stan.maileOk++; stan.pkt += pkt;
    DZWIEKI.dobrze(); komunikat("Dobra decyzja. " + m.t + " +" + pkt, "good");
  } else if (m.p) {
    wlamanie("Phishing", "Uwierzyłeś w fałszywy mail. " + m.t);
  } else {
    stracZycie("Fałszywy alarm: to był bezpieczny mail. −1 ♥ " + m.t, "Nie każdy mail to phishing. Sprawdź nadawcę, link i to, czy ktoś o coś prosi. " + m.t, DZWIEKI.blad);
  }
}

function aktualizujMaile(delta) {
  if (stan.t >= stan.nastepnyMail) {
    if (stan.maile.length < USTAW.maxMaili) {
      stan.maile.push({...nastepny("maile", pulaMaili()), wiek: 0}); rysujPoczte(); DZWIEKI.poczta();
    }
    stan.nastepnyMail = stan.t + (USTAW.odstepMaili[poz() - 1] + Math.random() * 4000) * faza().odstep;
  }
  let zmieniono = false;
  for (const m of [...stan.maile]) {
    m.wiek += delta;
    if (m.wiek >= USTAW.czasNaMaila) {
      stan.maile = stan.maile.filter(x => x !== m); zmieniono = true;
      if (m.p) { wlamanie("Phishing", "Zignorowany phishing też bywa groźny. " + m.t); if (!petla) return; }
    } else if (m.elem) {
      m.elem.querySelector(".pb i").style.width = (100 - m.wiek / USTAW.czasNaMaila * 100) + "%";
    }
  }
  if (zmieniono) rysujPoczte();
}
