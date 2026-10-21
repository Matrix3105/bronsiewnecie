'use strict';

const USTAW = {
  godzinaMs: 9000,        // 1 godzina w grze = 9 s; doba = 24 godziny = 3,6 min
  startGodz: 6,           // doba zaczyna się o 6:00 rano
  dzienOd: 6, nocOd: 18,  // dzień 6:00-18:00, noc 18:00-6:00
  dni: 5,
  // noc jest trochę cięższa niż dzień: szybszy wzrost zagrożeń, częstsze alerty
  dzien: {tempo: .9, odstep: 1.1, maxAlertow: -1},
  noc:   {tempo: 1.15, odstep: .9, maxAlertow: 0},
  mnoznikPktNoc: 1.25,    // punkty zdobyte w nocy są więcej warte
  zycia: 5,
  tempoWzrostu: [1.4, 1.6, 1.8, 2.0, 2.2],
  maxAlertow: [2, 2, 3, 3, 4],
  odstepAlertow: [9000, 8500, 8000, 7500, 7000],
  czasNaMaila: 35,
  maxMaili: 2,
  odstepMaili: [16000, 15000, 14000, 13000, 12000],
  kodWidocznyMs: 8000,

  // punkty (tryb nieskończony)
  punktyZadanie: 100,     // + do 100 premii za szybką reakcję
  punktyMail: 50,
  punktyZycie: 150,       // za każde serce na koniec doby
  premiaDnia: 500,
  miejscWTabeli: 5
};
