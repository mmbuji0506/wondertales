// WonderTales: Children's Stories From Around The World
// Every story has 4 full pages with bespoke, colorful illustrations, child-friendly vocabulary, dialogue lines, and hidden star quests.

export interface StoryVocabularyWord {
  word: string;
  pronunciation: string;
  definition: string;
  funFact: string;
}

export interface ChildrenDialogueLine {
  speaker: string;
  speakerRole: "narrator" | "character";
  avatar: string;
  text: string;
  voiceName: string;
  mood: string;
}

export interface ChildrenStoryPage {
  pageNumber: number;
  chapterTitle: string;
  scenePrompt: string;
  narrativeText: string;
  dialogueLines: ChildrenDialogueLine[];
  illustrationSvg: string; // Tailored colorful SVG illustration
  illustrationCaption: string;
  vocabulary: StoryVocabularyWord[];
  hiddenStar: { xPercent: number; yPercent: number; clue: string };
  funActivity: string;
}

export interface ChildrenStory {
  id: string;
  title: string;
  subtitle: string;
  region: string;
  country: string;
  flag: string;
  culture: string;
  ageRange: string;
  readTimeMinutes: number;
  theme: string;
  moral: string;
  coverCloth: string;
  coverSpine: string;
  accentColor: string;
  paperColor: string;
  cardColor: string;
  coverSvg: string;
  summary: string;
  pages: ChildrenStoryPage[];
}

export const CHILDREN_STORIES: ChildrenStory[] = [
  // ---------------------------------------------------------------------------
  // STORY 1: Anansi and the Pot of Wisdom (Ghana / West Africa)
  // ---------------------------------------------------------------------------
  {
    id: "anansi_pot_of_wisdom",
    title: "Anansi and the Pot of Wisdom",
    subtitle: "A Ashanti Folktale from the Forests of Ghana",
    region: "West Africa",
    country: "Ghana",
    flag: "🇬🇭",
    culture: "Ashanti",
    ageRange: "4–9 years",
    readTimeMinutes: 5,
    theme: "Sharing & Humility",
    moral: "Wisdom is meant to be shared with everyone, not hoarded in a secret jar.",
    coverCloth: "#D97706", // Warm terracotta ochre
    coverSpine: "#92400E",
    accentColor: "#D97706",
    paperColor: "#FFFDF7",
    cardColor: "#FEF3C7",
    summary:
      "Kwaku Anansi the clever spider thought he could gather all the world's wisdom into a clay pot just for himself. But when he tries to hide it at the top of a giant baobab tree, he learns the sweetest lesson about sharing.",
    coverSvg: `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="anansiCoverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#F59E0B" />
          <stop offset="60%" stop-color="#D97706" />
          <stop offset="100%" stop-color="#78350F" />
        </linearGradient>
        <radialGradient id="sunGlow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stop-color="#FEF08A" stop-opacity="0.9" />
          <stop offset="60%" stop-color="#F59E0B" stop-opacity="0.4" />
          <stop offset="100%" stop-color="#D97706" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill="url(#anansiCoverGrad)" />
      <circle cx="400" cy="220" r="210" fill="url(#sunGlow)" />
      <!-- Giant Baobab Silhouette -->
      <path d="M 320 500 C 330 380 340 310 270 240 C 230 200 150 200 130 150 C 180 140 240 170 300 200 C 330 150 290 80 340 50 C 370 100 370 170 390 190 C 430 140 440 70 480 80 C 470 140 430 190 420 220 C 480 180 570 160 620 180 C 580 220 500 220 450 260 C 430 330 460 410 480 500 Z" fill="#451A03" opacity="0.92" />
      <!-- Clay pot with glowing stars -->
      <ellipse cx="400" cy="340" rx="65" ry="50" fill="#B45309" stroke="#FEF08A" stroke-width="4" />
      <ellipse cx="400" cy="305" rx="35" ry="14" fill="#78350F" stroke="#FEF08A" stroke-width="2" />
      <!-- Anansi Spider Silhouette -->
      <circle cx="395" cy="280" r="16" fill="#1C1917" />
      <circle cx="395" cy="265" r="11" fill="#1C1917" />
      <path d="M 388 275 Q 360 255 350 280 M 388 280 Q 355 275 345 300 M 402 275 Q 430 255 440 280 M 402 280 Q 435 275 445 300" stroke="#1C1917" stroke-width="4" stroke-linecap="round" fill="none" />
      <!-- Golden sparks flying -->
      <circle cx="380" cy="230" r="6" fill="#FEF08A" />
      <circle cx="430" cy="210" r="7" fill="#FDE047" />
      <circle cx="470" cy="240" r="5" fill="#FEF08A" />
      <circle cx="320" cy="210" r="5" fill="#FEF08A" />
    </svg>`,
    pages: [
      {
        pageNumber: 1,
        chapterTitle: "Chapter 1: The Greedy Little Idea",
        scenePrompt: "Anansi in his warm Ashanti village house, holding a round clay pot under golden sunset skies.",
        narrativeText:
          "In the golden grasslands of Ghana, long before books were written on paper, stories and ideas flew on the breeze like colorful weaver birds. Anansi the spider, with his eight quick legs and twinkling eyes, had a clever thought: 'If I collect all the wisdom of the earth into this big clay pot, I will be the smartest creature in the whole wide world!' So he scurried from village to village, asking the elders for their best secrets and stuffing them snugly inside.",
        dialogueLines: [
          {
            speaker: "Narrator",
            speakerRole: "narrator",
            avatar: "📖",
            text: "Long ago beneath the sunny acacia trees, clever Anansi had an enormous ambition.",
            voiceName: "Grandma Willow",
            mood: "warm",
          },
          {
            speaker: "Anansi",
            speakerRole: "character",
            avatar: "🕷️",
            text: "Every bright idea, every clever puzzle, and every wise song will belong to ME!",
            voiceName: "Pip the Pixie",
            mood: "excited",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="skyGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#FBBF24" />
              <stop offset="45%" stop-color="#F97316" />
              <stop offset="100%" stop-color="#EA580C" />
            </linearGradient>
            <linearGradient id="groundGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#A16207" />
              <stop offset="100%" stop-color="#713F12" />
            </linearGradient>
          </defs>
          <rect width="800" height="420" fill="url(#skyGrad1)" />
          <rect y="420" width="800" height="180" fill="url(#groundGrad1)" />
          <!-- African Sun -->
          <circle cx="680" cy="140" r="90" fill="#FEF08A" opacity="0.9" />
          <circle cx="680" cy="140" r="140" fill="#FEF08A" opacity="0.25" />
          <!-- Village Hut -->
          <polygon points="120,420 280,420 260,320 140,320" fill="#92400E" />
          <polygon points="90,320 310,320 200,210" fill="#CA8A04" stroke="#78350F" stroke-width="4" />
          <!-- Anansi the Spider on a Wooden Stool -->
          <ellipse cx="440" cy="400" rx="36" ry="26" fill="#1C1917" />
          <circle cx="435" cy="375" r="18" fill="#1C1917" />
          <!-- Cute big eyes -->
          <circle cx="428" cy="370" r="5" fill="#FFFFFF" />
          <circle cx="429" cy="370" r="2.5" fill="#1C1917" />
          <circle cx="439" cy="370" r="5" fill="#FFFFFF" />
          <circle cx="440" cy="370" r="2.5" fill="#1C1917" />
          <!-- Big Clay Pot glowing -->
          <ellipse cx="530" cy="390" rx="55" ry="46" fill="#EA580C" stroke="#FEF08A" stroke-width="5" />
          <ellipse cx="530" cy="355" rx="32" ry="12" fill="#7C2D12" stroke="#FEF08A" stroke-width="3" />
          <path d="M 515 330 Q 530 300 545 325 Q 560 305 570 340" stroke="#FDE047" stroke-width="4" fill="none" stroke-linecap="round" />
          <!-- Glowing wisdom sparks -->
          <polygon points="530,290 535,302 548,303 538,312 541,324 530,317 519,324 522,312 512,303 525,302" fill="#FEF08A" />
          <polygon points="580,260 583,269 592,270 585,276 587,285 580,280 573,285 575,276 568,270 577,269" fill="#FDE047" />
        </svg>`,
        illustrationCaption: "Anansi smiling at his round clay pot as bright sparks of wisdom dance into the brim.",
        vocabulary: [
          {
            word: "Ashanti",
            pronunciation: "ah-SHAHN-tee",
            definition: "A famous, historic kingdom and people of Ghana known for rich gold, woven Kente cloth, and folk wisdom.",
            funFact: "Ashanti storytellers are called Jali or Griots, and they keep history alive through song!",
          },
          {
            word: "Wisdom",
            pronunciation: "WIZ-dum",
            definition: "The special understanding of how to make kind, smart choices and help others.",
            funFact: "In West Africa, spider stories are called Anansesem, meaning 'spider tales.'",
          },
        ],
        hiddenStar: { xPercent: 72, yPercent: 43, clue: "Look near the glowing golden wisdom pot!" },
        funActivity: "Ask someone in your family: 'What is the kindest piece of advice someone ever gave you?'",
      },
      {
        pageNumber: 2,
        chapterTitle: "Chapter 2: The Mighty Baobab Tree",
        scenePrompt: "Anansi walking toward an immense, ancient Baobab tree with thick twisted branches touching the clouds.",
        narrativeText:
          "Now that the pot was completely full, Anansi grew nervous. 'What if someone sneaks into my cottage while I am napping and takes a cup of my wisdom?' he thought. So he tied a strong grass rope around the pot, slung it over his belly, and marched out toward the grandmother of all trees: the ancient Baobab. Its trunk was as wide as ten elephants standing side by side, and its highest branches tickled the afternoon clouds.",
        dialogueLines: [
          {
            speaker: "Narrator",
            speakerRole: "narrator",
            avatar: "📖",
            text: "The giant baobab was older than memory itself, sheltering leopards and singing birds.",
            voiceName: "Grandma Willow",
            mood: "mysterious",
          },
          {
            speaker: "Anansi",
            speakerRole: "character",
            avatar: "🕷️",
            text: "Up at the very tippy-top, no one will ever find my treasure!",
            voiceName: "Pip the Pixie",
            mood: "determined",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="skyGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#38BDF8" />
              <stop offset="60%" stop-color="#BAE6FD" />
              <stop offset="100%" stop-color="#FED7AA" />
            </linearGradient>
            <linearGradient id="savannahGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#84CC16" />
              <stop offset="100%" stop-color="#4D7C0F" />
            </linearGradient>
          </defs>
          <rect width="800" height="460" fill="url(#skyGrad2)" />
          <rect y="460" width="800" height="140" fill="url(#savannahGrad)" />
          <!-- Distant Acacia -->
          <path d="M 100 460 Q 110 390 120 370 Q 70 350 50 360 Q 120 330 190 350 Q 140 380 130 460 Z" fill="#3F6212" opacity="0.6" />
          <!-- Massive Baobab Trunk -->
          <path d="M 440 600 C 430 430 410 320 320 220 C 260 160 170 140 140 80 C 210 80 270 120 330 160 C 370 110 340 40 400 20 C 440 80 440 140 470 170 C 530 110 560 50 630 60 C 600 130 540 170 510 210 C 580 190 690 170 760 190 C 700 240 600 250 540 310 C 520 420 540 510 570 600 Z" fill="#78350F" />
          <!-- Baobab Lush Green Foliage Crown -->
          <ellipse cx="230" cy="90" rx="90" ry="40" fill="#65A30D" />
          <ellipse cx="400" cy="40" rx="110" ry="45" fill="#4D7C0F" />
          <ellipse cx="610" cy="70" rx="100" ry="40" fill="#65A30D" />
          <ellipse cx="720" cy="180" rx="75" ry="35" fill="#4D7C0F" />
          <!-- Anansi marching with rope tied to pot on stomach -->
          <ellipse cx="240" cy="490" rx="20" ry="14" fill="#1C1917" />
          <circle cx="235" cy="475" r="10" fill="#1C1917" />
          <!-- Spider legs -->
          <path d="M 235 485 Q 215 470 205 495 M 245 485 Q 265 470 275 495" stroke="#1C1917" stroke-width="3" fill="none" />
          <!-- Pot tied on belly -->
          <ellipse cx="260" cy="485" rx="18" ry="15" fill="#EA580C" stroke="#FEF08A" stroke-width="2" />
        </svg>`,
        illustrationCaption: "The great grandmother baobab tree towering high above the emerald grassy plains.",
        vocabulary: [
          {
            word: "Baobab",
            pronunciation: "BAY-oh-bab",
            definition: "An incredible tree in Africa that can live for over 1,000 years and store water inside its huge trunk.",
            funFact: "Baobab fruit is packed with vitamin C and is called 'monkey bread' because baboons adore it!",
          },
          {
            word: "Acacia",
            pronunciation: "uh-KAY-shuh",
            definition: "A classic African tree with a flat umbrella-shaped top where giraffes love to nibble leaves.",
            funFact: "Acacia trees use sweet nectar to invite ants to live on them and protect them from pests!",
          },
        ],
        hiddenStar: { xPercent: 51, yPercent: 6, clue: "Check the lush green canopy at the very top of the tree!" },
        funActivity: "Can you stretch your arms up as high as a baobab tree touching the clouds?",
      },
      {
        pageNumber: 3,
        chapterTitle: "Chapter 3: The Little Boy's Advice",
        scenePrompt: "Anansi struggling against the rough bark while his young son watches and smiles with open hands.",
        narrativeText:
          "Anansi leaped onto the trunk and tried to scurry upward. Scritch-scratch! But because the big clay pot was strapped tightly to his belly, he could not hug the tree trunk. His knees bumped into the clay, his eight elbows wobbled, and he slid right back down into the dirt. Just then, his little son Ntikuma peeked out from behind a bush. 'Papa!' the boy giggled politely. 'Wouldn't it be much easier to climb if you tied the pot onto your back instead of your belly?'",
        dialogueLines: [
          {
            speaker: "Ntikuma",
            speakerRole: "character",
            avatar: "👦🏾",
            text: "Papa! Tie the pot onto your back, and your arms will be free to climb!",
            voiceName: "Captain Barnaby",
            mood: "cheerful",
          },
          {
            speaker: "Anansi",
            speakerRole: "character",
            avatar: "🕷️",
            text: "What?! Here I am holding all the wisdom in the world, and my own boy has a better idea than me?!",
            voiceName: "Pip the Pixie",
            mood: "shocked",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="skyGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#FEF08A" />
              <stop offset="50%" stop-color="#FDE047" />
              <stop offset="100%" stop-color="#F97316" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#skyGrad3)" />
          <!-- Close up Baobab Trunk on Left -->
          <rect x="0" y="0" width="300" height="600" fill="#78350F" />
          <path d="M 60 0 C 80 200 40 400 70 600 M 160 0 C 130 180 180 390 140 600 M 230 0 C 260 220 220 440 250 600" stroke="#542306" stroke-width="8" fill="none" />
          <!-- Anansi awkwardly stuck on the trunk -->
          <g transform="translate(260, 260)">
            <ellipse cx="0" cy="0" rx="30" ry="22" fill="#1C1917" />
            <circle cx="10" cy="-20" r="14" fill="#1C1917" />
            <!-- Confused eyes -->
            <circle cx="5" cy="-24" r="4" fill="#FFFFFF" /><circle cx="6" cy="-24" r="2" fill="#000" />
            <circle cx="15" cy="-24" r="4" fill="#FFFFFF" /><circle cx="16" cy="-24" r="2" fill="#000" />
            <!-- Awkward legs bumping tree -->
            <path d="M -15 -10 Q -40 -30 -35 0 M -10 10 Q -35 30 -30 10 M 15 -10 Q 40 -30 35 0 M 10 10 Q 35 30 30 10" stroke="#1C1917" stroke-width="4" fill="none" />
            <!-- Pot pressed against tree -->
            <ellipse cx="-35" cy="5" rx="35" ry="28" fill="#EA580C" stroke="#FEF08A" stroke-width="3" />
          </g>
          <!-- Ntikuma the boy smiling on the right -->
          <g transform="translate(560, 360)">
            <!-- Head -->
            <circle cx="0" cy="0" r="32" fill="#78350F" />
            <!-- Warm smile -->
            <path d="M -12 8 Q 0 20 12 8" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" fill="none" />
            <!-- Bright happy eyes -->
            <circle cx="-10" cy="-6" r="4" fill="#FFFFFF" /><circle cx="-9" cy="-6" r="2" fill="#000" />
            <circle cx="10" cy="-6" r="4" fill="#FFFFFF" /><circle cx="11" cy="-6" r="2" fill="#000" />
            <!-- Colorful Kente shirt -->
            <polygon points="-28,32 28,32 40,160 -40,160" fill="#F59E0B" stroke="#B45309" stroke-width="3" />
            <!-- Waving hand -->
            <path d="M -28 60 Q -70 40 -80 15" stroke="#78350F" stroke-width="8" stroke-linecap="round" fill="none" />
            <circle cx="-82" cy="12" r="10" fill="#78350F" />
          </g>
        </svg>`,
        illustrationCaption: "Young Ntikuma waving gently and sharing his clever idea with his bewildered father.",
        vocabulary: [
          {
            word: "Kente",
            pronunciation: "KEN-tay",
            definition: "A famous, radiant cloth woven in Ghana with colorful geometric patterns, where each color has a special meaning.",
            funFact: "Gold kente represents royalty and warmth, while green represents new growth!",
          },
          {
            word: "Humility",
            pronunciation: "hyoo-MIL-ih-tee",
            definition: "Being open to learning from others, even from people who are younger or smaller than you.",
            funFact: "Some of the greatest inventors listened to children to get their best ideas!",
          },
        ],
        hiddenStar: { xPercent: 20, yPercent: 44, clue: "Look on the rough bark of the giant tree trunk!" },
        funActivity: "Try touching your elbows together while giving yourself a hug!",
      },
      {
        pageNumber: 4,
        chapterTitle: "Chapter 4: Wisdom Scattered to the Winds",
        scenePrompt: "The clay pot breaking into golden sparkling pieces, showering sparkling stars over laughing villagers and children across the green hills.",
        narrativeText:
          "Anansi realized his son was right. In that moment of surprise, his grip slipped! The clay pot tumbled down, down, down—and CRACK! It gently shattered on a smooth river stone. A dazzling gust of warm wind caught the golden pieces and blew them into a million glittering sparks. They flew over mountains, across sparkling rivers, and into the hearts of girls, boys, grandmothers, and musicians everywhere. Anansi looked around, smiled sheepishly, and laughed: 'Now wisdom belongs to everyone—and the world is so much brighter for it!'",
        dialogueLines: [
          {
            speaker: "Narrator",
            speakerRole: "narrator",
            avatar: "📖",
            text: "Ever since that sunny day, every single person carries a little piece of the world's wisdom.",
            voiceName: "Grandma Willow",
            mood: "triumphant",
          },
          {
            speaker: "Anansi",
            speakerRole: "character",
            avatar: "🕷️",
            text: "Ha-ha! Why keep knowledge in a jar when it can shine in everyone's eyes?",
            voiceName: "Pip the Pixie",
            mood: "joyful",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="skyGrad4" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#1E3A8A" />
              <stop offset="40%" stop-color="#3B82F6" />
              <stop offset="80%" stop-color="#F59E0B" />
              <stop offset="100%" stop-color="#FCD34D" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#skyGrad4)" />
          <!-- Rolling green hills -->
          <ellipse cx="200" cy="580" rx="360" ry="120" fill="#15803D" />
          <ellipse cx="650" cy="590" rx="320" ry="110" fill="#166534" />
          <!-- Burst of golden stars from center -->
          <g transform="translate(400, 360)">
            <!-- Shattered pot shards in cheerful mosaic -->
            <polygon points="-25,10 -10,35 -40,30" fill="#EA580C" />
            <polygon points="10,12 35,28 20,40" fill="#C2410C" />
            <polygon points="-5,-10 20,-5 10,-25" fill="#EA580C" />
            <!-- Dancing golden rays -->
            <path d="M 0 0 L -180 -180 M 0 0 L 180 -180 M 0 0 L -250 -60 M 0 0 L 250 -60 M 0 0 L -80 -250 M 0 0 L 80 -250" stroke="#FEF08A" stroke-width="3" stroke-dasharray="8 6" opacity="0.85" />
          </g>
          <!-- Multitude of flying sparkling stars -->
          <polygon points="220,160 225,175 240,176 228,187 232,202 220,193 208,202 212,187 200,176 215,175" fill="#FEF08A" />
          <polygon points="560,140 564,153 577,154 566,164 570,177 560,169 550,177 554,164 543,154 556,153" fill="#FDE047" />
          <polygon points="340,100 344,112 356,113 346,122 350,134 340,127 330,134 334,122 324,113 336,112" fill="#FEF08A" />
          <polygon points="460,80 463,90 473,91 465,98 468,108 460,102 452,108 455,98 447,91 457,90" fill="#FEF08A" />
          <polygon points="120,240 124,251 135,252 126,260 129,271 120,265 111,271 114,260 105,252 116,251" fill="#FDE047" />
          <polygon points="680,220 684,231 695,232 686,240 689,251 680,245 671,251 674,240 665,232 676,231" fill="#FEF08A" />
          <!-- Anansi and his son dancing together on hill -->
          <circle cx="360" cy="460" r="16" fill="#1C1917" />
          <circle cx="430" cy="445" r="18" fill="#78350F" />
        </svg>`,
        illustrationCaption: "Wisdom transforming into thousands of golden stars that scatter lovingly across all the people of the earth.",
        vocabulary: [
          {
            word: "Generosity",
            pronunciation: "jen-er-OSS-ih-tee",
            definition: "The joyful feeling of giving, sharing, and helping others without expecting a reward.",
            funFact: "Scientists found that sharing things with others lights up the same happy part of the brain as eating chocolate!",
          },
        ],
        hiddenStar: { xPercent: 43, yPercent: 14, clue: "Find the brightest golden star sparkling near the top of the sky!" },
        funActivity: "Share one smart idea or compliment with a friend today!",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // STORY 2: Momotaro, The Brave Peach Boy (Japan)
  // ---------------------------------------------------------------------------
  {
    id: "momotaro_peach_boy",
    title: "Momotaro, The Peach Boy",
    subtitle: "A Classic Japanese Folktale of Kindness & Friendship",
    region: "East Asia",
    country: "Japan",
    flag: "🇯🇵",
    culture: "Japanese",
    ageRange: "4–10 years",
    readTimeMinutes: 5,
    theme: "Courage, Teamwork & Peacemaking",
    moral: "True strength comes from making friends, sharing food, and choosing kindness over fighting.",
    coverCloth: "#BE123C", // Japanese lacquer crimson
    coverSpine: "#881337",
    accentColor: "#E11D48",
    paperColor: "#FFFDF7",
    cardColor: "#FFE4E6",
    summary:
      "Born from a giant floating peach in a crystal river, young Momotaro sets off on an adventure with three unlikely animal companions—a dog, a monkey, and a pheasant. Together, they bring peace and laughter to Ogre Island.",
    coverSvg: `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="peachCoverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FECDD3" />
          <stop offset="40%" stop-color="#FB7185" />
          <stop offset="100%" stop-color="#9F1239" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#peachCoverGrad)" />
      <!-- Mount Fuji Silhouette -->
      <polygon points="400,100 240,380 560,380" fill="#4C0519" opacity="0.85" />
      <polygon points="400,100 365,160 435,160" fill="#FFFFFF" />
      <!-- Giant Glowing Pink Peach in center -->
      <path d="M 400 200 C 330 180 270 240 280 320 C 290 390 360 430 400 450 C 440 430 510 390 520 320 C 530 240 470 180 400 200 Z" fill="#FDA4AF" stroke="#FFF1F2" stroke-width="8" />
      <path d="M 400 200 C 390 280 395 360 400 450" stroke="#F43F5E" stroke-width="4" fill="none" opacity="0.6" />
      <!-- Two green leaves on top -->
      <path d="M 400 205 C 410 160 460 160 470 180 C 440 200 415 200 400 205 Z" fill="#22C55E" />
      <path d="M 400 205 C 390 160 340 160 330 180 C 360 200 385 200 400 205 Z" fill="#16A34A" />
      <!-- Cherry blossom petals -->
      <circle cx="200" cy="120" r="10" fill="#FFE4E6" opacity="0.8" />
      <circle cx="620" cy="140" r="12" fill="#FFE4E6" opacity="0.8" />
      <circle cx="680" cy="220" r="9" fill="#FFE4E6" opacity="0.8" />
      <circle cx="160" cy="240" r="11" fill="#FFE4E6" opacity="0.8" />
    </svg>`,
    pages: [
      {
        pageNumber: 1,
        chapterTitle: "Chapter 1: The Giant River Peach",
        scenePrompt: "An elderly Japanese grandmother washing clothes by a sparkling mountain stream as an enormous pink peach floats down.",
        narrativeText:
          "High among the misty pine mountains of ancient Japan, a kind grandmother was washing soft linen beside a clear, babbling river. Splish, splash! Suddenly, she spotted something marvelous bobbing down the current: an enormous pink peach, rounder than a temple bell and glowing like the morning sun! She caught it gently with a long bamboo pole and carried it home to her grandfather, where the delicious fruit smelled sweeter than honey blossoms.",
        dialogueLines: [
          {
            speaker: "Narrator",
            speakerRole: "narrator",
            avatar: "📖",
            text: "The crystal stream danced over river pebbles, carrying the sweetest surprise in all of Japan.",
            voiceName: "Grandma Willow",
            mood: "serene",
          },
          {
            speaker: "Grandmother",
            speakerRole: "character",
            avatar: "👵🏻",
            text: "My goodness! Look at this magnificent peach floating down from the mountain clouds!",
            voiceName: "Luna the Star Fairy",
            mood: "amazed",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="jpSky1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#FEE2E2" />
              <stop offset="50%" stop-color="#FECDD3" />
              <stop offset="100%" stop-color="#BAE6FD" />
            </linearGradient>
            <linearGradient id="riverGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#38BDF8" />
              <stop offset="100%" stop-color="#0284C7" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#jpSky1)" />
          <!-- Mount Fuji in background -->
          <polygon points="400,80 220,380 580,380" fill="#E2E8F0" opacity="0.9" />
          <polygon points="400,80 350,160 450,160" fill="#FFFFFF" />
          <!-- River bank -->
          <path d="M 0 380 Q 200 350 400 380 T 800 380 L 800 600 L 0 600 Z" fill="url(#riverGrad1)" />
          <path d="M 0 360 Q 300 340 500 420 L 0 540 Z" fill="#15803D" />
          <!-- Cherry Blossom Branch hanging over -->
          <path d="M 800 60 Q 600 80 500 160" stroke="#78350F" stroke-width="12" fill="none" />
          <circle cx="560" cy="130" r="16" fill="#F43F5E" />
          <circle cx="530" cy="150" r="14" fill="#FDA4AF" />
          <circle cx="620" cy="110" r="18" fill="#F43F5E" />
          <!-- Giant Glowing Peach floating in river -->
          <g transform="translate(420, 420)">
            <path d="M 0 -70 C -70 -90 -120 -30 -110 50 C -100 120 -30 160 0 180 C 30 160 100 120 110 50 C 120 -30 70 -90 0 -70 Z" fill="#FDA4AF" stroke="#FFFFFF" stroke-width="6" />
            <path d="M 0 -70 C -10 10 -5 90 0 180" stroke="#E11D48" stroke-width="4" fill="none" opacity="0.5" />
            <path d="M 0 -65 C 10 -110 60 -110 70 -90 C 40 -70 15 -70 0 -65 Z" fill="#22C55E" />
            <!-- Water ripples -->
            <ellipse cx="0" cy="170" rx="140" ry="24" fill="none" stroke="#FFFFFF" stroke-width="3" opacity="0.75" />
          </g>
          <!-- Grandmother by stream -->
          <circle cx="160" cy="410" r="24" fill="#FDE047" />
          <ellipse cx="160" cy="460" rx="28" ry="40" fill="#1E3A8A" />
        </svg>`,
        illustrationCaption: "The enormous glowing peach bobbing gently along the sparkling mountain stream.",
        vocabulary: [
          {
            word: "Momotaro",
            pronunciation: "moh-moh-TAH-roh",
            definition: "A famous Japanese name meaning 'Peach Boy' ('Momo' means peach, 'Taro' means eldest son).",
            funFact: "Statues of Momotaro stand proudly outside the train station in Okayama, Japan!",
          },
          {
            word: "Brocade",
            pronunciation: "broh-KAYD",
            definition: "A rich silk fabric woven with shining golden and silver threads.",
            funFact: "Japanese kimonos made from brocade can take months of patient hand-weaving!",
          },
        ],
        hiddenStar: { xPercent: 51, yPercent: 12, clue: "Look right at the snowy summit of Mount Fuji!" },
        funActivity: "Say 'Momo' three times fast: Momo, Momo, Momo!",
      },
      {
        pageNumber: 2,
        chapterTitle: "Chapter 2: The Boy Who Loved Millet Dumplings",
        scenePrompt: "The peach bursting open with a sweet pop, revealing a cheerful baby boy with a red headband smiling at the grandparents.",
        narrativeText:
          "When grandfather took out his wooden knife to slice the fruit, the peach wiggled! Pop! It split cleanly in two, and out stepped a happy, healthy baby boy with sparkling obsidian eyes. The loving couple named him Momotaro. He grew strong and kind, helping everyone in the village. When he heard that mischievous ogres on distant Onigashima island were troubling the fishermen, Momotaro decided to go and ask them to live in peace. Grandmother packed him a pouch of fresh, warm millet dumplings (kibi dango) for the journey.",
        dialogueLines: [
          {
            speaker: "Momotaro",
            speakerRole: "character",
            avatar: "🍑",
            text: "Don't worry, grandmother! With courage and these delicious dumplings, I will make friends with everyone!",
            voiceName: "Captain Barnaby",
            mood: "brave",
          },
          {
            speaker: "Grandfather",
            speakerRole: "character",
            avatar: "👴🏻",
            text: "Take these dumplings, Momotaro. They are the tastiest in all of Japan, filled with love and strength.",
            voiceName: "Professor Barnaby Owl",
            mood: "caring",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="tatamiRoom" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#FEF3C7" />
              <stop offset="100%" stop-color="#FDE68A" />
            </linearGradient>
          </defs>
          <rect width="800" height="440" fill="url(#tatamiRoom)" />
          <!-- Wooden screen Shoji sliding doors -->
          <rect x="80" y="40" width="200" height="340" fill="#FFFFFF" stroke="#78350F" stroke-width="6" />
          <path d="M 80 120 L 280 120 M 80 200 L 280 200 M 80 280 L 280 280 M 140 40 L 140 380 M 220 40 L 220 380" stroke="#78350F" stroke-width="3" />
          <!-- Tatami floor -->
          <rect y="440" width="800" height="160" fill="#CA8A04" />
          <path d="M 0 520 L 800 520 M 260 440 L 260 600 M 540 440 L 540 600" stroke="#854D0E" stroke-width="4" />
          <!-- Opened halves of the giant peach on a wooden tray -->
          <ellipse cx="330" cy="460" rx="80" ry="45" fill="#FDA4AF" stroke="#E11D48" stroke-width="4" />
          <ellipse cx="530" cy="460" rx="80" ry="45" fill="#FDA4AF" stroke="#E11D48" stroke-width="4" />
          <!-- Momotaro standing proudly in the middle -->
          <g transform="translate(430, 340)">
            <!-- Robe -->
            <polygon points="-30,60 30,60 45,130 -45,130" fill="#3B82F6" stroke="#1D4ED8" stroke-width="3" />
            <!-- Head -->
            <circle cx="0" cy="15" r="28" fill="#FDE047" />
            <!-- Cheerful smile -->
            <path d="M -10 22 Q 0 32 10 22" stroke="#B91C1C" stroke-width="3" stroke-linecap="round" fill="none" />
            <!-- Eyes -->
            <circle cx="-8" cy="10" r="3.5" fill="#000" />
            <circle cx="8" cy="10" r="3.5" fill="#000" />
            <!-- Red headband (Hachimaki) with peach symbol -->
            <rect x="-32" y="-4" width="64" height="12" fill="#DC2626" rx="3" />
            <circle cx="0" cy="2" r="4" fill="#FFFFFF" />
            <!-- Pouch of millet dumplings on belt -->
            <circle cx="28" cy="85" r="14" fill="#D97706" />
          </g>
        </svg>`,
        illustrationCaption: "Momotaro stepping out with courage, wearing his red headband and carrying fresh millet dumplings.",
        vocabulary: [
          {
            word: "Kibi Dango",
            pronunciation: "KEE-bee DAHN-goh",
            definition: "Delicious, sweet, round Japanese dumplings made from wholesome millet flour and rice.",
            funFact: "In Japan, dango is traditionally served on bamboo skewers with warm green tea!",
          },
          {
            word: "Hachimaki",
            pronunciation: "hah-chee-MAH-kee",
            definition: "A traditional Japanese headband worn as a symbol of determination, courage, and effort.",
            funFact: "Students in Japan often wear hachimaki before big exams for good luck!",
          },
        ],
        hiddenStar: { xPercent: 22, yPercent: 12, clue: "Check the top pane of the paper shoji door!" },
        funActivity: "What healthy snack gives you the most energy when you go on a walk?",
      },
      {
        pageNumber: 3,
        chapterTitle: "Chapter 3: Three Faithful Friends",
        scenePrompt: "Momotaro sharing delicious dumplings with a loyal spotted dog, a clever monkey, and a colorful flying pheasant on a mountain path.",
        narrativeText:
          "As Momotaro walked down the blossoming road, a spotted dog bounded out: 'Bow-wow! Where are you going, Momotaro?' Momotaro smiled: 'To make peace on Onigashima. Would you like a delicious millet dumpling?' The dog wagged his tail and joined. Soon, a clever monkey swung down from an oak branch, and a magnificent pheasant with green-and-gold feathers fluttered out of the reeds. Momotaro shared a dumpling with each one. 'We will stand by you through thick and thin!' they promised in chorus.",
        dialogueLines: [
          {
            speaker: "Spotted Dog",
            speakerRole: "character",
            avatar: "🐕",
            text: "Bow-wow! These are the tastiest treats in Japan! Count me in!",
            voiceName: "Oliver the Gentle Bear",
            mood: "loyal",
          },
          {
            speaker: "Pheasant",
            speakerRole: "character",
            avatar: "🪶",
            text: "Kee-kee! With my wings to scout from the sky, we will always find our way!",
            voiceName: "Pip the Pixie",
            mood: "breezy",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="pathGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#BAE6FD" />
              <stop offset="60%" stop-color="#BBF7D0" />
              <stop offset="100%" stop-color="#86EFAC" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#pathGrad)" />
          <!-- Winding dirt trail -->
          <path d="M 0 540 Q 300 480 440 420 T 800 360 L 800 600 L 0 600 Z" fill="#D97706" opacity="0.8" />
          <!-- Momotaro in center -->
          <g transform="translate(360, 360)">
            <polygon points="-20,40 20,40 30,100 -30,100" fill="#3B82F6" />
            <circle cx="0" cy="10" r="20" fill="#FDE047" />
            <rect x="-24" y="-3" width="48" height="9" fill="#DC2626" rx="2" />
            <!-- Outstretched hand holding golden dumpling -->
            <path d="M 15 45 L 55 35" stroke="#FDE047" stroke-width="6" stroke-linecap="round" />
            <circle cx="58" cy="35" r="7" fill="#FEF08A" stroke="#B45309" stroke-width="2" />
          </g>
          <!-- Spotted Dog on Left -->
          <g transform="translate(200, 410)">
            <ellipse cx="0" cy="20" rx="28" ry="18" fill="#FFFFFF" stroke="#1C1917" stroke-width="2" />
            <circle cx="-16" cy="5" r="14" fill="#FFFFFF" stroke="#1C1917" stroke-width="2" />
            <!-- Spots -->
            <circle cx="-6" cy="18" r="7" fill="#78350F" />
            <circle cx="12" cy="22" r="5" fill="#78350F" />
            <!-- Happy tail -->
            <path d="M 28 14 Q 45 -5 40 -15" stroke="#1C1917" stroke-width="4" stroke-linecap="round" fill="none" />
          </g>
          <!-- Clever Monkey on Right -->
          <g transform="translate(520, 390)">
            <ellipse cx="0" cy="25" rx="20" ry="24" fill="#78350F" />
            <circle cx="0" cy="0" r="16" fill="#FDE047" />
            <circle cx="-16" cy="0" r="7" fill="#FDE047" />
            <circle cx="16" cy="0" r="7" fill="#FDE047" />
          </g>
          <!-- Flying Pheasant above -->
          <g transform="translate(480, 160)">
            <ellipse cx="0" cy="0" rx="30" ry="14" fill="#047857" />
            <circle cx="24" cy="-5" r="10" fill="#B91C1C" />
            <!-- Rainbow wings -->
            <path d="M -10 -5 Q -40 -50 0 -40 Q 20 -40 10 -5 Z" fill="#D97706" />
            <path d="M -10 5 Q -40 50 0 40 Q 20 40 10 5 Z" fill="#2563EB" />
          </g>
        </svg>`,
        illustrationCaption: "Momotaro happily sharing dumplings with the dog, monkey, and flying pheasant.",
        vocabulary: [
          {
            word: "Companion",
            pronunciation: "kum-PAN-yun",
            definition: "A loyal friend who journeys with you and shares both adventures and snacks.",
            funFact: "Dogs, monkeys, and birds often feature together in ancient tales because of their different superpowers: smelling, climbing, and flying!",
          },
        ],
        hiddenStar: { xPercent: 62, yPercent: 24, clue: "Look right under the pheasant's emerald wing feathers!" },
        funActivity: "Can you imitate the sounds of all three animal friends in one breath?",
      },
      {
        pageNumber: 4,
        chapterTitle: "Chapter 4: The Feast of Peace on Ogre Island",
        scenePrompt: "Momotaro and his friends sharing sweet peach dumplings with the friendly red and blue Island Ogres, dancing under colorful lanterns.",
        narrativeText:
          "When Momotaro reached the dark stone gate of Onigashima, the red and blue ogres stomped out, roaring loudly to frighten him away. But Momotaro did not draw a sword. Instead, he smiled warmly, sat on a boulder, and opened his dumpling pouch. 'We brought you the sweetest treats from our village,' he said gently. The ogres sniffed the air, tasted the warm dumplings, and their frowns melted into huge, happy smiles! They realized they had only been grumpy because they were lonely. That evening, everyone danced together under paper lanterns, singing songs of friendship across the sparkling sea.",
        dialogueLines: [
          {
            speaker: "Red Ogre",
            speakerRole: "character",
            avatar: "👹",
            text: "Nobody has ever offered to share food with us before! You are true friends!",
            voiceName: "Oliver the Gentle Bear",
            mood: "touched",
          },
          {
            speaker: "Momotaro",
            speakerRole: "character",
            avatar: "🍑",
            text: "A shared meal turns strangers into family. Let us dance!",
            voiceName: "Captain Barnaby",
            mood: "joyous",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="nightSkyJp" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#0F172A" />
              <stop offset="60%" stop-color="#1E1B4B" />
              <stop offset="100%" stop-color="#431407" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#nightSkyJp)" />
          <!-- Glowing Moon -->
          <circle cx="700" cy="110" r="45" fill="#FEF08A" />
          <!-- Festival Lantern String -->
          <path d="M 0 100 Q 200 160 400 120 T 800 100" stroke="#F59E0B" stroke-width="3" fill="none" />
          <ellipse cx="140" cy="135" rx="14" ry="20" fill="#EF4444" stroke="#FDE047" stroke-width="2" />
          <ellipse cx="280" cy="155" rx="14" ry="20" fill="#F59E0B" stroke="#FDE047" stroke-width="2" />
          <ellipse cx="440" cy="130" rx="14" ry="20" fill="#EF4444" stroke="#FDE047" stroke-width="2" />
          <ellipse cx="600" cy="115" rx="14" ry="20" fill="#F59E0B" stroke="#FDE047" stroke-width="2" />
          <!-- Red Ogre smiling and sitting peacefully -->
          <g transform="translate(240, 360)">
            <ellipse cx="0" cy="50" rx="55" ry="60" fill="#DC2626" />
            <circle cx="0" cy="-10" r="40" fill="#DC2626" />
            <!-- Horns -->
            <polygon points="-15,-45 -25,-75 -5,-50" fill="#FEF08A" />
            <polygon points="15,-45 25,-75 5,-50" fill="#FEF08A" />
            <!-- Big happy smile -->
            <path d="M -20 5 Q 0 25 20 5" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" fill="none" />
          </g>
          <!-- Blue Ogre -->
          <g transform="translate(560, 370)">
            <ellipse cx="0" cy="50" rx="50" ry="55" fill="#2563EB" />
            <circle cx="0" cy="-5" r="36" fill="#2563EB" />
            <polygon points="-10,-35 -15,-65 0,-40" fill="#FEF08A" />
            <polygon points="10,-35 15,-65 0,-40" fill="#FEF08A" />
            <path d="M -16 8 Q 0 24 16 8" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" fill="none" />
          </g>
          <!-- Momotaro dancing happily in center with dumplings -->
          <g transform="translate(400, 380)">
            <polygon points="-18,20 18,20 25,70 -25,70" fill="#3B82F6" />
            <circle cx="0" cy="0" r="16" fill="#FDE047" />
            <rect x="-18" y="-10" width="36" height="7" fill="#DC2626" />
          </g>
        </svg>`,
        illustrationCaption: "Momotaro and the friendly ogres enjoying sweet dumplings together under the festive paper lanterns.",
        vocabulary: [
          {
            word: "Harmony",
            pronunciation: "HAR-muh-nee",
            definition: "Living and playing together in peace, where everyone feels respected and included.",
            funFact: "In Japan, the word 'Wa' (和) means peace, harmony, and Japanese culture itself!",
          },
        ],
        hiddenStar: { xPercent: 88, yPercent: 18, clue: "Look right near the glowing crescent moon in the night sky!" },
        funActivity: "Draw a lantern with your favorite bright colors!",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // STORY 3: The Golden Hummingbird & the Rain Flower (Andes / Latin America)
  // ---------------------------------------------------------------------------
  {
    id: "colibri_rain_flower",
    title: "The Golden Hummingbird & the Rain Flower",
    subtitle: "An Andean Legend of Perseverance from Peru & Ecuador",
    region: "South America",
    country: "Peru",
    flag: "🇵🇪",
    culture: "Quechua / Andean",
    ageRange: "5–10 years",
    readTimeMinutes: 5,
    theme: "Bravery & Nature Stewardship",
    moral: "Even the smallest among us can accomplish miracles when our hearts are brave.",
    coverCloth: "#0D9488", // Andean turquoise
    coverSpine: "#115E59",
    accentColor: "#0D9488",
    paperColor: "#FFFDF7",
    cardColor: "#CCFBF1",
    summary:
      "When a long dry spell leaves the terraced valleys thirsty, none of the big mountain condors or pumas dare to fly up to the snowy sky spirits. But Little Colibrí, a tiny hummingbird no bigger than a thumb, takes flight with a single sacred rain flower.",
    coverSvg: `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="andesCoverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#38BDF8" />
          <stop offset="50%" stop-color="#0D9488" />
          <stop offset="100%" stop-color="#0F766E" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#andesCoverGrad)" />
      <!-- Jagged snow-capped peaks -->
      <polygon points="180,180 80,420 280,420" fill="#134E4A" />
      <polygon points="180,180 150,240 210,240" fill="#FFFFFF" />
      <polygon points="460,120 300,450 620,450" fill="#042F2E" />
      <polygon points="460,120 410,200 510,200" fill="#FFFFFF" />
      <!-- Giant glowing rainbow hummingbird in center -->
      <g transform="translate(420, 260) scale(1.6)">
        <ellipse cx="0" cy="0" rx="22" ry="14" fill="#10B981" />
        <circle cx="18" cy="-5" r="9" fill="#047857" />
        <!-- Long thin beak -->
        <path d="M 27 -5 L 55 -5" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round" />
        <!-- Rainbow fluttering wings -->
        <path d="M -5 -6 Q -30 -40 -10 -45 Q 10 -45 5 -6 Z" fill="#F43F5E" />
        <path d="M -5 6 Q -30 40 -10 45 Q 10 45 5 6 Z" fill="#3B82F6" />
        <circle cx="20" cy="-7" r="2" fill="#FFFFFF" />
      </g>
    </svg>`,
    pages: [
      {
        pageNumber: 1,
        chapterTitle: "Chapter 1: The Thirsty Green Terraces",
        scenePrompt: "Terraced green mountain slopes high in the Andes with grazing alpacas waiting for gentle rain.",
        narrativeText:
          "High in the majestic Andes mountains, carved stone terraces hugged the misty green slopes like giant staircases for giants. Fluffy alpacas with warm wool munched on golden mountain grasses, but the rainy season was late. The clear blue sky stayed silent day after day, and the bright mountain flowers began to droop their velvety heads. All the animals gathered in the stone square. The giant condor puffed his chest: 'The sky spirits are too high and the winds too fierce; no one can reach them!'",
        dialogueLines: [
          {
            speaker: "Narrator",
            speakerRole: "narrator",
            avatar: "📖",
            text: "The sun shone brightly upon the Andes, but the earth was longing for a cool, refreshing drink.",
            voiceName: "Grandma Willow",
            mood: "gentle",
          },
          {
            speaker: "Condor",
            speakerRole: "character",
            avatar: "🦅",
            text: "Even with my ten-foot wings, the freezing wind at the mountain peaks is far too terrifying!",
            voiceName: "Professor Barnaby Owl",
            mood: "worried",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="andesSky1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#0284C7" />
              <stop offset="60%" stop-color="#38BDF8" />
              <stop offset="100%" stop-color="#BAE6FD" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#andesSky1)" />
          <!-- Mountains with snowcaps -->
          <polygon points="500,80 320,400 680,400" fill="#0F766E" />
          <polygon points="500,80 440,160 560,160" fill="#FFFFFF" />
          <!-- Andean Terraces (Inca terraces) -->
          <path d="M 0 380 L 800 340 L 800 420 L 0 460 Z" fill="#65A30D" />
          <path d="M 0 420 L 800 380 L 800 440 L 0 480 Z" fill="#78350F" opacity="0.4" />
          <path d="M 0 460 L 800 420 L 800 520 L 0 560 Z" fill="#4D7C0F" />
          <!-- Cute fluffy Alpaca grazing -->
          <g transform="translate(260, 400)">
            <ellipse cx="0" cy="30" rx="35" ry="24" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2" />
            <!-- Long neck and head -->
            <path d="M 22 25 L 34 -15" stroke="#F8FAFC" stroke-width="18" stroke-linecap="round" />
            <circle cx="36" cy="-22" r="16" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2" />
            <!-- Ears -->
            <polygon points="28,-36 32,-25 24,-25" fill="#F8FAFC" />
            <polygon points="40,-36 44,-25 36,-25" fill="#F8FAFC" />
            <circle cx="42" cy="-24" r="3" fill="#000" />
            <!-- Legs -->
            <rect x="-24" y="50" width="8" height="30" fill="#F8FAFC" rx="4" />
            <rect x="14" y="50" width="8" height="30" fill="#F8FAFC" rx="4" />
          </g>
        </svg>`,
        illustrationCaption: "The peaceful stone terraces of the Andes where fluffy alpacas graze beneath snow-capped peaks.",
        vocabulary: [
          {
            word: "Andes",
            pronunciation: "AN-deez",
            definition: "The longest mountain range in the world, stretching all along the western coast of South America.",
            funFact: "The Andes mountains are home to thousands of varieties of delicious potatoes, in purple, pink, and yellow!",
          },
          {
            word: "Terrace",
            pronunciation: "TAIR-iss",
            definition: "Stepped fields carved into steep mountain slopes to grow corn, quinoa, and flowers without soil washing away.",
            funFact: "Inca farmers engineered stone terraces so perfectly that many are still used today after 600 years!",
          },
        ],
        hiddenStar: { xPercent: 62, yPercent: 14, clue: "Look right at the icy snowy peak of the mountain!" },
        funActivity: "Did you know alpacas hum when they are curious? Try making a soft humming sound: hmmm-hmmm!",
      },
      {
        pageNumber: 2,
        chapterTitle: "Chapter 2: The Brave Little Wings",
        scenePrompt: "Colibrí the tiny hummingbird flying up past mountain peaks carrying a single scarlet cantuta flower in its beak.",
        narrativeText:
          "Just as the animals were about to give up hope, a gentle whirring sound filled the air—like the buzzing of a happy bee. Zzzz-flutter! Out from a bush of wild orchids darted Colibrí. His feathers sparkled in emerald, turquoise, and ruby. In his slender beak, he held a single, sacred scarlet cantuta flower, the national flower of the Andes. 'I may be small,' piped Colibrí with a chirp, 'but my wings beat eighty times every single second! I will fly up to the cloud mother and ask for rain.'",
        dialogueLines: [
          {
            speaker: "Colibrí",
            speakerRole: "character",
            avatar: "🐦",
            text: "Never say a dream is too high! Watch my little wings fly!",
            voiceName: "Pip the Pixie",
            mood: "determined",
          },
          {
            speaker: "Narrator",
            speakerRole: "narrator",
            avatar: "📖",
            text: "Up he zoomed, higher than the eucalyptus trees, higher than the condor's cliff.",
            voiceName: "Grandma Willow",
            mood: "uplifting",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="andesSky2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#4338CA" />
              <stop offset="50%" stop-color="#0284C7" />
              <stop offset="100%" stop-color="#FCD34D" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#andesSky2)" />
          <!-- Swirling soft pink mountain clouds -->
          <ellipse cx="200" cy="220" rx="140" ry="40" fill="#FCE7F3" opacity="0.8" />
          <ellipse cx="620" cy="180" rx="160" ry="45" fill="#FCE7F3" opacity="0.8" />
          <!-- Colibri in center soaring upwards -->
          <g transform="translate(400, 280) scale(1.8)">
            <!-- Radiant emerald body -->
            <ellipse cx="0" cy="0" rx="26" ry="16" fill="#10B981" />
            <circle cx="20" cy="-6" r="11" fill="#059669" />
            <!-- Long beak -->
            <path d="M 30 -6 L 68 -6" stroke="#D97706" stroke-width="3" stroke-linecap="round" />
            <!-- Scarlet Cantuta Flower in beak -->
            <polygon points="68,-6 85,-16 90,-4 85,6" fill="#E11D48" />
            <path d="M 68 -6 L 78 -6" stroke="#15803D" stroke-width="2" />
            <!-- Fluttering wings in motion blur -->
            <path d="M -6 -8 Q -40 -55 -15 -60 Q 15 -60 8 -8 Z" fill="#F43F5E" opacity="0.9" />
            <path d="M -6 8 Q -40 55 -15 60 Q 15 60 8 8 Z" fill="#3B82F6" opacity="0.9" />
            <!-- Eye -->
            <circle cx="23" cy="-9" r="2.5" fill="#FFFFFF" />
            <circle cx="24" cy="-9" r="1.2" fill="#000000" />
          </g>
        </svg>`,
        illustrationCaption: "Colibrí soaring boldly through the high pink clouds, carrying the sacred red flower.",
        vocabulary: [
          {
            word: "Colibrí",
            pronunciation: "koh-lee-BREE",
            definition: "The Spanish and Quechua word for hummingbird, famous for being the only bird that can fly backward!",
            funFact: "A hummingbird's heart beats over 1,000 times per minute when it zooms across the flowers!",
          },
          {
            word: "Cantuta",
            pronunciation: "kahn-TOO-tah",
            definition: "A sacred bell-shaped flower of the Andes that blooms in brilliant red, pink, and yellow.",
            funFact: "In ancient times, the cantuta was known as the 'Sacred Flower of the Sun.'",
          },
        ],
        hiddenStar: { xPercent: 25, yPercent: 37, clue: "Look inside the fluffy pink mountain cloud on the left!" },
        funActivity: "Flap your hands super fast like hummingbird wings for ten seconds!",
      },
      {
        pageNumber: 3,
        chapterTitle: "Chapter 3: The Cloud Mother's Heart",
        scenePrompt: "Colibrí presenting the red flower to the majestic, glowing Cloud Mother whose hair is spun from rainbow mist.",
        narrativeText:
          "High in the freezing upper sky, the air turned icy cold. Colibrí's tiny heart beat fast, but he did not turn back. At last, he reached the golden palace of the Cloud Mother (Mama Wayra). She was woven of silver mist, with rainbows dancing in her hair. 'Tiny creature,' whispered the Cloud Mother in astonishment, 'how did one so small fly through such giant storms?' Colibrí gently placed the red flower at her feet: 'I came on behalf of the thirsty children, the green valleys, and the gentle alpacas below.'",
        dialogueLines: [
          {
            speaker: "Cloud Mother",
            speakerRole: "character",
            avatar: "☁️",
            text: "Never in ten thousand years has a creature flown so far with such pure love in its heart.",
            voiceName: "Luna the Star Fairy",
            mood: "tender",
          },
          {
            speaker: "Colibrí",
            speakerRole: "character",
            avatar: "🐦",
            text: "Please send your cool tears of joy to awaken the sleeping flowers!",
            voiceName: "Pip the Pixie",
            mood: "hopeful",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="cloudMotherGlow" cx="60%" cy="40%" r="50%">
              <stop offset="0%" stop-color="#FFFFFF" />
              <stop offset="50%" stop-color="#E0E7FF" />
              <stop offset="100%" stop-color="#6366F1" stop-opacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="600" fill="#1E1B4B" />
          <!-- Cloud Mother Silhouette of iridescent mist -->
          <circle cx="520" cy="240" r="160" fill="url(#cloudMotherGlow)" />
          <path d="M 460 220 C 500 140 620 180 640 260 C 660 340 540 440 480 460 Z" fill="#C7D2FE" opacity="0.6" />
          <!-- Rainbow hair strands -->
          <path d="M 440 160 Q 600 60 720 140" stroke="#F43F5E" stroke-width="4" fill="none" opacity="0.8" />
          <path d="M 450 170 Q 610 80 730 160" stroke="#FBBF24" stroke-width="4" fill="none" opacity="0.8" />
          <path d="M 460 180 Q 620 100 740 180" stroke="#34D399" stroke-width="4" fill="none" opacity="0.8" />
          <path d="M 470 190 Q 630 120 750 200" stroke="#60A5FA" stroke-width="4" fill="none" opacity="0.8" />
          <!-- Tiny Colibri offering the flower -->
          <g transform="translate(240, 320) scale(1.4)">
            <ellipse cx="0" cy="0" rx="20" ry="12" fill="#10B981" />
            <circle cx="16" cy="-4" r="8" fill="#047857" />
            <path d="M 24 -4 L 50 -4" stroke="#D97706" stroke-width="2.5" />
            <polygon points="50,-4 65,-12 68,-3 65,4" fill="#E11D48" />
          </g>
        </svg>`,
        illustrationCaption: "The Cloud Mother smiling down in gentle wonder at the brave little hummingbird.",
        vocabulary: [
          {
            word: "Perseverance",
            pronunciation: "per-suh-VEER-unss",
            definition: "Keeping on trying and never giving up, even when a goal feels big and difficult.",
            funFact: "Colibrí is considered a sacred messenger of good news across all Andean folktales!",
          },
        ],
        hiddenStar: { xPercent: 92, yPercent: 33, clue: "Look along the blue strand of the Cloud Mother's rainbow hair!" },
        funActivity: "What is something that felt hard at first, but you kept trying and learned to do?",
      },
      {
        pageNumber: 4,
        chapterTitle: "Chapter 4: The Song of the Rainbow Rain",
        scenePrompt: "A glorious, gentle rainbow rain falling across the green Andean valleys, blooming orchids, singing waterfalls, and smiling children.",
        narrativeText:
          "Moved by Colibrí's selfless heart, the Cloud Mother wept sweet tears of pure joy. Pitter-patter, pitter-patter! Soft, shimmering rain began to dance down across the mountains. The dry soil soaked up the cool water, and within hours, purple lupines, yellow marigolds, and scarlet cantutas bloomed everywhere! Crystal waterfalls sang in the canyons, and the children danced in the puddles. Colibrí returned safely to his nest, his emerald feathers glowing with all the colors of the rainbow.",
        dialogueLines: [
          {
            speaker: "Narrator",
            speakerRole: "narrator",
            avatar: "📖",
            text: "And so the little hummingbird reminded everyone: no act of kindness is ever too small.",
            voiceName: "Grandma Willow",
            mood: "celebratory",
          },
          {
            speaker: "Village Children",
            speakerRole: "character",
            avatar: "👧🏽",
            text: "Look! A double rainbow over the snowy peaks! Thank you, brave Colibrí!",
            voiceName: "Pip the Pixie",
            mood: "joyful",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="rainbowRainSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#38BDF8" />
              <stop offset="40%" stop-color="#BAE6FD" />
              <stop offset="100%" stop-color="#FEF08A" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#rainbowRainSky)" />
          <!-- Rainbow arc across the sky -->
          <ellipse cx="400" cy="480" rx="360" ry="240" fill="none" stroke="#EF4444" stroke-width="10" opacity="0.6" />
          <ellipse cx="400" cy="480" rx="350" ry="230" fill="none" stroke="#F59E0B" stroke-width="10" opacity="0.6" />
          <ellipse cx="400" cy="480" rx="340" ry="220" fill="none" stroke="#10B981" stroke-width="10" opacity="0.6" />
          <ellipse cx="400" cy="480" rx="330" ry="210" fill="none" stroke="#3B82F6" stroke-width="10" opacity="0.6" />
          <ellipse cx="400" cy="480" rx="320" ry="200" fill="none" stroke="#8B5CF6" stroke-width="10" opacity="0.6" />
          <!-- Lush green blooming hills -->
          <ellipse cx="200" cy="560" rx="320" ry="120" fill="#15803D" />
          <ellipse cx="650" cy="580" rx="300" ry="110" fill="#16A34A" />
          <!-- Bright colorful flowers blooming everywhere -->
          <circle cx="120" cy="480" r="10" fill="#E11D48" />
          <circle cx="160" cy="510" r="12" fill="#FBBF24" />
          <circle cx="280" cy="520" r="14" fill="#8B5CF6" />
          <circle cx="620" cy="500" r="12" fill="#E11D48" />
          <circle cx="680" cy="520" r="11" fill="#FBBF24" />
          <!-- Rain streaks of light -->
          <line x1="200" y1="120" x2="180" y2="220" stroke="#38BDF8" stroke-width="2" stroke-dasharray="8 12" />
          <line x1="400" y1="80" x2="380" y2="180" stroke="#38BDF8" stroke-width="2" stroke-dasharray="8 12" />
          <line x1="600" y1="140" x2="580" y2="240" stroke="#38BDF8" stroke-width="2" stroke-dasharray="8 12" />
          <!-- Colibri resting happily on a blooming flower branch -->
          <g transform="translate(420, 420)">
            <ellipse cx="0" cy="0" rx="16" ry="10" fill="#10B981" />
            <circle cx="12" cy="-4" r="7" fill="#047857" />
            <path d="M 18 -4 L 38 -4" stroke="#D97706" stroke-width="2" />
          </g>
        </svg>`,
        illustrationCaption: "A glowing rainbow arcs across the lush mountain valley as sweet rain drops wake up the flowers.",
        vocabulary: [
          {
            word: "Nourishment",
            pronunciation: "NUR-ish-munt",
            definition: "Food and water that helps living things grow healthy, strong, and full of life.",
            funFact: "Rain in the Andes filters through volcanic rock and becomes some of the purest mineral water in the world!",
          },
        ],
        hiddenStar: { xPercent: 50, yPercent: 30, clue: "Look right in the center arch of the colorful rainbow!" },
        funActivity: "Take a deep breath and imagine the fresh, sweet smell of rain on warm earth!",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // STORY 4: The Boy with the Magic Paintbrush (China)
  // ---------------------------------------------------------------------------
  {
    id: "ma_liang_paintbrush",
    title: "The Boy with the Magic Paintbrush",
    subtitle: "A Timeless Chinese Fable of Art, Kindness & Justice",
    region: "East Asia",
    country: "China",
    flag: "🇨🇳",
    culture: "Chinese",
    ageRange: "5–11 years",
    readTimeMinutes: 5,
    theme: "Creativity & Helping Others",
    moral: "Gifts and talents are brightest when used to bring joy, shelter, and comfort to those in need.",
    coverCloth: "#B91C1C", // Chinese vermilion red
    coverSpine: "#7F1D1D",
    accentColor: "#DC2626",
    paperColor: "#FFFDF7",
    cardColor: "#FEE2E2",
    summary:
      "Young Ma Liang loved to paint, though he could only afford a twig in the river sand. When an ancient master gifts him a magical golden brush that brings paintings to life, he paints warm clothes, water buffalos, and cranes for his village.",
    coverSvg: `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="paintCoverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FEF08A" />
          <stop offset="40%" stop-color="#DC2626" />
          <stop offset="100%" stop-color="#7F1D1D" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#paintCoverGrad)" />
      <!-- Golden Flying Crane -->
      <g transform="translate(380, 220) scale(1.5)">
        <ellipse cx="0" cy="0" rx="35" ry="14" fill="#FFFFFF" />
        <circle cx="30" cy="-6" r="9" fill="#FFFFFF" />
        <circle cx="32" cy="-9" r="3" fill="#DC2626" />
        <!-- Wings -->
        <path d="M -10 -5 Q -40 -60 10 -40 Q 30 -40 15 -5 Z" fill="#F8FAFC" stroke="#000" stroke-width="1.5" />
        <path d="M -10 5 Q -40 60 10 40 Q 30 40 15 5 Z" fill="#F8FAFC" stroke="#000" stroke-width="1.5" />
      </g>
      <!-- Golden magic paintbrush emitting stars -->
      <g transform="translate(240, 320) rotate(-45)">
        <rect x="0" y="0" width="16" height="180" fill="#CA8A04" rx="4" />
        <polygon points="0,0 16,0 8,-35" fill="#1C1917" />
        <circle cx="8" cy="-38" r="8" fill="#FEF08A" />
      </g>
    </svg>`,
    pages: [
      {
        pageNumber: 1,
        chapterTitle: "Chapter 1: The Sand Calligrapher",
        scenePrompt: "Ma Liang drawing graceful soaring birds in the soft river sand with a fallen bamboo reed.",
        narrativeText:
          "In a peaceful village tucked between whispering green bamboo groves, lived an imaginative boy named Ma Liang. He loved painting more than anything in the world. But his family was poor, and he did not own a single sheet of rice paper or a horsehair brush. That did not stop Ma Liang! When he took the goats out to pasture, he dipped a smooth bamboo stick into the river and drew graceful birds in the wet sand. He drew fish so lively that real ducks would swim over to peek at them!",
        dialogueLines: [
          {
            speaker: "Narrator",
            speakerRole: "narrator",
            avatar: "📖",
            text: "Where others saw plain mud and sand, Ma Liang saw living works of wonder.",
            voiceName: "Grandma Willow",
            mood: "thoughtful",
          },
          {
            speaker: "Ma Liang",
            speakerRole: "character",
            avatar: "🖌️",
            text: "If only I had a real brush, I could paint so many wonderful things for everyone in our valley!",
            voiceName: "Pip the Pixie",
            mood: "wistful",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bambooSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#E0F2FE" />
              <stop offset="100%" stop-color="#DCFCE7" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#bambooSky)" />
          <!-- Tall Bamboo Stalks in background -->
          <rect x="80" y="0" width="16" height="500" fill="#22C55E" rx="4" />
          <rect x="140" y="0" width="14" height="500" fill="#16A34A" rx="4" />
          <rect x="680" y="0" width="18" height="500" fill="#22C55E" rx="4" />
          <rect x="730" y="0" width="15" height="500" fill="#15803D" rx="4" />
          <!-- Sandbank by the river -->
          <path d="M 0 420 Q 350 380 800 440 L 800 600 L 0 600 Z" fill="#FDE68A" />
          <!-- Ma Liang painting on the sand with a bamboo reed -->
          <g transform="translate(340, 380)">
            <polygon points="-20,30 20,30 28,100 -28,100" fill="#0D9488" />
            <circle cx="0" cy="10" r="20" fill="#FDE047" />
            <!-- Bamboo stick in hand drawing on ground -->
            <line x1="18" y1="45" x2="60" y2="90" stroke="#CA8A04" stroke-width="4" />
          </g>
          <!-- Beautiful drawn bird in the sand -->
          <path d="M 420 480 Q 450 450 490 470 Q 520 490 480 500 Z" stroke="#B45309" stroke-width="4" fill="none" />
          <path d="M 440 470 Q 420 440 450 435" stroke="#B45309" stroke-width="3" fill="none" />
        </svg>`,
        illustrationCaption: "Ma Liang happily sketching lifelike birds into the warm river sand with his bamboo reed.",
        vocabulary: [
          {
            word: "Calligraphy",
            pronunciation: "kuh-LIG-ruh-fee",
            definition: "The ancient art of beautiful, expressive handwriting using ink brushes and rhythmic strokes.",
            funFact: "In ancient China, calligraphy, painting, poetry, and music were called the 'Four Arts' of a scholar!",
          },
        ],
        hiddenStar: { xPercent: 18, yPercent: 12, clue: "Look between the tall green bamboo stalks on the left!" },
        funActivity: "Try tracing a shape on your palm with your finger just like drawing in the sand!",
      },
      {
        pageNumber: 2,
        chapterTitle: "Chapter 2: The Golden Dream",
        scenePrompt: "An ancient wizard with a long flowing white beard appearing in a moonlit dream, placing a glowing golden brush in Ma Liang's hands.",
        narrativeText:
          "One night, as the full silver moon shone through the thatched roof, a gentle light filled Ma Liang's room. A kind elder with a flowing beard as white as winter snow stepped forward from a cloud of starlight. 'Ma Liang,' said the elder with a voice like ringing chimes, 'you have practiced faithfully with pure patience. Take this brush. But remember: use it only to help those who are hungry, cold, or in need.' When Ma Liang woke up with the morning birds, he gasped—in his hands rested a shining golden paintbrush with ink as dark as polished jade!",
        dialogueLines: [
          {
            speaker: "Ancient Elder",
            speakerRole: "character",
            avatar: "🧙🏼‍♂️",
            text: "This brush brings life to whatever you paint. Let your heart guide your hand with kindness.",
            voiceName: "Professor Barnaby Owl",
            mood: "magical",
          },
          {
            speaker: "Ma Liang",
            speakerRole: "character",
            avatar: "🖌️",
            text: "I promise! I will only ever paint to bring comfort and joy!",
            voiceName: "Pip the Pixie",
            mood: "earnest",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="dreamGlow" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stop-color="#FEF08A" stop-opacity="0.9" />
              <stop offset="50%" stop-color="#60A5FA" stop-opacity="0.5" />
              <stop offset="100%" stop-color="#0F172A" stop-opacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="600" fill="#0F172A" />
          <circle cx="400" cy="260" r="240" fill="url(#dreamGlow)" />
          <!-- The Wise White-Bearded Elder -->
          <g transform="translate(480, 240)">
            <ellipse cx="0" cy="120" rx="45" ry="90" fill="#E2E8F0" opacity="0.9" />
            <circle cx="0" cy="0" r="26" fill="#FDE047" />
            <!-- Long flowing white beard -->
            <path d="M -15 15 Q 0 85 15 15 Q 8 110 -8 110 Z" fill="#FFFFFF" />
            <!-- Outstretched hand holding golden brush -->
            <g transform="translate(-60, 40) rotate(35)">
              <rect x="0" y="0" width="10" height="90" fill="#F59E0B" rx="3" />
              <polygon points="0,0 10,0 5,-22" fill="#1C1917" />
              <circle cx="5" cy="-24" r="7" fill="#FEF08A" />
            </g>
          </g>
          <!-- Ma Liang in awe -->
          <g transform="translate(240, 340)">
            <ellipse cx="0" cy="50" rx="28" ry="45" fill="#0D9488" />
            <circle cx="0" cy="0" r="22" fill="#FDE047" />
            <!-- Big starry eyes -->
            <circle cx="-7" cy="-2" r="4" fill="#FFFFFF" />
            <circle cx="7" cy="-2" r="4" fill="#FFFFFF" />
          </g>
        </svg>`,
        illustrationCaption: "The wise starlight elder presenting the magical golden paintbrush to Ma Liang.",
        vocabulary: [
          {
            word: "Integrity",
            pronunciation: "in-TEG-rih-tee",
            definition: "Doing the right thing and keeping your promises, even when nobody is watching.",
            funFact: "Ancient Chinese legends often reward characters who show patient practice and true humility!",
          },
        ],
        hiddenStar: { xPercent: 49, yPercent: 47, clue: "Look right at the glowing tip of the magical golden brush!" },
        funActivity: "If you had a magic brush for one hour, what would you paint first?",
      },
      {
        pageNumber: 3,
        chapterTitle: "Chapter 3: The Living Water Buffalo",
        scenePrompt: "Ma Liang painting a sturdy water buffalo on the village stone wall; the buffalo steps out into the real rice field.",
        narrativeText:
          "The next morning, Ma Liang wanted to test the elder's gift. He walked out to the dry rice paddies, where an elderly farmer and his daughter were wearily pulling a heavy wooden plow under the hot sun. Ma Liang knelt by the stone well and carefully painted a sturdy, gentle water buffalo on the wall. Swish, flick! As soon as he added the final drop of ink for its eye—moo-oo! The buffalo blinked, shook its head, stepped right off the wall, and trotted happily to the plow to do all the heavy pulling!",
        dialogueLines: [
          {
            speaker: "Farmer",
            speakerRole: "character",
            avatar: "👨🏻‍🌾",
            text: "Look! A miracle! A gentle buffalo came right out of the painting to help us!",
            voiceName: "Captain Barnaby",
            mood: "overjoyed",
          },
          {
            speaker: "Ma Liang",
            speakerRole: "character",
            avatar: "🖌️",
            text: "Rest in the shade, grandfather! The buffalo will plow your fields until sunset!",
            voiceName: "Pip the Pixie",
            mood: "happy",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="paddySky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#38BDF8" />
              <stop offset="60%" stop-color="#FED7AA" />
              <stop offset="100%" stop-color="#BBF7D0" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#paddySky)" />
          <!-- Rice paddies -->
          <rect y="420" width="800" height="180" fill="#65A30D" />
          <ellipse cx="400" cy="480" rx="380" ry="60" fill="#3B82F6" opacity="0.3" />
          <!-- Stone Wall on left -->
          <rect x="40" y="240" width="220" height="240" fill="#94A3B8" stroke="#475569" stroke-width="6" rx="8" />
          <!-- Water Buffalo stepping off the wall into the paddy -->
          <g transform="translate(420, 380)">
            <ellipse cx="0" cy="30" rx="80" ry="50" fill="#334155" />
            <circle cx="85" cy="15" r="34" fill="#334155" />
            <!-- Curved horns -->
            <path d="M 80 -10 Q 70 -50 40 -40" stroke="#CBD5E1" stroke-width="8" stroke-linecap="round" fill="none" />
            <path d="M 95 -10 Q 105 -50 135 -40" stroke="#CBD5E1" stroke-width="8" stroke-linecap="round" fill="none" />
            <!-- Legs stepping out -->
            <rect x="-60" y="70" width="18" height="60" fill="#1E293B" rx="6" />
            <rect x="-10" y="70" width="18" height="60" fill="#1E293B" rx="6" />
            <rect x="40" y="70" width="18" height="60" fill="#1E293B" rx="6" />
          </g>
          <!-- Ma Liang holding paintbrush -->
          <g transform="translate(180, 380)">
            <ellipse cx="0" cy="40" rx="20" ry="32" fill="#0D9488" />
            <circle cx="0" cy="0" r="16" fill="#FDE047" />
            <line x1="12" y1="20" x2="40" y2="10" stroke="#F59E0B" stroke-width="4" />
          </g>
        </svg>`,
        illustrationCaption: "The gentle water buffalo stepping out of the wall into the lush green paddy fields.",
        vocabulary: [
          {
            word: "Water Buffalo",
            pronunciation: "WAH-ter BUFF-uh-loh",
            definition: "A strong, calm, gentle animal that has helped Asian farmers plant rice for thousands of years.",
            funFact: "Water buffalos love taking mud baths in the afternoon to stay cool and protect their skin!",
          },
        ],
        hiddenStar: { xPercent: 14, yPercent: 44, clue: "Look at the stone wall where Ma Liang painted the buffalo!" },
        funActivity: "Moo like a gentle, friendly water buffalo: Moo-ooo!",
      },
      {
        pageNumber: 4,
        chapterTitle: "Chapter 4: The Crane in the Starry Night",
        scenePrompt: "Ma Liang painting glowing paper lanterns, warm blankets, and a magnificent flying crane that scatters happiness over the whole village under the stars.",
        narrativeText:
          "From that day forward, Ma Liang used his brush to bring kindness wherever he walked. When winter frost arrived, he painted warm quilted blankets and sweet steamed dumplings for the elders. When the village wells ran low, he painted a bubbling clear fountain. And on festive nights, he painted a magnificent white crane with golden wingtips. The crane leaped into the sky, circled above the rooftops, and showered glittering sparks of good health and happiness over every family. Ma Liang smiled, tucked his brush into his pocket, and knew his art was the greatest gift of all.",
        dialogueLines: [
          {
            speaker: "Narrator",
            speakerRole: "narrator",
            avatar: "📖",
            text: "True magic does not come from gold or jade, but from using what we have to help our neighbors.",
            voiceName: "Grandma Willow",
            mood: "serene",
          },
          {
            speaker: "Ma Liang",
            speakerRole: "character",
            avatar: "🖌️",
            text: "Fly high, golden crane! Bring sweet dreams to every boy and girl in the world!",
            voiceName: "Pip the Pixie",
            mood: "triumphant",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="nightFestive" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#020617" />
              <stop offset="60%" stop-color="#1E1B4B" />
              <stop offset="100%" stop-color="#701A75" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#nightFestive)" />
          <!-- Full golden moon -->
          <circle cx="680" cy="120" r="50" fill="#FEF08A" />
          <!-- Floating Red Paper Lanterns with warm glow -->
          <g transform="translate(140, 160)">
            <ellipse cx="0" cy="0" rx="18" ry="24" fill="#DC2626" stroke="#FEF08A" stroke-width="2" />
            <line x1="0" y1="24" x2="0" y2="44" stroke="#F59E0B" stroke-width="2" />
          </g>
          <g transform="translate(260, 100)">
            <ellipse cx="0" cy="0" rx="16" ry="22" fill="#DC2626" stroke="#FEF08A" stroke-width="2" />
            <line x1="0" y1="22" x2="0" y2="40" stroke="#F59E0B" stroke-width="2" />
          </g>
          <g transform="translate(540, 180)">
            <ellipse cx="0" cy="0" rx="18" ry="24" fill="#DC2626" stroke="#FEF08A" stroke-width="2" />
            <line x1="0" y1="24" x2="0" y2="44" stroke="#F59E0B" stroke-width="2" />
          </g>
          <!-- Magnificent soaring Crane in center -->
          <g transform="translate(400, 240) scale(1.6)">
            <ellipse cx="0" cy="0" rx="40" ry="16" fill="#FFFFFF" />
            <circle cx="35" cy="-8" r="10" fill="#FFFFFF" />
            <circle cx="37" cy="-11" r="3.5" fill="#EF4444" />
            <path d="M 44 -8 L 65 -8" stroke="#D97706" stroke-width="2.5" />
            <!-- Broad golden wings -->
            <path d="M -15 -6 Q -55 -65 15 -45 Q 35 -45 20 -6 Z" fill="#F8FAFC" stroke="#CA8A04" stroke-width="2" />
            <path d="M -15 6 Q -55 65 15 45 Q 35 45 20 6 Z" fill="#F8FAFC" stroke="#CA8A04" stroke-width="2" />
            <!-- Golden sparks trailing -->
            <circle cx="-50" cy="0" r="4" fill="#FEF08A" />
            <circle cx="-70" cy="-10" r="3" fill="#FDE047" />
            <circle cx="-90" cy="15" r="4" fill="#FEF08A" />
          </g>
          <!-- Village roofs below -->
          <polygon points="60,600 180,600 120,530" fill="#1E293B" />
          <polygon points="180,600 320,600 250,520" fill="#334155" />
          <polygon points="460,600 620,600 540,510" fill="#1E293B" />
        </svg>`,
        illustrationCaption: "The magnificent painted crane soaring above village rooftops under glowing lanterns and starlight.",
        vocabulary: [
          {
            word: "Blessing",
            pronunciation: "BLESS-ing",
            definition: "A wonderful gift or event that brings comfort, happiness, and gratitude to your life.",
            funFact: "In Chinese art, red cranes represent long life, peace, and good fortune for all people!",
          },
        ],
        hiddenStar: { xPercent: 85, yPercent: 20, clue: "Look right near the glowing golden full moon!" },
        funActivity: "Spread your arms wide and glide softly around the room like a crane flying through starlight!",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // STORY 5: Tiddalik the Big Friendly Frog (Australia / Dreamtime)
  // ---------------------------------------------------------------------------
  {
    id: "tiddalik_frog",
    title: "Tiddalik the Big Friendly Frog",
    subtitle: "An Australian Aboriginal Dreamtime Story of Laughter & Sharing",
    region: "Oceania",
    country: "Australia",
    flag: "🇦🇺",
    culture: "First Nations / Aboriginal",
    ageRange: "4–8 years",
    readTimeMinutes: 4,
    theme: "Laughter, Forgiveness & Nature Balance",
    moral: "Laughter and a sense of humor have the magic power to heal, bring back joy, and connect everyone.",
    coverCloth: "#C2410C", // Outback red ochre
    coverSpine: "#9A3412",
    accentColor: "#EA580C",
    paperColor: "#FFFDF7",
    cardColor: "#FFEDD5",
    summary:
      "One sunny morning in the outback, Tiddalik the giant green frog drank every drop of water from the billabongs and streams. To bring the water back, the animals gathered to make Tiddalik laugh—and when a silly eel did a curly knot-dance, giggles saved the day!",
    coverSvg: `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="outbackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#F97316" />
          <stop offset="60%" stop-color="#C2410C" />
          <stop offset="100%" stop-color="#7C2D12" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#outbackGrad)" />
      <!-- Giant round Tiddalik Frog in center -->
      <g transform="translate(400, 300)">
        <ellipse cx="0" cy="20" rx="140" ry="110" fill="#22C55E" stroke="#15803D" stroke-width="8" />
        <ellipse cx="0" cy="40" rx="90" ry="70" fill="#86EFAC" />
        <!-- Big protruding eyes -->
        <circle cx="-55" cy="-80" r="36" fill="#22C55E" stroke="#15803D" stroke-width="6" />
        <circle cx="-55" cy="-80" r="20" fill="#FFFFFF" /><circle cx="-55" cy="-80" r="10" fill="#000" />
        <circle cx="55" cy="-80" r="36" fill="#22C55E" stroke="#15803D" stroke-width="6" />
        <circle cx="55" cy="-80" r="20" fill="#FFFFFF" /><circle cx="55" cy="-80" r="10" fill="#000" />
        <!-- Smiling wide mouth -->
        <path d="M -70 0 Q 0 45 70 0" stroke="#15803D" stroke-width="6" stroke-linecap="round" fill="none" />
      </g>
    </svg>`,
    pages: [
      {
        pageNumber: 1,
        chapterTitle: "Chapter 1: The Giant Gulp",
        scenePrompt: "Tiddalik the giant green frog sitting by an outback billabong surrounded by eucalyptus trees.",
        narrativeText:
          "In the ancient Dreamtime of Australia, when the red earth was young and kangaroos learned to leap, there lived Tiddalik. Tiddalik was a frog, but not an ordinary little pond frog—he was as huge as a boulder! One sweltering morning, Tiddalik woke up feeling terribly thirsty. Gulp! He drank the billabong dry. Glug-glug! He drank the river and the creek. Soon, he had swallowed all the fresh water in the land, puffing up as round as a green hot-air balloon!",
        dialogueLines: [
          {
            speaker: "Narrator",
            speakerRole: "narrator",
            avatar: "📖",
            text: "Tiddalik sat quietly under the eucalyptus leaves, round and silent as an enormous emerald hill.",
            voiceName: "Grandma Willow",
            mood: "playful",
          },
          {
            speaker: "Tiddalik",
            speakerRole: "character",
            avatar: "🐸",
            text: "*Buuuuurp!* Oh my, I feel so round and heavy! I think I will take a nice long nap.",
            voiceName: "Oliver the Gentle Bear",
            mood: "sleepy",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="outbackSky1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#38BDF8" />
              <stop offset="60%" stop-color="#FDBA74" />
              <stop offset="100%" stop-color="#FB923C" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#outbackSky1)" />
          <!-- Red Outback earth -->
          <rect y="440" width="800" height="160" fill="#B45309" />
          <ellipse cx="400" cy="500" rx="360" ry="70" fill="#78350F" opacity="0.3" />
          <!-- Tall Eucalyptus tree -->
          <path d="M 120 440 Q 140 260 130 80" stroke="#78350F" stroke-width="24" stroke-linecap="round" fill="none" />
          <ellipse cx="140" cy="90" rx="80" ry="40" fill="#4D7C0F" />
          <ellipse cx="100" cy="130" rx="70" ry="35" fill="#65A30D" />
          <!-- Giant Round Tiddalik in center -->
          <g transform="translate(460, 390)">
            <ellipse cx="0" cy="0" rx="130" ry="100" fill="#22C55E" stroke="#16A34A" stroke-width="6" />
            <ellipse cx="0" cy="15" rx="85" ry="65" fill="#86EFAC" />
            <!-- Eyes on top -->
            <circle cx="-50" cy="-85" r="32" fill="#22C55E" />
            <circle cx="-50" cy="-85" r="16" fill="#FFF" /><circle cx="-50" cy="-85" r="8" fill="#000" />
            <circle cx="50" cy="-85" r="32" fill="#22C55E" />
            <circle cx="50" cy="-85" r="16" fill="#FFF" /><circle cx="50" cy="-85" r="8" fill="#000" />
            <!-- Content round belly -->
            <path d="M -50 -10 Q 0 15 50 -10" stroke="#15803D" stroke-width="4" fill="none" />
          </g>
        </svg>`,
        illustrationCaption: "Tiddalik the giant frog puffed up like a green balloon beside the dry billabong.",
        vocabulary: [
          {
            word: "Billabong",
            pronunciation: "BILL-uh-bong",
            definition: "An Australian term for an oxbow waterhole or quiet pond left when a river changes course.",
            funFact: "Billabongs are lifelines for koalas, platypuses, and cockatoos during hot summer days!",
          },
        ],
        hiddenStar: { xPercent: 17, yPercent: 15, clue: "Look in the leafy green eucalyptus branches on the left!" },
        funActivity: "Puff your cheeks out like big round frog bubbles for five seconds!",
      },
      {
        pageNumber: 2,
        chapterTitle: "Chapter 2: The Bushland Council",
        scenePrompt: "Wombat, Kangaroo, and Kookaburra holding a council meeting beneath yellow wattle blossoms.",
        narrativeText:
          "Without water, the animals of the bushland grew very worried. Kangaroo hopped over: 'The grass is turning brittle!' Wombat dug in the dry soil: 'My paws are dusty!' Up in the branches, Kookaburra laughed his hearty laugh: 'Kook-kook-kaa-kaa! If we fight Tiddalik, he won't budge. But what if we make him laugh? If he opens his mouth for a big belly giggle, all the cool water will rush right back out!' All the animals nodded: 'A comedy show for Tiddalik!'",
        dialogueLines: [
          {
            speaker: "Kookaburra",
            speakerRole: "character",
            avatar: "🐦",
            text: "Kook-kook-kaa-kaa! A giant laugh can open the tightest jar!",
            voiceName: "Captain Barnaby",
            mood: "boisterous",
          },
          {
            speaker: "Kangaroo",
            speakerRole: "character",
            avatar: "🦘",
            text: "I can do high jumps and somersaults over the spinifex grass!",
            voiceName: "Pip the Pixie",
            mood: "eager",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="wattleSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#BAE6FD" />
              <stop offset="100%" stop-color="#FEF08A" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#wattleSky)" />
          <rect y="440" width="800" height="160" fill="#B45309" />
          <!-- Bright golden yellow wattle flowers -->
          <circle cx="160" cy="180" r="14" fill="#FBBF24" />
          <circle cx="190" cy="160" r="16" fill="#FDE047" />
          <circle cx="220" cy="190" r="12" fill="#FBBF24" />
          <!-- Kangaroo standing tall on right -->
          <g transform="translate(560, 360)">
            <ellipse cx="0" cy="40" rx="35" ry="55" fill="#D97706" />
            <circle cx="-15" cy="-20" r="22" fill="#D97706" />
            <!-- Long ears -->
            <polygon points="-28,-55 -22,-30 -14,-30" fill="#B45309" />
            <polygon points="-12,-55 -8,-30 0,-30" fill="#B45309" />
            <!-- Big kangaroo tail on ground -->
            <path d="M 25 70 Q 70 85 80 60" stroke="#D97706" stroke-width="16" stroke-linecap="round" fill="none" />
          </g>
          <!-- Wombat on left -->
          <g transform="translate(240, 430)">
            <ellipse cx="0" cy="15" rx="40" ry="26" fill="#78350F" />
            <circle cx="-30" cy="5" r="18" fill="#78350F" />
            <circle cx="-38" cy="5" r="4" fill="#000" />
          </g>
          <!-- Kookaburra on a branch above -->
          <g transform="translate(380, 220)">
            <ellipse cx="0" cy="0" rx="28" ry="18" fill="#F8FAFC" stroke="#78350F" stroke-width="2" />
            <circle cx="20" cy="-8" r="14" fill="#F8FAFC" />
            <!-- Big beak -->
            <polygon points="32,-12 60,-4 32,4" fill="#B45309" />
          </g>
        </svg>`,
        illustrationCaption: "Kangaroo, Wombat, and Kookaburra planning the funniest comedy show in the outback.",
        vocabulary: [
          {
            word: "Kookaburra",
            pronunciation: "KOOK-uh-burr-uh",
            definition: "An Australian kingfisher bird famous for its loud, infectious call that sounds like human laughter!",
            funFact: "Kookaburras call at sunrise and sunset, earning them the nickname 'the Bushman's Clock'!",
          },
        ],
        hiddenStar: { xPercent: 24, yPercent: 30, clue: "Look right beside the fluffy yellow wattle blossoms!" },
        funActivity: "Try your best Kookaburra laugh: Koo-kaa-kaa-kaa!",
      },
      {
        pageNumber: 3,
        chapterTitle: "Chapter 3: The Wiggling Eel Dance",
        scenePrompt: "Nabunum the river eel dancing, twisting, and tying himself into hilarious pretzel knots on the sand in front of Tiddalik.",
        narrativeText:
          "First, Kangaroo hopped on his tail and did three backwards flips, but Tiddalik only closed one sleepy eye. Next, Wombat tried to balance a melon on his snout, but Tiddalik only gave a little yawn. Then, from the dried mud stepped Nabunum the river eel. He wriggled onto his tail and began a wild, wacky dance! He twisted like a noodle, looped into a pretzel, tied himself into a bow-tie, and wiggled his silly eyebrows at Tiddalik.",
        dialogueLines: [
          {
            speaker: "Nabunum the Eel",
            speakerRole: "character",
            avatar: "🐍",
            text: "Look at me, Tiddalik! I'm a jump rope! I'm a curly spaghetti noodle!",
            voiceName: "Pip the Pixie",
            mood: "silly",
          },
          {
            speaker: "Narrator",
            speakerRole: "narrator",
            avatar: "📖",
            text: "Tiddalik's round tummy began to wobble, and the corners of his mouth twitched.",
            voiceName: "Grandma Willow",
            mood: "amused",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="eelDanceSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#FDE047" />
              <stop offset="60%" stop-color="#FB923C" />
              <stop offset="100%" stop-color="#EA580C" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#eelDanceSky)" />
          <rect y="460" width="800" height="140" fill="#B45309" />
          <!-- Tiddalik watching with twitching smile on left -->
          <g transform="translate(220, 380)">
            <ellipse cx="0" cy="0" rx="110" ry="85" fill="#22C55E" />
            <circle cx="-40" cy="-70" r="26" fill="#22C55E" />
            <circle cx="-40" cy="-70" r="12" fill="#FFF" /><circle cx="-40" cy="-70" r="6" fill="#000" />
            <circle cx="40" cy="-70" r="26" fill="#22C55E" />
            <circle cx="40" cy="-70" r="12" fill="#FFF" /><circle cx="40" cy="-70" r="6" fill="#000" />
            <!-- Quivering smile -->
            <path d="M -40 10 Q 0 35 40 10" stroke="#15803D" stroke-width="5" fill="none" />
          </g>
          <!-- Nabunum the Eel doing wild pretzel dance on right -->
          <g transform="translate(560, 360)">
            <!-- Crazy curvy eel loops -->
            <path d="M 0 100 C -60 60 -60 -20 0 -40 C 60 -60 80 40 0 0 C -60 -40 -20 -120 40 -100" stroke="#38BDF8" stroke-width="22" stroke-linecap="round" fill="none" />
            <path d="M 0 100 C -60 60 -60 -20 0 -40 C 60 -60 80 40 0 0 C -60 -40 -20 -120 40 -100" stroke="#0284C7" stroke-width="14" stroke-linecap="round" fill="none" />
            <!-- Eel cute face at top -->
            <circle cx="45" cy="-105" r="14" fill="#38BDF8" />
            <circle cx="40" cy="-110" r="3" fill="#FFF" /><circle cx="40" cy="-110" r="1.5" fill="#000" />
            <circle cx="50" cy="-110" r="3" fill="#FFF" /><circle cx="50" cy="-110" r="1.5" fill="#000" />
          </g>
        </svg>`,
        illustrationCaption: "Nabunum the river eel twisting into hilarious pretzel knots in front of smiling Tiddalik.",
        vocabulary: [
          {
            word: "Somersault",
            pronunciation: "SUM-er-sawlt",
            definition: "A playful acrobatic roll where your feet go up over your head.",
            funFact: "Eels are so flexible because their spine has over one hundred tiny vertebrae bones!",
          },
        ],
        hiddenStar: { xPercent: 68, yPercent: 44, clue: "Look inside one of the silly loops of the dancing eel!" },
        funActivity: "Can you wiggle your fingers and arms like a dancing river eel?",
      },
      {
        pageNumber: 4,
        chapterTitle: "Chapter 4: The Great Splash of Joy",
        scenePrompt: "Tiddalik bursting into joyful roaring laughter, shooting crystal water fountains into the air and filling the billabong.",
        narrativeText:
          "Tiddalik could hold it in no longer! First came a chuckle: *Heh-heh-heh!* Then a snort: *Snrk-giggle!* And finally, an earth-shaking, sky-rattling roar of laughter: *GWA-HA-HA-HA!* As Tiddalik threw his head back in joy, a crystal geyser of cool sparkling water gushed from his mouth! Streams rushed back into the canyons, the dry red billabong filled with sweet ripples, and water lilies bloomed overnight. Tiddalik swam happily with the turtles, promising to always share the cool water with his friends.",
        dialogueLines: [
          {
            speaker: "Tiddalik",
            speakerRole: "character",
            avatar: "🐸",
            text: "GWA-HA-HA! Oh, my belly hurts from laughing! That eel is the funniest creature on earth!",
            voiceName: "Oliver the Gentle Bear",
            mood: "laughing",
          },
          {
            speaker: "Narrator",
            speakerRole: "narrator",
            avatar: "📖",
            text: "And so laughter restored the waters, filling the Australian outback with singing birds and blooming life.",
            voiceName: "Grandma Willow",
            mood: "peaceful",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="waterJoySky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#0284C7" />
              <stop offset="50%" stop-color="#38BDF8" />
              <stop offset="100%" stop-color="#BAE6FD" />
            </linearGradient>
            <linearGradient id="billabongBlue" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#38BDF8" />
              <stop offset="100%" stop-color="#0369A1" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#waterJoySky)" />
          <!-- Sparkling full billabong -->
          <ellipse cx="400" cy="500" rx="390" ry="100" fill="url(#billabongBlue)" />
          <!-- Giant Geyser of sparkling water spraying into the sky -->
          <path d="M 370 420 Q 340 180 200 120" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round" fill="none" opacity="0.9" />
          <path d="M 430 420 Q 460 180 600 120" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round" fill="none" opacity="0.9" />
          <path d="M 400 420 Q 400 140 400 60" stroke="#E0F2FE" stroke-width="18" stroke-linecap="round" fill="none" opacity="0.9" />
          <!-- Droplets of sparkling water -->
          <circle cx="210" cy="110" r="10" fill="#38BDF8" />
          <circle cx="390" cy="50" r="12" fill="#38BDF8" />
          <circle cx="590" cy="110" r="10" fill="#38BDF8" />
          <circle cx="280" cy="160" r="8" fill="#FFFFFF" />
          <circle cx="510" cy="160" r="8" fill="#FFFFFF" />
          <!-- Tiddalik in center laughing happily -->
          <g transform="translate(400, 440)">
            <ellipse cx="0" cy="0" rx="90" ry="65" fill="#22C55E" />
            <circle cx="-35" cy="-55" r="22" fill="#22C55E" />
            <circle cx="35" cy="-55" r="22" fill="#22C55E" />
            <!-- Wide open laughing mouth -->
            <ellipse cx="0" cy="0" rx="40" ry="25" fill="#7F1D1D" stroke="#FEF08A" stroke-width="4" />
          </g>
          <!-- Water lilies floating -->
          <circle cx="160" cy="520" r="20" fill="#22C55E" />
          <circle cx="160" cy="520" r="10" fill="#F472B6" />
          <circle cx="640" cy="510" r="22" fill="#22C55E" />
          <circle cx="640" cy="510" r="11" fill="#F472B6" />
        </svg>`,
        illustrationCaption: "Crystal water erupting in a sparkling geyser as Tiddalik roars with happy laughter.",
        vocabulary: [
          {
            word: "Geyser",
            pronunciation: "GUY-zer",
            definition: "A powerful, natural fountain that shoots water and mist high into the air.",
            funFact: "In Aboriginal culture, stories like Tiddalik taught children how precious fresh water is in the dry desert seasons!",
          },
        ],
        hiddenStar: { xPercent: 50, yPercent: 11, clue: "Look right at the highest crest of the sparkling water geyser!" },
        funActivity: "Let out the biggest, warmest belly laugh you can: Ha-ha-ha-ha!",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // STORY 6: The Little Sea Turtle's Star Voyage (Polynesia / Pacific Ocean)
  // ---------------------------------------------------------------------------
  {
    id: "moana_turtle_voyage",
    title: "The Little Sea Turtle's Star Voyage",
    subtitle: "A Polynesian Tale of Constellations & Ocean Wayfinding",
    region: "Polynesia",
    country: "Hawaii & Samoa",
    flag: "🌺",
    culture: "Polynesian / Pacific Islander",
    ageRange: "4–9 years",
    readTimeMinutes: 5,
    theme: "Curiosity, Family & Wayfinding",
    moral: "Trust the light of the stars, listen to your elders, and remember the ocean connects us all.",
    coverCloth: "#0284C7", // Pacific sapphire blue
    coverSpine: "#0369A1",
    accentColor: "#0284C7",
    paperColor: "#FFFDF7",
    cardColor: "#E0F2FE",
    summary:
      "On a warm moonlit beach in the South Pacific, tiny Moana the green sea turtle hatches from the sand. Guided by the glowing Southern Cross constellation and friendly manta rays, she navigates across the sapphire ocean back to her family's island lagoon.",
    coverSvg: `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="oceanCoverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0C4A6E" />
          <stop offset="50%" stop-color="#0284C7" />
          <stop offset="100%" stop-color="#065F46" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#oceanCoverGrad)" />
      <!-- Star Constellations in night sky -->
      <polygon points="400,60 404,72 416,73 406,82 410,94 400,87 390,94 394,82 384,73 396,72" fill="#FEF08A" />
      <polygon points="400,140 404,152 416,153 406,162 410,174 400,167 390,174 394,162 384,153 396,152" fill="#FEF08A" />
      <polygon points="350,100 354,112 366,113 356,122 360,134 350,127 340,134 344,122 334,113 346,112" fill="#FEF08A" />
      <polygon points="450,100 454,112 466,113 456,122 460,134 450,127 440,134 444,122 434,113 446,112" fill="#FEF08A" />
      <!-- Lines connecting Southern Cross -->
      <line x1="400" y1="75" x2="400" y2="155" stroke="#FEF08A" stroke-width="2" stroke-dasharray="4 4" opacity="0.6" />
      <line x1="350" y1="115" x2="450" y2="115" stroke="#FEF08A" stroke-width="2" stroke-dasharray="4 4" opacity="0.6" />
      <!-- Baby Sea Turtle Swimming -->
      <g transform="translate(400, 320) scale(1.6)">
        <ellipse cx="0" cy="0" rx="32" ry="24" fill="#059669" stroke="#34D399" stroke-width="3" />
        <circle cx="28" cy="0" r="14" fill="#10B981" />
        <!-- Shell pattern -->
        <polygon points="0,-12 12,-5 12,5 0,12 -12,5 -12,-5" fill="#047857" stroke="#34D399" stroke-width="1.5" />
        <!-- Flippers -->
        <path d="M 15 -14 Q 35 -38 10 -40 Q -5 -35 5 -14" fill="#10B981" />
        <path d="M 15 14 Q 35 38 10 40 Q -5 35 5 14" fill="#10B981" />
        <path d="M -20 -10 Q -35 -24 -25 -26 Q -15 -20 -15 -10" fill="#059669" />
        <path d="M -20 10 Q -35 24 -25 26 Q -15 20 -15 10" fill="#059669" />
      </g>
    </svg>`,
    pages: [
      {
        pageNumber: 1,
        chapterTitle: "Chapter 1: The Moonlit Coral Sand",
        scenePrompt: "Tiny baby sea turtle hatching on moonlit golden sand under swaying tropical palm trees.",
        narrativeText:
          "Beneath the silver glow of a Polynesian full moon, the warm coral sands of a palm-fringed island began to stir. Scritch-scratch! Out poked a tiny green nose, followed by two bright, curious black eyes. It was Moana, a baby green sea turtle no larger than a child's seashell. The warm night breeze smelled of frangipani flowers and salt water. All around her, the gentle whisper of the Pacific surf seemed to call: 'Welcome to the world, little voyager!'",
        dialogueLines: [
          {
            speaker: "Narrator",
            speakerRole: "narrator",
            avatar: "📖",
            text: "Born on the softest sand under a canopy of stars, little Moana looked toward the singing ocean.",
            voiceName: "Grandma Willow",
            mood: "tender",
          },
          {
            speaker: "Moana",
            speakerRole: "character",
            avatar: "🐢",
            text: "The waves sound like a lullaby! I'm ready to swim!",
            voiceName: "Pip the Pixie",
            mood: "excited",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="nightPacific" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#082F49" />
              <stop offset="60%" stop-color="#0284C7" />
              <stop offset="100%" stop-color="#38BDF8" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#nightPacific)" />
          <!-- Full Moon -->
          <circle cx="680" cy="110" r="45" fill="#FEF08A" />
          <circle cx="680" cy="110" r="75" fill="#FEF08A" opacity="0.2" />
          <!-- Swaying Palm Trees on left -->
          <path d="M 60 600 Q 140 380 180 200" stroke="#78350F" stroke-width="18" fill="none" />
          <path d="M 180 200 Q 100 160 30 180" stroke="#16A34A" stroke-width="10" stroke-linecap="round" fill="none" />
          <path d="M 180 200 Q 200 120 280 130" stroke="#16A34A" stroke-width="10" stroke-linecap="round" fill="none" />
          <path d="M 180 200 Q 240 220 300 240" stroke="#15803D" stroke-width="10" stroke-linecap="round" fill="none" />
          <!-- Sandy Shore -->
          <path d="M 0 460 Q 400 420 800 480 L 800 600 L 0 600 Z" fill="#FDE68A" />
          <!-- Baby Turtle Moana scuttling toward water -->
          <g transform="translate(420, 500) scale(1.3)">
            <ellipse cx="0" cy="0" rx="24" ry="18" fill="#059669" />
            <circle cx="20" cy="0" r="10" fill="#10B981" />
            <circle cx="23" cy="-4" r="2.5" fill="#000" />
            <!-- Front flippers -->
            <path d="M 10 -12 Q 25 -28 5 -30" stroke="#10B981" stroke-width="6" stroke-linecap="round" fill="none" />
            <path d="M 10 12 Q 25 28 5 30" stroke="#10B981" stroke-width="6" stroke-linecap="round" fill="none" />
          </g>
        </svg>`,
        illustrationCaption: "Baby Moana hatching under the glowing full moon and scuttling toward the ocean waves.",
        vocabulary: [
          {
            word: "Voyager",
            pronunciation: "VOY-uh-jer",
            definition: "A brave traveler who sails or swims across vast oceans to discover new lands and islands.",
            funFact: "Polynesian wayfinders sailed thousands of miles across open seas without a compass, using only birds, clouds, and stars!",
          },
        ],
        hiddenStar: { xPercent: 85, yPercent: 19, clue: "Look right beside the glowing silver full moon!" },
        funActivity: "Pretend you are a baby turtle taking your very first swim in warm tropical water!",
      },
      {
        pageNumber: 2,
        chapterTitle: "Chapter 2: The Southern Cross in the Sky",
        scenePrompt: "Moana swimming in turquoise waves at night, looking up at the glowing Southern Cross constellation guiding her path.",
        narrativeText:
          "Plash! Moana dove into the first crystal wave. The water was refreshing and warm as bathwater. But out on the open sea, which way should a little turtle swim? Moana remembered the wisdom passed down in turtle blood: 'Look to the sky, little one.' High above the glittering water shone four bright diamond stars shaped like a cross. In Polynesian wayfinding, this is the Southern Cross. As long as she kept the cross twinkling above her right flipper, she would safely ride the warm Equatorial Current.",
        dialogueLines: [
          {
            speaker: "Narrator",
            speakerRole: "narrator",
            avatar: "📖",
            text: "The stars became Moana's sparkling map, guiding her heart across thousands of ocean miles.",
            voiceName: "Grandma Willow",
            mood: "serene",
          },
          {
            speaker: "Moana",
            speakerRole: "character",
            avatar: "🐢",
            text: "Thank you, stars! You light up the whole sea like a magical nightlight!",
            voiceName: "Pip the Pixie",
            mood: "happy",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="deepOceanSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#020617" />
              <stop offset="50%" stop-color="#0369A1" />
              <stop offset="100%" stop-color="#0284C7" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#deepOceanSky)" />
          <!-- Sparkling Southern Cross Constellation -->
          <g transform="translate(560, 140)">
            <polygon points="0,-60 4,-48 16,-47 6,-38 10,-26 0,-33 -10,-26 -6,-38 -16,-47 -4,-48" fill="#FEF08A" />
            <polygon points="0,60 4,72 16,73 6,82 10,94 0,87 -10,94 -6,82 -16,73 -4,72" fill="#FEF08A" />
            <polygon points="-50,0 -46,12 -34,13 -44,22 -40,34 -50,27 -60,34 -56,22 -66,13 -54,12" fill="#FEF08A" />
            <polygon points="50,0 54,12 66,13 56,22 60,34 50,27 40,34 44,22 34,13 46,12" fill="#FEF08A" />
            <line x1="0" y1="-45" x2="0" y2="75" stroke="#FEF08A" stroke-width="2" stroke-dasharray="4 4" opacity="0.7" />
            <line x1="-50" y1="15" x2="50" y2="15" stroke="#FEF08A" stroke-width="2" stroke-dasharray="4 4" opacity="0.7" />
          </g>
          <!-- Gentle rolling ocean waves with bioluminescence -->
          <path d="M 0 380 Q 200 350 400 380 T 800 380 L 800 600 L 0 600 Z" fill="#0C4A6E" />
          <path d="M 0 440 Q 200 410 400 440 T 800 440 L 800 600 L 0 600 Z" fill="#0369A1" opacity="0.8" />
          <!-- Moana swimming proudly -->
          <g transform="translate(280, 460) scale(1.5)">
            <ellipse cx="0" cy="0" rx="26" ry="18" fill="#059669" stroke="#34D399" stroke-width="2" />
            <circle cx="22" cy="-4" r="10" fill="#10B981" />
            <path d="M 12 -14 Q 30 -35 8 -36" stroke="#10B981" stroke-width="5" stroke-linecap="round" fill="none" />
            <path d="M 12 14 Q 30 35 8 36" stroke="#10B981" stroke-width="5" stroke-linecap="round" fill="none" />
          </g>
        </svg>`,
        illustrationCaption: "Moana gliding gracefully under the glittering Southern Cross constellation.",
        vocabulary: [
          {
            word: "Constellation",
            pronunciation: "con-stel-LAY-shun",
            definition: "A recognizable pattern of stars in the night sky named after people, animals, or objects.",
            funFact: "The Southern Cross can only be seen from the Southern Hemisphere and has guided sailors for thousands of years!",
          },
        ],
        hiddenStar: { xPercent: 70, yPercent: 23, clue: "Look right in the center of the Southern Cross constellation!" },
        funActivity: "Connect 4 dots on a piece of paper to make your own secret star constellation!",
      },
      {
        pageNumber: 3,
        chapterTitle: "Chapter 3: The Bioluminescent Reef",
        scenePrompt: "Moana swimming deep into a magical underwater coral reef alongside gentle manta rays and glowing turquoise jellyfish.",
        narrativeText:
          "As Moana dove down deeper into the open reef, the ocean lit up with living starlight! Thousands of tiny organisms glowed in emerald and electric blue every time she fluttered her flippers. A gentle spotted manta ray, with wings wider than a royal outrigger canoe, glided quietly beneath her like a flying carpet. 'Kia ora, little traveler,' hummed the manta ray with a deep, soothing vibration. 'Follow the singing humpback whales toward the sunrise, and you will reach your grandmother's lagoon.'",
        dialogueLines: [
          {
            speaker: "Manta Ray",
            speakerRole: "character",
            avatar: "🌊",
            text: "Ride with the current, little turtle. The ocean cradles all who travel with kindness.",
            voiceName: "Oliver the Gentle Bear",
            mood: "wise",
          },
          {
            speaker: "Moana",
            speakerRole: "character",
            avatar: "🐢",
            text: "Everything is glowing! It's like swimming through a sky full of fireworks!",
            voiceName: "Pip the Pixie",
            mood: "amazed",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="reefWater" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#0369A1" />
              <stop offset="60%" stop-color="#0F766E" />
              <stop offset="100%" stop-color="#042F2E" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#reefWater)" />
          <!-- Giant Manta Ray gliding gracefully below -->
          <g transform="translate(460, 380)">
            <path d="M 0 -30 Q -180 -10 -220 50 Q -100 80 0 70 Q 100 80 220 50 Q 180 -10 0 -30 Z" fill="#0F172A" stroke="#38BDF8" stroke-width="3" />
            <!-- Spots on manta ray -->
            <circle cx="-50" cy="20" r="5" fill="#FFFFFF" opacity="0.8" />
            <circle cx="-20" cy="35" r="4" fill="#FFFFFF" opacity="0.8" />
            <circle cx="20" cy="35" r="4" fill="#FFFFFF" opacity="0.8" />
            <circle cx="50" cy="20" r="5" fill="#FFFFFF" opacity="0.8" />
            <!-- Whip tail -->
            <line x1="0" y1="70" x2="0" y2="190" stroke="#0F172A" stroke-width="4" />
          </g>
          <!-- Bioluminescent glowing Jellyfish -->
          <g transform="translate(180, 240)">
            <ellipse cx="0" cy="0" rx="28" ry="20" fill="#2DD4BF" opacity="0.75" />
            <path d="M -15 15 Q -10 50 -15 80 M 0 18 Q 5 55 0 85 M 15 15 Q 10 50 15 80" stroke="#5EEAD4" stroke-width="2.5" fill="none" opacity="0.7" />
          </g>
          <!-- Moana swimming alongside -->
          <g transform="translate(360, 220) scale(1.4)">
            <ellipse cx="0" cy="0" rx="24" ry="16" fill="#059669" stroke="#34D399" stroke-width="2" />
            <circle cx="20" cy="-2" r="9" fill="#10B981" />
            <path d="M 10 -12 Q 28 -30 6 -32" stroke="#10B981" stroke-width="5" stroke-linecap="round" fill="none" />
            <path d="M 10 12 Q 28 30 6 32" stroke="#10B981" stroke-width="5" stroke-linecap="round" fill="none" />
          </g>
        </svg>`,
        illustrationCaption: "The gentle manta ray and glowing jellyfish illuminating Moana's deep-sea voyage.",
        vocabulary: [
          {
            word: "Bioluminescence",
            pronunciation: "by-oh-loo-min-ESS-enss",
            definition: "The magical light produced naturally by living sea creatures, like glowing jellyfish and fireflies.",
            funFact: "Over 75% of deep-sea ocean animals make their own light in the dark!",
          },
        ],
        hiddenStar: { xPercent: 23, yPercent: 40, clue: "Look right inside the dome of the glowing turquoise jellyfish!" },
        funActivity: "Glide your hands through the air like the wings of a gentle manta ray!",
      },
      {
        pageNumber: 4,
        chapterTitle: "Chapter 4: The Golden Island Lagoon",
        scenePrompt: "Moana arriving at a crystal turquoise island lagoon, reuniting with her grandmother and a school of happy sea turtles under a golden sunrise.",
        narrativeText:
          "As the first rays of morning sun painted the Pacific in warm coral and gold, Moana felt the current slow into a calm, sheltered bay. Ahead lay an emerald island ringed by powdery white sand and coconut palms. There, resting peacefully on a sunlit reef of purple sea fans, was her grandmother—a wise, ancient green sea turtle with moss growing softly on her shell. 'Welcome home, little explorer!' called grandmother with a happy flip of her flippers. Moana dove into the gentle embrace of the reef, knowing that no matter how big the ocean is, love always guides you home.",
        dialogueLines: [
          {
            speaker: "Grandmother Turtle",
            speakerRole: "character",
            avatar: "👵🏽🐢",
            text: "You followed the Southern Cross and navigated the great sea! We are so proud of you, Moana!",
            voiceName: "Grandma Willow",
            mood: "loving",
          },
          {
            speaker: "Moana",
            speakerRole: "character",
            avatar: "🐢",
            text: "Grandmother! The ocean was full of friends and glowing lights! I love our home!",
            voiceName: "Pip the Pixie",
            mood: "joyous",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lagoonSunrise" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#FED7AA" />
              <stop offset="40%" stop-color="#FDE047" />
              <stop offset="70%" stop-color="#38BDF8" />
              <stop offset="100%" stop-color="#0284C7" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#lagoonSunrise)" />
          <!-- Golden Sun rising over emerald island in distance -->
          <circle cx="400" cy="220" r="60" fill="#FEF08A" />
          <path d="M 240 260 Q 400 200 560 260 Z" fill="#047857" />
          <!-- Clear turquoise lagoon water -->
          <ellipse cx="400" cy="460" rx="380" ry="120" fill="#2DD4BF" opacity="0.6" />
          <!-- Grandmother Turtle on left -->
          <g transform="translate(260, 440) scale(1.6)">
            <ellipse cx="0" cy="0" rx="36" ry="26" fill="#047857" stroke="#10B981" stroke-width="3" />
            <circle cx="32" cy="-4" r="14" fill="#059669" />
            <path d="M 18 -18 Q 42 -40 14 -42" stroke="#10B981" stroke-width="6" stroke-linecap="round" fill="none" />
            <path d="M 18 18 Q 42 40 14 42" stroke="#10B981" stroke-width="6" stroke-linecap="round" fill="none" />
          </g>
          <!-- Little Moana swimming to meet her -->
          <g transform="translate(520, 430) scale(1.2)">
            <ellipse cx="0" cy="0" rx="24" ry="16" fill="#059669" stroke="#34D399" stroke-width="2" />
            <circle cx="-20" cy="-2" r="9" fill="#10B981" />
            <path d="M -10 -12 Q -28 -30 -6 -32" stroke="#10B981" stroke-width="5" stroke-linecap="round" fill="none" />
            <path d="M -10 12 Q -28 30 -6 32" stroke="#10B981" stroke-width="5" stroke-linecap="round" fill="none" />
          </g>
        </svg>`,
        illustrationCaption: "Little Moana reuniting with her grandmother in the warm, crystal turquoise island lagoon.",
        vocabulary: [
          {
            word: "Lagoon",
            pronunciation: "luh-GOON",
            definition: "A calm, shallow body of clear water protected from strong ocean waves by a ring of coral reef.",
            funFact: "Coral reefs protect island shores from giant waves during tropical storms!",
          },
        ],
        hiddenStar: { xPercent: 50, yPercent: 37, clue: "Look right at the glowing sunrise over the emerald island peak!" },
        funActivity: "Give someone you love a warm, cozy turtle hug today!",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // STORY 7: Lars and the Dancing Northern Lights (Norway / Scandinavia)
  // ---------------------------------------------------------------------------
  {
    id: "lars_northern_lights",
    title: "Lars and the Dancing Northern Lights",
    subtitle: "A Nordic Tale of Aurora Wonders & Gentle Courage",
    region: "Northern Europe",
    country: "Norway",
    flag: "🇳🇴",
    culture: "Scandinavian / Nordic",
    ageRange: "4–8 years",
    readTimeMinutes: 5,
    theme: "Curiosity & Bedtime Serenity",
    moral: "Even in the coldest winter, the warm light of friendship and family guides us safely home.",
    coverCloth: "#1E3A8A", // Deep Nordic fjord navy
    coverSpine: "#172554",
    accentColor: "#0284C7",
    paperColor: "#FFFDF7",
    cardColor: "#E0F2FE",
    summary:
      "Beneath the starry winter skies of Norway, little polar bear cub Lars sets out with Puffin the bird to discover where the glowing green northern lights dance. Along the snowy fjords, he finds that the auroras are the sky's gentle bedtime lullaby.",
    coverSvg: `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="auroraCoverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#020617" />
          <stop offset="40%" stop-color="#064E3B" />
          <stop offset="70%" stop-color="#0284C7" />
          <stop offset="100%" stop-color="#0F172A" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#auroraCoverGrad)" />
      <!-- Swirling emerald green aurora ribbons -->
      <path d="M 0 140 Q 200 40 400 120 T 800 80" stroke="#34D399" stroke-width="26" fill="none" opacity="0.75" />
      <path d="M 0 170 Q 250 80 500 160 T 800 110" stroke="#6EE7B7" stroke-width="18" fill="none" opacity="0.6" />
      <path d="M 0 200 Q 300 120 600 180 T 800 140" stroke="#A7F3D0" stroke-width="10" fill="none" opacity="0.5" />
      <!-- Snowy Fjord Mountain Silhouettes -->
      <polygon points="120,240 20,440 240,440" fill="#0F172A" />
      <polygon points="120,240 80,300 160,300" fill="#FFFFFF" />
      <polygon points="680,220 540,460 790,460" fill="#0F172A" />
      <polygon points="680,220 630,290 730,290" fill="#FFFFFF" />
      <!-- Little white polar bear cub Lars -->
      <g transform="translate(400, 360)">
        <ellipse cx="0" cy="25" rx="55" ry="38" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="3" />
        <circle cx="0" cy="-15" r="30" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="3" />
        <circle cx="-24" cy="-35" r="11" fill="#F8FAFC" />
        <circle cx="24" cy="-35" r="11" fill="#F8FAFC" />
        <circle cx="-10" cy="-18" r="4" fill="#0F172A" />
        <circle cx="10" cy="-18" r="4" fill="#0F172A" />
        <ellipse cx="0" cy="-6" rx="7" ry="5" fill="#0F172A" />
      </g>
    </svg>`,
    pages: [
      {
        pageNumber: 1,
        chapterTitle: "Chapter 1: The Snowy Fjord Starlight",
        scenePrompt: "Lars the fluffy white polar bear cub sitting on a snowy hill overlooking a tranquil Norwegian fjord under dark sapphire skies.",
        narrativeText:
          "High above the Arctic Circle in Norway, winter nights are long, cozy, and silent. Lars, a little polar bear cub with fur as soft as fresh powdered snow, sat beside his mother's warm den. Down in the fjord, the dark sapphire water reflected millions of twinkling winter stars like diamonds sprinkled on velvet. 'Mama,' whispered Lars with wide, curious eyes, 'why is the sky so quiet tonight?' Mother bear nuzzled him gently: 'Because the sky is waiting for the Northern Lights to dance.'",
        dialogueLines: [
          {
            speaker: "Narrator",
            speakerRole: "narrator",
            avatar: "📖",
            text: "The snow squeaked softly beneath Lars's round paws as he looked up at the vast northern sky.",
            voiceName: "Grandma Willow",
            mood: "peaceful",
          },
          {
            speaker: "Lars",
            speakerRole: "character",
            avatar: "🐻‍❄️",
            text: "Look, Mama! The stars are blinking! Will the green ribbons come out soon?",
            voiceName: "Pip the Pixie",
            mood: "curious",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="fjordSky1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#020617" />
              <stop offset="60%" stop-color="#0B1329" />
              <stop offset="100%" stop-color="#1E3A8A" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#fjordSky1)" />
          <!-- Twinkling stars -->
          <circle cx="140" cy="100" r="3" fill="#FFF" />
          <circle cx="260" cy="70" r="2.5" fill="#FFF" />
          <circle cx="500" cy="110" r="3" fill="#FFF" />
          <circle cx="680" cy="80" r="2" fill="#FFF" />
          <circle cx="740" cy="140" r="3.5" fill="#FEF08A" />
          <!-- Snowy Mountains -->
          <polygon points="260,180 80,480 440,480" fill="#1E293B" />
          <polygon points="260,180 200,280 320,280" fill="#F8FAFC" />
          <polygon points="620,160 420,500 780,500" fill="#0F172A" />
          <polygon points="620,160 560,260 680,260" fill="#F8FAFC" />
          <!-- Deep blue fjord water -->
          <path d="M 0 460 Q 400 420 800 460 L 800 600 L 0 600 Z" fill="#0F2856" />
          <!-- Snowy foreground hill with Lars -->
          <ellipse cx="200" cy="560" rx="300" ry="120" fill="#F1F5F9" />
          <!-- Lars the little polar bear cub -->
          <g transform="translate(240, 470) scale(1.3)">
            <ellipse cx="0" cy="20" rx="36" ry="26" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2" />
            <circle cx="0" cy="-8" r="20" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2" />
            <circle cx="-16" cy="-22" r="7" fill="#FFFFFF" />
            <circle cx="16" cy="-22" r="7" fill="#FFFFFF" />
            <circle cx="-7" cy="-10" r="3" fill="#000" />
            <circle cx="7" cy="-10" r="3" fill="#000" />
            <ellipse cx="0" cy="-2" rx="4.5" ry="3.5" fill="#000" />
          </g>
        </svg>`,
        illustrationCaption: "Little Lars looking out over the peaceful snowy fjord under the deep sapphire night sky.",
        vocabulary: [
          {
            word: "Fjord",
            pronunciation: "fee-ORD",
            definition: "A long, deep, narrow body of calm ocean water that reaches far inland between steep cliffs and snowy mountains.",
            funFact: "Norway is famous for having more than one thousand breathtaking fjords carved by ancient ice glaciers!",
          },
        ],
        hiddenStar: { xPercent: 92, yPercent: 14, clue: "Look right at the bright twinkling star in the top-right corner!" },
        funActivity: "Wrap yourself in a blanket and give yourself a snuggly polar bear hug!",
      },
      {
        pageNumber: 2,
        chapterTitle: "Chapter 2: The Flying Puffin Friend",
        scenePrompt: "Puffin the colorful arctic bird landing on a snowdrift, pointing with his orange beak toward the glowing horizon.",
        narrativeText:
          "Flap-flap-flutter! A friendly bird with a bright orange-and-yellow beak and black-and-white feathers landed on a snowdrift right in front of Lars. It was Pippin the Puffin! 'Brrr! Good evening, Lars!' chirped Pippin, shaking snow crystals off his wings. 'Did you see? Over behind the glacier peak, the sky is starting to glow green like lime sherbet! Come on, follow me to the lookout ridge!' Lars jumped up with a joyful cub bounce and padded through the powdery snow behind his colorful friend.",
        dialogueLines: [
          {
            speaker: "Pippin the Puffin",
            speakerRole: "character",
            avatar: "🐧",
            text: "Follow my wings, Lars! The sky is waking up with magic colors tonight!",
            voiceName: "Pip the Pixie",
            mood: "excited",
          },
          {
            speaker: "Lars",
            speakerRole: "character",
            avatar: "🐻‍❄️",
            text: "Wait for me, Pippin! My paws are fast in the fluffy snow!",
            voiceName: "Oliver the Gentle Bear",
            mood: "happy",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="fjordSky2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#022C22" />
              <stop offset="40%" stop-color="#064E3B" />
              <stop offset="100%" stop-color="#0F172A" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#fjordSky2)" />
          <!-- First faint green aurora glow on horizon -->
          <ellipse cx="400" cy="220" rx="420" ry="80" fill="#34D399" opacity="0.35" />
          <!-- Snowy ridge -->
          <path d="M 0 460 Q 350 380 800 480 L 800 600 L 0 600 Z" fill="#F8FAFC" />
          <!-- Lars cub on left -->
          <g transform="translate(260, 440) scale(1.4)">
            <ellipse cx="0" cy="20" rx="34" ry="24" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2" />
            <circle cx="16" cy="-6" r="18" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2" />
            <circle cx="8" cy="-20" r="6" fill="#FFFFFF" />
            <circle cx="24" cy="-20" r="6" fill="#FFFFFF" />
            <circle cx="22" cy="-8" r="3" fill="#000" />
            <ellipse cx="28" cy="-3" rx="4" ry="3" fill="#000" />
          </g>
          <!-- Pippin the Puffin on right -->
          <g transform="translate(540, 420) scale(1.4)">
            <ellipse cx="0" cy="20" rx="20" ry="26" fill="#0F172A" />
            <ellipse cx="-4" cy="20" rx="12" ry="18" fill="#FFFFFF" />
            <circle cx="0" cy="-5" r="16" fill="#0F172A" />
            <circle cx="-4" cy="-5" r="10" fill="#FFFFFF" />
            <circle cx="-4" cy="-5" r="3" fill="#000" />
            <!-- Colorful triangle beak -->
            <polygon points="12,-12 34,-5 12,5" fill="#F97316" stroke="#EAB308" stroke-width="2" />
            <!-- Orange webbed feet -->
            <polygon points="-8,46 4,46 -2,54" fill="#F97316" />
            <polygon points="8,46 20,46 14,54" fill="#F97316" />
          </g>
        </svg>`,
        illustrationCaption: "Pippin the colorful puffin excitedly showing Lars the first magical green glow in the sky.",
        vocabulary: [
          {
            word: "Puffin",
            pronunciation: "PUFF-in",
            definition: "A charming, adorable seabird with a brightly colored orange beak, known as the 'clown of the sea.'",
            funFact: "Puffins can flap their wings up to 400 times a minute and fly at 55 miles per hour!",
          },
        ],
        hiddenStar: { xPercent: 50, yPercent: 36, clue: "Look right at the glowing green aurora ribbon on the horizon!" },
        funActivity: "Waddle like a cute little puffin across the room with your elbows tucked in!",
      },
      {
        pageNumber: 3,
        chapterTitle: "Chapter 3: The Green Aurora Dance",
        scenePrompt: "Magnificent swirling ribbons of emerald green, violet, and turquoise Northern Lights dancing across the starry sky.",
        narrativeText:
          "When they reached the crest of the snowy ridge, Lars caught his breath. Whoosh! Across the velvet black sky, gigantic ribbons of electric green, shimmering violet, and glowing turquoise began to ripple and dance like silk curtains fluttering in the breeze! They spun in majestic spirals, then dipped down as if trying to tickle the mountain peaks. It was silent, yet in his heart Lars felt as though he could hear a tender music box playing starlight notes.",
        dialogueLines: [
          {
            speaker: "Narrator",
            speakerRole: "narrator",
            avatar: "📖",
            text: "The Northern Lights danced across the Arctic sky, painting the snow with emerald starlight.",
            voiceName: "Grandma Willow",
            mood: "wondrous",
          },
          {
            speaker: "Lars",
            speakerRole: "character",
            avatar: "🐻‍❄️",
            text: "It's like the sky is dancing a waltz just for us, Pippin!",
            voiceName: "Pip the Pixie",
            mood: "awed",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="auroraDanceSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#020617" />
              <stop offset="60%" stop-color="#0F172A" />
              <stop offset="100%" stop-color="#064E3B" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#auroraDanceSky)" />
          <!-- Swirling Aurora Borealis Ribbons -->
          <path d="M 0 160 C 200 40 300 240 500 120 C 650 30 750 180 800 100" stroke="#10B981" stroke-width="40" fill="none" opacity="0.8" />
          <path d="M 0 160 C 200 40 300 240 500 120 C 650 30 750 180 800 100" stroke="#6EE7B7" stroke-width="24" fill="none" opacity="0.9" />
          <path d="M 0 160 C 200 40 300 240 500 120 C 650 30 750 180 800 100" stroke="#FFFFFF" stroke-width="8" fill="none" opacity="0.7" />
          <!-- Violet accent ribbon -->
          <path d="M 0 110 C 240 10 350 180 540 80 C 680 10 760 120 800 60" stroke="#A855F7" stroke-width="20" fill="none" opacity="0.5" />
          <!-- Snowy ground reflecting green glow -->
          <ellipse cx="400" cy="580" rx="460" ry="140" fill="#E2E8F0" />
          <ellipse cx="400" cy="540" rx="360" ry="80" fill="#A7F3D0" opacity="0.3" />
          <!-- Lars and Pippin watching side by side -->
          <g transform="translate(380, 470)">
            <ellipse cx="0" cy="20" rx="30" ry="22" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2" />
            <circle cx="0" cy="-6" r="16" fill="#FFFFFF" />
            <circle cx="-12" cy="-18" r="5" fill="#FFFFFF" /><circle cx="12" cy="-18" r="5" fill="#FFFFFF" />
          </g>
          <g transform="translate(440, 485) scale(0.8)">
            <ellipse cx="0" cy="15" rx="14" ry="18" fill="#0F172A" />
            <circle cx="0" cy="-2" r="12" fill="#0F172A" />
            <polygon points="8,-6 24,-2 8,4" fill="#F97316" />
          </g>
        </svg>`,
        illustrationCaption: "The magnificent emerald green and violet auroras dancing across the Arctic starlight.",
        vocabulary: [
          {
            word: "Aurora",
            pronunciation: "aw-ROH-ruh",
            definition: "Natural, glowing colorful light displays in high-latitude skies caused by solar particles meeting Earth's atmosphere.",
            funFact: "The Northern Lights are called Aurora Borealis, named after the Roman goddess of dawn, Aurora!",
          },
        ],
        hiddenStar: { xPercent: 62, yPercent: 20, clue: "Look right along the crest of the violet aurora ribbon!" },
        funActivity: "Wave your hands gently in the air like shimmering curtains of northern lights!",
      },
      {
        pageNumber: 4,
        chapterTitle: "Chapter 4: Cozy Bedtime in the Den",
        scenePrompt: "Lars cuddled safely beside his warm mother bear inside the cozy snow den, falling asleep with sweet dreams.",
        narrativeText:
          "After watching the lights dance until their eyes grew delightfully heavy, Lars waved goodbye to Pippin and trotted back to the den. Mother bear opened her warm, fluffy arms. Lars snuggled deep into her fur, feeling as warm as fresh cocoa on a winter morning. Outside, the green lights dimmed to a gentle, sleepy emerald hum, watching over all the Arctic creatures. Lars gave a happy yawn, closed his eyes, and drifted into sweet dreams of dancing stars.",
        dialogueLines: [
          {
            speaker: "Mother Bear",
            speakerRole: "character",
            avatar: "🐻‍❄️",
            text: "Sleep tight, my sweet little cub. The stars and the lights will watch over your dreams.",
            voiceName: "Luna the Star Fairy",
            mood: "tender",
          },
          {
            speaker: "Narrator",
            speakerRole: "narrator",
            avatar: "📖",
            text: "And so the peaceful Arctic night wrapped Lars in warmth, silence, and gentle starlight.",
            voiceName: "Grandma Willow",
            mood: "lullaby",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="denWarmth" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#FEF3C7" stop-opacity="0.9" />
              <stop offset="60%" stop-color="#FDE68A" stop-opacity="0.4" />
              <stop offset="100%" stop-color="#0F172A" stop-opacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="600" fill="#0F172A" />
          <!-- Den cave arch of soft blue snow -->
          <ellipse cx="400" cy="350" rx="340" ry="240" fill="#1E293B" />
          <ellipse cx="400" cy="360" rx="300" ry="200" fill="#0F172A" />
          <circle cx="400" cy="380" r="180" fill="url(#denWarmth)" />
          <!-- Big Mother Polar Bear resting peacefully -->
          <g transform="translate(370, 390)">
            <ellipse cx="0" cy="20" rx="90" ry="60" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="3" />
            <circle cx="-50" cy="-10" r="38" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="3" />
            <!-- Sleeping closed eyes -->
            <path d="M -60 -12 Q -50 -6 -40 -12" stroke="#475569" stroke-width="3" fill="none" stroke-linecap="round" />
            <!-- Little Lars cuddled right against her warm side -->
            <g transform="translate(35, 10) scale(0.7)">
              <ellipse cx="0" cy="15" rx="36" ry="26" fill="#F8FAFC" stroke="#94A3B8" stroke-width="2" />
              <circle cx="0" cy="-10" r="20" fill="#F8FAFC" />
              <path d="M -8 -10 Q 0 -5 8 -10" stroke="#475569" stroke-width="3" fill="none" stroke-linecap="round" />
            </g>
          </g>
          <!-- Glimpse of the starlight outside den entrance -->
          <path d="M 620 220 Q 720 180 800 240 L 800 380 L 680 340 Z" fill="#022C22" opacity="0.6" />
          <circle cx="740" cy="240" r="3" fill="#34D399" />
          <circle cx="710" cy="260" r="2" fill="#FEF08A" />
        </svg>`,
        illustrationCaption: "Lars cuddled safely against his mother inside the warm den as gentle starlight glows outside.",
        vocabulary: [
          {
            word: "Hibernation",
            pronunciation: "hy-ber-NAY-shun",
            definition: "A state of restful deep sleep or denning that some animals use to stay warm through cold winters.",
            funFact: "Polar bear mothers build cozy snow dens insulated with thick walls where it is 40 degrees warmer than outside!",
          },
        ],
        hiddenStar: { xPercent: 88, yPercent: 40, clue: "Look right at the starlight glowing outside the den opening!" },
        funActivity: "Close your eyes, take three deep slow breaths, and think of your favorite cozy place!",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // STORY 8: The Wise Turtle and the Whispering Geese (India / South Asia)
  // ---------------------------------------------------------------------------
  {
    id: "panchatantra_turtle_geese",
    title: "The Wise Turtle & Whispering Geese",
    subtitle: "A Panchatantra Tale from Ancient India",
    region: "South Asia",
    country: "India",
    flag: "🇮🇳",
    culture: "Panchatantra",
    ageRange: "4–9 years",
    readTimeMinutes: 5,
    theme: "Patience & Gentle Wisdom",
    moral: "A thoughtful mind knows when to speak, and when quiet patience carries you safely home.",
    coverCloth: "#B45309", // Royal turmeric & saffron amber
    coverSpine: "#78350F",
    accentColor: "#F59E0B",
    paperColor: "#FFFDF7",
    cardColor: "#FEF3C7",
    summary:
      "Beside the sacred lotus ponds of ancient India, Kambugriva the friendly turtle dreams of flying with his best friends, two snow-white wild geese. When summer drought dries the pond, the geese invent a magical wooden stick to carry him high above palaces and mountains!",
    coverSvg: `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="indiaCoverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FB923C" />
          <stop offset="50%" stop-color="#F59E0B" />
          <stop offset="100%" stop-color="#78350F" />
        </linearGradient>
        <linearGradient id="palaceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FEF3C7" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#D97706" stop-opacity="0.9" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#indiaCoverGrad)" />
      <!-- Golden Sun with Sunbeams -->
      <circle cx="400" cy="180" r="140" fill="#FEF08A" opacity="0.65" />
      <!-- Distant Mughal / Temple Domes -->
      <path d="M 120 500 L 120 380 Q 150 330 180 380 L 180 500 Z" fill="url(#palaceGrad)" />
      <path d="M 600 500 L 600 370 Q 640 310 680 370 L 680 500 Z" fill="url(#palaceGrad)" />
      <!-- Flying Geese holding a stick with Turtle in the center -->
      <g transform="translate(400, 200)">
        <!-- The Wooden Stick -->
        <rect x="-130" y="-4" width="260" height="8" rx="4" fill="#92400E" stroke="#FEF08A" stroke-width="2" />
        <!-- Left Goose (Sankha) -->
        <g transform="translate(-110, -10)">
          <ellipse cx="0" cy="0" rx="28" ry="16" fill="#FFFFFF" />
          <path d="M -10 -10 Q 0 -38 20 -28 Q 10 -10 0 0 Z" fill="#FFFFFF" />
          <polygon points="20,-28 28,-30 22,-24" fill="#F97316" />
          <path d="M -15 0 Q -30 -35 5 -15" stroke="#FFFFFF" stroke-width="6" fill="none" stroke-linecap="round" />
        </g>
        <!-- Right Goose (Vikata) -->
        <g transform="translate(110, -10)">
          <ellipse cx="0" cy="0" rx="28" ry="16" fill="#FFFFFF" />
          <path d="M 10 -10 Q 0 -38 -20 -28 Q -10 -10 0 0 Z" fill="#FFFFFF" />
          <polygon points="-20,-28 -28,-30 -22,-24" fill="#F97316" />
          <path d="M 15 0 Q 30 -35 -5 -15" stroke="#FFFFFF" stroke-width="6" fill="none" stroke-linecap="round" />
        </g>
        <!-- The Turtle in center biting stick -->
        <g transform="translate(0, 16)">
          <ellipse cx="0" cy="0" rx="34" ry="24" fill="#15803D" stroke="#86EFAC" stroke-width="3" />
          <path d="M -15 -10 L 0 0 L 15 -10 M -15 10 L 0 0 L 15 10" stroke="#86EFAC" stroke-width="2" />
          <circle cx="0" cy="-22" r="10" fill="#22C55E" />
          <!-- Eyes -->
          <circle cx="-3" cy="-23" r="2" fill="#1E293B" />
          <circle cx="3" cy="-23" r="2" fill="#1E293B" />
          <!-- Little legs -->
          <ellipse cx="-26" cy="-8" rx="8" ry="6" fill="#16A34A" />
          <ellipse cx="26" cy="-8" rx="8" ry="6" fill="#16A34A" />
          <ellipse cx="-22" cy="14" rx="8" ry="6" fill="#16A34A" />
          <ellipse cx="22" cy="14" rx="8" ry="6" fill="#16A34A" />
        </g>
      </g>
      <!-- Lotus blossoms in foreground water -->
      <rect x="0" y="440" width="800" height="60" fill="#1E3A8A" opacity="0.8" />
      <circle cx="200" cy="450" r="18" fill="#F43F5E" />
      <circle cx="200" cy="446" r="12" fill="#FDA4AF" />
      <circle cx="580" cy="460" r="20" fill="#F43F5E" />
      <circle cx="580" cy="456" r="14" fill="#FDA4AF" />
    </svg>`,
    pages: [
      {
        pageNumber: 1,
        chapterTitle: "Chapter 1: The Lotus Blossom Pond",
        scenePrompt: "A tranquil Indian pond filled with pink lotus blossoms where a wise turtle and two white geese share stories under a banyan tree.",
        narrativeText:
          "In the sun-drenched valley of Magadha, beneath the sprawling canopy of an ancient banyan tree, lay a shimmering pond covered in pink lotus blossoms. Here lived Kambugriva, a kind and talkative turtle with a shell polished like jade. His dearest companions were two elegant wild geese named Sankha and Vikata, who flew down every morning to share marvelous stories of snowy mountain peaks.",
        dialogueLines: [
          {
            speaker: "Kambugriva the Turtle",
            speakerRole: "character",
            avatar: "🐢",
            text: "Tell me again of the high clouds, dear friends! Do they feel as soft as dandelion silk?",
            voiceName: "Fenrir",
            mood: "curious & eager",
          },
          {
            speaker: "Sankha the White Goose",
            speakerRole: "character",
            avatar: "🪿",
            text: "Even softer, little brother! Up high, the world sparkles like a blanket of crushed pearls.",
            voiceName: "Aoede",
            mood: "graceful & gentle",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lotusSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#FDE68A" />
              <stop offset="50%" stop-color="#FCD34D" />
              <stop offset="100%" stop-color="#67E8F9" />
            </linearGradient>
            <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#0284C7" />
              <stop offset="100%" stop-color="#0369A1" />
            </linearGradient>
          </defs>
          <rect width="800" height="340" fill="url(#lotusSky)" />
          <rect y="340" width="800" height="260" fill="url(#waterGrad)" />
          <!-- Ancient Banyan Tree on Left Shore -->
          <path d="M 0 100 Q 80 140 110 350 L 0 350 Z" fill="#78350F" />
          <circle cx="120" cy="100" r="110" fill="#15803D" opacity="0.9" />
          <circle cx="180" cy="140" r="90" fill="#16A34A" opacity="0.85" />
          <!-- Large Pink Lotus Pads & Flowers -->
          <ellipse cx="400" cy="450" rx="70" ry="24" fill="#047857" />
          <ellipse cx="250" cy="480" rx="80" ry="26" fill="#047857" />
          <ellipse cx="620" cy="470" rx="75" ry="25" fill="#047857" />
          <!-- Pink Lotus Flowers -->
          <g transform="translate(400, 435)">
            <path d="M -20 0 C -25 -25 0 -40 0 -40 C 0 -40 25 -25 20 0 Z" fill="#FB7185" />
            <path d="M -10 0 C -15 -35 0 -50 0 -50 C 0 -50 15 -35 10 0 Z" fill="#FDA4AF" />
            <circle cx="0" cy="-15" r="8" fill="#FBBF24" />
          </g>
          <!-- Friendly Turtle Kambugriva resting on warm stone -->
          <g transform="translate(260, 440)">
            <ellipse cx="0" cy="0" rx="55" ry="36" fill="#15803D" stroke="#86EFAC" stroke-width="4" />
            <path d="M -25 -15 L 0 0 L 25 -15 M -25 15 L 0 0 L 25 15" stroke="#86EFAC" stroke-width="3" />
            <circle cx="58" cy="-6" r="16" fill="#22C55E" />
            <circle cx="62" cy="-9" r="3" fill="#0F172A" />
            <circle cx="63" cy="-10" r="1" fill="#FFFFFF" />
            <ellipse cx="-45" cy="-22" rx="14" ry="9" fill="#16A34A" />
            <ellipse cx="-45" cy="22" rx="14" ry="9" fill="#16A34A" />
          </g>
          <!-- Two White Geese floating happily beside him -->
          <g transform="translate(520, 420)">
            <ellipse cx="0" cy="0" rx="42" ry="25" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2" />
            <path d="M 15 -10 Q 30 -40 42 -25 Q 25 -5 15 5 Z" fill="#FFFFFF" />
            <polygon points="42,-25 54,-24 45,-18" fill="#F97316" />
            <circle cx="36" cy="-26" r="2.5" fill="#0F172A" />
          </g>
          <g transform="translate(630, 440)">
            <ellipse cx="0" cy="0" rx="38" ry="22" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2" />
            <path d="M -10 -8 Q -25 -38 -38 -22 Q -20 -4 -10 5 Z" fill="#FFFFFF" />
            <polygon points="-38,-22 -50,-21 -41,-15" fill="#F97316" />
            <circle cx="-32" cy="-24" r="2.5" fill="#0F172A" />
          </g>
          <!-- Peacock in tree branch -->
          <g transform="translate(140, 180)">
            <ellipse cx="0" cy="0" rx="20" ry="12" fill="#0284C7" />
            <circle cx="16" cy="-8" r="8" fill="#0369A1" />
            <polygon points="22,-8 28,-7 23,-4" fill="#F59E0B" />
            <!-- Peacock tail fan -->
            <path d="M -15 0 C -45 -30 -60 10 -15 15 Z" fill="#0D9488" stroke="#FDE047" stroke-width="2" />
          </g>
        </svg>`,
        illustrationCaption: "Kambugriva the turtle chatting cheerfully with his two best friends, Sankha and Vikata, by the lotus blossoms.",
        vocabulary: [
          {
            word: "Panchatantra",
            pronunciation: "pun-cha-TAN-tra",
            definition: "An ancient collection of Indian animal fables with poetic lessons on friendship, cleverness, and wisdom.",
            funFact: "The Panchatantra was written over 2,200 years ago and is one of the most widely translated book collections in human history!",
          },
          {
            word: "Lotus",
            pronunciation: "LOW-tuss",
            definition: "A sacred water lily that blooms clean and beautiful out of quiet pond waters.",
            funFact: "Lotus petals have microscopic wax crystals that make water droplets roll off like round crystal marbles!",
          },
        ],
        hiddenStar: { xPercent: 18, yPercent: 30, clue: "Look right by the peacock's shimmering emerald tail feathers!" },
        funActivity: "Can you stretch like a turtle peeking out of its shell, then puff up your chest like a flying goose?",
      },
      {
        pageNumber: 2,
        chapterTitle: "Chapter 2: The Golden Willow Stick",
        scenePrompt: "The two geese hold each end of a strong golden willow stick with their beaks while the clever turtle clamps the middle.",
        narrativeText:
          "When a scorching summer arrived, the lotus pond began to dry. 'We must fly north to Lake Manasarovar,' cried the geese sadly. 'The waters there never run dry, but you cannot fly!' Kambugriva smiled brightly and found a smooth willow stick. 'You shall each hold one end in your beaks,' he proposed, 'and I will hold the middle tightly with my jaw. Together, we shall fly through the clouds!'",
        dialogueLines: [
          {
            speaker: "Vikata the Goose",
            speakerRole: "character",
            avatar: "🪿",
            text: "It is a brilliant plan, dear turtle! But you must promise never to open your mouth to speak while we are aloft!",
            voiceName: "Aoede",
            mood: "serious & caring",
          },
          {
            speaker: "Kambugriva the Turtle",
            speakerRole: "character",
            avatar: "🐢",
            text: "I promise with all my heart! My jaws shall stay closed like a locked jewel box.",
            voiceName: "Fenrir",
            mood: "determined & solemn",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="dryShore" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#FDE047" />
              <stop offset="100%" stop-color="#F59E0B" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#dryShore)" />
          <!-- Sun baked golden rocks -->
          <ellipse cx="400" cy="520" rx="360" ry="120" fill="#D97706" />
          <ellipse cx="400" cy="500" rx="320" ry="90" fill="#FBBF24" />
          <!-- The Willow Stick demonstration -->
          <g transform="translate(400, 320)">
            <!-- Polished wooden stick -->
            <rect x="-220" y="-8" width="440" height="16" rx="8" fill="#78350F" stroke="#FEF08A" stroke-width="3" />
            <!-- Left Goose inspecting left tip -->
            <g transform="translate(-180, -35)">
              <ellipse cx="0" cy="0" rx="45" ry="28" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2" />
              <circle cx="30" cy="-20" r="16" fill="#FFFFFF" />
              <polygon points="40,-20 58,-12 40,-6" fill="#F97316" />
              <circle cx="34" cy="-24" r="3" fill="#0F172A" />
            </g>
            <!-- Right Goose inspecting right tip -->
            <g transform="translate(180, -35)">
              <ellipse cx="0" cy="0" rx="45" ry="28" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2" />
              <circle cx="-30" cy="-20" r="16" fill="#FFFFFF" />
              <polygon points="-40,-20 -58,-12 -40,-6" fill="#F97316" />
              <circle cx="-34" cy="-24" r="3" fill="#0F172A" />
            </g>
            <!-- Turtle demonstrating grip in center -->
            <g transform="translate(0, 50)">
              <ellipse cx="0" cy="0" rx="60" ry="40" fill="#15803D" stroke="#86EFAC" stroke-width="4" />
              <path d="M -30 -15 L 0 0 L 30 -15 M -30 15 L 0 0 L 30 15" stroke="#86EFAC" stroke-width="3" />
              <circle cx="0" cy="-40" r="20" fill="#22C55E" />
              <circle cx="-6" cy="-44" r="3.5" fill="#0F172A" />
              <circle cx="6" cy="-44" r="3.5" fill="#0F172A" />
              <ellipse cx="-45" cy="0" rx="14" ry="10" fill="#16A34A" />
              <ellipse cx="45" cy="0" rx="14" ry="10" fill="#16A34A" />
            </g>
          </g>
          <!-- Sacred Lotus Seeds scattered on rock -->
          <circle cx="220" cy="460" r="8" fill="#78350F" />
          <circle cx="240" cy="470" r="7" fill="#78350F" />
          <circle cx="260" cy="455" r="9" fill="#78350F" />
        </svg>`,
        illustrationCaption: "The three loyal companions testing the strong willow stick before embarking on their grand flight.",
        vocabulary: [
          {
            word: "Loyalty",
            pronunciation: "LOY-ul-tee",
            definition: "Staying true and helpful to your friends, through good times and challenging times.",
            funFact: "Wild geese mate for life and will never leave a sick or tired flock member behind!",
          },
          {
            word: "Manasarovar",
            pronunciation: "mah-nah-sah-RO-var",
            definition: "A legendary high mountain lake in the Himalayas known for its crystal-clear blue waters.",
            funFact: "Lake Manasarovar sits at nearly 15,000 feet elevation, making it one of the highest freshwater lakes in the world!",
          },
        ],
        hiddenStar: { xPercent: 50, yPercent: 44, clue: "Look right at the polished golden willow stick held in the center!" },
        funActivity: "Try biting on a clean spoon or pencil gently and see if you can hold it for 10 quiet seconds!",
      },
      {
        pageNumber: 3,
        chapterTitle: "Chapter 3: The Flight Above the Palace",
        scenePrompt: "The two geese soar majestically through the clouds carrying the turtle, flying high over majestic marble temple domes.",
        narrativeText:
          "With a mighty flap of snowy wings, Sankha and Vikata lifted into the azure sky. Kambugriva felt the cool wind whistle past his shell. Down below, the world shrank into a tapestry of emerald rice terraces, winding sapphire rivers, and the gilded domes of the royal city of Varanasi. Townsfolk looked up and gasped in astonishment: 'Look! A flying turtle carried by two swans!'",
        dialogueLines: [
          {
            speaker: "Townspeople Below",
            speakerRole: "character",
            avatar: "👑",
            text: "Look to the heavens! Is it magic? Is it a chariot of the wind gods?",
            voiceName: "Zephyr",
            mood: "amazed & shouting",
          },
          {
            speaker: "Kambugriva's Thoughts",
            speakerRole: "narrator",
            avatar: "💭",
            text: "(Remember your sacred promise, Kambugriva. Keep your jaw tight, for words can wait, but life is in the balance!)",
            voiceName: "Puck",
            mood: "suspenseful whisper",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="skyFlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#38BDF8" />
              <stop offset="60%" stop-color="#BAE6FD" />
              <stop offset="100%" stop-color="#FEF08A" />
            </linearGradient>
            <linearGradient id="domeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#F59E0B" />
              <stop offset="100%" stop-color="#B45309" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#skyFlight)" />
          <!-- Fluffy Clouds -->
          <ellipse cx="200" cy="180" rx="90" ry="40" fill="#FFFFFF" opacity="0.85" />
          <ellipse cx="240" cy="160" rx="70" ry="35" fill="#FFFFFF" opacity="0.9" />
          <ellipse cx="620" cy="220" rx="100" ry="45" fill="#FFFFFF" opacity="0.8" />
          <!-- Distant Royal City Below -->
          <path d="M 0 520 L 800 520 L 800 600 L 0 600 Z" fill="#15803D" />
          <!-- Marble Palaces & Golden Domes -->
          <g transform="translate(320, 430)">
            <rect x="0" y="40" width="160" height="70" fill="#FFFFFF" />
            <path d="M 0 40 Q 80 -30 160 40 Z" fill="url(#domeGrad)" />
            <circle cx="80" cy="-35" r="8" fill="#FDE047" />
          </g>
          <!-- Tiny People waving below -->
          <circle cx="280" cy="510" r="5" fill="#78350F" />
          <line x1="280" y1="515" x2="280" y2="530" stroke="#78350F" stroke-width="2" />
          <line x1="275" y1="520" x2="285" y2="510" stroke="#78350F" stroke-width="2" />
          <!-- The Grand Trio Flying in Center Sky -->
          <g transform="translate(400, 200)">
            <!-- The Willow Stick -->
            <rect x="-170" y="-5" width="340" height="10" rx="5" fill="#78350F" stroke="#FEF08A" stroke-width="2" />
            <!-- Left Goose with wings spread wide -->
            <g transform="translate(-140, -15)">
              <ellipse cx="0" cy="0" rx="38" ry="22" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2" />
              <path d="M -15 -10 Q 0 -60 30 -40 Q 15 -15 0 0 Z" fill="#FFFFFF" />
              <path d="M -5 10 Q 15 50 40 30 Q 20 10 5 0 Z" fill="#FFFFFF" />
              <circle cx="28" cy="-14" r="12" fill="#FFFFFF" />
              <polygon points="34,-14 46,-12 36,-6" fill="#F97316" />
            </g>
            <!-- Right Goose with wings spread wide -->
            <g transform="translate(140, -15)">
              <ellipse cx="0" cy="0" rx="38" ry="22" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2" />
              <path d="M 15 -10 Q 0 -60 -30 -40 Q -15 -15 0 0 Z" fill="#FFFFFF" />
              <path d="M 5 10 Q -15 50 -40 30 Q -20 10 -5 0 Z" fill="#FFFFFF" />
              <circle cx="-28" cy="-14" r="12" fill="#FFFFFF" />
              <polygon points="-34,-14 -46,-12 -36,-6" fill="#F97316" />
            </g>
            <!-- Turtle firmly clamped in center -->
            <g transform="translate(0, 24)">
              <ellipse cx="0" cy="0" rx="46" ry="32" fill="#15803D" stroke="#86EFAC" stroke-width="4" />
              <path d="M -20 -10 L 0 0 L 20 -10 M -20 10 L 0 0 L 20 10" stroke="#86EFAC" stroke-width="2.5" />
              <circle cx="0" cy="-28" r="14" fill="#22C55E" />
              <circle cx="-4" cy="-30" r="2.5" fill="#0F172A" />
              <circle cx="4" cy="-30" r="2.5" fill="#0F172A" />
            </g>
          </g>
        </svg>`,
        illustrationCaption: "The great flight over the golden palace of Varanasi as astonished villagers look up in awe.",
        vocabulary: [
          {
            word: "Astonishment",
            pronunciation: "uh-STON-ish-ment",
            definition: "A feeling of great surprise and wonder.",
            funFact: "Ancient travelers in India wrote down this tale in Sanskrit palm-leaf manuscripts decorated with real gold leaf!",
          },
          {
            word: "Canopy",
            pronunciation: "CAN-uh-pee",
            definition: "An overarching cover, like the high roof of tree branches or the big open sky.",
            funFact: "A single ancient Banyan tree can grow so big its canopy covers an entire village square!",
          },
        ],
        hiddenStar: { xPercent: 50, yPercent: 68, clue: "Look right at the tip of the golden palace dome!" },
        funActivity: "Flap your arms like giant goose wings and take a slow breath in and out!",
      },
      {
        pageNumber: 4,
        chapterTitle: "Chapter 4: The Lake of Mountain Stars",
        scenePrompt: "A breathtaking crystal blue mountain lake in the Himalayas with snow peaks where the turtle and geese swim safely together.",
        narrativeText:
          "Remembering his sacred promise, Kambugriva held tightly and kept quiet until the geese gently glided down onto the crystal waters of Lake Manasarovar. The water was cool, sweet, and forever deep. The three friends splashed joyfully together beneath the snowy peaks of Mount Kailash. By mastering his tongue and holding steady with patience, Kambugriva had crossed the great sky and found paradise.",
        dialogueLines: [
          {
            speaker: "Kambugriva the Turtle",
            speakerRole: "character",
            avatar: "🐢",
            text: "We made it! I kept my promise, and look at this beautiful water!",
            voiceName: "Fenrir",
            mood: "overjoyed & victorious",
          },
          {
            speaker: "Sankha & Vikata",
            speakerRole: "character",
            avatar: "🪿",
            text: "Well done, wise brother! True courage is not only in the wings that flap, but in the patience to know when silence is golden.",
            voiceName: "Aoede",
            mood: "triumphant praise",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="himalayaSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#1E3A8A" />
              <stop offset="40%" stop-color="#3B82F6" />
              <stop offset="100%" stop-color="#93C5FD" />
            </linearGradient>
            <linearGradient id="crystalLake" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#0284C7" />
              <stop offset="100%" stop-color="#0F766E" />
            </linearGradient>
          </defs>
          <rect width="800" height="360" fill="url(#himalayaSky)" />
          <rect y="360" width="800" height="240" fill="url(#crystalLake)" />
          <!-- Snow-capped Himalayan Peaks (Mount Kailash) -->
          <polygon points="120,360 280,140 440,360" fill="#E2E8F0" />
          <polygon points="240,195 280,140 320,195 295,210 280,195 265,210" fill="#FFFFFF" />
          <polygon points="360,360 520,100 680,360" fill="#CBD5E1" />
          <polygon points="465,180 520,100 575,180 545,200 520,180 495,200" fill="#FFFFFF" />
          <!-- Twinkling stars in high mountain twilight -->
          <circle cx="180" cy="80" r="3" fill="#FEF08A" />
          <circle cx="340" cy="60" r="2.5" fill="#FEF08A" />
          <circle cx="680" cy="70" r="3" fill="#FEF08A" />
          <circle cx="720" cy="110" r="2" fill="#FEF08A" />
          <!-- Crystal Water Ripples -->
          <ellipse cx="400" cy="480" rx="300" ry="40" fill="#38BDF8" opacity="0.3" />
          <!-- Turtle Swimming Happily -->
          <g transform="translate(360, 480)">
            <ellipse cx="0" cy="0" rx="55" ry="36" fill="#15803D" stroke="#86EFAC" stroke-width="4" />
            <path d="M -25 -15 L 0 0 L 25 -15 M -25 15 L 0 0 L 25 15" stroke="#86EFAC" stroke-width="3" />
            <circle cx="58" cy="-4" r="16" fill="#22C55E" />
            <circle cx="62" cy="-7" r="3" fill="#0F172A" />
            <path d="M 58 2 Q 64 6 70 2" stroke="#15803D" stroke-width="2.5" fill="none" stroke-linecap="round" />
            <ellipse cx="-45" cy="-22" rx="14" ry="9" fill="#16A34A" />
            <ellipse cx="-45" cy="22" rx="14" ry="9" fill="#16A34A" />
          </g>
          <!-- The Two Geese Swimming Beside Him -->
          <g transform="translate(520, 460)">
            <ellipse cx="0" cy="0" rx="42" ry="24" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2" />
            <path d="M -10 -8 Q -24 -36 -38 -20 Q -20 -4 -10 5 Z" fill="#FFFFFF" />
            <polygon points="-38,-20 -50,-18 -41,-14" fill="#F97316" />
            <circle cx="-32" cy="-22" r="2.5" fill="#0F172A" />
          </g>
          <g transform="translate(200, 470)">
            <ellipse cx="0" cy="0" rx="42" ry="24" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2" />
            <path d="M 12 -8 Q 26 -36 40 -20 Q 22 -4 12 5 Z" fill="#FFFFFF" />
            <polygon points="40,-20 52,-18 43,-14" fill="#F97316" />
            <circle cx="34" cy="-22" r="2.5" fill="#0F172A" />
          </g>
          <!-- Golden lotus blossoms growing on lake edge -->
          <circle cx="100" cy="540" r="16" fill="#FBBF24" />
          <circle cx="100" cy="535" r="10" fill="#FEF08A" />
          <circle cx="700" cy="530" r="18" fill="#FBBF24" />
          <circle cx="700" cy="525" r="12" fill="#FEF08A" />
        </svg>`,
        illustrationCaption: "Kambugriva swimming peacefully in the sacred waters of Lake Manasarovar beneath Mount Kailash.",
        vocabulary: [
          {
            word: "Sanctuary",
            pronunciation: "SANK-choo-air-ee",
            definition: "A safe, peaceful refuge where all living beings are protected and respected.",
            funFact: "In the Himalayas, natural preserves have kept wild animals safe for thousands of years!",
          },
          {
            word: "Perseverance",
            pronunciation: "pur-suh-VEER-unce",
            definition: "Continuing to try your hardest, even when something takes time and patient self-control.",
            funFact: "Ancient turtle fossils date back more than 200 million years—talk about great perseverance!",
          },
        ],
        hiddenStar: { xPercent: 52, yPercent: 17, clue: "Look right at the glowing snow crown of Mount Kailash!" },
        funActivity: "Give yourself a big gentle hug and say: 'I have the superpower of patience!'",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // STORY 9: The Golden Jaguar & The Singing Quetzal (Mexico / Mesoamerica)
  // ---------------------------------------------------------------------------
  {
    id: "jaguar_quetzal_mexico",
    title: "The Golden Jaguar & Singing Quetzal",
    subtitle: "A Mayan & Zapotec Legend from the Cloud Forests of Mexico",
    region: "Americas",
    country: "Mexico",
    flag: "🇲🇽",
    culture: "Mayan & Zapotec",
    ageRange: "4–9 years",
    readTimeMinutes: 5,
    theme: "Attentive Listening & Friendship",
    moral: "True strength is not having the loudest roar, but listening to the gentle whispers of the earth.",
    coverCloth: "#047857", // Deep Jade Forest
    coverSpine: "#064E3B",
    accentColor: "#10B981",
    paperColor: "#FFFDF7",
    cardColor: "#ECFDF5",
    summary:
      "Deep in the emerald cloud forests of Oaxaca, a playful jaguar cub named Balam wants to show everyone how fierce he can be. But when he meets a shimmering jade-and-crimson Quetzal bird, he discovers that listening to the forest whispers is the greatest magic of all.",
    coverSvg: `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mexicoCoverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#059669" />
          <stop offset="50%" stop-color="#047857" />
          <stop offset="100%" stop-color="#064E3B" />
        </linearGradient>
        <radialGradient id="cenoteSun" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stop-color="#FEF08A" stop-opacity="0.9" />
          <stop offset="60%" stop-color="#34D399" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#064E3B" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill="url(#mexicoCoverGrad)" />
      <circle cx="400" cy="180" r="160" fill="url(#cenoteSun)" />
      <!-- Ancient Step Pyramid Silhouette -->
      <polygon points="400,160 480,240 320,240" fill="#022C22" opacity="0.8" />
      <rect x="360" y="240" width="80" height="120" fill="#022C22" opacity="0.8" />
      <polygon points="400,200 560,360 240,360" fill="#022C22" opacity="0.7" />
      <!-- Giant Ferns and Tropical Leaves -->
      <path d="M 0 500 Q 120 300 280 400 L 220 500 Z" fill="#10B981" opacity="0.6" />
      <path d="M 800 500 Q 680 280 520 380 L 580 500 Z" fill="#10B981" opacity="0.6" />
      <!-- Golden Jaguar Cub Balam in Center -->
      <g transform="translate(350, 360)">
        <ellipse cx="0" cy="0" rx="42" ry="28" fill="#F59E0B" stroke="#D97706" stroke-width="3" />
        <!-- Rosette spots -->
        <circle cx="-15" cy="-8" r="4" fill="#78350F" />
        <circle cx="10" cy="-6" r="4" fill="#78350F" />
        <circle cx="-5" cy="10" r="4" fill="#78350F" />
        <!-- Head -->
        <circle cx="40" cy="-14" r="22" fill="#F59E0B" stroke="#D97706" stroke-width="2.5" />
        <ellipse cx="32" cy="-30" rx="6" ry="8" fill="#D97706" />
        <ellipse cx="48" cy="-30" rx="6" ry="8" fill="#D97706" />
        <circle cx="45" cy="-16" r="3.5" fill="#1E293B" />
        <circle cx="46" cy="-17" r="1" fill="#FFFFFF" />
        <!-- Cute muzzle -->
        <circle cx="56" cy="-10" r="8" fill="#FEF3C7" />
        <polygon points="58,-12 55,-9 61,-9" fill="#E11D48" />
        <!-- Playful tail with golden curl -->
        <path d="M -40 5 Q -65 -15 -55 -40" stroke="#F59E0B" stroke-width="7" fill="none" stroke-linecap="round" />
      </g>
      <!-- Radiant Resplendent Quetzal Bird in Flight -->
      <g transform="translate(500, 160)">
        <!-- Long streaming emerald tail feathers -->
        <path d="M -10 15 Q -40 90 -80 180" stroke="#10B981" stroke-width="4" fill="none" stroke-linecap="round" />
        <path d="M 0 15 Q -25 110 -65 210" stroke="#34D399" stroke-width="3.5" fill="none" stroke-linecap="round" />
        <!-- Ruby red breast and jade body -->
        <ellipse cx="0" cy="0" rx="20" ry="14" fill="#E11D48" />
        <circle cx="14" cy="-8" r="12" fill="#10B981" />
        <!-- Feather Crest -->
        <path d="M 8 -20 Q 14 -28 20 -18" stroke="#34D399" stroke-width="3" fill="none" />
        <polygon points="24,-8 32,-6 24,-3" fill="#FDE047" />
        <!-- Golden Wing Spread -->
        <path d="M -8 -4 Q -15 -40 15 -25 Q 0 -5 -8 -4 Z" fill="#047857" stroke="#34D399" stroke-width="1.5" />
      </g>
    </svg>`,
    pages: [
      {
        pageNumber: 1,
        chapterTitle: "Chapter 1: The Cub Who Wanted to Roar",
        scenePrompt: "In the green cloud forests of ancient Mexico, a playful golden jaguar cub tries puffing his chest to roar at tropical butterflies.",
        narrativeText:
          "High among the misty cloud mountains of Oaxaca, where orchids hung like purple jewels from ancient cedar trees, lived Balam the golden jaguar cub. Balam had soft paws, eyes as bright as amber, and a very big ambition: he wanted to produce the mightiest roar in all of Mesoamerica! Every morning he would climb atop a mossy limestone boulder, puff out his spotted chest, and let out a tiny: 'Squeak-puff!' The hummingbirds giggled, and the giant ferns gently swayed.",
        dialogueLines: [
          {
            speaker: "Balam the Jaguar Cub",
            speakerRole: "character",
            avatar: "🐆",
            text: "Listen to me, cloud forest! One day my roar will shake the mountain peaks!",
            voiceName: "Fenrir",
            mood: "spunk & eager pride",
          },
          {
            speaker: "Orchid Hummingbird",
            speakerRole: "character",
            avatar: "🌺",
            text: "Patience, little spotted friend! The greatest powers in the jungle never need to shout.",
            voiceName: "Aoede",
            mood: "playful chime",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cloudForestSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#A7F3D0" />
              <stop offset="60%" stop-color="#6EE7B7" />
              <stop offset="100%" stop-color="#047857" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#cloudForestSky)" />
          <!-- Ancient Cedar Tree Trunk -->
          <path d="M 0 0 L 160 0 L 220 600 L 0 600 Z" fill="#451A03" />
          <path d="M 160 120 Q 340 80 420 180" stroke="#78350F" stroke-width="26" fill="none" stroke-linecap="round" />
          <!-- Hanging Tropical Orchids -->
          <g transform="translate(300, 150)">
            <circle cx="0" cy="0" r="16" fill="#D946EF" />
            <circle cx="0" cy="0" r="8" fill="#FDE047" />
            <path d="M 0 0 Q -10 35 0 60" stroke="#10B981" stroke-width="3" fill="none" />
          </g>
          <!-- Giant Mossy Limestone Boulder -->
          <ellipse cx="440" cy="460" rx="220" ry="90" fill="#64748B" />
          <ellipse cx="430" cy="430" rx="190" ry="70" fill="#94A3B8" />
          <!-- Moss patches -->
          <path d="M 320 400 Q 380 370 450 410" stroke="#10B981" stroke-width="12" fill="none" stroke-linecap="round" opacity="0.8" />
          <!-- Balam the Jaguar standing proudly on boulder -->
          <g transform="translate(420, 320)">
            <!-- Body -->
            <ellipse cx="0" cy="0" rx="58" ry="38" fill="#F59E0B" stroke="#D97706" stroke-width="3.5" />
            <!-- Spots -->
            <circle cx="-25" cy="-8" r="6" fill="#78350F" />
            <circle cx="10" cy="-12" r="5" fill="#78350F" />
            <circle cx="-10" cy="12" r="6" fill="#78350F" />
            <!-- Head raised to the sky -->
            <circle cx="55" cy="-25" r="28" fill="#F59E0B" stroke="#D97706" stroke-width="3" />
            <ellipse cx="45" cy="-48" rx="8" ry="11" fill="#D97706" />
            <ellipse cx="65" cy="-48" rx="8" ry="11" fill="#D97706" />
            <!-- Cute open mouth trying to roar -->
            <ellipse cx="78" cy="-22" rx="10" ry="8" fill="#E11D48" />
            <circle cx="62" cy="-30" r="4" fill="#1E293B" />
            <circle cx="63" cy="-31" r="1.5" fill="#FFFFFF" />
            <!-- Paws on rock -->
            <ellipse cx="-35" cy="35" rx="14" ry="12" fill="#F59E0B" />
            <ellipse cx="35" cy="35" rx="14" ry="12" fill="#F59E0B" />
            <!-- Tail pointing up -->
            <path d="M -50 0 Q -85 -30 -65 -60" stroke="#F59E0B" stroke-width="9" fill="none" stroke-linecap="round" />
          </g>
          <!-- Little Blue Morpho Butterfly fluttering past -->
          <g transform="translate(560, 240)">
            <ellipse cx="-10" cy="-6" rx="16" ry="12" fill="#2563EB" />
            <ellipse cx="10" cy="-6" rx="16" ry="12" fill="#2563EB" />
            <ellipse cx="-8" cy="8" rx="12" ry="10" fill="#3B82F6" />
            <ellipse cx="8" cy="8" rx="12" ry="10" fill="#3B82F6" />
            <line x1="0" y1="-14" x2="0" y2="14" stroke="#0F172A" stroke-width="2.5" />
          </g>
        </svg>`,
        illustrationCaption: "Balam the little jaguar cub practicing his fierce roar on the mossy jungle boulder.",
        vocabulary: [
          {
            word: "Mesoamerica",
            pronunciation: "meh-zo-uh-MER-ih-kuh",
            definition: "The historic region spanning Mexico and Central America, rich in ancient Mayan and Aztec cities.",
            funFact: "Ancient Mesoamericans were the very first people in the world to discover chocolate from cacao beans!",
          },
          {
            word: "Orchid",
            pronunciation: "OR-kid",
            definition: "A tropical flower with colorful petals that often grows high in the branches of rainforest trees.",
            funFact: "Vanilla comes from a special climbing orchid that grows wild in the Mexican cloud forest!",
          },
        ],
        hiddenStar: { xPercent: 70, yPercent: 40, clue: "Look right beside the fluttering blue morpho butterfly wings!" },
        funActivity: "Try making your quietest jaguar purr, then your friendliest little cub roar!",
      },
      {
        pageNumber: 2,
        chapterTitle: "Chapter 2: The Song of the Quetzal",
        scenePrompt: "A radiant emerald-green Quetzal bird with twin streaming tail feathers lands on a vine above the jaguar cub.",
        narrativeText:
          "One afternoon, while leaping after golden dragonflies, Balam heard a melody unlike anything he had ever known. It sounded like crystal rain falling onto jade bells: 'Te-loo! Te-lee!' Perched on a flowering ceiba branch was a Resplendent Quetzal. Its feathers shone like emerald fire, its chest was bright scarlet, and two silky tail plumes streamed down like emerald ribbons in the gentle breeze.",
        dialogueLines: [
          {
            speaker: "Balam the Jaguar Cub",
            speakerRole: "character",
            avatar: "🐆",
            text: "Who are you, feathered friend? How does your tiny throat make the whole canopy sparkle?",
            voiceName: "Fenrir",
            mood: "wide-eyed wonder",
          },
          {
            speaker: "Kukul the Sacred Quetzal",
            speakerRole: "character",
            avatar: "🦜",
            text: "I do not roar to be heard, little cub. I listen to the heartbeat of the forest, and sing what the earth feels.",
            voiceName: "Aoede",
            mood: "musical & peaceful",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="sacredGlow" cx="60%" cy="30%" r="40%">
              <stop offset="0%" stop-color="#FEF08A" stop-opacity="0.8" />
              <stop offset="50%" stop-color="#34D399" stop-opacity="0.4" />
              <stop offset="100%" stop-color="#059669" stop-opacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="600" fill="#064E3B" />
          <circle cx="480" cy="220" r="220" fill="url(#sacredGlow)" />
          <!-- Twisting Jungle Vines -->
          <path d="M 100 0 Q 300 240 600 160 Q 750 100 800 220" stroke="#78350F" stroke-width="18" fill="none" stroke-linecap="round" />
          <!-- The Quetzal in All His Glory -->
          <g transform="translate(520, 180)">
            <!-- Long Twin Emerald Ribbon Feathers -->
            <path d="M -15 20 Q -50 150 -110 320" stroke="#10B981" stroke-width="7" fill="none" stroke-linecap="round" />
            <path d="M 5 20 Q -25 180 -75 360" stroke="#34D399" stroke-width="6" fill="none" stroke-linecap="round" />
            <!-- Crimson Breast -->
            <ellipse cx="0" cy="0" rx="34" ry="22" fill="#E11D48" />
            <!-- Emerald Head and Crown -->
            <circle cx="22" cy="-15" r="18" fill="#10B981" />
            <path d="M 14 -32 Q 22 -44 32 -30" stroke="#34D399" stroke-width="4" fill="none" />
            <!-- Golden Beak -->
            <polygon points="36,-15 50,-12 36,-6" fill="#FBBF24" />
            <circle cx="28" cy="-18" r="3.5" fill="#0F172A" />
            <circle cx="29" cy="-19" r="1.5" fill="#FFFFFF" />
            <!-- Folded Wing -->
            <path d="M -15 -8 Q -30 -35 15 -20 Q 5 0 -15 -8 Z" fill="#047857" stroke="#34D399" stroke-width="2" />
            <!-- Sparkling musical notes floating from beak -->
            <text x="55" y="-20" font-size="20" fill="#FEF08A">♪</text>
            <text x="75" y="-35" font-size="24" fill="#34D399">♫</text>
          </g>
          <!-- Balam looking up in awe from forest floor -->
          <g transform="translate(240, 440)">
            <ellipse cx="0" cy="0" rx="55" ry="35" fill="#F59E0B" stroke="#D97706" stroke-width="3" />
            <circle cx="35" cy="-28" r="25" fill="#F59E0B" stroke="#D97706" stroke-width="3" />
            <ellipse cx="25" cy="-50" rx="7" ry="10" fill="#D97706" />
            <ellipse cx="45" cy="-50" rx="7" ry="10" fill="#D97706" />
            <circle cx="42" cy="-32" r="4" fill="#1E293B" />
            <circle cx="43" cy="-33" r="1.5" fill="#FFFFFF" />
            <!-- Rosettes -->
            <circle cx="-15" cy="-5" r="5" fill="#78350F" />
            <circle cx="10" cy="10" r="5" fill="#78350F" />
          </g>
        </svg>`,
        illustrationCaption: "The magnificent Quetzal bird singing sweet crystal melodies from the flowering vine.",
        vocabulary: [
          {
            word: "Quetzal",
            pronunciation: "ket-SAHL",
            definition: "A sacred emerald-and-red bird with long graceful tail feathers, revered in ancient Mayan mythology.",
            funFact: "In ancient times, Quetzal feathers were considered more precious and rare than solid gold!",
          },
          {
            word: "Ceiba",
            pronunciation: "SAY-buh",
            definition: "The sacred World Tree of Mayan legend, whose high canopy was believed to hold up the starry heavens.",
            funFact: "Ceiba trees can grow over 200 feet tall—taller than a twenty-story apartment building!",
          },
        ],
        hiddenStar: { xPercent: 65, yPercent: 30, clue: "Look right where the musical notes float from the Quetzal's golden beak!" },
        funActivity: "Can you whistle or hum a gentle melody like the Quetzal singing in the trees?",
      },
      {
        pageNumber: 3,
        chapterTitle: "Chapter 3: The Tangled Cenote Roots",
        scenePrompt: "Balam is gently guided by the Quetzal's song across a mossy cenote bridge where spider monkeys help untangle friendly roots.",
        narrativeText:
          "Suddenly, dark rain clouds rolled across the valley. As Balam hurried toward shelter, his back paw slipped into a tangle of wet fig tree roots beside a sparkling cenote pool. Balam began to panic and let out his loudest roar, but the noise only frightened the jungle animals away. 'Hush, little brother,' called the Quetzal softly. 'Close your eyes. Listen to the wind, and let the rhythm guide you.' Balam breathed slowly, listened to the bird's song, and realized the root was loose. With one gentle tug, he was free!",
        dialogueLines: [
          {
            speaker: "Kukul the Sacred Quetzal",
            speakerRole: "character",
            avatar: "🦜",
            text: "When storm winds blow, stillness is stronger than fear. Listen to the melody of calm.",
            voiceName: "Aoede",
            mood: "serene & reassuring",
          },
          {
            speaker: "Balam the Jaguar Cub",
            speakerRole: "character",
            avatar: "🐆",
            text: "I hear it! The water is laughing, the leaves are dancing... and I am not stuck at all!",
            voiceName: "Fenrir",
            mood: "relief & awakening",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cenoteWater" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#06B6D4" />
              <stop offset="100%" stop-color="#0E7490" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="#042F2E" />
          <!-- Sparkling Natural Cenote Pool -->
          <ellipse cx="400" cy="460" rx="320" ry="120" fill="url(#cenoteWater)" />
          <ellipse cx="400" cy="460" rx="270" ry="90" fill="#22D3EE" opacity="0.4" />
          <!-- Giant Strangler Fig Tree Roots -->
          <path d="M 120 200 Q 200 420 340 450 L 320 500 Q 180 440 100 240 Z" fill="#78350F" />
          <path d="M 680 180 Q 600 400 480 460 L 500 500 Q 640 420 700 200 Z" fill="#78350F" />
          <!-- Friendly Spider Monkey hanging from branch -->
          <g transform="translate(620, 220)">
            <ellipse cx="0" cy="0" rx="22" ry="16" fill="#451A03" />
            <circle cx="-16" cy="-8" r="14" fill="#451A03" />
            <circle cx="-18" cy="-10" r="2.5" fill="#FEF08A" />
            <!-- Long curling prehensile tail wrapped around vine -->
            <path d="M 15 -5 Q 40 -30 25 -55 Q 10 -60 15 -40" stroke="#451A03" stroke-width="6" fill="none" stroke-linecap="round" />
          </g>
          <!-- Balam stepping gracefully free from root -->
          <g transform="translate(380, 390)">
            <ellipse cx="0" cy="0" rx="55" ry="35" fill="#F59E0B" stroke="#D97706" stroke-width="3" />
            <circle cx="45" cy="-18" r="24" fill="#F59E0B" stroke="#D97706" stroke-width="3" />
            <ellipse cx="38" cy="-38" rx="6" ry="9" fill="#D97706" />
            <ellipse cx="54" cy="-38" rx="6" ry="9" fill="#D97706" />
            <!-- Happy calm eyes -->
            <path d="M 40 -20 Q 46 -15 52 -20" stroke="#78350F" stroke-width="3" fill="none" stroke-linecap="round" />
            <!-- Spots -->
            <circle cx="-15" cy="-8" r="5" fill="#78350F" />
            <circle cx="10" cy="-5" r="5" fill="#78350F" />
            <!-- Water splashes around paws -->
            <circle cx="20" cy="40" r="4" fill="#A5F3FC" />
            <circle cx="45" cy="42" r="3" fill="#A5F3FC" />
          </g>
          <!-- Quetzal flying overhead with starlight trail -->
          <g transform="translate(380, 140)">
            <ellipse cx="0" cy="0" rx="24" ry="14" fill="#E11D48" />
            <circle cx="16" cy="-8" r="12" fill="#10B981" />
            <path d="M -15 10 Q -60 60 -120 120" stroke="#34D399" stroke-width="4" fill="none" stroke-linecap="round" />
          </g>
        </svg>`,
        illustrationCaption: "Balam gently stepping free beside the sparkling cenote pool as the spider monkey cheers.",
        vocabulary: [
          {
            word: "Cenote",
            pronunciation: "seh-NO-tay",
            definition: "A sacred natural sinkhole filled with crystal-clear underground freshwater, treasured in the Yucatan.",
            funFact: "Ancient Mayans believed cenotes were magical gateways that connected the earth with water spirits!",
          },
          {
            word: "Harmony",
            pronunciation: "HAR-muh-nee",
            definition: "A state of peaceful cooperation and balance where different beings thrive together.",
            funFact: "In tropical rainforests, over half of all the animal species in the world live in delicate harmony!",
          },
        ],
        hiddenStar: { xPercent: 77, yPercent: 36, clue: "Look right where the spider monkey wraps its curly tail around the vine!" },
        funActivity: "Take a deep slow breath like Balam, count to three, and let all your worries float away like bubbles!",
      },
      {
        pageNumber: 4,
        chapterTitle: "Chapter 4: The Song of the Night Sun",
        scenePrompt: "At sunset over an ancient Mesoamerican temple, the jaguar and quetzal sit together as fireflies and golden stars illuminate the night.",
        narrativeText:
          "That evening, as the golden sun dipped behind the ancient pyramids of Monte Albán, the sky turned to shades of mango orange and deep twilight indigo. Balam sat side by side with Kukul the Quetzal on the stone temple stairs. Thousands of green fireflies began to blink, mirroring the constellations above. Balam didn't need to roar anymore; he purred softly, matching the sweet whistle of the bird. Together, the jaguar and the quetzal had given the jungle its most beautiful lullaby.",
        dialogueLines: [
          {
            speaker: "Balam the Golden Jaguar",
            speakerRole: "character",
            avatar: "🐆",
            text: "My grandfather told me the jaguar is the guardian of the night. Now I know that guarding means keeping peace.",
            voiceName: "Fenrir",
            mood: "wise & content",
          },
          {
            speaker: "Kukul the Sacred Quetzal",
            speakerRole: "character",
            avatar: "🦜",
            text: "Sleep softly, brave Balam. The stars will keep watch over the green kingdom until dawn.",
            voiceName: "Aoede",
            mood: "gentle twilight lullaby",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="twilightPyramidSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#1E1B4B" />
              <stop offset="40%" stop-color="#4C1D95" />
              <stop offset="75%" stop-color="#EA580C" />
              <stop offset="100%" stop-color="#FBBF24" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#twilightPyramidSky)" />
          <!-- Ancient Step Pyramid of Monte Albán -->
          <polygon points="400,260 560,420 240,420" fill="#312E81" />
          <polygon points="400,220 480,280 320,280" fill="#4338CA" />
          <rect x="360" y="280" width="80" height="60" fill="#3730A3" />
          <!-- Stone temple steps -->
          <rect x="180" y="420" width="440" height="40" fill="#1E1B4B" />
          <rect x="140" y="460" width="520" height="50" fill="#0F172A" />
          <rect x="100" y="510" width="600" height="90" fill="#020617" />
          <!-- Glowing Twilight Fireflies -->
          <circle cx="200" cy="380" r="5" fill="#A7F3D0" />
          <circle cx="260" cy="320" r="4" fill="#FEF08A" />
          <circle cx="580" cy="360" r="5" fill="#A7F3D0" />
          <circle cx="640" cy="280" r="4" fill="#FEF08A" />
          <!-- Golden Crescent Moon -->
          <path d="M 680 80 A 30 30 0 0 0 650 130 A 38 38 0 1 1 680 80 Z" fill="#FDE047" />
          <!-- Balam cuddled next to Kukul on temple stairs -->
          <g transform="translate(400, 480)">
            <!-- Balam resting peacefully -->
            <ellipse cx="-20" cy="0" rx="55" ry="32" fill="#F59E0B" stroke="#D97706" stroke-width="3" />
            <circle cx="25" cy="-14" r="20" fill="#F59E0B" stroke="#D97706" stroke-width="2.5" />
            <!-- Sleeping closed happy eyes -->
            <path d="M 20 -15 Q 26 -10 32 -15" stroke="#78350F" stroke-width="2.5" fill="none" stroke-linecap="round" />
            <circle cx="-35" cy="-8" r="5" fill="#78350F" />
            <circle cx="-10" cy="-5" r="5" fill="#78350F" />
            <!-- Quetzal perched comfortably right beside him -->
            <g transform="translate(55, -20)">
              <ellipse cx="0" cy="0" rx="20" ry="13" fill="#E11D48" />
              <circle cx="10" cy="-8" r="10" fill="#10B981" />
              <!-- Stream of emerald tail draped across step -->
              <path d="M -8 10 Q 15 50 40 80" stroke="#10B981" stroke-width="4.5" fill="none" stroke-linecap="round" />
            </g>
          </g>
        </svg>`,
        illustrationCaption: "Balam the jaguar and Kukul the quetzal resting in peaceful friendship upon the ancient temple steps.",
        vocabulary: [
          {
            word: "Constellation",
            pronunciation: "con-steh-LAY-shun",
            definition: "A recognizable pattern of stars in the night sky that tells ancient stories.",
            funFact: "Mayan astronomers tracked the movements of Venus and the stars so accurately they predicted eclipses hundreds of years in advance!",
          },
          {
            word: "Guardian",
            pronunciation: "GAR-dee-un",
            definition: "A protector who watches over and keeps safe the things they cherish.",
            funFact: "In Mexican folklore, every child has a companion spirit animal called an Alebrije or Nahual!",
          },
        ],
        hiddenStar: { xPercent: 82, yPercent: 18, clue: "Look right inside the curve of the glowing golden crescent moon!" },
        funActivity: "Point out the window and make a sweet wish on the very first star you see tonight!",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // STORY 10: Finbar & The Salmon of Knowledge (Ireland / Celtic)
  // ---------------------------------------------------------------------------
  {
    id: "finbar_salmon_ireland",
    title: "Finbar & Salmon of Knowledge",
    subtitle: "An Ancient Celtic Tale from the River Boyne in Ireland",
    region: "Europe",
    country: "Ireland",
    flag: "🇮🇪",
    culture: "Celtic & Gaelic",
    ageRange: "4–9 years",
    readTimeMinutes: 5,
    theme: "Curiosity, Wonder & Generosity",
    moral: "The greatest wisdom in the world is a heart full of kindness and a mind open to wonder.",
    coverCloth: "#15803D", // Celtic Shamrock Emerald
    coverSpine: "#14532D",
    accentColor: "#22C55E",
    paperColor: "#FFFDF7",
    cardColor: "#F0FDF4",
    summary:
      "Beside the gentle currents of Ireland's River Boyne, young poet-apprentice Finbar watches the deep hazelnut pool where swims Fintan, the legendary Salmon of Knowledge. In this enchanting Celtic adventure, Finbar discovers that true wisdom comes from caring for others and listening to the music of the earth.",
    coverSvg: `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="irelandCoverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#16A34A" />
          <stop offset="60%" stop-color="#15803D" />
          <stop offset="100%" stop-color="#14532D" />
        </linearGradient>
        <radialGradient id="celticGlow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stop-color="#FEF08A" stop-opacity="0.9" />
          <stop offset="50%" stop-color="#86EFAC" stop-opacity="0.4" />
          <stop offset="100%" stop-color="#15803D" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill="url(#irelandCoverGrad)" />
      <circle cx="400" cy="220" r="180" fill="url(#celticGlow)" />
      <!-- Ancient Celtic Rainbow Arc -->
      <path d="M 120 500 Q 400 120 680 500" stroke="#FDE047" stroke-width="6" fill="none" opacity="0.6" />
      <path d="M 130 500 Q 400 135 670 500" stroke="#38BDF8" stroke-width="6" fill="none" opacity="0.6" />
      <!-- Ancient Celtic Dolmen / Standing Stones -->
      <rect x="220" y="320" width="30" height="180" fill="#334155" />
      <rect x="310" y="320" width="30" height="180" fill="#334155" />
      <ellipse cx="280" cy="320" rx="75" ry="22" fill="#475569" />
      <!-- Silvery Leaping Salmon of Knowledge in Center -->
      <g transform="translate(440, 260)">
        <!-- Silver Salmon Body -->
        <path d="M -80 30 Q -20 -40 60 -10 Q 90 5 110 -20 Q 95 20 60 20 Q -10 50 -80 30 Z" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="3" />
        <!-- Iridescent Shimmer scales -->
        <circle cx="0" cy="8" r="6" fill="#67E8F9" opacity="0.8" />
        <circle cx="25" cy="5" r="5" fill="#F472B6" opacity="0.8" />
        <circle cx="-30" cy="12" r="5" fill="#FEF08A" opacity="0.8" />
        <!-- Salmon Eye with Golden Sparkle -->
        <circle cx="75" cy="2" r="5" fill="#0F172A" />
        <circle cx="76" cy="1" r="2" fill="#FEF08A" />
        <!-- Tail Fins -->
        <polygon points="-80,30 -105,10 -100,50" fill="#94A3B8" />
        <!-- Drops of Wisdom Water -->
        <circle cx="40" cy="-35" r="5" fill="#67E8F9" />
        <circle cx="70" cy="-45" r="4" fill="#67E8F9" />
        <circle cx="10" cy="-25" r="3.5" fill="#67E8F9" />
      </g>
      <!-- Nine Purple Hazelnuts floating on water ripples -->
      <circle cx="380" cy="420" r="10" fill="#A855F7" stroke="#FEF08A" stroke-width="2" />
      <circle cx="500" cy="440" r="9" fill="#A855F7" stroke="#FEF08A" stroke-width="2" />
      <circle cx="430" cy="460" r="11" fill="#A855F7" stroke="#FEF08A" stroke-width="2" />
    </svg>`,
    pages: [
      {
        pageNumber: 1,
        chapterTitle: "Chapter 1: The Pool of the Nine Hazels",
        scenePrompt: "Beside the sparkling River Boyne in Ireland, nine purple hazel trees drop nuts of wisdom into a crystal blue pool.",
        narrativeText:
          "In the green heart of ancient Ireland, where gentle clover covered the rolling hills and mist danced over the River Boyne, stood nine sacred hazel trees. Whenever a gentle breeze blew, the trees dropped shiny purple hazelnuts into the deep pool below. Swimming in the crystal ripples was Fintan, the magical silvery Salmon of Knowledge. Legend said that whoever tasted of the salmon would understand the language of the birds, the whisper of the trees, and the secrets of the stars.",
        dialogueLines: [
          {
            speaker: "Finbar the Poet Apprentice",
            speakerRole: "character",
            avatar: "🧒",
            text: "Look at the water shimmer, Master Finnegas! It sparkles just like a tapestry of diamonds!",
            voiceName: "Fenrir",
            mood: "curious & delighted",
          },
          {
            speaker: "Finnegas the Wise Bard",
            speakerRole: "character",
            avatar: "🧙‍♂️",
            text: "Patience, lad. True knowledge does not hurry; it flows gently like the river toward the sea.",
            voiceName: "Aoede",
            mood: "grandfatherly warmth",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="irelandSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#BAE6FD" />
              <stop offset="50%" stop-color="#E0F2FE" />
              <stop offset="100%" stop-color="#BBF7D0" />
            </linearGradient>
            <linearGradient id="boyneWater" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#0284C7" />
              <stop offset="100%" stop-color="#0F766E" />
            </linearGradient>
          </defs>
          <rect width="800" height="340" fill="url(#irelandSky)" />
          <rect y="340" width="800" height="260" fill="url(#boyneWater)" />
          <!-- Rolling Green Irish Hills -->
          <ellipse cx="200" cy="340" rx="280" ry="80" fill="#22C55E" />
          <ellipse cx="600" cy="350" rx="320" ry="90" fill="#16A34A" />
          <!-- Sacred Hazel Trees on Riverbank -->
          <g transform="translate(140, 220)">
            <rect x="0" y="40" width="16" height="90" fill="#78350F" />
            <circle cx="8" cy="20" r="60" fill="#15803D" />
            <!-- Purple Hazelnuts hanging -->
            <circle cx="-15" cy="30" r="7" fill="#A855F7" stroke="#FEF08A" stroke-width="1.5" />
            <circle cx="25" cy="40" r="7" fill="#A855F7" stroke="#FEF08A" stroke-width="1.5" />
          </g>
          <!-- Young Finbar sitting on stone bank -->
          <g transform="translate(280, 310)">
            <!-- Woolen tunic -->
            <rect x="-15" y="0" width="30" height="35" rx="6" fill="#0284C7" />
            <circle cx="0" cy="-15" r="14" fill="#FED7AA" />
            <!-- Red-orange Irish hair -->
            <path d="M -14 -24 Q 0 -34 14 -24 Q 18 -15 14 -8 Q 0 -12 -14 -8 Z" fill="#EA580C" />
            <circle cx="4" cy="-14" r="2" fill="#0F172A" />
            <path d="M 0 -8 Q 4 -4 8 -8" stroke="#78350F" stroke-width="2" fill="none" stroke-linecap="round" />
          </g>
          <!-- Wise Bard Finnegas sitting beside him with harp -->
          <g transform="translate(200, 290)">
            <rect x="-18" y="0" width="36" height="55" rx="8" fill="#4B5563" />
            <circle cx="0" cy="-16" r="15" fill="#FED7AA" />
            <!-- Long white beard -->
            <path d="M -12 -10 Q 0 25 12 -10 Z" fill="#F8FAFC" />
            <!-- Golden Celtic Harp -->
            <path d="M 24 -15 L 24 35 L 42 10 Z" fill="none" stroke="#FBBF24" stroke-width="3.5" />
            <line x1="28" y1="-5" x2="36" y2="20" stroke="#FDE047" stroke-width="1.5" />
            <line x1="32" y1="-2" x2="38" y2="15" stroke="#FDE047" stroke-width="1.5" />
          </g>
          <!-- Silvery Salmon swimming in the crystal pool -->
          <g transform="translate(520, 440)">
            <ellipse cx="0" cy="0" rx="60" ry="24" fill="#E2E8F0" stroke="#94A3B8" stroke-width="3" />
            <circle cx="42" cy="-4" r="3.5" fill="#0F172A" />
            <polygon points="-60,0 -85,-16 -85,16" fill="#94A3B8" />
            <!-- Shimmer spots -->
            <circle cx="-15" cy="0" r="4" fill="#38BDF8" opacity="0.8" />
            <circle cx="10" cy="4" r="4" fill="#F472B6" opacity="0.8" />
          </g>
        </svg>`,
        illustrationCaption: "Young Finbar and wise bard Finnegas sitting by the River Boyne beneath the purple hazelnut trees.",
        vocabulary: [
          {
            word: "Gaelic",
            pronunciation: "GAY-lik",
            definition: "The traditional Celtic language and culture of Ireland and Scotland, renowned for ancient music and poetry.",
            funFact: "In Irish Gaelic, the word for 'welcome' is 'Fáilte' (pronounced FAWL-chuh)!",
          },
          {
            word: "Boyne",
            pronunciation: "BOYN",
            definition: "A famous, historic river in eastern Ireland near ancient Neolithic stone monuments older than the pyramids.",
            funFact: "The Boyne Valley contains Newgrange, a 5,000-year-old stone temple that aligns perfectly with the winter solstice sunrise!",
          },
        ],
        hiddenStar: { xPercent: 26, yPercent: 48, clue: "Look right at the golden strings of Master Finnegas' Celtic harp!" },
        funActivity: "Hum a lively Irish jig melody while tapping your feet to the rhythm!",
      },
      {
        pageNumber: 2,
        chapterTitle: "Chapter 2: The Hearth on the Riverbank",
        scenePrompt: "A cozy stone hearth by the river where young Finbar watches over a bubbling copper pot.",
        narrativeText:
          "For seven years, old Finnegas had watched the pool. Finally, on a morning bright with summer sun, the silver salmon took his hook. Finnegas placed the fish in a copper pot over a warm hearth of fragrant peat moss. 'Watch the pot carefully, Finbar,' said the old teacher gently. 'Stir it with the hazel branch, but do not eat a single bite until I return from gathering sweet mint leaves.' Finbar nodded faithfully, tending the fire with watchful care.",
        dialogueLines: [
          {
            speaker: "Finnegas the Wise Bard",
            speakerRole: "character",
            avatar: "🧙‍♂️",
            text: "Tend the fire with gentle breath, Finbar. The purest wisdom requires steady attention.",
            voiceName: "Aoede",
            mood: "solemn trust",
          },
          {
            speaker: "Finbar the Poet Apprentice",
            speakerRole: "character",
            avatar: "🧒",
            text: "You can trust me, master. I will keep the fire warm and sweet like a hearth song.",
            voiceName: "Fenrir",
            mood: "faithful & eager",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="hearthGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#F97316" stop-opacity="0.9" />
              <stop offset="60%" stop-color="#EA580C" stop-opacity="0.4" />
              <stop offset="100%" stop-color="#78350F" stop-opacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="600" fill="#064E3B" />
          <!-- Stone Riverbank Hearth -->
          <ellipse cx="400" cy="420" rx="280" ry="110" fill="#334155" />
          <ellipse cx="400" cy="410" rx="240" ry="80" fill="#475569" />
          <!-- Warm Fire with Hearth Glow -->
          <circle cx="400" cy="380" r="120" fill="url(#hearthGlow)" />
          <polygon points="380,410 400,320 420,410" fill="#FBBF24" />
          <polygon points="390,410 400,340 410,410" fill="#EF4444" />
          <!-- Shiny Copper Pot -->
          <g transform="translate(400, 310)">
            <ellipse cx="0" cy="0" rx="70" ry="24" fill="#B45309" stroke="#F59E0B" stroke-width="3" />
            <rect x="-70" y="0" width="140" height="60" rx="10" fill="#B45309" stroke="#F59E0B" stroke-width="3" />
            <!-- Steam rising in curly wisps -->
            <path d="M -30 -20 Q -45 -50 -20 -80" stroke="#E2E8F0" stroke-width="3" fill="none" opacity="0.7" />
            <path d="M 0 -25 Q 15 -60 0 -95" stroke="#E2E8F0" stroke-width="3.5" fill="none" opacity="0.8" />
            <path d="M 30 -20 Q 45 -50 20 -80" stroke="#E2E8F0" stroke-width="3" fill="none" opacity="0.7" />
          </g>
          <!-- Finbar tending with hazel branch spoon -->
          <g transform="translate(240, 340)">
            <rect x="-16" y="0" width="32" height="42" rx="8" fill="#0284C7" />
            <circle cx="0" cy="-18" r="16" fill="#FED7AA" />
            <path d="M -16 -26 Q 0 -36 16 -26 Q 20 -16 16 -8 Q 0 -12 -16 -8 Z" fill="#EA580C" />
            <!-- Hazel stirring stick reaching into pot -->
            <line x1="16" y1="10" x2="110" y2="-20" stroke="#92400E" stroke-width="5" stroke-linecap="round" />
          </g>
          <!-- Irish Wildflowers (Shamrocks & Bluebells) on grass -->
          <g transform="translate(580, 460)">
            <circle cx="-10" cy="0" r="8" fill="#22C55E" />
            <circle cx="10" cy="0" r="8" fill="#22C55E" />
            <circle cx="0" cy="-10" r="8" fill="#22C55E" />
            <line x1="0" y1="0" x2="0" y2="25" stroke="#16A34A" stroke-width="2.5" />
          </g>
        </svg>`,
        illustrationCaption: "Finbar faithfully tending the copper pot over the fragrant riverbank hearth.",
        vocabulary: [
          {
            word: "Apprentice",
            pronunciation: "uh-PREN-tiss",
            definition: "A student who learns a craft, art, or wisdom by working alongside an experienced master.",
            funFact: "In ancient Ireland, bardic apprentices studied for up to twelve years to memorize hundreds of epic poems!",
          },
          {
            word: "Peat",
            pronunciation: "PEET",
            definition: "Rich, fragrant soil made of dried moss and heather used for warm fires in the Irish countryside.",
            funFact: "Peat bogs in Ireland preserve ancient wooden artifacts and butter barrels for thousands of years without spoiling!",
          },
        ],
        hiddenStar: { xPercent: 50, yPercent: 44, clue: "Look right where the warm golden firelight shines on the copper pot!" },
        funActivity: "Hold both hands cupped together like a cozy warm hearth and blow three gentle breaths!",
      },
      {
        pageNumber: 3,
        chapterTitle: "Chapter 3: The Drop of Wonder",
        scenePrompt: "A magical bubble on the fish bursts, and Finbar touches his thumb to cool it, discovering the music of nature.",
        narrativeText:
          "As the soup simmered, a tiny bubble rose on the skin of the salmon and popped. A droplet of hot broth splashed onto Finbar's thumb. Instantly, without thinking, Finbar popped his thumb into his mouth to cool it. In that very moment, a warm wave of magic rushed through his heart! The trees began to sing, the wind whispered poetry, and Finbar could hear the thoughts of two blackbirds singing in the rowan tree above.",
        dialogueLines: [
          {
            speaker: "Finbar's Awakening",
            speakerRole: "character",
            avatar: "✨",
            text: "The birds... they are singing of the morning dew on the clover! I can understand every note!",
            voiceName: "Fenrir",
            mood: "breathless astonishment",
          },
          {
            speaker: "Rowan Blackbird",
            speakerRole: "character",
            avatar: "🐦",
            text: "Rejoice, kind Finbar! The Salmon of Knowledge has chosen a boy with a gentle heart!",
            voiceName: "Aoede",
            mood: "melodic chirping",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="wisdomBurst" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stop-color="#FEF08A" stop-opacity="0.95" />
              <stop offset="40%" stop-color="#67E8F9" stop-opacity="0.6" />
              <stop offset="100%" stop-color="#0F766E" stop-opacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="600" fill="#0F172A" />
          <circle cx="400" cy="280" r="260" fill="url(#wisdomBurst)" />
          <!-- Swirling Golden Starlight Wisps -->
          <path d="M 200 400 Q 400 100 600 400" stroke="#FDE047" stroke-width="4" fill="none" opacity="0.8" />
          <path d="M 240 440 Q 400 160 560 440" stroke="#67E8F9" stroke-width="3" fill="none" opacity="0.7" />
          <!-- Rowan Tree with Red Berries -->
          <path d="M 600 0 L 680 0 L 720 600 L 580 600 Z" fill="#451A03" />
          <!-- Red Rowan Berries -->
          <circle cx="560" cy="180" r="6" fill="#DC2626" />
          <circle cx="575" cy="190" r="6" fill="#DC2626" />
          <circle cx="565" cy="205" r="6" fill="#DC2626" />
          <!-- Singing Blackbird perched on branch -->
          <g transform="translate(560, 150)">
            <ellipse cx="0" cy="0" rx="20" ry="14" fill="#0F172A" />
            <circle cx="-12" cy="-8" r="10" fill="#0F172A" />
            <polygon points="-22,-8 -32,-6 -22,-4" fill="#FBBF24" />
            <circle cx="-14" cy="-10" r="2.5" fill="#FEF08A" />
            <text x="-45" y="-15" font-size="20" fill="#FDE047">♪</text>
          </g>
          <!-- Finbar with thumb to mouth, glowing with celestial wonder -->
          <g transform="translate(380, 320)">
            <ellipse cx="0" cy="0" rx="45" ry="55" fill="#0284C7" />
            <circle cx="0" cy="-35" r="28" fill="#FED7AA" />
            <path d="M -26 -50 Q 0 -66 26 -50 Q 32 -32 26 -18 Q 0 -24 -26 -18 Z" fill="#EA580C" />
            <!-- Wide amazed eyes -->
            <circle cx="-8" cy="-35" r="4.5" fill="#0F172A" />
            <circle cx="-7" cy="-36" r="1.5" fill="#FFFFFF" />
            <circle cx="12" cy="-35" r="4.5" fill="#0F172A" />
            <circle cx="13" cy="-36" r="1.5" fill="#FFFFFF" />
            <!-- Thumb to lips with glowing star -->
            <ellipse cx="2" cy="-18" rx="8" ry="12" fill="#FED7AA" />
            <circle cx="2" cy="-18" r="10" fill="#FEF08A" opacity="0.9" />
          </g>
        </svg>`,
        illustrationCaption: "Finbar touched with the magical drop of knowledge, hearing the birds and trees sing for the first time.",
        vocabulary: [
          {
            word: "Rowan",
            pronunciation: "ROH-un",
            definition: "A sacred mountain ash tree with delicate leaves and clusters of bright scarlet berries.",
            funFact: "In Celtic folklore, planting a rowan tree by a garden gate was believed to protect the home with good fortune!",
          },
          {
            word: "Wisdom",
            pronunciation: "WIZ-dum",
            definition: "Having good judgment, understanding what is kind and fair, and learning from experience.",
            funFact: "The word 'wisdom' shares its root with 'vision'—seeing clearly with both your eyes and your heart!",
          },
        ],
        hiddenStar: { xPercent: 50, yPercent: 48, clue: "Look right at the glowing star shining upon Finbar's thumb!" },
        funActivity: "Put one finger gently to your ear, close your eyes, and name two quiet sounds you hear in your room right now!",
      },
      {
        pageNumber: 4,
        chapterTitle: "Chapter 4: The Greatest Gift",
        scenePrompt: "Finnegas embraces Finbar with joy beside an ancient stone arch as a Celtic rainbow spans the emerald hills.",
        narrativeText:
          "When Master Finnegas returned, he saw the light of wisdom shining in Finbar's clear eyes. Instead of becoming angry, the old bard smiled with deep tears of joy. 'The Salmon has chosen you, Finbar,' he whispered warmly. 'For knowledge belongs not to the proud, but to the pure of heart.' Finbar grew up to become the greatest storyteller and peacemaker in all of Ireland, sharing his songs and kind wisdom with every child across the emerald hills.",
        dialogueLines: [
          {
            speaker: "Finnegas the Wise Bard",
            speakerRole: "character",
            avatar: "🧙‍♂️",
            text: "Go forth with courage, Finbar! Use your gift to bring laughter to the weary and peace to the land.",
            voiceName: "Aoede",
            mood: "triumphant blessing",
          },
          {
            speaker: "Finbar the Young Bard",
            speakerRole: "character",
            avatar: "🧒",
            text: "I will share every story with kindness, master! Wisdom is a gift meant for everyone to enjoy.",
            voiceName: "Fenrir",
            mood: "heartfelt pledge",
          },
        ],
        illustrationSvg: `<svg viewBox="0 0 800 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="rainbowSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#38BDF8" />
              <stop offset="50%" stop-color="#BAE6FD" />
              <stop offset="100%" stop-color="#86EFAC" />
            </linearGradient>
          </defs>
          <rect width="800" height="600" fill="url(#rainbowSky)" />
          <!-- Magnificent Celtic Double Rainbow -->
          <path d="M 80 500 Q 400 60 720 500" stroke="#F43F5E" stroke-width="8" fill="none" opacity="0.75" />
          <path d="M 90 500 Q 400 80 710 500" stroke="#FBBF24" stroke-width="8" fill="none" opacity="0.75" />
          <path d="M 100 500 Q 400 100 700 500" stroke="#22C55E" stroke-width="8" fill="none" opacity="0.75" />
          <path d="M 110 500 Q 400 120 690 500" stroke="#38BDF8" stroke-width="8" fill="none" opacity="0.75" />
          <path d="M 120 500 Q 400 140 680 500" stroke="#A855F7" stroke-width="8" fill="none" opacity="0.75" />
          <!-- Lush Emerald Hills of Eire -->
          <ellipse cx="250" cy="520" rx="360" ry="110" fill="#15803D" />
          <ellipse cx="600" cy="540" rx="340" ry="120" fill="#166534" />
          <!-- Ancient Celtic Stone Dolmen -->
          <rect x="580" y="380" width="22" height="110" fill="#475569" />
          <rect x="650" y="380" width="22" height="110" fill="#475569" />
          <ellipse cx="625" cy="380" rx="55" ry="16" fill="#64748B" />
          <!-- Master Finnegas and Young Finbar standing in celebration -->
          <g transform="translate(360, 440)">
            <!-- Finnegas hugging Finbar's shoulder -->
            <rect x="-35" y="0" width="40" height="65" rx="10" fill="#4B5563" />
            <circle cx="-15" cy="-22" r="18" fill="#FED7AA" />
            <path d="M -25 -16 Q -15 20 -5 -16 Z" fill="#F8FAFC" />
            <!-- Finbar beside him with golden harp -->
            <rect x="25" y="10" width="30" height="50" rx="8" fill="#0284C7" />
            <circle cx="40" cy="-10" r="16" fill="#FED7AA" />
            <path d="M 24 -18 Q 40 -28 56 -18 Q 60 -8 56 0 Q 40 -4 24 0 Z" fill="#EA580C" />
            <!-- Small golden harp in Finbar's hands -->
            <path d="M 60 15 L 60 55 L 75 35 Z" fill="none" stroke="#FBBF24" stroke-width="3" />
          </g>
          <!-- Four-Leaf Shamrocks blooming in foreground -->
          <g transform="translate(180, 520)">
            <circle cx="-6" cy="0" r="6" fill="#22C55E" />
            <circle cx="6" cy="0" r="6" fill="#22C55E" />
            <circle cx="0" cy="-6" r="6" fill="#22C55E" />
            <circle cx="0" cy="6" r="6" fill="#22C55E" />
          </g>
        </svg>`,
        illustrationCaption: "Finbar and Finnegas celebrating under the magnificent Celtic rainbow across the emerald hills.",
        vocabulary: [
          {
            word: "Solstice",
            pronunciation: "SAHL-stiss",
            definition: "The special day of the year with the longest sunlight (summer) or shortest day (winter).",
            funFact: "Ancient stone builders in Ireland aligned monuments to capture the golden solstice beams 5,000 years ago!",
          },
          {
            word: "Generosity",
            pronunciation: "jen-uh-RAH-sih-tee",
            definition: "The noble willingness to share your gifts, time, and kindness freely with others.",
            funFact: "In Celtic tradition, hospitality to travelers was so sacred that bards were welcomed into every hall with warm food and music!",
          },
        ],
        hiddenStar: { xPercent: 50, yPercent: 18, clue: "Look right at the highest point of the glowing Celtic rainbow arch!" },
        funActivity: "Put your hand on your heart and say: 'I choose to share kindness and wonder with everyone I meet!'",
      },
    ],
  },
];
