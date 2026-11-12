const { chromium } = require('playwright'); const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1800,height:1100},deviceScaleFactor:1});
await p.goto('file://'+path.join(__dirname,'ramu_sheet.html'));await p.waitForTimeout(500);await p.screenshot({path:path.join(__dirname,'ramu_sheet_v2.png')});await b.close();console.log('ok')})();
