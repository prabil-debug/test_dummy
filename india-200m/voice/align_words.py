import json, re, numpy as np
from faster_whisper import WhisperModel
a=np.fromfile("india16k.f32",dtype="float32")
m=WhisperModel("tiny.en",compute_type="int8")
segs,_=m.transcribe(a,word_timestamps=True,language="en")
W=[(x.word.strip(),float(x.start),float(x.end)) for s in segs for x in s.words]
tl=json.load(open("india_raw_timeline.json"))
words=[]
for e in tl:
    if "text" not in e: continue
    sw=e["text"].split()
    lo,hi=e["start"]-0.25,e["end"]+0.25
    ww=[w for w in W if w[1]>=lo and w[2]<=hi+0.1]
    if ww: t0,t1=ww[0][1],ww[-1][2]
    else: t0,t1=e["start"],e["end"]
    t0=max(t0,e["start"]-0.05); t1=min(max(t1,t0+0.1),e["end"]+0.1)
    if len(ww)==len(sw): ts=[(w[1],w[2]) for w in ww]
    else:
        ch=np.array([max(len(re.sub(r"\W","",x)),1) for x in sw],float); cum=np.concatenate([[0],np.cumsum(ch)])/ch.sum()
        ts=[(t0+(t1-t0)*cum[i],t0+(t1-t0)*cum[i+1]) for i in range(len(sw))]
    for x,(b,c) in zip(sw,ts): words.append({"word":x,"start":round(float(b),3),"end":round(float(c),3),"sentence":e["text"][:40]})
json.dump(words,open("india_words.json","w"),indent=1)
exact=sum(1 for e in tl if "text" in e and len([w for w in W if w[1]>=e["start"]-0.25 and w[2]<=e["end"]+0.35])==len(e["text"].split()))
print("words",len(words),"script sentences",sum(1 for e in tl if "text" in e),"exact-count sentences",exact)
