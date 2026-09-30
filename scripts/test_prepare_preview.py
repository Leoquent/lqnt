import importlib.util
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('preview', Path(__file__).with_name('prepare-preview.py'))
preview = importlib.util.module_from_spec(spec)
spec.loader.exec_module(preview)


class PreviewTest(unittest.TestCase):
    def test_html_navigation_and_production_isolation(self):
        source = Path(__file__).parents[1] / 'out' / 'index.html'
        production = source.read_text(encoding='utf-8')
        with tempfile.TemporaryDirectory(prefix='lqnt-preview-') as directory:
            root = Path(directory)
            (root / 'index.html').write_text(production, encoding='utf-8')
            (root / 'index.txt').write_text('index, follow noindex, follow', encoding='utf-8')
            self.assertEqual(preview.prepare_preview(root), 1)
            html = (root / 'index.html').read_text(encoding='utf-8')
            self.assertIn('content="noindex, follow"', html)
            self.assertNotIn('content="index, follow"', html)
            self.assertEqual((root / 'index.txt').read_text(encoding='utf-8'), 'noindex, follow noindex, follow')
            preview.prepare_preview(root)
            self.assertEqual(html, (root / 'index.html').read_text(encoding='utf-8'))
        self.assertEqual(source.read_text(encoding='utf-8'), production)

    def test_missing_metadata(self):
        with tempfile.TemporaryDirectory(prefix='lqnt-preview-') as directory:
            root = Path(directory)
            (root / 'index.html').write_text('<html><head></head></html>', encoding='utf-8')
            preview.prepare_preview(root)
            self.assertIn('content="noindex, follow"', (root / 'index.html').read_text(encoding='utf-8'))


if __name__ == '__main__':
    unittest.main()
