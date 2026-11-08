import sys, re, json, numpy as np, onnxruntime as ort, soundfile as sf
from kokoro_onnx.tokenizer import Tokenizer
script, voice, out = sys.argv[1], sys.argv[2], sys.argv[3]
GS, PM, TEMPO = 1.35, 1.0, 1.0
tok = Tokenizer(); sess = ort.InferenceSession("model.onnx")
vs = np.fromfile(f"{voice}.bin", dtype=np.float32).reshape(-1,1,256)
segs=[]; section=None; prev_blank=True
for raw in open(script):
    line=raw.rstrip("\n")
    if line.startswith("## "): section=line[3:].strip(); segs.append(("SECTION",section)); continue
    if line.startswith("#") or line.startswith(("Working title","Status")) : continue
    if not line.strip(): continue
    segs.append(("LINE", re.sub(r"\s*VERIFY$","",line.strip())))
sr=24000; audio=[]; t=0.0; timeline=[]
def synth(text, sp):
    ph=tok.phonemize(text,"en-us"); ids=tok.tokenize(ph)[:500]
    st=vs[min(len(ids),len(vs)-1)]
    return sess.run(None,{"input_ids":np.array([[0,*ids,0]],dtype=np.int64),"style":st,"speed":np.array([sp*GS],dtype=np.float32)})[0].squeeze()
cur=None
lines=[s for s in segs]
for i,(kind,text) in enumerate(lines):
    if kind=="SECTION":
        cur=text; timeline.append({"section":text,"start":t/TEMPO}); continue
    # split long lines into sentences so pauses fall between them
    parts=[p.strip() for p in re.split(r"(?<=[.!?])\s+",text) if p.strip()]
    for k,p in enumerate(parts):
        words=len(p.split())
        sp=0.9 if words<=4 else (0.97 if p.endswith("?") else 1.0)
        x=synth(p,sp)
        last = (k==len(parts)-1)
        nxt = lines[i+1] if i+1<len(lines) else ("SECTION","end")
        pause = 0.35 if not last else 0.5
        if p.endswith("?"): pause=0.8
        if words<=4 and last: pause=0.65
        if last and nxt[0]=="SECTION": pause=1.1
        timeline.append({"text":p,"section":cur,"start":t/TEMPO,"end":(t+len(x)/sr)/TEMPO})
        audio+=[x, np.zeros(int(pause*PM*sr),dtype=np.float32)]
        t+=len(x)/sr+pause*PM
a=np.concatenate(audio); sf.write(out,a/max(1,abs(a).max()),sr)
json.dump(timeline,open(out.replace(".wav","_timeline.json"),"w"),indent=1)
print("raw",len(a)/sr,"final",len(a)/sr/TEMPO)
