const { chromium } = require('playwright'); const fs=require('fs');
(async()=>{
  const words=JSON.parse(fs.readFileSync('words.json'));
  const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1920,height:1080}});
  await p.goto('file://'+process.cwd()+'/anim.html'); await p.evaluate(w=>window.setWords(w),words);
  const mode=process.argv[2];
  fs.mkdirSync('frames',{recursive:true});
  if(mode==='test'){
    for(const t of [1.0,3.5,5.5,7.0,11.0,14.0,16.5,17.2,19.5,21.5,23.0,25.0,27.0]){await p.evaluate(t=>window.render(t),t);await p.screenshot({path:`frames/test_${String(t).replace('.','_')}.jpg`,type:'jpeg',quality:88});}
  } else {
    const FPS=24,N=Math.round(29.4*FPS);
    for(let i=0;i<N;i++){await p.evaluate(t=>window.render(t),i/FPS);await p.screenshot({path:`frames/f${String(i).padStart(4,'0')}.jpg`,type:'jpeg',quality:92}); if(i%50===0)console.log('frame',i,'/',N,flush=true)}
  }
  await b.close();
})();
