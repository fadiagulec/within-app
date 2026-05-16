/**
 * SOMA — Plans registry.
 *
 * Add new plans here. Every plan registered is automatically picked up by
 * the plans-list screen (app/plans.tsx) and reachable at /plan/[id].
 */

import type { Plan } from './types';
import { LETTING_GO } from './letting-go-of-the-past';
import { BUILD_ABUNDANCE } from './build-abundance';
import { MAGNETIC_SELF } from './magnetic-self';

export const PLANS: Plan[] = [
  LETTING_GO,
  BUILD_ABUNDANCE,
  MAGNETIC_SELF,
];

export function getPlan(id: string): Plan | undefined {
  return PLANS.find((p) => p.id === id);
}

export type { Plan, PlanDay, PlanPhase } from './types';
