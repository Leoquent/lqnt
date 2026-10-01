"""Mark only the preview artifact as noindex, including Next's navigation payloads."""
from pathlib import Path
import re
import sys


def prepare_preview(directory: Path) -> int:
    if not (directory / 'index.html').is_file():
        raise ValueError('Expected a static website export with index.html')
    count = 0
    for path in directory.rglob('*'):
        if path.suffix not in {'.html', '.txt'} or not path.is_file():
            continue
        original = path.read_text(encoding='utf-8')
        # The same metadata is serialized into the HTML and the RSC .txt files.
        # Keep already-noindexed legal/demo routes unchanged; make this idempotent.
        updated = re.sub(r'(?<!no)index, follow', 'noindex, follow', original)
        if path.suffix == '.html':
            if not re.search(r'<meta\s+name="robots"\s+content="noindex', updated):
                updated = updated.replace('</head>', '<meta name="robots" content="noindex, follow"/></head>', 1)
            count += 1
        if original != updated:
            path.write_text(updated, encoding='utf-8')
    return count


if __name__ == '__main__':
    print(f'Preview noindex applied to {prepare_preview(Path(sys.argv[1]))} HTML files')
