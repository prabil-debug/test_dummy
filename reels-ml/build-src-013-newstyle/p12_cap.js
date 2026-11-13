const GOLD="#E8C14A";
const BAND=`<defs><linearGradient id="gBand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0A0F18" stop-opacity="0"/><stop offset=".22" stop-color="#0A0F18" stop-opacity=".82"/><stop offset=".5" stop-color="#0A0F18" stop-opacity=".94"/><stop offset="1" stop-color="#0A0F18" stop-opacity=".96"/></linearGradient></defs><rect x="0" y="1190" width="1080" height="730" fill="url(#gBand)"/>`;
function captionHTML(t){
  const it=TL.items.find(i=>t>=i.start&&t<=i.end+0.25); if(!it) return "";
  const ws=it.words; const chunks=[]; let cur=[],len=0;
  for(const w of ws){const l=[...w.text].length; if(cur.length&&(len+l>36||cur.length>=6)){chunks.push(cur);cur=[];len=0} cur.push(w);len+=l+1}
  if(cur.length) chunks.push(cur);
  let ch=chunks[chunks.length-1]; for(let i=0;i<chunks.length;i++){const nxt=chunks[i+1]; if(!nxt||t<nxt[0].start-0.02){ch=chunks[i];break}}
  const lines=[[],[]]; let ll=0,li=0; for(const w of ch){const l=[...w.text].length; if(li===0&&ll+l>19&&lines[0].length){li=1;ll=0} lines[li].push(w);ll+=l+1}
  const longest=Math.max(...lines.map(a=>a.reduce((s,w)=>s+[...w.text].length+1,0)-1));
  const fs=Math.min(60,Math.floor(60*19/Math.max(19,longest)));
  const row=(arr,y)=>{ if(!arr.length) return "";
    const isHL=w=>HLW.some(k=>w.text.includes(k));
    return `<text x="540" y="${y}" font-size="${fs}" text-anchor="middle" stroke="none">${arr.map((w,i)=>{const on=t>=w.start-0.02,hl=on&&isHL(w);return `<tspan font-weight="${isHL(w)?800:600}" fill="${hl?GOLD:"#F4F1E6"}" fill-opacity="${on?1:0.42}">${engw(w.text)}${i<arr.length-1?" ":""}</tspan>`}).join("")}</text>`};
  return row(lines[0],1338)+row(lines[1],1418);
}
