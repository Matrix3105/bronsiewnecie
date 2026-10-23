'use strict';

// Aplikacje na pulpicie: Antywirus, Panel systemu, Komunikator i Kosz, plus zdarzenia systemowe z limitem czasu.
// Zdarzenie ma sens: ignorujesz prawdziwy problem (wyłączona zapora, wirus, obce urządzenie) i ponosisz skutki.

/* ---------- operacje w czasie gry (zatrzymują się razem z grą) ---------- */
function nowaOperacja(calkMs, f) {
  const o = {t: 0, calk: calkMs, f, pasek: null};
  stan.operacje.push(o);
  return o;
}
function aktualizujOperacje(delta) {
  for (const o of [...stan.operacje]) {
    o.t += delta * 1000;
    if (o.pasek) o.pasek.style.width = Math.min(100, o.t / o.calk * 100) + "%";
    if (o.t >= o.calk) { stan.operacje = stan.operacje.filter(x => x !== o); o.f(); }
  }
}

/* ---------- zdarzenia systemowe ---------- */
function banerZdarzenia(z) {
  const d = elem("div", "baner"), def = ZDARZENIA[z.typ];
  const pb = elem("div", "pb"), i = document.createElement("i"); i.dataset.zd = z.typ; pb.appendChild(i);
  d.append(elem("b", "", def.nazwa), elem("p", "", def.opis), pb);
  return d;
}

function odswiezOkna() { rysujAvStan(); rysujPanel(); }

function nowyZdarzenie() {
  const p = poz();
  const pula = Object.keys(ZDARZENIA).filter(k => ZDARZENIA[k].from <= p && !stan.zdarzenia.some(z => z.typ === k));
  if (!pula.length) return;
  const typ = losuj(pula), def = ZDARZENIA[typ];
  if (typ === "ochrona") stan.sys.ochrona = false;
  if (typ === "zapora") stan.sys.zapora = false;
  if (typ === "aktualizacja") stan.sys.aktualizacja = true;
  if (typ === "urzadzenie") { stan.sys.obce = true; stan.sys.pozObcego = Math.floor(Math.random() * (URZADZENIA_DOMOWE.length + 1)); }
  stan.zdarzenia.push({typ, wiek: 0, limit: USTAW.czasZdarzenia[p - 1]});
  DZWIEKI.alarm(); komunikat("Pilne: " + def.nazwa + ". " + def.opis, "bad");
  odswiezOkna();
}

function rozwiazZd(typ) {
  const z = stan.zdarzenia.find(x => x.typ === typ); if (!z) return;
  stan.zdarzenia = stan.zdarzenia.filter(x => x !== z);
  const pkt = pktZa(USTAW.punktyAv); stan.pkt += pkt; stan.odparte++; DZWIEKI.dobrze();
  komunikat(ZDARZENIA[typ].nazwa + ": załatwione. +" + pkt, "good");
  odswiezOkna();
}

function aktualizujZdarzenia(delta) {
  const p = poz();
  if (p >= 2 && stan.t >= stan.nastepneZdarzenie) {
    if (stan.zdarzenia.length < (p >= 5 ? 2 : 1) && pulpit.terminowe() < USTAW.maxTerminowych[p - 1]) nowyZdarzenie();
    stan.nastepneZdarzenie = stan.t + (USTAW.odstepZdarzen[p - 1] + Math.random() * 15000) * faza().odstep;
  }
  for (const z of [...stan.zdarzenia]) {
    z.wiek += delta;
    if (z.wiek < z.limit) continue;
    stan.zdarzenia = stan.zdarzenia.filter(x => x !== z);
    if (z.typ === "ochrona") stan.sys.ochrona = true;
    if (z.typ === "zapora") stan.sys.zapora = true;
    if (z.typ === "aktualizacja") { stan.sys.aktualizacja = false; stan.sys.instaluje = false; }
    if (z.typ === "urzadzenie") stan.sys.obce = false;
    odswiezOkna();
    const d = ZDARZENIA[z.typ]; wlamanie(d.skutek, d.porada);
    if (!petla) return;
  }
}

/* ---------- Antywirus ---------- */
function rysujAv() {
  const b = $("#v-av"); b.innerHTML = "";
  const stanDiv = elem("div"); stanDiv.id = "av-stan";
  const skan = elem("button", "a", "Skanuj komputer"); skan.id = "av-skan"; skan.onclick = skanuj;
  const wyniki = elem("div"); wyniki.id = "av-wyniki";
  b.append(stanDiv, skan, wyniki);
  rysujAvStan();
}

function rysujAvStan() {
  const s = $("#av-stan"); if (!s) return;
  s.innerHTML = "";
  s.appendChild(elem("p", "", "Ochrona w czasie rzeczywistym: " + (stan.sys.ochrona ? "włączona." : "WYŁĄCZONA.")));
  stan.zdarzenia.filter(z => ZDARZENIA[z.typ].app === "antywirus").forEach(z => s.appendChild(banerZdarzenia(z)));
  if (!stan.sys.ochrona) {
    const w = elem("button", "a", "Włącz ochronę");
    w.onclick = () => { stan.sys.ochrona = true; rozwiazZd("ochrona"); };
    s.appendChild(w);
  }
  if (pulpit.aktywneWirusy()) s.appendChild(elem("p", "ostrz", "Na pulpicie leży podejrzany plik. Przeskanuj komputer."));
}

function skanuj() {
  if (stan.avSkan) return;
  stan.avSkan = true; DZWIEKI.klik();
  const w = $("#av-wyniki"); w.innerHTML = "";
  const pb = elem("div", "pb"), i = document.createElement("i"); pb.appendChild(i);
  w.append(elem("p", "", "Skanowanie komputera…"), pb);
  $("#av-skan").disabled = true;
  const o = nowaOperacja(3000, () => {
    stan.avSkan = false;
    const b = $("#av-skan"); if (b) b.disabled = false;
    pokazWyniki();
    if (pulpit.otwarta !== "antywirus") { DZWIEKI.poczta(); komunikat("Skanowanie zakończone. Otwórz Antywirus, żeby zobaczyć wyniki."); }
  });
  o.pasek = i;
}

function pokazWyniki() {
  const w = $("#av-wyniki"); w.innerHTML = "";
  const wyniki = [];
  stan.pliki.filter(f => f.rodzaj === "wirus").forEach(f => wyniki.push({n: f.n, z: f.z, wirus: true, plik: f}));
  const sk = stan.zdarzenia.find(z => z.typ === "skan");
  if (sk) { const pr = nastepny("procesy", PROCESY); wyniki.push({n: pr.n, z: pr.z, wirus: true, zd: sk}); }
  if (poz() >= 2 && Math.random() < .45) { const fa = nastepny("falszywe", FALSYWE_ALARMY); wyniki.push({n: fa.n, z: fa.z, wirus: false}); }
  if (!wyniki.length) {
    w.appendChild(elem("p", "", "Skan zakończony: nie znaleziono zagrożeń. Komputer jest czysty."));
    return;
  }
  w.appendChild(elem("p", "", "Skan zakończony. Znaleziono: " + wyniki.length + ". Sprawdź źródło i podpis cyfrowy, a potem zdecyduj, co zrobić z każdą pozycją."));
  pomieszaj(wyniki).forEach(r => w.appendChild(pozycjaWyniku(r)));
}

function pozycjaWyniku(r) {
  const d = elem("div", "pozycja");
  const usun = elem("button", "", "Usuń"), zostaw = elem("button", "", "Zostaw");
  usun.onclick = () => decyzjaAv(r, d, true); zostaw.onclick = () => decyzjaAv(r, d, false);
  d.append(elem("b", "", r.n), elem("p", "", r.z), usun, zostaw);
  return d;
}

function decyzjaAv(r, d, usun) {
  d.remove();
  const w = $("#av-wyniki");
  const koniecZd = () => { if (r.zd) { stan.zdarzenia = stan.zdarzenia.filter(x => x !== r.zd); } };
  if (r.plik && !stan.pliki.includes(r.plik)) {
    komunikat("Ten plik już nie istnieje: wirus zdążył się uruchomić.");
  } else if (r.wirus && usun) {
    if (r.plik) { r.plik.rodzaj = "wyleczony"; pulpit.rysujPliki(); }
    koniecZd();
    const pkt = pktZa(USTAW.punktyAv); stan.pkt += pkt; stan.odparte++; DZWIEKI.dobrze();
    komunikat("Wirus „" + r.n + "” usunięty. " + (r.plik ? "Przenieś teraz plik z pulpitu do kosza. " : "") + "+" + pkt, "good");
  } else if (r.wirus) {
    koniecZd();
    stracZycie("Zostawiłeś wirusa „" + r.n + "” w systemie. Tracisz serce.", "Wirusa trzeba usunąć. Brak podpisu cyfrowego i nieznane źródło to sygnał do usunięcia.", DZWIEKI.blad);
  } else if (usun) {
    stracZycie("Usunąłeś bezpieczny plik „" + r.n + "”. Tracisz serce.", "Antywirus czasem się myli. Przed usunięciem sprawdź źródło i podpis cyfrowy.", DZWIEKI.blad);
  } else {
    const pkt = pktZa(Math.round(USTAW.punktyAv / 2)); stan.pkt += pkt; DZWIEKI.dobrze();
    komunikat("Dobra decyzja: to był bezpieczny plik. Antywirus bywa przewrażliwiony. +" + pkt, "good");
  }
  if (w && !w.querySelector(".pozycja")) w.appendChild(elem("p", "", "Wszystkie pozycje obsłużone."));
  odswiezOkna();
}

/* ---------- Panel systemu ---------- */
function rysujPanel() {
  const b = $("#v-sys"); if (!b || !stan) return;
  b.innerHTML = "";
  const s = stan.sys, zd = typ => stan.zdarzenia.find(z => z.typ === typ);

  b.appendChild(elem("b", "", "Zapora sieciowa"));
  if (zd("zapora")) b.appendChild(banerZdarzenia(zd("zapora")));
  b.appendChild(elem("p", "", s.zapora ? "Włączona. Blokuje niechciany ruch z sieci." : "WYŁĄCZONA."));
  if (!s.zapora) {
    const w = elem("button", "a", "Włącz zaporę");
    w.onclick = () => { s.zapora = true; rozwiazZd("zapora"); };
    b.appendChild(w);
  }

  b.appendChild(elem("b", "", "Aktualizacje systemu"));
  if (zd("aktualizacja")) b.appendChild(banerZdarzenia(zd("aktualizacja")));
  if (s.instaluje) {
    const pb = elem("div", "pb"), i = document.createElement("i"); pb.appendChild(i);
    if (stan.opInst) { stan.opInst.pasek = i; i.style.width = Math.min(100, stan.opInst.t / stan.opInst.calk * 100) + "%"; }
    b.append(elem("p", "", "Instalowanie łatki…"), pb);
  } else if (s.aktualizacja) {
    const w = elem("button", "a", "Zainstaluj łatkę");
    w.onclick = () => {
      s.instaluje = true; DZWIEKI.klik();
      stan.opInst = nowaOperacja(2400, () => { s.instaluje = false; s.aktualizacja = false; stan.opInst = null; rozwiazZd("aktualizacja"); });
      rysujPanel();
    };
    b.appendChild(w);
  } else {
    b.appendChild(elem("p", "", "System jest aktualny."));
  }

  b.appendChild(elem("b", "", "Urządzenia w sieci domowej"));
  if (zd("urzadzenie")) b.appendChild(banerZdarzenia(zd("urzadzenie")));
  const lista = URZADZENIA_DOMOWE.slice();
  if (s.obce) lista.splice(s.pozObcego, 0, URZADZENIE_OBCE);
  lista.forEach(n => {
    const w = elem("div", "urz"), od = elem("button", "", "Odłącz");
    od.onclick = () => odlacz(n);
    w.append(elem("span", "", n), od); b.appendChild(w);
  });
}

function odlacz(n) {
  if (n === URZADZENIE_OBCE) {
    stan.sys.obce = false; rozwiazZd("urzadzenie");
  } else {
    stracZycie("Odłączyłeś własne urządzenie „" + n + "”. Tracisz serce.", "Zanim coś odłączysz, sprawdź, czy to na pewno obce urządzenie. Swoje rozpoznasz po nazwie.", DZWIEKI.blad);
  }
}

/* ---------- Komunikator ---------- */
function rysujCzaty() {
  const b = $("#v-kom"); b.innerHTML = "";
  if (!stan.czaty.length) { b.appendChild(elem("div", "empty", "Brak nowych wiadomości.")); return; }
  stan.czaty.forEach(c => {
    const d = elem("div", "mail czat"), akcje = elem("div", "mailb");
    c.opcje.forEach(o => { const x = elem("button", "", o[0]); x.onclick = () => odpowiedzNaCzat(c, o); akcje.appendChild(x); });
    d.append(elem("span", "fr", c.od), elem("div", "", c.tresc), akcje);
    b.appendChild(d);
  });
}

function odpowiedzNaCzat(c, o) {
  stan.czaty = stan.czaty.filter(x => x !== c); rysujCzaty();
  if (o[1]) {
    const pkt = pktZa(USTAW.punktyCzat); stan.pkt += pkt; stan.maileOk++;
    DZWIEKI.dobrze(); komunikat("Dobra odpowiedź dla: " + c.od + ". +" + pkt, "good");
  } else {
    stracZycie("Zła odpowiedź. Tracisz serce. " + c.blad, c.blad, DZWIEKI.blad);
  }
}

// wiadomości nie mają limitu czasu: zły ruch kosztuje serce, ale ignorowanie nic
function aktualizujCzaty() {
  if (stan.t < stan.nastepnyCzat) return;
  if (stan.czaty.length < USTAW.maxCzatow) {
    const c = nastepny("czaty", CZATY);
    stan.czaty.push({...c, opcje: pomieszaj(c.opcje)}); rysujCzaty(); DZWIEKI.poczta();
  }
  stan.nastepnyCzat = stan.t + (USTAW.odstepCzatow[poz() - 1] + Math.random() * 5000) * faza().odstep;
}

/* ---------- Kosz ---------- */
function rysujKosz() {
  const b = $("#v-kz"); b.innerHTML = "";
  if (!stan.kosz.length) { b.appendChild(elem("div", "empty", "Kosz jest pusty.")); return; }
  stan.kosz.forEach(f => {
    const d = elem("div", "pozycja"); d.appendChild(elem("b", "", f.n));
    if (f.rodzaj === "dobry") {
      const p = elem("button", "", "Przywróć"); p.onclick = () => przywroc(f); d.appendChild(p);
    } else {
      d.appendChild(elem("p", "", "Wyleczony wirus. Możesz go bezpiecznie usunąć."));
    }
    b.appendChild(d);
  });
  const o = elem("button", "a", "Opróżnij kosz");
  o.onclick = () => { stan.kosz = []; komunikat("Kosz opróżniony. Usuniętych plików nie da się odzyskać."); rysujKosz(); };
  b.appendChild(o);
}

function przywroc(f) {
  if (stan.pliki.length >= USTAW.maxPlikow) { komunikat("Pulpit jest pełny. Najpierw coś stąd usuń."); return; }
  stan.kosz = stan.kosz.filter(x => x !== f); stan.pliki.push(f);
  pulpit.rysujPliki(); rysujKosz(); komunikat("Plik wrócił na pulpit.");
}
