'use strict';

// Pulpit komputera: aplikacje, okna, pasek zadań i pliki na pulpicie.

const IKONY = {
  alerty: '<path d="M12 3 2.5 20h19Z"/><path d="M12 10v4.5M12 17.5v.01"/>',
  poczta: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6.5L20.5 7"/>',
  komunikator: '<path d="M4 5h16v11H10l-4.5 4v-4H4Z"/>',
  antywirus: '<path d="M12 3 4.5 6v6c0 4.5 3.2 7.6 7.5 9 4.3-1.4 7.5-4.5 7.5-9V6Z"/><path d="m8.8 12 2.2 2.2 4.2-4.4"/>',
  panel: '<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
  kosz: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/>',
  plik: '<path d="M6 3h8l4 4v14H6Z"/><path d="M14 3v4h4"/>',
  folder: '<path d="M3 6h7l2 2h9v11H3Z"/>'
};
const ikonaSvg = k => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + IKONY[k] + '</svg>';

const APLIKACJE = {
  alerty: {nazwa: "Alerty", tytul: "Centrum bezpieczeństwa", widok: "v-al", kolor: "#b9473f"},
  poczta: {nazwa: "Poczta", tytul: "Poczta", widok: "v-ml", kolor: "#3b78c8"},
  komunikator: {nazwa: "Czat", tytul: "Komunikator", widok: "v-kom", kolor: "#2f9467"},
  antywirus: {nazwa: "Antywirus", tytul: "Antywirus", widok: "v-av", kolor: "#7557b8"},
  panel: {nazwa: "Panel", tytul: "Panel systemu", widok: "v-sys", kolor: "#bf8128"},
  plik: {nazwa: "Plik", tytul: "Podgląd pliku", widok: "v-plik", kolor: "#5b677c"},
  kosz: {nazwa: "Kosz", tytul: "Kosz", widok: "v-kz", kolor: "#5b677c"}
};

const pulpit = {
  otwarta: null,
  ostatniKlucz: "",

  start() {
    const siatka = $("#ikony"); siatka.innerHTML = "";
    ["alerty", "poczta", "komunikator", "antywirus", "panel"].forEach(id => siatka.appendChild(pulpit.ikona(id)));
    const kosz = pulpit.ikona("kosz"); kosz.id = "ik-kosz"; $("#pulpit").appendChild(kosz);
    $("#app-x").onclick = pulpit.zamknij;
    $("#tb-pulpit").onclick = () => { if (stan && petla) pulpit.zamknij(); };
    $("#pulpit").addEventListener("pointerdown", e => { if (!e.target.closest(".plik, #menu-pliku")) pulpit.zamknijMenu(); });
  },

  ikona(id) {
    const a = APLIKACJE[id], b = elem("button", "ik-app"); b.type = "button"; b.dataset.app = id;
    const t = elem("span", "plytka"); t.style.background = a.kolor; t.innerHTML = ikonaSvg(id);
    b.append(t, elem("span", "nazwa", a.nazwa), elem("i", "odg"));
    b.onclick = () => { if (!stan || !petla) return; DZWIEKI.klik(); pulpit.otworz(id); };
    return b;
  },

  domyslnePliki() {
    return [
      {id: 1, n: "Praca_domowa.docx", rodzaj: "dobry", ik: "plik", tresc: [
        "Matematyka, zadania na piątek",
        "1. Oblicz pole trójkąta o podstawie 6 cm i wysokości 4 cm.",
        "2. Rozwiąż równanie: 3x + 5 = 20.",
        "3. Ile to jest 15% z 240?"]},
      {id: 2, n: "Notatki.txt", rodzaj: "dobry", ik: "plik", tresc: [
        "Do zrobienia:",
        "- kupić zeszyt do historii",
        "- oddać książkę do biblioteki",
        "- zmienić hasło do poczty na dłuższe"]},
      {id: 3, n: "Zdjęcia z wakacji", rodzaj: "dobry", ik: "folder", tresc: [
        "W folderze są 3 pliki:",
        "morze_01.jpg, gory_02.jpg, ognisko_03.jpg"]}
    ];
  },

  // nowy dzień: czysty pulpit, żadne okno nie jest otwarte
  reset() {
    pulpit.otwarta = null; pulpit.ostatniKlucz = "";
    pulpit.zamknijMenu();
    $("#app").classList.remove("on"); $("#tb-app").textContent = "";
    pulpit.rysujPliki(); pulpit.odswiez();
  },

  /* ---------- okna ---------- */
  otworz(id, widokId) {
    const a = APLIKACJE[id];
    if (pulpit.otwarta === "alerty" && id !== "alerty" && stan.zadanie && !zadanieLaduje()) zamknijZadanie(false, true);   // zmiana okna przerywa zadanie
    pulpit.otwarta = id; pulpit.zamknijMenu();
    const w = widokId || (id === "alerty" && stan.zadanie ? "v-task" : a.widok);
    document.querySelectorAll("#views > div").forEach(d => d.style.display = d.id === w ? "block" : "none");
    $("#app-tytul").textContent = a.tytul; $("#app").classList.add("on");
    $("#tb-app").textContent = a.tytul;
    if (id === "kosz") rysujKosz();
    if (id === "panel") rysujPanel();
    if (id === "antywirus") rysujAvStan();
  },

  zamknij() {
    if (!stan) return;
    if (pulpit.otwarta === "alerty" && stan.zadanie && !zadanieLaduje()) zamknijZadanie(false, true);
    if (pulpit.otwarta) DZWIEKI.klik();
    pulpit.otwarta = null; $("#app").classList.remove("on"); $("#tb-app").textContent = "";
  },

  /* ---------- pliki na pulpicie ---------- */
  rysujPliki() {
    const k = $("#pliki"); k.innerHTML = "";
    stan.pliki.forEach(f => {
      const b = elem("button", "plik " + f.rodzaj); b.type = "button"; b.dataset.id = f.id;
      const t = elem("span", "plytka"); t.innerHTML = ikonaSvg(f.ik || "plik");
      b.append(t, elem("span", "nazwa", f.n));
      if (f.rodzaj === "wirus") {
        const pb = elem("div", "pb"), i = document.createElement("i"); i.dataset.plik = f.id;
        pb.appendChild(i); b.appendChild(pb);
      }
      if (f.rodzaj === "wyleczony") b.appendChild(elem("small", "", "wyleczony"));
      b.onclick = e => { e.stopPropagation(); pulpit.menuPliku(f, b); };
      k.appendChild(b);
    });
  },

  menuPliku(f, przycisk) {
    if (!stan || !petla) return;
    DZWIEKI.klik();
    document.querySelectorAll("#pliki .plik.sel").forEach(x => x.classList.remove("sel"));
    przycisk.classList.add("sel");
    const m = $("#menu-pliku"); m.innerHTML = "";
    const otworz = elem("button", "", "Otwórz"), kosz = elem("button", "", "Przenieś do kosza"), anuluj = elem("button", "ghost", "Anuluj");
    otworz.onclick = () => pulpit.otworzPlik(f); kosz.onclick = () => pulpit.doKosza(f); anuluj.onclick = pulpit.zamknijMenu;
    m.append(elem("b", "", f.n), otworz, kosz, anuluj);
    m.classList.add("on");
  },

  zamknijMenu() {
    $("#menu-pliku").classList.remove("on");
    document.querySelectorAll("#pliki .plik.sel").forEach(x => x.classList.remove("sel"));
  },

  otworzPlik(f) {
    pulpit.zamknijMenu();
    if (!stan.pliki.includes(f)) return;
    if (f.rodzaj === "wirus") {
      stan.pliki = stan.pliki.filter(x => x !== f); pulpit.rysujPliki();
      wlamanie("Uruchomiłeś zainfekowany plik „" + f.n + "”", "Podejrzanych plików się nie otwiera. Najpierw skan antywirusem, potem kosz.");
    } else if (f.rodzaj === "wyleczony") {
      komunikat("Ten plik jest już unieszkodliwiony. Przenieś go do kosza.");
    } else {
      pulpit.podglad(f);
    }
  },

  // bezpieczny plik: prosty podgląd z krótką treścią
  podglad(f) {
    const w = $("#v-plik"); w.innerHTML = "";
    (f.tresc || ["Zwykły plik bez ważnej treści."]).forEach((t, i) => w.appendChild(elem(i ? "p" : "b", "", t)));
    komunikat("Otworzyłeś bezpieczny plik „" + f.n + "”. Nic złego się nie stało.", "good");
    pulpit.otworz("plik"); $("#app-tytul").textContent = f.n; $("#tb-app").textContent = f.n;
  },

  doKosza(f) {
    pulpit.zamknijMenu();
    if (!stan.pliki.includes(f)) return;
    if (f.rodzaj === "wirus") {
      komunikat("Kosz nie usuwa wirusa: plik nadal może się uruchomić. Najpierw przeskanuj komputer antywirusem.", "bad");
      DZWIEKI.blad(); return;
    }
    stan.pliki = stan.pliki.filter(x => x !== f);
    stan.kosz.push(f); pulpit.rysujPliki(); rysujKosz();
    if (f.rodzaj === "wyleczony") {
      const pkt = pktZa(USTAW.punktyKosz); stan.pkt += pkt; DZWIEKI.dobrze();
      komunikat("Wyleczony plik wylądował w koszu. +" + pkt, "good");
    } else {
      komunikat("Plik trafił do kosza. Możesz go stamtąd przywrócić.");
    }
  },

  aktywneWirusy() { return stan.pliki.filter(f => f.rodzaj === "wirus").length; },
  // ile spraw z limitem czasu czeka teraz (nowych nie dokładamy ponad limit, żeby dni nie zalewały gracza)
  terminowe() { return pulpit.aktywneWirusy() + stan.zdarzenia.length + stan.maile.filter(m => m.pilne).length; },

  // zwraca false, gdy pulpit jest pełny
  nowyPlik(w) {
    w = w || nastepny("wirusy", WIRUSY);
    if (stan.pliki.length >= USTAW.maxPlikow) {   // zrób miejsce: stare, bezpieczne pliki idą do kosza
      const stary = stan.pliki.find(f => f.rodzaj === "dobry");
      if (!stary) return false;
      stan.pliki = stan.pliki.filter(x => x !== stary); stan.kosz.push(stary);
    }
    stan.pliki.push({id: stan.idPliku++, n: w.n, z: w.z, rodzaj: "wirus", ik: "plik", wiek: 0, limit: USTAW.czasPliku[poz() - 1]});
    pulpit.rysujPliki(); DZWIEKI.alarm();
    komunikat("Na pulpicie pojawił się podejrzany plik „" + w.n + "”. Przeskanuj komputer antywirusem.", "bad");
    return true;
  },

  /* ---------- odznaki, pasek zadań i paski czasu ---------- */
  odswiez() {
    if (!stan) return;
    const wirusy = pulpit.aktywneWirusy();
    const zd = app => stan.zdarzenia.filter(z => ZDARZENIA[z.typ].app === app).length;
    const av = wirusy + zd("antywirus"), pan = zd("panel");
    const wartosci = {
      alerty: [stan.aktywne.length, stan.aktywne.some(a => a.m >= 75)],
      poczta: [stan.maile.length, stan.maile.some(m => m.pilne)],
      komunikator: [stan.czaty.length, false],
      antywirus: [av, av > 0],
      panel: [pan, pan > 0],
      kosz: [0, false]
    };
    const pilne = (wartosci.alerty[1] ? stan.aktywne.filter(a => a.m >= 75).length : 0) + stan.maile.filter(m => m.pilne).length + av + pan;
    const klucz = JSON.stringify(wartosci) + pilne;
    if (klucz !== pulpit.ostatniKlucz) {
      pulpit.ostatniKlucz = klucz;
      document.querySelectorAll(".ik-app").forEach(b => {
        const [ile, mocno] = wartosci[b.dataset.app], o = b.querySelector(".odg");
        o.textContent = ile; o.classList.toggle("on", ile > 0); o.classList.toggle("pilne", mocno);
      });
      const tray = $("#tb-tray");
      tray.textContent = pilne ? "Pilne: " + pilne : "Spokojnie";
      tray.classList.toggle("pilne", pilne > 0);
    }
    document.querySelectorAll("#scr [data-zd]").forEach(el => {
      const z = stan.zdarzenia.find(x => x.typ === el.dataset.zd);
      el.style.width = z ? Math.max(0, 100 - z.wiek / z.limit * 100) + "%" : "0%";
    });
    document.querySelectorAll("#pliki [data-plik]").forEach(el => {
      const f = stan.pliki.find(x => String(x.id) === el.dataset.plik);
      el.style.width = f ? Math.max(0, 100 - f.wiek / f.limit * 100) + "%" : "0%";
    });
  }
};

// wywoływane w każdym kroku pętli
function aktualizujPulpit(delta) {
  const p = poz();

  // pliki-wirusy: starzeją się, a gdy czas minie, wirus się uruchamia
  for (const f of [...stan.pliki]) {
    if (f.rodzaj !== "wirus") continue;
    f.wiek += delta;
    if (f.wiek >= f.limit) {
      stan.pliki = stan.pliki.filter(x => x !== f); pulpit.rysujPliki();
      wlamanie("Wirus „" + f.n + "” zaczął działać", "Podejrzany plik na pulpicie trzeba od razu przeskanować antywirusem i przenieść do kosza.");
      if (!petla) return;
    }
  }
  if (p >= 2 && stan.t >= stan.nastepnyPlik) {
    if (pulpit.aktywneWirusy() < USTAW.maxWirusow[p - 1] && pulpit.terminowe() < USTAW.maxTerminowych[p - 1]) pulpit.nowyPlik();
    stan.nastepnyPlik = stan.t + (USTAW.odstepPlikow[p - 1] + Math.random() * 10000) * faza().odstep;
  }

  aktualizujZdarzenia(delta); if (!petla) return;
  aktualizujCzaty();
  aktualizujOperacje(delta);
}
