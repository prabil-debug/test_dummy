"""WHAT IF narration v3: phrase-group synthesis, variable (non-templated) pauses, prosody variation, silence budget.
usage: narrate3.py SCRIPT.md voice out.wav
Script markers: a line ending with [beat] gets a longer dramatic pause (use sparingly, 1-3 per video)."""
import os, sys, re, json, random, numpy as np, onnxruntime as ort, soundfile as sf
from kokoro_onnx.tokenizer import Tokenizer
script, voice, out = sys.argv[1], sys.argv[2], sys.argv[3]
rnd = random.Random(7)
PS = float(os.environ.get('PAUSE_SCALE','1.0'))  # optional: scale all non-final pauses (1.0 = original v3)
GS = 1.35; sr = 24000
tok = Tokenizer(); sess = ort.InferenceSession("model.onnx")
vs = np.fromfile(f"{voice}.bin", dtype=np.float32).reshape(-1,1,256)
SPOKEN = [("$21,500","twenty-one thousand five hundred dollars"),("1901","nineteen oh one"),("1970","nineteen seventy"),("2015","twenty fifteen"),("2018","twenty eighteen"),("2060s","twenty sixties"),("1.08","one point oh eight"),("1,700","seventeen hundred"),("1,500","fifteen hundred"),("1.46","one point four six"),("4.3","four point three"),("2,800","twenty-eight hundred"),("21,500","twenty-one thousand five hundred"),("20,000","twenty thousand"),("1.7","one point seven"),("2.3","two point three"),("2.1","two point one"),("1.9","one point nine")]
SPOKEN += [("1914","nineteen fourteen"),("2022","twenty twenty-two"),("2025","twenty twenty-five"),("2007","two thousand seven"),("2023","twenty twenty-three"),("2024","twenty twenty-four"),("424","four hundred and twenty-four")]
NAMES = [(r"\bRamayana\b","Raa-maa-yuh-nuh"),(r"\bRameswaram\b","Raa-may-shwuh-rum"),(r"\bSethusamudram\b","Say-too-suh-mood-rum"),(r"\bNagapattinam\b","Naa-guh-puh-ti-num"),(r"\bRam Setu\b","Raam Say-too"),(r"\bLord Ram\b","Lord Raam"),(r"\bPamban\b","Paam-bun"),(r"\bMannar\b","Muh-naar"),(r"\bChennai\b","Chen-eye"),(r"\bDhanushkodi\b","Dhuh-noosh-ko-dee"),(r"\bPalk\b","Pawk"),(r"\bEgmore\b","Egg-more"),(r"\bTalaimannar\b","Tuh-lie-muh-naar"),(r"\bCeylon\b","Say-lon"),(r"\bWuhan\b","Woo-hahn"),(r"\bMelbourne\b","Mel-bun"),(r"\bShanghai\b","Shang-hai")]
def spoken(t):
    for a,b in SPOKEN: t=t.replace(a,b)
    for a,b in NAMES: t=re.sub(a,b,t)
    return t
def synth(text, sp):
    ph=tok.phonemize(spoken(text),"en-us"); ids=tok.tokenize(ph)[:500]
    x=sess.run(None,{"input_ids":np.array([[0,*ids,0]],dtype=np.int64),"style":vs[min(len(ids),len(vs)-1)],"speed":np.array([sp*GS],dtype=np.float32)})[0].squeeze()
    nz=np.where(np.abs(x)>0.02*np.abs(x).max())[0]
    return x if len(nz)==0 else x[max(0,nz[0]-int(0.04*sr)):min(len(x),nz[-1]+int(0.06*sr))]
# parse
items=[]; section=None
for raw in open(script):
    line=raw.rstrip("\n")
    if line.startswith("## "): section=line[3:].strip(); items.append(("SECTION",section)); continue
    if line.startswith("#") or line.startswith(("Working title","Status","Markers")) or not line.strip(): continue
    if section is None: continue  # ignore any header notes before the first ## section
    beat=line.rstrip().endswith("[beat]"); line=line.replace("[beat]","").strip()
    ss=[x.strip() for x in re.split(r"(?<=[.!?])\s+",line) if x.strip()]
    for j,p in enumerate(ss): items.append(("S",p,section,beat and j==len(ss)-1))
# build chunks: merge consecutive short sentences (list-like) into one phrase group
chunks=[]; cur=None
for it in items:
    if it[0]=="SECTION":
        if cur: chunks.append(cur); cur=None
        chunks.append({"section_break":it[1]}); continue
    _,t,sec,beat=it; w=len(t.split())
    if cur and w<=6 and cur["words"]<=10 and len(cur["sents"])<3 and not cur["beat"] and not cur["sents"][-1].endswith("?"):
        cur["sents"].append(t); cur["words"]+=w; cur["beat"]=beat
    else:
        if cur: chunks.append(cur)
        cur={"sents":[t],"words":w,"section":sec,"beat":beat}
if cur: chunks.append(cur)
DRAMA=("But ","Here's the trap","So would","Now imagine")
SECTION_PAUSES=[0.75,0.95,0.8,1.1,0.85,1.0]
audio=[]; t=0.0; timeline=[]; pauses=[]; sec_i=0; phase=rnd.random()*6
real=[c for c in chunks if "sents" in c]
k=0
for idx,c in enumerate(chunks):
    if "section_break" in c:
        timeline.append({"section":c["section_break"],"start":round(t,3)}); continue
    text=" ".join(c["sents"]); w=c["words"]
    sp=1.0+0.04*np.sin(k*0.9+phase)+rnd.uniform(-0.015,0.015)
    if text.endswith("?"): sp*=0.96
    elif len(c["sents"])==1 and w<=4: sp*=0.92
    elif w>=18: sp*=1.04
    a=synth(text,sp); dur=len(a)/sr
    # next
    nxt=next((x for x in chunks[idx+1:]),None)
    if nxt is None: pause=2.0
    elif "section_break" in nxt:
        pause=SECTION_PAUSES[sec_i%len(SECTION_PAUSES)]*rnd.uniform(0.93,1.07); sec_i+=1
    else:
        nt=nxt["sents"][0]
        if c["beat"]: pause=rnd.uniform(1.15,1.4)
        elif text.endswith("?"): pause=rnd.uniform(0.5,0.7)
        elif nt.startswith(DRAMA): pause=rnd.uniform(0.55,0.8)
        elif len(c["sents"])==1 and w<=4: pause=rnd.uniform(0.42,0.6)
        else: pause=rnd.uniform(0.2,0.42)
    # approximate sentence times inside chunk by word share
    tot=sum(len(s.split()) for s in c["sents"]); tt=t
    for s in c["sents"]:
        d=dur*len(s.split())/tot
        timeline.append({"text":s,"section":c["section"],"start":round(tt,3),"end":round(tt+d,3),"chunk":k}); tt+=d
    timeline[-1]["pause_after"]=round(pause,3)
    if nxt is not None: pause*=PS
    audio+=[a,np.zeros(int(pause*sr),dtype=np.float32)]; t+=dur+pause; pauses.append(pause); k+=1
a=np.concatenate(audio); sf.write(out,a/max(1,abs(a).max()),sr)
json.dump(timeline,open(out.replace(".wav","_timeline.json"),"w"),indent=1)
dur=len(a)/sr; ps=np.array(pauses)
print(f"duration {dur:.1f}s | chunks {len(ps)} | silence share {100*ps.sum()/dur:.0f}% | distinct pause values {len(set(np.round(ps,2)))} | pauses>=1.0s: {(ps>=1.0).sum()} | longest {ps.max():.2f}s")
