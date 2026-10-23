import React, { useState } from "react";
import { ChildrenStory } from "../data/childrenStories";
import { speechNarrator } from "../services/speechNarrator";
import { playChimeSound, playSparkleSound } from "../services/soundEffects";

interface CulturalLoreDrawerProps {
  story: ChildrenStory;
  isOpen: boolean;
  onClose: () => void;
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
  },
};

export const CulturalLoreDrawer: React.FC<CulturalLoreDrawerProps> = ({
  story,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const lore = CULTURAL_LORE_DATA[story.id] || {
    indigenousName: `${story.culture} Folktale`,
    traditionalStorytellerTitle: "Traditional Village Elder",
    historicalBackground: `This beloved tale originates from ${story.country} and has been passed down for generations to share values of ${story.theme.toLowerCase()} with children.`,
    culturalSignificance: story.moral,
    funCulturalFact: `Stories in ${story.country} are often told with music, dance, and festive community gatherings!`,
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-xl w-full bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-[#FBBF24] max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-5 border-b border-amber-200">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">{story.flag}</span>
            <div>
              <h2 className="font-['Baloo_2'] text-2xl font-bold text-[#78350F]">
                Grandmother's Lore Corner
              </h2>
              <p className="font-['Quicksand'] text-xs text-amber-800">
                Cultural roots and history behind "{story.title}"
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

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

          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-['Fredoka'] font-bold text-sm shadow-md transition-all active:scale-95"
          >
            Return to Storybook 📖
          </button>
        </div>
      </div>
    </div>
  );
};
