'use strict';

/* ---------- dodatkowe maile ----------
   p: 1 = phishing, 0 = bezpieczny
   zal: załącznik {n: nazwa, zly: 1 = złośliwy program} (od 2. dnia) */
MAILE.push(
  // phishing
  {from:"obsluga@netflix-platnosc.top", s:"Płatność odrzucona", b:"Zaktualizuj dane karty w ciągu 24h: netflix-karta.top/pay", p:1,
   t:"Prawdziwy serwis nie prosi o dane karty w mailu, a końcówka .top to znak ostrzegawczy."},
  {from:"support@steamcommunlty.com", s:"Twoja wymiana czeka na potwierdzenie", b:"Zaloguj się, żeby zaakceptować ofertę: steamcommunlty.com/trade", p:1,
   t:"W domenie jest „l” zamiast „i” (communlty). Oferty wymiany akceptuje się w aplikacji."},
  {from:"powiadomienie@inpost-odbior.info", s:"Paczka czeka. Dopłata 0,99 zł", b:"Opłać, inaczej wrócimy ją do nadawcy: inpost-odbior.info/pay", p:1,
   t:"Drobna dopłata to sztuczka na dane karty, a domena nie jest firmowa."},
  {from:"alert@dysk-google.co", s:"Twoja chmura jest pełna", b:"Kup dodatkowe 100 GB za 1 zł: dysk-google.co/oferta", p:1,
   t:"To nie jest domena google.com, a oferta za złotówkę służy do wyłudzenia danych karty."},
  {from:"wychowawca.klasa@gmail.com", s:"Wpłata na wycieczkę", b:"Wyślij mi kod BLIK, wpłacę za Ciebie u skarbnika. Nie mów nikomu, zrobię niespodziankę.", p:1,
   t:"Nauczyciel nie prosi o kody BLIK mailem, a „nie mów nikomu” to sygnał alarmowy."},
  {from:"support@discord-odwolanie.com", s:"Twoje konto zostanie zbanowane", b:"Odwołaj się w 12 godzin: discord-odwolanie.com/appeal", p:1,
   t:"Pisze obca domena, a straszenie banem i pośpiech to klasyczny phishing."},
  {from:"bezpieczenstwo@bank-mobilny.xyz", s:"Zeskanuj kod, żeby odblokować konto", b:"Kod QR do odblokowania jest w tym mailu. Wystarczy zeskanować go telefonem.", p:1,
   t:"Kod QR to zwykły link, a bank nie odblokowuje kont kodem z maila."},
  {from:"pomoc@wsparcie-komputerowe.pl", s:"Wykryliśmy wirusa na Twoim komputerze", b:"Zadzwoń pod numer 800 123 456 i zainstaluj program do zdalnej pomocy.", p:1,
   t:"Nikt nie wykrywa wirusów przez maila i nie każe instalować zdalnego dostępu."},
  {from:"konkurs@fortnite-vbucks.top", s:"Odbierz 5000 V-Bucks", b:"Zaloguj się kontem Epic, żeby odebrać nagrodę.", p:1,
   t:"Darmowa waluta za logowanie przez obcą stronę to kradzież konta."},
  {from:"rekruter@szybki-zarobek.pl", s:"500 zł za przyjmowanie przelewów", b:"Wystarczy, że udostępnisz nam swoje konto bankowe.", p:1,
   t:"To pranie pieniędzy. Nikomu nie udostępniasz konta, a przestępstwo może spaść na Ciebie."},
  {from:"kuba.nowak.1999@gmail.com", s:"Zobacz, co mam ze zdjęć z imprezy", b:"Link: zdjecia-impreza.top/kuba", p:1,
   t:"Znajomy z linkiem bez kontekstu: jego konto mogło zostać przejęte. Zapytaj go innym kanałem."},
  {from:"reset@accounts-google.top", s:"Zresetuj hasło", b:"Kliknij, żeby ustawić nowe hasło: accounts-google.top/reset", p:1,
   t:"Nie prosiłeś o reset, a link prowadzi do obcej domeny."},
  {from:"faktura@abonament-premium.biz", s:"Odnowiliśmy Twoją subskrypcję: 249 zł", b:"Jeśli to błąd, zaloguj się i anuluj: anuluj-abonament.biz", p:1,
   t:"Straszenie nieznaną opłatą ma Cię zmusić do kliknięcia i podania danych."},
  {from:"ankieta@sklep-nagrody.com", s:"Wypełnij ankietę i wygraj 500 zł", b:"Podaj imię, adres i numer karty do weryfikacji.", p:1,
   t:"Nagroda nie wymaga numeru karty. To wyłudzanie danych."},

  // phishing z załącznikiem
  {from:"ksiegowosc@firma-faktury.pl", s:"Faktura do opłacenia", b:"W załączniku faktura za usługę. Termin płatności: jutro.", zal:{n:"faktura_0845.pdf.exe", zly:1}, p:1,
   t:"Plik .pdf.exe to program udający dokument."},
  {from:"kolega.klasa2b@gmail.com", s:"Mój projekt na ocenę", b:"Otwórz plik i napisz, co sądzisz.", zal:{n:"projekt_final.docx.scr", zly:1}, p:1,
   t:"Końcówka .scr oznacza program, a nie dokument. Konto kolegi mogło zostać przejęte."},
  {from:"gry@darmowe-gry-pobierz.top", s:"Twoja darmowa gra", b:"Pobierz i zainstaluj, a zagrasz jeszcze dziś.", zal:{n:"gra_instalator.exe", zly:1}, p:1,
   t:"Instalator z obcej strony, wysłany bez prośby, to najczęściej wirus."},
  {from:"kadry@praca-od-zaraz.xyz", s:"Twoje CV zostało wybrane", b:"Podpisz umowę w załączniku i odeślij.", zal:{n:"umowa.pdf.js", zly:1}, p:1,
   t:"Umowa nie ma końcówki .js. To skrypt, który uruchomi wirusa."},
  {from:"zdjecia@album-rodzinny.biz", s:"Zdjęcia z wakacji", b:"Zobacz zdjęcia, które dla Ciebie zebraliśmy.", zal:{n:"wakacje_zdjecia.jpg.exe", zly:1}, p:1,
   t:"Zdjęcia nie są programami. Podwójne rozszerzenie zdradza wirusa."},

  // bezpieczne
  {from:"no-reply@steampowered.com", s:"Twój kod Steam Guard", b:"Wpisz kod tylko wtedy, gdy to Ty się logujesz. Nikt z obsługi nie poprosi Cię o niego.", p:0,
   t:"Oficjalny nadawca, brak linków. Jeśli to nie Ty się logujesz, po prostu nic nie robisz."},
  {from:"kurier@inpost.pl", s:"Paczka jest w drodze", b:"Odbierzesz ją w paczkomacie. Numer śledzenia znajdziesz w aplikacji InPost Mobile.", p:0,
   t:"Czekasz na paczkę, a mail nie prosi o dane ani o dopłatę."},
  {from:"wychowawca@szkola.pl", s:"Wycieczka klasowa: zgody do piątku", b:"Oddajcie podpisane zgody na lekcji. Płatność tylko u skarbnika klasy.", p:0,
   t:"Znany nadawca, zero linków, płatność z klasą u skarbnika."},
  {from:"info@twojbank.pl", s:"Nowe zasady kart od 1 marca", b:"Szczegóły znajdziesz po zalogowaniu w aplikacji. Nigdy nie prosimy o dane w mailu.", p:0,
   t:"Informacja bez linków i bez próśb o dane. Logujesz się sam, w aplikacji."},
  {from:"no-reply@epicgames.com", s:"Darmowa gra tygodnia", b:"Odbierz ją w aplikacji Epic Games. Nie musisz podawać karty.", p:0,
   t:"Wiadomość z oficjalnej domeny, a odbiór jest w aplikacji."},
  {from:"ciocia.kasia", s:"Zdjęcia z wakacji", b:"Wrzuciłam je na wspólny album rodzinny. Zobacz, jak będziesz miał chwilę.", p:0,
   t:"Znana osoba i zwykła wiadomość."},
  {from:"nauczyciel.matematyki@szkola.pl", s:"Wyniki sprawdzianu", b:"Oceny są już w dzienniku elektronicznym. Logujesz się tak jak zawsze.", p:0,
   t:"Znany nadawca, a logujesz się samodzielnie, bez linku."},
  {from:"no-reply@youtube.com", s:"Nowy film z kanału, który subskrybujesz", b:"Obejrzysz go w aplikacji lub na stronie.", p:0,
   t:"Powiadomienie z subskrypcji, którą sam włączyłeś."},
  {from:"kolega@szkola.pl", s:"Projekt z historii", b:"Podzielmy się: ja zrobię wstęp, Ty zakończenie. Pasuje?", p:0,
   t:"Znana osoba i zwykła prośba."},
  {from:"trener@klub.pl", s:"Mecz w niedzielę", b:"Zbiórka o 9:30 pod halą, weź strój i butelkę wody.", p:0,
   t:"Znany nadawca i zwykła informacja."},
  {from:"biblioteka@miasto.pl", s:"Książka czeka na odbiór", b:"Zarezerwowana pozycja jest do odbioru do piątku. Bez opłat.", p:0,
   t:"Rezerwację sam zrobiłeś, a mail nie prosi o żadne dane."},

  // bezpieczne z załącznikiem
  {from:"nauczyciel@szkola.pl", s:"Zadania na piątek", b:"Zadania z rozdziału 5 w załączniku.", zal:{n:"zadania_rozdzial5.pdf", zly:0}, p:0,
   t:"Znany nadawca i zwykły dokument PDF."},
  {from:"mama", s:"Lista zakupów", b:"Podrzuć, jak będziesz wracał.", zal:{n:"lista.txt", zly:0}, p:0,
   t:"To po prostu mama, a plik tekstowy."},
  {from:"sekretariat@szkola.pl", s:"Plan lekcji od poniedziałku", b:"Nowy plan w załączniku.", zal:{n:"plan_lekcji.pdf", zly:0}, p:0,
   t:"Znany nadawca i zwykły dokument."}
);

/* ---------- pilne maile: prawdziwe alarmy, na które masz ograniczony czas ---------- */
const PILNE = [
  {from:"bezpieczenstwo@accounts.google.com", s:"Ktoś próbuje zmienić Twoje hasło",
   b:"Wykryliśmy próbę zmiany hasła z nowego urządzenia. Sam niczego nie zmieniałeś. W tej wiadomości nie ma linków.",
   opcje:[["Wchodzę na konto ze znanej zakładki i zmieniam hasło", 1], ["Odpisuję na maila, że to nie ja", 0], ["Czekam, może to pomyłka", 0]],
   t:"Przy prawdziwym alarmie wchodzisz na konto sam, ze znanej zakładki, i zmieniasz hasło.",
   blad:"Odpisanie na maila i czekanie nie zatrzymają włamywacza. Zmień hasło na stronie, którą otwierasz sam.",
   skutek:"Włamywacz zmienił hasło do Twojego konta"},
  {from:"powiadomienia@twojbank.pl", s:"Podejrzana płatność kartą: 899 zł",
   b:"Karta została obciążona w sklepie, którego nie znasz. Jeśli to nie Ty, zablokuj kartę w aplikacji banku. Nie podawaj nigdzie danych karty.",
   opcje:[["Blokuję kartę w aplikacji banku", 1], ["Odpisuję i podaję dane karty, żeby bank sprawdził", 0], ["Zostawiam, bank sam to wyjaśni", 0]],
   t:"Kartę blokuje się od razu w aplikacji banku. Dane karty zostają u Ciebie.",
   blad:"Bank nie prosi o dane karty w mailu, a czekanie daje złodziejowi czas. Zablokuj kartę w aplikacji.",
   skutek:"Złodziej opróżnił Twoją kartę"},
  {from:"no-reply@accounts.epicgames.com", s:"Logowanie z nowego kraju",
   b:"Ktoś zalogował się na Twoje konto z innego kraju. Jeśli to nie Ty, zmień hasło i wyloguj wszystkie urządzenia w ustawieniach konta.",
   opcje:[["Zmieniam hasło i wylogowuję wszystkie urządzenia w ustawieniach", 1], ["Wysyłam kod z maila „obsłudze”, żeby sprawdzili", 0], ["Ignoruję, w grze nic mi nie zginęło", 0]],
   t:"Zmiana hasła i wylogowanie wszystkich urządzeń wyrzuca włamywacza z konta.",
   blad:"Kodów się nie wysyła, a ignorowanie logowania z obcego kraju zostawia włamywacza na koncie.",
   skutek:"Ktoś obcy przejął Twoje konto w grze"},
  {from:"info@twoj-internet.pl", s:"Ktoś próbuje wejść do Twojego routera",
   b:"Wykryto wiele nieudanych prób logowania do panelu routera. Zmień hasło panelu w jego ustawieniach, nie przez link.",
   opcje:[["Wchodzę do panelu routera i zmieniam hasło", 1], ["Włączam zdalny dostęp do panelu, żeby dostawca sprawdził", 0], ["Niczego nie zmieniam", 0]],
   t:"Hasło do panelu routera zmieniasz sam, w jego ustawieniach.",
   blad:"Zdalny dostęp do panelu otwiera drzwi atakującym, a brak działania ich nie zamknie.",
   skutek:"Atakujący zgadł hasło do Twojego routera"},
  {from:"mama", s:"Babcia dostała dziwną wiadomość od Ciebie",
   b:"Napisała, że prosisz ją o kod BLIK z Twojego konta. Chyba tego nie pisałeś? Sprawdź swoje konta, szybko.",
   opcje:[["Zmieniam hasła, włączam 2FA i piszę babci, żeby nic nie wysyłała", 1], ["Piszę babci, że to nic takiego", 0], ["Sprawdzę to wieczorem", 0]],
   t:"Gdy ktoś pisze w Twoim imieniu, konto jest przejęte. Zmień hasła, włącz 2FA i ostrzeż odbiorców.",
   blad:"Uspokajanie i czekanie nie zatrzymają oszusta. Najpierw zabezpiecz konto, potem ostrzeż babcię.",
   skutek:"Oszust dalej wyłudzał pieniądze z Twojego przejętego konta"},
  {from:"zamowienia@sklep-sportowy.pl", s:"Potwierdzenie zamówienia za 1 299 zł",
   b:"Ktoś złożył zamówienie z Twojego konta. Jeśli to nie Ty, anuluj je w ciągu 2 godzin w aplikacji sklepu i zmień hasło.",
   opcje:[["Anuluję w aplikacji sklepu i zmieniam hasło", 1], ["Płacę, żeby zamknąć sprawę", 0], ["Czekam, może zamówienie zniknie", 0]],
   t:"Zamówienie anulujesz w aplikacji sklepu i od razu zmieniasz hasło.",
   blad:"Płacenie za cudze zamówienie i czekanie nie pomogą. Anuluj je w aplikacji i zmień hasło.",
   skutek:"Zamówienie za 1 299 zł zostało wysłane na obcy adres"}
];

/* ---------- czaty w komunikatorze ---------- */
const CZATY = [
  {od:"Zuza (klasa)", tresc:"Hej, masz notatki z geografii? Przyślesz wieczorem?",
   opcje:[["Jasne, wyślę wieczorem", 1], ["Najpierw podaj mi swoje hasło do dziennika", 0], ["Blokuję ją, bo pewnie coś kombinuje", 0]],
   blad:"Znana koleżanka i zwykła prośba o notatki. Nie każda wiadomość to atak."},
  {od:"Mama", tresc:"Wracasz o 17? Zrobię obiad.",
   opcje:[["Tak, będę o 17", 1], ["Zgłaszam to jako oszustwo", 0], ["Ignoruję", 0]],
   blad:"To po prostu mama. Zwykłe wiadomości od bliskich nie są atakiem."},
  {od:"Kapitan drużyny", tresc:"Trening jutro o 16:00. Potwierdź, że będziesz.",
   opcje:[["Potwierdzam", 1], ["Blokuję kapitana", 0], ["Podaję mu numer karty, żeby zapisał mnie na listę", 0]],
   blad:"Znany kolega z drużyny pyta o zwykłą rzecz. Karty do tego nikt nie potrzebuje."},
  {od:"Bartek", tresc:"Wrzuciłem Ci na dysk szkolny prezentację. Sprawdź, czy się otwiera.",
   opcje:[["Sprawdzam, to znany kolega i dysk szkolny", 1], ["Zgłaszam go za wysyłanie wirusów", 0], ["Odpisuję, że wirus mnie nie interesuje", 0]],
   blad:"Znany kolega i znane miejsce. Nie podejrzewaj każdego, uważaj na obce źródła."},
  {od:"nowy_kumpel_2009", tresc:"Gram z Twoim kolegą Kubą. Dasz mi swój numer i adres? Wyślę Ci skina.",
   opcje:[["Nie podaję danych nieznajomym i blokuję", 1], ["Podaję numer, to znajomy Kuby", 0], ["Pytam, gdzie mieszka", 0]],
   blad:"Obcym nie podajesz numeru ani adresu. „Znam Twojego kolegę” łatwo wymyślić."},
  {od:"Kuba (nowe konto)", tresc:"Stare konto mi zhakowali, to teraz moje. Pożyczysz mi 50 zł BLIK-iem? Oddam jutro.",
   opcje:[["Dzwonię do Kuby na znany numer, żeby to sprawdzić", 1], ["Wysyłam BLIK-a, bo to kolega", 0], ["Pytam, jak mu poszło na sprawdzianie", 0]],
   blad:"Prośba o pieniądze z „nowego konta” to klasyczny przekręt. Sprawdź kolegę innym kanałem."},
  {od:"Pomoc techniczna gry", tresc:"Twoje konto jest zagrożone. Podaj kod z SMS-a, żeby je zabezpieczyć.",
   opcje:[["Odrzucam i zgłaszam to konto", 1], ["Podaję kod, żeby zabezpieczyć konto", 0], ["Podaję tylko połowę kodu", 0]],
   blad:"Obsługa nigdy nie prosi o kody z SMS-a. Kod 2FA to klucz do konta."},
  {od:"Anna_88", tresc:"Cześć! Masz fajne zdjęcia. Ile masz lat? Nie mów rodzicom, że piszemy.",
   opcje:[["Blokuję, zgłaszam i mówię dorosłemu", 1], ["Piszę, ile mam lat", 0], ["Zgadzam się, nie powiem", 0]],
   blad:"„Nie mów rodzicom” to sygnał alarmowy. Zablokuj, zgłoś i powiedz zaufanej dorosłej osobie."},
  {od:"Gracz_Pro", tresc:"Wymiana: ja dam Ci rzadki przedmiot, a Ty wyślij mi swój pierwszy.",
   opcje:[["Odmawiam, wymieniam tylko oficjalną wymianą gry", 1], ["Wysyłam pierwszy, na pewno się uda", 0], ["Proszę o jego hasło, żeby sprawdzić konto", 0]],
   blad:"„Ty pierwszy” to klasyczny przekręt. Wymieniaj tylko oficjalnymi narzędziami gry."},
  {od:"Grupa klasowa", tresc:"Wszyscy muszą zagłosować w konkursie klasy: glosuj-klasa.top",
   opcje:[["Nie klikam i pytam wychowawcę", 1], ["Klikam i loguję się, żeby oddać głos", 0], ["Wysyłam link dalej", 0]],
   blad:"Link do obcej strony z logowaniem w czacie to pułapka, nawet gdy przyszedł w grupie klasowej."},
  {od:"Nieznany numer", tresc:"Cześć, to ja, nowy numer. Zapisz mnie i pożycz 200 zł, tylko szybko.",
   opcje:[["Dzwonię na stary numer tej osoby, żeby sprawdzić", 1], ["Przelewam, bo ktoś pilnie potrzebuje", 0], ["Odpisuję, kim jest", 0]],
   blad:"„Zmieniłem numer, pożycz pieniądze” to znany przekręt. Sprawdź to na starym numerze."},
  {od:"Hejter123", tresc:"Jesteś beznadziejny, wszyscy się z Ciebie śmieją.",
   opcje:[["Nie odpisuję, robię zrzut, blokuję i zgłaszam", 1], ["Odpisuję jeszcze gorzej", 0], ["Publikuję jego dane", 0]],
   blad:"Z hejterem się nie rozmawia. Zbierz dowody, zablokuj, zgłoś i powiedz zaufanej osobie."},
  {od:"Weronika", tresc:"Przyszedł do Ciebie SMS z kodem? Pomyliłam numer, podaj mi go, proszę.",
   opcje:[["Nie podaję kodu nikomu i blokuję", 1], ["Podaję kod, jest przecież dla niej", 0], ["Podaję pierwsze trzy cyfry", 0]],
   blad:"Kod z SMS-a to klucz do Twojego konta. Nie podajesz go nikomu, nawet znajomej."}
];

/* ---------- pliki-wirusy na pulpicie ---------- */
const WIRUSY = [
  {n:"faktura_2024.pdf.exe", z:"Podwójne rozszerzenie: program udaje dokument PDF. Źródło: załącznik od nieznanego nadawcy. Brak podpisu cyfrowego."},
  {n:"darmowe_robuxy.exe", z:"Program obiecujący darmową walutę z gry. Pobrany z nieznanej strony. Brak podpisu cyfrowego."},
  {n:"crack_gry_setup.exe", z:"Crack do płatnej gry z forum. Wewnątrz ukryty program szpiegujący."},
  {n:"zdjecie_ola.jpg.scr", z:"Udaje zdjęcie, ale to program (.scr). Przyszedł od znajomej z przejętego konta."},
  {n:"aktualizacja_flash.bat", z:"Skrypt udający aktualizację wtyczki z okienka na stronie."},
  {n:"vpn_free_instalator.exe", z:"Darmowy VPN z nieoficjalnej strony. Wydawca nieznany, brak podpisu cyfrowego."},
  {n:"wynik_testu.docx.exe", z:"Podwójne rozszerzenie: program udaje dokument Word."},
  {n:"cv_praca.pdf.js", z:"Skrypt udający CV. Prawdziwe dokumenty nie kończą się na .js."},
  {n:"nowa_gra_pobierz.exe", z:"Instalator „nowej gry” z reklamy. Pobrany z nieznanej strony."},
  {n:"skaner_antywirus_pro.exe", z:"Fałszywy antywirus z reklamy. Prawdziwy antywirus pobierasz z oficjalnej strony."}
];

// podejrzane procesy w tle: pojawiają się przy zdarzeniu „podejrzana aktywność”
const PROCESY = [
  {n:"svc_update32.exe (proces w tle)", z:"Działa w tle bez Twojej wiedzy i łączy się z nieznanym serwerem. Brak podpisu cyfrowego."},
  {n:"winhelper.tmp (proces w tle)", z:"Zapisuje naciśnięte klawisze i wysyła je w świat. Pojawił się po pobraniu programu z forum."},
  {n:"przegladarka_dodatek.dll", z:"Dodatek, który podmienia strony logowania. Wydawca nieznany, brak opinii."},
  {n:"sterownik_audio_nowy.exe (proces w tle)", z:"Sterownik z nieoficjalnej strony. Uruchamia się przy starcie i otwiera dostęp z zewnątrz."}
];

// alarmy antywirusa, które okazują się fałszywe: tych plików nie wolno kasować
const FALSYWE_ALARMY = [
  {n:"zadanie_matma.docx", z:"Dokument z makrem. Źródło: dziennik szkolny, plik podpisany cyfrowo przez szkołę. Nauczyciel zapowiadał ten plik."},
  {n:"instalator_edytora.exe", z:"Program pobrany z oficjalnej strony producenta, z ważnym podpisem cyfrowym. Sam go ostatnio zainstalowałeś."},
  {n:"prezentacja_historia.pptx", z:"Plik z makrem. Źródło: Twój własny pendrive, na którym sam zapisałeś prezentację."},
  {n:"kopia_zapasowa.zip", z:"Archiwum chronione hasłem, którego antywirus nie może sprawdzić. Źródło: kopia, którą zrobiłeś wczoraj."},
  {n:"sterownik_drukarki.exe", z:"Sterownik ze strony producenta drukarki, z ważnym podpisem cyfrowym."},
  {n:"mapa_wycieczki.pdf", z:"Plik z linkiem w środku. Źródło: wychowawca, znasz go, a plik leży na dysku szkolnym."}
];

/* ---------- zdarzenia systemowe z limitem czasu ---------- */
const ZDARZENIA = {
  skan: {from:2, app:"antywirus", nazwa:"Podejrzana aktywność", opis:"Antywirus zauważył dziwny proces w tle. Otwórz Antywirus i przeskanuj komputer.",
         skutek:"Ukryty wirus działał niezauważony", porada:"Gdy antywirus zgłasza podejrzaną aktywność, od razu przeskanuj komputer i usuń to, co znajdzie."},
  zapora: {from:2, app:"panel", nazwa:"Zapora wyłączona", opis:"Zapora sieciowa jest wyłączona. Włącz ją w Panelu systemu.",
           skutek:"Atakujący wszedł do sieci przez wyłączoną zaporę", porada:"Zapora blokuje niechciany ruch z sieci. Powinna być zawsze włączona."},
  ochrona: {from:3, app:"antywirus", nazwa:"Ochrona wyłączona", opis:"Coś wyłączyło ochronę w czasie rzeczywistym. Włącz ją w Antywirusie.",
            skutek:"Wyłączona ochrona wpuściła wirusa", porada:"Gdy coś wyłącza antywirusa, włącz go z powrotem. Prawdziwe programy tego nie robią."},
  aktualizacja: {from:3, app:"panel", nazwa:"Krytyczna aktualizacja", opis:"System ma łatkę zabezpieczeń. Zainstaluj ją w Panelu systemu.",
                 skutek:"Niezałatana luka w systemie została wykorzystana", porada:"Łatki zamykają dziury, przez które wchodzą wirusy. Instaluj je z ustawień systemu."},
  urzadzenie: {from:4, app:"panel", nazwa:"Obce urządzenie w sieci", opis:"W sieci domowej pojawiło się nieznane urządzenie. Odłącz je w Panelu systemu.",
               skutek:"Obce urządzenie w sieci podsłuchiwało Twój ruch", porada:"Sprawdzaj listę urządzeń w routerze. Nieznane odłączaj i zmieniaj hasło Wi‑Fi."}
};

const URZADZENIA_DOMOWE = ["Laptop (Ty)", "Telefon (Ty)", "Drukarka w pokoju", "Telewizor w salonie"];
const URZADZENIE_OBCE = "Nieznane urządzenie (a4:5e:60:1c)";
