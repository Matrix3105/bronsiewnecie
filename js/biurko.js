'use strict';

// Przedmioty na biurku: komputer z portem USB i napędem, pendrive, szuflada z płytami, mysz i klawiatura.
// Zadanie może „czekać” na akcję z biurka. Funkcja zwrotna zwraca false, gdy akcja była zła
// i zadanie dalej czeka (np. wpięto obcy pendrive).
const RZEDY_KLAWISZY = [
  "`1234567890-=".split("").map(k => [k, 1]).concat([["bksp", 2.2]]),
  [["Tab", 1.6]].concat("qwertyuiop[]".split("").map(k => [k, 1]), [["\\", 1.6]]),
  [["Caps", 1.9]].concat("asdfghjkl;'".split("").map(k => [k, 1]), [["Enter", 2.3]]),
  [["Shift", 2.4]].concat("zxcvbnm,./".split("").map(k => [k, 1]), [["Shift", 2.8]]),
  [["Ctrl", 1.3], ["Win", 1.3], ["Alt", 1.3], [" ", 6.2], ["Alt", 1.3], ["Fn", 1.3], ["Ctrl", 1.3]]
];

const biurko = {
  czeka: null,     // {rodzaj: "usb" | "plyta", f, plyty}
  zajete: false,   // trwa animacja wpinania

  start() {
    // klawiatura
    const kb = $("#kb"); kb.innerHTML = "";
    RZEDY_KLAWISZY.forEach(r => {
      const rz = elem("div", "rz");
      r.forEach(([k, szer]) => {
        const e = elem("span", "k", k.length > 1 || k === "bksp" ? k : (k === " " ? "" : k));
        e.dataset.k = k.toLowerCase(); e.style.flex = szer + " 0 0";
        rz.appendChild(e);
      });
      kb.appendChild(rz);
    });
    document.addEventListener("keydown", e => {
      const nazwa = e.key === " " ? " " : e.key.toLowerCase();
      const m = { backspace: "bksp", enter: "enter", shift: "shift", control: "ctrl", capslock: "caps", tab: "tab", alt: "alt" };
      biurko.klawisz(m[nazwa] || nazwa);
    });
    $("#v-task").addEventListener("input", () => biurko.klawisz(null));   // klawiatura ekranowa

    // mysz porusza się przy klikaniu w monitor
    $("#mon").addEventListener("pointerdown", () => biurko.mysz());

    // przedmioty
    $("#usb").onclick = () => biurko.kliknijUsb("moj");
    $("#usb2").onclick = () => biurko.kliknijUsb("obcy");
    $("#szuf").onclick = () => biurko.otworzSzuflade();
    $("#pl-x").onclick = () => biurko.zamknijSzuflade();
    $("#pc").onclick = () => komunikat(biurko.czeka ? "Komputer czeka na Twój ruch." : "Komputer działa. Wpinaj tylko to, co jest Ci potrzebne.");
  },

  klawisz(nazwa) {
    const wszystkie = [...document.querySelectorAll("#kb .k")];
    const k = nazwa == null ? losuj(wszystkie) : wszystkie.find(x => x.dataset.k === nazwa);
    if (!k) return;
    k.classList.add("w"); setTimeout(() => k.classList.remove("w"), 110);
  },

  mysz() {
    const m = $("#mouse");
    m.style.setProperty("--mx", (Math.random() * 12 - 6).toFixed(1) + "px");
    m.style.setProperty("--my", (Math.random() * 10 - 5).toFixed(1) + "px");
    m.classList.add("kl"); setTimeout(() => m.classList.remove("kl"), 130);
  },

  /* ---------- pendrive ---------- */
  // f(rodzaj): rodzaj to "moj" (niebieski) albo "obcy" (szary). Zwróć false, jeśli to był błąd.
  czekajUsb(f, pokazObcy) {
    biurko.czeka = {rodzaj: "usb", f};
    $("#usb").classList.add("polecany");
    $("#usb2").classList.toggle("pokaz", !!pokazObcy);
  },

  kliknijUsb(rodzaj) {
    if (!stan || !petla || biurko.zajete) return;
    DZWIEKI.klik();
    const el = $(rodzaj === "obcy" ? "#usb2" : "#usb");
    const c = biurko.czeka;
    if (!c || c.rodzaj !== "usb") {
      komunikat(rodzaj === "obcy" ? "Nie wpinaj obcych pendrive’ów bez powodu." : "Pendrive nie jest teraz potrzebny.");
      el.classList.remove("drga"); void el.offsetWidth; el.classList.add("drga");
      return;
    }
    biurko.zajete = true;
    el.classList.add("wpiety"); $("#pc").classList.add("usbon");
    const wynik = c.f(rodzaj);
    if (wynik === false) pozniej(biurko.wyjmij, 1000);
    else { biurko.czeka = null; pozniej(() => biurko.zajete = false, 400); }
  },

  wyjmij() {
    $("#usb").classList.remove("wpiety"); $("#usb2").classList.remove("wpiety");
    $("#pc").classList.remove("usbon"); biurko.zajete = false;
  },

  /* ---------- płyty w szufladzie ---------- */
  // plyty: [{n, ok, blad}], f(plyta) zwraca false przy błędzie
  czekajPlyta(plyty, f) {
    biurko.czeka = {rodzaj: "plyta", f, plyty};
    $("#szuf").classList.add("polecany");
  },

  otworzSzuflade() {
    if (!stan || !petla) return;
    DZWIEKI.klik();
    $("#szuf").classList.add("otwarta");
    const c = biurko.czeka && biurko.czeka.rodzaj === "plyta" ? biurko.czeka : null;
    $("#pl-info").textContent = c ? "Wybierz płytę, którą włożysz do napędu. Czytaj opisy." : "W szufladzie leżą płyty. Teraz nie są Ci potrzebne.";
    const lista = $("#pl-lista"); lista.innerHTML = "";
    (c ? c.plyty : PRZYKLADY.plyty.domyslne.map(n => ({n}))).forEach(p => {
      const b = elem("button", "pl", p.n); b.type = "button";
      b.onclick = () => biurko.wlozPlyte(p); lista.appendChild(b);
    });
    $("#okno-plyty").classList.add("on");
  },

  zamknijSzuflade() { $("#okno-plyty").classList.remove("on"); $("#szuf").classList.remove("otwarta"); },

  wlozPlyte(p) {
    const c = biurko.czeka;
    if (!c || c.rodzaj !== "plyta") { komunikat("Nie potrzebujesz teraz płyty."); return; }
    DZWIEKI.klik(); biurko.zamknijSzuflade();
    $("#pc").classList.add("plyta");
    const wynik = c.f(p);
    if (wynik === false) pozniej(biurko.wysunPlyte, 1000); else biurko.czeka = null;
  },

  wysunPlyte() { $("#pc").classList.remove("plyta"); },

  /* ---------- sprzątanie ---------- */
  wyczysc() {
    biurko.czeka = null; biurko.zajete = false;
    ["#usb", "#szuf"].forEach(s => $(s).classList.remove("polecany"));
    $("#usb2").classList.remove("pokaz");
    biurko.wyjmij(); biurko.wysunPlyte(); biurko.zamknijSzuflade();
  }
};
