"use strict";

function szerokoscKarteczki(tekst) {
  return Math.round(Math.sqrt(tekst.length) * 16 + 38);
}

function rysujKarteczki() {
  const pokoj = $("#room");
  KARTECZKI.forEach(k => {
    const kartka = elem("div", "karteczka " + k.kolor, k.tekst);
    kartka.style.width = szerokoscKarteczki(k.tekst) + "px";
    kartka.style.left = k.x + "px";
    kartka.style.top = k.y + "px";
    kartka.style.transform = "rotate(" + k.kat + "deg)";
    pokoj.appendChild(kartka);
  });
}
