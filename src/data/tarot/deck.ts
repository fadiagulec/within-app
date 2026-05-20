/**
 * Within — Rider-Waite-Smith 78-card tarot deck.
 *
 * Each card carries the traditional RWS meaning compressed into a
 * single sentence (upright + reversed), a contemplative reflection
 * prompt, and a journal hook. Where a card resonates with a chakra,
 * that's marked — the same chakra system the rest of the app uses.
 *
 * Content is built on established tarot lineage: Rider-Waite-Smith
 * imagery (Pamela Colman Smith / Arthur Waite), with psychological
 * depth from Mary K. Greer's reflective approach and Jungian /
 * archetypal readings from Sallie Nichols and Liz Greene. The voice
 * is contemplative, not predictive — these cards mirror what is
 * already alive, they do not foretell.
 */
import type { ChakraKey } from '@/types';

export type TarotSuit = 'major' | 'cups' | 'pentacles' | 'swords' | 'wands';
export type TarotElement = 'spirit' | 'water' | 'earth' | 'air' | 'fire';

export interface TarotCard {
  /** Stable id, e.g. 'major-00-fool', 'cups-ace', 'swords-king'. */
  id: string;
  /** Display name. */
  name: string;
  suit: TarotSuit;
  /** 0-21 for Major Arcana; 1-10 + 'page'|'knight'|'queen'|'king' for Minor. */
  rank: number | 'page' | 'knight' | 'queen' | 'king';
  element: TarotElement;
  /** Single symbolic emoji or glyph for visual rendering. */
  glyph: string;
  /** Hex color for card border / accent. */
  color: string;
  keywords: { upright: string[]; reversed: string[] };
  meaning: { upright: string; reversed: string };
  /** Sit-with prompt — for contemplation in the moment. */
  reflection: string;
  /** Journal hook — for writing afterward. */
  journalPrompt: string;
  /** Optional chakra this card resonates with. */
  chakra?: ChakraKey;
}

// ═══════════════════════════════════════════════════════════════════
//   MAJOR ARCANA (22 cards)
//   The soul's journey — archetypal life lessons
// ═══════════════════════════════════════════════════════════════════

const MAJOR_ARCANA: TarotCard[] = [
  {
    id: 'major-00-fool',
    name: 'The Fool',
    suit: 'major',
    rank: 0,
    element: 'spirit',
    glyph: '◯',
    color: '#E8D2B0',
    keywords: { upright: ['beginnings', 'innocence', 'leap of faith'], reversed: ['recklessness', 'hesitation', 'naivety'] },
    meaning: {
      upright: 'A new chapter is opening. Step forward into the unknown with an open heart — the path is built by walking it.',
      reversed: 'Something in you is stalling at the edge. Consider whether the fear is real, or whether you are hiding behind preparation.',
    },
    reflection: 'What is the next step you have been refusing to take?',
    journalPrompt: 'If I knew I could not fall, what would I begin today?',
    chakra: 'crown',
  },
  {
    id: 'major-01-magician',
    name: 'The Magician',
    suit: 'major',
    rank: 1,
    element: 'spirit',
    glyph: '∞',
    color: '#D4AF6E',
    keywords: { upright: ['manifestation', 'willpower', 'resourcefulness'], reversed: ['scattered focus', 'illusion', 'unused potential'] },
    meaning: {
      upright: 'You have everything you need on the table in front of you. Focus your will — what you give attention to grows.',
      reversed: 'The tools are present but unused. Consider where energy is being scattered or where you are doubting your capacity.',
    },
    reflection: 'What are you already in possession of that you are not yet using?',
    journalPrompt: 'Name three resources I have right now that would change everything if I actually used them.',
    chakra: 'solar',
  },
  {
    id: 'major-02-high-priestess',
    name: 'The High Priestess',
    suit: 'major',
    rank: 2,
    element: 'spirit',
    glyph: '☽',
    color: '#7B8DA8',
    keywords: { upright: ['intuition', 'mystery', 'inner knowing'], reversed: ['ignored intuition', 'secrets kept', 'disconnection from self'] },
    meaning: {
      upright: 'The answer is not outside. Listen to what you already know but have not let yourself say aloud.',
      reversed: 'You are overriding your knowing with logic or other people\'s opinions. The body has been telling you.',
    },
    reflection: 'What does your body know about this that your mind has not yet accepted?',
    journalPrompt: 'The truth I have been pretending not to know is…',
    chakra: 'thirdEye',
  },
  {
    id: 'major-03-empress',
    name: 'The Empress',
    suit: 'major',
    rank: 3,
    element: 'spirit',
    glyph: '♀',
    color: '#8A9D6E',
    keywords: { upright: ['abundance', 'nurture', 'creativity', 'embodiment'], reversed: ['over-giving', 'creative block', 'neglected self'] },
    meaning: {
      upright: 'You are in your fertile season. Tend what you love. Let beauty in. Receive — and let yourself be soft.',
      reversed: 'The well is running dry from giving without replenishing. The mother needs mothering today.',
    },
    reflection: 'What in your life is asking to be tended — and what is asking to tend you?',
    journalPrompt: 'Three things I will receive this week without earning them first.',
    chakra: 'sacral',
  },
  {
    id: 'major-04-emperor',
    name: 'The Emperor',
    suit: 'major',
    rank: 4,
    element: 'spirit',
    glyph: '♔',
    color: '#A04B3C',
    keywords: { upright: ['authority', 'structure', 'sovereignty'], reversed: ['rigidity', 'control', 'absent leadership'] },
    meaning: {
      upright: 'It is time to take the throne of your own life. Set the structures, the boundaries, the rules — sovereignly.',
      reversed: 'Either gripping too tight or abdicating completely. The middle path is leadership without domination.',
    },
    reflection: 'Where are you waiting for permission no one is going to give you?',
    journalPrompt: 'If I were fully in authority over my own life, what would I decide today?',
    chakra: 'root',
  },
  {
    id: 'major-05-hierophant',
    name: 'The Hierophant',
    suit: 'major',
    rank: 5,
    element: 'spirit',
    glyph: '⚜',
    color: '#A07A4B',
    keywords: { upright: ['tradition', 'teacher', 'spiritual study'], reversed: ['dogma', 'conforming', 'breaking with tradition'] },
    meaning: {
      upright: 'A teacher, lineage, or established path is offering structure. There is value in submitting to a tradition that has held many.',
      reversed: 'The rules you inherited no longer fit. You may need to leave the church to find God again.',
    },
    reflection: 'Whose teaching has been useful — and where have you outgrown it?',
    journalPrompt: 'A rule I was given as truth that is no longer true for me.',
    chakra: 'throat',
  },
  {
    id: 'major-06-lovers',
    name: 'The Lovers',
    suit: 'major',
    rank: 6,
    element: 'spirit',
    glyph: '♡',
    color: '#C77B6E',
    keywords: { upright: ['union', 'choice', 'alignment of values'], reversed: ['misalignment', 'avoidance of decision', 'fragmentation'] },
    meaning: {
      upright: 'A choice that requires you to choose with the whole self — heart, body, mind, soul. Union with another, or with a path that is truly yours.',
      reversed: 'You are split. Part of you wants one thing, part another. The fragmentation itself is the message.',
    },
    reflection: 'What would the choice look like if you trusted both your love AND your wisdom equally?',
    journalPrompt: 'A choice in front of me right now. What does each part of me want?',
    chakra: 'heart',
  },
  {
    id: 'major-07-chariot',
    name: 'The Chariot',
    suit: 'major',
    rank: 7,
    element: 'spirit',
    glyph: '⫷',
    color: '#5C7CA8',
    keywords: { upright: ['willpower', 'momentum', 'directed force'], reversed: ['scattered direction', 'aggression', 'lack of control'] },
    meaning: {
      upright: 'You have the engine and the reins. Hold opposing forces in your hands and drive forward with focused intent.',
      reversed: 'The horses are pulling in different directions. Slow down before you can speed up.',
    },
    reflection: 'What are the two competing forces inside you right now, and how do they both serve the journey?',
    journalPrompt: 'My one direction this month is…',
    chakra: 'solar',
  },
  {
    id: 'major-08-strength',
    name: 'Strength',
    suit: 'major',
    rank: 8,
    element: 'spirit',
    glyph: '∞',
    color: '#C49C5C',
    keywords: { upright: ['inner power', 'gentle courage', 'compassion'], reversed: ['self-doubt', 'force over flow', 'inner critic loud'] },
    meaning: {
      upright: 'Real strength is not domination. It is the gentle hand on the lion\'s mouth — your power, integrated with your tenderness.',
      reversed: 'Either bullying the inner animal or being ruled by it. Find the third way: relationship.',
    },
    reflection: 'Where could the soft approach succeed where the hard one has failed?',
    journalPrompt: 'The part of me I have been at war with. What does she actually need?',
    chakra: 'solar',
  },
  {
    id: 'major-09-hermit',
    name: 'The Hermit',
    suit: 'major',
    rank: 9,
    element: 'spirit',
    glyph: '☼',
    color: '#7D7AA0',
    keywords: { upright: ['solitude', 'inner light', 'soul-search'], reversed: ['isolation', 'avoidance', 'rejecting guidance'] },
    meaning: {
      upright: 'Withdraw to know what you actually think. The light you are searching for is the one you are already carrying.',
      reversed: 'Solitude has become hiding. Or — you have been busy with everyone else and have not made the time to listen to yourself.',
    },
    reflection: 'What truth would I find if I gave myself one full day of silence?',
    journalPrompt: 'Make time alone this week. Bring nothing. See what arrives.',
    chakra: 'thirdEye',
  },
  {
    id: 'major-10-wheel',
    name: 'Wheel of Fortune',
    suit: 'major',
    rank: 10,
    element: 'spirit',
    glyph: '☸',
    color: '#B8843E',
    keywords: { upright: ['cycles', 'turning point', 'destiny'], reversed: ['resistance to change', 'bad timing', 'feeling stuck'] },
    meaning: {
      upright: 'The wheel is turning in your favor. Stay supple — what is changing was always going to change.',
      reversed: 'You are fighting a current that wants to carry you. Notice where you are holding on to what is meant to pass.',
    },
    reflection: 'What is ending right now — and what does it want to become?',
    journalPrompt: 'A chapter that is closing. What I want to thank it for.',
    chakra: 'crown',
  },
  {
    id: 'major-11-justice',
    name: 'Justice',
    suit: 'major',
    rank: 11,
    element: 'spirit',
    glyph: '⚖',
    color: '#6E7B8A',
    keywords: { upright: ['truth', 'fairness', 'cause and effect'], reversed: ['imbalance', 'avoidance of accountability', 'unfairness'] },
    meaning: {
      upright: 'Truth is asking to be told. The scales are weighing — your honesty with yourself is the work.',
      reversed: 'Something is out of balance. You are either taking more than you are giving, or vice versa.',
    },
    reflection: 'Where in your life is the math not adding up — and what would even-it-out look like?',
    journalPrompt: 'The truth I have been avoiding telling — to myself, or to someone else.',
    chakra: 'throat',
  },
  {
    id: 'major-12-hanged-man',
    name: 'The Hanged Man',
    suit: 'major',
    rank: 12,
    element: 'spirit',
    glyph: '⫯',
    color: '#5C8A7C',
    keywords: { upright: ['surrender', 'new perspective', 'pause'], reversed: ['stalling', 'martyrdom', 'pointless waiting'] },
    meaning: {
      upright: 'The way through is to stop pushing. Hang. Let the world flip. The new perspective is what you came for.',
      reversed: 'The waiting has become an identity. Time to come down from the tree.',
    },
    reflection: 'What would I see if I let go of needing it to look the way I planned?',
    journalPrompt: 'A situation I am gripping. What might happen if I just… stopped trying?',
    chakra: 'thirdEye',
  },
  {
    id: 'major-13-death',
    name: 'Death',
    suit: 'major',
    rank: 13,
    element: 'spirit',
    glyph: '✝',
    color: '#3A3540',
    keywords: { upright: ['transformation', 'ending', 'rebirth'], reversed: ['resistance to change', 'prolonging the dying'] },
    meaning: {
      upright: 'A real ending. Something is dying so something else can be born. Let it go. The next form needs the space.',
      reversed: 'You are holding the corpse. The thing has already died — only your grip is delaying the next chapter.',
    },
    reflection: 'What in your life has already ended, that you are still maintaining out of habit?',
    journalPrompt: 'What I am ready to lay to rest. Name it specifically.',
    chakra: 'sacral',
  },
  {
    id: 'major-14-temperance',
    name: 'Temperance',
    suit: 'major',
    rank: 14,
    element: 'spirit',
    glyph: '♒',
    color: '#7D9DA8',
    keywords: { upright: ['balance', 'patience', 'alchemy'], reversed: ['imbalance', 'excess', 'impatience'] },
    meaning: {
      upright: 'The opposites are being blended into something new. Patience is the alchemy. Do not rush the pour.',
      reversed: 'Either all-in or all-out. The middle path is the harder one but the only one that holds.',
    },
    reflection: 'Where in your life are you swinging between extremes that could be integrated?',
    journalPrompt: 'A polarity I have been living in. What would the middle look like?',
    chakra: 'heart',
  },
  {
    id: 'major-15-devil',
    name: 'The Devil',
    suit: 'major',
    rank: 15,
    element: 'spirit',
    glyph: '☉',
    color: '#5C3A2E',
    keywords: { upright: ['bondage', 'shadow', 'attachment'], reversed: ['liberation', 'reclaiming power', 'breaking free'] },
    meaning: {
      upright: 'You are chained — but the chains are loose around your neck. The shadow you are pretending not to see is running the show.',
      reversed: 'The chains are coming off. You are seeing the pattern. The reclamation has begun.',
    },
    reflection: 'What am I pretending not to be addicted to / dependent on / afraid of?',
    journalPrompt: 'A pattern I keep returning to even though I know it costs me. What is the secret payoff?',
    chakra: 'root',
  },
  {
    id: 'major-16-tower',
    name: 'The Tower',
    suit: 'major',
    rank: 16,
    element: 'spirit',
    glyph: '⚡',
    color: '#A8413A',
    keywords: { upright: ['sudden change', 'revelation', 'collapse of false structures'], reversed: ['averted disaster', 'fear of change', 'delaying the crash'] },
    meaning: {
      upright: 'Lightning strikes the structure that was built on a lie. It is brutal. It is necessary. What survives the fire is real.',
      reversed: 'You are postponing a collapse that wants to happen. The longer you delay, the harder the fall.',
    },
    reflection: 'What in your life is built on something that is not true?',
    journalPrompt: 'A structure in my life — a job, a relationship, a self-image — that I sense is unstable. What am I waiting for?',
    chakra: 'root',
  },
  {
    id: 'major-17-star',
    name: 'The Star',
    suit: 'major',
    rank: 17,
    element: 'spirit',
    glyph: '★',
    color: '#7AA8C7',
    keywords: { upright: ['hope', 'renewal', 'guidance'], reversed: ['disconnection', 'lost faith', 'unmet hope'] },
    meaning: {
      upright: 'After the tower, the quiet sky. You are being renewed. Trust what you cannot yet see clearly.',
      reversed: 'You have lost the thread of hope. Today, just look up. Just once. That is enough to start.',
    },
    reflection: 'What dream did I let myself stop believing in — and what would it cost me to remember it today?',
    journalPrompt: 'The hope I have been ashamed to admit I still carry.',
    chakra: 'crown',
  },
  {
    id: 'major-18-moon',
    name: 'The Moon',
    suit: 'major',
    rank: 18,
    element: 'spirit',
    glyph: '☾',
    color: '#5C7AA8',
    keywords: { upright: ['illusion', 'subconscious', 'fear made larger by darkness'], reversed: ['clarity returning', 'truth revealed', 'fears releasing'] },
    meaning: {
      upright: 'What you are seeing is shadow-doubled by the dark. Walk through it. The path is still there even when you cannot see it.',
      reversed: 'The fog is lifting. What you feared was not as monstrous as the imagination made it.',
    },
    reflection: 'What am I afraid of that may not actually be there?',
    journalPrompt: 'A fear that has been driving me. Where did it actually come from?',
    chakra: 'thirdEye',
  },
  {
    id: 'major-19-sun',
    name: 'The Sun',
    suit: 'major',
    rank: 19,
    element: 'spirit',
    glyph: '☀',
    color: '#E0A040',
    keywords: { upright: ['joy', 'vitality', 'clarity', 'success'], reversed: ['delayed joy', 'dimmed light', 'taking warmth for granted'] },
    meaning: {
      upright: 'Whatever you have been working toward — it is here. Let yourself feel the good. The sun does not apologise for being bright.',
      reversed: 'The good is here but you are not letting yourself feel it. Notice what you are doing with the joy.',
    },
    reflection: 'What is going right that I have been too anxious to celebrate?',
    journalPrompt: 'Three things that are currently good in my life that I have been minimising.',
    chakra: 'solar',
  },
  {
    id: 'major-20-judgement',
    name: 'Judgement',
    suit: 'major',
    rank: 20,
    element: 'spirit',
    glyph: '⚞',
    color: '#A8847A',
    keywords: { upright: ['awakening', 'reckoning', 'rebirth call'], reversed: ['self-judgement', 'avoidance of the call', 'refusing to rise'] },
    meaning: {
      upright: 'You are being called to step into who you have become. The horn has sounded. Rise.',
      reversed: 'The call has come but you are refusing to answer. Often it is self-judgement keeping you small.',
    },
    reflection: 'What is the soul-level call I have been refusing to answer?',
    journalPrompt: 'If I rose to who I am actually becoming, what would change tomorrow?',
    chakra: 'crown',
  },
  {
    id: 'major-21-world',
    name: 'The World',
    suit: 'major',
    rank: 21,
    element: 'spirit',
    glyph: '◉',
    color: '#5C7C4B',
    keywords: { upright: ['completion', 'integration', 'wholeness'], reversed: ['unfinished business', 'circling back', 'almost there'] },
    meaning: {
      upright: 'A cycle completes. Everything you have been through is integrated into this version of you. Receive it.',
      reversed: 'You are nearly there. One more piece wants to land. Don\'t skip the final integration.',
    },
    reflection: 'What chapter is closing — and what gift has it given you?',
    journalPrompt: 'A long arc in my life that is completing right now. What I learned. What I take with me.',
    chakra: 'crown',
  },
];

// ═══════════════════════════════════════════════════════════════════
//   MINOR ARCANA — CUPS (Water / Heart / Emotion)
// ═══════════════════════════════════════════════════════════════════

const CUPS: TarotCard[] = [
  {
    id: 'cups-ace', name: 'Ace of Cups', suit: 'cups', rank: 1, element: 'water', glyph: '◌', color: '#7AA8C7', chakra: 'heart',
    keywords: { upright: ['new love', 'open heart', 'emotional renewal'], reversed: ['blocked feeling', 'spilled cup', 'love unreceived'] },
    meaning: { upright: 'The heart is opening to something new. Let the feeling in, even if you do not yet know what to do with it.', reversed: 'You are blocking what is trying to flow in. Notice the deflection in the chest.' },
    reflection: 'What does my heart want to feel right now, that I have been guarding against?', journalPrompt: 'A feeling I have been keeping out. What would it cost me to let it in?',
  },
  {
    id: 'cups-02', name: 'Two of Cups', suit: 'cups', rank: 2, element: 'water', glyph: '⧉', color: '#8AB8D0', chakra: 'heart',
    keywords: { upright: ['partnership', 'mutual recognition', 'beginning'], reversed: ['imbalance', 'unrequited', 'misalignment'] },
    meaning: { upright: 'A meeting of equals. Whether romantic, creative, or in business — both parties are giving the same currency.', reversed: 'One side is investing more than the other. Notice who is filling whose cup.' },
    reflection: 'What relationship in my life is genuinely mutual — and which one needs honest recalibration?', journalPrompt: 'A partnership where the giving is not even. What would honest look like?',
  },
  {
    id: 'cups-03', name: 'Three of Cups', suit: 'cups', rank: 3, element: 'water', glyph: '⫷', color: '#A0C8DC', chakra: 'sacral',
    keywords: { upright: ['celebration', 'sisterhood', 'friendship'], reversed: ['overindulgence', 'isolation from your people'] },
    meaning: { upright: 'The community you belong to is here. Celebrate. Be celebrated. The aloneness was a season; this is the season after.', reversed: 'Either drinking the celebration past nourishment, or hiding from your people. Both look like joy from the outside.' },
    reflection: 'Who are my real people — and have I been showing up for them?', journalPrompt: 'Three people I want to be more in life with this month.',
  },
  {
    id: 'cups-04', name: 'Four of Cups', suit: 'cups', rank: 4, element: 'water', glyph: '◇', color: '#6E96B8', chakra: 'heart',
    keywords: { upright: ['apathy', 'looking inward', 'missed offers'], reversed: ['renewed engagement', 'waking up', 'seeing the offer'] },
    meaning: { upright: 'Something is being offered to you but you are too busy inside your head to notice. The cup is right there.', reversed: 'You are coming back to the world. The dullness is lifting. Receive what is in front of you.' },
    reflection: 'What good is in front of me right now that I am dismissing because it is not what I expected?', journalPrompt: 'Something offered to me recently that I waved off. Was it actually nothing?',
  },
  {
    id: 'cups-05', name: 'Five of Cups', suit: 'cups', rank: 5, element: 'water', glyph: '◔', color: '#5C7B8A', chakra: 'heart',
    keywords: { upright: ['grief', 'loss', 'mourning'], reversed: ['acceptance', 'moving on', 'finding what remains'] },
    meaning: { upright: 'Yes — what you lost was real, and you are right to grieve it. Two cups are still standing behind you.', reversed: 'You are turning around. The grief is integrating. The cups that did not spill are coming back into view.' },
    reflection: 'What am I still mourning that has not been allowed to be mourned?', journalPrompt: 'A loss that has been silent. Write it. Honor it.',
  },
  {
    id: 'cups-06', name: 'Six of Cups', suit: 'cups', rank: 6, element: 'water', glyph: '◍', color: '#9DBFB2', chakra: 'sacral',
    keywords: { upright: ['nostalgia', 'innocence', 'reconnection with past'], reversed: ['stuck in the past', 'idealising', 'unreleased childhood'] },
    meaning: { upright: 'Something or someone from your past is back in your awareness — and it may carry a gift. Or simply a remembering.', reversed: 'You are living in a past that no longer is. The home you are pining for may need to be rebuilt rather than returned to.' },
    reflection: 'A version of me from earlier in life. What does she still want me to remember?', journalPrompt: 'Write to your younger self. What would you say now?',
  },
  {
    id: 'cups-07', name: 'Seven of Cups', suit: 'cups', rank: 7, element: 'water', glyph: '◌', color: '#7A6BA8', chakra: 'thirdEye',
    keywords: { upright: ['choices', 'illusion', 'too many options'], reversed: ['clarity', 'choosing one', 'discerning the real'] },
    meaning: { upright: 'There are many shiny things on the table. Most are illusion. The cup that holds your real life is the quiet one.', reversed: 'The fog lifts. You see which option is real and which were distractions. Choose.' },
    reflection: 'What option is glittering loudest right now — and which quiet one is actually mine?', journalPrompt: 'Of all my current options, which one would I choose if no one was watching?',
  },
  {
    id: 'cups-08', name: 'Eight of Cups', suit: 'cups', rank: 8, element: 'water', glyph: '☾', color: '#5C7AA8', chakra: 'sacral',
    keywords: { upright: ['walking away', 'soul-search', 'leaving the unfulfilling'], reversed: ['fear of leaving', 'returning to what does not serve'] },
    meaning: { upright: 'You are walking away. The cups behind you were enough for who you were. They are not enough for who you are becoming.', reversed: 'You know the answer is to go. You are still finding a reason to stay. Notice the cost of the staying.' },
    reflection: 'What am I outgrowing that I have not yet given myself permission to leave?', journalPrompt: 'A situation I know in my bones is finished. What is the first step out?',
  },
  {
    id: 'cups-09', name: 'Nine of Cups', suit: 'cups', rank: 9, element: 'water', glyph: '◉', color: '#A8C7D9', chakra: 'sacral',
    keywords: { upright: ['wish fulfilment', 'contentment', 'gratitude'], reversed: ['shallow satisfaction', 'over-indulgence', 'the wish that didn\'t satisfy'] },
    meaning: { upright: 'The wish you made is coming true. Let it land. Let yourself enjoy what you wanted, now that you have it.', reversed: 'You got what you asked for — and it didn\'t deliver what you thought. Look at the actual wish underneath the surface wish.' },
    reflection: 'What did I want — that I now have — that I have forgotten to enjoy?', journalPrompt: 'Three things I once dreamed of that are now in my life. Receive them.',
  },
  {
    id: 'cups-10', name: 'Ten of Cups', suit: 'cups', rank: 10, element: 'water', glyph: '◖', color: '#6E96B8', chakra: 'heart',
    keywords: { upright: ['emotional fulfilment', 'home', 'family', 'belonging'], reversed: ['disconnection', 'inherited family wounds', 'longing for home'] },
    meaning: { upright: 'The whole picture is here. Family, home, belonging — emotional fullness. Not perfect, but real and loving.', reversed: 'The home is fractured or distant. The work is finding what home means for the version of you here now.' },
    reflection: 'Where is the actual emotional home for me right now — and who lives there?', journalPrompt: 'My definition of home today. How is it different from the one I inherited?',
  },
  {
    id: 'cups-page', name: 'Page of Cups', suit: 'cups', rank: 'page', element: 'water', glyph: '♔', color: '#A8B8C7', chakra: 'heart',
    keywords: { upright: ['intuition stirring', 'creative spark', 'tender new feeling'], reversed: ['emotional immaturity', 'creative block', 'fantasy escape'] },
    meaning: { upright: 'A small, surprising emotion is rising — let it be small. Sometimes the message is in the tenderness, not the size.', reversed: 'You are stuck in fantasy or sulking. Come back to the body — what does the real feeling want?' },
    reflection: 'What is the small feeling I have been dismissing as not big enough to matter?', journalPrompt: 'A tender feeling that surprised me recently. What was it pointing to?',
  },
  {
    id: 'cups-knight', name: 'Knight of Cups', suit: 'cups', rank: 'knight', element: 'water', glyph: '♞', color: '#7AA8C7', chakra: 'heart',
    keywords: { upright: ['romantic gesture', 'following the heart', 'pursuit of beauty'], reversed: ['unrealistic dreams', 'moodiness', 'all-talk-no-action'] },
    meaning: { upright: 'You are being moved by feeling — to act, to reach out, to make the romantic offer or the artful proposal. Follow.', reversed: 'The heart is offering itself but the action is missing. Or the offering is more about you than them.' },
    reflection: 'What is my heart asking me to do that my head is still arguing with?', journalPrompt: 'A heartfelt action I have been holding back. What if I made it today?',
  },
  {
    id: 'cups-queen', name: 'Queen of Cups', suit: 'cups', rank: 'queen', element: 'water', glyph: '♕', color: '#8AB8D0', chakra: 'heart',
    keywords: { upright: ['emotional sovereignty', 'deep empathy', 'intuitive wisdom'], reversed: ['emotional overwhelm', 'codependence', 'losing self in others'] },
    meaning: { upright: 'You are mature in your feeling. You can hold what others bring without losing yourself. The depth is the gift.', reversed: 'You are drowning in other people\'s feelings — or in your own. Boundaries are an act of love, including to yourself.' },
    reflection: 'Where am I carrying feelings that are not actually mine to carry?', journalPrompt: 'Whose emotional weight am I holding that I can lay down today?',
  },
  {
    id: 'cups-king', name: 'King of Cups', suit: 'cups', rank: 'king', element: 'water', glyph: '♚', color: '#5C7AA8', chakra: 'heart',
    keywords: { upright: ['emotional mastery', 'calm in storm', 'compassionate leadership'], reversed: ['emotional suppression', 'manipulation', 'cold heart'] },
    meaning: { upright: 'You can sit in the centre of feeling — yours and others\' — without being moved by it. That is mastery.', reversed: 'Emotion is being controlled rather than felt. The calm is a wall, not a depth.' },
    reflection: 'Where could I be both more honest about my feelings AND more steady in them?', journalPrompt: 'A feeling I have been managing instead of feeling. Today, let it be.',
  },
];

// ═══════════════════════════════════════════════════════════════════
//   MINOR ARCANA — PENTACLES (Earth / Body / Material)
// ═══════════════════════════════════════════════════════════════════

const PENTACLES: TarotCard[] = [
  {
    id: 'pentacles-ace', name: 'Ace of Pentacles', suit: 'pentacles', rank: 1, element: 'earth', glyph: '⬢', color: '#8A9D6E', chakra: 'root',
    keywords: { upright: ['new opportunity', 'tangible beginning', 'seed of prosperity'], reversed: ['missed opportunity', 'unstable foundation', 'fear of starting'] },
    meaning: { upright: 'A material seed is planted. A job offer, a financial opening, a new physical practice. Take the seed — plant it.', reversed: 'An opportunity is here but you are stalling. Or the foundation under it is shakier than it looks.' },
    reflection: 'What real, tangible opportunity is in front of me right now?', journalPrompt: 'A seed I have been handed. What soil does it need?',
  },
  {
    id: 'pentacles-02', name: 'Two of Pentacles', suit: 'pentacles', rank: 2, element: 'earth', glyph: '◇', color: '#A0B07A', chakra: 'root',
    keywords: { upright: ['juggling', 'adaptability', 'managing multiple'], reversed: ['overwhelm', 'dropping balls', 'imbalance'] },
    meaning: { upright: 'You are holding multiple commitments and somehow making it work. Keep the rhythm — but ask if you can simplify.', reversed: 'You have taken on too much. Something has to fall away to keep what matters held.' },
    reflection: 'What am I juggling that I could put down without anything actually breaking?', journalPrompt: 'Three commitments. Which one would I drop if I could?',
  },
  {
    id: 'pentacles-03', name: 'Three of Pentacles', suit: 'pentacles', rank: 3, element: 'earth', glyph: '⫷', color: '#8E9A4B', chakra: 'throat',
    keywords: { upright: ['mastery in collaboration', 'skilled work', 'shared craft'], reversed: ['lack of teamwork', 'undermined work', 'isolation in the craft'] },
    meaning: { upright: 'You are building with others. Each person brings their craft. The work is greater than any one of you alone.', reversed: 'You are either being undermined, or you are trying to do it all alone when collaboration is the way.' },
    reflection: 'Whose skill could complete mine, that I have been too proud to ask for?', journalPrompt: 'A project I have been carrying alone. Who could I invite in?',
  },
  {
    id: 'pentacles-04', name: 'Four of Pentacles', suit: 'pentacles', rank: 4, element: 'earth', glyph: '◈', color: '#6E7A4B', chakra: 'root',
    keywords: { upright: ['holding on', 'security', 'controlled grip'], reversed: ['letting go', 'generosity', 'releasing scarcity'] },
    meaning: { upright: 'You are gripping the resources you have. That has kept you safe — but the gripping is now the limit.', reversed: 'You are loosening the grip. The breath returns. Money can move again.' },
    reflection: 'What am I gripping out of fear, that would actually grow if I let it flow?', journalPrompt: 'My grip pattern. What would happen if I opened the hand a little this week?',
  },
  {
    id: 'pentacles-05', name: 'Five of Pentacles', suit: 'pentacles', rank: 5, element: 'earth', glyph: '◐', color: '#6B5C4B', chakra: 'root',
    keywords: { upright: ['hardship', 'material loss', 'feeling left out in the cold'], reversed: ['recovery', 'help arriving', 'finding the open door'] },
    meaning: { upright: 'A real difficulty is here. The window is lit nearby. You may need to ask — help is closer than the suffering feels.', reversed: 'The hardship is lifting. Help has arrived. The door you walked past is open.' },
    reflection: 'Where could I ask for help that I have been too proud or scared to ask for?', journalPrompt: 'One specific request I will make this week. Of whom?',
  },
  {
    id: 'pentacles-06', name: 'Six of Pentacles', suit: 'pentacles', rank: 6, element: 'earth', glyph: '⚖', color: '#A88E5C', chakra: 'heart',
    keywords: { upright: ['generosity', 'giving and receiving', 'fair exchange'], reversed: ['imbalanced giving', 'strings attached', 'over-giving from depletion'] },
    meaning: { upright: 'You are in a season where giving and receiving are flowing. Both equal. Both honoured.', reversed: 'Either you are giving from depletion, or you are taking with strings attached. Notice the math.' },
    reflection: 'Where in my life is the give-receive math out of balance?', journalPrompt: 'A relationship — am I giving more, or receiving more? Is that okay?',
  },
  {
    id: 'pentacles-07', name: 'Seven of Pentacles', suit: 'pentacles', rank: 7, element: 'earth', glyph: '◍', color: '#6E8A5C', chakra: 'root',
    keywords: { upright: ['patience', 'tending what you planted', 'long-game'], reversed: ['impatience', 'wanting the harvest now', 'doubting the work'] },
    meaning: { upright: 'You are mid-grow. Look at what you have tended. It is not ready yet — but it is on its way. Stay the course.', reversed: 'You are second-guessing the work. Or wanting the harvest before the season. Slow down.' },
    reflection: 'What am I about to abandon that is actually almost ready?', journalPrompt: 'A long project. What does it look like from a five-year view?',
  },
  {
    id: 'pentacles-08', name: 'Eight of Pentacles', suit: 'pentacles', rank: 8, element: 'earth', glyph: '⫶', color: '#A88E5C', chakra: 'solar',
    keywords: { upright: ['skill-building', 'devotion to craft', 'apprenticeship'], reversed: ['perfectionism', 'going through the motions', 'losing the love of the work'] },
    meaning: { upright: 'Stay at the bench. You are learning something that will pay back for the rest of your life. Devotion is the gift.', reversed: 'You are either grinding without growing, or perfecting beyond what serves. Step back and ask: why am I doing this?' },
    reflection: 'What skill am I being asked to commit to that I have been dabbling in?', journalPrompt: 'A craft I want to deepen. The one specific thing I will practice this week.',
  },
  {
    id: 'pentacles-09', name: 'Nine of Pentacles', suit: 'pentacles', rank: 9, element: 'earth', glyph: '◉', color: '#A8843E', chakra: 'sacral',
    keywords: { upright: ['independence', 'self-earned abundance', 'enjoying what you built'], reversed: ['isolation', 'workaholism', 'forgetting to share the garden'] },
    meaning: { upright: 'Your garden is full. You built it. Walk in it. The fruit is yours to enjoy.', reversed: 'You have built it but you are not letting yourself be in it. Or — you are in it alone when you wanted company.' },
    reflection: 'What have I built that I have been too busy to enjoy?', journalPrompt: 'A real success I have not let myself feel as a success.',
  },
  {
    id: 'pentacles-10', name: 'Ten of Pentacles', suit: 'pentacles', rank: 10, element: 'earth', glyph: '⚜', color: '#8A6E3E', chakra: 'root',
    keywords: { upright: ['legacy', 'family wealth', 'generational thriving'], reversed: ['family money tension', 'lost inheritance', 'foundation cracks'] },
    meaning: { upright: 'You are building something that outlasts you. A family. A business. A wealth that flows through generations.', reversed: 'Family money is tense. Or what you built is being mismanaged. Look at the structures, not just the surface.' },
    reflection: 'What am I building that will outlast me — and is it on stable ground?', journalPrompt: 'The legacy I want to leave. Specifically. To whom.',
  },
  {
    id: 'pentacles-page', name: 'Page of Pentacles', suit: 'pentacles', rank: 'page', element: 'earth', glyph: '♔', color: '#A0B07A', chakra: 'root',
    keywords: { upright: ['new study', 'tangible curiosity', 'beginning a practice'], reversed: ['unfocused study', 'starting and not finishing', 'unrealistic plans'] },
    meaning: { upright: 'You are a beginner at something material — a craft, a discipline, a body practice. The beginning is sacred.', reversed: 'You keep starting things and not finishing. The pattern itself is the message.' },
    reflection: 'A practice I want to begin. What is the first small concrete step?', journalPrompt: 'Something I have been studying or want to. The next step under fifteen minutes.',
  },
  {
    id: 'pentacles-knight', name: 'Knight of Pentacles', suit: 'pentacles', rank: 'knight', element: 'earth', glyph: '♞', color: '#6E7A4B', chakra: 'root',
    keywords: { upright: ['steady progress', 'reliability', 'patient work'], reversed: ['rut', 'over-cautious', 'fear of risk'] },
    meaning: { upright: 'Slow and steady. The work is unglamorous. The compounding is the gift.', reversed: 'The steadiness has become a rut. Time for something to shift, even a little.' },
    reflection: 'Where is my consistency paying off, even though I cannot yet see the result?', journalPrompt: 'A small daily practice I have kept. What it has built.',
  },
  {
    id: 'pentacles-queen', name: 'Queen of Pentacles', suit: 'pentacles', rank: 'queen', element: 'earth', glyph: '♕', color: '#8A9D6E', chakra: 'sacral',
    keywords: { upright: ['nurturing abundance', 'embodied wealth', 'rooted woman'], reversed: ['self-neglect', 'martyr-mother', 'depleted giver'] },
    meaning: { upright: 'You are the steady provider. For yourself and for those you love. The garden is tended. The body is held.', reversed: 'You are tending everyone and no one is tending you. Time to receive.' },
    reflection: 'Where am I being the queen for everyone except myself?', journalPrompt: 'One way I will tend myself this week the way I tend others.',
  },
  {
    id: 'pentacles-king', name: 'King of Pentacles', suit: 'pentacles', rank: 'king', element: 'earth', glyph: '♚', color: '#6E5C3E', chakra: 'root',
    keywords: { upright: ['material mastery', 'wealth steward', 'embodied leadership'], reversed: ['greed', 'materialism over meaning', 'fear of losing'] },
    meaning: { upright: 'You have built something. You hold it with steadiness. Money serves your life — you do not serve money.', reversed: 'Wealth is becoming an end in itself. Or you are afraid of losing what you have. The grip is becoming the cage.' },
    reflection: 'Is the money serving my life — or has my life started serving the money?', journalPrompt: 'My current relationship with money. What it gives me. What it takes.',
  },
];

// ═══════════════════════════════════════════════════════════════════
//   MINOR ARCANA — SWORDS (Air / Mind / Thought)
// ═══════════════════════════════════════════════════════════════════

const SWORDS: TarotCard[] = [
  {
    id: 'swords-ace', name: 'Ace of Swords', suit: 'swords', rank: 1, element: 'air', glyph: '⚔', color: '#7B8DA8', chakra: 'throat',
    keywords: { upright: ['clarity', 'breakthrough', 'mental sword cuts true'], reversed: ['confusion', 'misuse of insight', 'truth withheld'] },
    meaning: { upright: 'A clear thought arrives. A truth that cuts through what was foggy. Take it.', reversed: 'You are using clarity to wound, or hiding from the truth you already know.' },
    reflection: 'What clarity am I refusing to let fully land?', journalPrompt: 'The clearest thought I have had this week. Have I acted on it?',
  },
  {
    id: 'swords-02', name: 'Two of Swords', suit: 'swords', rank: 2, element: 'air', glyph: '✕', color: '#5C7AA8', chakra: 'thirdEye',
    keywords: { upright: ['stalemate', 'avoidance', 'eyes-closed decision'], reversed: ['decision made', 'truth seen', 'blindfold removed'] },
    meaning: { upright: 'You are at an impasse. The blindfold is keeping you from choosing. The choice will not make itself.', reversed: 'The blindfold is lifting. The decision is forming. Trust it.' },
    reflection: 'A decision I have been refusing to make. What am I afraid of seeing?', journalPrompt: 'The choice in front of me. The reason I have not made it yet.',
  },
  {
    id: 'swords-03', name: 'Three of Swords', suit: 'swords', rank: 3, element: 'air', glyph: '♥', color: '#A8413A', chakra: 'heart',
    keywords: { upright: ['heartbreak', 'painful truth', 'grief'], reversed: ['healing', 'releasing the wound', 'truth has done its work'] },
    meaning: { upright: 'Yes, it hurts. Yes, the truth was sharp. Yes, the grief is real. Let it.', reversed: 'The pain is integrating. The lesson is becoming wisdom. You are not where you were.' },
    reflection: 'A heartbreak I have not let myself fully feel. What if I let it through today?', journalPrompt: 'Write what hurt. Write it once, all the way through, without softening.',
  },
  {
    id: 'swords-04', name: 'Four of Swords', suit: 'swords', rank: 4, element: 'air', glyph: '☱', color: '#8E9DBE', chakra: 'thirdEye',
    keywords: { upright: ['rest', 'recovery', 'sanctuary'], reversed: ['burnout', 'restlessness', 'avoiding the rest you need'] },
    meaning: { upright: 'Lay down the swords. Recover. The work will be there tomorrow.', reversed: 'You are running on empty and refusing the rest. The body will eventually take it for you.' },
    reflection: 'Where am I refusing to rest because I think I have not earned it?', journalPrompt: 'A real rest day I will give myself this week. What it will and will not include.',
  },
  {
    id: 'swords-05', name: 'Five of Swords', suit: 'swords', rank: 5, element: 'air', glyph: '⚔', color: '#7C6E7A', chakra: 'throat',
    keywords: { upright: ['pyrrhic victory', 'winning the wrong way', 'cost of being right'], reversed: ['making peace', 'releasing the need to win', 'reconciliation'] },
    meaning: { upright: 'You can be right and still lose. Notice if winning this is worth what it is costing.', reversed: 'You are putting down the sword. The fight is not yours to keep winning.' },
    reflection: 'An argument I have been winning at the cost of the relationship.', journalPrompt: 'A fight I could lay down. What would peace cost? What would it free?',
  },
  {
    id: 'swords-06', name: 'Six of Swords', suit: 'swords', rank: 6, element: 'air', glyph: '⛵', color: '#8AB8D0', chakra: 'sacral',
    keywords: { upright: ['transition', 'moving on', 'calmer waters ahead'], reversed: ['unable to leave', 'carrying the wound forward', 'delayed crossing'] },
    meaning: { upright: 'You are crossing to the other side of something. The water is choppy but the boat is moving. Trust the crossing.', reversed: 'You are still on the shore. The departure has been delayed. What is keeping you here?' },
    reflection: 'A transition I am in. Am I letting it move me, or am I dragging my feet?', journalPrompt: 'A crossing in my life right now. What I am leaving. What I am moving toward.',
  },
  {
    id: 'swords-07', name: 'Seven of Swords', suit: 'swords', rank: 7, element: 'air', glyph: '◑', color: '#7A6BA8', chakra: 'throat',
    keywords: { upright: ['deception', 'strategy', 'taking what is not yours'], reversed: ['confession', 'returning what was taken', 'cleared deception'] },
    meaning: { upright: 'Either you are being deceived, or you are deceiving someone — including yourself. Time to look directly.', reversed: 'The truth is coming out. Whether you are the one telling it or hearing it, integrity is being restored.' },
    reflection: 'Where in my life is there a small dishonesty I have been letting slide?', journalPrompt: 'A truth I have been managing. What if I just told it cleanly?',
  },
  {
    id: 'swords-08', name: 'Eight of Swords', suit: 'swords', rank: 8, element: 'air', glyph: '⊠', color: '#5C5C6E', chakra: 'thirdEye',
    keywords: { upright: ['feeling trapped', 'self-imposed prison', 'cannot see the way out'], reversed: ['freeing yourself', 'seeing the prison was open', 'mental release'] },
    meaning: { upright: 'You feel trapped. Look closer — the ropes are loose. The eyes are blindfolded. The way out is not blocked.', reversed: 'You see it now. The cage was never locked. You walk out.' },
    reflection: 'Where am I treating an open door as if it were locked?', journalPrompt: 'A "trap" I keep thinking about. What if I just left? Would anyone stop me?',
  },
  {
    id: 'swords-09', name: 'Nine of Swords', suit: 'swords', rank: 9, element: 'air', glyph: '☾', color: '#3A3540', chakra: 'thirdEye',
    keywords: { upright: ['anxiety', 'midnight worry', 'mind-loop'], reversed: ['anxiety releasing', 'returning to sleep', 'fear losing its grip'] },
    meaning: { upright: 'The 3am mind. The catastrophe loop. Notice — most of these thoughts have been on the same loop for years.', reversed: 'The anxiety is loosening. The body is finally able to sleep. The fears are smaller than they were.' },
    reflection: 'A thought-loop that wakes me at night. What if it is not actually telling the truth?', journalPrompt: 'A worry that has been on repeat. Write it down. Look at it in daylight.',
  },
  {
    id: 'swords-10', name: 'Ten of Swords', suit: 'swords', rank: 10, element: 'air', glyph: '✛', color: '#A8413A', chakra: 'root',
    keywords: { upright: ['rock-bottom', 'painful ending', 'the wound that ends a chapter'], reversed: ['recovery beginning', 'finally past the worst', 'dawn after the night'] },
    meaning: { upright: 'It feels like the end. In a sense, it is — the end of a chapter that needed to end. From here, only up.', reversed: 'You are past the worst of it. The dawn is happening. You will be tender for a while. That is okay.' },
    reflection: 'What rock-bottom in my life turned out to be the beginning of something true?', journalPrompt: 'A moment I thought was the end. Looking back — what was it actually the beginning of?',
  },
  {
    id: 'swords-page', name: 'Page of Swords', suit: 'swords', rank: 'page', element: 'air', glyph: '♔', color: '#A8B8C7', chakra: 'throat',
    keywords: { upright: ['curiosity', 'asking questions', 'sharp new awareness'], reversed: ['gossip', 'cutting words', 'half-information used as weapon'] },
    meaning: { upright: 'A new mental sharpness. You are noticing what you did not notice. Ask the questions. Stay curious.', reversed: 'You are wielding partial truth as a weapon. Or being wounded by someone else doing the same.' },
    reflection: 'A question I have been afraid to ask out loud.', journalPrompt: 'Three questions I would ask if I knew I could ask anything. Write them.',
  },
  {
    id: 'swords-knight', name: 'Knight of Swords', suit: 'swords', rank: 'knight', element: 'air', glyph: '♞', color: '#5C7AA8', chakra: 'throat',
    keywords: { upright: ['decisive action', 'mental momentum', 'cutting through'], reversed: ['impulsive', 'reckless decisions', 'speaking before thinking'] },
    meaning: { upright: 'Move. With clarity. With speed. The thinking has been done — the action is overdue.', reversed: 'You are charging without aim. Slow down enough to know what you are actually trying to hit.' },
    reflection: 'A decision I have been overthinking. Time to move?', journalPrompt: 'A clear action I keep delaying. The one specific thing. Do it today.',
  },
  {
    id: 'swords-queen', name: 'Queen of Swords', suit: 'swords', rank: 'queen', element: 'air', glyph: '♕', color: '#7B8DA8', chakra: 'throat',
    keywords: { upright: ['clear-eyed truth', 'honest counsel', 'discernment'], reversed: ['cold judgement', 'bitterness', 'cutting off feeling'] },
    meaning: { upright: 'You see clearly and you speak clearly. Your discernment has been hard-earned and it serves you well.', reversed: 'The clarity has crystalised into bitterness. The sword has cut off the heart instead of just the bullshit.' },
    reflection: 'Where could my honesty be more useful with more warmth?', journalPrompt: 'A truth I have been holding sharply. How could I say it kindly without softening it?',
  },
  {
    id: 'swords-king', name: 'King of Swords', suit: 'swords', rank: 'king', element: 'air', glyph: '♚', color: '#5C5C6E', chakra: 'thirdEye',
    keywords: { upright: ['intellectual mastery', 'sound judgement', 'principled leadership'], reversed: ['authoritarian', 'cold logic', 'over-reliance on intellect'] },
    meaning: { upright: 'You think clearly. You judge fairly. You lead with the head and the heart in conversation, not in opposition.', reversed: 'The intellect is running unchecked. The head has cut off the body. Reconnect.' },
    reflection: 'Where has my thinking outpaced my feeling — to my own detriment?', journalPrompt: 'A decision I have over-analyzed. What does the body know about it that the mind has been overriding?',
  },
];

// ═══════════════════════════════════════════════════════════════════
//   MINOR ARCANA — WANDS (Fire / Will / Spirit)
// ═══════════════════════════════════════════════════════════════════

const WANDS: TarotCard[] = [
  {
    id: 'wands-ace', name: 'Ace of Wands', suit: 'wands', rank: 1, element: 'fire', glyph: '✦', color: '#C77B3E', chakra: 'sacral',
    keywords: { upright: ['inspiration', 'creative spark', 'new fire'], reversed: ['delayed inspiration', 'fire smothered', 'lost spark'] },
    meaning: { upright: 'A creative or passionate spark has caught. Tend it — small fires need air and dry kindling.', reversed: 'The spark is here but you are smothering it. Or you are waiting for permission to feel passionate.' },
    reflection: 'What creative or passionate spark have I been dismissing as "not the right time"?', journalPrompt: 'The thing I would do if I trusted my own fire.',
  },
  {
    id: 'wands-02', name: 'Two of Wands', suit: 'wands', rank: 2, element: 'fire', glyph: '◐', color: '#A04B3C', chakra: 'solar',
    keywords: { upright: ['vision', 'planning', 'standing at the edge'], reversed: ['playing it safe', 'fear of expansion', 'shrinking the vision'] },
    meaning: { upright: 'You are at the edge of your current world, looking at the next one. Plan the crossing.', reversed: 'The vision is there but you are talking yourself out of it. The smaller version feels safer. It isn\'t.' },
    reflection: 'What expanded vision have I shrunk down to feel manageable?', journalPrompt: 'My biggest current vision — written full-size, undiluted.',
  },
  {
    id: 'wands-03', name: 'Three of Wands', suit: 'wands', rank: 3, element: 'fire', glyph: '⛵', color: '#B8843E', chakra: 'solar',
    keywords: { upright: ['expansion', 'long-view', 'ships coming in'], reversed: ['delayed return', 'foreseeing the storm', 'expansion stalled'] },
    meaning: { upright: 'Your work is moving out into the world. What you have invested is on its way back. Trust the lag.', reversed: 'The return is slower than expected. Look at the foundation — what needs strengthening before the next push?' },
    reflection: 'What have I sent out that I am still waiting to come back?', journalPrompt: 'A long-game I am playing. The faith I need to keep.',
  },
  {
    id: 'wands-04', name: 'Four of Wands', suit: 'wands', rank: 4, element: 'fire', glyph: '⛁', color: '#D49C3E', chakra: 'heart',
    keywords: { upright: ['celebration', 'homecoming', 'milestone'], reversed: ['postponed celebration', 'home tension', 'unmarked achievement'] },
    meaning: { upright: 'Something is worth celebrating. Mark it. Gather your people. The milestone earns the pause.', reversed: 'You hit the milestone and did not let yourself feel it. Or the celebration was hijacked by tension.' },
    reflection: 'A milestone I passed without celebrating. Can I celebrate it late?', journalPrompt: 'A win I have not honored. Honor it now, on the page.',
  },
  {
    id: 'wands-05', name: 'Five of Wands', suit: 'wands', rank: 5, element: 'fire', glyph: '⛬', color: '#A0613E', chakra: 'solar',
    keywords: { upright: ['conflict', 'competition', 'creative friction'], reversed: ['conflict resolution', 'finding alignment', 'channeling friction productively'] },
    meaning: { upright: 'Multiple energies are competing for the same space. The friction is creative if you stay engaged, exhausting if you don\'t.', reversed: 'The conflict is finding its shape. People are starting to listen. The energy is converging.' },
    reflection: 'A conflict in my life. What is it actually about, underneath the surface?', journalPrompt: 'A disagreement worth having that I have been avoiding.',
  },
  {
    id: 'wands-06', name: 'Six of Wands', suit: 'wands', rank: 6, element: 'fire', glyph: '★', color: '#D4A04B', chakra: 'solar',
    keywords: { upright: ['victory', 'public recognition', 'success acknowledged'], reversed: ['undeserved praise', 'imposter feeling', 'private win, no recognition'] },
    meaning: { upright: 'The recognition is real. Receive it. The work earned this. Take the parade.', reversed: 'Either the recognition feels hollow, or it has not come and you are wondering what for. Look at who you are doing the work for.' },
    reflection: 'A success that has been seen. Have I let it land?', journalPrompt: 'Something I did that was recognized. What it means to me to be seen for it.',
  },
  {
    id: 'wands-07', name: 'Seven of Wands', suit: 'wands', rank: 7, element: 'fire', glyph: '⚞', color: '#A8413A', chakra: 'solar',
    keywords: { upright: ['standing your ground', 'defending position', 'principled defiance'], reversed: ['caving in', 'losing faith in your ground', 'fighting losing battle'] },
    meaning: { upright: 'You are defending something that matters. Stand. Even if it is hard. You are not as outnumbered as it feels.', reversed: 'You are about to abandon a position that is actually right. Or — you are defending something that is not worth the cost.' },
    reflection: 'Where am I about to back down on something I am actually right about?', journalPrompt: 'A stance I am taking. Why I will not back down.',
  },
  {
    id: 'wands-08', name: 'Eight of Wands', suit: 'wands', rank: 8, element: 'fire', glyph: '↯', color: '#D49C3E', chakra: 'solar',
    keywords: { upright: ['rapid movement', 'swift action', 'arrows in flight'], reversed: ['delays', 'frustration', 'pace too fast to integrate'] },
    meaning: { upright: 'Things are moving fast. News, opportunities, momentum. Catch the wave — the timing is now.', reversed: 'The pace has stalled, or it is too fast and you cannot land. Either way, breathe.' },
    reflection: 'What is moving quickly in my life right now that I should be moving with, not against?', journalPrompt: 'Three things in motion. Which one is mine to lean into?',
  },
  {
    id: 'wands-09', name: 'Nine of Wands', suit: 'wands', rank: 9, element: 'fire', glyph: '⛔', color: '#7C5A4B', chakra: 'root',
    keywords: { upright: ['resilience', 'last stand', 'the final push'], reversed: ['burnout', 'paranoid defense', 'fighting battles long over'] },
    meaning: { upright: 'You are tired. You are also nearly there. One more round. You have done harder.', reversed: 'You are defending against threats that no longer exist. The body is still in battle mode. Stand down.' },
    reflection: 'What battle is finished that my body has not yet been told is finished?', journalPrompt: 'Where I am still bracing. What I am bracing against. Whether it still applies.',
  },
  {
    id: 'wands-10', name: 'Ten of Wands', suit: 'wands', rank: 10, element: 'fire', glyph: '☷', color: '#6E4B3E', chakra: 'root',
    keywords: { upright: ['burden', 'overload', 'taking on too much'], reversed: ['unloading', 'delegating', 'putting it down'] },
    meaning: { upright: 'You are carrying more than is yours to carry. Look at the load. Some of it belongs to other people.', reversed: 'You are putting things down. The load is lightening. The body is releasing.' },
    reflection: 'What am I carrying that is not actually mine?', journalPrompt: 'A burden. Whose was it originally? Can I hand it back?',
  },
  {
    id: 'wands-page', name: 'Page of Wands', suit: 'wands', rank: 'page', element: 'fire', glyph: '♔', color: '#D49C3E', chakra: 'sacral',
    keywords: { upright: ['curiosity', 'beginning a passion', 'wild idea'], reversed: ['flightiness', 'starting and dropping', 'unfocused enthusiasm'] },
    meaning: { upright: 'A new passion is calling. Even if it makes no sense yet. Even if it is "not your thing." Try it.', reversed: 'You are jumping between things without committing to any. The pattern is the message.' },
    reflection: 'A wild idea I have had recently that I dismissed. What if I tried it?', journalPrompt: 'The most "unlike-me" idea I have had this month. Maybe it is more me than I thought.',
  },
  {
    id: 'wands-knight', name: 'Knight of Wands', suit: 'wands', rank: 'knight', element: 'fire', glyph: '♞', color: '#A04B3C', chakra: 'sacral',
    keywords: { upright: ['bold action', 'passionate pursuit', 'go-time'], reversed: ['recklessness', 'impulsive moves', 'all gas no plan'] },
    meaning: { upright: 'Take the bold action. The right time is now. The fire is hot and the path is open.', reversed: 'The fire is running you, not the other way around. Slow down enough to direct it.' },
    reflection: 'A bold move I have been hesitating on. What if I just made it?', journalPrompt: 'The action that scares me. The one that would change things if I took it this week.',
  },
  {
    id: 'wands-queen', name: 'Queen of Wands', suit: 'wands', rank: 'queen', element: 'fire', glyph: '♕', color: '#C77B3E', chakra: 'solar',
    keywords: { upright: ['warm magnetism', 'creative power', 'confident woman'], reversed: ['burnout', 'jealousy', 'fire turning inward'] },
    meaning: { upright: 'You are radiant. People are drawn to you. The work flows. Tend the fire so it stays steady.', reversed: 'The fire is consuming you instead of warming you. Or it is being turned on yourself as criticism.' },
    reflection: 'Where am I letting my fire be a beacon — and where is it burning me?', journalPrompt: 'How I am tending my fire this week. What feeds it. What drains it.',
  },
  {
    id: 'wands-king', name: 'King of Wands', suit: 'wands', rank: 'king', element: 'fire', glyph: '♚', color: '#A04B3C', chakra: 'solar',
    keywords: { upright: ['visionary leader', 'big bold vision', 'inspired authority'], reversed: ['arrogance', 'overreach', 'ego-driven vision'] },
    meaning: { upright: 'You hold a vision and the will to manifest it. People want to follow. You are at the head of the table.', reversed: 'The vision has become about you. The ego is louder than the mission. Recalibrate.' },
    reflection: 'A vision I hold. Is it big enough — and is it still about service, not status?', journalPrompt: 'The vision I lead with. The next person I want to bring into it.',
  },
];

// ═══════════════════════════════════════════════════════════════════
//   THE FULL DECK — 78 cards
// ═══════════════════════════════════════════════════════════════════

export const TAROT_DECK: TarotCard[] = [
  ...MAJOR_ARCANA,
  ...CUPS,
  ...PENTACLES,
  ...SWORDS,
  ...WANDS,
];

export function getCardById(id: string): TarotCard | undefined {
  return TAROT_DECK.find((c) => c.id === id);
}

export function getCardByIndex(index: number): TarotCard | undefined {
  return TAROT_DECK[index];
}

/** Suit metadata for UI rendering. */
export const SUIT_META: Record<TarotSuit, { label: string; element: TarotElement; color: string; description: string }> = {
  major: { label: 'Major Arcana', element: 'spirit', color: '#D4AF6E', description: 'The soul\'s journey — archetypal life lessons.' },
  cups: { label: 'Cups', element: 'water', color: '#7AA8C7', description: 'Water · Heart · Emotion and connection.' },
  pentacles: { label: 'Pentacles', element: 'earth', color: '#8A9D6E', description: 'Earth · Body · Money, work, and the material.' },
  swords: { label: 'Swords', element: 'air', color: '#7B8DA8', description: 'Air · Mind · Thought, truth, and conflict.' },
  wands: { label: 'Wands', element: 'fire', color: '#C77B3E', description: 'Fire · Will · Passion, action, and creative drive.' },
};
