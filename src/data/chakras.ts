import { Chakra, Session } from '@/types';
import { chakraColors, chakraGlow } from '@/theme/tokens';

function mkSessions(key: Chakra['key'], prefix: string, level: number): Session[] {
  return [
    {
      id: `chakra-${key}-awaken`,
      chakraKey: key,
      kind: 'awaken',
      category: 'chakra',
      title: `${prefix} · Awaken & Awareness`,
      subtitle: 'The ground beneath you',
      durationMin: 15,
      theme: 'Meet the part of you that has been waiting.',
      levelRequired: level,
      filePath: `content/chakras/0${1}-${key}-01-awaken.txt`,
    },
    {
      id: `chakra-${key}-release`,
      chakraKey: key,
      kind: 'release',
      category: 'chakra',
      title: `${prefix} · Release & Integration`,
      subtitle: 'Let the weight leave',
      durationMin: 18,
      theme: 'Move what has been held for too long.',
      levelRequired: level,
      filePath: `content/chakras/0${1}-${key}-02-release.txt`,
    },
    {
      id: `chakra-${key}-activate`,
      chakraKey: key,
      kind: 'activate',
      category: 'chakra',
      title: `${prefix} · Activate & Embody`,
      subtitle: 'Bring it into the body',
      durationMin: 16,
      theme: 'Turn insight into lived reality.',
      levelRequired: level,
      filePath: `content/chakras/0${1}-${key}-03-activate.txt`,
    },
  ];
}

export const chakras: Chakra[] = [
  {
    key: 'root',
    index: 1,
    name: 'Root',
    sanskrit: 'Muladhara',
    mantra: 'LAM',
    color: chakraColors.root,
    glow: chakraGlow.root,
    theme: 'Belonging to your own body.',
    element: 'Earth',
    bodyLocation: 'Base of spine',
    shadow: 'Fear, rootlessness, survival mode',
    sessions: mkSessions('root', 'Root Chakra', 1),
  },
  {
    key: 'sacral',
    index: 2,
    name: 'Sacral',
    sanskrit: 'Svadhisthana',
    mantra: 'VAM',
    color: chakraColors.sacral,
    glow: chakraGlow.sacral,
    theme: 'The right to feel, to want, to create.',
    element: 'Water',
    bodyLocation: 'Below the navel',
    shadow: 'Numbness, guilt, shame around desire',
    sessions: mkSessions('sacral', 'Sacral Chakra', 2),
  },
  {
    key: 'solar',
    index: 3,
    name: 'Solar Plexus',
    sanskrit: 'Manipura',
    mantra: 'RAM',
    color: chakraColors.solar,
    glow: chakraGlow.solar,
    theme: 'Your fire. Your yes. Your no.',
    element: 'Fire',
    bodyLocation: 'Above the navel',
    shadow: 'Powerlessness, people-pleasing, collapse',
    sessions: mkSessions('solar', 'Solar Plexus', 3),
  },
  {
    key: 'heart',
    index: 4,
    name: 'Heart',
    sanskrit: 'Anahata',
    mantra: 'YAM',
    color: chakraColors.heart,
    glow: chakraGlow.heart,
    theme: 'The courage to stay soft.',
    element: 'Air',
    bodyLocation: 'Center of chest',
    shadow: 'Armor, resentment, closure',
    sessions: mkSessions('heart', 'Heart Chakra', 4),
  },
  {
    key: 'throat',
    index: 5,
    name: 'Throat',
    sanskrit: 'Vishuddha',
    mantra: 'HAM',
    color: chakraColors.throat,
    glow: chakraGlow.throat,
    theme: 'Your real voice, without apology.',
    element: 'Ether',
    bodyLocation: 'Throat',
    shadow: 'Silence, performance, self-betrayal',
    sessions: mkSessions('throat', 'Throat Chakra', 5),
  },
  {
    key: 'thirdEye',
    index: 6,
    name: 'Third Eye',
    sanskrit: 'Ajna',
    mantra: 'OM',
    color: chakraColors.thirdEye,
    glow: chakraGlow.thirdEye,
    theme: 'See clearly. Trust what you see.',
    element: 'Light',
    bodyLocation: 'Between the brows',
    shadow: 'Confusion, doubt, disembodied overthinking',
    sessions: mkSessions('thirdEye', 'Third Eye', 6),
  },
  {
    key: 'crown',
    index: 7,
    name: 'Crown',
    sanskrit: 'Sahasrara',
    mantra: 'Silence',
    color: chakraColors.crown,
    glow: chakraGlow.crown,
    theme: 'Remember what you already are.',
    element: 'Consciousness',
    bodyLocation: 'Top of head',
    shadow: 'Disconnection, despair, spiritual bypass',
    sessions: mkSessions('crown', 'Crown Chakra', 7),
  },
];

export function getChakra(key: Chakra['key'] | string): Chakra {
  // Accept both ChakraId form ('solar-plexus', 'third-eye')
  // and ChakraKey form ('solar', 'thirdEye'). Normalize.
  const lookup = (() => {
    const s = String(key);
    if (s === 'solar-plexus') return 'solar';
    if (s === 'third-eye' || s === 'third_eye') return 'thirdEye';
    return s;
  })();
  const found = chakras.find((c) => c.key === lookup);
  if (!found) throw new Error(`Chakra not found: ${key}`);
  return found;
}

export function findSessionById(id: string): Session | undefined {
  for (const c of chakras) {
    const s = c.sessions.find((x) => x.id === id);
    if (s) return s;
  }
  return undefined;
}
