const { chromium } = require('playwright'); const fs=require('fs'); const path=require('path'); const D=__dirname;
(async()=>{const T0=+process.argv[2],T1=+process.argv[3];const tl=JSON.parse(fs.readFileSync(path.join(D,'timeline.json')));
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:1});
await p.goto('file://'+path.join(D,'index.html'));await p.evaluate(a=>window.init(a,{}),tl);
fs.rmSync(path.join(D,'frames'),{recursive:true,force:true});fs.mkdirSync(path.join(D,'frames'));
const n=Math.round((T1-T0)*30);for(let i=0;i<n;i++){await p.evaluate(t=>window.render(t),T0+i/30);await p.screenshot({path:path.join(D,'frames',`f${String(i).padStart(5,'0')}.jpg`),type:'jpeg',quality:90});if(i%60==0)console.log('frame',i,'/',n)}
console.log('done');await b.close()})();
