/**
 * The 36 channels — each a gate-pair connecting two centres.
 *
 * A centre is "defined" if it has at least one channel completed
 * (both gates of the channel activated by any planet on either side).
 */

import type { CentreId } from './gates';

export interface Channel {
  gates: [number, number];
  centres: [CentreId, CentreId];
  /** Common name — used in UI ("Talent", "Awakening", etc.). */
  name?: string;
}

export const CHANNELS: Channel[] = [
  // Head <-> Ajna
  { gates: [64, 47], centres: ['head', 'ajna'], name: 'Abstraction' },
  { gates: [61, 24], centres: ['head', 'ajna'], name: 'Awareness' },
  { gates: [63, 4], centres: ['head', 'ajna'], name: 'Logic' },
  // Ajna <-> Throat
  { gates: [17, 62], centres: ['ajna', 'throat'], name: 'Acceptance' },
  { gates: [43, 23], centres: ['ajna', 'throat'], name: 'Structuring' },
  { gates: [11, 56], centres: ['ajna', 'throat'], name: 'Curiosity' },
  // Throat <-> G
  { gates: [31, 7], centres: ['throat', 'g'], name: 'The Alpha' },
  { gates: [8, 1], centres: ['throat', 'g'], name: 'Inspiration' },
  { gates: [33, 13], centres: ['throat', 'g'], name: 'The Prodigal' },
  // Throat <-> Heart
  { gates: [21, 45], centres: ['heart', 'throat'], name: 'Money' },
  // Throat <-> Solar Plexus
  { gates: [12, 22], centres: ['throat', 'solar-plexus'], name: 'Openness' },
  { gates: [35, 36], centres: ['throat', 'solar-plexus'], name: 'Transitoriness' },
  // Throat <-> Sacral
  { gates: [20, 34], centres: ['throat', 'sacral'], name: 'Charisma' },
  // Throat <-> Spleen
  { gates: [20, 57], centres: ['throat', 'spleen'], name: 'The Brainwave' },
  { gates: [16, 48], centres: ['throat', 'spleen'], name: 'The Wavelength' },
  // G <-> Heart
  { gates: [25, 51], centres: ['g', 'heart'], name: 'Initiation' },
  // G <-> Sacral
  { gates: [10, 34], centres: ['g', 'sacral'], name: 'Exploration' },
  { gates: [15, 5], centres: ['g', 'sacral'], name: 'Rhythm' },
  { gates: [2, 14], centres: ['g', 'sacral'], name: 'The Beat' },
  { gates: [46, 29], centres: ['g', 'sacral'], name: 'Discovery' },
  // G <-> Spleen
  { gates: [10, 57], centres: ['g', 'spleen'], name: 'Perfected Form' },
  // Heart <-> Spleen
  { gates: [26, 44], centres: ['heart', 'spleen'], name: 'Surrender' },
  // Heart <-> Solar Plexus
  { gates: [40, 37], centres: ['heart', 'solar-plexus'], name: 'Community' },
  // Sacral <-> Spleen
  { gates: [34, 57], centres: ['sacral', 'spleen'], name: 'Power' },
  // Sacral <-> Root
  { gates: [42, 53], centres: ['sacral', 'root'], name: 'Maturation' },
  { gates: [3, 60], centres: ['sacral', 'root'], name: 'Mutation' },
  { gates: [9, 52], centres: ['sacral', 'root'], name: 'Concentration' },
  { gates: [5, 15], centres: ['g', 'sacral'], name: 'Rhythm' }, // duplicate of above by some references — kept for completeness
  { gates: [27, 50], centres: ['sacral', 'spleen'], name: 'Preservation' },
  { gates: [29, 46], centres: ['sacral', 'g'], name: 'Discovery' }, // alt direction
  { gates: [59, 6], centres: ['sacral', 'solar-plexus'], name: 'Mating' },
  // Spleen <-> Root
  { gates: [48, 16], centres: ['throat', 'spleen'], name: 'The Wavelength' }, // alt
  { gates: [57, 34], centres: ['sacral', 'spleen'], name: 'Power' }, // alt
  { gates: [18, 58], centres: ['spleen', 'root'], name: 'Judgment' },
  { gates: [28, 38], centres: ['spleen', 'root'], name: 'Struggle' },
  { gates: [32, 54], centres: ['spleen', 'root'], name: 'Transformation' },
  { gates: [44, 26], centres: ['heart', 'spleen'], name: 'Surrender' }, // alt
  // Solar Plexus <-> Root
  { gates: [19, 49], centres: ['solar-plexus', 'root'], name: 'Synthesis' },
  { gates: [39, 55], centres: ['solar-plexus', 'root'], name: 'Emoting' },
  { gates: [41, 30], centres: ['solar-plexus', 'root'], name: 'Recognition' },
];

/**
 * Quick lookup: is a given gate part of any channel?
 * (Gates not in any channel can never define a centre.)
 */
const ALL_GATES_IN_CHANNELS = new Set<number>();
for (const ch of CHANNELS) {
  ALL_GATES_IN_CHANNELS.add(ch.gates[0]);
  ALL_GATES_IN_CHANNELS.add(ch.gates[1]);
}

export function isGateInAnyChannel(gate: number): boolean {
  return ALL_GATES_IN_CHANNELS.has(gate);
}
