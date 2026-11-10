const { chromium } = require('playwright'); const path=require('path');
(async()=>{const b=await chromium.launch();
 for(const [id,w,h] of [["a",1080,1080],["b",1080,1080],["c",1080,1080],["h1",1080,1920],["h2",1080,1920],["h3",1080,1920],["h4",1080,1920],["h5",1080,1920]]){
  const p=await b.newPage({viewport:{width:w,height:h}}); await p.goto('file://'+path.join(__dirname,'brand.html')); await p.evaluate(i=>window.show(i),id);
  await p.screenshot({path:path.join(__dirname,(id[0]==='h'?'highlight_':'avatar_')+id+'.png')}); await p.close(); console.log(id)}
 await b.close()})();
