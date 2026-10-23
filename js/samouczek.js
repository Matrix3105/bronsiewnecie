'use strict';

const KROKI_SAMOUCZKA = [
  {tytul: "O co chodzi w grze", tekst: [
    "Jesteś sam w pokoju, a w sieci ktoś próbuje włamać się na Twoje konta. Musisz <b>przetrwać dobę od 6:00 do 6:00</b> i odpierać ataki, zanim zabiorą Ci wszystkie serca.",
    "Kampania trwa <b>5 dób</b>, a każda jest trochę trudniejsza. Potem możesz grać dalej w <b>trybie nieskończonym</b>, w którym liczą się punkty.",
    "Przy okazji uczysz się, jak naprawdę chronić się w internecie: hasła, phishing, fałszywe sklepy, obcy w sieci."]},
  {tytul: "Fabuła", tekst: [
    "Na początku nowej gry <b>wybierasz fabułę</b> albo ją losujesz, np. wirus z „darmowej gry”, wyciek hasła albo fałszywe Wi‑Fi. To historia tego, <b>jak doszło do ataku</b>.",
    "Fabuła wpływa na grę: <b>jej zagrożenia pojawiają się częściej</b>, a maile i zadania nawiązują do tej historii."]},
  {tytul: "Pulpit i aplikacje", tekst: [
    "Monitor pokazuje <b>pulpit komputera</b> z aplikacjami: <b>Alerty</b>, <b>Poczta</b>, <b>Komunikator</b>, <b>Antywirus</b> i <b>Panel systemu</b>. Kliknij ikonę, żeby ją otworzyć, a „Zamknij” albo „Pulpit” wraca na pulpit.",
    "<b>Czerwona liczba</b> na ikonie mówi, że coś na Ciebie czeka, a <b>migająca</b>, że sprawa jest pilna. Pasek na dole podsumowuje, ile pilnych spraw jest teraz.",
    "Zmiana aplikacji w trakcie minigry z Alertów przerywa to zadanie."]},
  {tytul: "Alerty i włamania", tekst: [
    "Na monitorze, w zakładce <b>Alerty</b>, pojawiają się zagrożenia. Każde ma pasek, który <b>stale rośnie</b>.",
    "Kliknij <b>„Reaguj”</b> i rozwiąż minigrę. Gdy pracujesz nad zadaniem, pasek przestaje rosnąć. Jeśli dojdzie do 100% bez Twojej reakcji, następuje <b>włamanie i tracisz serce</b>.",
    "Im szybciej zareagujesz, tym więcej punktów dostaniesz."]},
  {tytul: "Minigry", tekst: [
    "Każde zagrożenie to inna minigra: ocena prośby o kod 2FA, szukanie złośliwego pliku, wybór bezpiecznej sieci Wi‑Fi, układanie hasła, rozmowa z obcym i wiele innych. Przykłady za każdym razem są inne.",
    "<b>Zła odpowiedź zabiera serce</b>, a dobra zamyka zagrożenie i daje punkty. Czytaj uważnie: czasem uczciwy komunikat to nie atak, a niewinnie wyglądająca prośba bywa pułapką."]},
  {tytul: "Poczta i komunikator", tekst: [
    "W <b>Poczcie</b> i w <b>Komunikatorze</b> przychodzą wiadomości. <b>Zwykłe nie mają limitu czasu</b>: zignorowanie ich nic nie kosztuje, ale nie daje też punktów.",
    "Przy mailu kliknij „Zgłoś phishing” albo „Bezpieczny”. <b>Nie każdy mail to oszustwo</b>, a zła ocena zabiera serce. W czacie wybierasz odpowiedź, a zły wybór też kosztuje serce.",
    "Czasem przychodzi mail oznaczony jako <b>pilny</b>. To prawdziwy alarm (np. ktoś zmienia Ci hasło) i trzeba zdążyć zareagować. Gdy zabraknie czasu, tracisz serce.",
    "Niektóre maile mają załącznik. <b>Złośliwy załącznik zostawi wirusa na pulpicie</b>, więc nie otwieraj plików z dziwnymi końcówkami, np. .pdf.exe."]},
  {tytul: "Antywirus i pliki na pulpicie", tekst: [
    "Czasem na pulpicie pojawia się <b>podejrzany plik</b> z paskiem czasu. Gdy pasek się skończy, wirus się uruchamia i tracisz serce. <b>Nie otwieraj go.</b>",
    "Uruchom <b>Antywirus</b> i skanuj komputer. Przy każdej znalezionej pozycji wybierz „Usuń” albo „Zostaw”, patrząc na źródło i podpis. <b>Antywirus czasem się myli</b>, a usunięcie bezpiecznego pliku zabiera serce.",
    "Wyleczony plik <b>przenieś do kosza</b>: kliknij go na pulpicie i wybierz „Przenieś do kosza”. Sam kosz nie wyleczy zainfekowanego pliku."]},
  {tytul: "Panel systemu i zdarzenia", tekst: [
    "W <b>Panelu systemu</b> pilnujesz zapory, aktualizacji i listy urządzeń w sieci domowej. Czasem coś się psuje: wyłącza się zapora, pojawia się łatka albo obce urządzenie.",
    "Takie zdarzenia mają pasek czasu. Gdy go zabraknie, tracisz serce, bo problem naprawdę ktoś wykorzystał. Odłączaj tylko obce urządzenia, bo odłączenie swojego też zabiera serce."]},
  {tytul: "Telefon i kody 2FA", tekst: [
    "Dotknij <b>telefonu na biurku</b>, żeby zobaczyć kod 2FA. Kod jest widoczny tylko przez chwilę.",
    "Uwaga: kod podajesz <b>tylko wtedy, gdy to Ty się logujesz</b>. Gdy ktoś obcy o niego prosi, wybierz „To nie ja, odrzuć”."]},
  {tytul: "Książki z podpowiedziami", tekst: [
    "Na półce stoją książki z poradami (na małym ekranie jest przycisk „Książki”). Kliknij książkę, żeby ją otworzyć.",
    "Gdy otwierasz zadanie, <b>pasująca książka zaczyna pulsować</b>. Możesz z nich korzystać także wtedy, gdy gra jest wstrzymana."]},
  {tytul: "Przedmioty na biurku", tekst: [
    "Niektóre zadania wymagają działania na biurku: wpięcia <b>właściwego pendrive’a</b> albo wyjęcia płyty z <b>szuflady z płytami</b>. Gra podpowie, co zrobić.",
    "<b>Obcego, szarego pendrive’a nigdy nie wpinaj.</b> Twój jest niebieski."]},
  {tytul: "Serca, punkty i pora dnia", tekst: [
    "Masz <b>5 serc</b>. Tracisz je za włamanie, złą odpowiedź w minigrze i źle ocenionego maila. Gdy zostaje 0, dzień kończy się porażką: w kampanii możesz spróbować go jeszcze raz, a w trybie nieskończonym kończy to serię.",
    "<b>W dzień jest spokojniej, a w nocy (od 18:00) atakują mocniej</b>, ale punkty zdobyte w nocy są więcej warte. Po każdej dobie dostajesz lekcję do zapamiętania."]},
  {tytul: "Przyciski w menu", tekst: [
    "<b>Wznów wstrzymaną grę</b> wraca dokładnie tam, gdzie zrobiłeś pauzę. Gra pauzuje się też, gdy zmienisz kartę lub okno.",
    "<b>Kontynuuj kampanię</b> zaczyna zapisany dzień od początku, na przykład po przejściu poprzedniego dnia albo po przegranej.",
    "<b>Nowa gra</b> zaczyna od dnia 1, kasuje postęp kampanii i pozwala wybrać fabułę."]}
];

const samouczek = {
  nr: 0,

  otworz() { samouczek.nr = 0; samouczek.rysuj(); pokaz("s-tutorial"); },

  idz(krok) {
    const nowy = samouczek.nr + krok;
    if (nowy >= KROKI_SAMOUCZKA.length) return ekranGlowny();
    if (nowy < 0) return;
    samouczek.nr = nowy; samouczek.rysuj();
  },

  rysuj() {
    const nr = samouczek.nr, ile = KROKI_SAMOUCZKA.length, k = KROKI_SAMOUCZKA[nr];
    $("#tut-licznik").textContent = "Samouczek: krok " + (nr + 1) + " z " + ile;
    $("#tut-tytul").textContent = k.tytul;
    const tekst = $("#tut-tekst"); tekst.innerHTML = "";
    k.tekst.forEach(a => { const p = elem("p"); p.innerHTML = a; tekst.appendChild(p); });
    const kropki = $("#tut-kropki"); kropki.innerHTML = "";
    KROKI_SAMOUCZKA.forEach((_, i) => kropki.appendChild(elem("i", i === nr ? "on" : i < nr ? "byla" : "")));
    $("#tut-wstecz").style.visibility = nr ? "visible" : "hidden";
    $("#tut-dalej").textContent = nr === ile - 1 ? "Gotowe, wracam do menu" : "Dalej";
  }
};

document.addEventListener("keydown", e => {
  if (!$("#s-tutorial").classList.contains("on")) return;
  if (e.key === "ArrowRight") samouczek.idz(1);
  else if (e.key === "ArrowLeft") samouczek.idz(-1);
  else if (e.key === "Escape") ekranGlowny();
});
