const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const D = __dirname;
(async () => {
  const mode = process.argv[2] || 'stills';
  const tl = JSON.parse(fs.readFileSync(path.join(D, 'timeline.json')));
  const ev = JSON.parse(fs.readFileSync(path.join(D, 'events.json')));
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.join(D, 'index.html'));
  await page.evaluate(([a, b]) => window.init(a, b), [tl, ev]);
  if (mode === 'stills') {
    const times = process.argv.slice(3).map(Number);
    for (const t of times) {
      await page.evaluate(t => window.render(t), t);
      await page.screenshot({ path: path.join(D, `still_${String(t).replace('.', '_')}.png`) });
      console.log('still', t);
    }
  } else {
    const fps = 30, total = tl.total, n = Math.ceil(total * fps);
    fs.mkdirSync(path.join(D, 'frames'), { recursive: true });
    for (let i = 0; i < n; i++) {
      await page.evaluate(t => window.render(t), i / fps);
      await page.screenshot({ path: path.join(D, 'frames', `f${String(i).padStart(5, '0')}.jpg`), type: 'jpeg', quality: 90 });
      if (i % 100 === 0) console.log('frame', i, '/', n);
    }
    console.log('done', n);
  }
  await browser.close();
})();
