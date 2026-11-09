const { chromium } = require('playwright'); const fs = require('fs');
const INK='#14142b';
const bg = `<defs><radialGradient id="g" cx="0.35" cy="0.3" r="1"><stop offset="0" stop-color="#3a3f8f"/><stop offset="1" stop-color="#0d1233"/></radialGradient></defs><rect width="800" height="800" fill="url(#g)"/>`;
const head = (cx,cy,r) => `<g transform="translate(${cx} ${cy}) scale(${r/190})" stroke-linecap="round" stroke-linejoin="round">
  <circle r="190" fill="#ffe3bf" stroke="${INK}" stroke-width="16"/>
  <circle cx="-62" cy="-8" r="46" fill="#fff" stroke="${INK}" stroke-width="12"/><circle cx="62" cy="-8" r="46" fill="#fff" stroke="${INK}" stroke-width="12"/>
  <circle cx="-48" cy="-24" r="17" fill="${INK}"/><circle cx="76" cy="-24" r="17" fill="${INK}"/>
  <path d="M -112 -78 Q -62 -98 -16 -76" fill="none" stroke="${INK}" stroke-width="16"/>
  <path d="M 18 -112 Q 66 -140 118 -96" fill="none" stroke="${INK}" stroke-width="16"/>
  <path d="M -44 92 Q 0 128 50 84" fill="none" stroke="${INK}" stroke-width="14"/></g>`;
const q = (x,y,size) => `<text x="${x}" y="${y}" font-size="${size}" fill="#ffd34d" stroke="${INK}" stroke-width="${size*0.09}" text-anchor="middle">?</text>`;
const wrap = (inner) => `<!doctype html><meta charset=utf-8><style>*{margin:0}body{width:800px;height:800px;overflow:hidden}text{font-family:'Inter',sans-serif;font-weight:900;paint-order:stroke;stroke-linejoin:round}</style><svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">${bg}${inner}</svg>`;
const O1 = wrap(`<text x="400" y="340" font-size="210" fill="#fff" stroke="${INK}" stroke-width="26" text-anchor="middle">WHAT</text>
 <text x="400" y="600" font-size="300" fill="#ffd34d" stroke="${INK}" stroke-width="32" text-anchor="middle">IF?</text>`);
const O2 = wrap(`${head(335,470,215)}${q(590,340,290)}`);
const O3 = wrap(`${head(385,335,160)}${q(578,265,190)}
 <text x="400" y="640" font-size="132" fill="#fff" stroke="${INK}" stroke-width="22" text-anchor="middle">WHAT IF</text>`);
(async()=>{ const b=await chromium.launch(); const p=await b.newPage({viewport:{width:800,height:800}});
 for (const [n,h] of Object.entries({1:O1,2:O2,3:O3})) { fs.writeFileSync(`avatar_${n}.html`,h); await p.setContent(h); await p.waitForTimeout(300); await p.screenshot({path:`avatar_${n}.png`}); }
 // circle-crop preview at 3 sizes for each
 const prev = `<!doctype html><meta charset=utf-8><body style="margin:0;background:#fff;font-family:Inter;display:flex;gap:28px;padding:24px;align-items:flex-end;flex-wrap:wrap;width:1100px">`+
  [1,2,3].map(n=>`<div style="text-align:center">${[240,96,48].map(s=>`<img src="file://${process.cwd()}/avatar_${n}.png" style="width:${s}px;height:${s}px;border-radius:50%;margin:4px;vertical-align:bottom">`).join('')}<div>Option ${n}</div></div>`).join('')+`</body>`;
 fs.writeFileSync('preview.html',prev); await p.setViewportSize({width:1150,height:740}); await p.goto('file://'+process.cwd()+'/preview.html'); await p.waitForTimeout(500); await p.screenshot({path:'avatar_preview.png'});
 await b.close(); })();
