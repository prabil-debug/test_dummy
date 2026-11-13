let GZ={x:0,y:0},BR=0;
function RAMU(x,y,sc,o,t){
  const br=Math.sin(t*2.3), sway=Math.sin(t*0.8)*0.35;
  const bob=-Math.abs(Math.sin(t*1.6))*1.2+(o.jump||0);
  const sx=1+0.004*br, sy=1+0.006*br;
  const L=o.L.slice(),R=o.R.slice(); L[0]+=1.2*Math.sin(t*1.7); R[0]+=1.2*Math.sin(t*1.3+1);
  GZ=o.gaze||{x:0,y:0}; BR=o.brow||0;
  const tilt=(o.tilt||0)+0.8*Math.sin(t*0.9);
  const s=`<g transform="translate(${x},${y+bob}) rotate(${sway+(o.lean||0)}) scale(${sx},${sy})">${ramu(0,0,sc,Object.assign({},o,{L,R,tilt,shadow:false}))}</g>`;
  GZ={x:0,y:0};BR=0; return s;
}
const FR=(x,y,sc,o,t)=>RAMU(x,y,sc,Object.assign({outfit:"office",sk:"s3"},o),t);
const tears=(x,y,sc,t)=>{let o="";for(const sd of [-1,1])for(let k=0;k<2;k++){const p=((t*1.1+k*0.5+(sd>0?0.25:0))%1);o+=`<path transform="translate(${x+sd*16.5*sc*1.0+sd*p*6},${y-512*sc+p*70*sc}) scale(${1-p*0.4})" d="M0,-10 C7,-1 8,4 0,8 C-8,4 -7,-1 0,-10Z" fill="#8EC9F0" stroke="#fff" stroke-width="2" opacity="${1-p*0.6}"/>`}return o};
const inr=(v)=>"₹"+Math.round(v).toLocaleString("en-IN");
const spark=(x,y,r,rot,col=YEL)=>`<g transform="translate(${x},${y}) rotate(${rot})"><path d="M0,${-r} Q${r*0.18},${-r*0.18} ${r},0 Q${r*0.18},${r*0.18} 0,${r} Q${-r*0.18},${r*0.18} ${-r},0 Q${-r*0.18},${-r*0.18} 0,${-r}Z" fill="${col}"/></g>`;
const DEFS2=`<defs>
 <linearGradient id="gLeath" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9A6038"/><stop offset=".55" stop-color="#7A4A2B"/><stop offset="1" stop-color="#5A3419"/></linearGradient>
 <linearGradient id="gLeathF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B07846"/><stop offset="1" stop-color="#8A5530"/></linearGradient>
 <linearGradient id="gNoteG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#A9C9A6"/><stop offset=".5" stop-color="#8DB38C"/><stop offset="1" stop-color="#76A078"/></linearGradient>
 <linearGradient id="gPaper" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#EEF1F5"/></linearGradient>
 <linearGradient id="gSteel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E9EDF2"/><stop offset=".5" stop-color="#B7C1CF"/><stop offset="1" stop-color="#8E9AAB"/></linearGradient>
 <linearGradient id="gWall" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#F4DDBF"/><stop offset="1" stop-color="#E6C9A6"/></linearGradient>
 <linearGradient id="gGlass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#BFE0F5"/><stop offset="1" stop-color="#8FC1E3"/></linearGradient>
 <linearGradient id="gGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE48A"/><stop offset="1" stop-color="#E0A800"/></linearGradient>
 <radialGradient id="gDark" cx=".5" cy=".4" r=".8"><stop offset="0" stop-color="#22331F" stop-opacity=".9"/><stop offset="1" stop-color="#0A0F0B" stop-opacity="0"/></radialGradient>
</defs>`;
function note2(x,y,s,rot,v="500"){
  return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><rect x="-96" y="-44" width="192" height="88" rx="7" fill="#5E8660" transform="translate(0,4)" opacity=".5"/><rect x="-96" y="-44" width="192" height="88" rx="7" fill="url(#gNoteG)"/><rect x="-89" y="-37" width="178" height="74" rx="4" fill="none" stroke="#fff" stroke-width="2.2" opacity=".8"/><circle cx="-48" cy="2" r="24" fill="#6F9871" opacity=".55"/><circle cx="-48" cy="-6" r="10" fill="#4F7A52"/><path d="M-70,22 Q-48,2 -26,22Z" fill="#4F7A52"/><circle cx="28" cy="0" r="30" fill="none" stroke="#fff" stroke-width="2" opacity=".5"/><text x="28" y="14" font-size="40" text-anchor="middle" fill="#2F4F32" font-family="sans-serif" font-weight="800" stroke="none">${v}</text><rect x="2" y="-44" width="5" height="88" fill="url(#gSteel)" opacity=".85"/><text x="-84" y="-18" font-size="13" fill="#2F4F32" stroke="none" font-family="sans-serif" font-weight="800">₹${v}</text><path d="M-96,-44 H-30 L-96,10Z" fill="#fff" opacity=".18"/></g>`;
}
function wallet2(x,y,s,open,t){
  const flap=open*(-120);
  return `<g transform="translate(${x},${y}) scale(${s})">
  <ellipse cx="0" cy="124" rx="190" ry="20" fill="#000" opacity=".16"/>
  <rect x="-170" y="-92" width="340" height="212" rx="30" fill="url(#gLeath)"/>
  <rect x="-170" y="-92" width="340" height="212" rx="30" fill="none" stroke="#4A2A14" stroke-width="5"/>
  <rect x="-150" y="-72" width="300" height="172" rx="20" fill="none" stroke="#E3B27A" stroke-width="3" stroke-dasharray="9 7" opacity=".85"/>
  <g>${[["#2F6FD0",-90,-40,-5],["#EF476F",-30,-52,3],["#F2B705",30,-44,-2]].map(([c,cx,cy,r])=>`<g transform="translate(${cx},${cy}) rotate(${r})"><rect x="-44" y="-30" width="88" height="56" rx="8" fill="${c}"/><rect x="-44" y="-18" width="88" height="12" fill="#14213A" opacity=".5"/><rect x="-34" y="4" width="34" height="6" rx="3" fill="#fff" opacity=".8"/></g>`).join("")}</g>
  ${[0,1,2,3].map(i=>note2(-20+i*8,-70-open*(46+i*20)-Math.sin(t*3+i)*3*open,0.62,-7+i*5)).join("")}
  <path d="M-170,-4 Q0,-30 170,-4 L170,100 Q170,120 150,120 H-150 Q-170,120 -170,100Z" fill="url(#gLeathF)"/>
  <path d="M-170,-4 Q0,-30 170,-4" fill="none" stroke="#4A2A14" stroke-width="5"/>
  <path d="M-152,12 Q0,-12 152,12 M-152,104 H152" fill="none" stroke="#F0CFA0" stroke-width="3" stroke-dasharray="9 7"/>
  <circle cx="-110" cy="62" r="22" fill="none" stroke="#6A3E20" stroke-width="3" opacity=".7"/><path d="M-120,62 H-100 M-110,52 V72" stroke="#6A3E20" stroke-width="3" opacity=".7"/>
  <g transform="translate(110,-8) rotate(${flap})"><path d="M-30,0 H30 L30,70 L0,92 L-30,70Z" fill="#6A3E20"/><path d="M-30,0 H30" stroke="#4A2A14" stroke-width="4"/><circle cx="0" cy="62" r="15" fill="url(#gSteel)" stroke="#6C7787" stroke-width="3"/><circle cx="-4" cy="58" r="4" fill="#fff" opacity=".8"/></g>
  <path d="M-170,-60 Q-168,-84 -130,-90" fill="none" stroke="#C99466" stroke-width="5" opacity=".7" stroke-linecap="round"/></g>`;
}
const cloud=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})" fill="#fff" opacity=".85"><ellipse cx="0" cy="0" rx="90" ry="34"/><ellipse cx="-40" cy="-22" rx="46" ry="34"/><ellipse cx="30" cy="-30" rx="56" ry="40"/></g>`;
function cityBG(t,k=0){
  const sky=[["#CFE8F7","#F3FAFF"],["#FBE3D2","#FFF4EA"],["#D8E3F5","#F1F5FC"]][k%3];
  let o=`<rect width="1080" height="1920" fill="${sky[0]}"/><rect width="1080" height="1000" fill="${sky[1]}" opacity=".6"/>`;
  for(let i=0;i<4;i++)o+=cloud(((i*340+t*16)%1500)-200,300+i*85,0.9+i*0.12);
  const r=rng(5);
  for(const [col,wc,base,hmin,hmax,step] of [["#C2D3E6","#DCE8F3",1450,240,520,92],["#A9BED6","#C9D9EA",1450,170,380,70]]){
    for(let x=-30;x<1120;x+=step){const h=hmin+r()*(hmax-hmin),w=step-8;o+=`<rect x="${x}" y="${base-h}" width="${w}" height="${h}" fill="${col}"/>`;
      for(let wy=base-h+24;wy<base-30;wy+=38)for(let wx=x+10;wx<x+w-16;wx+=26)o+=`<rect x="${wx}" y="${wy}" width="14" height="20" rx="2" fill="${r()>0.78?"#FFE9A8":wc}"/>`}}
  o+=`<rect y="1450" width="1080" height="470" fill="#CBD1D8"/><rect y="1450" width="1080" height="26" fill="#E3E7EC"/><rect y="1476" width="1080" height="6" fill="#000" opacity=".1"/><rect y="1700" width="1080" height="220" fill="#8C95A1"/>${[0,1,2,3,4,5].map(i=>`<rect x="${i*200+((t*40)%200)-200}" y="1800" width="110" height="14" rx="4" fill="#F3F5F7"/>`).join("")}`;
  return o;
}
function flatBld(x,y,s,o){
  o=o||{}; const lit=o.lit===undefined?0.3:o.lit; const r=rng(21);
  let w="";for(let f=0;f<5;f++)for(let c=0;c<4;c++){const wx=-150+c*80,wy=-330+f*130,on=r()<lit;w+=`<rect x="${wx-24}" y="${wy-8}" width="62" height="78" rx="4" fill="#fff"/><rect x="${wx-19}" y="${wy-3}" width="52" height="68" rx="3" fill="${on?"#FFE9A8":"url(#gGlass)"}"/><path d="M${wx+7},${wy-3} V${wy+65}" stroke="#fff" stroke-width="3"/>${f>0?`<rect x="${wx-28}" y="${wy+70}" width="70" height="10" rx="3" fill="#B0B8C4"/>`:""}`}
  return `<g transform="translate(${x},${y}) scale(${s})">${sh(240,16,0,330)}
  <rect x="-210" y="-380" width="420" height="720" rx="10" fill="url(#gWall)"/>${[0,1,2,3,4].map(f=>`<rect x="-210" y="${-266+f*130}" width="420" height="10" fill="#D4B48E"/>`).join("")}
  <rect x="-212" y="-392" width="424" height="24" rx="6" fill="#B8896A"/><rect x="100" y="-470" width="70" height="86" rx="8" fill="#8A94A6"/><rect x="95" y="-482" width="80" height="18" rx="6" fill="#6C7787"/>
  ${w}<rect x="-70" y="250" width="140" height="90" rx="8" fill="url(#gGlass)" stroke="#6C7787" stroke-width="6"/><path d="M0,250 V340" stroke="#6C7787" stroke-width="5"/><rect x="-100" y="214" width="200" height="30" rx="8" fill="${TEAL}"/>${plain("ഫ്ലാറ്റ്",0,238,24,"#fff")}</g>`;
}
function phoneSms(x,y,s,l1,l2,amt,col=CORAL){
  return `<g transform="translate(${x},${y}) scale(${s})">${sh(150,12,0,330)}<rect x="-150" y="-310" width="300" height="620" rx="42" fill="#1B2230"/><rect x="-138" y="-298" width="276" height="596" rx="32" fill="#F4F7FB"/><rect x="-50" y="-292" width="100" height="22" rx="11" fill="#1B2230"/>
  <text x="-120" y="-262" font-size="16" fill="${NAVY}" stroke="none" font-family="sans-serif" font-weight="800">9:41</text>
  <rect x="-122" y="-230" width="244" height="150" rx="20" fill="#fff" stroke="#DDE3EA" stroke-width="3"/><circle cx="-90" cy="-196" r="18" fill="${col}"/>${plain("₹",-90,-188,24,"#fff")}${plain(l1,-58,-192,22,NAVY,"start")}${plain(l2,-110,-146,24,"#6B7380","start")}<text x="108" y="-98" font-size="38" text-anchor="end" fill="${col}" stroke="none" font-family="sans-serif" font-weight="800">${amt}</text>
  <rect x="-122" y="-60" width="244" height="110" rx="20" fill="#fff" opacity=".6"/><rect x="-122" y="70" width="244" height="110" rx="20" fill="#fff" opacity=".4"/></g>`;
}
function loanDoc(x,y,s,rot,o){
  o=o||{};
  return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><rect x="-250" y="-330" width="500" height="680" rx="12" fill="#000" opacity=".12" transform="translate(8,12)"/><rect x="-250" y="-330" width="500" height="680" rx="12" fill="url(#gPaper)"/>
  <rect x="-250" y="-330" width="500" height="100" rx="12" fill="#2F6FD0"/><rect x="-250" y="-290" width="500" height="60" fill="#2F6FD0"/>
  <g transform="translate(-196,-282)"><path d="M-30,16 L0,-30 L30,16Z" fill="#fff"/><rect x="-26" y="18" width="52" height="8" fill="#fff"/>${[-18,0,18].map(a=>`<rect x="${a-4}" y="2" width="8" height="14" fill="#fff"/>`).join("")}</g>
  ${plain("ഹോം ലോൺ",30,-278,40,"#fff")}${plain("സാങ്ഷൻ ലെറ്റർ",30,-244,24,"#CFE0FA")}
  ${[["ലോൺ തുക","₹50,00,000"],["കാലാവധി","20 വർഷം"],["മാസ ഇഎംഐ","≈ ₹45,000"]].map((rw,i)=>{const a=clamp((o.t-o.t0-0.3-i*0.35)/0.3);return `<g opacity="${a}" transform="translate(${(1-a)*50},0)"><path d="M-210,${-118+i*110} H210" stroke="#E5E9EE" stroke-width="3"/>${plain(rw[0],-210,-150+i*110,26,"#6B7380","start")}${plain(rw[1],210,-142+i*110,38,i===2?CORAL:NAVY,"end")}</g>`}).join("")}
  <path d="M-200,230 q30,-50 60,-8 t60,-6 t50,10" fill="none" stroke="#1F3A8F" stroke-width="5" stroke-linecap="round"/><path d="M-210,248 H-30" stroke="#B9C0CB" stroke-width="3"/>
  <g transform="translate(130,220) rotate(-14)"><circle r="62" fill="none" stroke="${CORAL}" stroke-width="8"/><circle r="50" fill="none" stroke="${CORAL}" stroke-width="2.5"/>${plain("അംഗീകരിച്ചു",0,8,20,CORAL)}</g></g>`;
}
function chain(x1,y1,x2,y2,n,t){let o="";for(let i=0;i<n;i++){const p=i/(n-1);const x=lerp(x1,x2,p),y=lerp(y1,y2,p)+Math.sin(p*Math.PI)*34+Math.sin(t*5+i)*2;const a=Math.atan2(y2-y1,x2-x1)*180/Math.PI;o+=`<g transform="translate(${x},${y}) rotate(${a+(i%2?90:0)})"><rect x="-30" y="-17" width="60" height="34" rx="17" fill="none" stroke="#3A4252" stroke-width="15"/><rect x="-30" y="-17" width="60" height="34" rx="17" fill="none" stroke="url(#gSteel)" stroke-width="9"/></g>`}return o}
const padlock=(x,y,s,open=0)=>`<g transform="translate(${x},${y}) scale(${s})">${sh(60,8,0,66)}<path d="M-34,-20 V-44 Q-34,-84 0,-84 Q34,-84 34,-44 V${-20-open*30}" fill="none" stroke="url(#gSteel)" stroke-width="14" stroke-linecap="round" transform="translate(${open*18},0)"/><rect x="-52" y="-22" width="104" height="84" rx="16" fill="url(#gGold)" stroke="#B88400" stroke-width="4"/><circle cy="12" r="11" fill="#7A5600"/><rect x="-4" y="14" width="8" height="26" rx="3" fill="#7A5600"/><path d="M-48,-14 H-8 L-48,26Z" fill="#fff" opacity=".3"/></g>`;
const keysI=(x,y,s,rot)=>`<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><circle r="26" fill="none" stroke="url(#gSteel)" stroke-width="9"/><g transform="translate(0,26)"><rect x="-6" y="0" width="12" height="100" rx="4" fill="url(#gGold)"/><rect x="0" y="62" width="26" height="10" fill="#E0A800"/><rect x="0" y="82" width="20" height="10" fill="#E0A800"/><circle cy="-2" r="20" fill="url(#gGold)" stroke="#B88400" stroke-width="3"/><circle cy="-2" r="8" fill="#fff" opacity=".7"/></g><g transform="translate(34,18) rotate(24)"><rect x="-5" y="0" width="10" height="84" rx="4" fill="url(#gSteel)"/><rect x="0" y="52" width="22" height="9" fill="#8E9AAB"/><circle cy="0" r="17" fill="url(#gSteel)" stroke="#6C7787" stroke-width="3"/></g></g>`;
const person=(x,y,s,col,thumb)=>`<g transform="translate(${x},${y}) scale(${s})">${sh(50,8,0,120)}<path d="M-46,120 Q-50,40 0,34 Q50,40 46,120Z" fill="${col}"/><circle cy="-8" r="34" fill="#C28E67"/><path d="M-36,-14 Q-34,-52 0,-50 Q34,-52 36,-14 Q22,-30 0,-30 Q-22,-30 -36,-14Z" fill="#17100D"/><circle cx="-12" cy="-6" r="4" fill="#3B2A20"/><circle cx="12" cy="-6" r="4" fill="#3B2A20"/><path d="M-10,12 Q0,22 10,12" fill="none" stroke="#7A3B30" stroke-width="3" stroke-linecap="round"/>${thumb?`<g transform="translate(58,50) rotate(-20)"><rect x="-14" y="-10" width="28" height="30" rx="8" fill="#C28E67"/><rect x="-6" y="-34" width="12" height="28" rx="6" fill="#C28E67"/></g>`:""}</g>`;
const ENG={"ഇഎംഐ":"EMI","ഇഎംഐയിൽ":"EMI-യിൽ","ഇഎംഐയും":"EMI-യും","ലോൺ":"loan","ലോണും":"loan-ഉം","വാടക":"rent","വാടകയും":"rent-ഉം","ബാങ്ക്":"bank","സാലറി":"salary"};
function engw(txt){const m=txt.match(/^(.*?)([,.!?:;’‘"”“]*)$/);const core=m[1],tail=m[2];return (ENG[core]||core)+tail}
function engText(s){return String(s).split(" ").map(engw).join(" ")}
const LIME="#C8E64C", LIMED="#6E8A1E", CORL="#FF7A59";
const HLW=["അറുപത്","അൻപത്","ഇരുപത്","ലക്ഷം","പതിനയ്യായിരം","നാൽപ്പത്തിയയ്യായിരം","മുപ്പതിനായിരം","കോടികൾ","പത്ത്","പതിനഞ്ച്"];
const _cv=document.createElement("canvas").getContext("2d");
function tw(txt,fs,wt=800){_cv.font=`${wt} ${fs}px ML`;return _cv.measureText(txt).width}
function pill(text,x,y,col=CORAL,fs=44,tc="#fff"){text=engText(text);const w=tw(text,fs)+fs*0.9,h=fs*1.45;return `<g transform="translate(${x},${y})"><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="${h/2}" fill="${col}"/>${plain(text,0,fs*0.34,fs,tc)}</g>`}
function darkBG(t){let o=`<rect width="1080" height="1920" fill="#0D130E"/><rect width="1080" height="1920" fill="url(#gDark)"/>`;const off=(t*10)%54;for(let x=-54;x<1134;x+=54)o+=`<path d="M${x+off},0 V1920" stroke="#1B281D" stroke-width="2"/>`;for(let y=-54;y<1974;y+=54)o+=`<path d="M0,${y+off} H1080" stroke="#1B281D" stroke-width="2"/>`;return o+DEFS2}
const dCard=(x,y,w,h)=>`<g transform="translate(${x},${y})"><rect x="${-w/2+8}" y="${-h/2+12}" width="${w}" height="${h}" rx="30" fill="#000" opacity=".4"/><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="30" fill="#131B15" stroke="#26352A" stroke-width="3"/></g>`;
const dBar2=(x,y,w,h,f,col,label,val)=>`<g transform="translate(${x},${y})">${plain(label,0,-h/2-22,48,"#fff","start")}<rect x="0" y="${-h/2}" width="${w}" height="${h}" rx="18" fill="#1F2A21"/><rect x="0" y="${-h/2}" width="${Math.max(0,w*f)}" height="${h}" rx="18" fill="${col}"/>${f>0.28?`<text x="${w*f-26}" y="${h*0.16}" font-size="58" text-anchor="end" fill="#10160F" stroke="none" font-family="sans-serif" font-weight="800">${val}</text>`:""}</g>`;
const dSticker2=(x,y,rot,txt,sc)=>{const fs=124,w=tw(txt,fs)+90,h=fs*1.5;return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${sc})"><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="26" fill="${LIMED}" transform="translate(10,12)"/><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="26" fill="${LIME}"/><text x="0" y="${fs*0.36}" font-size="${fs}" text-anchor="middle" fill="#10160F" stroke="none" font-family="sans-serif" font-weight="800">${txt}</text></g>`};
function plain(text,x,y,fs,fill=NAVY,anchor="middle"){return `<text x="${x}" y="${y}" font-size="${fs}" text-anchor="${anchor}" fill="${fill}" stroke="none">${engText(text)}</text>`}

const badge=(n,x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})"><rect x="-150" y="-150" width="300" height="300" rx="56" fill="${LIMED}" transform="translate(10,12)"/><rect x="-150" y="-150" width="300" height="300" rx="56" fill="${LIME}"/><text x="0" y="72" font-size="220" text-anchor="middle" fill="#10160F" stroke="none" font-family="sans-serif" font-weight="800">${n}</text></g>`;
const bigTick=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})"><circle r="110" fill="${GREEN}"/><path d="M-50,0 L-14,40 L56,-44" fill="none" stroke="#fff" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/></g>`;
function shotFn(id,u,t,dur,tk){
  let bg="",mid="",fg="",cam={z:1,dx:Math.sin(t*0.9)*5,dy:Math.cos(t*0.7)*4,shake:0};
  const sH=SHOTS.find(s=>s.id===id), t0=sH.t0, tt=t-t0;
  const D1=(a,b,c)=>deskRoom(t,a||"#F5E7D2",b||"#FBEFD9",c||"#EAD7BD");
  const rm=(o,x=250)=>RAMU(x,1830,1.9,Object.assign({outfit:"casual",open:tk.open,blink:tk.blink},o),t);
  const fr=(o,x=250)=>FR(x,1830,1.9,Object.assign({open:tk.open,blink:tk.blink},o),t);
  const label=(txt,y=545,fs=44,col=NAVY)=>`<g transform="translate(540,${y}) scale(${back(clamp(tt/0.35))})">${pill(txt,0,0,col,Math.max(fs,44))}</g>`;
  const zoom=(a=1,b=1.06)=>{cam.z=lerp(a,b,ease(u))};
  const card=(h=520)=>{const pop=back(clamp(tt/0.45));return `<g transform="translate(0,${(1-pop)*60})" opacity="${clamp(tt/0.2)}">${dCard(540,640,900,h)}`};
  if(id==="shares700"){
    bg=darkBG(t);
    const v=Math.round(lerp(0,700,ease(clamp(tt/1.4))));
    mid+=dSticker2(540,720,-3,"~"+v,back(clamp(tt/0.5))*0.95);
    mid+=`<g transform="translate(540,1000) scale(${back(clamp((tt-0.4)/0.4))})"><circle r="84" fill="${LIME}"/><path d="M-30,10 L30,-30 M-30,10 L30,48 M30,-30 V48" stroke="#10160F" stroke-width="13" stroke-linecap="round" fill="none"/><circle cx="-34" cy="10" r="14" fill="#10160F"/><circle cx="34" cy="-30" r="14" fill="#10160F"/><circle cx="34" cy="48" r="14" fill="#10160F"/></g>`;
    mid+=label("shares",470,48,"#26352A");
    cam={z:lerp(1,1.05,ease(u)),dx:0,dy:0};
  } else if(id==="wonder"){
    bg=gfxBG(t,"#E8F2F8","#F4F9FC")+DEFS2;
    [[250,0],[430,1],[610,0],[790,1]].forEach(([x,th],i)=>{const a=back(clamp((tt-i*0.12)/0.4));mid+=`<g transform="translate(${x},1000) scale(${Math.max(0,a)*1.2})">${person(0,-100,1,[CORAL,TEAL,"#7A4FB0","#2F6FD0"][i],th)}</g><g transform="translate(${x+20},${760-(i%2)*60}) scale(${Math.max(0,back(clamp((tt-0.3-i*0.12)/0.4)))})"><circle r="52" fill="#fff"/>${plain("?",0,26,76,CORAL)}</g>`});
    zoom(1,1.05);
  } else if(id==="askRamu"){
    const d=D1(); bg=d.bg+DEFS2; fg+=d.fg;
    mid+=rm({ex:"thinking",L:[14,-6],R:[40,-110],gaze:{x:3,y:-3}},250);
    fg+=`<g transform="translate(730,740) scale(${back(clamp(tt/0.4))})"><rect x="-290" y="-150" width="580" height="290" rx="46" fill="#fff"/><circle cx="-230" cy="170" r="16" fill="#fff"/><circle cx="-268" cy="224" r="9" fill="#fff"/>${plain("വീട് എപ്പോൾ",0,-24,52,NAVY)}${plain("വാങ്ങണം?",0,46,60,CORAL)}</g>`;
    zoom(1.02,1.07);
  } else if(id==="missed"){
    bg=cityBG(t,1)+DEFS2;
    mid+=flatBld(800,880,1.0,{lit:0.4});
    mid+=fr({ex:"worried",L:[24,-90],R:[24,-90],gaze:{x:-2,y:2},brow:3},300);
    mid+=label("ഇത് നോക്കിയില്ല",470,44,CORAL);
    zoom(1.02,1.07);
  } else if(id==="three"){
    bg=gfxBG(t,"#E4F4EA","#F4FBF7")+DEFS2;
    [1,2,3].forEach((n,i)=>{const a=back(clamp((tt-i*0.18)/0.4));mid+=`<g transform="translate(540,${700+i*190}) scale(${Math.max(0,a)})"><rect x="-400" y="-70" width="800" height="140" rx="40" fill="#fff"/><circle cx="-320" cy="0" r="46" fill="#10160F"/>${plain(String(n),-320,22,64,LIME)}<rect x="-230" y="-18" width="330" height="36" rx="18" fill="#E5E9EE"/>${padlock(300,6,0.62,0)}${plain("?",190,24,70,"#B7C1CF")}</g>`});
    mid+=label("3 കാര്യങ്ങൾ",500,48,NAVY);
    zoom(1,1.05);
  } else if(id==="c1a"){
    bg=darkBG(t); mid+=badge(1,540,760,back(clamp(tt/0.45))*1.1);
    mid+=`<g transform="translate(540,1060) scale(${back(clamp((tt-0.2)/0.4))})">${pill("EMI ≤ 35%",0,0,"#26352A",60,"#fff")}</g><g transform="translate(540,1170) scale(${back(clamp((tt-0.5)/0.4))})">${pill("സാധാരണ പറയുന്ന കണക്ക്",0,0,"#1F2A21",44,"#C9D6C5")}</g>`; cam={z:lerp(1,1.05,ease(u)),dx:0,dy:0};
  } else if(id==="c1b"){
    bg=darkBG(t);
    const sf=ease(clamp(tt/0.7)), ef=ease(clamp((tt-0.4)/0.9))*0.5;
    mid+=card(520);
    mid+=`<g transform="translate(${130+820*0.35},0)"><path d="M0,440 V860" stroke="#fff" stroke-width="6" stroke-dasharray="14 10"/></g>`;
    mid+=dBar2(130,540,820,130,sf,LIME,"Take-home salary","100%");
    mid+=dBar2(130,760,820,130,ef,CORL,"EMI (ഉദാഹരണം)","50%");
    mid+=`</g>`;
    mid+=dSticker2(540,1010,-3,"35% limit",back(clamp((tt-1.2)/0.5))*0.5);
    cam={z:lerp(1,1.03,ease(u)),dx:0,dy:0};
  } else if(id==="c2a"){
    bg=darkBG(t); mid+=badge(2,540,760,back(clamp(tt/0.45))*1.1);
    mid+=`<g transform="translate(540,1060) scale(${back(clamp((tt-0.2)/0.4))})">${pill("Down payment + registration",0,0,"#26352A",48,"#fff")}</g>`; cam={z:lerp(1,1.05,ease(u)),dx:0,dy:0};
  } else if(id==="c2b"){
    bg=darkBG(t);
    mid+=card(520);
    for(let i=0;i<6;i++){const a=back(clamp((tt-0.1-i*0.28)/0.4));const x=290+(i%3)*250,y=520+Math.floor(i/3)*190;mid+=`<g transform="translate(${x},${y}) scale(${0.85+0.15*Math.min(1,a)})"><rect x="-105" y="-70" width="210" height="140" rx="26" fill="${a>0.6?LIME:"#1F2A21"}"/>${plain(String(i+1),0,26,76,a>0.6?"#10160F":"#4D6A3A")}</g>`}
    mid+=`</g>`;
    mid+=dSticker2(540,1010,-3,"6 months",back(clamp((tt-1.3)/0.5))*0.62);
    mid+=`<g transform="translate(540,1130) scale(${back(clamp((tt-1.6)/0.4))})">${pill("EMI ഉൾപ്പെടെ",0,0,"#1F2A21",44,"#C9D6C5")}</g>`;
    cam={z:lerp(1,1.03,ease(u)),dx:0,dy:0};
  } else if(id==="c3a"){
    bg=darkBG(t); mid+=badge(3,540,760,back(clamp(tt/0.45))*1.1);
    mid+=`<g transform="translate(540,1060) scale(${back(clamp((tt-0.2)/0.4))})">${pill("അവിടെ നിൽക്കാൻ സാധ്യത?",0,0,"#26352A",48,"#fff")}</g>`; cam={z:lerp(1,1.05,ease(u)),dx:0,dy:0};
  } else if(id==="c3b"){
    bg=darkBG(t);
    mid+=card(520);
    for(let i=0;i<5;i++){const a=back(clamp((tt-0.1-i*0.25)/0.4));const x=190+i*175;mid+=`<g transform="translate(${x},640)"><rect x="-70" y="-190" width="140" height="380" rx="26" fill="#1F2A21"/><rect x="-70" y="${190-380*Math.min(1,Math.max(0,a))}" width="140" height="${380*Math.min(1,Math.max(0,a))}" rx="26" fill="${LIME}"/>${plain(String(i+1),0,-210,44,"#8FA08B")}</g>`}
    mid+=`</g>`;
    mid+=dSticker2(540,1010,-3,"5 years",back(clamp((tt-1.3)/0.5))*0.62);
    cam={z:lerp(1,1.03,ease(u)),dx:0,dy:0};
  } else if(id==="allOk"){
    bg=gfxBG(t,"#E4F4EA","#F4FBF7")+DEFS2;
    [300,540,780].forEach((x,i)=>{mid+=bigTick(x,700,Math.max(0,back(clamp((tt-i*0.25)/0.4)))*0.9)});
    mid+=`<g transform="translate(540,1010) scale(${back(clamp((tt-0.7)/0.5))})"><path d="M-170,-30 L0,-170 L170,-30Z" fill="#C0583F"/><rect x="-140" y="-30" width="280" height="190" fill="#F6E3C6"/><rect x="-40" y="40" width="80" height="120" rx="8" fill="#8A5A36"/><rect x="-120" y="-6" width="64" height="64" rx="6" fill="url(#gGlass)"/><rect x="56" y="-6" width="64" height="64" rx="6" fill="url(#gGlass)"/></g>`;
    mid+=label("പരിഗണിക്കാം",500,48,GREEN);
    zoom(1,1.05);
  } else if(id==="rentKeys"){
    const d=D1("#F6EFE0","#FBF6EC","#E8DDC4"); bg=d.bg+DEFS2; fg+=d.fg;
    mid+=rm({ex:"smile",L:[10,-6],R:[62,-60],gaze:{x:3,y:-1}},250);
    fg+=`<g transform="translate(740,800) scale(${back(clamp(tt/0.4))})"><rect x="-230" y="-170" width="460" height="300" rx="40" fill="#fff"/>${keysI(-110,-30,1.0,0)}${plain("rent",70,-10,64,NAVY)}${plain("ഒരു വഴി",70,60,40,"#8A94A6")}</g>`;
    zoom(1.02,1.07);
  } else if(id==="sip"){
    bg=darkBG(t);
    const bars=[0.5,0.62,0.45,0.7,0.55,0.8,0.6,0.85];
    mid+=card(520)+plain("Invest",540,450,60,"#fff")+bars.map((b,i)=>{const h=300*b*clamp((tt-0.3-i*0.08)/0.4);return `<rect x="${140+i*100}" y="${850-h}" width="76" height="${h}" rx="12" fill="${i%2?LIME:"#4D6A3A"}"/>`}).join("")+plain("ഉദാഹരണ ചിത്രം",540,930,40,"#8FA08B")+`</g>`;
    fg+=`<g transform="translate(540,1070)">${plain("നഷ്ടസാധ്യതയുണ്ട് · വരുമാനം ഉറപ്പില്ല",0,0,44,"#C9D6C5")}</g>`;
    cam={z:lerp(1,1.03,ease(u)),dx:0,dy:0};
  } else if(id==="alsoCheck"){
    bg=gfxBG(t,"#E4F4EA","#F4FBF7")+DEFS2;
    [["പലിശ","Interest",WI(9,1)],["മെയിന്റനൻസ്","Maintenance",WI(9,2)],["ജോലി സ്ഥിരത","Job stability",WI(9,3)]].forEach(([ml,en,tin],i)=>{const a=back(clamp((t-tin)/0.4));mid+=`<g transform="translate(540,${690+i*165}) scale(${Math.max(0,a)})"><rect x="-400" y="-64" width="800" height="128" rx="40" fill="#fff"/>${bigTick(-320,0,0.36)}${plain(en,-240,20,56,NAVY,"start")}</g>`});
    mid+=label("ഇതും നോക്കണം",480,48,NAVY);
    zoom(1,1.05);
  } else if(id==="yourTurn"){
    const d=D1(); bg=d.bg+DEFS2; fg+=d.fg;
    mid+=rm({ex:"smile",L:[14,-6],R:[88,-125],gaze:{x:3,y:-1}},250);
    fg+=`<g transform="translate(730,780) scale(${back(clamp(tt/0.4))})"><rect x="-260" y="-110" width="520" height="220" rx="46" fill="#fff"/>${plain("നിങ്ങളോ?",0,28,84,CORAL)}</g>`;
    zoom(1.02,1.07);
  } else if(id==="choice"){
    bg=gfxBG(t,"#EAE6F8","#F6F3FC")+DEFS2;
    mid+=`<g transform="translate(300,950) scale(${back(clamp(tt/0.45))})"><rect x="-200" y="-230" width="400" height="460" rx="40" fill="#fff"/>${plain("Buy",0,150,64,NAVY)}<path d="M-120,-20 L0,-140 L120,-20Z" fill="#C0583F"/><rect x="-90" y="-20" width="180" height="120" fill="#F6E3C6"/><rect x="-24" y="30" width="48" height="70" rx="6" fill="#8A5A36"/></g>`;
    mid+=`<g transform="translate(780,950) scale(${back(clamp((tt-0.25)/0.45))})"><rect x="-200" y="-230" width="400" height="460" rx="40" fill="#fff"/>${keysI(0,-70,1.5,0)}${plain("Rent",0,150,64,NAVY)}</g>`;
    mid+=label("വാങ്ങാൻ പ്ലാനോ? വാടകയോ?",545,40,NAVY);
    zoom(1,1.05);
  } else if(id==="comments"){
    const d=D1(); bg=d.bg+DEFS2; fg+=d.fg;
    mid+=rm({ex:"smile",L:gestureL(t),R:[40,-100],gaze:{x:3,y:0}},250);
    ["Buy 🏠","Rent 🔑","Plan!"].forEach((w,i)=>{const a=back(clamp((tt-0.2-i*0.4)/0.4));mid+=`<g transform="translate(${700+(i%2)*10},${620+i*150}) scale(${Math.max(0,a)})"><rect x="-190" y="-52" width="380" height="104" rx="52" fill="#fff"/><circle cx="-140" cy="0" r="30" fill="${[CORAL,TEAL,"#7A4FB0"][i]}"/>${plain(w.replace(/ .*/,""),30,18,52,NAVY)}</g>`});
    zoom(1.02,1.07);
  } else if(id==="end"){
    const a=ease(clamp((t-SHOTS[SHOTS.length-1].t0)/0.5));
    bg=`<rect width="1080" height="1920" fill="${NAVY}"/>`;
    mid+=`<g opacity="${a}">`+outlined("ഒരു ഉദാഹരണം മാത്രം",540,640,72,"#fff",10)+outlined("ഉപദേശമല്ല",540,740,72,YEL,10)+plain("ഉദാഹരണ കണക്കുകളാണ്; EMI, rent, വരുമാനം, ടാക്സ്",540,900,34,"#fff")+plain("ഇവ വ്യക്തിക്കനുസരിച്ച് മാറും. SIP/മ്യൂച്വൽ ഫണ്ട്",540,950,34,"#fff")+plain("നിക്ഷേപം നഷ്ടസാധ്യതയ്ക്ക് വിധേയം, വരുമാനം ഉറപ്പില്ല.",540,1000,34,"#fff")+plain("തീരുമാനത്തിന് മുൻപ് വിദഗ്ധ ഉപദേശം തേടുക.",540,1050,34,"#fff")+outlined("ഫോളോ ചെയ്യൂ",540,1260,64,"#fff",8)+`</g>`;
    mid+=ramu(540,1760,0.7,{outfit:"casual",ex:"smile",open:0,blink:tk.blink,L:[10,-4],R:[110,-10],shadow:false});
  }
  return {bg,mid,fg,cam};
}
