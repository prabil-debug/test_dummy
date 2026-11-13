python3 - <<'PY'
h='\n'.join(open('../build9/index.html',encoding='utf8').read().split('\n')[:214])+'\n'
h=h.replace('cx="${x+(ex==="thinking"?3:0.8)}" cy="${ex==="thinking"?-5.5:-3}"','cx="${x+(ex==="thinking"?3:0.8)+GZ.x}" cy="${(ex==="thinking"?-5.5:-3)+GZ.y}"')
h=h.replace('<path d="${brow[0]}"','<path transform="translate(0,${BR})" d="${brow[0]}"').replace('<path d="${brow[1]}"','<path transform="translate(0,${BR})" d="${brow[1]}"')
p4=open('../build9/part4.js',encoding='utf8').read().split('\n')
seg=lambda a,b:'\n'.join(p4[a-1:b])+'\n'
cap=open('p10_cap.js',encoding='utf8').read()
old=''
tag='function TAGF(){const txt="ഒരു ഉദാഹരണം · ഉപദേശമല്ല",fs=26,w=tw(txt,fs)+fs*1.1,h=fs*1.55;return `<g transform="translate(540,305)"><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="${h/2}" fill="#1B2A41" opacity=".88"/>${plain(txt,0,fs*0.34,fs,"#fff")}</g>`}\n'

part=open('p10_top.js',encoding='utf8').read()+seg(17,23)+open('p10_shot.js',encoding='utf8').read()+cap+tag+seg(208,223)
part=part.replace('${isEnd?"":TAG}','${isEnd?"":TAGF()}')
part=part.replace('${DEFS}<g transform="${tf(bgz','${DEFS}${DEFS2}<g transform="${tf(bgz')
open('part10.js','w',encoding='utf8').write(part); open('index.html','w',encoding='utf8').write(h+part)
PY
