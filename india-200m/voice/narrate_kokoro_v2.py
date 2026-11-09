import sys, re, json, numpy as np, onnxruntime as ort, soundfile as sf
from kokoro_onnx.tokenizer import Tokenizer
script, voice, out = sys.argv[1], sys.argv[2], sys.argv[3]
GS = 1.35
tok = Tokenizer(); sess = ort.InferenceSession("model.onnx")
vs = np.fromfile(f"{voice}.bin", dtype=np.float32).reshape(-1,1,256)
SPOKEN = [("$21,500","twenty-one thousand five hundred dollars"),("1901","nineteen oh one"),("1970","nineteen seventy"),("2015","twenty fifteen"),
          ("2018","twenty eighteen"),("2060s","twenty sixties"),("1.08","one point oh eight"),("1,700","seventeen hundred"),("1,500","fifteen hundred"),
          ("1.46","one point four six"),("4.3","four point three"),("2,800","twenty-eight hundred"),("21,500","twenty-one thousand five hundred"),
          ("20,000","twenty thousand"),("1.7","one point seven"),("2.3","two point three"),("2.1","two point one"),("1.9","one point nine")]
def spoken(t):
    for a,b in SPOKEN: t=t.replace(a,b)
    return t
# parse into sentences with section info
items=[]; section=None
for raw in open(script):
    line=raw.rstrip("\n")
    if line.startswith("## "): section=line[3:].strip(); items.append(("SECTION",section)); continue
    if line.startswith("#") or line.startswith(("Working title","Status")) or not line.strip(): continue
    for p in [x.strip() for x in re.split(r"(?<=[.!?])\s+",line.strip()) if x.strip()]:
        items.append(("S",p,section))
sents=[i for i in items if i[0]=="S"]
sr=24000; audio=[]; t=0.0; timeline=[]; k=0; DRAMA=("But ","Here's the trap","So would","Now imagine","So, would")
def synth(text, sp):
    ph=tok.phonemize(spoken(text),"en-us"); ids=tok.tokenize(ph)[:500]
    st=vs[min(len(ids),len(vs)-1)]
    x=sess.run(None,{"input_ids":np.array([[0,*ids,0]],dtype=np.int64),"style":st,"speed":np.array([sp*GS],dtype=np.float32)})[0].squeeze()
    thr=0.02*np.abs(x).max(); nz=np.where(np.abs(x)>thr)[0]
    if len(nz)==0: return x
    a0=max(0,nz[0]-int(0.04*sr)); a1=min(len(x),nz[-1]+int(0.06*sr))
    return x[a0:a1]
# map each sentence to what follows it
nexts={}
seq=[x for x in items]
for idx,x in enumerate(seq):
    if x[0]!="S": continue
    nxt=seq[idx+1] if idx+1<len(seq) else None
    nexts[idx]=nxt
for idx,x in enumerate(seq):
    if x[0]=="SECTION": timeline.append({"section":x[1],"start":round(t,3)}); continue
    text=x[1]; w=len(text.split()); nxt=nexts[idx]
    sp=0.9 if w<=4 else (0.97 if text.endswith("?") else 1.0)
    a=synth(text,sp); dur=len(a)/sr
    # pause by meaning
    if nxt is None: pause=2.5
    elif nxt[0]=="SECTION": pause=1.6
    else:
        nt=nxt[1]; nw=len(nt.split())
        if text.endswith("?"): pause=0.8
        elif nt.startswith(DRAMA): pause=0.85
        elif w<=5 and nw<=5: pause=0.25
        elif w<=4: pause=0.65
        else: pause=0.45
    timeline.append({"text":text,"section":x[2],"start":round(t,3),"end":round(t+dur,3),"pause_after":pause})
    audio+=[a,np.zeros(int(pause*sr),dtype=np.float32)]; t+=dur+pause
a=np.concatenate(audio); sf.write(out,a/max(1,abs(a).max()),sr)
json.dump(timeline,open(out.replace(".wav","_timeline.json"),"w"),indent=1)
ps=[x["pause_after"] for x in timeline if "pause_after" in x]
print("duration",round(len(a)/sr,1),"sentences",len(ps),"pauses>0.4/min",round(sum(p>0.4 for p in ps)/(len(a)/sr/60),1))
