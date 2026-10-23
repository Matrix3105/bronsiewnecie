'use strict';

const USTAW = {
  godzinaMs: 11000,       // 1 godzina w grze = 11 s; doba = 24 godziny = 4,4 min
  startGodz: 6,           // doba zaczyna się o 6:00 rano
  dzienOd: 6, nocOd: 18,  // dzień 6:00-18:00, noc 18:00-6:00
  dni: 5,
  // noc jest trochę cięższa niż dzień: szybszy wzrost zagrożeń, częstsze alerty
  dzien: {tempo: .8, odstep: 1.25, maxAlertow: -1},
  noc:   {tempo: 1.0, odstep: 1.0, maxAlertow: 0},
  mnoznikPktNoc: 1.25,    // punkty zdobyte w nocy są więcej warte
  zycia: 5,
  tempoWzrostu: [.9, .93, .96, 1.0, 1.03],
  maxAlertow: [2, 2, 2, 2, 3],
  odstepAlertow: [13000, 13000, 12500, 12000, 11500],
  // poczta: zwykłe maile nie mają limitu czasu, pilne (prawdziwe alarmy) mają
  maxMaili: 6,
  odstepMaili: [22000, 22000, 22000, 21000, 21000],
  czasPilnego: [110, 108, 105, 102, 100],            // sekundy na reakcję
  odstepPilnych: [0, 120000, 115000, 110000, 105000],
  // komunikator
  maxCzatow: 3,
  odstepCzatow: [30000, 30000, 29000, 28000, 27000],
  // pulpit: pliki-wirusy i zdarzenia systemowe (od 2. dnia)
  maxPlikow: 9,
  maxTerminowych: [2, 2, 2, 2, 3],   // ile pilnych rzeczy naraz (wirusy, zdarzenia, pilne maile)
  maxWirusow: [1, 1, 1, 2, 2],
  odstepPlikow: [0, 70000, 65000, 60000, 55000],
  czasPliku: [100, 100, 95, 92, 90],               // sekundy do uruchomienia wirusa
  odstepZdarzen: [0, 85000, 80000, 75000, 70000],
  czasZdarzenia: [80, 80, 78, 76, 74],
  kodWidocznyMs: 12000,

  // punkty (tryb nieskończony)
  punktyZadanie: 100,     // + do 100 premii za szybką reakcję
  punktyMail: 50,
  punktyPilny: 90,
  punktyCzat: 40,
  punktyAv: 70,           // usunięty wirus, rozwiązane zdarzenie systemowe
  punktyKosz: 30,
  punktyZycie: 150,       // za każde serce na koniec doby
  premiaDnia: 500,
  miejscWTabeli: 5
};
