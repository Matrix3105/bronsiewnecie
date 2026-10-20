'use strict';

/* ==========================================================
   4. DŹWIĘK
   ========================================================== */
let AC = null, muted = false, hum = null;

function ac() {
  if (!AC) { try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} }
  if (AC && AC.state === "suspended") AC.resume();
  return AC;
}
function tone(f, d, type, v, delay, to) {
  if (muted) return;
  const a = ac(); if (!a) return;
  const t = a.currentTime + (delay || 0), o = a.createOscillator(), g = a.createGain();
  o.type = type || "square";
  o.frequency.setValueAtTime(f, t);
  if (to) o.frequency.exponentialRampToValueAtTime(to, t + d);
  g.gain.setValueAtTime(v || .05, t);
  g.gain.exponentialRampToValueAtTime(.0001, t + d);
  o.connect(g); g.connect(a.destination);
  o.start(t); o.stop(t + d);
}
function noise(d, v) {
  if (muted) return;
  const a = ac(); if (!a) return;
  const n = a.sampleRate * d, buf = a.createBuffer(1, n, a.sampleRate), c = buf.getChannelData(0);
  for (let i = 0; i < n; i++) c[i] = (Math.random() * 2 - 1) * (1 - i / n);
  const s = a.createBufferSource(), g = a.createGain();
  g.gain.value = v || .15; s.buffer = buf; s.connect(g); g.connect(a.destination); s.start();
}
const SFX = {
  click:  () => tone(900, .04, "square", .03),
  ok:     () => { tone(660, .1, "triangle", .06); tone(990, .18, "triangle", .06, .1); },
  bad:    () => tone(160, .25, "sawtooth", .07, 0, 70),
  alarm:  () => { for (let i = 0; i < 3; i++) tone(880, .12, "square", .05, i * .2); },
  mail:   () => { tone(1200, .08, "sine", .05); tone(1600, .1, "sine", .05, .09); },
  breach: () => { noise(.7, .3); tone(300, .7, "sawtooth", .12, 0, 40); },
  type:   () => tone(1400 + Math.random() * 400, .02, "square", .02)
};
function startHum() {
  stopHum(); if (muted) return;
  const a = ac(); if (!a) return;
  const o = a.createOscillator(), g = a.createGain();
  o.type = "sine"; o.frequency.value = 55; g.gain.value = .025;
  o.connect(g); g.connect(a.destination); o.start(); hum = o;
}
function stopHum() { if (hum) { try { hum.stop(); } catch (e) {} hum = null; } }
