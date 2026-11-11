const { chromium } = require('playwright'); const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1800,height:1300},deviceScaleFactor:1});
await p.goto('file://'+path.join(__dirname,'ramu_sheet_v3.html'));await p.waitForTimeout(500);await p.screenshot({path:path.join(__dirname,'ramu_sheet_v3.png')});await b.close();console.log('ok')})();
