'use strict';

$("#ph").onclick = () => {
  if (!stan || !petla) return;
  DZWIEKI.klik();
  const p = $("#ph");
  if (stan.potrzebny) {
    p.innerHTML = "Kod 2FA<br><b>" + stan.kod + "</b>"; p.classList.add("on");
    pozniej(() => { p.innerHTML = "Telefon<br>brak kodów"; p.classList.remove("on"); }, USTAW.kodWidocznyMs);
  } else {
    p.innerHTML = "Telefon<br>brak kodów";
  }
};

$("#mute").onclick = () => {
  wyciszony = !wyciszony;
  $("#mute .tx").textContent = "Dźwięk: " + (wyciszony ? "wył." : "wł.");
  $("#mute .ik").textContent = wyciszony ? "Cisza" : "Dźwięk";
  wyciszony ? stopBrzeczenia() : (stan && petla && startBrzeczenia());
};
function pelnyEkran() {
  try {
    if (document.fullscreenElement) { document.exitFullscreen(); return; }
    const p = document.documentElement.requestFullscreen();
    // w pełnym ekranie telefon da się zablokować w poziomie
    if (p && p.then) p.then(() => screen.orientation && screen.orientation.lock && screen.orientation.lock("landscape")).catch(() => {});
  } catch (e) {}
}
$("#full").onclick = pelnyEkran;
$("#b-obroc").onclick = pelnyEkran;
$("#menu").onclick = ekranGlowny;
$("#b-new").onclick = nowaGra;
$("#w-losuj").onclick = () => rozpocznijZFabula(losuj(FABULY.filter(f => f.id !== fabulaId)).id);
$("#w-wroc").onclick = ekranGlowny;
$("#w-zmien").onclick = ekranWyboru;
$("#b-cont").onclick = () => zacznijDzien(wczytaj());
$("#b-resume").onclick = wznow;
$("#b-tut").onclick = samouczek.otworz;
$("#tut-x").onclick = ekranGlowny;
$("#tut-wstecz").onclick = () => samouczek.idz(-1);
$("#tut-dalej").onclick = () => samouczek.idz(1);
$("#m-home").onclick = ekranGlowny;

function pauzaPoUtracieOkna() { if (petla && stan) ekranGlowny(); }
document.addEventListener("visibilitychange", () => { if (document.hidden) pauzaPoUtracieOkna(); });
addEventListener("blur", pauzaPoUtracieOkna);

pulpit.start();
ksiazki.start();
biurko.start();
ekranGlowny();

/* ---------- klawiatura: Enter zatwierdza zadanie, Escape zamyka aplikację, a na pulpicie robi pauzę ---------- */
document.addEventListener("keydown", e => {
  if (!stan || !petla || !$("#s-game").classList.contains("on")) return;

  if (e.key === "Enter" && stan.zadanie && !e.target.closest("button")) {
    // Enter w polu tekstowym lub na polu wyboru klika główny przycisk zadania (jeśli jest aktywny)
    const glowny = [...$("#v-task > div").querySelectorAll("button.a")].find(b => !b.disabled);
    if (glowny) { e.preventDefault(); glowny.click(); }
    return;
  }

  if (e.key === "Escape") {
    // najpierw zamykamy otwarte okienka, potem otwartą aplikację; dopiero na samym pulpicie Escape robi pauzę
    if ($("#okno-ks").classList.contains("on")) return ksiazki.zamknij();
    if ($("#okno-plyty").classList.contains("on")) return biurko.zamknijSzuflade();
    if ($("#menu-pliku").classList.contains("on")) return pulpit.zamknijMenu();
    if (pulpit.otwarta) { e.preventDefault(); return pulpit.zamknij(); }
    ekranGlowny();
  }
});
