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
  { od: 'Wiadomość prywatna', tresc: 'Gratulacje, wygrałeś iPhone’a! Podaj PESEL i adres, żeby odebrać nagrodę.', odpowiedzi: BEZPIECZNA_PULAPKA, poprawna: 1, wyjasnienie: 'Nikt nie rozdaje telefonów za PESEL. Dane osobowe to cenny łup dla oszustów.' }
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
  { tresc: 'Ktoś wrzucił na czat klasowy żenujące zdjęcie koleżanki.', odpowiedzi: ['Prześlę dalej, wszyscy się śmieją', 'Nie udostępnię, zgłoszę to i napiszę do koleżanki', 'Zignoruję, to nie moja sprawa'], poprawna: 1, wyjasnienie: 'Udostępnianie pogłębia krzywdę. Zgłoszenie i wsparcie ofiary naprawdę pomagają.' }
]);

const idyGier = ['gra-phishing', 'gra-haslo', 'gra-sytuacje'];
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
