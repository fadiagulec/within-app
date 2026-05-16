/**
 * Energy Blueprint — 64-gate wheel & helpers.
 *
 * Public-domain math: 64 gates, 5.625° each, in the standard "Mandala"
 * order around the wheel. Each gate maps to one of 9 centres.
 *
 * Reference: published Jovian Archive gate-wheel ordering. The wheel is
 * the well-known I-Ching / HD overlay onto the zodiac — math is public,
 * the trademarked terms ("Human Design", "BodyGraph") are not used in
 * user-facing copy. We call it "Energy Blueprint" everywhere visible.
 */

export type CentreId =
  | 'head'
  | 'ajna'
  | 'throat'
  | 'g'
  | 'heart'
  | 'solar-plexus'
  | 'sacral'
  | 'spleen'
  | 'root';

/**
 * Gate order around the wheel, starting at gate 41 (2°15' Aquarius = 302.25°).
 * Each subsequent gate is +5.625°. After gate 60 (last in the cycle below)
 * we wrap back to gate 41.
 */
export const GATE_ORDER_FROM_AQUARIUS_2_15: number[] = [
  41, 19, 13, 49, 30, 55, 37, 63, 22, 36, 25, 17, 21, 51, 42, 3,
  27, 24, 2, 23, 8, 20, 16, 35, 45, 12, 15, 52, 39, 53, 62, 56,
  31, 33, 7, 4, 29, 59, 40, 64, 47, 6, 46, 18, 48, 57, 32, 50,
  28, 44, 1, 43, 14, 34, 9, 5, 26, 11, 10, 58, 38, 54, 61, 60,
];

/** Where the gate sequence starts in absolute zodiac degrees (0° = 0° Aries). */
export const WHEEL_START_DEGREES = 302.25; // 2°15' Aquarius
export const GATE_WIDTH_DEGREES = 5.625; // 360 / 64

/** Each gate's home centre. */
export const GATE_TO_CENTRE: Record<number, CentreId> = {
  // Head (3 gates)
  61: 'head', 63: 'head', 64: 'head',
  // Ajna (6 gates)
  47: 'ajna', 24: 'ajna', 4: 'ajna', 17: 'ajna', 43: 'ajna', 11: 'ajna',
  // Throat (11 gates)
  62: 'throat', 23: 'throat', 56: 'throat', 35: 'throat', 12: 'throat',
  45: 'throat', 33: 'throat', 8: 'throat', 31: 'throat', 20: 'throat',
  16: 'throat',
  // G (8 gates)
  7: 'g', 1: 'g', 13: 'g', 25: 'g', 46: 'g', 2: 'g', 15: 'g', 10: 'g',
  // Heart / Ego (4 gates)
  21: 'heart', 40: 'heart', 26: 'heart', 51: 'heart',
  // Solar Plexus (7 gates)
  6: 'solar-plexus', 37: 'solar-plexus', 22: 'solar-plexus',
  36: 'solar-plexus', 30: 'solar-plexus', 55: 'solar-plexus',
  49: 'solar-plexus',
  // Sacral (9 gates)
  34: 'sacral', 5: 'sacral', 14: 'sacral', 29: 'sacral', 59: 'sacral',
  9: 'sacral', 3: 'sacral', 42: 'sacral', 27: 'sacral',
  // Spleen (7 gates)
  48: 'spleen', 57: 'spleen', 44: 'spleen', 50: 'spleen', 32: 'spleen',
  28: 'spleen', 18: 'spleen',
  // Root (9 gates)
  53: 'root', 60: 'root', 52: 'root', 19: 'root', 39: 'root',
  41: 'root', 58: 'root', 38: 'root', 54: 'root',
};

export interface GateActivation {
  /** 1-64 */
  gate: number;
  /** 1-6 — the line within the gate. */
  line: number;
  /** The home centre of this gate. */
  centre: CentreId;
}

/**
 * Convert an absolute zodiac degree (0–360) to its activated gate + line.
 */
export function degreesToGate(absoluteDegrees: number): GateActivation {
  // Distance from wheel start, wrapped 0..360
  const offset =
    ((absoluteDegrees - WHEEL_START_DEGREES) % 360 + 360) % 360;
  const index = Math.floor(offset / GATE_WIDTH_DEGREES);
  const gate = GATE_ORDER_FROM_AQUARIUS_2_15[index] ?? 41;
  const lineWidth = GATE_WIDTH_DEGREES / 6; // each line is 0.9375°
  const positionInGate = offset % GATE_WIDTH_DEGREES;
  const line = Math.min(6, Math.max(1, Math.floor(positionInGate / lineWidth) + 1));
  const centre = GATE_TO_CENTRE[gate] ?? 'g';
  return { gate, line, centre };
}
