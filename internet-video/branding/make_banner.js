const { chromium } = require('playwright'); const fs = require('fs');
const INK='#14142b';
const wifi=(s=1,col='#fff',sw=14)=>{const arc=r=>`M ${(-0.707*r).toFixed(1)} ${(-0.707*r).toFixed(1)} A ${r} ${r} 0 0 1 ${(0.707*r).toFixed(1)} ${(-0.707*r).toFixed(1)}`;return `<g transform="scale(${s})" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round"><path d="${arc(40)}"/><path d="${arc(75)}"/><path d="${arc(110)}"/><circle r="${sw*0.8}" fill="${col}" stroke="none"/></g>`;};
const head=(cx,cy,r)=>`<g transform="translate(${cx} ${cy}) scale(${r/190})" stroke-linecap="round" stroke-linejoin="round"><circle r="190" fill="#ffe3bf" stroke="${INK}" stroke-width="16"/><circle cx="-62" cy="-8" r="46" fill="#fff" stroke="${INK}" stroke-width="12"/><circle cx="62" cy="-8" r="46" fill="#fff" stroke="${INK}" stroke-width="12"/><circle cx="-48" cy="-24" r="17" fill="${INK}"/><circle cx="76" cy="-24" r="17" fill="${INK}"/><path d="M -112 -78 Q -62 -98 -16 -76" fill="none" stroke="${INK}" stroke-width="16"/><path d="M 18 -112 Q 66 -140 118 -96" fill="none" stroke="${INK}" stroke-width="16"/><path d="M -44 92 Q 0 128 50 84" fill="none" stroke="${INK}" stroke-width="14"/></g>`;
const mini=(x,y,sc,shirt,limb)=>`<g transform="translate(${x} ${y}) scale(${sc})" stroke-linecap="round" stroke-linejoin="round"><line x1="-20" y1="250" x2="-55" y2="360" stroke="${limb}" stroke-width="14"/><line x1="20" y1="250" x2="55" y2="360" stroke="${limb}" stroke-width="14"/><rect x="-62" y="85" width="124" height="180" rx="42" fill="${shirt}" stroke="${INK}" stroke-width="8"/><line x1="-58" y1="115" x2="-130" y2="40" stroke="${limb}" stroke-width="14"/><line x1="58" y1="115" x2="130" y2="40" stroke="${limb}" stroke-width="14"/><circle r="82" fill="#ffe3bf" stroke="${INK}" stroke-width="9"/><circle cx="-24" cy="-6" r="19" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="24" cy="-6" r="19" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="-22" cy="-4" r="7" fill="${INK}"/><circle cx="26" cy="-4" r="7" fill="${INK}"/><path d="M -46 -38 Q -24 -56 -4 -40" stroke="${INK}" stroke-width="7" fill="none"/><path d="M 4 -40 Q 24 -56 46 -38" stroke="${INK}" stroke-width="7" fill="none"/><ellipse cy="40" rx="15" ry="19" fill="${INK}"/></g>`;
const qm=(x,y,s,o)=>`<text x="${x}" y="${y}" font-size="${s}" fill="#9aa6ff" opacity="${o*0.6}" text-anchor="middle" style="font-weight:900;font-family:Inter">?</text>`;
const deco=`
 <g opacity="0.10" transform="translate(300 360)">${wifi(4,'#fff',14)}</g>
 <g opacity="0.10" transform="translate(2300 1180)">${wifi(4.5,'#fff',14)}</g>
 ${qm(250,260,260,0.35)}${qm(2330,300,300,0.30)}${qm(430,1260,220,0.25)}${qm(2150,1300,240,0.28)}${qm(1280,210,190,0.22)}${qm(1280,1330,170,0.2)}
 ${mini(220,1010,0.62,'#4aa3ff','#e6ecff')}${mini(2340,1010,0.62,'#ff9f43','#e6ecff')}`;
const html=`<!doctype html><meta charset=utf-8><style>*{margin:0}body{width:2560px;height:1440px;overflow:hidden}text{font-family:'Inter',sans-serif;font-weight:900;paint-order:stroke;stroke-linejoin:round}</style>
<svg width="2560" height="1440" viewBox="0 0 2560 1440" xmlns="http://www.w3.org/2000/svg">
<defs><radialGradient id="g" cx="0.3" cy="0.25" r="1.1"><stop offset="0" stop-color="#3a3f8f"/><stop offset="1" stop-color="#0b1030"/></radialGradient></defs>
<rect width="2560" height="1440" fill="url(#g)"/>${deco}
<!-- safe area content: x 507-2053, y 508-931 -->
${head(722,722,160)}
<text x="935" y="748" font-size="205" fill="#fff" stroke="${INK}" stroke-width="30">WHAT</text>
<text x="1640" y="748" font-size="205" fill="#ffd34d" stroke="${INK}" stroke-width="30">IF?</text>
<text x="941" y="858" font-size="64" fill="#cfd8ff" stroke="${INK}" stroke-width="12">Wild scenarios, explained.</text>
</svg>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:2560,height:1440}});
 fs.writeFileSync('banner.html',html);await p.setContent(html);await p.waitForTimeout(400);await p.screenshot({path:'banner.png'});
 // guides preview: TV (full), desktop (2560x423), mobile/safe (1546x423)
 const g=`<!doctype html><meta charset=utf-8><body style="margin:0;background:#222"><div style="position:relative;width:2560px;height:1440px"><img src="file://${process.cwd()}/banner.png" style="position:absolute;inset:0">
 <div style="position:absolute;left:0;top:508px;width:2560px;height:423px;border:6px solid #00e5ff;box-sizing:border-box"></div>
 <div style="position:absolute;left:507px;top:508px;width:1546px;height:423px;border:6px solid #ff3b3b;box-sizing:border-box"></div>
 <div style="position:absolute;left:20px;top:20px;color:#00e5ff;font:700 40px Inter">cyan = desktop strip</div><div style="position:absolute;left:20px;top:72px;color:#ff3b3b;font:700 40px Inter">red = phone-safe area</div></div>`;
 fs.writeFileSync('guides.html',g);await p.goto('file://'+process.cwd()+'/guides.html');await p.waitForTimeout(500);await p.screenshot({path:'banner_guides.png'});await b.close();})();
