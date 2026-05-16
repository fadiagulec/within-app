"""
Replace `import * as Haptics from 'expo-haptics'` with the web-safe wrapper.
"""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent

OLD = re.compile(
    r"import\s+\*\s+as\s+Haptics\s+from\s+['\"]expo-haptics['\"]"
)
NEW = "import * as Haptics from '@/lib/haptic'"

# Also handle named imports
OLD_NAMED = re.compile(
    r"import\s+\{\s*([^}]+)\s*\}\s+from\s+['\"]expo-haptics['\"]"
)


def main():
    targets = list(ROOT.glob("app/**/*.tsx")) + list(ROOT.glob("src/**/*.tsx")) + list(ROOT.glob("src/**/*.ts"))
    targets = [
        p for p in targets
        if "node_modules" not in p.parts
        and ".expo" not in p.parts
        # Don't touch the wrapper itself
        and p.name != "haptic.ts"
    ]

    changed = 0
    for p in targets:
        try:
            text = p.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        orig = text
        text = OLD.sub(NEW, text)
        # Replace named imports too
        text = OLD_NAMED.sub(r"import { \1 } from '@/lib/haptic'", text)
        if text != orig:
            p.write_text(text, encoding="utf-8")
            changed += 1
            print(f"  fixed {p.relative_to(ROOT)}")

    print(f"\nFiles changed: {changed}")


if __name__ == "__main__":
    main()
