"""
Update Third Eye core emotion ONLY:
  Illusion -> Doubt

Crown stays as 'Separation' (per the cheat sheet — confirmed core emotion).
'Suppression' for Throat stays as the noun form.
"""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent

FILES = [
    "src/data/chakra-content.ts",
    "src/data/chakra-short-guides.ts",
    "src/data/education.ts",
    "src/data/energy-centers-intro.ts",
    "src/data/shift-method.ts",
]


def replace_in(text: str) -> tuple[str, int]:
    n = 0
    new = re.sub(r"\bIllusion\b", "Doubt", text)
    n += len(re.findall(r"\bIllusion\b", text))
    text = new
    new = re.sub(r"\billusion\b", "doubt", text)
    n += len(re.findall(r"\billusion\b", text))
    text = new
    return text, n


def main():
    for relpath in FILES:
        p = ROOT / relpath
        if not p.exists():
            print(f"  skip (not found): {relpath}")
            continue
        text = p.read_text(encoding="utf-8")
        new, n = replace_in(text)
        if new != text:
            p.write_text(new, encoding="utf-8")
            print(f"  fixed {relpath} ({n} replacements)")


if __name__ == "__main__":
    main()
