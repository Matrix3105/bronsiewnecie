'use strict';

/* ==========================================================
   2. DANE: ZAGROŻENIA, MAILE, LEKCJE
   ========================================================== */
// from = od której nocy zagrożenie może się pojawić
const THREATS = [
  {id:"brute",    from:1, name:"Atak brute force",       desc:"Ktoś zgaduje Twoje hasło.",
   tip:"Długie, unikalne hasło i 2FA sprawiają, że zgadywanie hasła nie ma sensu."},
  {id:"social",   from:1, name:"Za dużo na profilu",     desc:"Na Twoim profilu są wrażliwe posty.",
   tip:"Dowody, bilety z kodami i informacja „dom stoi pusty” pomagają oszustom i włamywaczom."},
  {id:"fakenews", from:1, name:"Fałszywa wiadomość",     desc:"Po sieci krąży dezinformacja.",
   tip:"Szukaj źródła, daty i autora. Sensacyjny ton i „udostępnij zanim usuną” to ostrzeżenie."},
  {id:"malware",  from:2, name:"Złośliwy plik",          desc:"Pobrał się podejrzany plik.",
   tip:"Nie otwieraj plików z nieznanych źródeł i uważaj na podwójne rozszerzenia, np. .pdf.exe."},
  {id:"settings", from:2, name:"Słabe ustawienia konta", desc:"Konto ma otwarte furtki.",
   tip:"2FA, prywatny profil i wyłączona lokalizacja to szybkie zabezpieczenia."},
  {id:"wifi",     from:3, name:"Fałszywe Wi‑Fi",         desc:"Ktoś podsłuchuje Twój ruch.",
   tip:"W publicznym Wi‑Fi używaj VPN i łącz się tylko z siecią, którą znasz."},
  {id:"shop",     from:3, name:"Fałszywy sklep",         desc:"Okazja podejrzanie dobra.",
   tip:"Sprawdź adres, dane firmy i sposób płatności. Cena „za dobra” zwykle znaczy oszustwo."},
  {id:"keylog",   from:4, name:"Keylogger",              desc:"Program zapisuje Twoje klawisze.",
   tip:"Aktualizacje łatają luki, przez które wchodzą szpiegujące programy."},
  {id:"bully",    from:4, name:"Hejt w sieci",           desc:"Ktoś Cię wyzywa na czacie.",
   tip:"Nie odpisuj hejterowi. Zachowaj dowody, zablokuj, zgłoś i powiedz zaufanej osobie."},
  {id:"leak",     from:5, name:"Wyciek hasła",           desc:"Twoje hasło jest w sieci.",
   tip:"Po wycieku zmień hasło wszędzie, gdzie go używałeś. Każde konto powinno mieć inne."},
  {id:"stranger", from:5, name:"Obcy na czacie",         desc:"Nieznajomy dopytuje o Ciebie.",
   tip:"Nie podawaj obcym danych ani zdjęć. Gdy ktoś każe trzymać rozmowę w tajemnicy, powiedz dorosłemu."},
  {id:"gamescam", from:5, name:"Oszustwo w grze",        desc:"Ktoś proponuje „super wymianę”.",
   tip:"Wymieniaj przedmioty tylko oficjalnymi narzędziami gry. „Ty pierwszy” to klasyczny przekręt."}
];

const MAILS = [
  {from:"security@paypa1-support.com", s:"PILNE: konto zostanie zablokowane", b:"Kliknij w ciągu 24h: paypa1-login.xyz/verify", p:1,
   t:"Literówka w domenie (paypa1) i presja czasu to klasyczny phishing."},
  {from:"kurier@dhl-paczka.top", s:"Dopłata 1,99 zł do paczki", b:"Podaj dane karty, aby odebrać przesyłkę.", p:1,
   t:"Drobna dopłata to sztuczka na dane karty."},
  {from:"stypendium@szkola.edu.pl.konto-ucznia.ru", s:"Odbierz stypendium", b:"Zaloguj się, aby potwierdzić dane.", p:1,
   t:"Liczy się końcówka domeny, a tu jest .ru."},
  {from:"nitro@discord-gift.gift", s:"Darmowe Nitro dla Ciebie!", b:"Zaloguj się przez nasz link.", p:1,
   t:"Darmowy prezent za logowanie przez link to prawie zawsze kradzież konta."},
  {from:"wygrana@loteria-iphone.info", s:"Wygrałeś iPhone’a!", b:"Wyślij adres i numer PESEL.", p:1,
   t:"Nie brałeś udziału w loterii, a PESEL nigdy nie jest potrzebny do nagrody."},
  {from:"bank@moj-bank-pomoc.com", s:"Potwierdź tożsamość", b:"Odpowiedz na ten mail, podając swoje hasło.", p:1,
   t:"Żadna firma nie prosi o hasło w mailu."},
  {from:"pomoc@instagrarn-support.com", s:"Naruszenie zasad: konto do usunięcia", b:"Zaloguj się tu, żeby się odwołać: instagrarn-appeal.com", p:1,
   t:"„rn” udaje „m”. Podróbki nazw to częsty trik."},
  {from:"no-reply@github.com", s:"Nowe logowanie z Chrome", b:"Jeśli to Ty, nic nie musisz robić. Brak linków.", p:0,
   t:"Zwykłe powiadomienie bez linków i presji."},
  {from:"nauczyciel@szkola.pl", s:"Praca domowa na piątek", b:"Zadania z rozdziału 4.", p:0,
   t:"Znany nadawca, zwykła treść."},
  {from:"mama", s:"Kolacja o 18:00", b:"Kup po drodze chleb.", p:0, t:"To po prostu mama."},
  {from:"newsletter@biblioteka.pl", s:"Nowe książki w bibliotece", b:"Zobacz nowości na stronie biblioteki.", p:0,
   t:"Wiadomość, którą sam zamówiłeś, bez żadnej prośby o dane."},
  {from:"kolega.z.klasy", s:"Masz notatki z biologii?", b:"Wyślij mi je wieczorem, dzięki!", p:0,
   t:"Znana osoba i zwykła prośba."}
];

// lekcja po każdej przetrwanej nocy
const LESSONS = [
  "Noc 1: silne hasło, 2FA i czujność wobec maili. Phishing zdradza dziwna domena, pośpiech i prośba o dane. Uważaj też, co publikujesz i czemu wierzysz.",
  "Noc 2: pliki z niepewnych źródeł mogą być wirusem, a dobre ustawienia konta zamykają wiele furtek.",
  "Noc 3: publiczne Wi‑Fi bywa pułapką, a sklep z cudowną ceną bywa pułapką jeszcze bardziej.",
  "Noc 4: aktualizacje to łatki na dziury. Z hejterem nie rozmawiasz, tylko zbierasz dowody i zgłaszasz.",
  "Noc 5: wycieki się zdarzają, więc inne hasło do każdego konta ogranicza szkody. Nieznajomym nie mówisz nic o sobie."
];
