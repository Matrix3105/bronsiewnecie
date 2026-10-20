'use strict';

/* ==========================================================
   11. OBSŁUGA KLIKNIĘĆ
   ========================================================== */
$("#t-al").onclick = () => view(S.task ? "task" : "al");
$("#t-ml").onclick = () => view("ml");

// telefon: pokazuje kod 2FA, gdy jest potrzebny
$("#ph").onclick = () => {
  if (!S || !loop) return;
  SFX.click();
  const p = $("#ph");
  if (S.need) {
    p.innerHTML = "Kod 2FA<br><b>" + S.code + "</b>"; p.classList.add("on");
    later(() => { p.innerHTML = "Telefon<br>brak kodów"; p.classList.remove("on"); }, CFG.codeShowMs);
  } else {
    p.innerHTML = "Telefon<br>brak kodów";
  }
};

$("#mute").onclick = () => {
  muted = !muted;
  $("#mute").textContent = "Dźwięk: " + (muted ? "wył." : "wł.");
  muted ? stopHum() : (S && loop && startHum());
};
$("#full").onclick = () => {
  try { document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen(); } catch (e) {}
};
$("#menu").onclick = home;
$("#b-new").onclick = () => { save(1); start(1); };
$("#b-cont").onclick = () => start(load());
$("#m-home").onclick = home;

home();
