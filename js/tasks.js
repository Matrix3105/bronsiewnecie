'use strict';

/* ==========================================================
   9. MINIGRY (ZADANIA NA KOMPUTERZE)
   Każda: function(pudełko, sukces, porażka(komunikat))
   ========================================================== */

// elementy wspólne dla minigier
const ui = {
  head(b, title, text) { b.append(el("b", "", title), el("p", "", text)); },
  btn(b, txt, fn, cls) { const x = el("button", cls || "f", txt); x.onclick = fn; b.appendChild(x); return x; },
  checks(b, items) {
    return items.map(t => {
      const l = el("label", "f"), i = document.createElement("input");
      i.type = "checkbox"; l.append(i, " " + t); b.appendChild(l); return i;
    });
  },
  // pasek postępu: usuwa przyciski i po czasie wywołuje cb
  progress(b, ms, cb) {
    const d = el("div", "pb"), i = document.createElement("i");
    d.appendChild(i); b.appendChild(d);
    b.querySelectorAll("button,input,label").forEach(x => x.remove());
    i.style.transition = "width " + ms + "ms linear"; void i.offsetWidth; i.style.width = "100%";
    later(cb, ms);
  },
  // pytanie z wyborem jednej odpowiedzi: opts = [[tekst, czyDobra], ...]
  choice(b, opts, ok, no, wrongMsg) {
    shuffle(opts).forEach(o => ui.btn(b, o[0], () => o[1] ? ok() : no(typeof wrongMsg === "function" ? wrongMsg(o) : wrongMsg)));
  }
};

const TASKS = {

  // --- Hasło + 2FA: kod z telefonu ---
  brute(b, ok, no) {
    S.code = rand6(); S.need = 1;
    ui.head(b, "Weryfikacja dwuetapowa", "Kod wysłano na telefon. Dotknij telefonu na biurku, odczytaj kod i wpisz go tutaj.");
    const i = document.createElement("input"); i.maxLength = 6; i.inputMode = "numeric"; i.placeholder = "000000"; i.oninput = SFX.type;
    b.appendChild(i);
    ui.btn(b, "Zatwierdź", () => {
      if (i.value === S.code) { S.need = 0; ok(); }
      else { S.code = rand6(); i.value = ""; no("Zły kod. Wysłano nowy, sprawdź telefon."); }
    }, "a");
  },

  // --- Profil: usuń niebezpieczne posty ---
  social(b, ok, no) {
    ui.head(b, "Czyszczenie profilu", "Zaznacz posty, które są niebezpieczne, i usuń je. Bezpiecznych nie ruszaj.");
    const posts = shuffle([
      ["Zdjęcie dowodu osobistego „dla pamiątki”", 1],
      ["Selfie z psem", 0],
      ["„Wyjeżdżamy na 2 tygodnie, dom pusty!” + adres", 1],
      ["Zdjęcie biletu z widocznym kodem kreskowym", 1],
      ["Zdjęcie pizzy z kolacji", 0]
    ]);
    const cb = ui.checks(b, posts.map(p => p[0]));
    ui.btn(b, "Usuń zaznaczone", () => {
      cb.every((c, i) => c.checked === !!posts[i][1]) ? ok()
        : no("Usuń dokładnie te posty, które ujawniają dokumenty, kody lub to, że dom jest pusty.");
    }, "a");
  },

  // --- Fake news: wskaż fałszywkę ---
  fakenews(b, ok, no) {
    const sets = [
      [["SZOK! Lekarze ukrywają ten trik! Udostępnij, zanim usuną!", 1],
       ["Ministerstwo: nowe zasady egzaminów od września (komunikat na gov.pl)", 0],
       ["Agencja prasowa podała dane GUS o inflacji, z linkiem do źródła", 0]],
      [["Naukowcy z uniwersytetu opublikowali wyniki badań (link do artykułu)", 0],
       ["Nagranie: ten polityk powiedział TO! Bez źródła i bez daty, ucięte w połowie zdania", 1],
       ["Prognoza IMGW: w weekend możliwe burze", 0]],
      [["Rozdają 500 zł każdemu, kto udostępni ten post!", 1],
       ["Szkoła zmienia godziny lekcji. Informacja na stronie szkoły", 0],
       ["Burmistrz otworzył plac zabaw (zdjęcia w lokalnej gazecie)", 0]]
    ];
    ui.head(b, "Weryfikacja newsów", "Który z tych przekazów jest fałszywy? Zablokuj go.");
    ui.choice(b, pick(sets).map(x => x.slice()), ok, no, "To wiarygodny przekaz. Fałszywka ma sensacyjny ton albo brak źródła.");
  },

  // --- Antywirus: podwójne rozszerzenie ---
  malware(b, ok, no) {
    const bad = pick(["faktura.pdf.exe", "zdjecie.jpg.scr", "cv_final.docx.exe"]);
    ui.head(b, "Antywirus", "Przeskanuj folder Pobrane.");
    ui.btn(b, "Skanuj", () => {
      b.querySelector("p").textContent = "Skanowanie…";
      ui.progress(b, 2000, () => {
        b.innerHTML = "";
        ui.head(b, "Wykryto podejrzany plik", "Wskaż plik do usunięcia. Nie kasuj dobrych.");
        ui.choice(b, [[bad, 1], ["raport.docx", 0], ["wakacje.jpg", 0], ["notatki.txt", 0]], ok, no,
          "To bezpieczny plik. Szukaj podwójnego rozszerzenia.");
      });
    }, "a");
  },

  // --- Ustawienia konta ---
  settings(b, ok, no) {
    ui.head(b, "Ustawienia konta", "Ustaw konto tak, żeby było jak najbezpieczniejsze, i zapisz.");
    const opts = shuffle([
      ["Weryfikacja dwuetapowa (2FA)", true, false],
      ["Profil prywatny", true, false],
      ["Dodawaj lokalizację do zdjęć", false, true],
      ["Numer telefonu widoczny dla wszystkich", false, true]
    ]);
    const cb = ui.checks(b, opts.map(o => o[0]));
    cb.forEach((c, i) => c.checked = opts[i][2]);      // stan początkowy jest zły
    ui.btn(b, "Zapisz", () => {
      const wrong = cb.findIndex((c, i) => c.checked !== opts[i][1]);
      wrong < 0 ? ok() : no("Popraw ustawienie: „" + opts[wrong][0] + "”.");
    }, "a");
  },

  // --- Publiczne Wi-Fi + VPN ---
  wifi(b, ok, no) {
    ui.head(b, "Wybierz sieć", "Twój router to „DomWiFi_5G”. Połącz się z nim, potem włącz VPN.");
    ui.choice(b, [
      ["DomWiFi_5G (szyfrowana WPA3)", 1], ["Free_Airport_WiFi (otwarta)", 0],
      ["DomWiFi_5G_Free (otwarta)", 0], ["Kawiarnia_Gosc (hasło na paragonie)", 0]
    ], () => {
      b.innerHTML = "";
      ui.head(b, "Połączono z DomWiFi_5G", "Teraz włącz VPN.");
      ui.btn(b, "Włącz VPN", () => {
        b.querySelector("p").textContent = "Budowanie szyfrowanego tunelu…";
        ui.progress(b, 1800, ok);
      }, "a");
    }, no, "To nie Twoja sieć. Fałszywe punkty kopiują nazwy.");
  },

  // --- Sklep internetowy ---
  shop(b, ok, no) {
    ui.head(b, "Zakupy online", "Chcesz kupić słuchawki. Który sklep jest bezpieczny?");
    ui.choice(b, [
      ["okazja-sklep24.top: słuchawki za 49 zł, płatność tylko przelewem na konto prywatne", 0],
      ["sklep-elektro.pl (https): dane firmy, regulamin, BLIK i karta, cena zbliżona do rynkowej", 1],
      ["mega-promocje.xyz: „zostało 3 minuty!”, brak danych firmy i regulaminu", 0]
    ], ok, no, "Ten sklep ma typowe znaki oszustwa: dziwna domena, presja czasu, brak danych firmy albo przelew na prywatne konto.");
  },

  // --- Aktualizacje (keylogger) ---
  keylog(b, ok, no) {
    ui.head(b, "Aktualizacja systemu", "Szukaj dostępnych łatek.");
    ui.btn(b, "Szukaj", () => {
      b.querySelector("p").textContent = "Szukanie…";
      ui.progress(b, 1500, () => {
        b.innerHTML = "";
        ui.head(b, "Znaleziono łatki", "Zaznacz wszystkie i zainstaluj.");
        const cb = ui.checks(b, ["Łatka bezpieczeństwa KB402", "Aktualizacja przeglądarki", "Poprawka sterownika klawiatury"]);
        ui.btn(b, "Instaluj", () => {
          if (cb.some(i => !i.checked)) return no("Zaznacz wszystkie łatki, inaczej luka zostaje.");
          b.innerHTML = "<b>Instalowanie…</b>";
          ui.progress(b, 1800, () => {
            b.innerHTML = ""; b.appendChild(el("b", "", "Wymagany restart"));
            ui.btn(b, "Uruchom ponownie", () => { b.innerHTML = "<b>Restart…</b>"; ui.progress(b, 1200, ok); }, "a");
          });
        }, "a");
      });
    }, "a");
  },

  // --- Cyberprzemoc ---
  bully(b, ok, no) {
    ui.head(b, "Hejt na czacie", "Anonimowy użytkownik pisze do Ciebie:");
    b.appendChild(el("p", "quote", "„Jesteś beznadziejny, nikt Cię nie lubi. Wszyscy się z Ciebie śmieją.”"));
    b.appendChild(el("p", "", "Zaznacz wszystkie dobre reakcje i zatwierdź."));
    const acts = shuffle([
      ["Zrób zrzuty ekranu jako dowód", 1],
      ["Zablokuj i zgłoś konto", 1],
      ["Powiedz zaufanej dorosłej osobie", 1],
      ["Odpisz mu jeszcze ostrzej", 0],
      ["Usuń wszystko i nikomu nie mów", 0]
    ]);
    const cb = ui.checks(b, acts.map(a => a[0]));
    ui.btn(b, "Zatwierdź", () => {
      cb.every((c, i) => c.checked === !!acts[i][1]) ? ok()
        : no("Nie odpowiadaj agresją i nie zostawaj z tym sam. Zbierz dowody, zablokuj, zgłoś i powiedz komuś zaufanemu.");
    }, "a");
  },

  // --- Wyciek hasła: nowe hasło ---
  leak(b, ok) {
    ui.head(b, "Nowe hasło", "Stare hasło wyciekło. Ustal nowe, spełniające wszystkie warunki.");
    const i = document.createElement("input"); i.autocomplete = "off"; i.placeholder = "nowe hasło";
    const r = el("div"), save = ui.btn(b, "Zapisz hasło", ok, "a");
    b.insertBefore(i, save); b.insertBefore(r, save); save.disabled = true;
    const RULES = [
      ["Co najmniej 10 znaków",           v => v.length >= 10],
      ["Wielka litera",                   v => /[A-ZĄĆĘŁŃÓŚŹŻ]/.test(v)],
      ["Cyfra",                           v => /\d/.test(v)],
      ["Znak specjalny",                  v => /[^\p{L}\d]/u.test(v)],
      ["Bez „haslo”, „123”, „qwerty”",    v => !/haslo|hasło|123|qwerty/i.test(v)]
    ];
    const update = () => {
      let all = true; r.innerHTML = "";
      RULES.forEach(([txt, test]) => {
        const good = test(i.value); if (!good) all = false;
        const row = el("div", "", (good ? "✓ " : "○ ") + txt); row.style.color = good ? "var(--ok)" : "var(--dim)"; r.appendChild(row);
      });
      save.disabled = !all; SFX.type();
    };
    i.oninput = update;
  },

  // --- Obcy na czacie: rozmowa w dwóch krokach ---
  stranger(b, ok, no) {
    const step2 = () => {
      b.innerHTML = "";
      ui.head(b, "Czat: ProGamer_99", "Nieznajomy pisze dalej:");
      b.appendChild(el("p", "quote", "„Okej. To dodaj mnie na komunikator i wyślij fotkę. Tylko nie mów rodzicom, to nasza tajemnica.”"));
      ui.choice(b, [
        ["Wyślę zdjęcie, skoro prosi", 0],
        ["Blokuję, zgłaszam i mówię dorosłemu", 1],
        ["Wyślę zdjęcie bez twarzy", 0]
      ], ok, no, "Nie wysyłaj nic obcemu. „Nie mów rodzicom” to sygnał alarmowy: zablokuj, zgłoś i powiedz zaufanej osobie.");
    };
    ui.head(b, "Czat: ProGamer_99", "Nieznajomy z gry pisze do Ciebie:");
    b.appendChild(el("p", "quote", "„Hej, świetnie grasz! Ile masz lat i gdzie mieszkasz?”"));
    ui.choice(b, [
      ["Podam miasto i szkołę", 0],
      ["Nie podam danych osobowych", 1],
      ["Podam tylko wiek", 0]
    ], step2, no, "Obcym nie podajemy wieku, miejsca ani szkoły. Z tych informacji łatwo złożyć obraz o Tobie.");
  },

  // --- Oszustwo w grze ---
  gamescam(b, ok, no) {
    ui.head(b, "Wymiana w grze", "Gracz pisze:");
    b.appendChild(el("p", "quote", "„Wyślij mi swojego skina za 200 zł, a oddam Ci dwa! Ty pierwszy, ja uczciwy. Albo wejdź na skins-trade.top i zaloguj się kontem gry.”"));
    ui.choice(b, [
      ["Wysyłam pierwszy, bo dwa to okazja", 0],
      ["Odmawiam i wymieniam tylko oficjalną wymianą w grze", 1],
      ["Loguję się na skins-trade.top", 0]
    ], ok, no, "„Ty pierwszy” i logowanie na obcej stronie to klasyczne metody kradzieży kont i przedmiotów.");
  }
};

/* ---- otwieranie i zamykanie zadania ---- */
function openTask(a) {
  const b = $("#v-task"); b.innerHTML = ""; S.task = a;
  const back = el("button", "a", "← Wróć"); back.onclick = () => closeTask(false);
  const body = el("div"); b.append(back, body); view("task");

  const onOk = () => {
    removeAlert(a); SFX.ok(); say("Zagrożenie „" + a.th.name + "” odparte.", "good"); closeTask(true);
  };
  const onNo = msg => {
    a.m = Math.min(90, a.m + CFG.failPenalty); SFX.bad(); say(msg + " (zagrożenie lekko rośnie)", "bad");
  };
  TASKS[a.th.id](body, onOk, onNo);
}
function closeTask(solved) {
  S.tt.forEach(clearTimeout); S.tt = []; S.need = 0; S.task = null;
  $("#ph").innerHTML = "Telefon<br>brak kodów"; $("#ph").classList.remove("on");
  view("al");
  if (!solved) say("Zadanie przerwane.");
}
