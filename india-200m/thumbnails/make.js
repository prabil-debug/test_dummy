const { chromium } = require('playwright'); const fs = require('fs');
const INK='#14142b';
const person=(x,y,s,fill='#cfd8ff',stroke=INK)=>`<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-9" r="6.5" fill="${fill}" stroke="${stroke}" stroke-width="1.6"/><rect x="-6.5" y="-1" width="13" height="16" rx="6" fill="${fill}" stroke="${stroke}" stroke-width="1.6"/></g>`;
const head=(cx,cy,r)=>`<g transform="translate(${cx} ${cy}) scale(${r/190})" stroke-linecap="round" stroke-linejoin="round"><circle r="190" fill="#ffe3bf" stroke="${INK}" stroke-width="16"/><circle cx="-62" cy="-8" r="46" fill="#fff" stroke="${INK}" stroke-width="12"/><circle cx="62" cy="-8" r="46" fill="#fff" stroke="${INK}" stroke-width="12"/><circle cx="-48" cy="-24" r="17" fill="${INK}"/><circle cx="76" cy="-24" r="17" fill="${INK}"/><path d="M -112 -78 Q -62 -98 -16 -76" fill="none" stroke="${INK}" stroke-width="16"/><path d="M 18 -112 Q 66 -140 118 -96" fill="none" stroke="${INK}" stroke-width="16"/><ellipse cx="0" cy="98" rx="34" ry="42" fill="${INK}"/><ellipse cx="0" cy="112" rx="20" ry="18" fill="#e8504a"/></g>`;
const wrap=(inner)=>`<!doctype html><meta charset=utf-8><style>*{margin:0}body{width:1280px;height:720px;overflow:hidden}text{font-family:'Inter',sans-serif;font-weight:900;paint-order:stroke;stroke-linejoin:round}</style><svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#101a4a"/><stop offset="1" stop-color="#2b2f7a"/></linearGradient></defs><rect width="1280" height="720" fill="url(#g)"/>${inner}</svg>`;
const T=(x,y,s,fill,txt,anchor='start',sw=null)=>`<text x="${x}" y="${y}" font-size="${s}" fill="${fill}" stroke="${INK}" stroke-width="${sw||s*0.17}" text-anchor="${anchor}">${txt}</text>`;
const arrow=(x,y)=>`<g transform="translate(${x} ${y})"><path d="M -34 -16 L 8 -16 L 8 -42 L 52 0 L 8 42 L 8 16 L -34 16 Z" fill="#ffd34d" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/></g>`;
// A: dense vs sparse crowds
let dense='',sparse='';
for(let r=0;r<14;r++)for(let c=0;c<25;c++){const x=70+c*19.5,y=215+r*25;dense+=person(x,y,0.95);}
let k=0;for(let r=0;r<14;r++)for(let c=0;c<25;c++){ if((r*25+c)%7===3){const x=745+c*19.5,y=215+r*25;sparse+=person(x,y,0.95,'#ffd34d');}}
const A=wrap(`${T(60,150,76,'#fff','1.46B')}${T(1220,150,76,'#ffd34d','200M','end')}${dense}${sparse}${arrow(640,380)}${T(640,670,100,'#ffd34d','7× FEWER PEOPLE?','middle')}${T(60,60,40,'#cfd8ff','WHAT IF INDIA…','start',8)}`);
// B: 1 in 6 vs 1 in 40
let six='',forty='';
for(let i=0;i<6;i++) six+=person(90+i*68,330,3.4,i===0?'#ffd34d':'#cfd8ff');
for(let r=0;r<5;r++)for(let c=0;c<8;c++){forty+=person(740+c*56,262+r*62,1.9,(r===0&&c===0)?'#ffd34d':'#cfd8ff');}
const B=wrap(`${T(60,150,100,'#fff','1 IN 6')}${T(1220,150,100,'#ffd34d','1 IN 40','end')}${six}${forty}${arrow(640,380)}${T(640,665,92,'#fff','WHAT IF INDIA…?','middle')}`);
// C: mascot + big text
const C=wrap(`${head(285,385,205)}<g transform="translate(560 110)"><rect x="0" y="-48" width="190" height="72" rx="36" fill="#14142b" stroke="#cfd8ff" stroke-width="5"/><text x="95" y="3" font-size="48" fill="#fff" text-anchor="middle" stroke="none">INDIA</text></g>${T(560,330,118,'#ffd34d','7× FEWER')}${T(560,465,118,'#fff','PEOPLE?')}${T(562,570,50,'#cfd8ff','…with only 200 million','start',9)}`);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});
 for(const [n,h] of Object.entries({A,B,C})){fs.writeFileSync(`thumb_${n}.html`,h);await p.setContent(h);await p.waitForTimeout(300);await p.screenshot({path:`thumb_${n}.jpg`,type:'jpeg',quality:92});}
 await b.close();})();
