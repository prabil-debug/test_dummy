"""Map faster-whisper word timings onto the script's own spelling. usage: align_words.py whisper_words.json narration_raw_timeline.json out_words.json"""
import json, re, sys, numpy as np
W=[tuple(x) for x in json.load(open(sys.argv[1]))]; tl=json.load(open(sys.argv[2]))
words=[]; exact=0; n=0
for e in tl:
    if "text" not in e: continue
    n+=1; sw=e["text"].split(); lo,hi=e["start"]-0.25,e["end"]+0.25
    ww=[w for w in W if w[1]>=lo and w[2]<=hi+0.1]
    if ww: t0,t1=ww[0][1],ww[-1][2]
    else: t0,t1=e["start"],e["end"]
    t0=max(t0,e["start"]-0.05); t1=min(max(t1,t0+0.1),e["end"]+0.1)
    if len(ww)==len(sw): ts=[(w[1],w[2]) for w in ww]; exact+=1
    else:
        ch=np.array([max(len(re.sub(r"\W","",x)),1) for x in sw],float); cum=np.concatenate([[0],np.cumsum(ch)])/ch.sum()
        ts=[(t0+(t1-t0)*cum[i],t0+(t1-t0)*cum[i+1]) for i in range(len(sw))]
    for x,(b,c) in zip(sw,ts): words.append({"word":x,"start":round(float(b),3),"end":round(float(c),3),"sentence":n-1})
json.dump(words,open(sys.argv[3],"w"),indent=1)
print("words",len(words),"sentences",n,"exact-count sentences",exact)
