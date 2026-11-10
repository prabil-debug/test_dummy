import sys, json, re, random, numpy as np
D = "/tmp/claude-0/-home-user-test-dummy/47e1ffcc-1af7-5e8e-bef1-43b065556665/scratchpad"
sys.path.insert(0, D + "/dl_tiny")
from indic_tiny_tts import TinyTTS
tts = TinyTTS(D + "/dl_tiny", device="cpu")
SR = 24000
SECTIONS = [
 ("hook","ആദ്യത്തെ ശമ്പളം, പതിനായിരം രൂപ. അത് എവിടെ പോയെന്ന് അറിയാമോ?"),
 ("s1","കോഴിക്കോട് സൈബർ പാർക്കിൽ ആദ്യമായി പണിക്ക് കയറി. വലിയ ഐഡിയ ഒന്നും ഇല്ലായിരുന്നു, എങ്ങനെയൊക്കെയോ പണി പഠിച്ചു."),
 ("s2","ശമ്പളം കിട്ടി. അച്ഛന് ഒരു മുണ്ട്, അമ്മയ്ക്ക് ഒരു ബാഗും സാരിയും."),
 ("s3","കയ്യിൽ നോക്കിയപ്പോൾ വലുതായിട്ടൊന്നും ബാക്കിയില്ല. എന്നാലും കുറച്ച് പൈസ ഹെൽത്ത് ഇൻഷുറൻസിന് മാറ്റി വെച്ചു. എപ്പോഴാ പണി വരികയെന്ന് അറിയില്ലല്ലോ."),
 ("s4","ബാക്കി പൈസ എന്ത് ചെയ്യണമെന്ന് ഒരു ഐഡിയയും ഇല്ല. ഇത്രയും പൈസ കയ്യിൽ കിട്ടുന്നത് ആദ്യമായിട്ടല്ലേ."),
 ("s5","പിന്നെ ഒന്നും നോക്കിയില്ല. ഫ്രണ്ട്സിനെയും കൂട്ടി നല്ലൊരു ബിരിയാണി അടിച്ചു."),
 ("close","അടുത്ത മാസം ഞാൻ ചെയ്തത് വേറെ ഒന്നാണ്. അടുത്ത വീഡിയോയിൽ പറയാം."),
 ("disc","ഇത് പൊതുവായ അറിവ് മാത്രം, ഉപദേശമല്ല."),
]
random.seed(11)
parts, tl, t = [], [], 0.0
def sil(sec):
    global t
    parts.append(np.zeros(int(sec*SR),dtype=np.float32)); t+=sec
sil(0.3)
for si,(sid,text) in enumerate(SECTIONS):
    sents=[s.strip() for s in re.findall(r"[^.?]+[.?]",text)]
    for k,s in enumerate(sents):
        w=np.asarray(tts.synthesize(s,voice="male",speed=1.15,seed=si*10+k),dtype=np.float32)
        tl.append({"sec":sid,"text":s,"start":round(t,3),"end":round(t+len(w)/SR,3)})
        parts.append(w); t+=len(w)/SR
        if k<len(sents)-1: sil(random.uniform(0.22,0.38))
    if si<len(SECTIONS)-1: sil(random.uniform(0.55,0.7))
sil(1.2)
wav=np.concatenate(parts)
tts.save_wav(wav,D+"/build2/narr_raw.wav")
json.dump({"total":round(t,3),"items":tl},open(D+"/build2/timeline.json","w"),ensure_ascii=False,indent=1)
# events derived from the timeline
first={}
for i in tl: first.setdefault(i["sec"],i["start"])
def sent(sec,k): return [i for i in tl if i["sec"]==sec][k]
g=sent("s2",1); gd=g["end"]-g["start"]
gifts=[round(g["start"]+gd*f,2) for f in (0.12,0.50,0.78)]
h=sent("s3",1); hd=h["end"]-h["start"]
coins=[round(h["start"]+hd*f,2) for f in (0.45,0.6,0.75)]
ev={"gifts":gifts,"coins":coins,"pop":[round(v,2) for k,v in first.items() if k!="hook"],
    "ding":gifts+coins,"click":[],"bill":sent("s3",2)["start"]}
json.dump(ev,open(D+"/build2/events.json","w"))
print("total",round(t,1),ev)
