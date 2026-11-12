python3 - <<'PY'
h='\n'.join(open('../build9/index.html',encoding='utf8').read().split('\n')[:214])+'\n'
h=h.replace('cx="${x+(ex==="thinking"?3:0.8)}" cy="${ex==="thinking"?-5.5:-3}"','cx="${x+(ex==="thinking"?3:0.8)+GZ.x}" cy="${(ex==="thinking"?-5.5:-3)+GZ.y}"')
h=h.replace('<path d="${brow[0]}"','<path transform="translate(0,${BR})" d="${brow[0]}"').replace('<path d="${brow[1]}"','<path transform="translate(0,${BR})" d="${brow[1]}"')
p4=open('../build9/part4.js',encoding='utf8').read().split('\n')
seg=lambda a,b:'\n'.join(p4[a-1:b])+'\n'
cap=seg(197,206).replace('const row=(arr,y)=>arr.length?`<text x="540" y="${y}" font-size="54"','const row=(arr,y)=>arr.length?`<text x="540" y="${y}" font-size="${Math.min(54,Math.floor(54*19/Math.max(19,arr.reduce((s,w)=>s+[...w.text].length+1,0)-1)))}"')
tag='const TAG=`<g transform="translate(540,335)"><rect x="-370" y="-30" width="740" height="82" rx="26" fill="#1B2A41" opacity=".82"/>${plain("ഒരു ഉദാഹരണം · ഉപദേശമല്ല",0,-2,30,"#fff")}${plain("പോളിസി നിബന്ധനകൾ വ്യത്യാസപ്പെടും",0,38,25,"#FFD98A")}</g>`;\n'
part=open('p7_top.js',encoding='utf8').read()+seg(17,23)+open('p7_shot.js',encoding='utf8').read()+cap+tag+seg(208,223)
part=part.replace('${DEFS}<g transform="${tf(bgz','${DEFS}${DEFS2}<g transform="${tf(bgz')
open('part7.js','w',encoding='utf8').write(part); open('index.html','w',encoding='utf8').write(h+part)
PY
