// ================= Style test: detailed original set (study room) =================
const DEFS2=`<defs>
<linearGradient id="wallG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F4E8D4"/><stop offset="1" stop-color="#DDCBAF"/></linearGradient>
<linearGradient id="wainG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CDB594"/><stop offset="1" stop-color="#B39873"/></linearGradient>
<linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6FA6D8"/><stop offset=".55" stop-color="#F5C48C"/><stop offset="1" stop-color="#F2A56C"/></linearGradient>
<linearGradient id="shaftG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFE3A8" stop-opacity=".55"/><stop offset="1" stop-color="#FFE3A8" stop-opacity="0"/></linearGradient>
<linearGradient id="curtG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#C46A57"/><stop offset=".22" stop-color="#E28D78"/><stop offset=".45" stop-color="#B85E4B"/><stop offset=".7" stop-color="#E28D78"/><stop offset="1" stop-color="#B85E4B"/></linearGradient>
<linearGradient id="floorG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CCA67E"/><stop offset="1" stop-color="#97714F"/></linearGradient>
<linearGradient id="deskG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C98F5C"/><stop offset="1" stop-color="#8C5F3E"/></linearGradient>
<linearGradient id="corkG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#D9B07F"/><stop offset="1" stop-color="#C39862"/></linearGradient>
<radialGradient id="lampG" cx=".5" cy=".3" r=".7"><stop offset="0" stop-color="#FFE9B0" stop-opacity=".55"/><stop offset="1" stop-color="#FFE9B0" stop-opacity="0"/></radialGradient>
<radialGradient id="vig" cx=".5" cy=".5" r=".78"><stop offset=".52" stop-color="#2A1A0A" stop-opacity="0"/><stop offset="1" stop-color="#2A1A0A" stop-opacity=".45"/></radialGradient>
<linearGradient id="bodyL" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".18"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient>
<pattern id="grain" width="256" height="256" patternUnits="userSpaceOnUse"><image href="__GRAIN__" width="256" height="256"/></pattern>
</defs>`;
function windowDraw(x,y,w,h){
  const r=rng(7); let sky=`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#skyG)"/><circle cx="${x+w*0.72}" cy="${y+h*0.62}" r="40" fill="#FFF0B8" opacity=".9"/>`;
  for(let i=0;i<9;i++){const bw=36+r()*40,bh=70+r()*130,bx=x+i*(w/9)-6;sky+=`<rect x="${bx}" y="${y+h-bh}" width="${bw}" height="${bh}" fill="${i%2?"#6B7A99":"#59688A"}"/>`;for(let k=0;k<6;k++)if(r()>0.5)sky+=`<rect x="${bx+6+(k%2)*16}" y="${y+h-bh+10+Math.floor(k/2)*22}" width="8" height="10" fill="#FFE49A"/>`}
  return `<g><rect x="${x-18}" y="${y-18}" width="${w+36}" height="${h+36}" rx="8" fill="#8B6A4B"/><rect x="${x-10}" y="${y-10}" width="${w+20}" height="${h+20}" rx="4" fill="#F6EEE0"/>${sky}<rect x="${x+w/2-6}" y="${y}" width="12" height="${h}" fill="#F6EEE0"/><rect x="${x}" y="${y+h*0.45}" width="${w}" height="10" fill="#F6EEE0"/><path d="M${x},${y} L${x+w*0.55},${y} L${x},${y+h*0.5}Z" fill="#fff" opacity=".16"/></g>`}
function curtain(x,y,w,h,flip){return `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#curtG)"/>${[0.2,0.45,0.7].map(p=>`<path d="M${x+w*p},${y} V${y+h}" stroke="#7A3A2C" stroke-width="3" opacity=".25"/>`).join("")}<rect x="${x-6}" y="${y-14}" width="${w+12}" height="14" rx="7" fill="#5B4130"/></g>`}
function shelfSet(x,y,t){
  let o=`<rect x="${x}" y="${y}" width="330" height="16" rx="4" fill="#8B6A4B"/><rect x="${x}" y="${y+16}" width="330" height="8" fill="#000" opacity=".12"/>`;
  const cols=["#E9B44C","#2F9AA6","#EF476F","#6A4C93","#5B8F5C","#D98E5B"];let bx=x+14;
  for(let i=0;i<6;i++){const bh=70+((i*37)%40);o+=`<rect x="${bx}" y="${y-bh}" width="30" height="${bh}" fill="${cols[i]}"/><rect x="${bx}" y="${y-bh}" width="8" height="${bh}" fill="#fff" opacity=".18"/>`;bx+=32}
  o+=`<g transform="translate(${x+250},${y})"><path d="M-26,0 L-20,-44 H20 L26,0Z" fill="#C46B4A"/><path d="M0,-44 Q-34,-92 -48,-130 Q-8,-102 0,-44Z" fill="#3F9B5E"/><path d="M0,-44 Q32,-98 58,-126 Q18,-92 0,-44Z" fill="#2E8650"/><path d="M0,-44 Q-6,-100 6,-146 Q16,-90 0,-44Z" fill="#4CB06D"/></g>`;
  o+=`<g transform="translate(${x+170},${y-48})"><ellipse rx="40" ry="34" fill="#F4A9B8"/><ellipse cx="-12" cy="-8" rx="14" ry="10" fill="#fff" opacity=".3"/><path d="M-22,-24 L-14,-40 L-6,-26Z" fill="#F4A9B8"/><rect x="-4" y="-34" width="8" height="4" rx="2" fill="#B8637A"/><circle cx="14" cy="-8" r="3" fill="#3B2A20"/><path d="M-40,2 q-14,4 -16,-10" fill="none" stroke="#F4A9B8" stroke-width="6" stroke-linecap="round"/><rect x="-34" y="28" width="12" height="14" rx="3" fill="#F4A9B8"/><rect x="18" y="28" width="12" height="14" rx="3" fill="#F4A9B8"/></g>`;
  return o}
function floorDraw(y0,lightPatch){
  let o=`<rect y="${y0}" width="1080" height="${1920-y0}" fill="url(#floorG)"/>`;
  for(let i=-8;i<=8;i++)o+=`<path d="M${540+i*50},${y0} L${540+i*210},1920" stroke="#00000020" stroke-width="3"/>`;
  for(let k=1;k<6;k++)o+=`<path d="M0,${y0+k*k*28} H1080" stroke="#00000014" stroke-width="3"/>`;
  o+=`<ellipse cx="560" cy="${y0+360}" rx="460" ry="150" fill="#B8553F"/><ellipse cx="560" cy="${y0+360}" rx="400" ry="124" fill="none" stroke="#F0C98A" stroke-width="8"/><ellipse cx="560" cy="${y0+360}" rx="300" ry="90" fill="none" stroke="#2F9AA6" stroke-width="8"/><ellipse cx="560" cy="${y0+360}" rx="170" ry="48" fill="#E9B44C" opacity=".55"/>`;
  if(lightPatch) o+=`<path d="M60,${y0+20} L430,${y0+20} L700,1920 L160,1920Z" fill="url(#shaftG)" opacity=".8"/>`;
  return o}
function lamp(x,y,t){return `<g transform="translate(${x},${y})"><path d="M-120,0 L-340,560 H400 L180,0Z" fill="url(#lampG)" opacity=".9"/><ellipse cx="0" cy="8" rx="46" ry="10" fill="#2A2A2E"/><path d="M0,0 L-30,-120 L40,-210" fill="none" stroke="#2A2A2E" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/><path d="M10,-232 L110,-198 L82,-146 L-12,-180Z" fill="#E9B44C"/><path d="M10,-232 L110,-198 L100,-188 L4,-222Z" fill="#fff" opacity=".35"/><ellipse cx="60" cy="-166" rx="26" ry="12" fill="#FFF1C4"/></g>`}
function mug(x,y,t){let st="";for(let i=0;i<3;i++){const p=((t*0.5+i*0.33)%1);st+=`<path d="M${x-14+i*14},${y-34} q-12,-26 0,-52 q12,-26 0,-52" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity="${0.55*(1-p)}" transform="translate(0,${-p*40})"/>`}
  return `<g><ellipse cx="${x}" cy="${y+36}" rx="64" ry="12" fill="#000" opacity=".18"/><path d="M${x-44},${y-30} H${x+44} L${x+38},${y+36} Q${x+36},${y+46} ${x+24},${y+46} H${x-24} Q${x-36},${y+46} ${x-38},${y+36}Z" fill="#F3F0E8"/><path d="M${x+44},${y-12} Q${x+84},${y-12} ${x+78},${y+18} Q${x+72},${y+34} ${x+40},${y+30}" fill="none" stroke="#F3F0E8" stroke-width="10"/><ellipse cx="${x}" cy="${y-30}" rx="44" ry="10" fill="#6B4228"/><path d="M${x-38},${y-26} H${x+38}" stroke="#2F9AA6" stroke-width="10" opacity=".9"/>${st}${gloss(`M${x-36},${y-26} h12 l-4 62 h-10Z`)}</g>`}
// ---- characters: 3/4 head and back view ----
function face34(ex,sk,open,blink){
  const c=SK[sk]; const talk=open>0.07; const w=6+open*4,h=open*11;
  const eN=blink?`<path d="M-17,-3 Q-7,-1 3,-3" fill="none" stroke="${INK}" stroke-width="2.8" stroke-linecap="round"/>`:`<ellipse cx="-7" cy="-3" rx="9.5" ry="7.6" fill="#fff"/><circle cx="-4" cy="-3" r="5.6" fill="#3B2A20"/><circle cx="-4" cy="-3" r="3" fill="#000"/><circle cx="-1.4" cy="-5.6" r="1.6" fill="#fff"/><path d="M-16.5,-3 Q-7,-12.5 2.5,-3" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`;
  const eF=blink?`<path d="M13,-3 Q19,-1 25,-3" fill="none" stroke="${INK}" stroke-width="2.8" stroke-linecap="round"/>`:`<ellipse cx="19" cy="-3" rx="6.4" ry="7.2" fill="#fff"/><circle cx="21.4" cy="-3" r="4.6" fill="#3B2A20"/><circle cx="21.4" cy="-3" r="2.5" fill="#000"/><circle cx="23.4" cy="-5.2" r="1.3" fill="#fff"/><path d="M12.6,-3 Q19,-11.5 25.4,-3" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`;
  const up=ex==="smile"?3:0;
  const mouth=talk?`<path d="M${6-w},${27-up} Q${8},${27-up+h*1.8+2} ${6+w},${27-up} Q8,${27-up-h*0.1-1} ${6-w},${27-up}Z" fill="#5A2A24"/>${open>0.3?`<path d="M${6-w*0.7},${27.4-up} Q8,${27-up} ${6+w*0.7},${27.4-up} L${6+w*0.6},${27-up+Math.min(4,h*0.55)} Q8,${27-up+Math.min(4,h*0.55)+1} ${6-w*0.6},${27-up+Math.min(4,h*0.55)}Z" fill="#fff"/>`:""}`:
    (ex==="smile"?`<path d="M-2,${25} Q8,${33} 18,${24}" fill="none" stroke="#7A3B30" stroke-width="2.7" stroke-linecap="round"/>`:`<path d="M0,${27} Q8,${29} 16,${27}" fill="none" stroke="#7A3B30" stroke-width="2.7" stroke-linecap="round"/>`);
  return `<g>
   <ellipse cx="-33" cy="6" rx="6" ry="10" fill="${c.d}"/><ellipse cx="-33" cy="6" rx="3" ry="6" fill="${c.l}" opacity=".5"/>
   <path d="M-34,-8 C-34,-42 -18,-47 4,-47 C26,-47 40,-36 40,-8 C40,14 30,36 8,44 C-16,42 -34,20 -34,-8Z" fill="${c.b}"/>
   <path d="M30,-40 C38,-32 41,-20 40,-8 C40,14 30,36 8,44 C20,30 26,8 26,-10 C26,-24 28,-34 30,-40Z" fill="${c.d}" opacity=".22"/>
   <path d="M-26,-10 C-28,-28 -24,-38 -16,-42" fill="none" stroke="${c.l}" stroke-width="5" opacity=".45" stroke-linecap="round"/>
   <path d="M-40,-4 C-52,-44 -26,-66 6,-66 C36,-66 54,-50 46,-8 C44,-22 36,-32 26,-36 C12,-44 -6,-42 -20,-36 C-30,-30 -38,-18 -40,-4Z" fill="#17100D"/>
   <path d="M-26,-36 C-12,-54 16,-54 36,-42" fill="none" stroke="#6A5A54" stroke-width="3" opacity=".5" stroke-linecap="round"/>
   <path d="M-40,-4 C-44,6 -42,14 -36,18 L-34,-2Z" fill="#17100D"/>
   <ellipse cx="-10" cy="16" rx="9" ry="6" fill="#E07A68" opacity=".3"/>
   ${eN}${eF}
   <path d="M-17,-21 Q-8,-25 1,-22" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/><path d="M12,-22 Q20,-25 29,-20" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>
   <path d="M12,-2 Q22,8 13,12" fill="none" stroke="${c.d}" stroke-width="2.2" stroke-linecap="round"/><path d="M7,13 Q12,15 16,12" fill="none" stroke="${c.d}" stroke-width="1.8" stroke-linecap="round"/>
   ${mouth}</g>`}
function headBack(sk){const c=SK[sk];return `<g><ellipse cx="-38" cy="4" rx="6" ry="10" fill="${c.d}"/><ellipse cx="38" cy="4" rx="6" ry="10" fill="${c.d}"/><path d="M-38,-8 C-38,-42 -21,-48 0,-48 C21,-48 38,-42 38,-8 C38,18 24,40 0,46 C-24,40 -38,18 -38,-8Z" fill="${c.b}"/><path d="M-44,-4 C-54,-48 -26,-68 0,-68 C26,-68 54,-48 44,-4 C42,16 30,30 22,34 C10,26 -10,26 -22,34 C-30,30 -42,16 -44,-4Z" fill="#17100D"/><path d="M-30,-40 C-10,-60 16,-58 34,-44" fill="none" stroke="#6A5A54" stroke-width="3" opacity=".5" stroke-linecap="round"/><path d="M-20,-10 C-8,-4 8,-4 20,-10" fill="none" stroke="#3A2A24" stroke-width="3" opacity=".6"/><path d="M0,-60 C-4,-30 -2,0 0,26" fill="none" stroke="#3A2A24" stroke-width="3" opacity=".5"/></g>`}
function ramuMid(x,y,sc,opt,view){
  const o=Object.assign({outfit:"casual",sk:"s2",ex:"neutral",open:0,blink:false,tilt:0,L:[8,-4],R:[8,-4],flip:false,tee:null,hold:null,shadow:false,sx:1,hx:0},opt||{});
  const c=SK[o.sk];
  const head=view==="back"?headBack(o.sk):(view==="3q"?face34(o.ex,o.sk,o.open,o.blink):face(o.ex,o.sk,o.open,o.blink));
  const torso=legsTorso(o,c);
  const back=view==="back"?`<path d="M-58,-446 Q-68,-440 -70,-412 L-62,-292 Q0,-278 62,-292 L70,-412 Q68,-440 58,-446 L20,-458 Q0,-446 -20,-458Z" fill="${o.tee||"#2F9AA6"}"/><path d="M-20,-458 Q0,-440 20,-458 L22,-450 Q0,-430 -22,-450Z" fill="#000" opacity=".2"/><path d="M0,-440 L0,-300" stroke="#000" stroke-width="3" opacity=".12"/>`:"";
  return `<g transform="translate(${x},${y}) scale(${o.flip?-sc:sc},${sc})">${legsTorso(o,c)}${back}<g opacity=".9"><path d="M-58,-446 Q-68,-440 -70,-412 L-62,-292 L-30,-292 L-34,-440Z" fill="url(#bodyL)"/></g>${arm(-1,o.L,o,c)}${arm(1,o.R,o,c)}
   <rect x="-13" y="-480" width="26" height="30" fill="${c.b}"/><path d="M-13,-472 Q0,-460 13,-472 L13,-480 L-13,-480Z" fill="${c.d}" opacity=".5"/>
   <g transform="translate(${o.hx},-470) rotate(${o.tilt}) translate(0,-42) scale(1.1)">${head}</g></g>`}
function pinboard(x,y,w,h,u,t){
  let o=`<g><rect x="${x-14}" y="${y-14}" width="${w+28}" height="${h+28}" rx="10" fill="#7A5638"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="url(#corkG)"/>`;
  const r=rng(9);for(let i=0;i<160;i++)o+=`<circle cx="${x+r()*w}" cy="${y+r()*h}" r="${1.5+r()*2.4}" fill="#9C7544" opacity=".5"/>`;
  return o}
function timelineBoard(x,y,w,h,u,t,lt){
  let o=pinboard(x,y,w,h,u,t); const bx=x+50,bw=w-100,by=y+h*0.46;
  o+=`<rect x="${bx-12}" y="${by-70}" width="${bw+24}" height="150" rx="6" fill="#FFFDF6"/><rect x="${bx-12}" y="${by-70}" width="${bw+24}" height="150" rx="6" fill="#000" opacity=".05"/><rect x="${bx+bw*0.45}" y="${by-84}" width="70" height="26" fill="#F3D27A" opacity=".85" transform="rotate(-4 ${bx+bw*0.45} ${by-84})"/>`;
  const X=(yr)=>bx+bw*yr/5;
  const red=ease(clamp(u*2.2)),grn=ease(clamp(u*2.2-1));
  o+=`<rect x="${X(0)}" y="${by-18}" width="${(X(3)-X(0))*red}" height="36" rx="18" fill="${CORAL}"/><rect x="${X(3)}" y="${by-18}" width="${(X(5)-X(3))*grn}" height="36" rx="18" fill="${GREEN}"/>`;
  for(let i=0;i<=5;i++)o+=`<path d="M${X(i)},${by+26} v16" stroke="${NAVY}" stroke-width="4"/>${plain(String(i),X(i),by+66,28,NAVY)}`;
  o+=plain("വർഷം",X(5)+8,by+66,22,"#6B7A8A","start");
  // star note at 3 years
  o+=`<g transform="translate(${X(3)},${by-130}) rotate(-5)"><rect x="-70" y="-44" width="140" height="88" fill="#FFE27A"/><rect x="-70" y="-44" width="140" height="88" fill="#000" opacity=".06"/>${star(-40,0,18,"#C99A07")}${plain("3 വർഷം",14,12,30,NAVY)}</g>`;
  // sticky notes below
  const notes=[["ഫോൺ","#FFD1DC",0.7],["യാത്ര","#CDEAC0",1.65],["പഠനം","#BFE3F7",2.6]];
  notes.forEach(([n,col,yr],i)=>{const a=back(clamp(lt*1.6-i*0.25));o+=`<g transform="translate(${X(yr)},${by+(i===1?215:160)}) rotate(${(i-1)*4}) scale(${a})"><rect x="-54" y="-42" width="108" height="84" fill="${col}"/><rect x="-54" y="-42" width="108" height="84" fill="#000" opacity=".05"/>${plain(n,0,11,30,NAVY)}</g>`});
  if(u>0.35) o+=`<g transform="translate(${(X(0)+X(3))/2},${by+250}) scale(${back((u-0.35)*3)})">${pill("ഇക്വിറ്റിയിൽ വേണ്ട ✗",0,0,CORAL,32)}</g>`;
  return o+`</g>`}
function laptopFront(x,y,s,screen){
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-470" y="-300" width="940" height="600" rx="34" fill="#252A33"/><rect x="-450" y="-280" width="900" height="560" rx="16" fill="#F7FAFD"/>${screen}<path d="M-450,-280 L-110,-280 L-450,90Z" fill="#fff" opacity=".08"/><rect x="-540" y="300" width="1080" height="46" rx="14" fill="#B7BEC9"/><rect x="-540" y="338" width="1080" height="14" rx="7" fill="#8E96A3"/></g>`}
// ---- shots ----
function buildShots(){SHOTS=[{id:"studyA",t0:0,t1:2.82},{id:"studyB",t0:2.82,t1:7.14},{id:"studyC",t0:7.14,t1:11}]}
function setBG(t,w){return `<rect width="1080" height="1920" fill="url(#wallG)"/><rect y="1180" width="1080" height="740" fill="url(#wainG)"/><rect y="1170" width="1080" height="16" fill="#F7EFE2"/><rect y="1186" width="1080" height="8" fill="#000" opacity=".12"/>`+windowDraw(70,520,300,420)+curtain(10,470,70,560)+curtain(360,470,70,560)+`<path d="M90,540 L370,540 L720,1180 L60,1180Z" fill="url(#shaftG)" opacity=".7"/>`+shelfSet(650,700,t)}
function shotFn(id,u,t,dur,tk){
  let bg="",mid="",fg="",cam={z:1,dx:0,dy:0,shake:0};
  if(id==="studyA"){
    bg=setBG(t);
    const noteA=back(clamp((t-0.3)/0.4));
    bg+=pinboard(690,760,340,270)+`<g transform="translate(860,900) rotate(-6) scale(${noteA})"><rect x="-120" y="-66" width="240" height="132" fill="#F7E3A6"/><rect x="-120" y="-66" width="240" height="132" fill="none" stroke="#C99A07" stroke-width="6"/>${star(-84,-22,22,"#C99A07",t*30)}${plain("ഗോൾഡൻ",18,-8,38,"#7A5A06")}${plain("റൂൾ",18,36,38,"#7A5A06")}</g><circle cx="860" cy="836" r="9" fill="${CORAL}"/>`;
    const turn=clamp((u-0.42)/0.12), view=u<0.5?"3q":"front";
    mid+=`<ellipse cx="520" cy="900" rx="420" ry="640" fill="url(#lampG)" opacity=".3"/>`;
    mid+=`<g transform="translate(480,0) scale(${1-0.3*Math.sin(Math.PI*turn)},1)">${ramuMid(0,2090,2.5,{ex:"smile",open:tk.open,blink:tk.blink,L:gestureL(t),R:gestureR(t,1),tilt:Math.sin(t*1.1)*2,hx:view==="3q"?4:0},view)}</g>`;
    fg+=`<rect y="1340" width="1080" height="580" fill="url(#deskG)"/><rect y="1326" width="1080" height="34" fill="#E3BC92"/><path d="M0,1560 H1080 M0,1760 H1080" stroke="#00000022" stroke-width="4"/><rect x="420" y="1600" width="240" height="26" rx="10" fill="#5E3A22"/>`;
    fg+=`<g transform="translate(890,1330)">${lamp(0,0,t).replace(/M-120,0 L-340,560 H400 L180,0Z/,"M-60,0 L-280,420 H300 L120,0Z")}</g>`;
    fg+=mug(180,1320,t)+`<g transform="translate(600,1332)"><rect x="-120" y="-10" width="240" height="22" rx="6" fill="#F3EEE2"/><rect x="-110" y="-26" width="220" height="20" rx="4" fill="#FFFDF6"/><path d="M-90,-18 H90" stroke="#C9B88A" stroke-width="3"/><g transform="translate(70,-30) rotate(-20)"><rect x="-4" y="-50" width="8" height="70" rx="4" fill="#2F6FD0"/></g></g>`;
    fg+=`<g transform="translate(40,1340)"><path d="M0,0 Q40,-150 150,-220 Q70,-110 0,0Z" fill="#2E7A4F"/><path d="M0,0 Q20,-190 70,-300 Q-10,-170 0,0Z" fill="#3F9B5E"/></g>`;
    cam={z:lerp(1.0,1.08,ease(u)),dx:lerp(0,-22,u),dy:0};
  } else if(id==="studyB"){
    bg=setBG(t); bg=bg.replace(/<rect y="1180"/,'<rect y="1180"');
    const lt=t-2.82;
    bg+=timelineBoard(430,640,620,520,u,t,lt);
    bg+=floorDraw(1180,true);
    mid+=`<g transform="translate(250,0)">${ramuMid(0,2020,2.5,{L:[18,-30],R:[12,-70],tilt:Math.sin(t*0.8)*2.5,hx:0},"back")}</g>`;
    mid+=`<ellipse cx="540" cy="1060" rx="320" ry="520" fill="url(#lampG)" opacity=".25"/>`;
    cam={z:lerp(1.0,1.14,ease(u)),dx:lerp(40,-70,ease(u)),dy:lerp(0,-20,u)};
  } else if(id==="studyC"){
    bg=`<rect width="1080" height="1920" fill="url(#wallG)"/><rect y="1180" width="1080" height="740" fill="url(#wainG)"/>`+curtain(10,470,70,560)+windowDraw(70,520,300,420)+lamp(130,1000,t).replace('opacity=".9"','opacity=".6"');
    const p=ease(clamp(u*1.05));
    let scr=`<rect x="-450" y="-280" width="900" height="560" fill="#F5F8FC"/><rect x="-450" y="-280" width="900" height="64" fill="#2F6FD0"/>${plain("മാർക്കറ്റ്",-400,-232,30,"#fff","start")}`;
    for(let i=0;i<5;i++)scr+=`<path d="M-430,${-170+i*95} H430" stroke="#E3E8EF" stroke-width="3"/>`;
    // chart line morphs into coaster
    const pts=[];for(let i=0;i<=40;i++){const x=-400+i*20;const hill=-60-110*Math.sin(i/5.2)-i*2.2;pts.push([x,hill+60])}
    const upto=Math.floor(41*clamp(u*1.3));let d="";pts.slice(0,Math.max(2,upto)).forEach((q,i)=>d+=(i?"L":"M")+q[0]+","+q[1]+" ");
    scr+=`<path d="${d}" fill="none" stroke="#6B4F3A" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#C9A37E" stroke-width="5" stroke-linecap="round" transform="translate(0,-6)"/>`;
    const ci=Math.min(40,Math.max(0,upto-1)),cp=pts[ci];scr+=`<g transform="translate(${cp[0]},${cp[1]-34})"><rect x="-44" y="-16" width="88" height="34" rx="10" fill="${CORAL}"/><circle cx="-14" cy="-30" r="14" fill="${SK.s2.b}"/><circle cx="14" cy="-30" r="14" fill="${SK.s3.b}"/></g>`;
    scr+=`<g transform="translate(0,-200)">${pill("മാർക്കറ്റ് = റോളർ കോസ്റ്റർ",0,0,NAVY,32)}</g>`;
    mid+=laptopFront(540,860,1.0,scr);
    mid+=`<ellipse cx="540" cy="850" rx="520" ry="400" fill="url(#lampG)" opacity=".18"/>`;
    fg+=`<rect y="1196" width="1080" height="724" fill="url(#deskG)"/><rect y="1186" width="1080" height="26" fill="#E3BC92"/><path d="M0,1560 H1080 M0,1780 H1080" stroke="#00000022" stroke-width="4"/>`;
    fg+=`<g transform="translate(470,1330)"><path d="M-330,0 H330 L360,170 H-360Z" fill="#2A2F38"/>${Array.from({length:4}).map((_,r)=>Array.from({length:12}).map((_,c)=>`<rect x="${-310+c*52+r*6}" y="${14+r*38}" width="44" height="30" rx="6" fill="#3A404C"/>`).join("")).join("")}</g>`;
    fg+=`<g transform="translate(830,1420)"><ellipse cx="0" cy="40" rx="70" ry="14" fill="#000" opacity=".2"/><path d="M-50,30 Q-52,-40 0,-48 Q52,-40 50,30 Q0,50 -50,30Z" fill="#E6E9EE"/><path d="M-4,-46 V-4" stroke="#B7BEC9" stroke-width="4"/><g transform="translate(0,-20) rotate(8)"><path d="M-60,40 Q-80,-60 -40,-130 Q0,-170 50,-130 Q90,-60 60,40Z" fill="${SK.s2.b}"/><path d="M-30,-130 L-34,-190 Q-30,-205 -20,-190 L-14,-130Z M-6,-134 L-6,-204 Q0,-218 8,-204 L10,-134Z M18,-130 L24,-196 Q32,-206 38,-192 L38,-126Z" fill="${SK.s2.b}"/><path d="M20,-120 Q60,-60 60,40 L30,40Z" fill="${SK.s2.d}" opacity=".35"/></g></g>`;
    fg+=mug(130,1330,t)+`<g transform="translate(160,1560) rotate(-8)"><rect x="-120" y="-14" width="240" height="190" rx="8" fill="#E9B44C"/><rect x="-100" y="-14" width="16" height="190" fill="#C99A38"/><rect x="-60" y="10" width="150" height="130" fill="#FFF8E8"/><path d="M-48,34 H78 M-48,58 H62 M-48,82 H72" stroke="#C9B88A" stroke-width="4"/></g>`;
    cam={z:lerp(1.0,1.3,ease(u)),dx:lerp(0,-10,u),dy:lerp(0,-60,u)};
  }
  return {bg,mid,fg,cam};
}
function render(t){
  const svg=document.getElementById("s");
  if(!SHOTS.length) buildShots();
  let sh_=SHOTS[SHOTS.length-1]; for(const s of SHOTS){ if(t>=s.t0&&t<s.t1){sh_=s;break} }
  const dur=Math.max(0.5,sh_.t1-sh_.t0), u=clamp((t-sh_.t0)/dur), tk=talk(t);
  const r=shotFn(sh_.id,u,t,dur,tk); const c=r.cam;
  const tf=(z,dx,dy)=>`translate(${540+dx},${960+dy}) scale(${z}) translate(-540,-960)`;
  const gx=(Math.floor(t*30)*97)%256, gy=(Math.floor(t*30)*61)%256;
  svg.innerHTML=`${DEFS}${DEFS2}<g transform="${tf(1+(c.z-1)*0.5,c.dx*0.5,c.dy*0.5)}">${r.bg}</g><g transform="${tf(c.z,c.dx,c.dy)}">${r.mid}</g><g transform="${tf(c.z*1.05,c.dx*1.4,c.dy*1.25)}">${r.fg}</g><rect width="1080" height="1920" fill="url(#vig)"/><rect width="1080" height="1920" fill="url(#grain)" opacity=".22" transform="translate(${-gx},${-gy})" style="mix-blend-mode:overlay"/>${TAG}${captionHTML(t)}`;
}
window.init=async(tl,ev)=>{TL=tl;EV=ev;ENV=tl.env;SHOTS=[];await document.fonts.load('800 60px ML','ആദ്യ');await document.fonts.ready;};
window.render=render;
</script></body></html>
