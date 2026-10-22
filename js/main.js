'use strict';

$("#t-al").onclick = () => widok(stan.zadanie ? "task" : "al");
$("#t-ml").onclick = () => widok("ml");

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
  $("#mute .ik").textContent = wyciszony ? "🔇" : "🔊";
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
$("#m-home").onclick = ekranGlowny;

function pauzaPoUtracieOkna() { if (petla && stan) ekranGlowny(); }
document.addEventListener("visibilitychange", () => { if (document.hidden) pauzaPoUtracieOkna(); });
addEventListener("blur", pauzaPoUtracieOkna);

ksiazki.start();
biurko.start();
ekranGlowny();
