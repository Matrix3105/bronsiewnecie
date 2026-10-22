'use strict';

// Dodatkowe dane do nowych gier. Część scenariuszy jest UCZCIWA (trzeba się zgodzić),
// część to PODPUCHA (trzeba odmówić). Kolejność opcji jest losowana przy wyświetlaniu.
Object.assign(PRZYKLADY, {

  logowania: [
    {tresc: "Powiadomienie: „Nowe logowanie na Twoje konto: Chrome, Windows, Twoje miasto, 2 minuty temu.” Przed chwilą sam zalogowałeś się na szkolnym komputerze.",
     opcje: [["Tak, to ja, zostawiam", 1], ["Zmieniam hasło i wylogowuję wszystko", 0], ["Blokuję konto na stałe", 0]],
     blad: "Powiadomienie zgadza się z tym, co sam zrobiłeś. Nie każde ostrzeżenie to atak: porównaj je z faktami."},
    {tresc: "Powiadomienie: „Nowe logowanie: Android, Rosja, 3:12 w nocy.” Nigdzie nie wyjeżdżałeś.",
     opcje: [["Zmieniam hasło, włączam 2FA, wylogowuję inne urządzenia", 1], ["Ignoruję, pewnie błąd", 0], ["Klikam „To nie ja” w SMS-ie od nieznanego numeru", 0]],
     blad: "Logowanie z obcego kraju w środku nocy to alarm. Zmień hasło i wyloguj obce urządzenia, ale tylko w ustawieniach konta."},
    {tresc: "Aplikacja banku: „Potwierdź logowanie.” Właśnie otworzyłeś bankowość na laptopie.",
     opcje: [["Potwierdzam w aplikacji", 1], ["Odrzucam, bo nie ufam powiadomieniom", 0], ["Odpisuję na SMS-a z kodem", 0]],
     blad: "To prośba o potwierdzenie logowania, które sam zacząłeś. Odrzucanie własnych potwierdzeń nic nie chroni."},
    {tresc: "Mail: „Ktoś zalogował się na Twoje konto z Brazylii. Kliknij, aby je zabezpieczyć: konto-zabezpiecz.top.”",
     opcje: [["Klikam i loguję się", 0], ["Sprawdzam logowania na stronie serwisu, wpisanej ręcznie", 1], ["Odpowiadam na maila hasłem", 0]],
     blad: "Link w mailu o „włamaniu” często prowadzi do podróbki. Aktywność sprawdzaj tylko tam, gdzie sam wchodzisz."},
    {tresc: "Sklep z grami: „Logowanie z nowego urządzenia: Twoja konsola.” Dziś rano rozpakowałeś nową konsolę.",
     opcje: [["To ja, zatwierdzam", 1], ["Zgłaszam włamanie", 0], ["Usuwam konto", 0]],
     blad: "Nowe urządzenie, które sam uruchomiłeś, to normalna sprawa. Najpierw pomyśl, co ostatnio robiłeś."},
    {tresc: "SMS od nieznanego numeru: „Twoje konto zablokowano. Podaj kod z SMS-a, aby je odblokować.” Chwilę później przyszedł prawdziwy kod z Twojego serwisu.",
     opcje: [["Podaję kod, żeby odblokować", 0], ["Nikomu nie podaję kodu i zmieniam hasło", 1], ["Podaję tylko pierwsze trzy cyfry", 0]],
     blad: "Ktoś próbuje wejść na Twoje konto i szuka kodu od Ciebie. Kodu z SMS-a nikomu się nie podaje."},
    {tresc: "Poczta szkolna: „Zalogowano z nowej przeglądarki (Firefox).” Przed chwilą instalowałeś Firefoksa.",
     opcje: [["Tak, to ja", 1], ["Zmieniam hasła wszędzie", 0], ["Blokuję pocztę", 0]],
     blad: "To Twoje własne logowanie. Przesadna reakcja też bywa błędem, jeśli fakty się zgadzają."},
    {tresc: "Komunikat: „Logowanie z nowego urządzenia: iPhone 15.” Nie masz iPhone’a i nikt w domu go nie ma.",
     opcje: [["To pewnie rodzina, ignoruję", 0], ["Wylogowuję to urządzenie i zmieniam hasło", 1], ["Piszę do „supportu” z linku w komunikacie", 0]],
     blad: "Nieznane urządzenie to sygnał włamania. Wyloguj je w ustawieniach konta i zmień hasło."}
  ],

  aktualizacje: [
    {tresc: "Ustawienia systemu: „Dostępna aktualizacja zabezpieczeń. Zainstaluj teraz.”",
     opcje: [["Instaluję w ustawieniach systemu", 1], ["Odkładam na zawsze", 0], ["Szukam innej wersji na forum", 0]],
     blad: "Aktualizacje z ustawień systemu są bezpieczne i łatają dziury. Odkładanie ich zostawia furtki."},
    {tresc: "Okno na stronie z filmem: „Twój odtwarzacz jest nieaktualny! Kliknij POBIERZ.”",
     opcje: [["Klikam POBIERZ", 0], ["Zamykam kartę, aktualizacje robię tylko w ustawieniach", 1], ["Pobieram i uruchamiam plik .exe", 0]],
     blad: "Okienka na stronach, które każą „zaktualizować” odtwarzacz, to pułapka. Aktualizujesz tylko w ustawieniach i oficjalnych sklepach."},
    {tresc: "Sklep z aplikacjami: „Dostępna aktualizacja Komunikatora Z (wydawca: oficjalny).”",
     opcje: [["Aktualizuję w oficjalnym sklepie", 1], ["Odinstalowuję aplikację", 0], ["Pobieram .apk z forum", 0]],
     blad: "Aktualizacja z oficjalnego sklepu jest bezpieczna. Nie wszystko, co nowe, jest podejrzane."},
    {tresc: "Wyskakujące okienko: „Wykryto 5 wirusów! Zainstaluj SuperClean, żeby je usunąć.”",
     opcje: [["Instaluję SuperClean", 0], ["Zamykam okienko i skanuję swoim antywirusem", 1], ["Dzwonię pod numer z okienka", 0]],
     blad: "Fałszywe alarmy o „wirusach” sprzedają fałszywe programy. Skanuj tylko swoim, znanym antywirusem."},
    {tresc: "Antywirus: „Baza wirusów została zaktualizowana automatycznie.”",
     opcje: [["Nic nie robię, to normalne", 1], ["Wyłączam antywirusa", 0], ["Odinstalowuję antywirusa", 0]],
     blad: "To zwykła informacja z programu, który sam zainstalowałeś. Nie każdy komunikat wymaga reakcji."},
    {tresc: "Mail od „Windows Support”: „Zainstaluj pilną poprawkę z załącznika.”",
     opcje: [["Otwieram załącznik", 0], ["Ignoruję maila, aktualizacje biorę z ustawień systemu", 1], ["Przesyłam znajomym", 0]],
     blad: "System nie wysyła poprawek w załącznikach. To klasyczny sposób na zainfekowanie komputera."},
    {tresc: "Telefon: „Aktualizacja systemu gotowa. Zainstaluj, gdy będzie ładowany.”",
     opcje: [["Instaluję podczas ładowania", 1], ["Wyłączam aktualizacje automatyczne", 0], ["Instaluję nieoficjalny system", 0]],
     blad: "Aktualizacja systemowa telefonu jest bezpieczna i potrzebna. Nieoficjalne systemy mogą być złośliwe."}
  ],

  rozszerzenia: [
    {co: "bloker reklam", opcje: [["AdBlock (oficjalny sklep, 10 mln użytkowników, znany wydawca)", 1], ["SuperBlock Free (wydawca nieznany, prosi o dostęp do wszystkich stron i haseł)", 0], ["Bloker-Reklam-Max (instalacja z linku w czacie)", 0]]},
    {co: "darmowy VPN", opcje: [["VPN z oficjalnego sklepu: znany wydawca, polityka prywatności, płatna wersja", 1], ["Darmowy VPN Turbo (zbiera historię, brak informacji o firmie)", 0], ["VPN-Free-100GB.crx (plik z forum)", 0]]},
    {co: "menedżer haseł", opcje: [["Menedżer haseł z oficjalnego sklepu, znany od lat, z niezależnymi opiniami", 1], ["Mega Haseł (wysyła hasła na swój serwer, brak informacji o firmie)", 0], ["Haseł Pro Odblokowany (instalacja z reklamy)", 0]]},
    {co: "tłumacz stron", opcje: [["Tłumacz wydany przez znaną firmę, prosi tylko o dostęp do aktywnej karty", 1], ["Tłumacz Free Turbo (prosi o dostęp do wszystkich Twoich danych)", 0], ["Translator-Plus (z reklamy na stronie z filmami)", 0]]},
    {co: "pobieranie filmów", opcje: [["Rozszerzenie z oficjalnego sklepu, prosi tylko o dostęp do aktywnej karty, zero dziwnych uprawnień", 1], ["„Pobieraj wszystko” (dostęp do wszystkich danych, brak opinii)", 0], ["„Pobieraj wszystko Pro” (z reklamy na stronie z filmami)", 0]]},
    {co: "zmianę motywu przeglądarki", opcje: [["Motyw z oficjalnego sklepu, tysiące opinii, bez uprawnień do danych", 1], ["Motyw „Anime Pro” (prosi o odczyt wszystkich stron)", 0], ["Motyw w pliku .exe z czatu", 0]]}
  ],

  paczki: [
    {tresc: "SMS: „Paczka zostanie doręczona dziś. Śledzenie w aplikacji kuriera.” Czekasz dziś na paczkę ze sklepu i nie ma tam linków ani próśb o dane.",
     opcje: [["Czekam na kuriera i śledzę w znanej aplikacji", 1], ["Blokuję numer, to na pewno oszust", 0], ["Odpowiadam kodem z SMS-a", 0]],
     blad: "To zwykła informacja o paczce, na którą czekasz, bez linków i próśb o dane. Nie wszystko jest oszustwem."},
    {tresc: "SMS: „Paczka wstrzymana. Dopłać 1,50 zł: kurier-doplata.top.” Niczego nie zamawiałeś.",
     opcje: [["Dopłacam, to tylko 1,50 zł", 0], ["Usuwam SMS-a i nic nie klikam", 1], ["Klikam, ale nie płacę", 0]],
     blad: "Drobna dopłata z linku w SMS-ie to sposób na wyłudzenie danych karty. Nic nie zamawiałeś, więc nie ma czego opłacać."},
    {tresc: "Mail ze sklepu, w którym kupiłeś buty: „Zamówienie wysłane. Numer przesyłki: ...” Bez linków do logowania.",
     opcje: [["Zapisuję numer i śledzę w aplikacji kuriera", 1], ["Zgłaszam jako phishing", 0], ["Odpowiadam, podając numer karty", 0]],
     blad: "To zwykłe potwierdzenie wysyłki z zamówienia, które sam złożyłeś. Zgłaszanie takich maili to fałszywy alarm."},
    {tresc: "Wiadomość na komunikatorze: „Kurier nie zastał Cię. Wpisz PESEL i adres, żebyśmy ponowili doręczenie.”",
     opcje: [["Wpisuję dane", 0], ["Nie podaję danych, sprawdzam w aplikacji kuriera", 1], ["Podaję tylko adres", 0]],
     blad: "Kurier nie potrzebuje PESEL-u. Takie wiadomości wyłudzają dane. Sprawdź przesyłkę w oficjalnej aplikacji."},
    {tresc: "Powiadomienie z aplikacji paczkomatu: „Paczka czeka w paczkomacie.” Zamawiałeś coś do paczkomatu.",
     opcje: [["Odbieram z kodem z aplikacji", 1], ["Ignoruję, na pewno spam", 0], ["Podaję kod odbioru kolegom z czatu", 0]],
     blad: "To prawdziwe powiadomienie z aplikacji, którą sam zainstalowałeś, o paczce, na którą czekasz."},
    {tresc: "SMS: „Odbierz paczkę z zagranicy. Zeskanuj kod QR z załączonego zdjęcia.”",
     opcje: [["Skanuję QR", 0], ["Nie skanuję, sprawdzam przesyłki w znanej aplikacji", 1], ["Skanuję ze starego telefonu", 0]],
     blad: "Kod QR z SMS-a może prowadzić do fałszywej strony. Przesyłkę sprawdzaj w oficjalnej aplikacji."},
    {tresc: "Telefon: „Jestem z firmy kurierskiej, na Twoje nazwisko jest paczka. Podaj kod BLIK za opłatę celną.”",
     opcje: [["Podaję kod BLIK", 0], ["Rozłączam się", 1], ["Podaję połowę kodu", 0]],
     blad: "Kurier nie prosi o kod BLIK przez telefon. To wyłudzenie pieniędzy."}
  ],

  bluetooth: [
    {tresc: "W klasie kolega mówi: „Wysłałem Ci zdjęcie z wycieczki przez AirDrop, akceptuj.” Widzisz go obok, a jego nazwa urządzenia się zgadza.",
     opcje: [["Akceptuję, bo znam nadawcę i czekam na to zdjęcie", 1], ["Odrzucam, bo AirDrop to zło", 0], ["Akceptuję wszystko od każdego", 0]],
     blad: "Znasz nadawcę, widzisz go i czekasz na plik. To bezpieczna sytuacja."},
    {tresc: "Na przystanku telefon pyta: „Nieznane urządzenie „Free_Photos” chce wysłać Ci plik. Odebrać?”",
     opcje: [["Odbieram, może coś fajnego", 0], ["Odrzucam", 1], ["Odbieram i otwieram plik", 0]],
     blad: "Plik od nieznanego urządzenia w pobliżu to częsty sposób rozsyłania wirusów. Odrzucaj."},
    {tresc: "W sklepie telefon pyta: „Słuchawki_Premium_Free chcą się połączyć i uzyskać dostęp do Twoich kontaktów.”",
     opcje: [["Paruję", 0], ["Odrzucam i wyłączam Bluetooth", 1], ["Paruję tylko na chwilę", 0]],
     blad: "Nieznane urządzenie, które prosi o dostęp do kontaktów, to podejrzana sprawa. Odrzuć."},
    {tresc: "Parujesz własne słuchawki, które właśnie rozpakowałeś. Telefon pokazuje nazwę z pudełka.",
     opcje: [["Paruję", 1], ["Odrzucam, bo Bluetooth jest groźny", 0], ["Włączam widoczność dla wszystkich na stałe", 0]],
     blad: "To Twoje własne słuchawki, nazwa się zgadza. Parowanie z własnym urządzeniem jest w porządku."},
    {tresc: "W autobusie dostajesz plik „wazne.apk” od nieznanego urządzenia.",
     opcje: [["Instaluję", 0], ["Odrzucam i nie instaluję", 1], ["Instaluję tylko na chwilę", 0]],
     blad: "Pliki .apk od obcych to wirusy w opakowaniu aplikacji. Odrzuć."},
    {tresc: "Smartwatch prosi o parowanie po pierwszym uruchomieniu. Kod na zegarku i na telefonie jest taki sam.",
     opcje: [["Zatwierdzam, kody się zgadzają", 1], ["Odmawiam, nie ufam zegarkom", 0], ["Wpisuję dowolny kod", 0]],
     blad: "Zgodne kody na obu urządzeniach potwierdzają, że łączysz właściwe sprzęty."}
  ],

  prosby: [
    {tresc: "Koleżanka z klasy pisze z jej normalnego konta: „Masz zdjęcie planu lekcji? Zgubiłam zeszyt.”",
     opcje: [["Wysyłam zdjęcie planu", 1], ["Blokuję ją", 0], ["Pytam o hasło do jej konta", 0]],
     blad: "To zwykła prośba od znajomej, bez linków i danych. Nie bądź podejrzliwy wobec każdej wiadomości."},
    {tresc: "Kumpel z „nowego konta”: „Hej, pożycz mi kod z SMS-a, mam problem z logowaniem.”",
     opcje: [["Wysyłam kod", 0], ["Dzwonię do kumpla i pytam, czy to on", 1], ["Wysyłam kod, ale zmieniam cyfrę", 0]],
     blad: "Kodów z SMS-ów nie podaje się nikomu, a nowe konto „znajomego” trzeba sprawdzić innym kanałem."},
    {tresc: "Znajomy pisze: „Zobacz, jak śmiesznie wyszedłeś!” i wkleja skrócony link.",
     opcje: [["Klikam", 0], ["Pytam go innym kanałem, czy to wysłał", 1], ["Przesyłam dalej klasie", 0]],
     blad: "Skrócony link bez kontekstu od znajomego bywa pułapką: jego konto mogło zostać przejęte. Zapytaj go poza czatem."},
    {tresc: "Trener w klubowej grupie (to konto, które znasz): „Trening w czwartek o 17:30.”",
     opcje: [["Odpisuję: będę", 1], ["Zgłaszam wiadomość", 0], ["Pytam o hasło do grupy", 0]],
     blad: "To zwykła informacja od znanej osoby w znanej grupie. Nie wszystko wymaga ostrożności."},
    {tresc: "Nieznajomy z gry: „Pomogę Ci w grze, daj mi swoje konto na godzinę.”",
     opcje: [["Daję konto", 0], ["Odmawiam", 1], ["Daję konto bez hasła do maila", 0]],
     blad: "Konta nikomu się nie pożycza. Takie „pomoce” kończą się przejęciem konta."},
    {tresc: "„Ciocia” z nowego numeru: „Podaj mi dane karty, kupię Ci prezent na urodziny.”",
     opcje: [["Podaję dane karty", 0], ["Dzwonię do cioci na stary numer", 1], ["Podaję numer bez kodu CVV", 0]],
     blad: "Nowy numer i prośba o dane karty to oszustwo „na krewnego”. Sprawdź starym kontaktem."},
    {tresc: "Nauczyciel na platformie szkolnej: „Do jutra oddaj pracę w dzienniku.”",
     opcje: [["Oddaję pracę w dzienniku", 1], ["Odpisuję, podając hasło do dziennika", 0], ["Ignoruję", 0]],
     blad: "To zwykła prośba z platformy szkolnej, która nie wymaga podawania haseł. Zrób zadanie w dzienniku."}
  ],

  pendrive: [
    {obcy: 1, tresc: "Na biurku leży szary pendrive z naklejką „Zdjęcia z wycieczki”. Nie wiesz, czyj jest.",
     opcje: [["Wpinam do komputera, sprawdzę, czyj", 0], ["Nie wpinam, oddaję nauczycielowi lub rodzicom", 1], ["Wpinam na starym laptopie", 0]],
     blad: "Obcy pendrive może mieć wirusa, który uruchomi się po wpięciu. Nieznanych nośników się nie wpina."},
    {obcy: 1, tresc: "Pod drzwiami leży pendrive z napisem „Odpowiedzi do sprawdzianu”. Ktoś musiał go zgubić.",
     opcje: [["Wpinam, bo kto by nie chciał odpowiedzi", 0], ["Nie wpinam i oddaję dorosłemu", 1], ["Wpinam i szybko skanuję", 0]],
     blad: "Pendrive podrzucony pod drzwi to klasyczna pułapka z wabikiem. Nie wpinaj."},
    {obcy: 0, tresc: "Tata dał Ci rano pendrive z prezentacją do szkoły i prosił o skopiowanie plików.",
     opcje: [["Wpinam i przed otwarciem skanuję antywirusem", 1], ["Nie wpinam, bo nikomu nie ufam", 0], ["Wpinam i od razu otwieram wszystko", 0]],
     blad: "Znany pendrive od zaufanej osoby jest w porządku, a skan przed otwarciem to dobry zwyczaj."},
    {obcy: 1, tresc: "Na chodniku znalazłeś pendrive z logo banku i napisem „Dane klientów”. Leży na Twoim biurku.",
     opcje: [["Sprawdzam, co jest w środku", 0], ["Nie wpinam, oddaję dorosłemu lub na policję", 1], ["Wpinam i usuwam pliki", 0]],
     blad: "Pendrive „z ważnymi danymi” znaleziony na ulicy to przynęta. Nie wpinaj, tylko oddaj."},
    {obcy: 0, tresc: "Własny niebieski pendrive, na którym zawsze trzymasz pracę domową. Nauczyciel prosi o jej oddanie.",
     opcje: [["Wpinam własny pendrive i oddaję pracę", 1], ["Nie wpinam, bo pendrive są groźne", 0], ["Wpinam obcy zamiast własnego", 0]],
     blad: "To Twój własny nośnik, którego historię znasz. Wpinanie własnych urządzeń nie jest groźne."},
    {obcy: 1, tresc: "W szkole ktoś zostawił pendrive „Kody do gier za darmo”. Leży na Twoim biurku.",
     opcje: [["Wpinam, kody się przydadzą", 0], ["Nie wpinam i oddaję nauczycielowi", 1], ["Wpinam i kopiuję pliki na komputer", 0]],
     blad: "„Darmowe kody” na obcym pendrivie to wabik na wirusa. Nie wpinaj."}
  ],

  zaproszenia: [
    ["Ola Z. (klasa 8b, 12 wspólnych znajomych)", 1],
    ["Kuba Nowak (kolega z drużyny, pisał do Ciebie na treningu)", 1],
    ["Pani Marta (nauczycielka, konto szkolne, wspólni znajomi z klasy)", 1],
    ["Wujek Tomek (konto, które znasz od lat, wspólna rodzina)", 1],
    ["Mama (z Twojego telefonu)", 1],
    ["Kasia_Model_18 (0 wspólnych znajomych, konto sprzed tygodnia)", 0],
    ["Free_Skins_Official (konto z logo gry, 0 postów)", 0],
    ["Anonim123 (brak zdjęcia, pisze „znamy się z gry”)", 0],
    ["Kuba Nowak (nowe konto, to samo zdjęcie co Twój kolega, który już jest w znajomych)", 0],
    ["Doradca_Kredytowy (pisze, że masz wygraną)", 0],
    ["Julka (3 wspólnych znajomych, pierwsza wiadomość: „wyślij zdjęcie”)", 0],
    ["Trener_Talentów (0 wspólnych znajomych, prosi o numer telefonu)", 0]
  ],

  router: [
    ["Szyfrowanie WPA2 lub WPA3", true, false],
    ["Zmiana domyślnego hasła do panelu routera", true, false],
    ["Aktualizacja oprogramowania routera", true, false],
    ["Sieć gości oddzielona od sieci domowej", true, false],
    ["Panel routera dostępny tylko z sieci domowej", true, false],
    ["WPS (łączenie PIN-em) włączony", false, true],
    ["Zdalny dostęp do panelu z internetu", false, true],
    ["Hasło do Wi‑Fi: 12345678", false, true],
    ["Nazwa sieci z imieniem i adresem (Dom_Kowalskich_ul_Lipowa_4)", false, true],
    ["Brak hasła do Wi‑Fi (sieć otwarta)", false, true]
  ],

  pliki: {
    wazne: ["Zdjęcia z wakacji", "Praca na konkurs (dokument)", "Skany dokumentów", "Projekt do szkoły", "Notatki z lekcji", "Filmy z urodzin", "Zapisy gier z postępami", "Rysunki i grafiki"],
    zbedne: ["Pliki tymczasowe (temp)", "Instalator programu (setup.exe)", "Pamięć podręczna przeglądarki", "Kosz", "pobrane_1.zip (nie wiadomo, skąd)", "Duplikaty: raport(1), raport(2), raport(3)"]
  },

  plyty: {
    dobre: ["Kopia zapasowa: dokumenty i zdjęcia (ostatnia)", "KOPIA_ZAPASOWA, nagrana we wrześniu (dokumenty, zdjęcia)", "Moja kopia zapasowa: szkoła i zdjęcia", "Kopia ważnych plików (podpisana ręcznie)"],
    zle: [
      {n: "Gra „Racer 3” (płyta instalacyjna)", blad: "To płyta z grą, nie z Twoimi plikami."},
      {n: "„DARMOWE_FILMY” nagrane z internetu", blad: "Nagrane z internetu płyty bywają zainfekowane, i nie ma tam Twoich plików."},
      {n: "Płyta bez opisu", blad: "Nie wiesz, co jest na płycie bez opisu. Nie wkładaj jej, jeśli nie masz pewności."},
      {n: "Muzyka na imprezę 2015", blad: "To tylko muzyka, nie Twoja kopia zapasowa."},
      {n: "Zdjęcia z wakacji 2012 (stare)", blad: "To stare zdjęcia, bez Twoich dokumentów. Szukasz płyty z napisem „kopia zapasowa”."},
      {n: "Płyta z czasopisma: „nowy antywirus”", blad: "Płyta z gazety nie ma Twoich plików, a „antywirus z gazety” bywa przestarzały."},
      {n: "Filmy z urodzin (jedyna kopia)", blad: "To tylko filmy z jednej okazji, bez dokumentów do odzyskania."}
    ],
    domyslne: ["Kopia zapasowa", "Gra „Racer 3”", "Muzyka na imprezę"]
  }
});
