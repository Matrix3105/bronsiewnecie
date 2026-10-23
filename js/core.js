'use strict';

const $ = s => document.querySelector(s);
const losuj = a => a[Math.floor(Math.random() * a.length)];
const pomieszaj = a => a.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(x => x[1]);
const losujKod = () => String(100000 + Math.floor(Math.random() * 900000));

function elem(znacznik, klasa, napis) {
  const e = document.createElement(znacznik);
  if (klasa) e.className = klasa;
  if (napis != null) e.textContent = napis;
  return e;
}

let stan = null;
let petla = null;
let ostatniaPorada = "";

/* ---------- losowanie bez powtórzeń ---------- */
// „Torba”: każdy przykład pojawi się raz, zanim któryś wróci. Torby żyją między nocami.
const torby = {};
function nastepny(klucz, tab) {
  let t = torby[klucz];
  if (!t || !t.length) {
    t = pomieszaj(tab);
    const ostatni = torby[klucz + ":o"];
    if (t.length > 1 && t[t.length - 1] === ostatni) [t[0], t[t.length - 1]] = [t[t.length - 1], t[0]];
    torby[klucz] = t;
  }
  const x = t.pop(); torby[klucz + ":o"] = x; return x;
}
function wybierz(klucz, tab, n) {
  const wynik = [];
  for (let proby = 0; wynik.length < Math.min(n, tab.length) && proby < 60; proby++) {
    const x = nastepny(klucz, tab);
    if (!wynik.includes(x)) wynik.push(x);
  }
  return wynik;
}

/* ---------- zapis ---------- */
function zapisz(n) { try { localStorage.setItem("cybernoc", String(n)); } catch (e) {} }
function wczytaj() { try { return parseInt(localStorage.getItem("cybernoc")) || 1; } catch (e) { return 1; } }
function zapiszJSON(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
function wczytajJSON(k, domyslna) { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? domyslna : v; } catch (e) { return domyslna; } }

// bieżąca seria w trybie nieskończonym i tabela wyników
let bieg = wczytajJSON("cybernoc_bieg", {punkty: 0, dni: 0});
const zapiszBieg = () => zapiszJSON("cybernoc_bieg", bieg);
function zerujBieg() { bieg = {punkty: 0, dni: 0}; zapiszBieg(); }
const tabela = () => wczytajJSON("cybernoc_tabela", []);

/* ---------- ekran i skala ---------- */
const poz = () => Math.min(stan.dzien, USTAW.dni);            // poziom trudności 1..5
const godzina = () => (USTAW.startGodz + Math.floor(stan.t / USTAW.godzinaMs)) % 24;
const jestNoc = () => { const g = godzina(); return g >= USTAW.nocOd || g < USTAW.dzienOd; };
const faza = () => jestNoc() ? USTAW.noc : USTAW.dzien;
const pktZa = x => Math.round(x * (jestNoc() ? USTAW.mnoznikPktNoc : 1));
const dobaMs = () => 24 * USTAW.godzinaMs;
// czas gry (ms od 6:00) na „GG:MM”, z minutami
function czasGry(t) {
  const calkowiteMin = Math.floor(t / USTAW.godzinaMs * 60);
  const g = (USTAW.startGodz + Math.floor(calkowiteMin / 60)) % 24, m = calkowiteMin % 60;
  return String(g).padStart(2, "0") + ":" + String(m).padStart(2, "0");
}
const nieskonczony = () => stan && stan.dzien > USTAW.dni;

function pokaz(id) {
  const nakladka = ["s-start", "s-msg", "s-intro", "s-wybor", "s-tutorial"].includes(id);
  document.querySelectorAll(".screen").forEach(e => e.classList.toggle("on", e.id === id || e.id === "s-game"));
  document.body.classList.toggle("menu", nakladka);
  document.body.classList.toggle("pauza", id === "s-start" && wstrzymana && !!stan);
  dopasuj();
  dziuraPauzy();
}

// W pauzie ciemna nakładka ma „okienka” nad półką z książkami i przyciskiem „Książki”,
// żeby były kolorowe i było widać, że można je otworzyć.
function dziuraPauzy() {
  const nak = $("#s-start");
  if (!document.body.classList.contains("pauza")) { nak.style.removeProperty("--dziura"); return; }
  const w = innerWidth, h = innerHeight, m = 6;
  let d = "M0 0H" + w + "V" + h + "H0Z";
  ["#shelf", "#ksbtn"].forEach(sel => {
    const el = $(sel);
    if (!el || getComputedStyle(el).display === "none") return;
    const r = el.getBoundingClientRect();
    if (r.width < 4 || r.height < 4) return;
    d += "M" + (r.left - m) + " " + (r.top - m) + "h" + (r.width + 2 * m) + "v" + (r.height + 2 * m) + "h" + -(r.width + 2 * m) + "Z";
  });
  nak.style.setProperty("--dziura", 'path(evenodd, "' + d + '")');
}

// Telefon w poziomie: bez „pokoju”, monitor wypełnia ekran. Telefon w pionie: prośba o obrót.
function dopasuj() {
  const kompakt = innerHeight <= 520 || innerWidth <= 700;
  const pion = innerWidth <= 700 && innerHeight > innerWidth;
  document.body.classList.toggle("kompakt", kompakt);
  document.body.classList.toggle("pion", pion);

  const scena = $("#stage"), szer = scena.clientWidth, wys = scena.clientHeight;
  if (!szer || !wys) return;
  if (kompakt) { $("#room").style.transform = ""; scena.style.setProperty("--skala", 1); return; }
  const skala = Math.min(szer / 1000, wys / 560);
  const przesX = (szer - 1000 * skala) / 2, przesY = (wys - 560 * skala) / 2;
  $("#room").style.transform = "translate(" + przesX + "px," + przesY + "px) scale(" + skala + ")";
  scena.style.setProperty("--skala", skala);
  $("#floor").style.top = (przesY + 410 * skala) + "px";
}
new ResizeObserver(dopasuj).observe($("#stage"));
addEventListener("resize", () => { dopasuj(); dziuraPauzy(); });
addEventListener("orientationchange", () => setTimeout(dopasuj, 200));

function komunikat(t, c) { const s = $("#st"); s.textContent = "> " + t; s.className = c || ""; }
function pozniej(akcja, czasMs) { stan.timery.push(setTimeout(akcja, czasMs)); }

// "al" i "task" to widoki aplikacji Alerty, "ml" to Poczta. Resztę aplikacji otwiera pulpit.otworz.
function widok(v) {
  if (v === "ml") pulpit.otworz("poczta");
  else pulpit.otworz("alerty", v === "task" ? "v-task" : "v-al");
  DZWIEKI.klik();
}

let wstrzymana = false;

function zmienFaze(cicho) {
  const noc = jestNoc();
  stan.faza = noc;
  $("#stage").classList.toggle("noc", noc); $("#stage").classList.toggle("dzien", !noc);
  if (cicho) return;
  komunikat(noc ? "Zapadł zmrok. Noc jest trudniejsza: zagrożenia rosną szybciej, ale punkty są warte więcej."
                : "Świta. W dzień jest trochę spokojniej.", noc ? "bad" : "good");
  noc ? ton(196, .6, "sawtooth", .06, 0, 110) : (ton(523, .15, "triangle", .06), ton(784, .3, "triangle", .06, .15));
}

function zapiszPostep() {
  if (!stan) return;
  zapiszJSON("cybernoc_pauza", {dzien: stan.dzien, t: stan.t, zycia: stan.zycia, pkt: stan.pkt, odparte: stan.odparte, maileOk: stan.maileOk});
}
const usunPostep = () => { try { localStorage.removeItem("cybernoc_pauza"); } catch (e) {} };

function zacznijDzien(n, snap) {
  kontekst(); wstrzymana = false; biurko.wyczysc(); ksiazki.polec(null);
  stan = {
    dzien: n, t: 0, zycia: USTAW.zycia,
    aktywne: [], ostatnieZag: [],
    maile: [], nastepnyMail: 12000, nastepnyPilny: 110000,
    czaty: [], nastepnyCzat: 20000,
    pliki: pulpit.domyslnePliki(), idPliku: 10, kosz: [], nastepnyPlik: 60000,
    zdarzenia: [], nastepneZdarzenie: 90000, operacje: [], avSkan: false, opInst: null,
    sys: {zapora: true, ochrona: true, aktualizacja: false, instaluje: false, obce: false, pozObcego: 0},
    nastepnyAlert: 6000, pojawione: 0,
    ostatni: performance.now(), nastepnyZapis: 0,
    straty: [], timery: [], zadanie: null, kod: "", potrzebny: 0,
    pkt: 0, odparte: 0, maileOk: 0, pokazaneZycia: -1, faza: null
  };
  if (snap) {   // wznowienie zapisanej doby od tej samej godziny
    Object.assign(stan, {t: snap.t, zycia: snap.zycia, pkt: snap.pkt, odparte: snap.odparte, maileOk: snap.maileOk, pojawione: 1});
    stan.nastepnyAlert = snap.t + 5000; stan.nastepnyMail = snap.t + 12000;
    stan.nastepnyPilny += snap.t; stan.nastepnyCzat += snap.t; stan.nastepnyPlik += snap.t; stan.nastepneZdarzenie += snap.t;
  } else usunPostep();
  const dalej = n > USTAW.dni;
  $("#nl").textContent = dalej ? "Dzień " + n + "+" : "Dzień " + n + "/" + USTAW.dni;
  $("#sc").style.display = dalej ? "" : "none";
  pulpit.reset(); rysujAlerty(); rysujPoczte(); rysujCzaty(); rysujAv(); rysujPanel(); rysujKosz();
  zmienFaze(true);
  komunikat(snap ? "Wracasz do gry. Powodzenia!" :
    dalej ? "Tryb nieskończony: poziom jak w dniu 5, liczą się punkty." : n === 1 ? fab().start : "Dzień się zaczął. Podpowiedzi są w książkach na półce. Noc będzie cięższa.");
  pokaz("s-game");
  clearInterval(petla); petla = setInterval(krok, 100);
  startBrzeczenia();
}

function wznow() {
  if (!wstrzymana || !stan) { const sn = wczytajJSON("cybernoc_pauza", null); if (sn) zacznijDzien(sn.dzien, sn); return; }
  wstrzymana = false; stan.ostatni = performance.now();
  clearInterval(petla); petla = setInterval(krok, 100); startBrzeczenia();
  pokaz("s-game"); komunikat("Wracasz do gry.");
}
