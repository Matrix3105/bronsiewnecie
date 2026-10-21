'use strict';

let ctxAudio = null, wyciszony = false, brzeczenie = null;

function kontekst() {
  if (!ctxAudio) { try { ctxAudio = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} }
  if (ctxAudio && ctxAudio.state === "suspended") ctxAudio.resume();
  return ctxAudio;
}
function ton(f, d, type, v, opoznienie, docelowa) {
  if (wyciszony) return;
  const a = kontekst(); if (!a) return;
  const t = a.currentTime + (opoznienie || 0), o = a.createOscillator(), g = a.createGain();
  o.type = type || "square";
  o.frequency.setValueAtTime(f, t);
  if (docelowa) o.frequency.exponentialRampToValueAtTime(docelowa, t + d);
  g.gain.setValueAtTime(v || .05, t);
  g.gain.exponentialRampToValueAtTime(.0001, t + d);
  o.connect(g); g.connect(a.destination);
  o.start(t); o.stop(t + d);
}
function szum(d, v) {
  if (wyciszony) return;
  const a = kontekst(); if (!a) return;
  const n = a.sampleRate * d, bufor = a.createBuffer(1, n, a.sampleRate), c = bufor.getChannelData(0);
  for (let i = 0; i < n; i++) c[i] = (Math.random() * 2 - 1) * (1 - i / n);
  const s = a.createBufferSource(), g = a.createGain();
  g.gain.value = v || .15; s.buffer = bufor; s.connect(g); g.connect(a.destination); s.start();
}
const DZWIEKI = {
  klik: () => ton(900, .04, "square", .03),
  dobrze: () => { ton(660, .1, "triangle", .06); ton(990, .18, "triangle", .06, .1); },
  blad: () => ton(160, .25, "sawtooth", .07, 0, 70),
  alarm: () => { for (let i = 0; i < 3; i++) ton(880, .12, "square", .05, i * .2); },
  poczta: () => { ton(1200, .08, "sine", .05); ton(1600, .1, "sine", .05, .09); },
  wlamanie: () => { szum(.7, .3); ton(300, .7, "sawtooth", .12, 0, 40); },
  type: () => ton(1400 + Math.random() * 400, .02, "square", .02)
};
function startBrzeczenia() {
  stopBrzeczenia(); if (wyciszony) return;
  const a = kontekst(); if (!a) return;
  const o = a.createOscillator(), g = a.createGain();
  o.type = "sine"; o.frequency.value = 55; g.gain.value = .025;
  o.connect(g); g.connect(a.destination); o.start(); brzeczenie = o;
}
function stopBrzeczenia() { if (brzeczenie) { try { brzeczenie.stop(); } catch (e) {} brzeczenie = null; } }
