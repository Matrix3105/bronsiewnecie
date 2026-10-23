'use strict';

const FABULY = [
  {
    id: "wirus", kiedy: "Wczoraj wieczorem", tytul: "Darmowa gra",
    skrot: "Pobrałeś „darmową” grę i złapałeś wirusa.",
    akapity: [
      "Nowa gra kosztowała 129 zł, więc na forum znalazłeś link do „darmowej wersji” i pobrałeś plik darmowa_gra_crack.exe. Antywirus krzyczał, więc go wyłączyłeś. „Przecież to tylko gra.”",
      "Gra się nie uruchomiła, ale od tamtej pory wentylator wyje, komputer zwalnia, a w tle coś cały czas wysyła dane do internetu.",
      "Dziś o 23:48 zaczęły przychodzić SMS-y z kodami do logowania, o które nie prosiłeś. Wirus podgląda każdy Twój klawisz. Do rana musisz go powstrzymać, zanim wyczyści Ci wszystkie konta."
    ],
    start: "Wirus działa w tle. Pilnuj alertów i pobranych plików.",
    epilog: "Wirus został usunięty, hasła zmienione, a Ty już wiesz, że „darmowa” gra potrafi kosztować najwięcej.",
    faworyci: ["zlosliwyPlik", "keylogger", "zgadywanie", "aplikacja"],
    pulapka: .4,
    plik: "darmowa_gra_crack.exe",
    post: "Post: „Pobrałem darmową grę, polecam, link w komentarzu!”",
    fejk: "„Antywirus to oszustwo! Wyłącz go, a gry będą działać szybciej. Sprawdzone!”",
    opisy: {
      zlosliwyPlik: "Plik z „darmowej gry” nadal siedzi w folderze Pobrane.",
      keylogger: "Wirus z „darmowej gry” zapisuje Twoje klawisze.",
      zgadywanie: "Ktoś loguje się hasłem podpatrzonym na zainfekowanym komputerze.",
      aplikacja: "Znowu „odblokowana” wersja czegoś, co kosztuje."
    },
    wstawki: {
      zlosliwyPlik: "Wirus przyszedł z pliku darmowa_gra_crack.exe, który pobrałeś wczoraj.",
      keylogger: "To ten sam wirus, który zapisuje Twoje klawisze. Łatki go zablokują.",
      zgadywanie: "Wirus podpatrzył hasło, więc atakujący próbują się logować.",
      aplikacja: "Wirus zaczął się od „odblokowanej” wersji. Tym razem wybierz oficjalną aplikację."
    },
    maile: [
      {from: "support@gamecrack-helper.top", s: "Twoja gra jest gotowa", b: "Pobierz łatkę, żeby uruchomić grę: gamecrack-helper.top/patch.exe", p: 1,
       t: "Łatka w pliku .exe z nieznanej strony to kolejny wirus."},
      {from: "antywirus@pomoc-pc-24.xyz", s: "Wykryto 17 wirusów!", b: "Zadzwoń pod numer ze strony i zainstaluj nasz program.", p: 1,
       t: "Fałszywy antywirus straszy i każe coś instalować. Prawdziwy działa na Twoim komputerze, a nie przez maila."},
      {from: "admin@forum-gier-pl.net", s: "Dostęp do darmowych gier", b: "Zaloguj się hasłem do forum, a dostaniesz konto VIP.", p: 1,
       t: "Logowanie przez link z maila, żeby dostać „dostęp”, to wyłudzanie hasła."},
      {from: "nauczyciel@szkola.pl", s: "Nadrób temat z informatyki", b: "Materiały o bezpieczeństwie w sieci są w dzienniku elektronicznym.", p: 0,
       t: "Znany nadawca, brak linków i próśb o dane."},
      {from: "no-reply@twoj-antywirus.pl", s: "Raport tygodniowy", b: "Skan zakończony. Szczegóły w aplikacji. Brak linków w tym mailu.", p: 0,
       t: "Raport z programu, który sam zainstalowałeś, bez linków do logowania."}
    ]
  },
  {
    id: "haslo", kiedy: "Dziś rano", tytul: "Stare hasło",
    skrot: "Wyciekło stare hasło z forum, a używasz go wszędzie.",
    akapity: [
      "Dwa lata temu założyłeś konto na małym forum „GraczePL”. Było Ci wszystko jedno, więc wpisałeś swoje ulubione hasło. To samo, którego używasz prawie wszędzie.",
      "Dziś rano przyszedł mail: forum zostało zhakowane, a baza haseł trafiła do sieci. Przeczytałeś i uznałeś, że „to się mnie nie tyczy”.",
      "Wieczorem zaczęły się dziwne logowania na Twoich kontach. Boty wypróbowują Twoje hasło wszędzie, gdzie się da. Masz czas do rana, żeby pozamykać furtki."
    ],
    start: "Boty testują Twoje stare hasło. Czekaj na alerty.",
    epilog: "Każde konto ma teraz inne hasło i 2FA. Wyciek z GraczePL nie zrobił Ci już krzywdy.",
    faworyci: ["zgadywanie", "hasla", "wyciek", "ustawienia"],
    pulapka: .3,
    post: "Post: „Moje hasło do wszystkiego to ulubione imię plus rok, tak łatwiej!”",
    fejk: "„Wyciek z GraczePL to ściema, nie trzeba zmieniać żadnych haseł!”",
    opisy: {
      zgadywanie: "Ktoś loguje się hasłem, które wyciekło z forum GraczePL.",
      hasla: "Boty testują hasła z wycieku, w tym Twoje stare.",
      wyciek: "Twoje hasło z forum GraczePL krąży w sieci.",
      ustawienia: "Po wycieku z GraczePL Twoje konta mają otwarte furtki."
    },
    wstawki: {
      zgadywanie: "Boty logują się hasłem z forum GraczePL. Zanim podasz kod, sprawdź, czy to Ty o niego prosisz.",
      hasla: "Po wycieku z GraczePL ustaw hasło, którego nie ma na żadnej liście.",
      wyciek: "Hasło z GraczePL wyciekło. Nowe musi być inne niż na jakimkolwiek innym koncie.",
      ustawienia: "Po wycieku z GraczePL zamknij furtki w ustawieniach konta."
    },
    maile: [
      {from: "bezpieczenstwo@graczepl-info.com", s: "Sprawdź, czy Twoje hasło wyciekło", b: "Wpisz swoje hasło na stronie, a powiemy, czy jest bezpieczne.", p: 1,
       t: "Prawdziwy serwis nigdy nie prosi o wpisanie hasła, żeby je „sprawdzić”."},
      {from: "admin@graczepl.top", s: "Zresetuj hasło natychmiast", b: "Kliknij link, aby zmienić hasło. Link wygaśnie za 15 minut.", p: 1,
       t: "Link z presją czasu i dziwną końcówką domeny (.top) to phishing, nawet jeśli wyciek był prawdziwy."},
      {from: "pomoc@twoje-konto-bezpieczne.xyz", s: "Twoje dane są w sieci", b: "Wykup monitoring za 9,99 zł i podaj dane karty.", p: 1,
       t: "Straszenie wyciekiem i prośba o dane karty to znany scenariusz oszustwa."},
      {from: "powiadomienia@twoj-bank.pl", s: "Nowe logowanie na konto", b: "Jeśli to nie Ty, zadzwoń na numer z karty. Brak linków.", p: 0,
       t: "Powiadomienie bez linków, odsyłające do numeru z karty, jest bezpieczne."},
      {from: "kontakt@menedzerhasel.pl", s: "Raport siły haseł", b: "Dwa hasła są słabe. Zmień je w aplikacji. Brak linków.", p: 0,
       t: "Wiadomość z programu, który sam zainstalowałeś, bez linków i bez próśb o dane."}
    ]
  },
  {
    id: "quiz", kiedy: "Tydzień temu", tytul: "Quiz z nagrodą",
    skrot: "Podałeś swoje dane w quizie z nagrodą.",
    akapity: [
      "W sieci trafiłeś na quiz „Jakim bohaterem jesteś?”. Do wyniku trzeba było podać imię, nazwisko, datę urodzenia, miasto i numer telefonu. Nagroda: słuchawki za sam udział.",
      "Słuchawek nie było. Za to od kilku dni piszą do Ciebie ludzie, którzy znają Twoje imię, miasto i szkołę, i dziwnie „przypadkiem” proszą o kody oraz linki.",
      "Twoje dane krążą po sieci. Ktoś próbuje ich użyć do włamania na Twoje konta i do oszukiwania Cię. Do rana nie możesz dać się nabrać."
    ],
    start: "Ktoś zna Twoje dane z quizu. Czekaj na alerty.",
    epilog: "Nie podajesz już danych w quizach z nagrodami, a Twój profil jest przycięty do minimum.",
    faworyci: ["profil", "telefon", "linki", "dezinformacja"],
    post: "Wynik quizu „Jakim bohaterem jesteś?” z imieniem, nazwiskiem i datą urodzenia",
    fejk: "„Odbierz nagrodę z quizu! Wystarczy podać numer telefonu i datę urodzenia.”",
    opisy: {
      profil: "Quiz ujawnił dane, które są teraz na Twoim profilu.",
      telefon: "Ktoś dzwoni i zna Twoje imię oraz miasto z quizu.",
      linki: "Link podszywa się pod „nagrodę z quizu”.",
      dezinformacja: "Wiadomość o „kolejnej nagrodzie” krąży wśród Twoich znajomych."
    },
    wstawki: {
      profil: "Quiz „Jakim bohaterem jesteś?” wyciągnął z Ciebie dane. Usuń to, co ich ujawnia.",
      telefon: "Dzwoniący zna Twoje imię i miasto z quizu. To jeszcze nie znaczy, że można mu ufać.",
      linki: "To kolejna „nagroda” po tamtym quizie.",
      dezinformacja: "Po quizie krąży fałszywa wiadomość o „kolejnej nagrodzie”. Wskaż ją."
    },
    maile: [
      {from: "nagroda@quiz-bohater.top", s: "Twoja nagroda czeka: słuchawki", b: "Podaj adres i numer karty na pokrycie wysyłki 1,99 zł.", p: 1,
       t: "Nagroda za quiz i dopłata do wysyłki to sposób na dane karty."},
      {from: "organizator@quiz-bohater-konkurs.xyz", s: "Potwierdź dane, aby nie stracić nagrody", b: "Podaj PESEL i login do konta w ciągu 2 godzin.", p: 1,
       t: "PESEL i login nigdy nie są potrzebne do odbioru nagrody."},
      {from: "nowosci@quiz-bohater.top", s: "Zobacz pełny wynik", b: "Zaloguj się kontem z mediów społecznościowych, żeby zobaczyć wynik.", p: 1,
       t: "Logowanie kontem na obcej stronie oddaje oszustowi dostęp do konta."},
      {from: "dyrekcja@szkola.pl", s: "Zebranie rodziców w czwartek", b: "Zapraszamy na zebranie o 17:00 w sali 12.", p: 0,
       t: "Znany nadawca, zwykła informacja."},
      {from: "biblioteka@miasto.pl", s: "Książka czeka na odbiór", b: "Zarezerwowana pozycja czeka do piątku. Odbiór osobiście, bez linków.", p: 0,
       t: "Mail zgodny z Twoją rezerwacją, bez linków i próśb o dane."}
    ]
  },
  {
    id: "wifi", kiedy: "Wczoraj po szkole", tytul: "Darmowe Wi‑Fi",
    skrot: "Połączyłeś się z podróbką sieci w galerii.",
    akapity: [
      "Wracając z miasta, wszedłeś do galerii handlowej. Telefon złapał sieć „Galeria_Free_WiFi”: bez hasła, bez pytań. Zalogowałeś się na pocztę i do banku.",
      "Dopiero później zauważyłeś, że prawdziwa sieć galerii nazywa się inaczej. Ktoś postawił podróbkę i podsłuchiwał wszystko, co wysyłałeś.",
      "Teraz ktoś loguje się na Twoje konta, a w skrzynce pojawiają się dziwne wiadomości. Musisz przetrwać do rana."
    ],
    start: "Ktoś podsłuchał Cię w galerii. Czekaj na alerty.",
    epilog: "Publiczne Wi‑Fi omijasz szerokim łukiem albo łączysz się z VPN, a poczta ma 2FA.",
    faworyci: ["wifi", "zgadywanie", "linki", "sklep"],
    pulapka: .4,
    siec: "Galeria_Free_WiFi (otwarta)",
    post: "Post: „Jestem w galerii sam, wracam o 20:00 przez parking!”",
    fejk: "„Darmowe Wi‑Fi w galerii jest zawsze bezpieczne, bo to oficjalna sieć!”",
    opisy: {
      wifi: "Podróbka „Galeria_Free_WiFi” nadal podsłuchuje Twój ruch.",
      zgadywanie: "Ktoś loguje się danymi przechwyconymi w galerii.",
      linki: "Link do „weryfikacji konta” po tym, jak ktoś podsłuchał Twoją pocztę.",
      sklep: "Sklep zna Twoje dane z przechwyconej poczty."
    },
    wstawki: {
      wifi: "Wczoraj połączyłeś się z podróbką sieci galerii. Dziś wybierz tylko swoją sieć.",
      zgadywanie: "Dane z podsłuchanej sieci pozwalają zalogować się na Twoje konto.",
      linki: "Napastnik zna Twoją pocztę i podszywa się pod znane serwisy.",
      sklep: "Napastnik zna Twoje dane z podsłuchanej poczty i podsyła „okazje”. Sprawdź sklep."
    },
    maile: [
      {from: "it@galeria-handlowa-wifi.top", s: "Zaloguj się do sieci gościnnej", b: "Podaj login do poczty, żeby korzystać z szybkiego internetu.", p: 1,
       t: "Darmowa sieć nie potrzebuje loginu i hasła do Twojej poczty."},
      {from: "bank@moj-bank-pomoc.net", s: "Wykryto podejrzane logowanie z galerii", b: "Zweryfikuj konto: moj-bank-pomoc.net/weryfikacja", p: 1,
       t: "Podróbka banku wykorzystuje prawdziwy kontekst, żeby Cię przestraszyć. Zdradza ją dziwna domena."},
      {from: "pomoc@poczta-security.xyz", s: "Ktoś przechwycił Twoje wiadomości", b: "Zainstaluj nasz program zabezpieczający: poczta-security.xyz/instaluj.exe", p: 1,
       t: "Straszenie i plik .exe do zainstalowania to wirus, a nie ochrona."},
      {from: "no-reply@twoj-operator.pl", s: "Rachunek za październik", b: "Faktura jest dostępna w aplikacji operatora. Brak linków w tym mailu.", p: 0,
       t: "Znany operator i brak linków do logowania."},
      {from: "kolega@gmail.com", s: "Zdjęcia z wczorajszego spotkania", b: "Wrzuciłem je do naszego klasowego albumu. Cześć!", p: 0,
       t: "Znajomy nadawca, wiadomość pasuje do sytuacji, brak dziwnych próśb."}
    ]
  },
  {
    id: "kamil", kiedy: "Kilka dni temu", tytul: "Znajomy z gry",
    skrot: "Kolega z gry wyłudził od Ciebie kod z SMS-a.",
    akapity: [
      "W grze online poznałeś gracza „Kamil_Legenda”. Pisaliście codziennie, pomagał Ci w grze i wydawał się w porządku. Po tygodniu poprosił o Twój numer telefonu „do gadania na komunikatorze”.",
      "Dziś przyszedł SMS z kodem. „Kamil” napisał: „wyślij mi ten kod, to sprawdzę, że jesteś prawdziwy”. Wysłałeś. Po chwili Twoje konto w grze przestało się logować.",
      "„Kamil” to żaden kolega. Ktoś przejmuje Twoje konta i pisze z fałszywych profili do Twoich znajomych. Do rana musisz go powstrzymać."
    ],
    start: "„Kamil” przejmuje Twoje konta. Czekaj na alerty.",
    epilog: "Zablokowałeś „Kamila”, zgłosiłeś go i opowiedziałeś o wszystkim zaufanej osobie. Kody z SMS-ów zostają już tylko u Ciebie.",
    faworyci: ["obcy", "oszustwoWGrze", "zgadywanie", "hejt"],
    pulapka: .6,
    pulapkaTekst: ["Kod dla „Kamila”", "„Kamil_Legenda” pisze, że to „tylko weryfikacja”, i prosi o przepisanie kodu z SMS-a. Nigdzie się teraz nie logujesz."],
    nick: "Kamil_Legenda",
    post: "Post: „Poznałem w grze świetnego kolegę, dałem mu numer telefonu i kod do konta!”",
    fejk: "„Gracze z TOP 10 nigdy nie używają 2FA, bo to spowalnia grę!”",
    opisy: {
      obcy: "„Kamil_Legenda” znów do Ciebie pisze.",
      oszustwoWGrze: "Ktoś z konta „Kamil_Legenda” proponuje „super wymianę”.",
      zgadywanie: "Ktoś loguje się na Twoje konta, bo wysłałeś kod „Kamilowi”.",
      hejt: "Gdy przestałeś odpisywać, „Kamil” zaczął Cię wyzywać."
    },
    wstawki: {
      obcy: "To ten sam „Kamil_Legenda”, któremu wysłałeś kod z SMS-a. Nie popełnij tego błędu drugi raz.",
      oszustwoWGrze: "„Kamil_Legenda” próbuje wyłudzić Twoje przedmioty z gry.",
      zgadywanie: "Kod z SMS-a, który wysłałeś „Kamilowi”, działa jak klucz do Twojego konta.",
      hejt: "„Kamil” zaczął Cię wyzywać, gdy przestałeś odpisywać. Reaguj rozsądnie."
    },
    maile: [
      {from: "support@gra-konto-odzyskaj.top", s: "Odzyskaj konto w grze", b: "Podaj login, hasło i kod z SMS-a, a odzyskamy je w 5 minut.", p: 1,
       t: "Prawdziwa obsługa gry nigdy nie prosi o hasło ani kod z SMS-a."},
      {from: "admin@gra-bany.xyz", s: "Dostałeś bana za oszustwo", b: "Odwołaj się: wpisz dane logowania w formularzu na stronie.", p: 1,
       t: "Formularz na obcej stronie „do odwołania od bana” zbiera Twoje hasła."},
      {from: "kamil.legenda@mail-gracz.com", s: "Sorry za wczoraj", b: "Zapomnijmy o wszystkim. Zobacz nasze zdjęcia z gry: mail-gracz.com/zdjecia", p: 1,
       t: "Oszust próbuje odzyskać Twoje zaufanie. Link od nieznajomego to pułapka."},
      {from: "support@oficjalna-gra.pl", s: "Zmiana hasła została wykonana", b: "Jeśli to Ty zmieniłeś hasło, nic nie musisz robić. Brak linków.", p: 0,
       t: "Potwierdzenie bez linków z domeny oficjalnej gry."},
      {from: "trener@klub-sportowy.pl", s: "Zmiana godziny treningu", b: "W czwartek trening o 17:30 zamiast 18:00.", p: 0,
       t: "Znany nadawca i zwykła informacja."}
    ]
  },
  {
    id: "link", kiedy: "Dziś po obiedzie", tytul: "Link od kumpla",
    skrot: "Kliknąłeś link od przejętego konta kumpla.",
    akapity: [
      "Dostałeś wiadomość od najlepszego kumpla: „Stary, ktoś nagrał Cię na przerwie, zobacz!” i link. Ciekawość wygrała, kliknąłeś i zalogowałeś się, bo strona poprosiła o konto.",
      "Strona była podróbką, a konto kumpla było przejęte. Twoje hasło trafiło do oszustów, którzy teraz piszą do Twoich znajomych Twoim imieniem.",
      "Do rana wszyscy wokół Ciebie mogą dostać fałszywe linki z Twojego konta. Zatrzymaj to, zanim stracisz zaufanie ludzi."
    ],
    start: "Z Twojego konta rozchodzą się fałszywe linki. Czekaj na alerty.",
    epilog: "Znajomi wiedzą już, że to nie Ty pisałeś, a Ty sprawdzasz adres, zanim klikniesz.",
    faworyci: ["linki", "dezinformacja", "zgadywanie", "profil"],
    pulapka: .55,
    pulapkaTekst: ["Kod z podróbki strony", "Strona z linku od „kumpla” prosi o kod 2FA, który właśnie przyszedł. Nie logowałeś się."],
    post: "Post, którego nie napisałeś: „Wygraj telefon, kliknij mój link!”",
    fejk: "„Kumpel wysłał? To na pewno bezpieczne, bo to kumpel!”",
    opisy: {
      linki: "Kolejny link „od znajomego”, tym razem podejrzany.",
      dezinformacja: "Z Twojego konta poszła do znajomych fałszywa wiadomość.",
      zgadywanie: "Ktoś loguje się hasłem, które wpisałeś na podróbce.",
      profil: "Z Twojego profilu rozsyłane są posty, których nie napisałeś."
    },
    wstawki: {
      linki: "Taki sam link dostałeś od kumpla. Teraz sprawdzaj adres, zanim klikniesz.",
      dezinformacja: "Ta wiadomość rozchodzi się z Twojego konta. Wskaż, co jest fałszywe.",
      zgadywanie: "Hasło wpisane na podróbce strony działa jak klucz do Twojego konta.",
      profil: "Z Twojego profilu rozsyłane są cudze posty. Usuń te niebezpieczne."
    },
    maile: [
      {from: "kumpel-wiadomosc@filmy-przerwa.top", s: "Zobacz, jak wyglądałeś!", b: "Zaloguj się kontem, żeby obejrzeć nagranie z przerwy.", p: 1,
       t: "Ciekawostka od „znajomego” z logowaniem przez link to przynęta."},
      {from: "pomoc@konto-odzyskiwanie.xyz", s: "Twoje konto wysłało spam", b: "Zaloguj się, żeby zablokować wysyłkę: konto-odzyskiwanie.xyz", p: 1,
       t: "Oszuści wykorzystują prawdziwy problem, żeby wyłudzić kolejne hasło."},
      {from: "nowy-profil@portal-spolecznosciowy.top", s: "Ktoś Cię oznaczył na zdjęciu", b: "Kliknij, żeby zobaczyć, kto Cię oznaczył.", p: 1,
       t: "Oznaczenie z linkiem do logowania zwykle jest fałszywe."},
      {from: "admin@portal-spolecznosciowy.pl", s: "Zmiana hasła została potwierdzona", b: "Jeśli to nie Ty, skorzystaj z odzyskiwania konta w aplikacji. Brak linków.", p: 0,
       t: "Brak linków, odsyła do aplikacji."},
      {from: "kolega@gmail.com", s: "Nie klikaj w to, co wysyłałem", b: "Przejęto mi konto, przepraszam. Nie klikaj w żadne moje dzisiejsze linki.", p: 0,
       t: "Ostrzeżenie od znajomego bez linków i próśb o dane."}
    ]
  }
];

let fabulaId = wczytajJSON("cybernoc_fabula", null);

function losujFabule() {
  const f = losuj(FABULY.filter(x => x.id !== fabulaId));
  fabulaId = f.id; zapiszJSON("cybernoc_fabula", fabulaId);
  return f;
}

const fab = () => FABULY.find(f => f.id === fabulaId) || losujFabule();
const opisAlertu = z => (fab().opisy || {})[z.id] || z.opis;
const pulaMaili = () => MAILE.concat(fab().maile, fab().maile);

function wstep(poZakonczeniu) {
  const f = fab(), karta = $("#w-karta"), tekst = $("#w-tekst");
  $("#w-kiedy").textContent = f.kiedy;
  $("#w-tytul").textContent = f.tytul;
  tekst.innerHTML = "";
  f.akapity.forEach((a, i) => {
    const p = elem("p", "", a);
    p.style.animationDelay = (0.5 + i * 1.7) + "s";
    tekst.appendChild(p);
  });
  const start = $("#w-start");
  start.style.animationDelay = (0.5 + f.akapity.length * 1.7) + "s";
  start.onclick = poZakonczeniu;
  const zmien = $("#w-zmien");
  zmien.style.animationDelay = start.style.animationDelay;
  // przyciski nie reagują, dopóki nie są w pełni widoczne (kliknięcie w pustym miejscu przyspiesza kartę)
  [start, zmien].forEach(b => {
    b.classList.remove("gotowy");
    b.onanimationend = () => b.classList.add("gotowy");
  });
  karta.classList.remove("szybko");
  karta.onclick = () => karta.classList.add("szybko");
  pokaz("s-intro");
}

function ekranWyboru() {
  const lista = $("#w-lista"); lista.innerHTML = "";
  FABULY.forEach(f => {
    const k = elem("button", "karta-fab");
    const czesciej = f.faworyci.map(id => ZAGROZENIA.find(z => z.id === id).nazwa.toLowerCase()).join(", ");
    k.append(elem("small", "", f.kiedy), elem("b", "", f.tytul), elem("span", "", f.skrot), elem("em", "", "Częściej: " + czesciej));
    if (f.id === fabulaId) { k.classList.add("ost"); k.prepend(elem("i", "", "ostatnio grana")); }
    k.onclick = () => rozpocznijZFabula(f.id);
    lista.appendChild(k);
  });
  pokaz("s-wybor");
}

function rozpocznijZFabula(id) {
  Object.keys(torby).forEach(k => delete torby[k]);
  zapisz(1); zerujBieg();
  fabulaId = id; zapiszJSON("cybernoc_fabula", id);
  wstep(() => zacznijDzien(1));
}

const nowaGra = ekranWyboru;
