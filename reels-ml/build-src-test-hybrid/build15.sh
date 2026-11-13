python3 - <<'PY'
h='\n'.join(open('../build9/index.html',encoding='utf8').read().split('\n')[:214])+'\n'
h=h.replace('@font-face{font-family:"ML";src:url("fonts/noto800.woff2") format("woff2");font-weight:800}','@font-face{font-family:"ML";src:url("fonts/anekml.woff2") format("woff2");font-weight:800;unicode-range:U+0D00-0D7F,U+200C-200D,U+20B9,U+25CC}@font-face{font-family:"ML";src:url("fonts/aneklat.woff2") format("woff2");font-weight:800;unicode-range:U+0000-00FF,U+2000-206F,U+2212}@font-face{font-family:"ML";src:url("fonts/aneklatext.woff2") format("woff2");font-weight:800;unicode-range:U+0100-02FF,U+20A0-20B8,U+20BA-20C0}')
h=h.replace('cx="${x+(ex==="thinking"?3:0.8)}" cy="${ex==="thinking"?-5.5:-3}"','cx="${x+(ex==="thinking"?3:0.8)+GZ.x}" cy="${(ex==="thinking"?-5.5:-3)+GZ.y}"')
h=h.replace('<path d="${brow[0]}"','<path transform="translate(0,${BR})" d="${brow[0]}"').replace('<path d="${brow[1]}"','<path transform="translate(0,${BR})" d="${brow[1]}"')
p4=open('../build9/part4.js',encoding='utf8').read().split('\n')
seg=lambda a,b:'\n'.join(p4[a-1:b])+'\n'
cap=open('p10_cap.js',encoding='utf8').read()
old=''
tag='function TAGF(){const txt="ഒരു ഉദാഹരണം · ഉപദേശമല്ല",fs=26,w=tw(txt,fs)+fs*1.1,h=fs*1.55;return `<g transform="translate(540,305)"><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="${h/2}" fill="#1B2A41" opacity=".88"/>${plain(txt,0,fs*0.34,fs,"#fff")}</g>`}\n'

part=open('p10_top.js',encoding='utf8').read()+seg(17,23)+open('p10_shot.js',encoding='utf8').read()+cap+tag+seg(208,223)
part=part.replace('${isEnd?"":TAG}','')
part=part.replace("await document.fonts.load('800 60px ML','ആദ്യ');","await document.fonts.load('800 60px ML','ആദ്യ');await document.fonts.load('800 60px ML','Rent EMI loan 0123');await document.fonts.load('800 60px ML','₹');")
part=part.replace('${DEFS}<g transform="${tf(bgz','${DEFS}${DEFS2}<g transform="${tf(bgz')
open('part10.js','w',encoding='utf8').write(part); open('index.html','w',encoding='utf8').write(h+part)
PY
