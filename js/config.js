'use strict';

/* ==========================================================
   1. KONFIGURACJA (tu łatwo zmienisz trudność)
   ========================================================== */
const CFG = {
  hourMs:      28000,           // ile ms trwa jedna „godzina” w grze
  nights:      5,
  hp:          5,               // liczba żyć (zabezpieczeń)
  threatRate:  [1.4, 1.6, 1.8, 2.0, 2.2], // tempo wzrostu alertu na sekundę, osobno dla każdej nocy
  maxActive:   [2, 2, 3, 3, 4], // ile alertów naraz w danej nocy
  spawnEvery:  [9000, 8500, 8000, 7500, 7000], // średni odstęp między alertami (ms)
  mailTtl:     35,              // sekundy na ocenę maila
  mailMax:     2,               // ile maili naraz
  mailEvery:   [16000, 15000, 14000, 13000, 12000],
  failPenalty: 8,               // o ile rośnie alert po błędzie w zadaniu
  codeShowMs:  8000             // jak długo widać kod 2FA na telefonie
};
