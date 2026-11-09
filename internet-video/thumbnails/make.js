const { chromium } = require('playwright');
const fs = require('fs');
const INK = '#14142b';
const wifi = (s=1, col='#fff', sw=14) => {
  const arc = r => `M ${(-0.707*r).toFixed(1)} ${(-0.707*r).toFixed(1)} A ${r} ${r} 0 0 1 ${(0.707*r).toFixed(1)} ${(-0.707*r).toFixed(1)}`;
  return `<g transform="scale(${s})" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round">
    <path d="${arc(40)}"/><path d="${arc(75)}"/><path d="${arc(110)}"/><circle cx="0" cy="0" r="${sw*0.8}" fill="${col}" stroke="none"/></g>`;
};
const slash = (len=170, sw=26) => `<g stroke-linecap="round"><line x1="${-len}" y1="${-len*0.9}" x2="${len*0.7}" y2="${len*0.5}" stroke="${INK}" stroke-width="${sw+16}"/><line x1="${-len}" y1="${-len*0.9}" x2="${len*0.7}" y2="${len*0.5}" stroke="#ff3b3b" stroke-width="${sw}"/></g>`;
// stick figure, origin at head centre
const figure = (shirt='#4aa3ff', mood='shock', limb=INK) => {
  const face = mood==='shock'
   ? `<circle cx="-24" cy="-6" r="19" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="24" cy="-6" r="19" fill="#fff" stroke="${INK}" stroke-width="5"/>
      <circle cx="-22" cy="-4" r="7" fill="${INK}"/><circle cx="26" cy="-4" r="7" fill="${INK}"/>
      <path d="M -46 -38 Q -24 -56 -4 -40" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M 4 -40 Q 24 -56 46 -38" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/>
      <ellipse cx="0" cy="38" rx="17" ry="23" fill="${INK}"/><ellipse cx="0" cy="46" rx="9" ry="9" fill="#e8504a"/>`
   : `<circle cx="-24" cy="-6" r="7" fill="${INK}"/><circle cx="24" cy="-6" r="7" fill="${INK}"/><path d="M -28 28 Q 0 58 28 28" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  return `<g stroke-linecap="round" stroke-linejoin="round">
    <line x1="-20" y1="250" x2="-55" y2="360" stroke="${limb}" stroke-width="14"/><line x1="20" y1="250" x2="55" y2="360" stroke="${limb}" stroke-width="14"/>
    <rect x="-62" y="85" width="124" height="180" rx="42" fill="${shirt}" stroke="${INK}" stroke-width="8"/>
    <line x1="-58" y1="115" x2="-130" y2="40" stroke="${limb}" stroke-width="14"/><line x1="58" y1="115" x2="130" y2="40" stroke="${limb}" stroke-width="14"/>
    <circle cx="0" cy="0" r="82" fill="#ffe3bf" stroke="${INK}" stroke-width="9"/>${face}</g>`;
};
const phone = (w=130,h=230) => `<g><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="26" fill="#1c1c36" stroke="${INK}" stroke-width="9"/>
  <rect x="${-w/2+10}" y="${-h/2+16}" width="${w-20}" height="${h-32}" rx="14" fill="#2a2f55"/>
  <g transform="translate(0 20)">${wifi(0.55,'#9fb2ff',14)}<g transform="scale(0.5)">${slash(70,22)}</g></g></g>`;
const base = (inner, bg) => `<!doctype html><meta charset=utf-8><style>*{margin:0}body{width:1280px;height:720px;overflow:hidden;font-family:'Inter',sans-serif}svg{display:block}text{font-family:'Inter',sans-serif;font-weight:900;paint-order:stroke;stroke-linejoin:round}</style>
<svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg"><defs>${bg}</defs>${inner}</svg>`;

// A: NO INTERNET. FOREVER?
const A = base(`
 <rect width="1280" height="720" fill="url(#g)"/>
 <g opacity="0.14" transform="translate(930 330)">${wifi(3.2,'#ffffff',16)}</g>
 <g transform="translate(930 330)" opacity="0.35">${slash(300,30)}</g>
 <text x="60" y="270" font-size="150" fill="#fff" stroke="${INK}" stroke-width="22">NO</text>
 <text x="60" y="425" font-size="150" fill="#fff" stroke="${INK}" stroke-width="22">INTERNET</text>
 <text x="60" y="610" font-size="170" fill="#ffd34d" stroke="${INK}" stroke-width="24">FOREVER?</text>
 <g transform="translate(1025 200) scale(0.8)">${figure('#4aa3ff','shock','#e6ecff')}<g transform="translate(160 40) rotate(14)">${phone()}</g></g>
 <rect x="0" y="0" width="1280" height="720" fill="none" stroke="#ff3b3b" stroke-width="0"/>`,
 `<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0d1633"/><stop offset="1" stop-color="#27346f"/></linearGradient>`);

// B: split lit/dark, DAY 1 WITHOUT WIFI
const B = base(`
 <rect width="1280" height="720" fill="url(#l)"/>
 <path d="M 640 0 L 600 150 L 670 270 L 610 410 L 680 540 L 630 720 L 1280 720 L 1280 0 Z" fill="url(#d)"/>
 <path d="M 640 0 L 600 150 L 670 270 L 610 410 L 680 540 L 630 720" fill="none" stroke="${INK}" stroke-width="12" stroke-linejoin="round"/>
 <g transform="translate(300 245) scale(0.78)">${figure('#ff9f43','calm')}<g transform="translate(150 55) rotate(10)"><rect x="-55" y="-95" width="110" height="190" rx="22" fill="#1c1c36" stroke="${INK}" stroke-width="8"/><g transform="translate(0 15)">${wifi(0.5,'#59e08b',14)}</g></g></g>
 <g transform="translate(960 245) scale(0.78)">${figure('#4aa3ff','shock','#dfe6ff')}<g transform="translate(-150 55) rotate(-10)">${phone(110,190)}</g></g>
 <text x="60" y="95" font-size="70" fill="#fff" stroke="${INK}" stroke-width="14">BEFORE</text>
 <text x="1220" y="95" font-size="70" fill="#ffd34d" stroke="${INK}" stroke-width="14" text-anchor="end">DAY 1</text>
 <text x="640" y="650" font-size="125" fill="#fff" stroke="${INK}" stroke-width="22" text-anchor="middle">WITHOUT WI-FI</text>`,
 `<linearGradient id="l" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffd86b"/><stop offset="1" stop-color="#ff9f43"/></linearGradient>
  <linearGradient id="d" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1d2347"/><stop offset="1" stop-color="#090c1d"/></linearGradient>`);

// C: giant dead phone close-up
const C = base(`
 <rect width="1280" height="720" fill="url(#g)"/>
 <g transform="translate(980 360) rotate(8)">
   <rect x="-190" y="-300" width="380" height="600" rx="60" fill="#1c1c36" stroke="${INK}" stroke-width="16"/>
   <rect x="-165" y="-268" width="330" height="536" rx="38" fill="#232a55"/>
   <g transform="translate(0 40)">${wifi(1.15,'#9fb2ff',18)}${slash(135,34)}</g>
   <text x="0" y="-150" font-size="44" fill="#ff6b6b" stroke="${INK}" stroke-width="8" text-anchor="middle">NO SIGNAL</text>
 </g>
 <text x="60" y="240" font-size="120" fill="#fff" stroke="${INK}" stroke-width="20">WHAT IF</text>
 <text x="60" y="380" font-size="120" fill="#fff" stroke="${INK}" stroke-width="20">IT\u2019S ALL</text>
 <text x="60" y="545" font-size="165" fill="#ffd34d" stroke="${INK}" stroke-width="24">GONE?</text>
 <text x="64" y="640" font-size="46" fill="#cfd8ff" stroke="${INK}" stroke-width="9">THE INTERNET, FOREVER</text>`,
 `<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#150f2e"/><stop offset="1" stop-color="#3a1f58"/></linearGradient>`);

(async()=>{
  const b = await chromium.launch(); const p = await b.newPage({viewport:{width:1280,height:720}});
  for (const [n,h] of Object.entries({A,B,C})) {
    fs.writeFileSync(`thumb_${n}.html`, h);
    await p.setContent(h); await p.waitForTimeout(300);
    await p.screenshot({path:`thumb_${n}.jpg`, type:'jpeg', quality:92});
  }
  await b.close();
})();
