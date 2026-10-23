'use strict';

// Zwykłe maile nie mają limitu czasu: ignorowanie ich nic nie kosztuje (ale nie daje też punktów).
// Serce kosztuje zła ocena maila. Pilne maile to prawdziwe alarmy: mają czas i konkretną akcję.

function rysujPoczte() {
  const b = $("#v-ml"); b.innerHTML = "";
  if (!stan.maile.length) { b.appendChild(elem("div", "empty", "Brak nowych wiadomości.")); return; }
  [...stan.maile].sort((a, c) => (c.pilne ? 1 : 0) - (a.pilne ? 1 : 0)).forEach(m => {
    const d = elem("div", "mail" + (m.pilne ? " pilne" : ""));
    if (m.pilne) {
      const pb = elem("div", "pb"); pb.appendChild(document.createElement("i"));
      const akcje = elem("div", "mailb");
      m.opcje.forEach(o => {
        const x = elem("button", "", o[0]); x.onclick = () => odpowiedzNaPilny(m, o);
        akcje.appendChild(x);
      });
      d.append(elem("small", "etyk", "Pilne: masz ograniczony czas"), elem("span", "fr", m.from), elem("b", "", m.s), elem("div", "", m.b), pb, akcje);
    } else {
      const akcje = elem("div", "mailb");
      const zglos = elem("button", "", "Zgłoś phishing"), bezpieczny = elem("button", "", "Bezpieczny");
      zglos.onclick = () => odpowiedzNaMaila(m, 1); bezpieczny.onclick = () => odpowiedzNaMaila(m, 0);
      akcje.append(zglos, bezpieczny);
      d.append(elem("span", "fr", m.from), elem("b", "", m.s), elem("div", "", m.b));
      if (m.zal) {
        const z = elem("div", "zal"), ot = elem("button", "", m.otwarty ? "Otwarty" : "Otwórz załącznik");
        ot.disabled = !!m.otwarty; ot.onclick = () => otworzZalacznik(m);
        z.append(elem("span", "", "Załącznik: " + m.zal.n), ot);
        d.appendChild(z);
      }
      d.appendChild(akcje);
    }
    m.elem = d; b.appendChild(d);
  });
}

function otworzZalacznik(m) {
  DZWIEKI.klik(); m.otwarty = 1;
  if (m.zal.zly) {
    pulpit.nowyPlik({n: m.zal.n, z: "Źródło: załącznik od „" + m.from + "”. Brak podpisu cyfrowego."});
    komunikat("Otworzyłeś załącznik i na pulpicie pojawił się podejrzany plik. Przeskanuj komputer antywirusem.", "bad");
  } else {
    komunikat("To zwykły dokument. Nic się nie stało.");
  }
  rysujPoczte();
}

function odpowiedzNaMaila(m, zgloszonoPhishing) {
  stan.maile = stan.maile.filter(x => x !== m); rysujPoczte();
  if (zgloszonoPhishing === m.p) {
    const pkt = pktZa(USTAW.punktyMail); stan.maileOk++; stan.pkt += pkt;
    DZWIEKI.dobrze(); komunikat("Dobra decyzja. " + m.t + " +" + pkt, "good");
  } else if (m.p) {
    wlamanie("Uwierzyłeś w phishing: mail „" + m.s + "” był oszustwem", "Uwierzyłeś w fałszywy mail. " + m.t);
  } else {
    stracZycie("Fałszywy alarm: to był bezpieczny mail. Tracisz serce. " + m.t, "Nie każdy mail to phishing. Sprawdź nadawcę, link i to, czy ktoś o coś prosi. " + m.t, DZWIEKI.blad);
  }
}

function odpowiedzNaPilny(m, opcja) {
  stan.maile = stan.maile.filter(x => x !== m); rysujPoczte();
  if (opcja[1]) {
    const pkt = pktZa(USTAW.punktyPilny); stan.maileOk++; stan.pkt += pkt;
    DZWIEKI.dobrze(); komunikat("Alarm obsłużony. " + m.t + " +" + pkt, "good");
  } else {
    stracZycie("Zła reakcja na alarm. Tracisz serce. " + m.blad, m.t, DZWIEKI.blad);
  }
}

function losujMaila() {
  for (let i = 0; i < 10; i++) {
    const m = nastepny("maile", pulaMaili());
    if (!(m.zal && poz() < 2)) return m;   // załączniki dopiero od drugiego dnia
  }
  return null;
}

function dodajPilny() {
  const m = nastepny("pilne", PILNE);
  stan.maile.push({...m, pilne: 1, wiek: 0, czas: USTAW.czasPilnego[poz() - 1], opcje: pomieszaj(m.opcje)});
  rysujPoczte(); DZWIEKI.alarm();
  komunikat("Pilny mail: „" + m.s + "”. Otwórz Pocztę i zareaguj, zanim minie czas.", "bad");
}

function aktualizujMaile(delta) {
  if (stan.t >= stan.nastepnyMail) {
    if (stan.maile.filter(m => !m.pilne).length < USTAW.maxMaili) {
      const m = losujMaila();
      if (m) { stan.maile.push({...m, wiek: 0, otwarty: 0}); rysujPoczte(); DZWIEKI.poczta(); }
    }
    stan.nastepnyMail = stan.t + (USTAW.odstepMaili[poz() - 1] + Math.random() * 4000) * faza().odstep;
  }
  if (poz() >= 2 && stan.t >= stan.nastepnyPilny) {
    if (!stan.maile.some(m => m.pilne) && pulpit.terminowe() < USTAW.maxTerminowych[poz() - 1]) dodajPilny();
    stan.nastepnyPilny = stan.t + (USTAW.odstepPilnych[poz() - 1] + Math.random() * 20000) * faza().odstep;
  }
  for (const m of [...stan.maile]) {
    if (!m.pilne) continue;
    m.wiek += delta;
    if (m.wiek >= m.czas) {
      stan.maile = stan.maile.filter(x => x !== m); rysujPoczte();
      wlamanie(m.skutek, "Przy prawdziwym alarmie liczy się czas. " + m.t);
      if (!petla) return;
    } else if (m.elem) {
      const i = m.elem.querySelector(".pb i");
      if (i) i.style.width = (100 - m.wiek / m.czas * 100) + "%";
    }
  }
}
