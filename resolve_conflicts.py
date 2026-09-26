"""
Auto-resolves unresolved git merge conflict markers throughout a repo,
keeping the HEAD side of every conflict and discarding the other side.

v2: line-based parser (handles conflicts with an empty "ours" or "theirs"
side, which a naive regex misses) and scans the full frontend/ tree
(including index.html), not just frontend/src.

Usage:
    1. Put this file in the ROOT of your repo (same folder as vercel.json).
    2. Run:  python resolve_conflicts.py
    3. Review the list of changed files it prints, and the "needs manual
       review" list if any.
    4. Re-check with:
       Get-ChildItem -Path frontend,backend -Recurse -File -Exclude *.pyc |
         Select-String -Pattern "^<<<<<<< |^======= |^>>>>>>> "
"""

from pathlib import Path

SOURCE_EXTENSIONS = {".js", ".jsx", ".ts", ".tsx", ".css", ".py", ".html"}
SEARCH_ROOTS = ["frontend", "backend"]
EXCLUDE_DIR_NAMES = {"node_modules", "dist", "__pycache__", ".git", ".vercel"}


def resolve_text(text: str):
    """Line-based conflict resolver. Keeps the HEAD (ours) side of every
    conflict block, discards the other side and all marker lines.
    Returns (new_text, changed, unresolved_count)."""
    lines = text.splitlines(keepends=True)
    out = []
    i = 0
    changed = False
    unresolved = 0
    n = len(lines)

    while i < n:
        line = lines[i]
        if line.startswith("<<<<<<< "):
            changed = True
            i += 1
            ours = []
            nested = False
            while i < n and not lines[i].startswith("======="):
                if lines[i].startswith("<<<<<<< "):
                    # Malformed: nested conflict start before a separator.
                    unresolved += 1
                    out.append(line)
                    out.extend(ours)
                    nested = True
                    break
                ours.append(lines[i])
                i += 1
            if nested:
                continue  # re-process from the nested <<<<<<< as a fresh block

            if i < n and lines[i].startswith("======="):
                i += 1  # skip the ======= line
            else:
                unresolved += 1
                out.append(line)
                out.extend(ours)
                continue

            while i < n and not lines[i].startswith(">>>>>>> "):
                i += 1
            if i < n and lines[i].startswith(">>>>>>> "):
                i += 1  # skip the >>>>>>> line
            else:
                unresolved += 1

            out.extend(ours)
        else:
            out.append(line)
            i += 1

    return "".join(out), changed, unresolved


def process_file(path: Path):
    try:
        original = path.read_text(encoding="utf-8", errors="ignore")
    except Exception as e:
        return None, f"could not read ({e})"

    if "<<<<<<< " not in original:
        return False, None

    new_text, changed, unresolved = resolve_text(original)

    if changed:
        path.write_text(new_text, encoding="utf-8")

    if unresolved:
        return True, f"{unresolved} block(s) need manual review"

    if "<<<<<<< " in new_text or ">>>>>>> " in new_text:
        return True, "leftover markers after processing — check manually"

    return True, None


def main():
    edited = []
    needs_review = []

    for root_name in SEARCH_ROOTS:
        root = Path(root_name)
        if not root.exists():
            print(f"(skipping missing path: {root})")
            continue

        for path in root.rglob("*"):
            if not path.is_file():
                continue
            if path.suffix not in SOURCE_EXTENSIONS:
                continue
            if any(part in EXCLUDE_DIR_NAMES for part in path.parts):
                continue

            result, note = process_file(path)
            if result:
                edited.append(str(path))
                if note:
                    needs_review.append((str(path), note))

    print(f"\nEdited {len(edited)} file(s):")
    for e in edited:
        print(f"  - {e}")

    if needs_review:
        print(f"\n⚠ {len(needs_review)} file(s) need manual review:")
        for f, note in needs_review:
            print(f"  - {f}: {note}")
    else:
        print("\nAll conflicts resolved cleanly — no manual review flagged.")


if __name__ == "__main__":
    main()