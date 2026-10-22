'use strict';

// Podpowiedzi są w książkach na półce w tle. Kliknij książkę, żeby ją otworzyć.
// Gdy otwierasz zadanie, pasująca książka zaczyna pulsować.
const KSIAZKI = [
  {id: "hasla", krotka: "Hasła", tytul: "Hasła i wycieki", kolor: "#c0504d", w: 34, h: 78, podp: [
    "Długie hasło z kilku losowych słów jest silniejsze niż krótkie z wykrzyknikiem.",
    "Imię, data urodzenia, „qwerty” i „123456” zgadują się pierwsze.",
    "Jedno hasło to jedno konto. Po wycieku zmieniasz hasło wszędzie, gdzie go użyłeś.",
    "Nikt rozsądny nie prosi o hasło w mailu, na czacie ani przez telefon."]},
  {id: "dwuetap", krotka: "2FA", tytul: "Kody i weryfikacja", kolor: "#4f81bd", w: 28, h: 66, podp: [
    "Kod z SMS-a lub aplikacji to jednorazowy klucz do Twojego konta. Nie podaje się go nikomu.",
    "Najpierw zapytaj: czy to ja się teraz loguję? Jeśli nie, odrzuć prośbę.",
    "Powiadomienie, które zgadza się z tym, co robisz, jest zwykle w porządku.",
    "Obsługa serwisu nigdy nie prosi o kod „do weryfikacji”."]},
  {id: "phishing", krotka: "Phishing", tytul: "Phishing i linki", kolor: "#d9a441", w: 36, h: 84, podp: [
    "Czytaj adres od końca: liczy się ostatni człon domeny przed pierwszym ukośnikiem.",
    "Podróbki mają literówki (0 zamiast o), dodatkowe człony i końcówki typu .top, .xyz.",
    "Pośpiech („masz 15 minut!”) to broń oszustów.",
    "Do banku i serwisów wchodź ze znanej zakładki albo z aplikacji, nie z linku w wiadomości."]},
  {id: "profil", krotka: "Profil", tytul: "Profil i prywatność", kolor: "#6fae6f", w: 30, h: 70, podp: [
    "Dokumenty, bilety z kodami, karty i adres nie nadają się do pokazywania w sieci.",
    "Nie publikuj, że dom jest pusty, ani lokalizacji na żywo.",
    "Profil prywatny, 2FA i wyłączona lokalizacja w zdjęciach to szybkie zabezpieczenia.",
    "Akceptuj zaproszenia tylko od osób, które znasz: sprawdź wspólnych znajomych i wiek konta."]},
  {id: "prawda", krotka: "Prawda", tytul: "Prawda w sieci", kolor: "#8e6bbf", w: 28, h: 60, podp: [
    "Szukaj źródła, autora i daty. Brak któregoś z nich to ostrzeżenie.",
    "Krzykliwy ton i „udostępnij, zanim usuną” zdradzają fałszywkę.",
    "Sprawdź tę samą wiadomość w kilku niezależnych miejscach.",
    "Obiecywanie pieniędzy za udostępnienie to prawie zawsze oszustwo."]},

  {id: "pliki", krotka: "Wirusy", tytul: "Pliki i wirusy", kolor: "#c9783b", w: 32, h: 74, podp: [
    "Podwójne rozszerzenie (.pdf.exe) to wirus udający dokument.",
    "Programy (.exe, .scr, .bat, .js) nie są dokumentami ani zdjęciami.",
    "Cracki i „odblokowane” gry często niosą wirusa.",
    "Skanuj antywirusem to, co pobierasz z niepewnych miejsc."]},
  {id: "wifi", krotka: "Wi‑Fi", tytul: "Wi‑Fi i router", kolor: "#3b9fb0", w: 30, h: 82, podp: [
    "Podróbki sieci kopiują nazwy albo kuszą darmowym internetem bez hasła.",
    "W miejscu publicznym korzystaj z VPN albo z internetu w telefonie.",
    "Router: silne szyfrowanie, zmienione hasło panelu i aktualizacje.",
    "WPS i zdalny dostęp do panelu routera lepiej wyłączyć."]},
  {id: "zakupy", krotka: "Zakupy", tytul: "Zakupy i paczki", kolor: "#c05a8c", w: 34, h: 68, podp: [
    "Za dobra cena to alarm. Sprawdź adres, dane firmy, regulamin i opinie z różnych miejsc.",
    "Przelew na prywatne konto i „przedpłata” to znak oszustwa.",
    "Licznik „zostały 3 minuty” ma Cię tylko pospieszyć.",
    "Paczkę śledź w aplikacji kuriera, a nie w linku z SMS-a. Zwykła informacja o paczce, na którą czekasz, jest w porządku."]},
  {id: "telefon", krotka: "Telefon", tytul: "Telefon, QR i Bluetooth", kolor: "#5a7d3b", w: 32, h: 76, podp: [
    "Bank, policja i kurier nie proszą o kody BLIK, przelewy ani dane karty przez telefon.",
    "„Nikomu nie mów” to znak oszustwa. Rozłącz się i zadzwoń na znany numer.",
    "Kod QR to zwykły link. Nie loguj się ani nie płać przez kod z naklejki czy plakatu.",
    "Plik przez Bluetooth od nieznajomego odrzuć. Od znanej osoby, na którą czekasz, możesz przyjąć."]},
  {id: "aplikacje", krotka: "Aplikacje", tytul: "Aplikacje i dodatki", kolor: "#b8504d", w: 36, h: 62, podp: [
    "Pobieraj tylko z oficjalnego sklepu i sprawdź wydawcę oraz liczbę pobrań.",
    "Aplikacja ma dostać tylko te uprawnienia, których naprawdę potrzebuje.",
    "Wersje „odblokowane”, „pro za darmo” i pliki .apk z forów to pułapka.",
    "Darmowy VPN albo dodatek z dostępem do wszystkich stron może podglądać Twoje dane."]},

  {id: "aktualizacje", krotka: "Łatki", tytul: "Aktualizacje", kolor: "#4a6fb5", w: 28, h: 72, podp: [
    "Aktualizacje łatają dziury, które wykorzystują wirusy takie jak keyloggery.",
    "Instaluj je z ustawień systemu albo oficjalnego sklepu.",
    "Okienko w przeglądarce, które każe „zaktualizować odtwarzacz”, to pułapka.",
    "Nie każdy komunikat to alarm: informacja o aktualizacji w Twoim programie bywa zwykła."]},
  {id: "hejt", krotka: "Hejt", tytul: "Hejt i dowody", kolor: "#7a7a8c", w: 26, h: 64, podp: [
    "Nie odpisuj hejterowi. Zrób zrzuty ekranu jako dowód.",
    "Zablokuj i zgłoś konto administratorowi platformy.",
    "Powiedz zaufanej dorosłej osobie. Nie zostawaj z tym sam.",
    "Nie mścij się i nie publikuj cudzych danych."]},
  {id: "obcy", krotka: "Obcy", tytul: "Obcy i gry", kolor: "#cf8a3a", w: 30, h: 80, podp: [
    "Obcym nie podajesz wieku, miejsca, szkoły ani numeru telefonu.",
    "„Nie mów rodzicom” to sygnał alarmowy: zablokuj, zgłoś i powiedz dorosłemu.",
    "Znajomy z nowego konta? Sprawdź go innym kanałem, na przykład na żywo.",
    "W grach wymieniaj tylko oficjalną wymianą. „Ty pierwszy” to przekręt. Prośba znajomej o notatki to co innego."]},
  {id: "kopie", krotka: "Kopie", tytul: "Kopie zapasowe", kolor: "#3b8f6e", w: 34, h: 70, podp: [
    "Ważne pliki trzymaj w dwóch miejscach, np. na komputerze i na płycie albo pendrivie.",
    "Gdy wirus szyfruje pliki, nie płacisz okupu. Przywracasz kopię.",
    "Kopiuj to, czego nie da się odtworzyć: dokumenty i zdjęcia. Pliki tymczasowe pomiń.",
    "Płyta bez opisu albo z gazety nie jest Twoją kopią zapasową."]},
  {id: "usb", krotka: "USB", tytul: "Pendrive i klucze", kolor: "#5a8fd1", w: 26, h: 58, podp: [
    "Własny klucz USB wpinasz tylko Ty. Obcych pendrive’ów nie wpina się wcale.",
    "Pendrive znaleziony na ulicy lub pod drzwiami to klasyczna pułapka. Oddaj go dorosłemu.",
    "Przed otwarciem plików z nowego pendrive’a przeskanuj go antywirusem.",
    "Szary pendrive z naklejką „Zdjęcia klasy” nie jest Twoim niebieskim kluczem."]}
];

// które zagrożenie, z której książki można skorzystać
const KSIAZKA_DLA = {
  zgadywanie: "dwuetap", logowanie: "dwuetap", klucz: "usb", pendrive: "usb",
  profil: "profil", ustawienia: "profil", znajomi: "profil",
  dezinformacja: "prawda", zlosliwyPlik: "pliki",
  hasla: "hasla", wyciek: "hasla", linki: "phishing",
  wifi: "wifi", router: "wifi", sklep: "zakupy", paczka: "zakupy",
  telefon: "telefon", kod: "telefon", bluetooth: "telefon",
  aplikacja: "aplikacje", uprawnienia: "aplikacje", rozszerzenie: "aplikacje",
  keylogger: "aktualizacje", aktualizacja: "aktualizacje",
  hejt: "hejt", obcy: "obcy", oszustwoWGrze: "obcy", prosba: "obcy",
  ransomware: "kopie", kopia: "kopie"
};

const ksiazki = {
  otwarta: null, ostatnia: "hasla", polecana: null,

  start() {
    const polka = $("#shelf"); polka.innerHTML = "";
    for (let r = 0; r < 3; r++) {
      const rz = elem("div", "polka");
      KSIAZKI.slice(r * 5, r * 5 + 5).forEach((k, i) => {
        const b = elem("button", "ks" + ((r + i) % 4 === 3 ? " lean" : ""), k.krotka);
        b.type = "button"; b.dataset.id = k.id;
        b.style.cssText = "background:" + k.kolor + ";width:" + k.w + "px;height:" + k.h + "px";
        b.title = k.tytul; b.setAttribute("aria-label", "Książka: " + k.tytul);
        b.onclick = () => ksiazki.otworz(k.id);
        rz.appendChild(b);
      });
      polka.appendChild(rz);
    }
    $("#ksbtn").onclick = () => ksiazki.otworz(ksiazki.polecana ? KSIAZKA_DLA[ksiazki.polecana] : ksiazki.ostatnia);
    $("#ks-x").onclick = ksiazki.zamknij;
  },

  otworz(id) {
    const k = KSIAZKI.find(x => x.id === id) || KSIAZKI[0];
    DZWIEKI.klik();
    ksiazki.otwarta = ksiazki.ostatnia = k.id;
    $("#ks-tytul").textContent = k.tytul;
    const ul = $("#ks-lista"); ul.innerHTML = "";
    k.podp.forEach(t => ul.appendChild(elem("li", "", t)));
    const ch = $("#ks-chips"); ch.innerHTML = "";
    KSIAZKI.forEach(x => {
      const c = elem("button", "chip" + (x.id === k.id ? " on" : ""), x.krotka);
      c.type = "button"; c.onclick = () => ksiazki.otworz(x.id); ch.appendChild(c);
    });
    $("#okno-ks").classList.add("on");
    $("#shelf").querySelectorAll(".ks").forEach(b => b.classList.toggle("otwarta", b.dataset.id === k.id));
  },

  zamknij() {
    ksiazki.otwarta = null; $("#okno-ks").classList.remove("on");
    $("#shelf").querySelectorAll(".ks.otwarta").forEach(b => b.classList.remove("otwarta"));
  },

  // podświetl książkę pasującą do zadania (null = wyłącz)
  polec(zagId) {
    ksiazki.polecana = zagId || null;
    const id = zagId ? KSIAZKA_DLA[zagId] : null;
    document.querySelectorAll(".ks").forEach(b => b.classList.toggle("polecana", b.dataset.id === id));
    $("#ksbtn").classList.toggle("polecany", !!id);
  }
};
