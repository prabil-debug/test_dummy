const ENG={"ഇഎംഐ":"EMI","ഇഎംഐയിൽ":"EMI-യിൽ","ഇഎംഐയും":"EMI-യും","ലോൺ":"loan","ലോണും":"loan-ഉം","വാടക":"rent","വാടകയും":"rent-ഉം","ബാങ്ക്":"bank"};
function engw(txt){const m=txt.match(/^(.*?)([,.!?:;’‘"”“]*)$/);const core=m[1],tail=m[2];return (ENG[core]||core)+tail}
function captionHTML(t){
  const it=TL.items.find(i=>t>=i.start&&t<=i.end+0.25); if(!it) return "";
  const ws=it.words; const chunks=[]; let cur=[],len=0;
  for(const w of ws){const l=[...w.text].length; if(cur.length&&(len+l>36||cur.length>=6)){chunks.push(cur);cur=[];len=0} cur.push(w);len+=l+1}
  if(cur.length) chunks.push(cur);
  let ch=chunks[chunks.length-1]; for(let i=0;i<chunks.length;i++){const nxt=chunks[i+1]; if(!nxt||t<nxt[0].start-0.02){ch=chunks[i];break}}
  const lines=[[],[]]; let ll=0,li=0; for(const w of ch){const l=[...w.text].length; if(li===0&&ll+l>19&&lines[0].length){li=1;ll=0} lines[li].push(w);ll+=l+1}
  const longest=Math.max(...lines.map(a=>a.reduce((s,w)=>s+[...w.text].length+1,0)-1));
  const fs=Math.min(52,Math.floor(52*19/Math.max(19,longest)));
  const row=(arr,y)=>{ if(!arr.length) return "";
    const sp=tw(" ",fs), wd=arr.map(w=>tw(engw(w.text),fs)), total=wd.reduce((a,b)=>a+b,0)+sp*(arr.length-1);
    const padX=fs*0.5, h=fs*1.42; let x=540-total/2;
    let o=`<rect x="${540-total/2-padX}" y="${y-h/2}" width="${total+2*padX}" height="${h}" rx="${h*0.3}" fill="#0E1620" opacity=".9"/>`;
    arr.forEach((w,i)=>{const on=t>=w.start-0.02, hl=on&&HLW.some(k=>w.text.includes(k));
      if(hl) o+=`<rect x="${x-fs*0.14}" y="${y-h/2+h*0.13}" width="${wd[i]+fs*0.28}" height="${h*0.74}" rx="${h*0.2}" fill="${LIME}"/>`;
      o+=`<text x="${x}" y="${y+fs*0.33}" font-size="${fs}" fill="${hl?"#10160F":"#fff"}" fill-opacity="${on?1:0.5}" stroke="none">${engw(w.text)}</text>`; x+=wd[i]+sp});
    return o};
  return row(lines[0],1126)+row(lines[1],1206);
}
