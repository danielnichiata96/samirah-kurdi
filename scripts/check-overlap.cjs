const { chromium } = require('playwright');

(async () => {
  const url = process.argv[2] || 'http://localhost:3003';
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
  });
  console.log('Navigating to', url);
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(800);

  const results = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('header a[aria-label]'));
    return anchors.map((a) => {
      const r = a.getBoundingClientRect();
      const midX = r.x + r.width / 2;
      const midY = r.y + r.height / 2;
      const top = document.elementFromPoint(midX, midY);
      const style = top ? getComputedStyle(top) : null;
      return {
        aria: a.getAttribute('aria-label'),
        href: a.getAttribute('href'),
        anchorRect: { x: r.x, y: r.y, w: r.width, h: r.height },
        topmost: top
          ? { tag: top.tagName.toLowerCase(), class: top.className, z: style.zIndex, pointerEvents: style.pointerEvents }
          : null,
      };
    });
  });

  for (const r of results) {
    console.log('---');
    console.log('aria:', r.aria, 'href:', r.href);
    console.log('anchor rect:', r.anchorRect);
    console.log('topmost element:', r.topmost);
  }

  await browser.close();
})();
