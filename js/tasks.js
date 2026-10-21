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
    i.style.transition = "width " + czasMs + "ms linear"; void i.offsetWidth; i.style.width = "100%";
    pozniej(poCzasie, czasMs);
  },

  wybor(b, opcje, dobrze, zle, komunikatBledu) {
    pomieszaj(opcje).forEach(o => interfejs.przycisk(b, o[0], () => o[1] ? dobrze() : zle(typeof komunikatBledu === "function" ? komunikatBledu(o) : komunikatBledu)));
  }
};

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
    interfejs.przycisk(b, "Zatwierdź kod", () => {
      if (pulapka) return zle("Podałeś kod, o który poprosił ktoś obcy. Kod 2FA to klucz do konta i zostaje tylko u Ciebie.");
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
        const wiersz = elem("div", "", (dobry ? "✓ " : "○ ") + napis); wiersz.style.color = dobry ? "var(--zielony)" : "var(--przygaszony)"; r.appendChild(wiersz);
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
    interfejs.wybor(b, l.opcje, dobrze, zle, "Spójrz na domenę tuż przed pierwszym ukośnikiem. Podróbki mają literówki, dodatkowe człony i dziwne końcówki (.top, .xyz, .ru).");
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
  }
};

function otworzZadanie(a) {
  const b = $("#v-task"); b.innerHTML = ""; stan.zadanie = a;
  const wroc = elem("button", "a", "← Wróć"); wroc.onclick = () => zamknijZadanie(false);
  const zawartosc = elem("div"); b.append(wroc, zawartosc); widok("task");

  const poDobrej = () => {
    const premia = Math.max(0, Math.round(100 - a.m)), punkty = pktZa(USTAW.punktyZadanie + premia);
    stan.odparte++; stan.pkt += punkty;
    usunAlert(a); DZWIEKI.dobrze();
    komunikat("Zagrożenie „" + a.zag.nazwa + "” odparte. +" + punkty, "good"); zamknijZadanie(true);
  };
  // każda zła odpowiedź zabiera jedno serce
  const poZlej = wiadomosc => stracZycie(wiadomosc + " −1 ♥", a.zag.porada, DZWIEKI.blad);
  ZADANIA[a.zag.id](zawartosc, poDobrej, poZlej);
  const wstawka = (fab().wstawki || {})[a.zag.id];
  if (wstawka) zawartosc.insertBefore(elem("p", "fab", wstawka), zawartosc.firstChild);
}
function zamknijZadanie(rozwiazane) {
  stan.timery.forEach(clearTimeout); stan.timery = []; stan.potrzebny = 0; stan.zadanie = null;
  $("#ph").innerHTML = "Telefon<br>brak kodów"; $("#ph").classList.remove("on");
  widok("al");
  if (!rozwiazane) komunikat("Zadanie przerwane.");
}
