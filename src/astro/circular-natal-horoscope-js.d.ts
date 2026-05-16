/**
 * Local TypeScript shim for circular-natal-horoscope-js.
 *
 * The library ships its own .d.ts inside dist/types but uses an Unlicense
 * (public domain) and the published main bundle's resolution is finicky
 * with Metro. This shim guarantees the import compiles regardless of how
 * Metro resolves the package main.
 */
declare module 'circular-natal-horoscope-js' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const Origin: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const Horoscope: any;
}

declare module 'circular-natal-horoscope-js/dist/index' {
  // Same surface as the package root — we import from dist/index directly
  // because the package's own `module` field points to a path the published
  // bundle doesn't contain (Metro fails to resolve it otherwise).
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const Origin: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const Horoscope: any;
}
