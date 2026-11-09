// usage: node render.js timeline.json out_dir [stills|full] [fps]
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{
 const [tlp,out,mode='full',fpsA]=process.argv.slice(2);const fps=+fpsA||30;
 const raw=JSON.parse(fs.readFileSync(tlp));const TL=raw.filter(x=>x.text);
 const total=Math.max(...TL.map(x=>x.end))+2.0;
 fs.mkdirSync(out,{recursive:true});
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});
 await p.goto('file://'+path.resolve(__dirname,'anim.html'));
 await p.evaluate(([tl,t])=>setup(tl,t),[TL,total]);
 const times=mode==='stills'?[0.9,1.9,2.6,3.9,5.5,7.5,9.8,12.6,14.2,16.8,17.6,18.5,20.2,21.6,23.2,25.6,28.4]:Array.from({length:Math.round(total*fps)},(_,i)=>i/fps);
 let i=0;for(const t of times){await p.evaluate(t=>render(t),t);await p.screenshot({path:path.join(out,(mode==='stills'?'still_':'f_')+String(i++).padStart(5,'0')+'.jpg'),type:'jpeg',quality:92});}
 console.log('frames',i,'total',total.toFixed(2));await b.close();
})();
