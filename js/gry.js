const pobierz = id => document.getElementById(id);
function stworz(tag, klasa, tekst) {
  const element = document.createElement(tag);
  if (klasa) element.className = klasa;
  if (tekst != null) element.textContent = tekst;
  return element;
}

function uruchomQuiz(kontener, pytania) {
  let numer = 0, poprawne = 0;
  const pokazPytanie = () => {
    kontener.replaceChildren();
    if (numer >= pytania.length) {
      kontener.append(stworz('p', 'wynik-gry', 'Wynik: ' + poprawne + ' z ' + pytania.length + ' poprawnych.'));
      return;
    }
    const pytanie = pytania[numer];
    kontener.append(stworz('p', 'numer-pytania', 'Pytanie ' + (numer + 1) + ' z ' + pytania.length));
    const wiadomosc = stworz('div', 'wiadomosc');
    if (pytanie.od) wiadomosc.append(stworz('b', '', pytanie.od));
    wiadomosc.append(stworz('p', '', pytanie.tresc));
    kontener.append(wiadomosc);

    const listaOdpowiedzi = stworz('div', 'odpowiedzi' + (pytanie.odpowiedzi.length === 2 ? ' dwie' : ''));
    const komentarz = stworz('div', 'komentarz');
    komentarz.setAttribute('aria-live', 'polite');
    const przyciski = [];
    pytanie.odpowiedzi.forEach((tekst, indeks) => {
      const przycisk = stworz('button', 'odpowiedz', tekst);
      przyciski.push(przycisk);
      przycisk.onclick = () => {
        const trafnie = indeks === pytanie.poprawna;
        przyciski.forEach((p, j) => { p.disabled = true; if (j === pytanie.poprawna) p.classList.add('dobra'); });
        if (trafnie) { poprawne++; } else { przycisk.classList.add('zla'); }
        komentarz.textContent = (trafnie ? 'Dobrze! ' : 'Nie tym razem. ') + pytanie.wyjasnienie;
        komentarz.className = 'komentarz ' + (trafnie ? 'dobrze' : 'zle');
        const dalej = stworz('button', 'przycisk', numer < pytania.length - 1 ? 'Dalej' : 'Zobacz wynik');
        dalej.onclick = () => { numer++; pokazPytanie(); };
        kontener.append(dalej);
      };
      listaOdpowiedzi.append(przycisk);
    });
    kontener.append(listaOdpowiedzi, komentarz);
  };
  pokazPytanie();
}

const BEZPIECZNA_PULAPKA = ['Bezpieczna', 'Pułapka'];
uruchomQuiz(pobierz('pytania-phishing'), [
  { od: 'SMS od „InPost”', tresc: 'Twoja paczka nie może zostać doręczona. Dopłać 1,50 zł: inpost-oplata.top/x', odpowiedzi: BEZPIECZNA_PULAPKA, poprawna: 1, wyjasnienie: 'To phishing. Dziwna domena i drobna dopłata to klasyczny trik na wyłudzenie danych karty.' },
  { od: 'E-mail „Netflix”', tresc: 'Twoje konto wygasa DZIŚ! Zaloguj się: netflix.com-weryfikacja.info', odpowiedzi: BEZPIECZNA_PULAPKA, poprawna: 1, wyjasnienie: 'Prawdziwa domena to ta tuż przed pierwszym ukośnikiem, czyli tu „com-weryfikacja.info”. Napis „netflix.com” na początku to tylko przebranie.' },
  { od: 'Wiadomość od „kolegi” z nowego numeru', tresc: 'Hej, to ja! Telefon mi się zepsuł. Wyślij mi kod BLIK, oddam jutro.', odpowiedzi: BEZPIECZNA_PULAPKA, poprawna: 1, wyjasnienie: 'Konto znajomego mogło zostać przejęte. Zadzwoń do niego na stary numer, zanim cokolwiek wyślesz.' },
  { od: 'SMS z banku, tuż po tym jak sam się logujesz', tresc: 'Kod do logowania: 482913. Nikomu go nie podawaj.', odpowiedzi: BEZPIECZNA_PULAPKA, poprawna: 0, wyjasnienie: 'Kod, o który sam poprosiłeś, jest w porządku. Niebezpieczne byłoby podanie go komuś innemu.' },
  { od: 'Powiadomienie w aplikacji', tresc: 'Ktoś zalogował się z nowego urządzenia. Jeśli to nie Ty, zmień hasło w ustawieniach aplikacji.', odpowiedzi: BEZPIECZNA_PULAPKA, poprawna: 0, wyjasnienie: 'Wiadomość nie zawiera linku i odsyła do ustawień, które otworzysz sam. To dobry wzór ostrzeżenia.' },
  { od: 'Wiadomość prywatna', tresc: 'Gratulacje, wygrałeś iPhone’a! Podaj PESEL i adres, żeby odebrać nagrodę.', odpowiedzi: BEZPIECZNA_PULAPKA, poprawna: 1, wyjasnienie: 'Nikt nie rozdaje telefonów za PESEL. Dane osobowe to cenny łup dla oszustów.' },
  { od: 'Mail ze sklepu, w którym właśnie kupiłeś', tresc: 'Dziękujemy za zamówienie nr 4821. Szczegóły znajdziesz po zalogowaniu na stronie sklepu.', odpowiedzi: BEZPIECZNA_PULAPKA, poprawna: 0, wyjasnienie: 'Jeśli faktycznie coś zamawiałeś, to normalne potwierdzenie. Nie ma linku ani presji, a na stronę sklepu wchodzisz sam.' },
  { od: 'Wiadomość na Instagramie', tresc: 'Cześć, jestem z agencji. Zarobisz na reklamach, wystarczy, że zalogujesz się tu: insta-promo-login.xyz', odpowiedzi: BEZPIECZNA_PULAPKA, poprawna: 1, wyjasnienie: 'Obca osoba i strona do logowania w dziwnej domenie. To próba wyłudzenia Twojego loginu i hasła.' },
  { od: 'Mail „od wychowawcy”', tresc: 'Pilnie kup kartę podarunkową za 500 zł i prześlij mi kody. Jestem na spotkaniu, nie dzwoń.', odpowiedzi: BEZPIECZNA_PULAPKA, poprawna: 1, wyjasnienie: 'Oszuści podszywają się pod przełożonych, wywierają presję i zabraniają kontaktu. Zawsze zadzwoń i sprawdź.' },
  { od: 'Powiadomienie aplikacji, którą sam zainstalowałeś', tresc: 'Dostępna nowa wersja. Zaktualizuj w sklepie z aplikacjami.', odpowiedzi: BEZPIECZNA_PULAPKA, poprawna: 0, wyjasnienie: 'Brak linku, a aktualizację zrobisz sam w oficjalnym sklepie. To bezpieczny wzór powiadomienia.' }
]);

const wymaganiaHasla = [
  ['Co najmniej 12 znaków', h => h.length >= 12],
  ['Mała i wielka litera', h => /[a-ząćęłńóśźż]/.test(h) && /[A-ZĄĆĘŁŃÓŚŹŻ]/.test(h)],
  ['Cyfra', h => /\d/.test(h)],
  ['Znak specjalny (np. ! ? # %)', h => /[^\p{L}\d]/u.test(h)],
  ['Bez oczywistych wzorców (123, qwerty, hasło, admin)', h => h.length > 0 && !/123|qwert|haslo|hasło|password|admin|abc|0000/i.test(h)]
];
const listaWymagan = pobierz('lista-wymagan');
wymaganiaHasla.forEach(w => listaWymagan.append(stworz('li', '', w[0])));

function opiszCzas(sekundy) {
  if (sekundy < 1) return 'natychmiast';
  if (sekundy < 60) return Math.round(sekundy) + ' sekund';
  if (sekundy < 3600) return Math.round(sekundy / 60) + ' minut';
  if (sekundy < 86400) return Math.round(sekundy / 3600) + ' godzin';
  if (sekundy < 3.15e7) return Math.round(sekundy / 86400) + ' dni';
  if (sekundy < 3.15e9) return Math.round(sekundy / 3.15e7) + ' lat';
  return 'miliony lat i więcej';
}

let hasloZatwierdzone = false, spelnioneWymagania = 0;
pobierz('pole-hasla').addEventListener('input', zdarzenie => {
  const haslo = zdarzenie.target.value;
  spelnioneWymagania = 0;
  wymaganiaHasla.forEach((wymaganie, i) => {
    const spelnione = wymaganie[1](haslo);
    listaWymagan.children[i].className = spelnione ? 'spelnione' : '';
    if (spelnione) spelnioneWymagania++;
  });
  if (!haslo) { pobierz('czas-lamania').textContent = ''; return; }
  let pula = 0;
  if (/[a-ząćęłńóśźż]/.test(haslo)) pula += 32;
  if (/[A-ZĄĆĘŁŃÓŚŹŻ]/.test(haslo)) pula += 32;
  if (/\d/.test(haslo)) pula += 10;
  if (/[^\p{L}\d]/u.test(haslo)) pula += 33;
  let bity = haslo.length * Math.log2(pula || 1);
  if (!wymaganiaHasla[4][1](haslo)) bity = Math.min(bity, 20);
  pobierz('czas-lamania').textContent = 'Komputer złamałby to hasło: ' + opiszCzas(Math.pow(2, bity) / 1e10);
});
pobierz('zatwierdz-haslo').onclick = () => {
  if (hasloZatwierdzone) return;
  hasloZatwierdzone = true;
  pobierz('zatwierdz-haslo').disabled = true;
  pobierz('pole-hasla').disabled = true;
  const komentarz = pobierz('komentarz-haslo');
  komentarz.className = 'komentarz ' + (spelnioneWymagania === 5 ? 'dobrze' : 'zle');
  komentarz.textContent = spelnioneWymagania === 5
    ? 'Świetnie! Wszystkie wymagania spełnione.'
    : 'Spełnione wymagania: ' + spelnioneWymagania + ' z 5. Odśwież stronę, jeśli chcesz spróbować ponownie.';
};

uruchomQuiz(pobierz('pytania-sytuacje'), [
  { tresc: 'Nieznajoma osoba z Discorda pisze, że jesteś super, i prosi o Twoje zdjęcie „tylko dla niej”.', odpowiedzi: ['Wyślę, przecież to tylko zdjęcie', 'Zablokuję ją i powiem zaufanej dorosłej osobie', 'Zapytam, ile ma lat'], poprawna: 1, wyjasnienie: 'Nie wiesz, kim naprawdę jest ta osoba. Blokada i rozmowa z dorosłym to najlepsza reakcja.' },
  { tresc: 'Jesteś w galerii handlowej na darmowym Wi-Fi i chcesz szybko sprawdzić konto w banku.', odpowiedzi: ['Zalogują się, to tylko chwila', 'Użyję internetu z telefonu, a nie publicznego Wi-Fi', 'Zalogują się przez tryb incognito'], poprawna: 1, wyjasnienie: 'Publiczne sieci łatwo podsłuchać. Tryb incognito tego nie zmienia.' },
  { tresc: 'W grze ktoś oferuje darmowe skiny, jeśli zalogujesz się na swoje konto przez jego link.', odpowiedzi: ['Zalogują się, skiny są warte ryzyka', 'Nie kliknę i zgłoszę tego gracza', 'Podam tylko login, bez hasła'], poprawna: 1, wyjasnienie: 'To znany sposób kradzieży kont. Taki link zbiera Twoje dane.' },
  { tresc: 'Na stronie wyskakuje okno: „Wykryto 5 wirusów! Zadzwoń natychmiast pod numer…”.', odpowiedzi: ['Zadzwonię, żeby ktoś mi pomógł', 'Zamknę kartę i uruchomię prawdziwy antywirus', 'Zapłacę za „naprawę”'], poprawna: 1, wyjasnienie: 'To straszak. Prawdziwy system nie każe dzwonić do „konsultanta”.' },
  { tresc: 'Ktoś wrzucił na czat klasowy żenujące zdjęcie koleżanki.', odpowiedzi: ['Prześlę dalej, wszyscy się śmieją', 'Nie udostępnię, zgłoszę to i napiszę do koleżanki', 'Zignoruję, to nie moja sprawa'], poprawna: 1, wyjasnienie: 'Udostępnianie pogłębia krzywdę. Zgłoszenie i wsparcie ofiary naprawdę pomagają.' },
  { tresc: 'Kolega prosi o hasło do Twojego konta w grze, bo „chce tylko sprawdzić, jakie masz skiny”.', odpowiedzi: ['Nie podam nikomu hasła, pokażę mu skiny na ekranie', 'Podam, to przecież kolega', 'Podam, a potem zmienię hasło'], poprawna: 0, wyjasnienie: 'Hasło jest tylko Twoje. Konto można pokazać na ekranie bez oddawania dostępu.' },
  { tresc: 'Dostajesz mail z załącznikiem „faktura.exe” od nieznanego nadawcy.', odpowiedzi: ['Otworzę, może to ważne', 'Otworzę na starym telefonie', 'Usunę wiadomość bez otwierania załącznika'], poprawna: 2, wyjasnienie: 'Pliki .exe uruchamiają programy i często są wirusami. Nieznane załączniki usuwaj.' },
  { tresc: 'Aplikacja do zdjęć każe pobrać ją spoza oficjalnego sklepu, bo „w sklepie jej nie ma”.', odpowiedzi: ['Zainstaluję z podanego linku', 'Zostanę przy oficjalnym sklepie i poszukam innej aplikacji', 'Zainstaluję i wyłączę antywirusa'], poprawna: 1, wyjasnienie: 'Aplikacje spoza oficjalnych sklepów często zawierają złośliwe oprogramowanie.' },
  { tresc: 'Zgubiłeś telefon, który nie miał blokady ekranu.', odpowiedzi: ['Zmienię hasła do ważnych kont i zablokuję telefon zdalnie', 'Poczekam kilka dni, może się znajdzie', 'Nic nie zrobię, ktoś go odda'], poprawna: 0, wyjasnienie: 'Bez blokady ktoś ma dostęp do Twoich kont. Zmień hasła i zablokuj urządzenie od razu.' },
  { tresc: 'Nieznajomy z gry prosi o numer telefonu i adres, żeby „wysłać Ci prezent”.', odpowiedzi: ['Podam numer, adres zachowam', 'Podam wszystko, to miły gest', 'Nie podam danych i powiem zaufanej dorosłej osobie'], poprawna: 2, wyjasnienie: 'Dane kontaktowe to cenne informacje. Takie prośby bywają początkiem manipulacji.' }
]);

const nowePytanie = (tresc, odpowiedzi, poprawna, wyjasnienie, od) => ({ od, tresc, odpowiedzi, poprawna, wyjasnienie });
const WIARYGODNE_PODEJRZANE = ['Wiarygodne', 'Podejrzane'];
const PODEJRZANE_WIARYGODNE = ['Podejrzane', 'Wiarygodne'];

function dodajPanelGry(id, tytul, opis, pytania) {
  dodajPanelWlasny(id, tytul, opis, kontenerGry => uruchomQuiz(kontenerGry, pytania));
}

dodajPanelGry('gra-fake-news', 'Fake news czy prawda?', 'Oceń, czy informacja wygląda na wiarygodną.', [
  nowePytanie('SZOK! Rząd zamyka wszystkie szkoły od jutra! Udostępnij, zanim to usuną!', WIARYGODNE_PODEJRZANE, 1, 'Wielkie litery, presja i brak źródła to typowe cechy fałszywych informacji. Sprawdź to na oficjalnej stronie ministerstwa.', 'Post bez źródła'),
  nowePytanie('Ministerstwo informuje o zmianie terminu egzaminu. Szczegóły są w komunikacie na stronie urzędu.', PODEJRZANE_WIARYGODNE, 1, 'Oficjalne źródło, konkretna informacja i brak nacisku na pośpiech. Tak wygląda wiarygodny komunikat.', 'Komunikat urzędu'),
  nowePytanie('Rekin pływa po ulicy w Gdyni po wczorajszej ulewie! Zdjęcie zrobione dziś rano.', WIARYGODNE_PODEJRZANE, 1, 'Takie zdjęcia są często przerobione albo stare. Wyszukaj je w wyszukiwarce obrazem i zobacz, skąd naprawdę pochodzą.', 'Zdjęcie na czacie'),
  nowePytanie('Naukowcy opublikowali badanie. Autor podaje link do pełnej publikacji i opisuje, jak je przeprowadzono.', PODEJRZANE_WIARYGODNE, 1, 'Źródło, które można sprawdzić, to dobry znak. Fałszywe informacje zwykle niczego nie da się sprawdzić.', 'Artykuł w serwisie informacyjnym'),
  nowePytanie('Lekarze ukrywają prawdę: ten domowy sposób leczy każdą chorobę. Wyślij do 10 osób, by pomóc innym!', PODEJRZANE_WIARYGODNE, 0, 'Łańcuszki i „sekretna wiedza” to klasyczny sposób rozpowszechniania fałszywych informacji. Zdrowie sprawdzaj u lekarza.', 'Łańcuszek na czacie'),
  { od: 'Nagranie wideo', tresc: 'Polityk mówi na nagraniu coś zupełnie niepodobnego do jego dotychczasowych słów, a usta poruszają się nienaturalnie.', odpowiedzi: WIARYGODNE_PODEJRZANE, poprawna: 1, wyjasnienie: 'To może być deepfake, czyli nagranie wygenerowane lub przerobione komputerowo. Sprawdź, czy opisują je wiarygodne media.' },
  { od: 'Informacja w kilku serwisach', tresc: 'Ten sam fakt opisują różne redakcje, podając nazwiska osób i źródła informacji.', odpowiedzi: WIARYGODNE_PODEJRZANE, poprawna: 0, wyjasnienie: 'Kilka niezależnych źródeł to dobry znak. Warto jednak sprawdzić, czy nie kopiują się nawzajem.' },
  { od: 'Reklama na stronie', tresc: 'Odkryto lek na starzenie! Lekarze są wściekli! Kup tylko dziś ze zniżką 70%.', odpowiedzi: PODEJRZANE_WIARYGODNE, poprawna: 0, wyjasnienie: 'Przesada, presja czasu i obietnica cudownego efektu to typowe cechy oszukańczych reklam.' },
  { od: 'Wiadomość na czacie klasowym', tresc: 'Ktoś pisze, że jutro nie ma lekcji. Wiadomość jest anonimowa i nikt nie wie, kto ją wysłał.', odpowiedzi: WIARYGODNE_PODEJRZANE, poprawna: 1, wyjasnienie: 'Anonimowa wiadomość to za mało. Zapytaj nauczyciela lub sprawdź stronę szkoły.' },
  { od: 'Wpis popularnego twórcy', tresc: 'Wpis zawiera zdjęcia z wydarzenia, link do pełnego nagrania i sprostowanie wcześniejszego błędu.', odpowiedzi: PODEJRZANE_WIARYGODNE, poprawna: 1, wyjasnienie: 'Przyznanie się do błędu i podanie źródeł pokazuje, że autor dba o prawdę.' }
]);

dodajPanelGry('gra-prywatnosc', 'Prywatność w social mediach', 'Wybierz, jak zadbać o swoje dane.', [
  nowePytanie('Chcesz wrzucić zdjęcie z wakacji. Na zdjęciu widać kod kreskowy Twojego biletu lotniczego.', ['Wrzucę, to tylko paski', 'Zasłonię kod przed publikacją', 'Wrzucę tylko dla bliskich znajomych'], 1, 'Z kodu na bilecie da się odczytać dane osobowe, a nawet zmienić rezerwację.'),
  nowePytanie('Zwykła gra w kolorowanie prosi o dostęp do Twojej lokalizacji, kontaktów i mikrofonu.', ['Odmówię dostępu, którego gra nie potrzebuje', 'Zgodzę się na wszystko, żeby działała', 'Zgodzę się, a potem o tym zapomnę'], 0, 'Aplikacja powinna mieć tylko takie uprawnienia, jakich potrzebuje do działania.'),
  nowePytanie('Masz publiczne konto, a obcy pisze, że wie, w jakiej szkole się uczysz i gdzie mieszkasz.', ['Odpiszę, że to miłe', 'Zignoruję i nic nie zmienię', 'Ustawię konto jako prywatne i zablokuję tę osobę'], 2, 'Prywatne konto ogranicza to, kto widzi Twoje posty i dane. Blokada kończy kontakt z obcym.'),
  nowePytanie('Znajomy oznaczył Cię na zdjęciu, które chcesz zachować tylko dla siebie.', ['Wrzucę jego gorsze zdjęcie w odwecie', 'Poproszę o usunięcie oznaczenia i włączę zatwierdzanie oznaczeń', 'Zostawię, już po sprawie'], 1, 'Spokojna prośba i ustawienia aplikacji zwykle wystarczą, a odwet tylko pogarsza sprawę.'),
  nowePytanie('Quiz w sieci pyta o imię Twojego pierwszego zwierzaka i ulicę, przy której dorastałeś.', ['Pominę, to częste pytania zabezpieczające do kont', 'Wypełnię, to tylko zabawa', 'Wypełnię i udostępnię znajomym'], 0, 'Takie quizy zbierają odpowiedzi, które pomagają odzyskać cudze konta. Nie podawaj ich publicznie.'),
  { tresc: 'Zakładasz konto na TikToku. Którą nazwę użytkownika wybierzesz?', odpowiedzi: ['Pełne imię, nazwisko i klasę', 'Imię i rok urodzenia', 'Pseudonim bez danych osobowych'], poprawna: 2, wyjasnienie: 'Nazwa użytkownika jest widoczna dla wszystkich. Nie zdradzaj w niej danych, po których można Cię znaleźć.' },
  { tresc: 'Na zdjęciu z domu w tle widać numer mieszkania i tabliczkę z nazwiskiem.', odpowiedzi: ['Opublikuję, to nic takiego', 'Przytnę lub zasłonię szczegóły ujawniające adres', 'Opublikuję tylko na relacji'], poprawna: 1, wyjasnienie: 'Takie szczegóły pozwalają ustalić, gdzie mieszkasz. Warto je usunąć przed publikacją.' },
  { tresc: 'Zaprasza Cię osoba, której nie znasz, ale ma kilku wspólnych znajomych.', odpowiedzi: ['Zaakceptuję, skoro ma wspólnych znajomych', 'Zapytam znajomych, czy ją znają, zanim zaakceptuję', 'Zaakceptuję i napiszę pierwszy'], poprawna: 1, wyjasnienie: 'Fałszywe profile często dodają się do znajomych znajomych. Sprawdź, zanim zaakceptujesz.' },
  { tresc: 'Masz stare konta w grach i portalach, z których nie korzystasz od lat.', odpowiedzi: ['Zostawię, nic im nie jest', 'Zmienię tylko avatar', 'Usunę nieużywane konta albo zabezpieczę je nowym hasłem'], poprawna: 2, wyjasnienie: 'Zapomniane konta mogą wyciec i posłużyć do włamania na inne.' },
  { tresc: 'Aplikacja pyta, czy może śledzić Twoją aktywność w innych aplikacjach i na stronach.', odpowiedzi: ['Odmówię, jeśli to nie jest potrzebne do działania aplikacji', 'Zgodzę się, nic się nie stanie', 'Zgodzę się, bo inaczej nie będzie działać'], poprawna: 0, wyjasnienie: 'Śledzenie zbiera dane o Tobie do reklam. Zwykle możesz odmówić i dalej korzystać z aplikacji.' }
]);

dodajPanelGry('gra-zakupy', 'Bezpieczne zakupy online', 'Sprawdź, czy rozpoznasz oszustwo przy zakupach.', [
  nowePytanie('Buty za 40 zł zamiast 400 zł. Strona ma błędy, a zapłacić można tylko przelewem na prywatne konto.', ['Kupię szybko, to okazja!', 'Odpuszczę, to typowy fałszywy sklep', 'Kupię, ale najpierw napiszę z pytaniem'], 1, 'Zbyt niska cena i płatność na prywatne konto to sygnały oszustwa.'),
  nowePytanie('Kupujący pisze, że zapłacił, i wysyła link do „odbioru pieniędzy”, gdzie trzeba podać dane karty.', ['Nie kliknę, żeby odebrać pieniądze, nie podaje się danych karty', 'Podam dane karty, to potrzebne do wpłaty', 'Podam numer bez kodu CVV'], 0, 'Żeby otrzymać pieniądze, nie podajesz danych karty. Taki link służy do kradzieży.'),
  nowePytanie('Sklep ma kłódkę w adresie strony i https. Czy to wystarczy, by mu zaufać?', ['Tak, kłódka gwarantuje uczciwość', 'Tak, jeśli strona ładnie wygląda', 'Nie, sprawdzę jeszcze opinie i dane firmy'], 2, 'Kłódka oznacza tylko szyfrowane połączenie. Oszuści też ją mają.'),
  nowePytanie('Która forma płatności za zakupy w internecie jest bezpieczniejsza?', ['Przelew na prywatne konto nieznajomego', 'Karta lub szybki przelew przez znany system płatności', 'Gotówka w kopercie wysłana pocztą'], 1, 'Znane systemy płatności dają możliwość reklamacji i zwrotu środków.'),
  nowePytanie('Dostajesz mail: „Twoja płatność została odrzucona, kliknij i zapłać ponownie” ze sklepu, w którym nic nie kupowałeś.', ['Zignoruję i usunę, bo nic tam nie kupowałem', 'Kliknę i zapłacę', 'Odpowiem z pytaniem o szczegóły'], 0, 'To phishing. Nie klikaj, jeśli nie robiłeś zamówienia.'),
  { tresc: 'Sprzedawca prosi o przedpłatę za rzadki telefon, bo „ma wielu chętnych”, i nie chce odbioru osobistego.', odpowiedzi: ['Wpłacę szybko, żeby nie przepadł', 'Zrezygnuję lub poproszę o płatność przy odbiorze', 'Wpłacę połowę kwoty'], poprawna: 1, wyjasnienie: 'Presja i brak możliwości sprawdzenia towaru to sygnały oszustwa.' },
  { tresc: 'Sklep pokazuje: „Zostały 2 sztuki, 14 osób ogląda ten produkt, oferta kończy się za 3 minuty!”.', odpowiedzi: ['Kupię natychmiast', 'Kupię dwie sztuki', 'Wstrzymam się, bo presja czasu to częsty trik sprzedażowy'], poprawna: 2, wyjasnienie: 'Odliczania i „ostatnie sztuki” często mają Cię zmusić do pośpiechu. Przemyśl zakup.' },
  { tresc: 'Dostajesz paczkę, której nie zamawiałeś, razem z fakturą do zapłaty.', odpowiedzi: ['Nie zapłacę, sprawdzę nadawcę i czy ktoś w domu nie zamawiał', 'Zapłacę, żeby mieć spokój', 'Otworzę i użyję produktu'], poprawna: 0, wyjasnienie: 'Niezamówione paczki z fakturą to znany trik. Nie płać pod presją i najpierw to wyjaśnij.' },
  { tresc: 'Mało znana witryna proponuje zapisanie danych Twojej karty „na przyszłość”.', odpowiedzi: ['Zapiszę, będzie wygodniej', 'Nie zapiszę na stronie, której nie znam', 'Zapiszę, ale wpiszę zły kod CVV'], poprawna: 1, wyjasnienie: 'Dane karty zapisuj tylko u zaufanych sprzedawców. Mało znane witryny mogą je wyciec.' },
  { tresc: 'Wszystkie opinie o sklepie są z tego samego dnia i brzmią niemal tak samo.', odpowiedzi: ['Uznam, że sklep jest świetny', 'Wystawię własną pochlebną opinię', 'Uznam opinie za podejrzane i sprawdzę inne źródła'], poprawna: 2, wyjasnienie: 'Masowe, podobne opinie są często fałszywe. Szukaj ocen na niezależnych stronach.' }
]);

dodajPanelGry('gra-cyberprzemoc', 'Stop cyberprzemocy', 'Wybierz reakcję, która naprawdę pomaga.', [
  nowePytanie('Ktoś pod Twoim filmem pisze wyzwiska.', ['Odpiszę jeszcze gorzej', 'Zrobię zrzut ekranu, zablokuję i zgłoszę komentarz', 'Usunę konto'], 1, 'Zrzut ekranu to dowód, a blokada i zgłoszenie ograniczają hejt.'),
  nowePytanie('Klasa wyśmiewa kolegę na czacie.', ['Dołączę, żeby nie być następny', 'Nic nie zrobię, to nie moja sprawa', 'Nie dołączę, wesprę kolegę i powiem dorosłemu'], 2, 'Samo dołączenie do śmiechu pogłębia krzywdę. Wsparcie jednej osoby potrafi zmienić całą sytuację.'),
  nowePytanie('Ktoś grozi, że opublikuje Twoje prywatne zdjęcia, jeśli nie zrobisz, czego żąda.', ['Powiem zaufanemu dorosłemu i zgłoszę sprawę, nie ulegając szantażowi', 'Spełnię żądanie, żeby nic nie opublikował', 'Zapłacę, żeby zniknął'], 0, 'Szantaż zwykle się nie kończy po pierwszym razie. Zgłoś go dorosłym i na policję.'),
  nowePytanie('Masz zrzut ekranu z hejtem. Co z nim zrobić?', ['Usunąć, żeby nie wracać do tego', 'Zachować jako dowód do zgłoszenia', 'Wrzucić publicznie z komentarzem'], 1, 'Dowody pomagają szkole, platformie i policji zareagować.'),
  nowePytanie('Koleżanka pisze, że ktoś jej dokucza w sieci, i prosi, żebyś nikomu nie mówił.', ['Namówię ją na rozmowę z dorosłym i pomogę to zgłosić', 'Zachowam to w tajemnicy', 'Powiem całej klasie'], 0, 'Sama sprawa rzadko się kończy. Pomoc dorosłych lub Telefon Zaufania 116 111 mogą ją naprawdę wesprzeć.'),
  { tresc: 'Znajomy pisze złośliwy komentarz o Tobie pod zdjęciem klasowym.', odpowiedzi: ['Odpiszę mu publicznie jeszcze większą złośliwością', 'Porozmawiam z nim na osobności, a jeśli nie pomoże, zgłoszę komentarz', 'Zignoruję i nikomu nie powiem'], poprawna: 1, wyjasnienie: 'Rozmowa często wystarcza, a gdy nie, zgłoszenie jest właściwym krokiem. Odwet tylko nakręca konflikt.' },
  { tresc: 'Ktoś założył fałszywe konto z Twoim imieniem i zdjęciami.', odpowiedzi: ['Zgłoszę fałszywe konto platformie i powiem dorosłemu', 'Założę fałszywe konto jemu', 'Poczekam, aż samo zniknie'], poprawna: 0, wyjasnienie: 'Platformy usuwają fałszywe profile po zgłoszeniu. Dorosły pomoże dopilnować sprawy.' },
  { tresc: 'Widzisz, że koledzy podają dalej ośmieszające nagranie jednego z klasy.', odpowiedzi: ['Podam dalej, bo wszyscy to robią', 'Skomentuję śmiejącą się emotką', 'Nie udostępnię, zgłoszę nagranie i napiszę do kolegi, że ma wsparcie'], poprawna: 2, wyjasnienie: 'Każde udostępnienie powiększa krzywdę. Wsparcie i zgłoszenie pomagają ofierze.' },
  { tresc: 'Po hejcie w sieci czujesz się źle i nie masz ochoty iść do szkoły.', odpowiedzi: ['Porozmawiam z zaufaną osobą albo zadzwonię na Telefon Zaufania 116 111', 'Zatrzymam to dla siebie, żeby nie robić problemu', 'Odetnę się od wszystkich'], poprawna: 0, wyjasnienie: 'Nie musisz sobie z tym radzić sam. Rozmowa z kimś zaufanym naprawdę pomaga.' },
  { tresc: 'Ktoś wyśmiewa Cię w grze online na czacie głosowym.', odpowiedzi: ['Będę na niego krzyczeć', 'Zagram dalej, bez zgłaszania', 'Wyciszę gracza, zgłoszę go w grze i zapiszę jego nick'], poprawna: 2, wyjasnienie: 'Wyciszenie i zgłoszenie to najskuteczniejsza reakcja. Nie nagradzaj zaczepiającego uwagą.' }
]);

dodajPanelGry('gra-wifi', 'Publiczne Wi-Fi', 'Sprawdź, jak korzystać z darmowego internetu bez ryzyka.', [
  nowePytanie('W kawiarni widzisz sieci „Kawiarnia_WiFi” i „Kawiarnia_Free_WiFi”. Którą wybierzesz?', ['Którąkolwiek, obie są darmowe', 'Zapytam obsługę, jak nazywa się ich sieć', 'Tę z mocniejszym sygnałem'], 1, 'Oszuści tworzą sieci o podobnych nazwach, żeby podsłuchiwać ruch.'),
  nowePytanie('Na publicznym Wi-Fi chcesz zalogować się do poczty.', ['Poczekam i użyję danych z telefonu lub VPN-a', 'Zalogują się, to tylko poczta', 'Zalogują się w trybie incognito'], 0, 'Poczta daje dostęp do wielu kont. Tryb incognito nie chroni połączenia.'),
  nowePytanie('Sieć na lotnisku prosi o adres e-mail, numer telefonu i numer dowodu.', ['Podam wszystko, to lotnisko', 'Podam fałszywe imię i prawdziwy dowód', 'Nie podam dowodu ani wrażliwych danych'], 2, 'Darmowy internet nie wymaga numeru dowodu. Ogranicz podawane dane do niezbędnego minimum.'),
  nowePytanie('Telefon sam łączy się z każdą znaną nazwą sieci. Co warto zrobić?', ['Zostawić automatyczne łączenie', 'Wyłączyć automatyczne łączenie z otwartymi sieciami', 'Włączyć Bluetooth'], 1, 'Automatyczne łączenie może połączyć Cię z fałszywą siecią bez Twojej wiedzy.'),
  nowePytanie('Publiczna sieć mówi, że musisz pobrać „aktualizację” przeglądarki, żeby wejść do internetu.', ['Nie pobiorę, aktualizacje robię tylko w ustawieniach lub sklepie', 'Pobiorę, bez tego nie wejdę', 'Pobiorę i zeskanuję antywirusem'], 0, 'To częsty sposób na podrzucenie złośliwego oprogramowania. Aktualizuj tylko z oficjalnych źródeł.'),
  { tresc: 'W hotelu Wi-Fi nie ma hasła, a przeglądarka ostrzega, że połączenie nie jest szyfrowane.', odpowiedzi: ['Zignoruję ostrzeżenie', 'Nie podam żadnych haseł i skorzystam z internetu z telefonu', 'Wyłączę ostrzeżenia w przeglądarce'], poprawna: 1, wyjasnienie: 'To ostrzeżenie oznacza, że dane mogą być podglądane. Nie loguj się nigdzie w takiej sieci.' },
  { tresc: 'Skończyłeś korzystać z publicznego Wi-Fi.', odpowiedzi: ['Rozłączę się i usunę tę sieć z zapamiętanych', 'Zostawię połączenie, może się przyda', 'Wyłączę telefon'], poprawna: 0, wyjasnienie: 'Zapamiętana sieć może łączyć się sama, także z fałszywą o tej samej nazwie.' },
  { tresc: 'Do czego służy VPN w publicznej sieci Wi-Fi?', odpowiedzi: ['Przyspiesza internet', 'Zastępuje antywirusa', 'Szyfruje Twój ruch, co utrudnia jego podsłuchanie'], poprawna: 2, wyjasnienie: 'VPN utrudnia podsłuch, ale nie chroni przed phishingiem. Wybieraj zaufanych dostawców.' },
  { tresc: 'Na dworcu pojawia się sieć „Free_Internet_Bez_Hasla”, choć zwykle nie ma tam darmowego Wi-Fi.', odpowiedzi: ['Połączę się, bo szybko', 'Nie połączę się, to może być fałszywy hotspot', 'Połączę się tylko na chwilę'], poprawna: 1, wyjasnienie: 'Fałszywe hotspoty służą do podsłuchiwania ruchu. Nawet krótkie połączenie bywa ryzykowne.' },
  { tresc: 'Wi-Fi w kawiarni ma hasło napisane na kartce przy kasie. Czy to w pełni bezpieczne?', odpowiedzi: ['Nie, hasło znają wszyscy, więc ruch może być podglądany', 'Tak, bo hasło szyfruje wszystko', 'Tak, ale tylko w ciągu dnia'], poprawna: 0, wyjasnienie: 'Wspólne hasło nie gwarantuje prywatności. Ważne dane lepiej przesyłać z własnego internetu.' }
]);

dodajPanelGry('gra-dwuetapowe', 'Logowanie dwuetapowe', 'Sprawdź, czy wiesz, jak działa druga warstwa ochrony.', [
  nowePytanie('Czym jest logowanie dwuetapowe?', ['Hasłem i drugim składnikiem, np. kodem z aplikacji', 'Dwukrotnym wpisaniem tego samego hasła', 'Logowaniem na dwóch urządzeniach jednocześnie'], 0, 'Drugi składnik sprawia, że samo hasło nie wystarczy do włamania.'),
  nowePytanie('Dostajesz SMS z kodem logowania, chociaż nikt z Twojej strony się nie loguje.', ['Zignoruję, nic się nie stało', 'Zmienię hasło i sprawdzę, kto próbował się zalogować', 'Odpiszę nadawcy'], 1, 'Ktoś najpewniej zna Twoje hasło. Zmień je od razu.'),
  nowePytanie('Ktoś dzwoni jako „bank” i prosi o kod z SMS, bo „zabezpiecza konto”.', ['Podam, to bank', 'Podam połowę kodu', 'Rozłączę się i zadzwonię na oficjalny numer banku'], 2, 'Bank nigdy nie prosi o kod z SMS przez telefon.'),
  nowePytanie('Który drugi składnik jest bezpieczniejszy?', ['Pytanie o imię psa', 'Kod z aplikacji uwierzytelniającej lub klucz sprzętowy', 'Drugie hasło podobne do pierwszego'], 1, 'Aplikacje i klucze są trudniejsze do przechwycenia niż SMS lub odpowiedź na pytanie.'),
  nowePytanie('Masz włączone logowanie dwuetapowe, ale ktoś poznał hasło. Czy jesteś bezpieczny?', ['Dużo bardziej, ale i tak zmienię hasło', 'Tak, hasło nie ma już znaczenia', 'Nie, dwa etapy nic nie dają'], 0, 'Drugi składnik zatrzyma większość włamań, ale ujawnione hasło trzeba zmienić.'),
  { tresc: 'Zgubiłeś telefon z aplikacją generującą kody logowania.', odpowiedzi: ['Nic, nikt go nie otworzy', 'Użyję kodów zapasowych, odetnę stary telefon i zmienię hasła', 'Poczekam kilka tygodni'], poprawna: 1, wyjasnienie: 'Kody zapasowe pozwalają odzyskać dostęp. Zmień hasła, żeby zabezpieczyć konta.' },
  { tresc: 'Po włączeniu 2FA aplikacja pokazuje kody zapasowe.', odpowiedzi: ['Zapiszę je w bezpiecznym miejscu, niedostępnym dla innych', 'Wyślę je sobie na czat', 'Zignoruję, nie będą mi potrzebne'], poprawna: 0, wyjasnienie: 'Kody zapasowe są kluczem do konta, gdy zgubisz telefon. Trzymaj je w tajemnicy.' },
  { tresc: 'Dostajesz wiadomość: „Aby odzyskać konto, podaj kod, który właśnie wysłaliśmy”.', odpowiedzi: ['Podam kod, to wsparcie', 'Podam część kodu', 'Nie podam nikomu, to może być próba przejęcia konta'], poprawna: 2, wyjasnienie: 'Kod, którego nie zamawiałeś, to znak, że ktoś próbuje się włamać. Nikomu go nie podawaj.' },
  { tresc: 'Gdzie warto włączyć logowanie dwuetapowe w pierwszej kolejności?', odpowiedzi: ['Tylko w grach', 'W poczcie e-mail i bankowości', 'Nigdzie, to utrudnia życie'], poprawna: 1, wyjasnienie: 'Przez pocztę resetuje się hasła do innych kont, więc jej ochrona jest najważniejsza.' },
  { tresc: 'Aplikacja pyta, czy ufać urządzeniu przez 30 dni. Jesteś na szkolnym komputerze.', odpowiedzi: ['Nie zaznaczę na wspólnym komputerze i wyloguję się po pracy', 'Zaznaczę, będzie szybciej', 'Zapiszę hasło w przeglądarce'], poprawna: 0, wyjasnienie: 'Na cudzym lub wspólnym sprzęcie nie zapamiętuj logowania. Zawsze się wyloguj.' }
]);

dodajPanelGry('gra-gry-online', 'Bezpieczeństwo w grach online', 'Sprawdź, jak chronić swoje konto i siebie podczas grania.', [
  nowePytanie('Ktoś w grze proponuje wymianę przedmiotów, ale chce, żebyś wysłał swój przedmiot pierwszy.', ['Wyślę pierwszy, ufam mu', 'Użyję oficjalnej wymiany w grze, a nie zaufania na słowo', 'Poproszę o dodatkowy przedmiot w gratisie'], 1, 'Oficjalne systemy wymiany zabezpieczają obie strony. Wysłanie przedmiotu pierwszy często kończy się oszustwem.'),
  nowePytanie('Znajomy z drużyny wysyła plik „mod_do_gry.exe”, który ma dać przewagę nad innymi.', ['Nie uruchomię, takie pliki często zawierają wirusy', 'Uruchomię, to przecież znajomy', 'Uruchomię na szkolnym komputerze'], 0, 'Mody i cheaty z nieoficjalnych źródeł często kradną hasła. Konto znajomego też mogło zostać przejęte.'),
  nowePytanie('Gracz pisze, że jest pracownikiem firmy gry, i prosi o hasło, żeby „zweryfikować konto”.', ['Podam, to pracownik', 'Poproszę o dowód osobisty', 'Nie podam, prawdziwa obsługa nigdy nie prosi o hasło'], 2, 'Prawdziwa obsługa gry nigdy nie prosi o hasło. Takie wiadomości to próba przejęcia konta.'),
  nowePytanie('W grze są „skrzynki z losowymi nagrodami”. Co jest największym ryzykiem?', ['Mogą zachęcać do wydawania pieniędzy w nadziei na rzadką nagrodę', 'Nie ma żadnego ryzyka', 'Skrzynki są zawsze opłacalne'], 0, 'Losowe nagrody działają podobnie do hazardu. Ustal limit wydatków i nie używaj karty bez wiedzy rodzica.'),
  nowePytanie('Na czacie głosowym ktoś zaczyna Cię wyzywać i prosi o numer telefonu.', ['Podam numer, żeby się dogadać', 'Wyciszę gracza, zgłoszę go i nie podam numeru', 'Odpiszę mu wyzwiskami'], 1, 'Wyciszenie i zgłoszenie to najlepsza reakcja. Numeru telefonu nie podajemy obcym.'),
  nowePytanie('Nieznane konto w komentarzu pod streamem wrzuca link do „losowania nagród” i prosi o zalogowanie się.', ['Wejdę, to na pewno streamer', 'Podam tylko login', 'Sprawdzę na oficjalnym kanale streamera, czy taki konkurs jest'], 2, 'Oszuści podszywają się pod streamerów. Informacje o konkursach sprawdzaj tylko na oficjalnych kanałach.'),
  nowePytanie('Zewnętrzna strona oferuje walutę w grze za połowę ceny.', ['Kupię, to oszczędność', 'Kupię tylko w oficjalnym sklepie gry', 'Kupię kartą rodzica'], 1, 'Taka waluta bywa kupiona skradzionymi kartami, a konto może dostać bana lub zostać przejęte.'),
  nowePytanie('Konto w grze zostało zalogowane z innego kraju.', ['Zmienię hasło, włączę logowanie dwuetapowe i zgłoszę sprawę obsłudze', 'Poczekam, może samo przejdzie', 'Podam hasło znajomemu, żeby sprawdził'], 0, 'Szybka zmiana hasła i dwuetapowe logowanie ograniczają szkody. Obsługa gry pomoże odzyskać konto.'),
  nowePytanie('Admin „prywatnego serwera” prosi o zdjęcie dowodu, żeby potwierdzić Twój wiek.', ['Wyślę zdjęcie dowodu', 'Nie wyślę, prawdziwa weryfikacja nie odbywa się na prywatnym czacie', 'Wyślę tylko połowę dokumentu'], 1, 'Zdjęcia dokumentów nigdy nie wysyłamy na czat. To ułatwia kradzież tożsamości.'),
  nowePytanie('Zauważasz, że grasz po nocach i jesteś coraz bardziej zmęczony.', ['Zignoruję zmęczenie', 'Będę grał dłużej, aż się przyzwyczaję', 'Ustalę limit i przerwy, a gdy trudno, porozmawiam z dorosłym'], 2, 'Sen i odpoczynek są ważne. Jeśli trudno Ci przestać grać, porozmawiaj o tym z zaufaną osobą.')
]);


function dodajPanelWlasny(id, tytul, opis, uruchom) {
  const panel = stworz('div');
  panel.id = id;
  panel.hidden = true;
  const kontenerGry = stworz('div');
  panel.append(stworz('h2', '', tytul), stworz('p', '', opis), kontenerGry);
  pobierz('panel-gry').insertBefore(panel, pobierz('wroc-do-wyboru'));
  uruchom(kontenerGry);
}

function uruchomSkrzynke(kontener) {
  const maile = [
    { nadawca: 'Dysk online', adres: 'powiadomienie@dysk-udostepnianie.top', temat: 'Udostępniono Ci dokument: „Zmiana regulaminu praktyk”', tresc: 'Ktoś udostępnił Ci plik. Aby go zobaczyć, zaloguj się swoim kontem.', link: { tekst: 'Wyświetl dokument', adres: 'http://dysk-docs.login-weryfikacja.top/doc' }, oszustwo: true, wskazowki: ['Nieznany nadawca i dziwna domena nadawcy', 'Link prowadzi do zupełnie innej strony niż nazwa usługi', 'Prośba o zalogowanie się przez link z wiadomości'] },
    { nadawca: 'Dziennik szkolny', adres: 'no-reply@dziennik-szkola12.edu.pl', temat: 'Nowa ocena z matematyki', tresc: 'W dzienniku pojawiła się nowa ocena. Zaloguj się w dzienniku z zakładki w przeglądarce, tak jak zawsze.', link: null, oszustwo: false, wskazowki: ['Brak linku i brak presji', 'Wiadomość odsyła do Twojej własnej zakładki', 'Domena nadawcy zgadza się ze szkolną'] },
    { nadawca: 'BankPrzykład', adres: 'bezpieczenstwo@bank-przyklad.centrum-pomocy.xyz', temat: 'PILNE: Twoje konto zostanie zablokowane', tresc: 'Wykryliśmy podejrzane logowanie. Potwierdź dane w ciągu 30 minut, inaczej konto zostanie zablokowane.', link: { tekst: 'Potwierdź dane teraz', adres: 'https://bank-przyklad.centrum-pomocy.xyz/logowanie' }, oszustwo: true, wskazowki: ['Presja czasu i groźba blokady', 'Prawdziwa domena nadawcy to centrum-pomocy.xyz, a nie bank-przyklad', 'Banki nie proszą o potwierdzanie danych przez link w mailu'] },
    { nadawca: 'Ola z klasy', adres: 'ola.kowalska@poczta-przyklad.pl', temat: 'Notatki z biologii', tresc: 'Cześć! Wrzuciłam notatki z biologii na nasz wspólny dysk klasy, jak zawsze. Powodzenia na sprawdzianie!', link: null, oszustwo: false, wskazowki: ['Znajoma osoba i zwykły styl wiadomości', 'Brak linku i prośby o dane', 'Odnosi się do wspólnego miejsca, które znasz'] },
    { nadawca: 'Kurier Ekspres', adres: 'info@kurier-dostawa.paczka-oplata.click', temat: 'Paczka czeka. Dopłata 2,99 zł', tresc: 'Nie udało się dostarczyć paczki. Dopłać 2,99 zł, inaczej wróci do nadawcy.', link: { tekst: 'Dopłać teraz', adres: 'http://paczka-oplata.click/platnosc' }, oszustwo: true, wskazowki: ['Drobna dopłata to przynęta na dane karty', 'Domena paczka-oplata.click nie należy do żadnego kuriera', 'Nie wiesz nawet, czy na jakąś paczkę czekasz'] },
    { nadawca: 'Serwis muzyczny', adres: 'info@muzyka-przyklad.pl', temat: 'Zmiany w regulaminie od 1 listopada', tresc: 'Informujemy o zmianach w regulaminie od 1 listopada. Nie musisz nic robić.', link: { tekst: 'Zobacz zmiany', adres: 'https://muzyka-przyklad.pl/regulamin' }, oszustwo: false, wskazowki: ['Link prowadzi do tej samej domeny, z której przyszedł mail', 'Nie wymaga danych ani pilnych działań', 'Spokojny ton bez presji czasu'] },
    { nadawca: 'Konkurs Koncert', adres: 'wygrana@koncert-konkurs.win', temat: 'Gratulacje! Wygrałeś dwa bilety na koncert', tresc: 'Aby odebrać bilety, wpisz dane karty i pokryj koszt wysyłki 1 zł.', link: { tekst: 'Odbierz nagrodę', adres: 'http://koncert-konkurs.win/nagroda' }, oszustwo: true, wskazowki: ['Nagroda w konkursie, w którym nie brałeś udziału', 'Prośba o dane karty za „koszt wysyłki”', 'Podejrzana domena .win'] },
    { nadawca: 'Sklep internetowy', adres: 'zamowienia@sklep-przyklad.pl', temat: 'Potwierdzenie zamówienia nr 4821', tresc: 'Dziękujemy za zakupy! Status zamówienia sprawdzisz w swoim koncie na stronie sklepu.', link: null, oszustwo: false, wskazowki: ['Zamówienie faktycznie złożyłeś', 'Brak linku i prośby o dane', 'Adres nadawcy pasuje do nazwy sklepu'] }
  ];
  const decyzje = maile.map(() => null);
  const odslonieteAdresy = {};
  let wybrany = 0, pomylki = 0;
  const poprawnaDecyzja = mail => mail.oszustwo ? 'oszustwo' : 'bezpieczna';

  const rysuj = () => {
    kontener.replaceChildren();
    const sprawdzone = decyzje.filter(d => d !== null).length;
    kontener.append(stworz('p', 'numer-pytania', 'Sprawdzone: ' + sprawdzone + ' z ' + maile.length + ' · Pomyłki: ' + pomylki));
    const uklad = stworz('div', 'skrzynka');
    const lista = stworz('div', 'lista-maili');
    maile.forEach((mail, i) => {
      const pozycja = stworz('button', 'pozycja-maila' + (i === wybrany ? ' wybrana' : ''));
      const znacznik = decyzje[i] === null ? '' : decyzje[i] === poprawnaDecyzja(mail) ? '✓ ' : '✗ ';
      pozycja.append(stworz('b', '', znacznik + mail.nadawca), stworz('span', '', mail.temat));
      pozycja.onclick = () => { wybrany = i; rysuj(); };
      lista.append(pozycja);
    });

    const mail = maile[wybrany];
    const podglad = stworz('div', 'podglad-maila');
    podglad.append(stworz('h3', '', mail.temat), stworz('p', 'adres-nadawcy', 'Od: ' + mail.nadawca + ' <' + mail.adres + '>'), stworz('p', '', mail.tresc));
    if (mail.link) {
      const przyciskLinku = stworz('button', 'link-w-mailu', mail.link.tekst);
      przyciskLinku.onclick = () => { odslonieteAdresy[wybrany] = true; rysuj(); };
      podglad.append(przyciskLinku);
      podglad.append(odslonieteAdresy[wybrany]
        ? stworz('p', 'adres-linku', 'Link prowadzi do: ' + mail.link.adres)
        : stworz('p', 'podpowiedz-linku', 'Kliknij link, żeby sprawdzić, dokąd prowadzi. Nic się nie otworzy.'));
    }

    const decyzja = decyzje[wybrany];
    if (decyzja === null) {
      const przyciski = stworz('div', 'przyciski-w-rzedzie');
      const wybierz = wartosc => () => {
        decyzje[wybrany] = wartosc;
        if (wartosc !== poprawnaDecyzja(mail)) pomylki++;
        rysuj();
      };
      const bezpieczna = stworz('button', 'przycisk', 'Bezpieczna');
      const oszustwo = stworz('button', 'przycisk przycisk-kontur', 'To oszustwo');
      bezpieczna.onclick = wybierz('bezpieczna');
      oszustwo.onclick = wybierz('oszustwo');
      przyciski.append(bezpieczna, oszustwo);
      podglad.append(przyciski);
    } else {
      const trafnie = decyzja === poprawnaDecyzja(mail);
      const opis = stworz('p', 'komentarz ' + (trafnie ? 'dobrze' : 'zle'), (trafnie ? 'Dobrze! ' : 'Pomyłka. ') + (mail.oszustwo ? 'To było oszustwo.' : 'Ta wiadomość była bezpieczna.'));
      opis.style.marginTop = '16px';
      const wskazowki = stworz('ul', 'wskazowki');
      mail.wskazowki.forEach(tekst => wskazowki.append(stworz('li', '', tekst)));
      podglad.append(opis, stworz('b', '', 'Na co zwrócić uwagę:'), wskazowki);
      const nastepny = decyzje.findIndex(d => d === null);
      if (nastepny !== -1) {
        const dalej = stworz('button', 'przycisk', 'Następna wiadomość');
        dalej.onclick = () => { wybrany = nastepny; rysuj(); };
        podglad.append(dalej);
      }
    }
    uklad.append(lista, podglad);
    kontener.append(uklad);
    if (sprawdzone === maile.length) {
      kontener.append(stworz('p', 'wynik-gry', 'Skrzynka przejrzana. Pomyłki: ' + pomylki + ' z ' + maile.length + '.'));
    }
  };
  rysuj();
}

function uruchomBanke(kontener) {
  const LICZBA_RUND = 6;
  const tematy = [
    { nazwa: 'Gry komputerowe', potwierdzajace: 'Gry rozwijają refleks i pracę w zespole. Grajcie codziennie, nic złego Wam się nie stanie!', inne: 'Zbyt długie granie męczy oczy i pogarsza sen. Zobacz, co radzą lekarze.', wywazone: 'Badacze: gry mogą pomagać i szkodzić, wszystko zależy od czasu i rodzaju gry.' },
    { nazwa: 'Media społecznościowe', potwierdzajace: 'Social media to najlepszy sposób na kontakt ze światem. Nie mają żadnych złych stron!', inne: 'Niekończące się przewijanie psuje koncentrację i nastrój. Jak to zauważyć?', wywazone: 'Jak ustawić limit czasu w aplikacjach i korzystać z social mediów z głową.' },
    { nazwa: 'Sztuczna inteligencja w szkole', potwierdzajace: 'Sztuczna inteligencja odrobi za Ciebie wszystko. Po co się uczyć?', inne: 'Nauczyciele: bez własnego myślenia nie ocenisz, czy sztuczna inteligencja się nie myli.', wywazone: 'Sztuczna inteligencja może pomagać w nauce, ale jej odpowiedzi trzeba sprawdzać.' },
    { nazwa: 'Influencerzy i reklamy', potwierdzajace: 'Ten influencer poleca produkt, więc na pewno jest świetny. Kupuj od razu!', inne: 'Wiele poleceń to płatne reklamy. Sprawdź oznaczenia współpracy.', wywazone: 'Jak odróżnić szczerą rekomendację od reklamy: trzy proste pytania.' },
    { nazwa: 'Muzyka', potwierdzajace: 'Tylko ten gatunek to prawdziwa muzyka, reszta to śmieci.', inne: 'Odkryj gatunki, o których nie miałeś pojęcia. Dla każdego coś ciekawego.', wywazone: 'Jak algorytm dobiera Ci muzykę i jak wyprowadzić go z rutyny.' }
  ];
  const efekty = {
    potwierdzajace: { roznorodnosc: -12, personalizacja: 15, otwartosc: -8 },
    inne: { roznorodnosc: 12, personalizacja: -5, otwartosc: 10 },
    wywazone: { roznorodnosc: 8, personalizacja: -3, otwartosc: 6 }
  };
  const etykiety = { potwierdzajace: 'Potwierdza to, co już wiesz', inne: 'Inne spojrzenie', wywazone: 'Wyważone źródło' };
  const opisyEfektow = {
    potwierdzajace: 'Algorytm widzi, że lubisz takie treści, więc pokaże Ci więcej podobnych.',
    inne: 'Algorytm zauważył Twoją ciekawość i poszerza strumień o nowe spojrzenia.',
    wywazone: 'Wyważone źródło dodaje do strumienia więcej różnych punktów widzenia.'
  };
  const stan = { roznorodnosc: 50, personalizacja: 20, otwartosc: 50 };
  let runda = 0, karty = null, wybranaKarta = null, komentarz = '';

  const ogranicz = wartosc => Math.max(0, Math.min(100, wartosc));
  const zastosuj = zmiany => Object.keys(zmiany).forEach(klucz => { stan[klucz] = ogranicz(stan[klucz] + zmiany[klucz]); });
  const poziomBanki = () => Math.round(stan.personalizacja * 0.6 + (100 - stan.roznorodnosc) * 0.4);
  const losujKarty = () => {
    const ilePotwierdzajacych = stan.personalizacja < 30 ? 1 : stan.personalizacja < 60 ? 2 : 3;
    const rodzaje = [];
    for (let i = 0; i < 3; i++) rodzaje.push(i < ilePotwierdzajacych ? 'potwierdzajace' : (i % 2 ? 'wywazone' : 'inne'));
    rodzaje.sort(() => Math.random() - .5);
    return rodzaje.map((rodzaj, i) => ({ rodzaj, temat: tematy[(runda + i) % tematy.length] }));
  };
  const miernik = (nazwa, wartosc) => {
    const pole = stworz('div', 'miernik');
    const pasek = stworz('div');
    const wypelnienie = stworz('i');
    wypelnienie.style.width = wartosc + '%';
    pasek.append(wypelnienie);
    pole.append(stworz('b', '', nazwa + ': ' + wartosc + '%'), pasek);
    return pole;
  };
  const nastepnaRunda = () => { runda++; karty = null; wybranaKarta = null; };

  const rysuj = () => {
    kontener.replaceChildren();
    const mierniki = stworz('div', 'mierniki');
    mierniki.append(miernik('Różnorodność', stan.roznorodnosc), miernik('Personalizacja', stan.personalizacja), miernik('Otwartość', stan.otwartosc), miernik('Poziom bańki', poziomBanki()));
    kontener.append(mierniki);

    if (runda >= LICZBA_RUND) {
      const poziom = poziomBanki();
      const wynik = poziom < 35 ? 'Szeroki strumień' : poziom < 65 ? 'Bańka w budowie' : 'Zamknięta bańka';
      const opis = poziom < 35
        ? 'Wybierałeś różne spojrzenia i wyważone źródła, więc algorytm pokazywał Maksowi szeroki obraz świata.'
        : poziom < 65
          ? 'Algorytm zaczął dopasowywać treści do tego, co już lubisz. Co jakiś czas szukaj czegoś spoza swoich zainteresowań.'
          : 'Wybierałeś głównie to, co potwierdza dotychczasowe zdanie, więc algorytm pokazywał coraz mniej innych poglądów. Szukaj sam i porównuj źródła.';
      const odnowa = stworz('button', 'przycisk', 'Zagraj jeszcze raz');
      odnowa.onclick = () => uruchomBanke(kontener);
      kontener.append(stworz('p', 'wynik-gry', wynik), stworz('p', '', opis), odnowa);
      return;
    }

    kontener.append(stworz('p', 'numer-pytania', 'Strumień Maksa, 15 lat · runda ' + (runda + 1) + ' z ' + LICZBA_RUND));
    if (komentarz) kontener.append(stworz('p', 'komentarz dobrze', komentarz));
    if (!karty) karty = losujKarty();
    const lista = stworz('div', 'karty-postow');
    karty.forEach((karta, i) => {
      const przycisk = stworz('button', 'karta-posta');
      przycisk.append(stworz('small', '', karta.temat.nazwa), stworz('span', '', karta.temat[karta.rodzaj]));
      if (wybranaKarta !== null) {
        przycisk.disabled = true;
        przycisk.append(stworz('small', 'etykieta-posta', etykiety[karta.rodzaj]));
        if (i === wybranaKarta) przycisk.classList.add('wybrany');
      } else {
        przycisk.onclick = () => { wybranaKarta = i; zastosuj(efekty[karta.rodzaj]); komentarz = opisyEfektow[karta.rodzaj]; rysuj(); };
      }
      lista.append(przycisk);
    });
    kontener.append(lista);

    const przyciski = stworz('div', 'przyciski-w-rzedzie');
    if (wybranaKarta !== null) {
      const dalej = stworz('button', 'przycisk', 'Dalej');
      dalej.onclick = () => { nastepnaRunda(); komentarz = ''; rysuj(); };
      przyciski.append(dalej);
    } else {
      const szukajSam = stworz('button', 'przycisk przycisk-kontur', 'Wyszukaj coś sam');
      szukajSam.onclick = () => { zastosuj({ roznorodnosc: 15, personalizacja: -15, otwartosc: 10 }); nastepnaRunda(); komentarz = 'Samodzielne szukanie przełamuje algorytm i wprowadza nowe tematy.'; rysuj(); };
      przyciski.append(szukajSam);
    }
    kontener.append(przyciski);
  };
  rysuj();
}

function uruchomRozmowe(kontener) {
  const wezly = {
    start: { tekst: 'Siema! Fajnie grasz. Chcesz za darmo 1000 monet w grze? Mam generator.', opcje: [
      { tekst: 'Jasne, jak to zrobić?', ocena: 'zle', komentarz: 'Darmowe waluty od obcych to częsta przynęta. Lepiej od razu się zatrzymać.', dalej: 'link' },
      { tekst: 'Nie, dzięki. Nie biorę rzeczy od obcych.', ocena: 'dobrze', komentarz: 'Dobra decyzja. Nieznajomy nie ma powodu rozdawać Ci nagród.', dalej: 'haslo' }
    ] },
    link: { tekst: 'Wejdź na gra-monety.top i zaloguj się swoim kontem z gry. Zajmie minutę.', opcje: [
      { tekst: 'Kliknę i się zalogują.', ocena: 'zle', komentarz: 'To podróbka strony logowania. Oddajesz swój login i hasło.', dalej: 'koniecZle' },
      { tekst: 'To dziwny adres. Nie loguję się przez cudze linki.', ocena: 'dobrze', komentarz: 'Fałszywe strony wyglądają jak prawdziwe. Adres naprawdę ma znaczenie.', dalej: 'haslo' }
    ] },
    haslo: { tekst: 'No weź, nie bądź taki. Podaj chociaż mail i hasło, ja dodam monety sam. Jestem znajomym Twojego kolegi.', opcje: [
      { tekst: 'Dobra, podam mail, ale bez hasła.', ocena: 'zle', komentarz: 'Adres e-mail też jest cenny. Można go użyć do wysyłania oszukańczych wiadomości.', dalej: 'wiek' },
      { tekst: 'Nie. Hasło jest tylko moje.', ocena: 'dobrze', komentarz: 'Hasła nie podajesz nikomu, nawet jeśli ktoś twierdzi, że zna Twoich znajomych.', dalej: 'zdjecie' }
    ] },
    wiek: { tekst: 'Super! A ile masz lat i gdzie mieszkasz? Mogę Ci coś wysłać w prezencie.', opcje: [
      { tekst: 'Mam 14 lat, mieszkam w Gdyni.', ocena: 'zle', komentarz: 'Wiek i miejscowość to dane osobowe. Nieznajomym ich nie podajemy.', dalej: 'koniecZle' },
      { tekst: 'Tego Ci nie powiem.', ocena: 'dobrze', komentarz: 'Dobrze. Prywatnych informacji nie zdradzasz obcym.', dalej: 'zdjecie' }
    ] },
    zdjecie: { tekst: 'Eh, nudny jesteś. To wyślij chociaż zdjęcie, jak wyglądasz.', opcje: [
      { tekst: 'Dobra, wyślę.', ocena: 'zle', komentarz: 'Prośba obcego o zdjęcie to sygnał alarmowy. Takiej prośby nie spełniamy.', dalej: 'koniecZle' },
      { tekst: 'Blokuję Cię i zgłaszam w grze.', ocena: 'dobrze', komentarz: 'Blokada i zgłoszenie to dobra reakcja.', dalej: 'koniecDobry' },
      { tekst: 'Powiem rodzicom i Cię zablokuję.', ocena: 'dobrze', komentarz: 'Rozmowa z zaufaną dorosłą osobą to najlepszy krok.', dalej: 'koniecDobry' }
    ] },
    koniecZle: { koniec: 'zle', tekst: 'Rozmowa zakończyła się źle: obcy zdobył część Twoich danych. Zmień hasła, zablokuj rozmówcę, zgłoś go w grze i powiedz zaufanej dorosłej osobie. Spróbuj jeszcze raz!' },
    koniecDobry: { koniec: 'dobrze', tekst: 'Świetnie! Zablokowałeś rozmówcę i zadbałeś o swoje bezpieczeństwo. Jeśli kiedyś po takiej rozmowie poczujesz się źle, zadzwoń na Telefon Zaufania 116 111.' }
  };
  const historia = [{ kto: 'obcy', tekst: wezly.start.tekst }];
  let idWezla = 'start';

  const rysuj = () => {
    kontener.replaceChildren();
    const okno = stworz('div', 'czat');
    historia.forEach(wpis => {
      if (wpis.kto === 'uwaga') {
        okno.append(stworz('p', 'uwaga-czatu ' + wpis.ocena, wpis.tekst));
      } else {
        const dymek = stworz('div', 'dymek ' + wpis.kto);
        if (wpis.kto === 'obcy') dymek.append(stworz('b', '', 'Kuba_PRO'));
        dymek.append(stworz('span', '', wpis.tekst));
        okno.append(dymek);
      }
    });
    kontener.append(okno);
    const wezel = wezly[idWezla];
    if (wezel.koniec) {
      const odnowa = stworz('button', 'przycisk', 'Zagraj jeszcze raz');
      odnowa.onclick = () => uruchomRozmowe(kontener);
      kontener.append(odnowa);
      return;
    }
    const odpowiedzi = stworz('div', 'odpowiedzi');
    wezel.opcje.forEach(opcja => {
      const przycisk = stworz('button', 'odpowiedz', opcja.tekst);
      przycisk.onclick = () => {
        historia.push({ kto: 'ty', tekst: opcja.tekst }, { kto: 'uwaga', ocena: opcja.ocena, tekst: opcja.komentarz });
        idWezla = opcja.dalej;
        const nowy = wezly[idWezla];
        historia.push(nowy.koniec ? { kto: 'uwaga', ocena: nowy.koniec, tekst: nowy.tekst } : { kto: 'obcy', tekst: nowy.tekst });
        rysuj();
      };
      odpowiedzi.append(przycisk);
    });
    kontener.append(odpowiedzi);
  };
  rysuj();
}

dodajPanelWlasny('gra-skrzynka', 'Skrzynka: nie kliknij!', 'Oceń każdą wiadomość: bezpieczna czy oszustwo. Zanim zdecydujesz, możesz sprawdzić, dokąd prowadzi link.', uruchomSkrzynke);
dodajPanelWlasny('gra-banka', 'Bańka informacyjna', 'Wybieraj treści w strumieniu Maksa i obserwuj, jak algorytm zawęża to, co widzi. Spróbuj utrzymać szeroki obraz świata.', uruchomBanke);
dodajPanelWlasny('gra-rozmowa', 'Rozmowa z nieznajomym', 'Obcy pisze do Ciebie w grze. Wybieraj odpowiedzi i zobacz, jak potoczy się rozmowa.', uruchomRozmowe);


function uruchomLowce(kontener) {
  const wiadomosci = [
    { tekst: 'Wygrałeś PS5! Odbierz: nagroda-ps5.top', oszustwo: true },
    { tekst: 'Twoje konto wygasa dziś! Zaloguj się tutaj', oszustwo: true },
    { tekst: 'Podaj kod BLIK, oddam jutro. To ja, Kuba', oszustwo: true },
    { tekst: 'Dopłata 1,50 zł do paczki: kurier-oplata.click', oszustwo: true },
    { tekst: 'Darmowe skiny! Podaj login i hasło do Steam', oszustwo: true },
    { tekst: 'Zmień hasło w 10 minut: bank-bezpiecz.xyz', oszustwo: true },
    { tekst: 'Zarób 500 zł dziennie bez wychodzenia z domu', oszustwo: true },
    { tekst: 'Wykryto 7 wirusów! Zadzwoń pod ten numer', oszustwo: true },
    { tekst: 'Wyślij zdjęcie dowodu, a dostaniesz nagrodę', oszustwo: true },
    { tekst: 'Kod logowania: 482913. Nikomu go nie podawaj.', oszustwo: false },
    { tekst: 'Nowa ocena w dzienniku. Zaloguj się z zakładki.', oszustwo: false },
    { tekst: 'Zamówienie nr 4821 zostało wysłane.', oszustwo: false },
    { tekst: 'Mama: Kup po drodze chleb :)', oszustwo: false },
    { tekst: 'Nowa wersja aplikacji w sklepie.', oszustwo: false },
    { tekst: 'Przypomnienie: sprawdzian jutro o 8:00', oszustwo: false },
    { tekst: 'Ola: wrzuciłam notatki na wspólny dysk', oszustwo: false }
  ];
  const LICZBA_WIADOMOSCI = 30;
  const MAKS_POMYLEK = 3;

  const pokazStart = () => {
    kontener.replaceChildren();
    const start = stworz('button', 'przycisk', 'Zacznij grę');
    start.onclick = graj;
    kontener.append(
      stworz('p', '', 'Wiadomości spadają w stronę Twojego konta. Kliknij lub dotknij tylko te, które są oszustwami, a bezpieczne zostaw w spokoju. Gra kończy się po trzech pomyłkach: za kliknięcie bezpiecznej wiadomości albo za przeoczenie oszustwa.'),
      start
    );
  };

  const graj = () => {
    kontener.replaceChildren();
    const info = stworz('p', 'numer-pytania');
    const pole = stworz('div', 'pole-lowcy');
    pole.append(stworz('div', 'dol-pola', 'Twoje konto'));
    kontener.append(info, pole);
    const aktywne = [];
    let zablokowane = 0, pomylki = 0, wygenerowane = 0, ostatniCzas = null, doNastepnej = 0, koniec = false;

    const odswiezInfo = () => { info.textContent = 'Zablokowane oszustwa: ' + zablokowane + ' · Pomyłki: ' + pomylki + ' z ' + MAKS_POMYLEK; };
    const usun = obiekt => { obiekt.usuniety = true; obiekt.element.remove(); aktywne.splice(aktywne.indexOf(obiekt), 1); };
    const mignij = () => { pole.classList.add('blad'); setTimeout(() => pole.classList.remove('blad'), 250); };
    const zakoncz = wygrana => {
      koniec = true;
      kontener.replaceChildren();
      const jeszczeRaz = stworz('button', 'przycisk', 'Zagraj jeszcze raz');
      jeszczeRaz.onclick = graj;
      kontener.append(
        stworz('p', 'wynik-gry', wygrana ? 'Przetrwałeś wszystkie wiadomości!' : 'Koniec gry: za dużo pomyłek.'),
        stworz('p', '', 'Zablokowane oszustwa: ' + zablokowane + '. Pomyłki: ' + pomylki + '. Pamiętaj: nie każda wiadomość to oszustwo, a przeoczenie jednej może kosztować Cię konto.'),
        jeszczeRaz
      );
    };
    const sprawdz = () => {
      if (koniec) return;
      if (pomylki >= MAKS_POMYLEK) zakoncz(false);
      else if (wygenerowane >= LICZBA_WIADOMOSCI && aktywne.length === 0) zakoncz(true);
    };
    const dodaj = () => {
      const wiadomosc = wiadomosci[Math.floor(Math.random() * wiadomosci.length)];
      const element = stworz('button', 'spadajaca', wiadomosc.tekst);
      element.style.left = Math.random() * Math.max(0, pole.clientWidth - 200) + 'px';
      pole.append(element);
      const obiekt = { element, y: -60, oszustwo: wiadomosc.oszustwo, predkosc: 60 + Math.min(wygenerowane * 3, 90), usuniety: false };
      element.onclick = () => {
        if (obiekt.usuniety || koniec) return;
        usun(obiekt);
        if (obiekt.oszustwo) zablokowane++; else { pomylki++; mignij(); }
        odswiezInfo();
        sprawdz();
      };
      aktywne.push(obiekt);
      wygenerowane++;
    };
    const klatka = czas => {
      if (koniec || !kontener.isConnected) return;
      if (ostatniCzas === null) ostatniCzas = czas;
      const dt = Math.min((czas - ostatniCzas) / 1000, .1);
      ostatniCzas = czas;
      if (kontener.offsetParent === null) { requestAnimationFrame(klatka); return; }
      doNastepnej -= dt;
      if (wygenerowane < LICZBA_WIADOMOSCI && doNastepnej <= 0) {
        dodaj();
        doNastepnej = Math.max(.7, 1.6 - wygenerowane * .03);
      }
      aktywne.slice().forEach(obiekt => {
        obiekt.y += obiekt.predkosc * dt;
        obiekt.element.style.transform = 'translateY(' + obiekt.y + 'px)';
        if (obiekt.y > pole.clientHeight - 50) {
          usun(obiekt);
          if (obiekt.oszustwo) pomylki++;
        }
      });
      odswiezInfo();
      sprawdz();
      if (!koniec) requestAnimationFrame(klatka);
    };
    odswiezInfo();
    requestAnimationFrame(klatka);
  };
  pokazStart();
}

function uruchomUstawienia(kontener) {
  const ustawienia = [
    { nazwa: 'Widoczność profilu', opcje: ['Publiczny, widzą go wszyscy', 'Prywatny, widzą go tylko zaakceptowane osoby'], bezpieczna: 1, wyjasnienie: 'Prywatny profil ogranicza, kto widzi Twoje posty i dane.' },
    { nazwa: 'Lokalizacja w postach', opcje: ['Nie dodawaj lokalizacji', 'Dodawaj lokalizację do każdego posta'], bezpieczna: 0, wyjasnienie: 'Lokalizacja zdradza, gdzie mieszkasz, uczysz się i kiedy nie ma Cię w domu.' },
    { nazwa: 'Kto może do Ciebie pisać', opcje: ['Każdy użytkownik', 'Tylko osoby, które znasz'], bezpieczna: 1, wyjasnienie: 'Ograniczenie wiadomości zmniejsza ryzyko kontaktu z oszustami i obcymi.' },
    { nazwa: 'Logowanie dwuetapowe', opcje: ['Wyłączone', 'Włączone'], bezpieczna: 1, wyjasnienie: 'Drugi składnik zatrzymuje większość prób włamania, nawet gdy ktoś zna hasło.' },
    { nazwa: 'Oznaczenia na zdjęciach', opcje: ['Dopiero po mojej akceptacji', 'Dodawane automatycznie'], bezpieczna: 0, wyjasnienie: 'Dzięki akceptacji to Ty decydujesz, jakie zdjęcia są powiązane z Twoim profilem.' },
    { nazwa: 'Numer telefonu na profilu', opcje: ['Ukryty', 'Widoczny dla wszystkich'], bezpieczna: 0, wyjasnienie: 'Publiczny numer ułatwia oszustwa, spam i nękanie.' },
    { nazwa: 'Logowanie na szkolnym komputerze', opcje: ['Zapamiętaj mnie', 'Nie zapamiętuj, wylogowuję się po pracy'], bezpieczna: 1, wyjasnienie: 'Na wspólnych komputerach kolejna osoba mogłaby wejść na Twoje konto.' },
    { nazwa: 'Uprawnienia aplikacji (kontakty, mikrofon)', opcje: ['Tylko to, czego aplikacja potrzebuje do działania', 'Zezwól na wszystko'], bezpieczna: 0, wyjasnienie: 'Aplikacja powinna mieć dostęp tylko do tego, co jest jej naprawdę potrzebne.' }
  ];
  const wybory = ustawienia.map(() => null);
  const przyciskiWierszy = [];
  const wiersze = [];

  const wprowadzenie = stworz('p', 'opis-grupy', 'Właśnie zakładasz nowe konto. Wybierz dla każdego ustawienia opcję, którą uważasz za bezpieczniejszą, a potem sprawdź konfigurację.');
  const sprawdz = stworz('button', 'przycisk', 'Sprawdź konfigurację');
  sprawdz.disabled = true;
  kontener.append(wprowadzenie);

  ustawienia.forEach((ustawienie, i) => {
    const wiersz = stworz('div', 'ustawienie');
    wiersz.append(stworz('b', '', ustawienie.nazwa));
    const opcje = stworz('div', 'odpowiedzi dwie');
    const przyciski = ustawienie.opcje.map((tekst, k) => {
      const przycisk = stworz('button', 'odpowiedz', tekst);
      przycisk.onclick = () => {
        wybory[i] = k;
        przyciskiWierszy[i].forEach((p, j) => p.classList.toggle('wybrana-opcja', j === k));
        sprawdz.disabled = wybory.includes(null);
      };
      opcje.append(przycisk);
      return przycisk;
    });
    przyciskiWierszy.push(przyciski);
    wiersze.push(wiersz);
    wiersz.append(opcje);
    kontener.append(wiersz);
  });

  sprawdz.onclick = () => {
    let poprawne = 0;
    ustawienia.forEach((ustawienie, i) => {
      const trafnie = wybory[i] === ustawienie.bezpieczna;
      if (trafnie) poprawne++;
      przyciskiWierszy[i].forEach((przycisk, k) => {
        przycisk.disabled = true;
        if (k === ustawienie.bezpieczna) przycisk.classList.add('dobra');
        else if (k === wybory[i]) przycisk.classList.add('zla');
      });
      wiersze[i].append(stworz('p', 'komentarz ' + (trafnie ? 'dobrze' : 'zle'), (trafnie ? 'Dobrze! ' : 'Nie tym razem. ') + ustawienie.wyjasnienie));
    });
    sprawdz.remove();
    const jeszczeRaz = stworz('button', 'przycisk', 'Spróbuj jeszcze raz');
    jeszczeRaz.onclick = () => { kontener.replaceChildren(); uruchomUstawienia(kontener); };
    kontener.append(stworz('p', 'wynik-gry', 'Bezpiecznie ustawione: ' + poprawne + ' z ' + ustawienia.length), jeszczeRaz);
  };
  kontener.append(sprawdz);
}

dodajPanelWlasny('gra-lowca-oszustw', 'Łowca oszustw', 'Wiadomości spadają na Twoje konto. Zablokuj oszustwa, zanim dotrą na dół, i nie ruszaj bezpiecznych.', uruchomLowce);
dodajPanelWlasny('gra-ustawienia', 'Skonfiguruj konto', 'Ustaw nowe konto tak, żeby było jak najbezpieczniejsze.', uruchomUstawienia);

const idyGier = [...document.querySelectorAll('[data-gra]')].map(przycisk => przycisk.dataset.gra);
idyGier.forEach(id => {
  const link = stworz('a', 'link-do-lekcji', 'Przeczytaj lekcję do tej gry');
  link.href = 'ucz-sie.html#lekcja-' + id.replace('gra-', '');
  pobierz(id).querySelector('p').after(link);
  const rodzaj = document.querySelector('[data-gra="' + id + '"]').closest('.karta-gry').dataset.rodzaj;
  pobierz(id).prepend(stworz('span', 'plakietka-rodzaju ' + rodzaj, rodzaj === 'quiz' ? 'Quiz' : 'Gra'));
});
function otworzGre(idGry) {
  pobierz('wybor-gier').hidden = true;
  pobierz('panel-gry').hidden = false;
  idyGier.forEach(id => pobierz(id).hidden = id !== idGry);
  pobierz('panel-gry').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
document.querySelectorAll('[data-gra]').forEach(przycisk => przycisk.onclick = () => otworzGre(przycisk.dataset.gra));
pobierz('przycisk-losuj-gre').onclick = () => otworzGre(idyGier[Math.floor(Math.random() * idyGier.length)]);
pobierz('wroc-do-wyboru').onclick = () => {
  pobierz('panel-gry').hidden = true;
  pobierz('wybor-gier').hidden = false;
};

const graZAdresu = location.hash.slice(1);
if (idyGier.includes(graZAdresu)) otworzGre(graZAdresu);
