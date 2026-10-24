// Procedural Web Audio API sound effects and ambient lullaby generator
// 100% self-contained, instant playback, zero external network dependencies

let audioCtx: AudioContext | null = null;
let sfxMasterVolume = 0.75;
let musicMasterVolume = 0.28;

let sleepTimerId: number | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioCtx) {
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function setSfxVolume(v: number) {
  sfxMasterVolume = Math.max(0, Math.min(1, v));
}

export function getSfxVolume(): number {
  return sfxMasterVolume;
}

export function setMusicVolume(v: number) {
  musicMasterVolume = Math.max(0, Math.min(1, v));
  if (activeAmbientMusic) {
    activeAmbientMusic.setVolume(musicMasterVolume);
  }
}

export function getMusicVolume(): number {
  return musicMasterVolume;
}

/**
 * Realistic crisp paper page-turn rustle sound.
 * Uses filtered white noise with an envelope mimicking the friction of turning a heavy book folio.
 */
export function playPageTurnSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx || sfxMasterVolume <= 0) return;

    const bufferSize = ctx.sampleRate * 0.35; // 350ms duration
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.45;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1400, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.32);
    filter.Q.value = 1.4;

    const gain = ctx.createGain();
    const peak = 0.35 * sfxMasterVolume;
    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(peak, ctx.currentTime + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.34);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    noise.stop(ctx.currentTime + 0.35);
  } catch (err) {
    console.debug("Page turn sound error:", err);
  }
}

/**
 * Cheerful magical chime (celesta/glockenspiel note) for child interactions
 */
export function playChimeSound(freq = 659.25) {
  try {
    const ctx = getAudioContext();
    if (!ctx || sfxMasterVolume <= 0) return;

    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(freq * 2, ctx.currentTime);

    const peak = 0.2 * sfxMasterVolume;
    gain.gain.setValueAtTime(peak, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.65);

    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc2.start();
    osc.stop(ctx.currentTime + 0.65);
    osc2.stop(ctx.currentTime + 0.65);
  } catch (err) {
    console.debug("Chime sound error:", err);
  }
}

/**
 * Star sparkle sound when child discovers a hidden star or clicks an illustration
 */
export function playSparkleSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx || sfxMasterVolume <= 0) return;

    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5, E5, G5, C6, E6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.setValueAtTime(0.14 * sfxMasterVolume, ctx.currentTime + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.06 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.06);
      osc.stop(ctx.currentTime + idx * 0.06 + 0.4);
    });
  } catch (err) {
    console.debug("Sparkle sound error:", err);
  }
}

/**
 * Joyful Fanfare for story completion and unlocking passport badges
 */
export function playFanfareSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx || sfxMasterVolume <= 0) return;

    // C - E - G - C major chord fanfare
    const chords = [
      { f: 523.25, t: 0, d: 0.18 },
      { f: 659.25, t: 0.12, d: 0.18 },
      { f: 783.99, t: 0.24, d: 0.22 },
      { f: 1046.5, t: 0.38, d: 0.75 },
    ];

    chords.forEach(({ f, t, d }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(f, ctx.currentTime + t);

      gain.gain.setValueAtTime(0.01, ctx.currentTime + t);
      gain.gain.linearRampToValueAtTime(0.22 * sfxMasterVolume, ctx.currentTime + t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + t + d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + t);
      osc.stop(ctx.currentTime + t + d);
    });
  } catch (err) {
    console.debug("Fanfare error:", err);
  }
}

/**
 * Gentle resonant singing bowl / bedtime chime
 */
export function playBedtimeChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx || sfxMasterVolume <= 0) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(261.63, ctx.currentTime); // C4

    gain.gain.setValueAtTime(0.25 * sfxMasterVolume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 2.5);
  } catch {}
}

/**
 * Friendly animal roar / rumble sound effect
 */
export function playRoarSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx || sfxMasterVolume <= 0) return;

    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 0.55);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(320, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.55);

    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3 * sfxMasterVolume, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.58);
  } catch {}
}

/**
 * Water bubble / splash sound effect
 */
export function playSplashSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx || sfxMasterVolume <= 0) return;

    const freqs = [350, 520, 780, 420];
    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(f, ctx.currentTime + idx * 0.05);
      osc.frequency.exponentialRampToValueAtTime(f * 1.8, ctx.currentTime + idx * 0.05 + 0.12);

      gain.gain.setValueAtTime(0.18 * sfxMasterVolume, ctx.currentTime + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.05 + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.05);
      osc.stop(ctx.currentTime + idx * 0.05 + 0.2);
    });
  } catch {}
}

/**
 * Whispering wind breeze sound effect
 */
export function playWindBreezeSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx || sfxMasterVolume <= 0) return;

    const bufferSize = ctx.sampleRate * 0.8;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(600, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.4);
    filter.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 0.78);
    filter.Q.value = 3.2;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.25 * sfxMasterVolume, ctx.currentTime + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.78);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    noise.stop(ctx.currentTime + 0.8);
  } catch {}
}

/**
 * Serene temple bell chime
 */
export function playBellChimeSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx || sfxMasterVolume <= 0) return;

    const freqs = [880, 1760, 2640];
    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(f, ctx.currentTime);

      gain.gain.setValueAtTime((0.2 / (idx + 1)) * sfxMasterVolume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.6);
    });
  } catch {}
}

/**
 * Playful giggle sound (bouncy pitch wobbler)
 */
export function playGiggleSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx || sfxMasterVolume <= 0) return;

    const giggles = [
      { f: 580, t: 0 },
      { f: 720, t: 0.08 },
      { f: 650, t: 0.16 },
      { f: 820, t: 0.24 },
      { f: 700, t: 0.32 },
    ];

    giggles.forEach(({ f, t }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(f, ctx.currentTime + t);
      osc.frequency.linearRampToValueAtTime(f + 80, ctx.currentTime + t + 0.06);

      gain.gain.setValueAtTime(0.16 * sfxMasterVolume, ctx.currentTime + t);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.075);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + t);
      osc.stop(ctx.currentTime + t + 0.08);
    });
  } catch {}
}

/**
 * Crisp gentle blip for tapping individual phonics words
 */
export function playPhonicsBlipSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx || sfxMasterVolume <= 0) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.18 * sfxMasterVolume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.11);
  } catch {}
}

/**
 * Joyous celebration sound when child answers the cultural riddle correctly
 */
export function playCorrectAnswerSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx || sfxMasterVolume <= 0) return;

    // Fast arpeggiated sparkle: C5 - E5 - G5 - B5 - C6
    const notes = [523.25, 659.25, 783.99, 987.77, 1046.5];
    notes.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.07);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.setValueAtTime(0.2 * sfxMasterVolume, ctx.currentTime + i * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.07 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + i * 0.07);
      osc.stop(ctx.currentTime + i * 0.07 + 0.45);
    });
  } catch {}
}

/**
 * Cheerful birdsong tweet sound for nature & storyboards
 */
export function playBirdChirpSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx || sfxMasterVolume <= 0) return;

    const chirps = [
      { startF: 2200, endF: 3100, t: 0, dur: 0.08 },
      { startF: 3200, endF: 2400, t: 0.09, dur: 0.09 },
      { startF: 2600, endF: 3500, t: 0.2, dur: 0.1 },
    ];

    chirps.forEach(({ startF, endF, t, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(startF, ctx.currentTime + t);
      osc.frequency.exponentialRampToValueAtTime(endF, ctx.currentTime + t + dur);

      gain.gain.setValueAtTime(0.18 * sfxMasterVolume, ctx.currentTime + t);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + t);
      osc.stop(ctx.currentTime + t + dur + 0.02);
    });
  } catch {}
}

/**
 * Resonant African / tribal djembe drum beat
 */
export function playDrumBeatSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx || sfxMasterVolume <= 0) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.22);

    gain.gain.setValueAtTime(0.4 * sfxMasterVolume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch {}
}

/**
 * Gentle Celtic harp arpeggio
 */
export function playHarpStrumSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx || sfxMasterVolume <= 0) return;

    const freqs = [392.0, 493.88, 587.33, 739.99, 880.0]; // G Major
    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(f, ctx.currentTime + idx * 0.06);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.setValueAtTime(0.2 * sfxMasterVolume, ctx.currentTime + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.06 + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.06);
      osc.stop(ctx.currentTime + idx * 0.06 + 0.95);
    });
  } catch {}
}

/**
 * Ascending magic wand sparkle glissando
 */
export function playMagicWandSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx || sfxMasterVolume <= 0) return;

    const glissNotes = [523.25, 659.25, 783.99, 1046.5, 1318.5, 1567.98, 2093.0];
    glissNotes.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(f, ctx.currentTime + idx * 0.045);

      gain.gain.setValueAtTime(0.18 * sfxMasterVolume, ctx.currentTime + idx * 0.045);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.045 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.045);
      osc.stop(ctx.currentTime + idx * 0.045 + 0.4);
    });
  } catch {}
}

/**
 * Cozy campfire crackle pop
 */
export function playCampfireCrackleSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx || sfxMasterVolume <= 0) return;

    for (let i = 0; i < 4; i++) {
      const delay = i * 0.08 + Math.random() * 0.04;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(800 + Math.random() * 600, ctx.currentTime + delay);

      gain.gain.setValueAtTime(0.08 * sfxMasterVolume, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.04);
    }
  } catch {}
}

// Procedural Ambient Music Generator
export type MusicTheme = "lullaby" | "forest" | "meadow" | "ocean" | "rainforest" | "starlight" | "none";

interface AmbientMusicController {
  stop: () => void;
  setVolume: (v: number) => void;
}

let activeAmbientMusic: AmbientMusicController | null = null;

export function startAmbientMusic(theme: MusicTheme = "lullaby", initialVolume = musicMasterVolume): AmbientMusicController {
  stopAmbientMusic();

  if (theme === "none") {
    return { stop: () => {}, setVolume: () => {} };
  }

  const ctx = getAudioContext();
  if (!ctx) {
    return { stop: () => {}, setVolume: () => {} };
  }

  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(initialVolume, ctx.currentTime);
  masterGain.connect(ctx.destination);

  let isPlaying = true;
  let intervalId: number | null = null;

  // Scales tailored for children
  const scales: Record<string, number[]> = {
    lullaby: [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25], // C Major Pentatonic / Lullaby
    forest: [220.0, 261.63, 293.66, 329.63, 392.0, 440.0, 523.25], // A Minor Pentatonic / Forest Breeze
    meadow: [293.66, 329.63, 369.99, 440.0, 493.88, 587.33], // D Major / Sunny Meadow
    ocean: [196.0, 246.94, 293.66, 329.63, 392.0, 493.88], // G Major 7th / Floating Ocean
    rainforest: [261.63, 311.13, 349.23, 392.0, 466.16, 523.25], // C Dorian / Tropical Rainforest
    starlight: [329.63, 392.0, 493.88, 587.33, 659.25, 783.99], // E Minor Pentatonic / Cosmic Starlight
  };

  const scale = scales[theme] || scales.lullaby;

  const rootFreq = scale[0];
  const fifthFreq = scale[3] || rootFreq * 1.5;

  const drone1 = ctx.createOscillator();
  const drone2 = ctx.createOscillator();
  const droneFilter = ctx.createBiquadFilter();
  const droneGain = ctx.createGain();

  drone1.type = "sine";
  drone1.frequency.value = rootFreq / 2;
  drone2.type = "triangle";
  drone2.frequency.value = fifthFreq / 2;

  droneFilter.type = "lowpass";
  droneFilter.frequency.value = 380;

  droneGain.gain.value = 0.08;

  drone1.connect(droneFilter);
  drone2.connect(droneFilter);
  droneFilter.connect(droneGain);
  droneGain.connect(masterGain);

  drone1.start();
  drone2.start();

  function playNote(freq: number) {
    if (!ctx || !isPlaying) return;
    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();

    osc.type = theme === "lullaby" ? "sine" : "triangle";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    noteGain.gain.setValueAtTime(0, ctx.currentTime);
    noteGain.gain.linearRampToValueAtTime(0.09, ctx.currentTime + 0.1);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);

    osc.connect(noteGain);
    noteGain.connect(masterGain);

    osc.start();
    osc.stop(ctx.currentTime + 2.0);
  }

  let step = 0;
  intervalId = window.setInterval(() => {
    if (!isPlaying) return;
    const noteIdx = Math.floor(Math.random() * scale.length);
    playNote(scale[noteIdx]);
    step++;

    if (step % 2 === 0) {
      const harmIdx = (noteIdx + 2) % scale.length;
      setTimeout(() => {
        if (isPlaying) playNote(scale[harmIdx] * 1.5);
      }, 400);
    }
  }, 1450);

  const controller: AmbientMusicController = {
    stop: () => {
      isPlaying = false;
      if (intervalId) clearInterval(intervalId);
      try {
        droneGain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
        setTimeout(() => {
          drone1.stop();
          drone2.stop();
          drone1.disconnect();
          drone2.disconnect();
        }, 550);
      } catch {}
      if (activeAmbientMusic === controller) {
        activeAmbientMusic = null;
      }
    },
    setVolume: (v: number) => {
      if (ctx) {
        masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, v)), ctx.currentTime);
      }
    },
  };

  activeAmbientMusic = controller;
  return controller;
}

export function stopAmbientMusic() {
  if (activeAmbientMusic) {
    activeAmbientMusic.stop();
    activeAmbientMusic = null;
  }
}

/**
 * Bedtime Sleep Timer
 */
export function setBedtimeSleepTimer(minutes: number, onTimerExpired?: () => void) {
  clearBedtimeSleepTimer();
  if (minutes <= 0) return;

  const ms = minutes * 60 * 1000;
  sleepTimerId = window.setTimeout(() => {
    stopAmbientMusic();
    onTimerExpired?.();
    sleepTimerId = null;
  }, ms);
}

export function clearBedtimeSleepTimer() {
  if (sleepTimerId) {
    window.clearTimeout(sleepTimerId);
    sleepTimerId = null;
  }
}
