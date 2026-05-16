/**
 * SOMA - Chakra ID Mapping
 *
 * The codebase uses two parallel chakra identifiers:
 *  - ChakraId  (from chakra-content / wheel-of-life): 'solar-plexus' / 'third-eye'
 *  - ChakraKey (from types/index.ts, used by chakras.ts + useUserStore): 'solar' / 'thirdEye'
 *
 * These helpers translate between them so the Wheel of Life (ChakraId)
 * can route into existing chakra screens and stores (ChakraKey).
 */

import type { ChakraId } from './chakra-content';
import type { ChakraKey } from '@/types';

export function chakraIdToKey(id: ChakraId): ChakraKey {
  switch (id) {
    case 'solar-plexus':
      return 'solar';
    case 'third-eye':
      return 'thirdEye';
    default:
      return id as ChakraKey;
  }
}

export function chakraKeyToId(key: ChakraKey): ChakraId {
  switch (key) {
    case 'solar':
      return 'solar-plexus';
    case 'thirdEye':
      return 'third-eye';
    default:
      return key as ChakraId;
  }
}

/** Slugs for the chakra/[id] route — accepts ChakraId (dash form). */
export function chakraRouteSlug(id: ChakraId): string {
  return id;
}
