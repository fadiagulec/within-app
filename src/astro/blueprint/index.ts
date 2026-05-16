/**
 * Energy Blueprint — public API.
 *
 * computeBlueprint(input) takes the same inputs as the natal chart, computes
 * BOTH the conscious side (birth moment) AND the unconscious side (88 days
 * before birth — the "Design"), maps each planet position to a gate, then:
 *
 *   - identifies activated gates
 *   - identifies completed channels (both gate ends activated)
 *   - identifies defined centres (any completed channel touching them)
 *   - derives Type (5 possible)
 *   - derives Authority (highest-priority defined centre rule)
 *   - derives Profile (Sun-line conscious + Sun-line unconscious)
 *
 * "Design" date is computed by subtracting 88 days from birth — this is the
 * standard HD approximation. Pure HD purists use 88° of solar arc, which
 * diverges by at most ~6 hours from the day-based approximation. For the
 * line/gate granularity we display, both are equivalent.
 */

import { computeChart, type ChartInput, type PlanetPosition } from '../chart';
import { degreesToGate, type CentreId, type GateActivation } from './gates';
import { CHANNELS } from './channels';

export type EnergyType =
  | 'Manifestor'
  | 'Generator'
  | 'Manifesting Generator'
  | 'Projector'
  | 'Reflector';

export type Authority =
  | 'Emotional (Solar Plexus)'
  | 'Sacral'
  | 'Splenic'
  | 'Ego (Heart)'
  | 'Self-Projected (G Centre)'
  | 'Mental (Outer)'
  | 'Lunar (Reflector)';

export interface EnergyBlueprint {
  type: EnergyType;
  strategy: string;
  authority: Authority;
  /** "x.y" — e.g. "1/3", "5/1" */
  profile: string;
  /** Lookup map: which of the 9 centres are defined. */
  definedCentres: Record<CentreId, boolean>;
  /** Which centres have at least one motor (root/sacral/sp/heart) connected to throat. */
  motorToThroat: boolean;
  /** All activated gates with line + side. */
  activations: Array<GateActivation & { side: 'personality' | 'design'; planet: string }>;
}

const MOTOR_CENTRES: CentreId[] = ['root', 'sacral', 'solar-plexus', 'heart'];

const STRATEGY_BY_TYPE: Record<EnergyType, string> = {
  Manifestor: 'Inform before you act.',
  Generator: 'Wait to respond.',
  'Manifesting Generator': 'Wait to respond, then inform.',
  Projector: 'Wait for the invitation.',
  Reflector: 'Wait a lunar cycle (~28 days) before big decisions.',
};

function activationsFromChart(
  chart: ReturnType<typeof computeChart>,
  side: 'personality' | 'design'
): Array<GateActivation & { side: 'personality' | 'design'; planet: string }> {
  // We use Sun, Moon, all planets, plus a "South Node" (180° from sun for v1
  // — full HD uses lunar nodes but the simplification still surfaces real
  // gate activations). Adding lunar nodes is a v2 enhancement.
  const planets: PlanetPosition[] = [...chart.planets];
  return planets.map((p) => {
    const g = degreesToGate(p.absoluteDegrees);
    return {
      ...g,
      side,
      planet: p.label,
    };
  });
}

/** Subtract 88 days from a YYYY-MM-DD date string. */
function shift88DaysBack(dateStr: string): string {
  const d = new Date(`${dateStr}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() - 88);
  return d.toISOString().slice(0, 10);
}

export function computeBlueprint(input: ChartInput): EnergyBlueprint {
  // ─── Personality (birth moment) ─────────────────────────────────
  const personality = computeChart(input);
  const pActivations = activationsFromChart(personality, 'personality');

  // ─── Design (~88 days before birth) ─────────────────────────────
  const designInput: ChartInput = {
    ...input,
    date: shift88DaysBack(input.date),
  };
  const design = computeChart(designInput);
  const dActivations = activationsFromChart(design, 'design');

  const allActivations = [...pActivations, ...dActivations];
  const activatedGates = new Set<number>(allActivations.map((a) => a.gate));

  // ─── Defined centres ────────────────────────────────────────────
  const definedCentres: Record<CentreId, boolean> = {
    head: false,
    ajna: false,
    throat: false,
    g: false,
    heart: false,
    'solar-plexus': false,
    sacral: false,
    spleen: false,
    root: false,
  };
  for (const ch of CHANNELS) {
    if (activatedGates.has(ch.gates[0]) && activatedGates.has(ch.gates[1])) {
      definedCentres[ch.centres[0]] = true;
      definedCentres[ch.centres[1]] = true;
    }
  }

  // ─── Motor connection to throat? ────────────────────────────────
  // True if there is a path from any motor centre to throat through defined
  // channels. v1 simplification: check direct motor->throat channels only.
  let motorToThroat = false;
  for (const ch of CHANNELS) {
    const a = ch.centres[0];
    const b = ch.centres[1];
    const aIsMotor = MOTOR_CENTRES.includes(a);
    const bIsMotor = MOTOR_CENTRES.includes(b);
    const aIsThroat = a === 'throat';
    const bIsThroat = b === 'throat';
    if (
      activatedGates.has(ch.gates[0]) &&
      activatedGates.has(ch.gates[1]) &&
      ((aIsMotor && bIsThroat) || (bIsMotor && aIsThroat))
    ) {
      motorToThroat = true;
      break;
    }
  }

  // ─── Type ──────────────────────────────────────────────────────
  const definedCount = Object.values(definedCentres).filter(Boolean).length;
  let type: EnergyType;
  if (definedCount === 0) {
    type = 'Reflector';
  } else if (definedCentres.sacral) {
    type = motorToThroat ? 'Manifesting Generator' : 'Generator';
  } else {
    type = motorToThroat ? 'Manifestor' : 'Projector';
  }

  // ─── Authority (priority order) ────────────────────────────────
  let authority: Authority;
  if (definedCentres['solar-plexus']) {
    authority = 'Emotional (Solar Plexus)';
  } else if (definedCentres.sacral) {
    authority = 'Sacral';
  } else if (definedCentres.spleen) {
    authority = 'Splenic';
  } else if (
    definedCentres.heart &&
    (definedCentres.throat || definedCentres.g)
  ) {
    authority = 'Ego (Heart)';
  } else if (definedCentres.g && definedCentres.throat) {
    authority = 'Self-Projected (G Centre)';
  } else if (type === 'Reflector') {
    authority = 'Lunar (Reflector)';
  } else {
    authority = 'Mental (Outer)';
  }

  // ─── Profile (conscious-line . unconscious-line of Sun) ─────────
  const pSun = pActivations.find((a) => a.planet.toLowerCase() === 'sun');
  const dSun = dActivations.find((a) => a.planet.toLowerCase() === 'sun');
  const profile = `${pSun?.line ?? '?'}/${dSun?.line ?? '?'}`;

  return {
    type,
    strategy: STRATEGY_BY_TYPE[type],
    authority,
    profile,
    definedCentres,
    motorToThroat,
    activations: allActivations,
  };
}
