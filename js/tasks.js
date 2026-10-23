'use strict';

const interfejs = {
  naglowek(b, tytul, tresc) { b.append(elem("b", "", tytul), elem("p", "", tresc)); },
  przycisk(b, napis, akcja, klasa) { const x = elem("button", klasa || "f", napis); x.onclick = akcja; b.appendChild(x); return x; },
  polaWyboru(b, pozycje) {
    return pozycje.map(t => {
      const l = elem("label", "f"), i = document.createElement("input");
      i.type = "checkbox"; l.append(i, " " + t); b.appendChild(l); return i;
    });
  },

  postep(b, czasMs, poCzasie) {
    const d = elem("div", "pb"), i = document.createElement("i");
    d.appendChild(i); b.appendChild(d);
    b.querySelectorAll("button,input,label").forEach(x => x.remove());
    i.style.width = "0%";
    // jak skan antywirusa: operacja w czasie gry, więc idzie dalej po zamknięciu okna
    const o = nowaOperacja(czasMs, poCzasie); o.zad = true; o.pasek = i;
  },

  wybor(b, opcje, dobrze, zle, komunikatBledu) {
    pomieszaj(opcje).forEach(o => interfejs.przycisk(b, o[0], () => o[1] ? dobrze() : zle(typeof komunikatBledu === "function" ? komunikatBledu(o) : komunikatBledu)));
  }
};


// wspólny szkielet gier ze scenariuszem: część jest uczciwa, część to podpucha
function scenariuszGry(b, dobrze, zle, klucz, lista, tytul, intro) {
  const s = nastepny(klucz, lista);
  interfejs.naglowek(b, tytul, intro);
  b.appendChild(elem("p", "quote", s.tresc));
  interfejs.wybor(b, s.opcje, dobrze, zle, s.blad);
}

const ZADANIA = {

  zgadywanie(b, dobrze, zle) {
    const f = fab(), pulapka = Math.random() < (f.pulapka || .35);
    const [tytul, opis] = pulapka
      ? ((f.pulapkaTekst && Math.random() < .6) ? f.pulapkaTekst : nastepny("kod2faPulapka", PRZYKLADY.kod2fa.pulapka))
      : nastepny("kod2faLegit", PRZYKLADY.kod2fa.legit);
    stan.kod = losujKod(); stan.potrzebny = 1;
    interfejs.naglowek(b, tytul, opis);
    const i = document.createElement("input"); i.maxLength = 6; i.inputMode = "numeric"; i.placeholder = "000000"; i.oninput = DZWIEKI.type;
    b.appendChild(i);
    // telefon: klawiatura systemowa zasłania ekran (nie widać pola ani telefonu z kodem),
    // więc zamiast niej jest własny, mały blok cyfr w grze
    if (document.body.classList.contains("kompakt") || matchMedia("(pointer:coarse)").matches) {
      i.inputMode = "none";
      const kp = elem("div", "keypad");
      const klik = (napis, akcja) => { const x = elem("button", "kp", napis); x.type = "button"; x.onclick = () => { akcja(); DZWIEKI.type(); }; kp.appendChild(x); };
      "1234567890".split("").forEach(c => klik(c, () => { if (i.value.length < 6) i.value += c; }));
      klik("⌫", () => { i.value = i.value.slice(0, -1); });
      b.appendChild(kp);
    }
    interfejs.przycisk(b, "Zatwierdź kod", () => {
      if (pulapka) {
        if (!i.value) return komunikat("Wpisz kod albo odrzuć prośbę.", "bad");
        if (i.value === stan.kod) return zle("Podałeś prawdziwy kod osobie, która o niego poprosiła. Kod 2FA to klucz do konta i zostaje tylko u Ciebie.");
        stan.potrzebny = 0; dobrze();
        return komunikat("Wpisałeś błędny kod, więc oszust nic nie zyskał. Następnym razem odrzuć prośbę: prawdziwego kodu nie podaje się nikomu.", "good");
      }
      if (i.value === stan.kod) { stan.potrzebny = 0; dobrze(); }
      else { stan.kod = losujKod(); i.value = ""; zle("Zły kod. Wysłano nowy, sprawdź telefon."); }
    }, "a");
    interfejs.przycisk(b, "To nie ja, odrzuć", () => {
      if (pulapka) { stan.potrzebny = 0; dobrze(); }
      else zle("To Ty się logowałeś, a odrzuciłeś własny kod. Najpierw sprawdź, kto i po co prosi o kod.");
    }, "a");
  },

  profil(b, dobrze, zle) {
    interfejs.naglowek(b, "Czyszczenie profilu", "Zaznacz posty, które są niebezpieczne, i usuń je. Bezpiecznych nie ruszaj.");
    const p = poz();
    const zlePosty = wybierz("postyZle", PRZYKLADY.postyZle, 2 + Math.floor(p / 2));
    if (fab().post) zlePosty[0] = fab().post;
    const posty = pomieszaj([
      ...zlePosty.map(t => [t, 1]),
      ...wybierz("postyDobre", PRZYKLADY.postyDobre, p > 2 ? 3 : 2).map(t => [t, 0])
    ]);
    const pola = interfejs.polaWyboru(b, posty.map(x => x[0]));
    interfejs.przycisk(b, "Usuń zaznaczone", () => {
      pola.every((c, i) => c.checked === !!posty[i][1]) ? dobrze()
        : zle("Usuń dokładnie te posty, które ujawniają dokumenty, kody, dane lub to, że dom jest pusty.");
    }, "a");
  },

  dezinformacja(b, dobrze, zle) {
    const opcje = [
      [(fab().fejk && Math.random() < .5) ? fab().fejk : nastepny("newsyFalszywe", PRZYKLADY.newsyFalszywe), 1],
      ...wybierz("newsyPrawdziwe", PRZYKLADY.newsyPrawdziwe, poz() > 3 ? 3 : 2).map(t => [t, 0])
    ];
    interfejs.naglowek(b, "Weryfikacja newsów", "Który z tych przekazów jest fałszywy? Zablokuj go.");
    interfejs.wybor(b, opcje, dobrze, zle, "To wiarygodny przekaz. Fałszywka ma sensacyjny ton, brak źródła albo straszy i każe „udostępnić dalej”.");
  },

  zlosliwyPlik(b, dobrze, zle) {
    const opcje = [
      [fab().plik || nastepny("plikiZle", PRZYKLADY.plikiZle), 1],
      ...wybierz("plikiDobre", PRZYKLADY.plikiDobre, poz() > 3 ? 4 : 3).map(t => [t, 0])
    ];
    interfejs.naglowek(b, "Antywirus", "Przeskanuj folder Pobrane.");
    interfejs.przycisk(b, "Skanuj", () => {
      b.querySelector("p").textContent = "Skanowanie…";
      interfejs.postep(b, 2000, () => {
        b.innerHTML = "";
        interfejs.naglowek(b, "Wykryto podejrzany plik", "Wskaż plik do usunięcia. Nie kasuj dobrych.");
        interfejs.wybor(b, opcje, dobrze, zle, "To bezpieczny plik. Szukaj podwójnego rozszerzenia albo programu (.exe, .scr, .bat, .js) udającego dokument.");
      });
    }, "a");
  },

  ustawienia(b, dobrze, zle) {
    interfejs.naglowek(b, "Ustawienia konta", "Ustaw konto tak, żeby było jak najbezpieczniejsze, i zapisz.");
    const ile = poz() <= 2 ? 2 : 3;
    const opcje = pomieszaj([
      ...wybierz("ustDobre", PRZYKLADY.ustawienia.filter(o => o[1]), ile),
      ...wybierz("ustZle", PRZYKLADY.ustawienia.filter(o => !o[1]), ile)
    ]);
    const pola = interfejs.polaWyboru(b, opcje.map(o => o[0]));
    pola.forEach((c, i) => c.checked = opcje[i][2]);
    interfejs.przycisk(b, "Zapisz", () => {
      const bledny = pola.findIndex((c, i) => c.checked !== opcje[i][1]);
      bledny < 0 ? dobrze() : zle("Popraw ustawienie: „" + opcje[bledny][0] + "”.");
    }, "a");
  },

  wifi(b, dobrze, zle) {
    const s = nastepny("sieci", PRZYKLADY.sieci);
    const falszywe = fab().siec ? [fab().siec, ...s.falszywe.slice(1)] : s.falszywe;
    interfejs.naglowek(b, "Wybierz sieć", "Twój router to „" + s.nazwa + "”. Połącz się z nim, potem włącz VPN.");
    interfejs.wybor(b, [[s.nazwa + " (szyfrowana WPA3)", 1], ...falszywe.map(f => [f, 0])], () => {
      b.innerHTML = "";
      interfejs.naglowek(b, "Połączono z " + s.nazwa, "Teraz włącz VPN.");
      interfejs.przycisk(b, "Włącz VPN", () => {
        b.querySelector("p").textContent = "Budowanie szyfrowanego tunelu…";
        interfejs.postep(b, 1800, dobrze);
      }, "a");
    }, zle, "To nie Twoja sieć. Fałszywe punkty kopiują nazwy albo kuszą darmowym internetem.");
  },

  sklep(b, dobrze, zle) {
    const s = nastepny("sklepy", PRZYKLADY.sklepy);
    interfejs.naglowek(b, "Zakupy online", "Chcesz kupić: " + s.co + ". Który sklep jest bezpieczny?");
    interfejs.wybor(b, s.opcje, dobrze, zle, "Ten sklep ma typowe znaki oszustwa: dziwna domena, presja czasu, brak danych firmy albo przelew na prywatne konto.");
  },

  keylogger(b, dobrze, zle) {
    const latki = wybierz("latki", PRZYKLADY.latki, poz() > 4 ? 4 : 3);
    interfejs.naglowek(b, "Aktualizacja systemu", "Szukaj dostępnych łatek.");
    interfejs.przycisk(b, "Szukaj", () => {
      b.querySelector("p").textContent = "Szukanie…";
      interfejs.postep(b, 1500, () => {
        b.innerHTML = "";
        interfejs.naglowek(b, "Znaleziono łatki", "Zaznacz wszystkie i zainstaluj.");
        const pola = interfejs.polaWyboru(b, latki);
        interfejs.przycisk(b, "Instaluj", () => {
          if (pola.some(i => !i.checked)) return zle("Zaznacz wszystkie łatki, inaczej luka zostaje.");
          b.innerHTML = "<b>Instalowanie…</b>";
          interfejs.postep(b, 1800, () => {
            b.innerHTML = ""; b.appendChild(elem("b", "", "Wymagany restart"));
            interfejs.przycisk(b, "Uruchom ponownie", () => { b.innerHTML = "<b>Restart…</b>"; interfejs.postep(b, 1200, dobrze); }, "a");
          });
        }, "a");
      });
    }, "a");
  },

  hejt(b, dobrze, zle) {
    interfejs.naglowek(b, "Hejt na czacie", "Anonimowy użytkownik pisze do Ciebie:");
    b.appendChild(elem("p", "quote", nastepny("hejt", PRZYKLADY.hejt)));
    b.appendChild(elem("p", "", "Zaznacz wszystkie dobre reakcje i zatwierdź."));
    const akcje = pomieszaj([
      ...wybierz("reakcjeDobre", PRZYKLADY.reakcjeDobre, 3).map(t => [t, 1]),
      ...wybierz("reakcjeZle", PRZYKLADY.reakcjeZle, 2).map(t => [t, 0])
    ]);
    const pola = interfejs.polaWyboru(b, akcje.map(a => a[0]));
    interfejs.przycisk(b, "Zatwierdź", () => {
      pola.every((c, i) => c.checked === !!akcje[i][1]) ? dobrze()
        : zle("Nie odpowiadaj agresją i nie zostawaj z tym sam. Zbierz dowody, zablokuj, zgłoś i powiedz komuś zaufanemu.");
    }, "a");
  },

  wyciek(b, dobrze) {
    const dl = losuj([10, 12, 14]);
    interfejs.naglowek(b, "Nowe hasło", "Stare hasło wyciekło. Ustal nowe, spełniające wszystkie warunki.");
    const i = document.createElement("input"); i.autocomplete = "off"; i.placeholder = "nowe hasło";
    const r = elem("div"), zapisz = interfejs.przycisk(b, "Zapisz hasło", dobrze, "a");
    b.insertBefore(i, zapisz); b.insertBefore(r, zapisz); zapisz.disabled = true;
    const WARUNKI = [
      ["Co najmniej " + dl + " znaków", v => v.length >= dl],
      ["Wielka litera", v => /[A-ZĄĆĘŁŃÓŚŹŻ]/.test(v)],
      ["Cyfra", v => /\d/.test(v)],
      ["Znak specjalny", v => /[^\p{L}\d]/u.test(v)],
      ["Bez „haslo”, „123”, „qwerty”", v => !/haslo|hasło|123|qwerty/i.test(v)]
    ];
    const aktualizuj = () => {
      let wszystkie = true; r.innerHTML = "";
      WARUNKI.forEach(([napis, test]) => {
        const dobry = test(i.value); if (!dobry) wszystkie = false;
        const wiersz = elem("div", "", (dobry ? "[x] " : "[ ] ") + napis); wiersz.style.color = dobry ? "var(--zielony)" : "var(--przygaszony)"; r.appendChild(wiersz);
      });
      zapisz.disabled = !wszystkie; DZWIEKI.type();
    };
    i.oninput = aktualizuj; aktualizuj();
  },

  obcy(b, dobrze, zle) {
    const o = nastepny("obcy", PRZYKLADY.obcy), kto = fab().nick || o.kto;
    const krok2 = () => {
      b.innerHTML = "";
      interfejs.naglowek(b, "Czat: " + kto, "Nieznajomy pisze dalej:");
      b.appendChild(elem("p", "quote", o.dalej));
      interfejs.wybor(b, o.opcje2, dobrze, zle, o.blad2);
    };
    interfejs.naglowek(b, "Czat: " + kto, "Nieznajomy z internetu pisze do Ciebie:");
    b.appendChild(elem("p", "quote", o.start));
    interfejs.wybor(b, o.opcje1, krok2, zle, o.blad1);
  },

  oszustwoWGrze(b, dobrze, zle) {
    const o = nastepny("oszustwa", PRZYKLADY.oszustwa);
    interfejs.naglowek(b, "Wymiana w grze", "Gracz pisze:");
    b.appendChild(elem("p", "quote", o.tresc));
    interfejs.wybor(b, o.opcje, dobrze, zle, o.blad);
  },

  /* ----- nowe gry ----- */

  hasla(b, dobrze, zle) {
    const zestaw = nastepny("hasla", PRZYKLADY.hasla);
    interfejs.naglowek(b, "Atak słownikowy", "Atakujący testuje popularne hasła. Ustaw na koncie to, które jest najtrudniejsze do odgadnięcia.");
    interfejs.wybor(b, zestaw, dobrze, zle, "Dobre hasło jest długie i nieoczywiste. Imię, data, ciąg cyfr albo popularne słowo łatwo zgadnąć.");
  },

  linki(b, dobrze, zle) {
    const l = nastepny("linki", PRZYKLADY.linki);
    interfejs.naglowek(b, "Podejrzany link", "Dostałeś wiadomość, że musisz zalogować się do " + l.co + ". Który adres jest prawdziwy?");
    b.appendChild(elem("p", "fab", "Prawdziwy adres jest krótki i kończy się .pl lub .com. Fałszywy ma literówkę, cyfrę zamiast litery, dopisek (24, darmowe) albo końcówkę .top, .xyz, .ru."));
    interfejs.wybor(b, l.opcje, dobrze, zle, "To fałszywy adres. Prawdziwy jest krótki i kończy się zwykłą końcówką. Fałszywe mają literówki (0 zamiast o), dopiski jak „24” czy „darmowe” i końcówki .top, .xyz, .ru, .gift.");
  },

  telefon(b, dobrze, zle) {
    const t = nastepny("telefony", PRZYKLADY.telefony);
    interfejs.naglowek(b, "Podejrzany telefon", "Dostajesz taką wiadomość lub telefon:");
    b.appendChild(elem("p", "quote", t.tresc));
    interfejs.wybor(b, t.opcje, dobrze, zle, t.blad);
  },

  kod(b, dobrze, zle) {
    const k = nastepny("kody", PRZYKLADY.kody);
    interfejs.naglowek(b, "Podejrzany kod QR", "Trafiasz na taką sytuację:");
    b.appendChild(elem("p", "quote", k.tresc));
    interfejs.wybor(b, k.opcje, dobrze, zle, k.blad);
  },

  aplikacja(b, dobrze, zle) {
    const a = nastepny("aplikacjeSklep", PRZYKLADY.aplikacjeSklep);
    interfejs.naglowek(b, "Sklep z aplikacjami", "Chcesz pobrać „" + a.nazwa + "”. Którą wersję wybierasz?");
    interfejs.wybor(b, a.opcje, dobrze, zle, "Sprawdź wydawcę, liczbę pobrań i uprawnienia. Pobieraj tylko z oficjalnego sklepu. „Odblokowane” wersje z forów to pułapka.");
  },

  uprawnienia(b, dobrze, zle) {
    const a = nastepny("aplikacje", PRZYKLADY.aplikacje);
    interfejs.naglowek(b, "Uprawnienia aplikacji", "„" + a.nazwa + "” prosi o dostęp. Zaznacz tylko to, co jest jej naprawdę potrzebne. Jeśli nic, nie zaznaczaj niczego.");
    const opcje = pomieszaj(a.uprawnienia);
    const pola = interfejs.polaWyboru(b, opcje.map(o => o[0]));
    interfejs.przycisk(b, "Zatwierdź", () => {
      pola.every((c, i) => c.checked === !!opcje[i][1]) ? dobrze()
        : zle("Aplikacja ma dostać tylko to, czego potrzebuje do działania. Nadmiar uprawnień to ryzyko dla Twoich danych.");
    }, "a");
  },

  /* ===== nowe gry: uczciwe sytuacje i podpuchy ===== */

  znajomi(b, dobrze, zle) {
    interfejs.naglowek(b, "Zaproszenia do znajomych", "Zaznacz tylko te osoby, które możesz zaakceptować. Resztę odrzuć.");
    const lista = PRZYKLADY.zaproszenia;
    const opcje = pomieszaj([
      ...wybierz("zaprDobre", lista.filter(x => x[1]), 2 + (poz() > 3 ? 1 : 0)),
      ...wybierz("zaprZle", lista.filter(x => !x[1]), 2 + (poz() > 2 ? 1 : 0))
    ]);
    const pola = interfejs.polaWyboru(b, opcje.map(o => o[0]));
    interfejs.przycisk(b, "Zatwierdź", () => {
      pola.every((c, i) => c.checked === !!opcje[i][1]) ? dobrze()
        : zle("Akceptuj osoby, które znasz z życia. Sprawdź wspólnych znajomych i wiek konta, a konta kopiujące kolegę albo proszące o dane odrzuć.");
    }, "a");
  },

  logowanie(b, dobrze, zle) { scenariuszGry(b, dobrze, zle, "logowania", PRZYKLADY.logowania, "Czy to Ty?", "Konto zgłasza logowanie. Porównaj to z faktami:"); },

  klucz(b, dobrze, zle) {
    const podpucha = Math.random() < .5;
    interfejs.naglowek(b, "Klucz bezpieczeństwa", "Konto wymaga Twojego klucza USB. Podłącz swój niebieski pendrive do komputera, klikając go na biurku.");
    if (podpucha) b.appendChild(elem("p", "quote", "Na biurku leży też obcy, szary pendrive z naklejką „Zdjęcia klasy 8b”. To nie Twój klucz."));
    const stat = elem("p", "", "Czekam na klucz USB…"); b.appendChild(stat);
    biurko.czekajUsb(rodzaj => {
      if (rodzaj === "obcy") { zle("To nie jest Twój klucz. Obcy pendrive może mieć wirusa."); return false; }
      stat.textContent = "Klucz rozpoznany.";
      interfejs.przycisk(b, "Potwierdź logowanie", () => { biurko.wyjmij(); dobrze(); }, "a");
    }, podpucha);
  },

  aktualizacja(b, dobrze, zle) { scenariuszGry(b, dobrze, zle, "aktualizacje", PRZYKLADY.aktualizacje, "Okienko aktualizacji", "Na ekranie pojawia się komunikat:"); },

  rozszerzenie(b, dobrze, zle) {
    const r = nastepny("rozszerzenia", PRZYKLADY.rozszerzenia);
    interfejs.naglowek(b, "Dodatek do przeglądarki", "Szukasz rozszerzenia: " + r.co + ". Które wybierasz?");
    interfejs.wybor(b, r.opcje, dobrze, zle, "Sprawdź wydawcę, opinie i uprawnienia. Dobry dodatek pochodzi z oficjalnego sklepu i nie prosi o dostęp do wszystkiego.");
  },

  pendrive(b, dobrze, zle) {
    const s = nastepny("pendrive", PRZYKLADY.pendrive);
    interfejs.naglowek(b, "Pendrive na biurku", s.obcy ? "Na biurku leży obcy, szary pendrive. Co robisz?" : "Chodzi o pendrive, który znasz. Co robisz?");
    b.appendChild(elem("p", "quote", s.tresc));
    interfejs.wybor(b, s.opcje, dobrze, zle, s.blad);
    if (s.obcy) biurko.czekajUsb(rodzaj => {
      if (rodzaj === "obcy") { zle("Wpiąłeś obcy pendrive. Wirus z nośnika uruchamia się po podłączeniu."); return false; }
      komunikat("To Twój własny pendrive, a pytanie dotyczy tego drugiego."); return false;
    }, true);
  },

  paczka(b, dobrze, zle) { scenariuszGry(b, dobrze, zle, "paczki", PRZYKLADY.paczki, "Wiadomość o paczce", "Dostajesz taką wiadomość:"); },

  router(b, dobrze, zle) {
    interfejs.naglowek(b, "Domowy router", "Ustaw router tak, żeby był jak najbezpieczniejszy, i zapisz.");
    const ile = poz() <= 3 ? 2 : 3;
    const opcje = pomieszaj([
      ...wybierz("routDobre", PRZYKLADY.router.filter(o => o[1]), ile),
      ...wybierz("routZle", PRZYKLADY.router.filter(o => !o[1]), ile)
    ]);
    const pola = interfejs.polaWyboru(b, opcje.map(o => o[0]));
    pola.forEach((c, i) => c.checked = opcje[i][2]);
    interfejs.przycisk(b, "Zapisz", () => {
      const bledny = pola.findIndex((c, i) => c.checked !== opcje[i][1]);
      bledny < 0 ? dobrze() : zle("Popraw ustawienie: „" + opcje[bledny][0] + "”.");
    }, "a");
  },

  ransomware(b, dobrze, zle) {
    const plyty = pomieszaj([
      {n: nastepny("plytyDobre", PRZYKLADY.plyty.dobre), ok: 1},
      ...wybierz("plytyZle", PRZYKLADY.plyty.zle, 3)
    ]);
    interfejs.naglowek(b, "Pliki zaszyfrowane", "Wirus zaszyfrował Twoje dokumenty. Kopię zapasową masz na płycie w szufladzie na biurku. Znajdź właściwą i włóż do napędu komputera.");
    b.appendChild(elem("p", "quote", "„Twoje pliki są zaszyfrowane. Zapłać 0,05 BTC w ciągu 24 godzin, a je odzyskasz.”"));
    interfejs.przycisk(b, "Zapłać okup (0,05 BTC)", () => zle("Okupu się nie płaci: nie ma gwarancji, a pieniądze trafiają do przestępców. Masz kopię na płycie."), "f");
    const stat = elem("p", "", "Czekam na płytę z kopią zapasową…"); b.appendChild(stat);
    biurko.czekajPlyta(plyty, p => {
      if (!p.ok) { zle(p.blad || "To nie jest kopia zapasowa."); return false; }
      stat.textContent = "Płyta wczytana: „" + p.n + "”.";
      interfejs.przycisk(b, "Przywróć pliki z płyty", () => {
        b.querySelectorAll("button").forEach(x => x.remove());
        interfejs.postep(b, 1800, dobrze);
      }, "a");
    });
  },

  kopia(b, dobrze, zle) {
    const podpucha = Math.random() < .5;
    interfejs.naglowek(b, "Kopia zapasowa", "Skopiuj ważne pliki na własny pendrive. Najpierw podłącz niebieski pendrive do komputera, klikając go na biurku.");
    if (podpucha) b.appendChild(elem("p", "quote", "Na biurku leży też obcy, szary pendrive. Nie jest Twój."));
    const reszta = elem("div"); b.appendChild(reszta);
    biurko.czekajUsb(rodzaj => {
      if (rodzaj === "obcy") { zle("Obcy pendrive to ryzyko wirusa. Kopię rób tylko na własnym nośniku."); return false; }
      reszta.innerHTML = "";
      interfejs.naglowek(reszta, "Wybierz pliki do skopiowania", "Zaznacz tylko to, czego nie da się odtworzyć.");
      const opcje = pomieszaj([
        ...wybierz("plikiWazne", PRZYKLADY.pliki.wazne, 3).map(t => [t, 1]),
        ...wybierz("plikiZbedne", PRZYKLADY.pliki.zbedne, 2).map(t => [t, 0])
      ]);
      const pola = interfejs.polaWyboru(reszta, opcje.map(o => o[0]));
      interfejs.przycisk(reszta, "Kopiuj", () => {
        if (!pola.every((c, i) => c.checked === !!opcje[i][1])) return zle("Skopiuj tylko dokumenty, zdjęcia i prace, czyli to, czego nie da się odtworzyć. Pliki tymczasowe i instalatory pomiń.");
        reszta.innerHTML = "<b>Kopiowanie…</b>";
        interfejs.postep(reszta, 1800, () => { biurko.wyjmij(); dobrze(); });
      }, "a");
    }, podpucha);
  },

  bluetooth(b, dobrze, zle) { scenariuszGry(b, dobrze, zle, "bluetooth", PRZYKLADY.bluetooth, "Obce urządzenie", "Telefon pokazuje komunikat:"); },

  prosba(b, dobrze, zle) { scenariuszGry(b, dobrze, zle, "prosby", PRZYKLADY.prosby, "Prośba od „znajomego”", "Ktoś pisze do Ciebie:"); }
};

const zadanieLaduje = () => !!stan.zadanie && stan.operacje.some(o => o.zad);

function otworzZadanie(a) {
  if (stan.zadanie && stan.zadanie !== a && zadanieLaduje()) { komunikat("Trwa już inne zadanie. Poczekaj, aż się skończy ładowanie.", "bad"); DZWIEKI.blad(); return; }
  const b = $("#v-task"); b.innerHTML = ""; stan.zadanie = a;
  const wroc = elem("button", "a", "Wróć"); wroc.onclick = () => zamknijZadanie(false);
  const zawartosc = elem("div"); b.append(wroc, zawartosc); widok("task");
  biurko.wyczysc(); ksiazki.polec(a.zag.id);

  const poDobrej = () => {
    const premia = Math.max(0, Math.round(100 - a.m)), punkty = pktZa(USTAW.punktyZadanie + premia);
    stan.odparte++; stan.pkt += punkty;
    usunAlert(a); DZWIEKI.dobrze();
    komunikat("Zagrożenie „" + a.zag.nazwa + "” odparte. +" + punkty, "good"); zamknijZadanie(true);
  };
  // każda zła odpowiedź zabiera jedno serce
  const poZlej = wiadomosc => stracZycie(wiadomosc + " Tracisz serce.", a.zag.porada, DZWIEKI.blad);
  ZADANIA[a.zag.id](zawartosc, poDobrej, poZlej);
  const wstawka = (fab().wstawki || {})[a.zag.id];
  if (wstawka) zawartosc.insertBefore(elem("p", "fab", wstawka), zawartosc.firstChild);
}
function zamknijZadanie(rozwiazane, bezWidoku) {
  stan.timery.forEach(clearTimeout); stan.timery = []; stan.potrzebny = 0; stan.zadanie = null;
  stan.operacje = stan.operacje.filter(o => !o.zad);
  biurko.wyczysc(); ksiazki.polec(null);
  $("#ph").innerHTML = "Telefon<br>brak kodów"; $("#ph").classList.remove("on");
  if (!bezWidoku && pulpit.otwarta === "alerty") widok("al");
  if (!rozwiazane) komunikat("Zadanie przerwane.");
}
