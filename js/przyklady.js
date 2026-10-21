'use strict';

const wylosuj = (tab, n) => pomieszaj(tab).slice(0, n);

const PRZYKLADY = {
  kod2fa: {
    legit: [
      ["Weryfikacja dwuetapowa", "Sam logujesz się na konto. Kod wysłano na telefon. Dotknij telefonu na biurku, odczytaj kod i wpisz go tutaj."],
      ["Logowanie z nowego urządzenia", "Właśnie logujesz się na nowym urządzeniu. Podaj kod 2FA z telefonu, żeby potwierdzić, że to Ty."],
      ["Zmiana hasła", "Sam prosisz o zmianę hasła na swoim koncie. System wysłał jednorazowy kod. Dotknij telefonu i przepisz go."],
      ["Płatność w sklepie", "Sam płacisz kartą w sklepie online. Bank prosi o kod z SMS-a. Dotknij telefonu i przepisz go."],
      ["Dziennik elektroniczny", "Sam otwierasz dziennik elektroniczny. Aplikacja prosi o kod. Dotknij telefonu i wpisz go."]
    ],
    pulapka: [
      ["Kod, o który nikt nie powinien prosić", "Nigdzie się teraz nie logujesz, a na telefonie pojawił się kod. Ktoś pisze: „To tylko weryfikacja, podaj mi kod”."],
      ["Rozmowa z „pomocą techniczną”", "Dzwoni „konsultant” i mówi, że chce zabezpieczyć Twoje konto. Prosi o podyktowanie kodu, który właśnie przyszedł."],
      ["Strona prosi o kod", "Strona z linku w wiadomości prosi o kod 2FA „do odbioru nagrody”. Niczego nie zamawiałeś."],
      ["Kod dla „znajomego”", "Ktoś z nowego konta pisze: „Dostałem Twój kod przez pomyłkę, przepisz mi go szybko”. Sam nigdzie się nie logujesz."],
      ["Kod od „administratora”", "Wiadomość od „administratora gry”: „Podaj kod z SMS-a, bo zablokujemy konto”. Niczego nie zmieniałeś w ustawieniach."],
      ["Nieproszony kod", "To już trzeci kod pod rząd, choć nie próbujesz się logować. Nieznajomy naciska, żebyś go przepisał."]
    ]
  },
  postyZle: [
    "Zdjęcie dowodu osobistego „dla pamiątki”",
    "„Wyjeżdżamy na 2 tygodnie, dom pusty!” + adres",
    "Zdjęcie biletu z widocznym kodem kreskowym",
    "Zdjęcie karty płatniczej „bo ładny kolor”",
    "Screen z SMS-em z kodem do banku",
    "Post z numerem telefonu i pełnym adresem do odbioru paczki",
    "Zdjęcie karteczki z hasłem do Wi‑Fi",
    "Zdjęcie legitymacji szkolnej z numerem i danymi",
    "Relacja na żywo: „jestem sam w domu, rodzice wracają w niedzielę”",
    "Zdjęcie paszportu „na wszelki wypadek”",
    "Zdjęcie biletu autobusowego miesięcznego z numerem i kodem",
    "Screen rozmowy z bankiem z widocznym numerem konta",
    "Post: „Wracam dopiero za tydzień, klucz leży pod wycieraczką”",
    "Zdjęcie koperty z imieniem, nazwiskiem i adresem",
    "Zdjęcie ekranu z hasłem do konta w grze",
    "Zdjęcie legitymacji ubezpieczeniowej z numerem PESEL",
    "Relacja z lokalizacją na żywo z Twojego domu o 23:00"
  ],
  postyDobre: [
    "Selfie z psem", "Zdjęcie pizzy z kolacji", "Zachód słońca nad jeziorem", "Mem o poniedziałkach",
    "Zdjęcie ulubionej książki", "Narysowany przeze mnie rysunek", "Polecam serial (bez spoilerów)",
    "Zdjęcie z wycieczki rowerowej bez widocznego adresu",
    "Zdjęcie kota na parapecie", "Pocztówka z gór bez żadnych danych", "Zdjęcie z koncertu (po wydarzeniu)",
    "Przepis na szarlotkę", "Zdjęcie Twojej kolekcji kart", "Polecam grę planszową", "Wspólne zdjęcie z drużyny bez nazwy szkoły"
  ],
  newsyFalszywe: [
    "SZOK! Lekarze ukrywają ten trik! Udostępnij, zanim usuną!",
    "Nagranie: ten polityk powiedział TO! Bez źródła i bez daty, ucięte w połowie zdania",
    "Rozdają 500 zł każdemu, kto udostępni ten post!",
    "Pij ten napój, a nigdy nie zachorujesz! Naukowcy milczą!",
    "UWAGA! Jutro wyłączą internet w całym kraju. Wyślij dalej 10 osobom!",
    "Zdjęcie „z wczoraj” (naprawdę sprzed 8 lat): tego nie pokażą w telewizji",
    "Anonimowy „informator” twierdzi, że szkoła zostanie zamknięta. Brak dowodów, same wykrzykniki!!!",
    "Tajny dokument wyciekł! Autor nieznany, link prowadzi do podejrzanej strony",
    "Jedno zdjęcie dowodzi wszystkiego! Prawda, którą ukrywają media!!!",
    "Nowy wirus zabija w 24h! Przekaż wszystkim, bo nikt Ci tego nie powie",
    "Znany youtuber oddaje fortunę. Wystarczy kliknąć link i podać dane karty",
    "Zdjęcie rekina na ulicy po burzy. Bez miejsca, bez daty, bez autora"
  ],
  newsyPrawdziwe: [
    "Ministerstwo: nowe zasady egzaminów od września (komunikat na gov.pl)",
    "Agencja prasowa podała dane GUS o inflacji, z linkiem do źródła",
    "Naukowcy z uniwersytetu opublikowali wyniki badań (link do artykułu)",
    "Prognoza IMGW: w weekend możliwe burze",
    "Szkoła zmienia godziny lekcji. Informacja na stronie szkoły",
    "Burmistrz otworzył plac zabaw (zdjęcia w lokalnej gazecie)",
    "Zmiana rozkładu autobusów od poniedziałku (komunikat przewoźnika)",
    "Muzeum wydłuża godziny otwarcia w wakacje (strona muzeum)",
    "Policja ostrzega przed oszustami „na wnuczka” (komunikat na stronie policji)",
    "Biblioteka organizuje warsztaty dla młodzieży (plakat i zapisy na stronie)",
    "Straż pożarna poinformowała o akcji gaśniczej (komunikat na stronie straży)",
    "Nowa linia tramwajowa ruszy w przyszłym roku (dokument miasta + wywiad z prezydentem)",
    "Telewizja publiczna: relacja z meczu, z nazwiskami i wynikiem",
    "Urząd miasta: zmiany w odbiorze śmieci od 1 listopada (strona urzędu)"
  ],
  plikiZle: [
    "faktura.pdf.exe", "zdjecie.jpg.scr", "cv_final.docx.exe", "wakacje_film.mp4.exe",
    "bilet.pdf.bat", "skan_dowodu.png.scr", "darmowa_gra_crack.exe", "zaproszenie.doc.js",
"skan_umowy.pdf.exe", "prezentacja.pptx.scr", "zdjecia_z_imprezy.zip.exe", "instrukcja.pdf.js"
  ],
  plikiDobre: [
    "raport.docx", "wakacje.jpg", "notatki.txt", "prezentacja.pptx", "muzyka.mp3",
    "przepis.pdf", "zadanie_domowe.docx", "plan_lekcji.png", "budzet.xlsx", "film_z_urodzin.mp4",
"zdjecie_psa.png", "lista_zakupow.txt", "referat.pdf", "piosenka.wav", "tabela.csv", "projekt_szkolny.pptx"
  ],
  ustawienia: [
    ["Weryfikacja dwuetapowa (2FA)", true, false],
    ["Profil prywatny", true, false],
    ["Dodawaj lokalizację do zdjęć", false, true],
    ["Numer telefonu widoczny dla wszystkich", false, true],
    ["Powiadomienia o nowych logowaniach", true, false],
    ["Zapamiętuj hasła na cudzych komputerach", false, true],
    ["Blokada ekranu kodem PIN", true, false],
    ["Każdy może oznaczać Cię na zdjęciach bez pytania", false, true],
    ["Adres e-mail do odzyskiwania konta", true, false],
    ["Pozwól nieznajomym pisać do Ciebie prywatnie", false, true],
    ["Podawaj kod 2FA każdemu, kto napisze, że jest z „pomocy”", false, true],
    ["Automatyczne wylogowanie po bezczynności", true, false],
    ["Pokazuj moją aktywność wszystkim", false, true],
    ["Ostrzeżenia o podejrzanych linkach", true, false],
    ["Zapisuj hasła w zwykłym pliku na pulpicie", false, true]
  ],
  sieci: [
    {nazwa: "DomWiFi_5G", falszywe: ["Free_Airport_WiFi (otwarta)", "DomWiFi_5G_Free (otwarta)", "Kawiarnia_Gosc (hasło na paragonie)"]},
    {nazwa: "Dom_Kowalskich", falszywe: ["Dom_Kowalskich_2 (otwarta)", "Darmowe_Internety (otwarta)", "Galeria_Free (bez hasła)"]},
    {nazwa: "Mieszkanie12", falszywe: ["Mieszkanie12_extra (otwarta)", "Hotel_Gosc (otwarta)", "Szybki_Internet_Za_Darmo (bez hasła)"]},
    {nazwa: "NET-8F3A", falszywe: ["NET-8F3A_Free (otwarta)", "Dworzec_WiFi (otwarta)", "Internet_Dla_Wszystkich (bez hasła)"]},
    {nazwa: "Tomek_Router", falszywe: ["Tomek_Router_Guest (otwarta)", "Free_WiFi_Centrum (bez hasła)", "Pizzeria_Wifi (hasło na plakacie)"]},
    {nazwa: "Rodzina_5GHz", falszywe: ["Rodzina_5GHz_Free (otwarta)", "Biblioteka_Publiczna (otwarta)", "Darmowy_Hotspot_Dla_Wszystkich (bez hasła)"]}
  ],
  sklepy: [
    {co: "słuchawki", opcje: [
      ["okazja-sklep24.top: słuchawki za 49 zł, płatność tylko przelewem na konto prywatne", 0],
      ["sklep-elektro.pl (https): dane firmy, regulamin, BLIK i karta, cena zbliżona do rynkowej", 1],
      ["mega-promocje.xyz: „zostało 3 minuty!”, brak danych firmy i regulaminu", 0]]},
    {co: "buty sportowe", opcje: [
      ["buty-outlet.shop: te same buty za 30% ceny, brak adresu firmy, tylko płatność z góry", 0],
      ["sklep-sportowy.pl (https): regulamin, zwroty 14 dni, dane firmy i opinie z różnych serwisów", 1],
      ["super-obuwie.click: „ostatnia para!”, licznik czasu i brak regulaminu", 0]]},
    {co: "bilety na koncert", opcje: [
      ["bilety-tanio.top: bilety wyprzedane wszędzie, tu dostępne, płatność kartą na dziwnej stronie", 0],
      ["oficjalna strona organizatora (https), bilety z numerem zamówienia i regulaminem", 1],
      ["profil na portalu społecznościowym: „bilet za pół ceny, wyślij zaliczkę BLIKIEM”", 0]]},
    {co: "grę na komputer", opcje: [
      ["gry-za-grosze.xyz: nowa gra za 9 zł i klucz „na maila w 5 minut”", 0],
      ["oficjalny sklep z grami: dane sprzedawcy, ceny jak wszędzie, bezpieczna płatność", 1],
      ["forum: „klucz do gry za 20 zł, wpłać na prywatne konto, wyślę potem”", 0]]},
    {co: "telefon", opcje: [
      ["telefon-okazja.online: najnowszy model za 40% ceny, bez danych firmy i z krótkim czasem na zakup", 0],
      ["sklep sieciowy (https): dane firmy, regulamin, zwroty i płatność kartą lub BLIK", 1],
      ["ogłoszenie: „telefon w pudełku, wyślę kurierem po przedpłacie na prywatne konto”", 0]]},
    {co: "plecak szkolny", opcje: [
      ["plecaki-hurt.top: plecak za 15 zł, tylko przedpłata, brak regulaminu", 0],
      ["sklep-szkolny.pl (https): dane firmy, regulamin, zwrot 14 dni, płatność BLIK i karta", 1],
      ["profil „sklep_okazje” na komunikatorze: „kup teraz, przelew na prywatne konto”", 0]]},
    {co: "kartę podarunkową", opcje: [
      ["karty-podarunkowe-tanio.click: karta 100 zł za 30 zł, tylko kryptowaluty", 0],
      ["oficjalny sklep marki (https): dane firmy, regulamin i bezpieczna płatność", 1],
      ["wiadomość: „karta za pół ceny, wyślij kod doładowania”", 0]]}
  ],
  obcy: [
    {kto: "ProGamer_99",
     start: "„Hej, świetnie grasz! Ile masz lat i gdzie mieszkasz?”",
     opcje1: [["Podam miasto i szkołę", 0], ["Nie podam danych osobowych", 1], ["Podam tylko wiek", 0]],
     blad1: "Obcym nie podajemy wieku, miejsca ani szkoły. Z tych informacji łatwo złożyć obraz o Tobie.",
     dalej: "„Okej. To dodaj mnie na komunikator i wyślij fotkę. Tylko nie mów rodzicom, to nasza tajemnica.”",
     opcje2: [["Wyślę zdjęcie, skoro prosi", 0], ["Blokuję, zgłaszam i mówię dorosłemu", 1], ["Wyślę zdjęcie bez twarzy", 0]],
     blad2: "Nie wysyłaj nic obcemu. „Nie mów rodzicom” to sygnał alarmowy: zablokuj, zgłoś i powiedz zaufanej osobie."},
    {kto: "Kuba_z_8b",
     start: "„Cześć! Jestem z klasy obok, tylko mam nowe konto. Podaj mi swój numer telefonu.”",
     opcje1: [["Podam numer, skoro z klasy", 0], ["Zapytam kolegę na żywo, czy to on", 1], ["Podam numer bez kierunkowego", 0]],
     blad1: "Nowe konto „znajomego” trzeba sprawdzić poza czatem, na przykład na żywo albo innym kanałem.",
     dalej: "„Nie wierzysz mi? Wyślij kod z SMS-a, który Ci przyjdzie, to Cię zweryfikuję.”",
     opcje2: [["Wyślę kod, żeby nie było kłótni", 0], ["Nie wysyłam kodu i blokuję konto", 1], ["Wyślę połowę kodu", 0]],
     blad2: "Kodów z SMS-ów nie podaje się nikomu. Dzięki nim ktoś może przejąć Twoje konto."},
    {kto: "Praca_Marzen",
     start: "„Mam dla Ciebie pracę! 200 zł za godzinę. Wystarczy, że podasz numer konta i PESEL.”",
     opcje1: [["Podam dane, to szansa", 0], ["Odmawiam i pytam rodziców o ofertę", 1], ["Podam tylko PESEL", 0]],
     blad1: "Dane takie jak PESEL i numer konta nie powinny trafiać do nieznajomych, zwłaszcza przy ofertach „za dobrych”.",
     dalej: "„Spokojnie, to legalne. Zapłać tylko 50 zł opłaty startowej, oddam z nawiązką.”",
     opcje2: [["Zapłacę 50 zł, to niewiele", 0], ["Odmawiam i zgłaszam ofertę", 1], ["Zapłacę 10 zł na próbę", 0]],
     blad2: "Oferta pracy, w której to Ty musisz najpierw zapłacić, jest klasycznym oszustwem."},
    {kto: "Ania_14",
     start: "„Hej! Szukam kogoś do pogadania. Wyślesz mi swoje zdjęcie? Ja Ci swoje też!”",
     opcje1: [["Wyślę zdjęcie, skoro ona też", 0], ["Nie wysyłam zdjęć nieznajomym", 1], ["Wyślę stare zdjęcie", 0]],
     blad1: "Nie wiesz, kto naprawdę jest po drugiej stronie. Zdjęć nie wysyłamy osobom, których nie znamy.",
     dalej: "„Dziwne, że mi nie ufasz. To chociaż podaj adres, wyślę Ci prezent.”",
     opcje2: [["Podam adres, to tylko prezent", 0], ["Przerywam rozmowę, blokuję i zgłaszam", 1], ["Podam tylko ulicę", 0]],
     blad2: "Adres to bardzo wrażliwa informacja. Prezentami od obcych nie ma co się łudzić: zablokuj i zgłoś."},
    {kto: "Trener_Marek",
     start: "„Cześć, szukam młodych talentów do drużyny e-sportowej. Podaj numer telefonu i szkołę.”",
     opcje1: [["Podam numer i szkołę", 0], ["Pytam rodziców i nic nie podaję", 1], ["Podam tylko szkołę", 0]],
     blad1: "Nieznajomy z internetu nie powinien dostawać numeru ani nazwy szkoły. Najpierw porozmawiaj z dorosłym.",
     dalej: "„Spotkajmy się jutro po szkole, przyjdź sam i nikomu nie mów.”",
     opcje2: [["Idę, to szansa", 0], ["Nie idę, mówię rodzicom i blokuję", 1], ["Idę, ale z telefonem w kieszeni", 0]],
     blad2: "Tajne spotkanie z nieznajomym z sieci jest groźne. Powiedz dorosłemu i zablokuj kontakt."}
  ],
  oszustwa: [
    {tresc: "„Wyślij mi swojego skina za 200 zł, a oddam Ci dwa! Ty pierwszy, ja uczciwy. Albo wejdź na skins-trade.top i zaloguj się kontem gry.”",
     opcje: [["Wysyłam pierwszy, bo dwa to okazja", 0], ["Odmawiam i wymieniam tylko oficjalną wymianą w grze", 1], ["Loguję się na skins-trade.top", 0]],
     blad: "„Ty pierwszy” i logowanie na obcej stronie to klasyczne metody kradzieży kont i przedmiotów."},
    {tresc: "„Tu administrator gry. Wykryliśmy cheaty na Twoim koncie. Podaj hasło w ciągu 5 minut, bo dostaniesz bana.”",
     opcje: [["Podam hasło, boję się bana", 0], ["Administratorzy nie pytają o hasło, zgłaszam wiadomość", 1], ["Podam hasło i zmienię je później", 0]],
     blad: "Prawdziwa obsługa gry nigdy nie prosi o hasło. Presja czasu to typowy chwyt."},
    {tresc: "„Darmowa waluta do gry! Wejdź na darmowe-monety.top, zaloguj się kontem gry i odbierz 5000 monet.”",
     opcje: [["Loguję się, to tylko monety", 0], ["Ignoruję i zgłaszam link", 1], ["Loguję się na drugim koncie", 0]],
     blad: "Strony z darmową walutą kradną dane logowania. Waluty kupuje się tylko w oficjalnym sklepie gry."},
    {tresc: "„Pożycz mi konto na godzinkę, podbiję Ci ranking i oddam. Podaj tylko login i hasło.”",
     opcje: [["Pożyczam, ranking to ranking", 0], ["Nie udostępniam konta nikomu", 1], ["Podam login, hasło wyślę później", 0]],
     blad: "Konto jest tylko Twoje. Pożyczone konto często „znika” albo zostaje sprzedane."},
    {tresc: "„Mam kod na darmowe skiny, ale musisz mi podać swój login i kod z maila.”",
     opcje: [["Podaję, to darmowe skiny", 0], ["Nie podaję żadnych kodów", 1], ["Podam sam login", 0]],
     blad: "Kody z maila i SMS-ów są tylko dla Ciebie. Z nimi ktoś może przejąć konto."},
    {tresc: "„Jestem z supportu gry. Zainstaluj ten program, to naprawimy Twoje konto: gra-fix.top/pobierz.”",
     opcje: [["Instaluję program", 0], ["Pomoc znajdę tylko na oficjalnej stronie gry", 1], ["Instaluję, ale nie uruchamiam", 0]],
     blad: "Pliki z linków od „supportu” często są wirusami. Prawdziwej pomocy szukaj w grze lub na oficjalnej stronie."},
    {tresc: "„Sprzedam Ci rzadkiego skina za 10 zł, ale przelej mi najpierw na BLIK-a.”",
     opcje: [["Przelewam, 10 zł to niewiele", 0], ["Odmawiam, wymieniam tylko w oficjalnym sklepie gry", 1], ["Proszę o skina i potem zapłacę", 0]],
     blad: "Płatności z góry dla obcych to klasyk. Przedmioty kupujemy tylko tam, gdzie gra to przewiduje."}
  ],
  telefony: [
    {tresc: "Dzwoni „konsultant banku”: „Wykryliśmy włamanie na Twoje konto. Podaj kod BLIK, żeby zablokować przelew.”",
     opcje: [["Podam kod, to pilne", 0], ["Rozłączam się i dzwonię na numer z karty", 1], ["Podam pierwsze trzy cyfry", 0]],
     blad: "Prawdziwy bank nie prosi o kody BLIK. Rozłącz się i zadzwoń na numer, który znasz."},
    {tresc: "Dzwoni „policjant”: „Twoje oszczędności są zagrożone. Przelej je na bezpieczne konto, nikomu nie mów.”",
     opcje: [["Przelewam, to policja", 0], ["Rozłączam się i dzwonię pod 112", 1], ["Przelewam połowę", 0]],
     blad: "Policja nie prosi o przelewy na „bezpieczne konta”. „Nikomu nie mów” to znak oszustwa."},
    {tresc: "SMS „z banku”: „Konto zablokowane! Kliknij bank-logowanie.top i zaloguj się w 15 minut.”",
     opcje: [["Klikam i loguję się", 0], ["Nie klikam, loguję się przez aplikację banku", 1], ["Klikam, ale nie podam hasła", 0]],
     blad: "Linki z SMS-ów prowadzą często do fałszywych stron. Loguj się tylko przez oficjalną aplikację."},
    {tresc: "Dzwoni „wujek”: „Mam nowy numer i pilnie potrzebuję 500 zł na BLIK. Oddam jutro.”",
     opcje: [["Wysyłam, to rodzina", 0], ["Dzwonię do wujka na stary numer", 1], ["Wyślę 100 zł na próbę", 0]],
     blad: "Zanim pomożesz „bliskiej osobie” z nowego numeru, sprawdź to starym kontaktem."},
    {tresc: "Dzwoni „pracownik firmy kurierskiej”: „Paczka nie dojdzie. Podaj numer karty, odblokuję przesyłkę.”",
     opcje: [["Podam numer, żeby odebrać paczkę", 0], ["Rozłączam się i sprawdzam przesyłkę w aplikacji kuriera", 1], ["Podam tylko część numeru", 0]],
     blad: "Kurier nie potrzebuje numeru karty. Sprawdź przesyłkę w oficjalnej aplikacji."},
    {tresc: "SMS: „Mamo/tato, mam rozbity telefon, pisz na ten numer. Wyślij mi BLIK-iem 300 zł, tylko szybko!”",
     opcje: [["Wysyłam, to moje dziecko", 0], ["Dzwonię na stary numer dziecka", 1], ["Pytam o szczegóły i wysyłam 100 zł", 0]],
     blad: "Zawsze potwierdź starym numerem albo osobiście. Presja czasu to znak oszustwa."},
    {tresc: "Dzwoni „informatyk z Microsoftu”: „Wirus na Twoim komputerze. Zainstaluj program zdalnego dostępu.”",
     opcje: [["Instaluję, to pomoc", 0], ["Rozłączam się, firmy nie dzwonią w takich sprawach", 1], ["Instaluję i patrzę, co robi", 0]],
     blad: "Zdalny dostęp daje obcemu pełną kontrolę nad komputerem. Takie telefony to oszustwo."}
  ],
  kody: [
    {tresc: "Na parkomacie jest naklejka z kodem QR: „Zapłać szybciej”. Kod prowadzi do formularza z danymi karty.",
     opcje: [["Skanuję i podaję dane karty", 0], ["Płacę w oficjalnej aplikacji lub parkomacie", 1], ["Podam tylko część danych karty", 0]],
     blad: "Naklejki z kodem QR bywają podklejone przez oszustów. Płać tylko oficjalnym sposobem."},
    {tresc: "E-mail: „Twoja paczka czeka. Zeskanuj kod QR i dopłać 1 zł.”",
     opcje: [["Skanuję i płacę", 0], ["Sprawdzam paczkę w oficjalnej aplikacji kuriera", 1], ["Skanuję, ale nie płacę", 0]],
     blad: "Drobne dopłaty z kodów QR to sztuczka na dane karty. Sprawdź przesyłkę na oficjalnej stronie."},
    {tresc: "Plakat w szkole: „Wygraj telefon! Zeskanuj kod i zaloguj się kontem szkolnym.”",
     opcje: [["Skanuję i loguję się", 0], ["Pytam nauczyciela o ten konkurs", 1], ["Skanuję tylko dla zabawy", 0]],
     blad: "Kod QR może prowadzić do fałszywej strony logowania. Zapytaj, kto organizuje konkurs."},
    {tresc: "Menu w restauracji ma kod QR. Strona każe zainstalować „wymaganą aplikację” spoza oficjalnego sklepu.",
     opcje: [["Instaluję, żeby zobaczyć menu", 0], ["Nie instaluję i proszę o zwykłe menu", 1], ["Instaluję i potem usuwam", 0]],
     blad: "Zwykłe menu nie wymaga instalowania aplikacji spoza oficjalnego sklepu."},
    {tresc: "Na słupie w mieście wisi plakat: „Darmowy przejazd! Zeskanuj kod QR i zaloguj się kontem miejskim.”",
     opcje: [["Skanuję i loguję się", 0], ["Sprawdzam ofertę na oficjalnej stronie miasta", 1], ["Skanuję, ale nie loguję się", 0]],
     blad: "Plakaty z QR łatwo podkleić. Ofertę sprawdzaj w oficjalnym źródle."},
    {tresc: "SMS od „banku”: „Zeskanuj kod QR z załącznika, aby odblokować kartę.”",
     opcje: [["Skanuję i odblokowuję", 0], ["Dzwonię do banku na numer z karty", 1], ["Skanuję tylko jeden raz", 0]],
     blad: "Bank nie odblokowuje kart przez kody QR z SMS-ów. Zadzwoń na numer z karty."},
    {tresc: "Na stoisku koncertowym: „Bilety taniej tylko dziś! Zeskanuj kod, wpisz dane karty i PIN.”",
     opcje: [["Skanuję i wpisuję dane", 0], ["Kupuję tylko u oficjalnego sprzedawcy", 1], ["Wpisuję dane bez PIN-u", 0]],
     blad: "PIN nigdy nie jest potrzebny do zakupów. Bilety kupuj tylko oficjalnie."}
  ],
  aplikacjeSklep: [
    {nazwa: "Chatly", opcje: [["Chatly (wydawca: Chatly Inc., oficjalna strona, 100 mln pobrań)", 1], ["Chat1y Free (wydawca nieznany, 3 tys. pobrań)", 0], ["Chatly PRO odblokowany (plik .apk z forum)", 0]]},
    {nazwa: "Pixel Run", opcje: [["Pixel Run (wydawca: studio z oficjalnej strony gry, 20 mln pobrań)", 1], ["Pixel Run Mod Free (prosi o dostęp do SMS-ów)", 0], ["Pixeel Run 2 (wydawca nieznany, mnóstwo literówek w opisie)", 0]]},
    {nazwa: "aplikacja banku", opcje: [["Aplikacja z linku na oficjalnej stronie banku", 1], ["Aplikacja z reklamy w wyszukiwarce (inny wydawca)", 0], ["Plik .apk przysłany w wiadomości od „konsultanta”", 0]]},
    {nazwa: "Edytor Foto", opcje: [["Edytor Foto (wydawca: znana firma, tysiące opinii, bez dziwnych uprawnień)", 1], ["Edytor Foto Pro Free (prosi o kontakty i mikrofon)", 0], ["Edytor-Foto-Max (instalacja spoza oficjalnego sklepu)", 0]]},
    {nazwa: "Komunikator Z", opcje: [["Komunikator Z (wydawca: oficjalna firma, 50 mln pobrań, brak podejrzanych uprawnień)", 1], ["Kommunikator Z Free (wydawca nieznany, prosi o SMS-y)", 0], ["Komunikator Z Premium (plik .apk z linku w mailu)", 0]]},
    {nazwa: "Muzyka Max", opcje: [["Muzyka Max (wydawca: znana platforma, tysiące opinii)", 1], ["Muzika Max Darmowa (wydawca nieznany, literówki w opisie)", 0], ["Muzyka Max Mod (instalacja z forum)", 0]]},
    {nazwa: "Menedżer plików", opcje: [["Menedżer plików (wydawca: producent telefonu, oficjalny sklep)", 1], ["Super Menedżer Plików Pro (prosi o kontakty i mikrofon)", 0], ["Menedżer Plików Free (instalacja spoza oficjalnego sklepu)", 0]]}
  ],
  aplikacje: [
    {nazwa: "Latarka", uprawnienia: [["Dostęp do diody aparatu", 1], ["Dostęp do kontaktów", 0], ["Dostęp do mikrofonu", 0], ["Dostęp do lokalizacji", 0]]},
    {nazwa: "Kalkulator", uprawnienia: [["Dostęp do aparatu", 0], ["Dostęp do kontaktów", 0], ["Dostęp do SMS-ów", 0], ["Dostęp do lokalizacji", 0]]},
    {nazwa: "Mapa", uprawnienia: [["Dostęp do lokalizacji", 1], ["Dostęp do kontaktów", 0], ["Dostęp do mikrofonu", 0], ["Dostęp do SMS-ów", 0]]},
    {nazwa: "Komunikator", uprawnienia: [["Dostęp do mikrofonu (rozmowy)", 1], ["Dostęp do aparatu (wideorozmowy)", 1], ["Dostęp do SMS-ów", 0], ["Dostęp do lokalizacji w tle", 0]]},
    {nazwa: "Budzik", uprawnienia: [["Powiadomienia", 1], ["Dostęp do kontaktów", 0], ["Dostęp do aparatu", 0], ["Dostęp do lokalizacji", 0]]},
    {nazwa: "Skaner kodów", uprawnienia: [["Dostęp do aparatu", 1], ["Dostęp do kontaktów", 0], ["Dostęp do SMS-ów", 0], ["Dostęp do mikrofonu", 0]]},
    {nazwa: "Dyktafon", uprawnienia: [["Dostęp do mikrofonu", 1], ["Dostęp do kontaktów", 0], ["Dostęp do SMS-ów", 0], ["Dostęp do lokalizacji", 0]]},
    {nazwa: "Galeria zdjęć", uprawnienia: [["Dostęp do zdjęć i filmów", 1], ["Dostęp do SMS-ów", 0], ["Dostęp do mikrofonu", 0], ["Dostęp do kontaktów", 0]]},
    {nazwa: "Pogoda", uprawnienia: [["Dostęp do lokalizacji", 1], ["Powiadomienia", 1], ["Dostęp do kontaktów", 0], ["Dostęp do mikrofonu", 0]]}
  ],
  hejt: [
    "„Jesteś beznadziejny, nikt Cię nie lubi. Wszyscy się z Ciebie śmieją.”",
    "„Ale z Ciebie głupek. Wrzucę Twoje zdjęcie do grupy, niech wszyscy zobaczą.”",
    "„Nie nadajesz się do tej drużyny. Lepiej zniknij z tej gry.”",
    "„Cała klasa pisze o Tobie na tajnym czacie. Zobacz, co o Tobie mówią.”",
    "„Wszyscy mają Ciebie dość. Po co w ogóle tu piszesz?”",
    "„Zrobiłem screena z Twoją wiadomością i wrzucę go na grupę, niech się pośmieją.”",
    "„Ubierasz się jak ostatni frajer. Wszyscy to widzą.”"
  ],
  reakcjeDobre: [
    "Zrób zrzuty ekranu jako dowód", "Zablokuj i zgłoś konto", "Powiedz zaufanej dorosłej osobie",
    "Nie odpisuj i zachowaj spokój", "Zgłoś sprawę w szkole lub administratorowi platformy"
  ],
  reakcjeZle: [
    "Odpisz mu jeszcze ostrzej", "Usuń wszystko i nikomu nie mów",
    "Opublikuj jego dane, niech wszyscy zobaczą", "Załóż fałszywe konto i zemścij się"
  ],
  latki: [
    "Łatka bezpieczeństwa KB402", "Aktualizacja przeglądarki", "Poprawka sterownika klawiatury",
    "Aktualizacja systemu operacyjnego", "Poprawka czytnika PDF", "Aktualizacja antywirusa",
    "Łatka zabezpieczeń Wi‑Fi", "Poprawka menedżera haseł",
"Poprawka zabezpieczeń kamery", "Aktualizacja Java", "Łatka luki w systemie plików", "Aktualizacja sterownika karty sieciowej"
  ],
  hasla: [
    [["Kasia2008", 0], ["qwerty123", 0], ["kot-lampa-rower-zielony-72", 1], ["Janek1234", 0]],
    [["haslo123", 0], ["Tanczymy#nad_Wisla_o_5:00", 1], ["12345678", 0], ["Ola1234!", 0]],
    [["Psiak2010", 0], ["abcdef", 0], ["Zupa_Pomidorowa&Rower_Lato99", 1], ["Admin123", 0]],
    [["password", 0], ["Maciek_Kowalski", 0], ["Sloneczko!", 0], ["Mala-Zebra_pije-herbate_w_Oslo41", 1]],
    [["zaq12wsx", 0], ["Dom_Wiatrak_Czerwony!_Pływam_88", 1], ["Pawel2005", 0], ["1q2w3e4r", 0]],
    [["MojePsy1", 0], ["Gitara-Smok-Lodowka-Trawa-17", 1], ["Pass1234", 0], ["Marta!Marta", 0]]
  ],
  linki: [
    {co: "konta na Allegro", opcje: [["https://allegro.pl/logowanie", 1], ["https://allegro.pl.logowanie-24.top", 0], ["https://allegr0.pl/login", 0], ["https://allegro-pl.konto-weryfikacja.com", 0]]},
    {co: "paczki InPost", opcje: [["https://inpost.pl/sledzenie-przesylek", 1], ["https://inpost.pl.doplata-paczki.ru", 0], ["https://1npost.pl/odbierz", 0], ["https://inpost-paczka.top/zaplac", 0]]},
    {co: "banku mBank", opcje: [["https://online.mbank.pl", 1], ["https://mbank.pl.panel-klienta.top", 0], ["https://mbank-logowanie.xyz", 0], ["http://mbank.pl-bezpieczenstwo.com", 0]]},
    {co: "serwisu OLX", opcje: [["https://www.olx.pl", 1], ["https://olx.pl.wplata-24.xyz", 0], ["https://0lx.pl/odbierz-pieniadze", 0], ["https://olx-platnosc-bezpieczna.top", 0]]},
    {co: "Poczty Polskiej", opcje: [["https://www.poczta-polska.pl", 1], ["https://poczta-polska.pl.sledzenie-paczki.top", 0], ["https://poczta-polska-oplata.com", 0], ["https://pocztapolska.dop1ata.info", 0]]},
    {co: "sklepu Steam", opcje: [["https://store.steampowered.com", 1], ["https://steamcommunnity.com/gift", 0], ["https://steampowered.gift/odbierz", 0], ["https://steam-prezent.top/logowanie", 0]]},
    {co: "poczty szkolnej", opcje: [["https://poczta.szkola.edu.pl", 1], ["https://szkola.edu.pl.poczta-ucznia.ru", 0], ["https://poczta-szkola-edu.top/login", 0], ["https://sz-kola.edu.pl.verify.net", 0]]}
  ]
};
