import React, { useState } from "react";
import { ChildrenStory } from "../data/childrenStories";
import { speechNarrator } from "../services/speechNarrator";
import { playChimeSound, playSparkleSound } from "../services/soundEffects";

interface CulturalLoreDrawerProps {
  story: ChildrenStory;
  isOpen: boolean;
  onClose: () => void;
}

interface NativePhrase {
  native: string;
  phonetic: string;
  meaning: string;
  context: string;
  spokenAudioText: string;
}

const CULTURAL_LORE_DATA: Record<
  string,
  {
    historicalBackground: string;
    culturalSignificance: string;
    indigenousName: string;
    traditionalStorytellerTitle: string;
    traditionalGreeting?: string;
    spokenGreeting?: string;
    funCulturalFact: string;
    nativePhrases: NativePhrase[];
  }
> = {
  anansi_pot_of_wisdom: {
    indigenousName: "Anansesem (Spider Stories)",
    traditionalStorytellerTitle: "Jali / Griot",
    traditionalGreeting: "Akwaaba! (Ah-KWAH-bah · Welcome)",
    spokenGreeting: "Akwaaba! Welcome to the warm hearth of Ghana.",
    historicalBackground:
      "For centuries, the Ashanti people of Ghana gathered in village courtyards around warm evening fires to share tales of Kwaku Anansi. Rather than writing stories down in books, the community preserved their history, values, and humor through oral storytelling.",
    culturalSignificance:
      "Anansi represents how cleverness, humility, and wit can overcome brute force. The pot of wisdom teaches that knowledge must never be monopolized or hoarded—it only thrives when freely shared across the entire community.",
    funCulturalFact:
      "In West Africa, spider tales became so beloved that the word 'Anansesem' became the general word for all folktales!",
    nativePhrases: [
      {
        native: "Akwaaba",
        phonetic: "Ah-KWAH-bah",
        meaning: "Welcome with warm open arms",
        context: "Spoken to greet travelers and friends when entering a home in Ghana.",
        spokenAudioText: "Akwaaba! Welcome to our village.",
      },
      {
        native: "Medaase",
        phonetic: "Meh-dah-AH-see",
        meaning: "Thank you from my heart",
        context: "The everyday Ashanti expression of heartfelt gratitude.",
        spokenAudioText: "Medaase! Thank you very much.",
      },
      {
        native: "Anansesem",
        phonetic: "Ah-nahn-seh-SEM",
        meaning: "Spider stories / Folktales",
        context: "The ancient oral tradition of teaching morals through Anansi.",
        spokenAudioText: "Anansesem. Tales of the clever spider.",
      },
      {
        native: "Nyame",
        phonetic: "N-YAH-mee",
        meaning: "The Supreme Sky Guardian",
        context: "In Ashanti lore, Nyame placed the celestial stars in the heavens.",
        spokenAudioText: "Nyame. The sky guardian.",
      },
    ],
  },
  momotaro_peach_boy: {
    indigenousName: "桃太郎 (Momotarō)",
    traditionalStorytellerTitle: "Kamishibai Paper Theater Performer",
    traditionalGreeting: "こんにちは! (Konnichiwa · Hello & Peace)",
    spokenGreeting: "Konnichiwa! Welcome to the ancient tales of Japan.",
    historicalBackground:
      "Originating during the Edo period in Okayama, Japan, Momotaro is one of the most famous mukashi-banashi (ancient tales). Traveling performers would bicycle from village to village with wooden kamishibai boxes, telling the tale with illustrated cards.",
    culturalSignificance:
      "Momotaro exemplifies 'Wa' (peace, harmony) and the power of sharing a meal. Instead of conquering the ogres with weapons, Momotaro shares his mother's dumplings, transforming adversaries into lifelong friends.",
    funCulturalFact:
      "Every year in Okayama, a vibrant Momotaro Festival is held with lanterns, peach floats, and traditional Uraja dancing!",
    nativePhrases: [
      {
        native: "こんにちは (Konnichiwa)",
        phonetic: "Kohn-nee-chee-wah",
        meaning: "Hello and peace to you today",
        context: "The universal respectful Japanese daytime greeting.",
        spokenAudioText: "Konnichiwa! Peace to your day.",
      },
      {
        native: "ありがとうございます (Arigatou gozaimasu)",
        phonetic: "Ah-ree-gah-toe go-zigh-mahs",
        meaning: "Thank you very much with utmost respect",
        context: "Polite gratitude shared between friends and teachers.",
        spokenAudioText: "Arigatou gozaimasu. Thank you very much.",
      },
      {
        native: "昔々 (Mukashi mukashi)",
        phonetic: "Moo-kah-shee moo-kah-shee",
        meaning: "Once upon a time in ancient days",
        context: "How every traditional Japanese folktale begins.",
        spokenAudioText: "Mukashi mukashi. Once upon a time in ancient days.",
      },
      {
        native: "和 (Wa)",
        phonetic: "Wah",
        meaning: "Harmony, peace and togetherness",
        context: "The central virtue exemplified by Momotaro sharing dumplings.",
        spokenAudioText: "Wa. Harmony and peaceful fellowship.",
      },
    ],
  },
  colibri_rain_flower: {
    indigenousName: "Wayra Colibrí (Hummingbird of the Wind)",
    traditionalStorytellerTitle: "Amauta (Inca Wise Teacher)",
    traditionalGreeting: "Allinllachu! (Ah-yeen-YAH-choo · Are you well?)",
    spokenGreeting: "Allinllachu! Greetings from the majestic Andes mountains.",
    historicalBackground:
      "High in the Peruvian Andes, ancient Quechua and Inca civilizations viewed the hummingbird (Siwar Qinti) as a sacred messenger linking humanity with the Apus (sacred mountain guardian spirits) and Pachamama (Mother Earth).",
    culturalSignificance:
      "The legend celebrates perseverance and environmental harmony. The tiniest creature took flight when the mighty condors feared to fly, showing that small daily acts of care can heal the climate and our surroundings.",
    funCulturalFact:
      "The red Cantuta flower in the story is the official national flower of Peru and Bolivia, known as the 'Sacred Flower of the Sun.'",
    nativePhrases: [
      {
        native: "Allinllachu",
        phonetic: "Ah-yeen-YAH-choo",
        meaning: "Are you well? Peace to your spirit",
        context: "Quechua friendly greeting spoken in mountain villages.",
        spokenAudioText: "Allinllachu! Are you well today?",
      },
      {
        native: "Añay",
        phonetic: "Ah-NIGH",
        meaning: "Thank you with a smiling heart",
        context: "The Quechua word for gratitude to family and nature.",
        spokenAudioText: "Añay. Thank you with a smiling heart.",
      },
      {
        native: "Pachamama",
        phonetic: "Pah-chah-MAH-mah",
        meaning: "Mother Earth, nature and cosmos",
        context: "Revered in the Andes as the sacred mother who nourishes all life.",
        spokenAudioText: "Pachamama. Mother Earth.",
      },
      {
        native: "Siwar Qinti",
        phonetic: "See-wahr KEEN-tee",
        meaning: "Sacred royal turquoise hummingbird",
        context: "The magical pollinator believed to carry human prayers to the rain clouds.",
        spokenAudioText: "Siwar Qinti. The royal hummingbird.",
      },
    ],
  },
  ma_liang_paintbrush: {
    indigenousName: "神笔马良 (Shén Bǐ Mǎ Liáng)",
    traditionalStorytellerTitle: "Shuoshu Master (Storyteller)",
    traditionalGreeting: "你好! (Nǐ hǎo · Good fortune to you)",
    spokenGreeting: "Ni hao! Welcome to the land of dragons and magic brushstrokes.",
    historicalBackground:
      "Written down by celebrated children's author Hong Xuntao in the 1950s based on centuries-old folk traditions from Zhejiang, this tale emphasizes the nobility of hard work, self-discipline, and compassion.",
    culturalSignificance:
      "The magic paintbrush will only work for someone whose heart is pure and seeks to help others. When greedy officials try to steal the brush, it creates nothing of value, teaching that true talent belongs to the generous.",
    funCulturalFact:
      "Traditional Chinese ink is made from natural pine soot and fragrant tree resins, allowing paintings to stay vibrant for over a thousand years!",
    nativePhrases: [
      {
        native: "你好 (Nǐ hǎo)",
        phonetic: "Nee-how",
        meaning: "You be well / Hello",
        context: "The universal respectful greeting in China.",
        spokenAudioText: "Ni hao! May good health follow you.",
      },
      {
        native: "谢谢 (Xièxie)",
        phonetic: "Shyeh-shyeh",
        meaning: "Thank you deeply",
        context: "Warm gratitude for acts of generosity and help.",
        spokenAudioText: "Xiexie. Thank you from the heart.",
      },
      {
        native: "神笔 (Shén bǐ)",
        phonetic: "Shen-bee",
        meaning: "Magic divine paintbrush",
        context: "The mystical brush that brings compassionate art into living reality.",
        spokenAudioText: "Shen bi. The magical living paintbrush.",
      },
      {
        native: "和气 (Héqì)",
        phonetic: "Huh-chee",
        meaning: "Harmonious spirit and kindness",
        context: "The peaceful virtue that guided Ma Liang to help the village farmers.",
        spokenAudioText: "He qi. Gentle kindness and goodwill.",
      },
    ],
  },
  tiddalik_frog: {
    indigenousName: "Tiddalik the Bilbil (Dreamtime Fable)",
    traditionalStorytellerTitle: "Elder & Custodian of Songlines",
    traditionalGreeting: "G'day Mate! (Warm Australian Outback Welcome)",
    spokenGreeting: "G'day mate! Welcome to the ancient red billabongs and dreaming tracks.",
    historicalBackground:
      "Originating in the Gunai and Kurnai nations of southeastern Australia, this sacred Dreamtime (Tjukurpa) story has been passed down orally for tens of thousands of years, making it one of the oldest living stories on earth.",
    culturalSignificance:
      "The tale taught Aboriginal children the sacredness of billabongs and water conservation during droughts, while demonstrating that laughter and joy have the magical power to defuse stubbornness and heal nature.",
    funCulturalFact:
      "Certain real Australian burrowing frogs can store water in their bladders and sleep underground in a protective cocoon for up to five years waiting for rain!",
    nativePhrases: [
      {
        native: "G'day Mate",
        phonetic: "Goo-DAY mite",
        meaning: "Good day, friend and companion",
        context: "Iconic warm and friendly Australian welcome.",
        spokenAudioText: "G'day mate! Wonderful to see you.",
      },
      {
        native: "Tjukurpa",
        phonetic: "CHOO-koor-pah",
        meaning: "Dreamtime, sacred law and creation",
        context: "The enduring spiritual philosophy linking people, land, and ancestral stories.",
        spokenAudioText: "Tjukurpa. The sacred Dreamtime.",
      },
      {
        native: "Billabong",
        phonetic: "BILL-uh-bong",
        meaning: "Quiet, sparkling freshwater pool",
        context: "A curved oxbow lake in the outback that sustains wildlife during the dry season.",
        spokenAudioText: "Billabong. The freshwater oasis.",
      },
      {
        native: "Yirrkala",
        phonetic: "YEER-kah-lah",
        meaning: "Sacred songline place of water",
        context: "A celebrated coastal Indigenous community in Arnhem Land renowned for bark painting.",
        spokenAudioText: "Yirrkala. Land of songlines.",
      },
    ],
  },
  moana_turtle_voyage: {
    indigenousName: "Honu Wayfinding (The Sacred Sea Turtle)",
    traditionalStorytellerTitle: "Kahu / Wayfinder Navigator",
    traditionalGreeting: "Aloha & Kia Ora! (Love, peace & sea voyage)",
    spokenGreeting: "Aloha and Kia Ora! May ocean swells guide your canoe smoothly.",
    historicalBackground:
      "Polynesian wayfinders explored millions of square miles of the Pacific Ocean in double-hulled sailing canoes without instruments, navigating solely by observing ocean swells, bird flight paths, and celestial star paths.",
    culturalSignificance:
      "The green sea turtle (Honu) symbolizes good luck, longevity, and navigation. In Hawaiian and Samoan tradition, turtles guide voyagers through dangerous reef currents safely back to their family.",
    funCulturalFact:
      "Female sea turtles have a built-in magnetic compass in their brains that allows them to return to the exact same beach where they were born decades later!",
    nativePhrases: [
      {
        native: "Aloha",
        phonetic: "Ah-LOH-hah",
        meaning: "Love, peace, compassion and breath of life",
        context: "Spoken as greeting, farewell, and living philosophy across the Pacific.",
        spokenAudioText: "Aloha! May peace and sunshine surround you.",
      },
      {
        native: "Mahalo",
        phonetic: "Mah-HAH-loh",
        meaning: "Deep spiritual gratitude and thank you",
        context: "Expressing reverence for kindness received from elders and nature.",
        spokenAudioText: "Mahalo. Thank you with deep appreciation.",
      },
      {
        native: "Honu",
        phonetic: "HOH-noo",
        meaning: "Sacred green sea turtle",
        context: "The wise ocean navigator and guardian spirit (aumakua).",
        spokenAudioText: "Honu. The green sea turtle navigator.",
      },
      {
        native: "Moana",
        phonetic: "Moh-AH-nah",
        meaning: "The vast, living blue ocean",
        context: "The ocean is viewed not as a barrier, but as a bridge uniting all islands.",
        spokenAudioText: "Moana. The great open ocean.",
      },
    ],
  },
  lars_northern_lights: {
    indigenousName: "Nordlys & Isbjørn (Northern Lights & Polar Bear)",
    traditionalStorytellerTitle: "Sami & Norse Folktale Custodian",
    traditionalGreeting: "God dag! (Goo-dahg · Good day)",
    spokenGreeting: "God dag! Velkommen til den vakre nordiske fortellingen.",
    historicalBackground:
      "In the snowy Arctic regions of northern Norway and Svalbard, winter days are filled with the polar twilight (Mørketid). Families gathered inside timber turf huts around roaring hearths to tell tales as the auroras painted the sky.",
    culturalSignificance:
      "The story conveys bedtime comfort and peaceful coexistence with arctic wildlife. The auroras were viewed by ancient Norse people as bridges between the starry heavens and earth, watching over sleeping children.",
    funCulturalFact:
      "Green auroras occur when charged particles from solar flares collide with oxygen molecules in the upper atmosphere, 60 miles above the snow!",
    nativePhrases: [
      {
        native: "God dag",
        phonetic: "Goo-dahg",
        meaning: "Good day, health and warmth",
        context: "The polite Norwegian daytime greeting.",
        spokenAudioText: "God dag! Good day to you.",
      },
      {
        native: "Takk skal du ha",
        phonetic: "Tahk skahl doo hah",
        meaning: "Many heartfelt thanks to you",
        context: "The traditional expression of warm gratitude in Scandinavia.",
        spokenAudioText: "Takk skal du ha. Many thanks to you.",
      },
      {
        native: "Nordlys",
        phonetic: "NOORD-leess",
        meaning: "Northern Lights (Aurora Borealis)",
        context: "The green and violet celestial ribbons dancing in the Arctic winter sky.",
        spokenAudioText: "Nordlys. The magical Northern Lights.",
      },
      {
        native: "Koselig",
        phonetic: "KOO-seh-lee",
        meaning: "Cozy, warm comfort shared together",
        context: "The Norwegian concept of hearthside coziness during snowy nights.",
        spokenAudioText: "Koselig. Cozy warmth with loved ones.",
      },
    ],
  },
  panchatantra_turtle_geese: {
    indigenousName: "पंचतन्त्र: कम्बुग्रीव कथा (Kambugriva's Flight)",
    traditionalStorytellerTitle: "Pundit / Kathavachak (Story Scholar)",
    traditionalGreeting: "नमस्ते! (Namaste · I bow to your light)",
    spokenGreeting: "Namaste! Welcome to the ancient wisdom of the Panchatantra.",
    historicalBackground:
      "Composed in Sanskrit over 2,200 years ago by scholar Vishnu Sharma in ancient India, the Panchatantra was designed to teach young princes empathy, leadership, and friendship through witty animal fables.",
    culturalSignificance:
      "The flight of Kambugriva illustrates that having physical companions and clever ideas is only half the journey—exercising patient self-restraint and thoughtful silence when facing excitement or mockery is the key to safety and success.",
    funCulturalFact:
      "The Panchatantra traveled along the ancient Silk Road and inspired Aesop's fables, Persian Kalila wa Dimna, and La Fontaine's animal fables across Europe!",
    nativePhrases: [
      {
        native: "नमस्ते (Namaste)",
        phonetic: "Nah-mah-STAY",
        meaning: "I honor the sacred light within you",
        context: "Universal Indian greeting with hands gently folded over the heart.",
        spokenAudioText: "Namaste! I honor the light within you.",
      },
      {
        native: "धन्यवाद (Dhanyavaad)",
        phonetic: "Dhun-yuh-VAHD",
        meaning: "Blessed gratitude and thank you",
        context: "Formal and heartfelt expression of gratitude in Hindi.",
        spokenAudioText: "Dhanyavaad. Thank you with blessings.",
      },
      {
        native: "पञ्चतन्त्र (Panchatantra)",
        phonetic: "Pahn-chah-TAHN-trah",
        meaning: "Five Treatises of Life Wisdom",
        context: "The ancient collection of animal fables composed to teach cleverness and virtue.",
        spokenAudioText: "Panchatantra. Five books of timeless wisdom.",
      },
      {
        native: "मित्र (Mitra)",
        phonetic: "MEE-trah",
        meaning: "Devoted friend, protector and ally",
        context: "The Sanskrit concept of true friendship that transcends differences.",
        spokenAudioText: "Mitra. A loyal and faithful companion.",
      },
    ],
  },
  jaguar_quetzal_mexico: {
    indigenousName: "Balam y K'uk'ul (The Jaguar and Sacred Bird)",
    traditionalStorytellerTitle: "Aj K'in (Mayan Sun & Story Custodian)",
    traditionalGreeting: "¡Ba'ax ka wa'alik! (Bah-ash kah wah-leek · Mayan: What does your heart say?)",
    spokenGreeting: "Ba'ax ka wa'alik! Welcome to the sacred emerald forest of Oaxaca.",
    historicalBackground:
      "Across Mayan and Zapotec cultures in southern Mexico, the jaguar (Balam) was honored as the mystical ruler of the night sky, while the Quetzal bird was the sacred herald of wind, rain, and light. Storytellers told their adventures under flowering ceiba trees.",
    culturalSignificance:
      "The fable teaches children that real confidence comes not from acting fierce or intimidating others with loud noise, but from quiet listening, mindfulness, and harmonizing with the natural world around us.",
    funCulturalFact:
      "In ancient Mesoamerica, Quetzal birds were never harmed; priests would gently collect loose feathers during molting season and release the birds safely back into the mist!",
    nativePhrases: [
      {
        native: "Ba'ax ka wa'alik",
        phonetic: "Bah-ash kah wah-LEEK",
        meaning: "What does your heart speak today?",
        context: "Poetic Mayan greeting expressing genuine care for someone's thoughts.",
        spokenAudioText: "Ba'ax ka wa'alik. What does your heart say?",
      },
      {
        native: "Muchas Gracias",
        phonetic: "MOO-chahs GRAH-see-ahs",
        meaning: "Many graces and thanks to you",
        context: "Warm everyday Mexican expression of thankfulness.",
        spokenAudioText: "Muchas gracias! Thank you so much.",
      },
      {
        native: "Balam",
        phonetic: "Bah-LAHM",
        meaning: "Jaguar, ruler of the starry night",
        context: "The Mayan name for the majestic spotted feline of the jungle.",
        spokenAudioText: "Balam. The noble golden jaguar.",
      },
      {
        native: "K'uk'ul (Quetzal)",
        phonetic: "KOO-kool (Keht-ZAHL)",
        meaning: "Sacred feathered messenger of peace",
        context: "The iridescent green bird revered as a symbol of freedom and rain.",
        spokenAudioText: "Quetzal. The sacred emerald bird of peace.",
      },
    ],
  },
  finbar_salmon_ireland: {
    indigenousName: "Bradán Feasa (The Salmon of Knowledge)",
    traditionalStorytellerTitle: "Seanchaí (Traditional Irish Storyteller)",
    traditionalGreeting: "Dia dhuit! (DEE-uh gwit · God be with you / Peace to you)",
    spokenGreeting: "Dia dhuit! Fáilte to the green rolling hills and shimmering river of Ireland.",
    historicalBackground:
      "Passed down for thousands of years by the Gaelic seanchaithe (traveling storytellers) around peat fires, this tale is part of the Fenian Cycle celebrating the young hero Fionn mac Cumhaill (Finbar).",
    culturalSignificance:
      "The story illustrates that true wisdom cannot simply be hoarded through greedy ambition or bookish pride; rather, it blooms in the heart of someone who is humble, attentive, honest, and eager to share what they know with the community.",
    funCulturalFact:
      "In ancient Ireland, young poets were called 'filí' and were held in such high honor that kings would bow to them when they entered the banquet hall!",
    nativePhrases: [
      {
        native: "Dia dhuit",
        phonetic: "DEE-uh gwit",
        meaning: "Peace and divine blessings be with you",
        context: "The timeless traditional Irish Gaelic greeting.",
        spokenAudioText: "Dia dhuit! A warm Irish greeting to you.",
      },
      {
        native: "Go raibh maith agat",
        phonetic: "Guh rov mah UH-gut",
        meaning: "May good things come to you / Thank you",
        context: "The poetic Irish way of thanking someone for their kindness.",
        spokenAudioText: "Go raibh maith agat. May goodness be with you.",
      },
      {
        native: "Bradán Feasa",
        phonetic: "BRAH-dawn FASS-uh",
        meaning: "The Salmon of Infinite Wisdom",
        context: "The mythical fish that swam in the River Boyne beneath nine hazel trees.",
        spokenAudioText: "Bradan Feasa. The Salmon of Knowledge.",
      },
      {
        native: "Sláinte",
        phonetic: "SLAWN-chuh",
        meaning: "Health, joy and happiness to all",
        context: "The beloved Irish wish of good cheer and wellbeing.",
        spokenAudioText: "Sláinte! Good health and cheer to you.",
      },
    ],
  },
  amira_golden_scarab: {
    indigenousName: "Khepri wa An-Nil (The Scarab of the River Nile)",
    traditionalStorytellerTitle: "Hakawati (Traditional Arabic Storyteller) / Temple Scribe",
    traditionalGreeting: "مرحباً! (Marhaban · Welcome & Peace)",
    spokenGreeting: "Marhaban! Welcome to the ancient sun-kissed banks of the River Nile.",
    historicalBackground:
      "Along the banks of the Nile for over 5,000 years, Egyptian elders shared stories of Khepri, the celestial scarab who pushed the morning sun into the sky. Children listened in shaded palm courtyards as papyrus boats glided quietly by.",
    culturalSignificance:
      "The story honors kindness toward little creatures and reveals that genuine heroism isn't having the loudest sword, but having a patient, generous heart willing to make wishes for the whole community.",
    funCulturalFact:
      "Ancient Egyptian children played with carved wooden spinning tops and marble balls shaped like miniature river turtles!",
    nativePhrases: [
      {
        native: "مرحباً (Marhaban)",
        phonetic: "MAR-hah-bahn",
        meaning: "Welcome, may you find spacious comfort",
        context: "Warm classical Arabic greeting spoken from Cairo to Alexandria.",
        spokenAudioText: "Marhaban! Welcome with joy.",
      },
      {
        native: "شكراً (Shukran)",
        phonetic: "SHOO-krahn",
        meaning: "Thank you with sincere gratitude",
        context: "Everyday heartfelt gratitude shared in Egypt.",
        spokenAudioText: "Shukran. Thank you very much.",
      },
      {
        native: "خَبْرِي (Khepri)",
        phonetic: "KEH-pree",
        meaning: "The dawn scarab that heralds the sun",
        context: "The ancient Egyptian symbol of rebirth, renewal, and rising dawn.",
        spokenAudioText: "Khepri. The golden scarab of dawn.",
      },
      {
        native: "النيل (An-Nil)",
        phonetic: "Ahn-NEEL",
        meaning: "The River Nile, source of all life",
        context: "The longest river on Earth whose annual floods gave Egypt its fertile soil.",
        spokenAudioText: "An-Nil. The great River Nile.",
      },
    ],
  },
  curupira_emerald_jaguar: {
    indigenousName: "O Curupira e a Onça Pintada (Guardian of the Rainforest)",
    traditionalStorytellerTitle: "Pajé (Indigenous Wisdom Keeper) / Contador de Causos",
    traditionalGreeting: "Olá! Tudo bem? (Oh-LAH TOO-doo bayng · Hello! Is all good?)",
    spokenGreeting: "Olá! Tudo bem? Welcome to the lush, breathing canopy of the Brazilian Amazon.",
    historicalBackground:
      "Told by Tupi-Guarani indigenous peoples of Brazil and celebrated across the Amazon river, Curupira is one of the oldest and most beloved folklore legends in South America, celebrated on National Folklore Day every August.",
    culturalSignificance:
      "Curupira symbolizes the rainforest's voice. By walking with backward tracks, he reminds humanity that when we take care of the trees, water, and animals, the forest protects and nourishes all generations.",
    funCulturalFact:
      "The Amazon River contains one-fifth of all the fresh river water on planet Earth, and is home to over 3,000 species of fish!",
    nativePhrases: [
      {
        native: "Olá! Tudo bem?",
        phonetic: "Oh-LAH TOO-doo bayng",
        meaning: "Hello! Is everything going wonderfully?",
        context: "The vibrant, friendly Brazilian Portuguese greeting.",
        spokenAudioText: "Olá! Tudo bem? Great to meet you.",
      },
      {
        native: "Muito obrigado",
        phonetic: "MOO-ee-too oh-bree-GAH-doo",
        meaning: "Thank you very much with gratitude",
        context: "Kind appreciation spoken to friends and elders.",
        spokenAudioText: "Muito obrigado! Thank you so much.",
      },
      {
        native: "Curupira",
        phonetic: "Koo-roo-PEE-rah",
        meaning: "Ancient guardian of the rainforest canopy",
        context: "The red-haired protector whose backward tracks guard the wildlife.",
        spokenAudioText: "Curupira. Forest protector of the Amazon.",
      },
      {
        native: "Onça Pintada",
        phonetic: "OHN-sah peen-TAH-dah",
        meaning: "The spotted golden jaguar of Brazil",
        context: "The largest wild feline in the Americas, honored in indigenous lore.",
        spokenAudioText: "Onça pintada. The spotted jaguar.",
      },
    ],
  },
};

export const CulturalLoreDrawer: React.FC<CulturalLoreDrawerProps> = ({
  story,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"lore" | "phrases">("lore");
  const [speakingPhraseIdx, setSpeakingPhraseIdx] = useState<number | null>(null);

  if (!isOpen) return null;

  const lore = CULTURAL_LORE_DATA[story.id] || {
    indigenousName: `${story.culture} Folktale`,
    traditionalStorytellerTitle: "Traditional Village Elder",
    historicalBackground: `This beloved tale originates from ${story.country} and has been passed down for generations to share values of ${story.theme.toLowerCase()} with children.`,
    culturalSignificance: story.moral,
    funCulturalFact: `Stories in ${story.country} are often told with music, dance, and festive community gatherings!`,
    nativePhrases: [],
  };

  const handleSpeakPhrase = (phrase: NativePhrase, idx: number) => {
    setSpeakingPhraseIdx(idx);
    playSparkleSound();
    speechNarrator.speakSingleLine(phrase.spokenAudioText, "World Explorer", "🗣️");
    setTimeout(() => {
      setSpeakingPhraseIdx((prev) => (prev === idx ? null : prev));
    }, 1200);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-xl w-full bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-[#FBBF24] max-h-[92vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-200">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">{story.flag}</span>
            <div>
              <h2 className="font-['Baloo_2'] text-2xl font-bold text-[#78350F]">
                Grandmother's Lore Corner
              </h2>
              <p className="font-['Quicksand'] text-xs text-amber-800">
                Cultural heritage, geography & native words for "{story.title}"
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center justify-center font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Tab Switcher: Cultural Lore vs. Native Word Explorer */}
        <div className="flex items-center bg-amber-100/70 p-1 rounded-2xl mb-4 border border-amber-300/80">
          <button
            onClick={() => {
              playChimeSound(659);
              setActiveTab("lore");
            }}
            className={`flex-1 py-1.5 rounded-xl font-['Fredoka'] font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "lore"
                ? "bg-amber-500 text-white shadow-xs"
                : "text-amber-900 hover:text-amber-950"
            }`}
          >
            <span>📜 Cultural Roots</span>
          </button>

          <button
            onClick={() => {
              playChimeSound(784);
              setActiveTab("phrases");
            }}
            className={`flex-1 py-1.5 rounded-xl font-['Fredoka'] font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "phrases"
                ? "bg-amber-500 text-white shadow-xs"
                : "text-amber-900 hover:text-amber-950"
            }`}
          >
            <span>🗣️ World Words ({lore.nativePhrases.length})</span>
          </button>
        </div>

        {activeTab === "lore" ? (
          <div className="space-y-4">
            {/* Indigenous Title & Storyteller Tag */}
            <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-['Fredoka'] uppercase tracking-wider text-amber-700 font-semibold block">
                  Traditional Title in {story.culture}:
                </span>
                <span className="font-['Baloo_2'] text-lg font-bold text-amber-950">
                  {lore.indigenousName}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-['Fredoka'] uppercase tracking-wider text-amber-700 font-semibold block">
                  Traditional Storyteller:
                </span>
                <span className="font-['Fredoka'] text-xs font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full">
                  {lore.traditionalStorytellerTitle}
                </span>
              </div>
            </div>

            {/* Traditional Greeting Audio Interaction */}
            {lore.traditionalGreeting && (
              <div className="bg-gradient-to-r from-amber-100/80 via-orange-50 to-amber-100/80 rounded-2xl p-3.5 border border-amber-300 flex items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">🗣️</span>
                  <div>
                    <span className="text-[10px] font-['Fredoka'] font-bold uppercase text-amber-800 block">
                      Traditional Greeting:
                    </span>
                    <span className="font-['Baloo_2'] font-bold text-sm text-[#78350F]">
                      {lore.traditionalGreeting}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    playSparkleSound();
                    speechNarrator.speakSingleLine(
                      lore.spokenGreeting || lore.traditionalGreeting || "",
                      "Storyteller",
                      "🗣️"
                    );
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-['Fredoka'] font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>🔊</span>
                  <span>Hear Greeting</span>
                </button>
              </div>
            )}

            {/* Historical Background */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs">
              <h4 className="font-['Fredoka'] text-xs font-bold uppercase tracking-wider text-amber-800 mb-1.5 flex items-center gap-1.5">
                <span>🏛️</span>
                <span>Where This Story Came From:</span>
              </h4>
              <p className="font-['Quicksand'] text-sm text-stone-700 leading-relaxed">
                {lore.historicalBackground}
              </p>
            </div>

            {/* Cultural Significance & Moral */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs">
              <h4 className="font-['Fredoka'] text-xs font-bold uppercase tracking-wider text-amber-800 mb-1.5 flex items-center gap-1.5">
                <span>❤️</span>
                <span>Why Elders Told This Story:</span>
              </h4>
              <p className="font-['Quicksand'] text-sm text-stone-700 leading-relaxed">
                {lore.culturalSignificance}
              </p>
            </div>

            {/* Fun Cultural Fact */}
            <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-2xl p-4 border border-amber-300">
              <h4 className="font-['Fredoka'] text-xs font-bold uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1.5">
                <span>🌟</span>
                <span>Fascinating Cultural Fact:</span>
              </h4>
              <p className="font-['Quicksand'] text-xs sm:text-sm text-amber-950 leading-relaxed">
                {lore.funCulturalFact}
              </p>
            </div>
          </div>
        ) : (
          /* Native Word & Pronunciation Audio Bank */
          <div className="space-y-3 animate-fadeIn">
            <p className="font-['Quicksand'] text-xs text-stone-600">
              Listen to native words from {story.country} ({story.culture}), learn their meanings, and practice sounding them out!
            </p>

            <div className="space-y-2.5">
              {lore.nativePhrases.map((phrase, pIdx) => {
                const isSpeaking = speakingPhraseIdx === pIdx;
                return (
                  <div
                    key={pIdx}
                    className="bg-white rounded-2xl p-3.5 border border-amber-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-amber-400 transition-colors"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-['Baloo_2'] text-base font-bold text-amber-950">
                          {phrase.native}
                        </span>
                        <span className="text-[11px] font-['Fredoka'] text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full font-semibold">
                          🗣️ {phrase.phonetic}
                        </span>
                      </div>
                      <p className="font-['Fredoka'] text-xs font-bold text-[#78350F]">
                        {phrase.meaning}
                      </p>
                      <p className="font-['Quicksand'] text-[11px] text-stone-500 leading-tight">
                        {phrase.context}
                      </p>
                    </div>

                    <button
                      onClick={() => handleSpeakPhrase(phrase, pIdx)}
                      className={`px-3 py-2 rounded-xl text-xs font-['Fredoka'] font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer shrink-0 ${
                        isSpeaking
                          ? "bg-amber-600 text-white animate-pulse"
                          : "bg-amber-500 hover:bg-amber-600 active:scale-95 text-white"
                      }`}
                    >
                      <span>{isSpeaking ? "🔊 Speaking..." : "🔊 Pronounce"}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full mt-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-['Fredoka'] font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
        >
          Return to Storybook 📖
        </button>
      </div>
    </div>
  );
};
