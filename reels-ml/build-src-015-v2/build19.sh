# usage: VARIANT=anek|noto bash build17.sh  (writes index.html into $OUT)
python3 - <<'PY'
import os
V=os.environ['VARIANT']; OUT=os.environ['OUT']
N='fonts_v/'
def face(fam_url,w,rng): return f'@font-face{{font-family:"ML";src:url("{fam_url}") format("woff2");font-weight:{w};unicode-range:{rng}}}'
MAL='U+0D00-0D7F,U+200C-200D,U+20B9,U+25CC'; LAT='U+0000-00FF,U+2000-206F,U+2212'; LATX='U+0100-02FF,U+20A0-20B8,U+20BA-20C0'
css=''
for w in (600,800):
    if V=='anek':
        css+=face(f'{N}anekml{w}.woff2',w,MAL)+face(f'{N}aneklat{w}.woff2',w,LAT)+face(f'{N}aneklatx{w}.woff2',w,LATX)
    else:
        css+=face(f'{N}notoml{w}.woff2',w,MAL)+face(f'{N}poplat{w}.woff2',w,LAT)+face(f'{N}poplatx{w}.woff2',w,LATX)
h='\n'.join(open('../build9/index.html',encoding='utf8').read().split('\n')[:214])+'\n'
h=h.replace('cx="${x+(ex==="thinking"?3:0.8)}" cy="${ex==="thinking"?-5.5:-3}"','cx="${x+(ex==="thinking"?3:0.8)+GZ.x}" cy="${(ex==="thinking"?-5.5:-3)+GZ.y}"')
h=h.replace('<path d="${brow[0]}"','<path transform="translate(0,${BR})" d="${brow[0]}"').replace('<path d="${brow[1]}"','<path transform="translate(0,${BR})" d="${brow[1]}"')
old='@font-face{font-family:"ML";src:url("fonts/noto800.woff2") format("woff2");font-weight:800}'
assert old in h
h=h.replace(old,css)
p4=open('../build9/part4.js',encoding='utf8').read().split('\n')
seg=lambda a,b:'\n'.join(p4[a-1:b])+'\n'
cap=open('p12_cap.js',encoding='utf8').read()
part=open('p14_top.js',encoding='utf8').read()+seg(17,23)+open('p14_shot.js',encoding='utf8').read()+cap+seg(207,223)
part=part.replace('${isEnd?"":TAG}','')
part=part.replace('${isEnd?"":captionHTML(t)}','${isEnd?"":BAND+captionHTML(t)}')
part=part.replace('${DEFS}<g transform="${tf(bgz','${DEFS}${DEFS2}<g transform="${tf(bgz')
part=part.replace("await document.fonts.load('800 60px ML','ആദ്യ');","for(const w of [600,800]){await document.fonts.load(w+' 60px ML','ആദ്യ');await document.fonts.load(w+' 60px ML','Rent EMI loan 0123 date');await document.fonts.load(w+' 60px ML','₹')}")
open(OUT,'w',encoding='utf8').write(h+part)
PY
