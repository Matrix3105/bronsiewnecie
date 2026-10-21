'use strict';

/* ---------- życia ---------- */
function stracZycie(tekst, porada, dzwiek) {
  stan.zycia--; (dzwiek || DZWIEKI.wlamanie)();
  const r = $("#stage");
  r.classList.remove("shake"); $("#flash").classList.remove("on"); void r.offsetWidth;
  r.classList.add("shake"); $("#flash").classList.add("on");
  komunikat(tekst, "bad");
  odswiezSerca();
  if (stan.zycia <= 0) { zatrzymajPetle(); ostatniaPorada = porada; porazka(); }
}
// przekroczony pasek zagrożenia lub zignorowany phishing
function wlamanie(co, porada) { stracZycie("WŁAMANIE: " + co + "! −1 ♥", porada, DZWIEKI.wlamanie); }

function odswiezSerca() {
  if (stan.pokazaneZycia === stan.zycia) return;
  const h = $("#hp"), stracone = stan.pokazaneZycia > stan.zycia ? stan.zycia : -1;
  h.innerHTML = "";
  for (let i = 0; i < USTAW.zycia; i++) {
    h.appendChild(elem("span", "h" + (i < stan.zycia ? "" : " off") + (i === stracone ? " lost" : ""), "♥"));
  }
  stan.pokazaneZycia = stan.zycia;
}

/* ---------- pętla ---------- */
function krok() {
  const teraz = performance.now(), delta = Math.min(.5, (teraz - stan.ostatni) / 1000);
  stan.ostatni = teraz;
  if (document.body.classList.contains("pion")) return;   // pauza, gdy telefon jest w pionie
  stan.t += delta * 1000;

  if (stan.t >= stan.nastepnyAlert) {
    if (stan.aktywne.length < Math.max(2, USTAW.maxAlertow[poz() - 1] + faza().maxAlertow)) nowyAlert();
    stan.nastepnyAlert = stan.t + (USTAW.odstepAlertow[poz() - 1] + Math.random() * 3000) * faza().odstep;
  }
  if (stan.faza !== jestNoc()) zmienFaze(false);
  if (performance.now() > stan.nastepnyZapis) { zapiszPostep(); stan.nastepnyZapis = performance.now() + 5000; }
  aktualizujAlerty(delta); if (!petla) return;
  aktualizujMaile(delta); if (!petla) return;

  odswiez();
  if (stan.t >= dobaMs() && stan.zycia > 0) wygrana();
}

function odswiez() {
  $("#clock").textContent = (jestNoc() ? "🌙 " : "☀ ") + czasGry(stan.t);
  $("#prog").style.width = Math.min(100, stan.t / dobaMs() * 100) + "%";
  odswiezSerca();
  if (nieskonczony()) $("#sc").textContent = "★ " + (bieg.punkty + stan.pkt);
  for (const a of stan.aktywne) {
    if (!a.elem) continue;
    a.elem.querySelector(".bar i").style.width = Math.min(100, a.m) + "%";
    a.elem.classList.toggle("warn", a.m >= 50 && a.m < 75);
    a.elem.classList.toggle("crit", a.m >= 75);
  }
}

function zatrzymajPetle() { clearInterval(petla); petla = null; if (stan) stan.timery.forEach(clearTimeout); stopBrzeczenia(); }

/* ---------- ekran końca doby ---------- */
function ekran(tytul, tekst, lekcja, przycisk, akcja, przycisk2, akcja2) {
  $("#m-title").textContent = tytul;
  $("#m-text").textContent = tekst;
  $("#m-lesson").textContent = lekcja;
  $("#m-btn").textContent = przycisk; $("#m-btn").onclick = akcja;
  const b2 = $("#m-btn2");
  b2.style.display = przycisk2 ? "inline-block" : "none";
  if (przycisk2) { b2.textContent = przycisk2; b2.onclick = akcja2; }
  $("#m-score").innerHTML = "";
}

function rysujTabele(kont, podswietl) {
  const t = tabela();
  if (!t.length) return;
  kont.appendChild(elem("b", "", "Najlepsze serie"));
  t.forEach((w, i) => {
    const wiersz = elem("div", "wiersz" + (i === podswietl ? " ja" : ""),
      (i + 1) + ".  " + w.p + " pkt  ·  " + w.n + " " + (w.n === 1 ? "dzień" : "dni") + "  ·  " + w.d);
    kont.appendChild(wiersz);
  });
}

// zapisuje serię do tabeli; zwraca miejsce (lub -1)
function zapiszWynikSerii(punkty, noce) {
  if (noce <= 0 && punkty <= 0) return -1;
  const wpis = {p: punkty, n: noce, d: new Date().toLocaleDateString("pl-PL")};
  const lista = tabela(); lista.push(wpis);
  lista.sort((a, b) => b.p - a.p);
  const miejsce = lista.indexOf(wpis);
  zapiszJSON("cybernoc_tabela", lista.slice(0, USTAW.miejscWTabeli));
  return miejsce < USTAW.miejscWTabeli ? miejsce : -1;
}

/* ---------- wygrana ---------- */
const slowoDni = n => n === 1 ? "dzień" : "dni";

function wygrana() {
  zatrzymajPetle(); usunPostep();
  const n = stan.dzien;
  ton(523, .2, "triangle", .07); ton(659, .2, "triangle", .07, .2); ton(784, .4, "triangle", .07, .4);

  if (n < USTAW.dni) {
    zapisz(n + 1);
    ekran("06:00. Dzień " + n + " za Tobą", "Przetrwałeś dzień i noc. Zostało " + (USTAW.dni - n) + " " + (USTAW.dni - n === 1 ? "doba" : "doby") + ". Będzie trochę trudniej.",
      LEKCJE[n - 1], "Dzień " + (n + 1), () => zacznijDzien(n + 1));
  } else if (n === USTAW.dni) {
    zapisz(n + 1); zerujBieg();
    ekran("Przetrwałeś! 06:00", fab().epilog + " Hakerzy poszli szukać łatwiejszych celów. " +
      "Możesz grać dalej: kolejne dni są już tak samo trudne jak piąty i nic się nie zmienia, ale liczą się punkty i długość serii.",
      LEKCJE[n - 1],
      "Kontynuuj: dzień " + (n + 1) + " (tryb nieskończony)", () => zacznijDzien(n + 1),
      "Zagraj od nowa", nowaGra);
  } else {
    const premia = stan.zycia * USTAW.punktyZycie + USTAW.premiaDnia, zaDzien = stan.pkt + premia;
    bieg.punkty += zaDzien; bieg.dni++; zapiszBieg(); zapisz(n + 1);
    ekran("06:00. Dzień " + n + " za Tobą",
      "Punkty za tę dobę: " + zaDzien + " (odparte zagrożenia: " + stan.odparte + ", dobre decyzje w poczcie: " + stan.maileOk +
      ", serca: " + stan.zycia + "/" + USTAW.zycia + ", premia za przetrwanie: " + USTAW.premiaDnia + "). " +
      "Wynik serii: " + bieg.punkty + " pkt, przetrwane dni: " + bieg.dni + ".",
      "Do zapamiętania: " + losuj(LEKCJE).replace(/^Dzień \d: /, ""),
      "Dzień " + (n + 1), () => zacznijDzien(n + 1),
      "Zakończ serię i zapisz wynik", () => zakonczSerie("Seria zakończona", "Zapisałeś wynik po " + (n - USTAW.dni) + " " + slowoDni(n - USTAW.dni) + " trybu nieskończonego."));
  }
  pokaz("s-msg");
}

// koniec serii w trybie nieskończonym: wpis do tabeli i powrót do dnia 6
function zakonczSerie(tytul, tekst, lekcja) {
  usunPostep();
  const wynik = bieg.punkty + (stan && stan.zycia <= 0 ? stan.pkt : 0), dni = bieg.dni;
  const miejsce = zapiszWynikSerii(wynik, dni);
  zerujBieg(); zapisz(USTAW.dni + 1);
  ekran(tytul, tekst + " Wynik: " + wynik + " pkt, przetrwane dni: " + dni + "." +
    (miejsce >= 0 ? " Miejsce w tabeli: " + (miejsce + 1) + "." : ""),
    lekcja || "", "Nowa seria (dzień " + (USTAW.dni + 1) + ")", () => zacznijDzien(USTAW.dni + 1),
    "Menu główne", ekranGlowny);
  rysujTabele($("#m-score"), miejsce);
  pokaz("s-msg");
}

function porazka() {
  usunPostep();
  const n = stan.dzien, kiedy = jestNoc() ? "w nocy" : "w dzień";
  if (n > USTAW.dni) {
    zakonczSerie("Konto przejęte. Koniec serii", "Zabezpieczenia padły o " + $("#clock").textContent + " (" + kiedy + ", dzień " + n + ").",
      "Czego uczy ta porażka: " + ostatniaPorada);
    return;
  }
  ekran("Konto przejęte", "Zabezpieczenia padły o " + $("#clock").textContent + " (" + kiedy + ").",
    "Czego uczy ta porażka: " + ostatniaPorada, "Spróbuj jeszcze raz (dzień " + n + ")", () => zacznijDzien(n));
  pokaz("s-msg");
}

function ekranGlowny() {
  if (petla) {   // wyjście z gry w trakcie = pauza, z możliwością kontynuacji
    if (stan.zadanie) zamknijZadanie(false);
    zatrzymajPetle(); wstrzymana = true; zapiszPostep();
  } else stopBrzeczenia();

  const snap = wstrzymana && stan ? {dzien: stan.dzien, t: stan.t} : wczytajJSON("cybernoc_pauza", null);
  const r = $("#b-resume");
  r.style.display = snap ? "inline-block" : "none";
  if (snap) {
    r.textContent = "Kontynuuj grę (dzień " + snap.dzien + ", " + czasGry(snap.t) + ")";
  }
  const n = wczytaj();
  $("#b-cont").style.display = n > 1 ? "inline-block" : "none";
  $("#b-cont").textContent = n > USTAW.dni
    ? "Zacznij dzień " + n + " (tryb nieskończony" + (bieg.punkty ? ", " + bieg.punkty + " pkt" : "") + ")"
    : "Zacznij od dnia " + n;
  const k = $("#rekordy"); k.innerHTML = ""; rysujTabele(k, -1);
  const fi = FABULY.find(f => f.id === fabulaId);
  $("#fab-info").textContent = fi ? "Fabuła: „" + fi.tytul + "”" : "";
  pokaz("s-start");
}
