// WonderTales Children's Multi-Voice & Quotation Speech Synthesis Engine
// Features dynamic character pitch modulation, quotation detection, and multi-actor performances

export interface NarratorPersona {
  id: string;
  name: string;
  avatar: string;
  tagline: string;
  description: string;
  rateMultiplier: number;
  pitchMultiplier: number;
  samplePhrase: string;
  preferredVoices: string[];
  themeColor: string;
}

export const NARRATOR_PERSONAS: NarratorPersona[] = [
  {
    id: "grandma_willow",
    name: "Grandma Willow",
    avatar: "👵",
    tagline: "Warm & Cozy Bedtime Voice",
    description: "Soothing, gentle, and unhurried—like curling up under a soft patchwork quilt.",
    rateMultiplier: 0.88,
    pitchMultiplier: 0.95,
    samplePhrase: "Once upon a starry night, tucked in the sweetest bed, a little dream began to bloom...",
    preferredVoices: ["Google UK English Female", "Samantha", "Victoria", "en-GB-Standard-A", "en-US"],
    themeColor: "#E07A5F",
  },
  {
    id: "captain_barnaby",
    name: "Captain Barnaby",
    avatar: "🏴‍☠️",
    tagline: "High Seas Adventurer",
    description: "Hearty, bold, and enthusiastic—ready to set sail toward magical horizons!",
    rateMultiplier: 1.05,
    pitchMultiplier: 0.88,
    samplePhrase: "Ahoy there, matey! Grab your compass, because adventure awaits just around the bend!",
    preferredVoices: ["Google UK English Male", "Daniel", "Oliver", "Arthur", "en-GB"],
    themeColor: "#2A9D8F",
  },
  {
    id: "pip_pixie",
    name: "Pip the Pixie",
    avatar: "🧚",
    tagline: "Playful & Bubbly Friend",
    description: "Cheerful, giggly, and full of sparkly wonder!",
    rateMultiplier: 1.12,
    pitchMultiplier: 1.35,
    samplePhrase: "Yippee! Look at all those fluttering butterfly wings! Come on, let's explore together!",
    preferredVoices: ["Google US English", "Tessa", "Karen", "Nicky", "en-US"],
    themeColor: "#F4A261",
  },
  {
    id: "professor_owl",
    name: "Professor Barnaby Owl",
    avatar: "🦉",
    tagline: "Wise & Melodic Teacher",
    description: "Calm, thoughtful, and articulate—explaining the wonders of the world with kindness.",
    rateMultiplier: 0.92,
    pitchMultiplier: 1.0,
    samplePhrase: "Every grand oak tree in the forest was once just a tiny acorn with big dreams.",
    preferredVoices: ["Google UK English Male", "Fred", "George", "en-GB"],
    themeColor: "#457B9D",
  },
  {
    id: "luna_fairy",
    name: "Luna the Star Fairy",
    avatar: "🌙",
    tagline: "Whisper-Soft Lullaby",
    description: "Dreamy and soothing, perfect for evening quiet time and gentle slumber.",
    rateMultiplier: 0.82,
    pitchMultiplier: 1.15,
    samplePhrase: "Close your sleepy eyes, little star. The moon is watching over you tonight...",
    preferredVoices: ["Google US English", "Samantha", "Moira", "en-US"],
    themeColor: "#9B5DE5",
  },
  {
    id: "oliver_bear",
    name: "Oliver the Gentle Bear",
    avatar: "🐻",
    tagline: "Deep & Cuddly Hug",
    description: "Deep, reassuring, and warm as honey on fresh toast.",
    rateMultiplier: 0.9,
    pitchMultiplier: 0.78,
    samplePhrase: "Don't you worry, friend. We will walk through the tall meadow hand in paw.",
    preferredVoices: ["Google UK English Male", "Alex", "Daniel", "en-US"],
    themeColor: "#BC6C25",
  },
  {
    id: "felix_fox",
    name: "Felix the Fox",
    avatar: "🦊",
    tagline: "Clever & Witty Explorer",
    description: "Brisk, cheerful, and full of riddle clues and clever ideas!",
    rateMultiplier: 1.06,
    pitchMultiplier: 1.18,
    samplePhrase: "Psst! Did you spot that secret star hidden right beneath the mossy roots?",
    preferredVoices: ["Google US English", "Tessa", "Samantha", "en-US"],
    themeColor: "#E76F51",
  },
  {
    id: "leo_lion",
    name: "Leo the Lion Prince",
    avatar: "🦁",
    tagline: "Brave & Kind Protector",
    description: "Strong, warm, and uplifting—inspiring every child to be noble and courageous.",
    rateMultiplier: 0.94,
    pitchMultiplier: 0.84,
    samplePhrase: "Stand tall, little champion! Your kind heart has more courage than the fiercest wind!",
    preferredVoices: ["Google UK English Male", "Daniel", "Oliver", "en-GB"],
    themeColor: "#F39C12",
  },
  {
    id: "marina_dolphin",
    name: "Marina the Dolphin",
    avatar: "🐬",
    tagline: "Melodic Ocean Singer",
    description: "Bubbly, rhythmic, and sweet—like ocean waves singing to the golden coral reefs.",
    rateMultiplier: 1.02,
    pitchMultiplier: 1.28,
    samplePhrase: "Splish splash! Dive right in, the sparkling blue waves are singing our voyage song!",
    preferredVoices: ["Google UK English Female", "Victoria", "Karen", "en-GB"],
    themeColor: "#00A896",
  },
  {
    id: "merlin_wizard",
    name: "Merlin the Story Wizard",
    avatar: "🧙‍♂️",
    tagline: "Enchanted Story Wizard",
    description: "Whimsical, mystical, and grandfatherly—making every sentence glow like starlight.",
    rateMultiplier: 0.86,
    pitchMultiplier: 0.98,
    samplePhrase: "Hocus-pocus! Open the ancient page, and let magic unfold before our very eyes...",
    preferredVoices: ["Google UK English Male", "Fred", "George", "Alex", "en-GB"],
    themeColor: "#6A4C93",
  },
];

export interface SpokenSegment {
  id: string;
  text: string;
  speaker: string;
  speakerRole: "narrator" | "character";
  isQuotation: boolean;
  avatar: string;
  pitch: number;
  rate: number;
}

export interface SpeechNarratorOptions {
  onStart?: () => void;
  onSegmentStart?: (index: number, segment: SpokenSegment) => void;
  onWordBoundary?: (word: string, charIndex: number) => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

class SpeechNarratorService {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking = false;
  private isPaused = false;
  private currentSegmentIdx = 0;
  private segments: SpokenSegment[] = [];
  private persona: NarratorPersona = NARRATOR_PERSONAS[0];
  private userRate = 1.0;

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = () => {};
    }
  }

  public setPersona(personaId: string) {
    const found = NARRATOR_PERSONAS.find((p) => p.id === personaId);
    if (found) {
      this.persona = found;
    }
  }

  public getPersona(): NarratorPersona {
    return this.persona;
  }

  public setUserRate(rate: number) {
    this.userRate = Math.max(0.6, Math.min(1.8, rate));
  }

  public getUserRate(): number {
    return this.userRate;
  }

  private pickVoice(synth: SpeechSynthesis, isChildCharacter = false, isDeepCharacter = false): SpeechSynthesisVoice | null {
    const voices = synth.getVoices();
    if (!voices || voices.length === 0) return null;

    if (isChildCharacter) {
      const highVoice = voices.find(
        (v) =>
          v.name.includes("Victoria") ||
          v.name.includes("Samantha") ||
          v.name.includes("Karen") ||
          v.name.includes("Tessa")
      );
      if (highVoice) return highVoice;
    }

    if (isDeepCharacter) {
      const deepVoice = voices.find(
        (v) =>
          v.name.includes("Daniel") ||
          v.name.includes("Oliver") ||
          v.name.includes("Alex") ||
          v.name.includes("Fred")
      );
      if (deepVoice) return deepVoice;
    }

    // Default to preferred persona voice
    for (const pref of this.persona.preferredVoices) {
      const match = voices.find(
        (v) =>
          v.name.toLowerCase().includes(pref.toLowerCase()) ||
          v.lang.toLowerCase().includes(pref.toLowerCase())
      );
      if (match) return match;
    }

    const eng = voices.find((v) => v.lang.startsWith("en"));
    return eng || voices[0];
  }

  /**
   * Character pitch profiling based on speaker name & keywords
   */
  public getCharacterAcousticProfile(speaker: string, avatar = "🗣️"): { pitch: number; rate: number } {
    const lower = (speaker || "").toLowerCase();

    // Youthful / spunky / small creatures
    if (
      lower.includes("anansi") ||
      lower.includes("colibrí") ||
      lower.includes("colibri") ||
      lower.includes("pip") ||
      lower.includes("ntikuma") ||
      lower.includes("puffin") ||
      lower.includes("eel") ||
      lower.includes("moana") ||
      lower.includes("lars") ||
      lower.includes("child") ||
      lower.includes("boy") ||
      lower.includes("girl") ||
      lower.includes("sparrow") ||
      lower.includes("monkey") ||
      lower.includes("balam") ||
      lower.includes("quetzal") ||
      lower.includes("finbar") ||
      lower.includes("cub")
    ) {
      return { pitch: 1.34, rate: 1.08 };
    }

    // Big animals, ogres, deep characters
    if (
      lower.includes("tiddalik") ||
      lower.includes("ogre") ||
      lower.includes("bear") ||
      lower.includes("elephant") ||
      lower.includes("wombat") ||
      lower.includes("buffalo") ||
      lower.includes("condor") ||
      lower.includes("father") ||
      lower.includes("finegas")
    ) {
      return { pitch: 0.74, rate: 0.88 };
    }

    // Wise elders, mothers, fairies
    if (
      lower.includes("mother") ||
      lower.includes("grandmother") ||
      lower.includes("luna") ||
      lower.includes("elder") ||
      lower.includes("fairy") ||
      lower.includes("willow")
    ) {
      return { pitch: 1.15, rate: 0.92 };
    }

    // Default character line
    return { pitch: 1.2, rate: 1.02 };
  }

  /**
   * Parses mixed story text into narrator prose and character quotation segments
   */
  public parseStorySegments(narrativeText: string, dialogueLines: any[] = []): SpokenSegment[] {
    const result: SpokenSegment[] = [];

    // 1. Parse narrative text: detect quotation marks “...” or "..."
    // Example: She whispered: "Be brave, little one!" Then she smiled.
    const quoteRegex = /([“"][^”"]+[”"])/g;
    const parts = narrativeText.split(quoteRegex);

    parts.forEach((chunk, idx) => {
      const trimmed = chunk.trim();
      if (!trimmed) return;

      const isQuote = (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
                      (trimmed.startsWith('“') && trimmed.endsWith('”'));

      if (isQuote) {
        const cleanQuote = trimmed.replace(/[“"”]/g, "").trim();
        result.push({
          id: `quote-${idx}`,
          text: cleanQuote,
          speaker: "Character Voice",
          speakerRole: "character",
          isQuotation: true,
          avatar: "💬",
          pitch: 1.28,
          rate: 1.05,
        });
      } else {
        // Break long prose into child-friendly sentence chunks
        const sentences = trimmed.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || [trimmed];
        sentences.forEach((s, sIdx) => {
          const sentTrimmed = s.trim();
          if (sentTrimmed) {
            result.push({
              id: `narrator-${idx}-${sIdx}`,
              text: sentTrimmed,
              speaker: this.persona.name,
              speakerRole: "narrator",
              isQuotation: false,
              avatar: this.persona.avatar,
              pitch: this.persona.pitchMultiplier,
              rate: this.persona.rateMultiplier,
            });
          }
        });
      }
    });

    // 2. Append explicit character dialogue lines from the page spec
    dialogueLines.forEach((d, dIdx) => {
      const cleanText = (d.text || "").replace(/[“"”]/g, "").trim();
      const isNarrator = d.speakerRole === "narrator" || d.speaker?.toLowerCase().includes("narrator");
      const profile = isNarrator
        ? { pitch: this.persona.pitchMultiplier, rate: this.persona.rateMultiplier }
        : this.getCharacterAcousticProfile(d.speaker, d.avatar);

      result.push({
        id: `dialogue-${dIdx}`,
        text: cleanText,
        speaker: d.speaker || "Speaker",
        speakerRole: isNarrator ? "narrator" : "character",
        isQuotation: !isNarrator,
        avatar: d.avatar || (isNarrator ? this.persona.avatar : "🗣️"),
        pitch: profile.pitch,
        rate: profile.rate,
      });
    });

    return result;
  }

  /**
   * Speak structured story segments with dynamic pitch modulation per character
   */
  public speakStory(segments: SpokenSegment[], options: SpeechNarratorOptions = {}) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      options.onError?.(new Error("Speech synthesis is not supported on this browser"));
      return;
    }

    const synth = window.speechSynthesis;
    this.stop();

    this.segments = segments;
    if (this.segments.length === 0) {
      options.onEnd?.();
      return;
    }

    this.currentSegmentIdx = 0;
    this.isSpeaking = true;
    this.isPaused = false;
    options.onStart?.();

    const speakNext = () => {
      if (!this.isSpeaking) return;

      if (this.currentSegmentIdx >= this.segments.length) {
        this.isSpeaking = false;
        options.onEnd?.();
        return;
      }

      const segment = this.segments[this.currentSegmentIdx];
      options.onSegmentStart?.(this.currentSegmentIdx, segment);

      const utterance = new SpeechSynthesisUtterance(segment.text);

      const isChild = segment.pitch > 1.25;
      const isDeep = segment.pitch < 0.85;
      const voice = this.pickVoice(synth, isChild, isDeep);
      if (voice) utterance.voice = voice;

      utterance.pitch = segment.pitch;
      utterance.rate = segment.rate * this.userRate;

      utterance.onboundary = (event) => {
        if (event.name === "word") {
          const word = segment.text.substring(event.charIndex, event.charIndex + (event.charLength || 6));
          options.onWordBoundary?.(word, event.charIndex);
        }
      };

      utterance.onend = () => {
        if (this.isSpeaking) {
          this.currentSegmentIdx++;
          // Natural expressive breath pause between character dialogue & narration (260ms)
          setTimeout(speakNext, segment.isQuotation ? 320 : 220);
        }
      };

      utterance.onerror = (err) => {
        if (err.error !== "canceled" && err.error !== "interrupted") {
          options.onError?.(err);
        }
      };

      this.currentUtterance = utterance;
      synth.speak(utterance);
    };

    speakNext();
  }

  /**
   * Speak single isolated line or quote (e.g. clicking a quote or character card)
   */
  public speakSingleLine(text: string, speaker = "Character", avatar = "💬", onEnd?: () => void) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    this.stop();

    const clean = text.replace(/[“"”]/g, "").trim();
    const profile = this.getCharacterAcousticProfile(speaker, avatar);

    const utterance = new SpeechSynthesisUtterance(clean);
    const voice = this.pickVoice(synth, profile.pitch > 1.25, profile.pitch < 0.85);
    if (voice) utterance.voice = voice;

    utterance.pitch = profile.pitch;
    utterance.rate = profile.rate * this.userRate;

    utterance.onend = () => onEnd?.();
    utterance.onerror = () => onEnd?.();

    this.currentUtterance = utterance;
    synth.speak(utterance);
  }

  /**
   * Speak an individual word clearly for phonics learning in 'Read By Myself' mode
   */
  public speakWord(word: string, onEnd?: () => void) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    this.stop();

    const clean = word.replace(/[^a-zA-Z0-9'-]/g, "").trim();
    if (!clean) return;

    const utterance = new SpeechSynthesisUtterance(clean);
    const voice = this.pickVoice(synth, false, false);
    if (voice) utterance.voice = voice;

    utterance.pitch = 1.1;
    utterance.rate = 0.85; // deliberate, articulate phonics pacing

    utterance.onend = () => onEnd?.();
    utterance.onerror = () => onEnd?.();

    this.currentUtterance = utterance;
    synth.speak(utterance);
  }

  public speakSentences(text: string, options: SpeechNarratorOptions = {}) {
    const segments = this.parseStorySegments(text);
    this.speakStory(segments, options);
  }

  public testPersona(personaId: string, onEnd?: () => void) {
    const found = NARRATOR_PERSONAS.find((p) => p.id === personaId);
    if (!found) return;
    this.setPersona(personaId);
    this.speakSingleLine(found.samplePhrase, found.name, found.avatar, onEnd);
  }

  public pause() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.pause();
      this.isPaused = true;
    }
  }

  public resume() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.resume();
      this.isPaused = false;
    }
  }

  public stop() {
    this.isSpeaking = false;
    this.isPaused = false;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    this.currentUtterance = null;
  }

  public getStatus() {
    return {
      isSpeaking: this.isSpeaking,
      isPaused: this.isPaused,
      currentSegmentIdx: this.currentSegmentIdx,
      totalSegments: this.segments.length,
    };
  }
}

export const speechNarrator = new SpeechNarratorService();
