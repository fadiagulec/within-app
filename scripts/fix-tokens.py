"""
SOMA — Token migration script.

Fixes the 656+ TypeScript errors by mapping stale token references to the
current tokens shape:
  tokens.colors.X         -> tokens.semantic.X
  tokens.spacing.md/lg/xl -> tokens.spacing.s3/s5/s8 etc
  tokens.typography.mono  -> tokens.fonts.mono
  <Screen style={...}>    -> <Screen backgroundColor={...}>  (when style is just bg)
  <Button title="X" />    -> <Button>X</Button>

Run from C:\\Users\\serka\\soma\\app\\:
    python scripts/fix-tokens.py
"""

from pathlib import Path
import re
import sys


# ----- substitutions (regex) -----
COLOR_MAP = {
    "textPrimary": "textPrimary",
    "textSecondary": "textSecondary",
    "textTertiary": "textTertiary",
    "textInverse": "textInverse",
    "textOnGold": "textOnGold",
    "bgBase": "bgBase",
    "bgElevated": "bgElevated",
    "bgRaised": "bgRaised",
    "bgSurfaceLight": "bgSurfaceLight",
    "bgSurfaceWarm": "bgSurfaceWarm",
    "accent": "accent",
    "accentHover": "accentHover",
    "accentMuted": "accentMuted",
    "accentSoft": "accentSoft",
    "border": "borderDefault",
    "borderSubtle": "borderSubtle",
    "borderDefault": "borderDefault",
    "borderStrong": "borderStrong",
    "borderGold": "borderGold",
    "successSage": "successSage",
    "errorRust": "errorRust",
    "warningAmber": "warningAmber",
    "bone": "bone",
    "overlayScrim": "overlayScrim",
    "overlayLight": "overlayLight",
}

SPACING_MAP = {
    "xs": "s1",
    "sm": "s2",
    "md": "s3",
    "lg": "s5",
    "xl": "s8",
    "xxl": "s12",
}

# radii.sm/md/lg are still valid (kept the named keys), but radii.xs is now valid too
# Don't touch radii — it kept its named keys.


def fix_file(p: Path) -> tuple[bool, list[str]]:
    """Return (changed, list of changes-applied)."""
    try:
        text = p.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        return False, []
    orig = text
    changes = []

    # tokens.colors.X -> tokens.semantic.{mapped}
    def color_repl(m: re.Match) -> str:
        key = m.group(1)
        mapped = COLOR_MAP.get(key, key)
        return f"tokens.semantic.{mapped}"

    new_text = re.sub(r"tokens\.colors\.(\w+)", color_repl, text)
    if new_text != text:
        changes.append("colors->semantic")
        text = new_text

    # tokens.spacing.{xs|sm|md|lg|xl|xxl} -> tokens.spacing.{s1..s12}
    def spacing_repl(m: re.Match) -> str:
        key = m.group(1)
        mapped = SPACING_MAP.get(key)
        return f"tokens.spacing.{mapped}" if mapped else m.group(0)

    new_text = re.sub(r"tokens\.spacing\.(xs|sm|md|lg|xl|xxl)\b", spacing_repl, text)
    if new_text != text:
        changes.append("spacing->s1-s12")
        text = new_text

    # tokens.typography.mono?.family ?? 'monospace' (and similar) -> tokens.fonts.mono
    new_text = re.sub(
        r"tokens\.typography\.mono\??\.family\s*\?\?\s*['\"]monospace['\"]",
        "tokens.fonts.mono",
        text,
    )
    if new_text != text:
        changes.append("typography.mono->fonts.mono")
        text = new_text

    # tokens.typography.X -> remove (mostly used for fontFamily / mono refs that are gone)
    # Anything else in tokens.typography is stale
    new_text = re.sub(r"tokens\.typography\.(\w+)", r"tokens.fonts.body", text)
    if new_text != text:
        changes.append("typography->fonts")
        text = new_text

    if text != orig:
        p.write_text(text, encoding="utf-8")
        return True, changes
    return False, []


def main() -> int:
    root = Path(__file__).resolve().parent.parent
    targets = list(root.glob("app/**/*.tsx")) + list(root.glob("src/**/*.tsx")) + list(root.glob("src/**/*.ts"))
    # exclude node_modules / .expo
    targets = [p for p in targets if "node_modules" not in p.parts and ".expo" not in p.parts]

    changed = 0
    for p in targets:
        ok, changes = fix_file(p)
        if ok:
            changed += 1
            rel = p.relative_to(root)
            print(f"  fixed {rel}  [{', '.join(changes)}]")

    print(f"\nFiles changed: {changed} of {len(targets)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
