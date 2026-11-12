import sys, json, re, random, numpy as np
D = "/tmp/claude-0/-home-user-test-dummy/47e1ffcc-1af7-5e8e-bef1-43b065556665/scratchpad"
sys.path.insert(0, D + "/dl_tiny")
from indic_tiny_tts import TinyTTS

tts = TinyTTS(D + "/dl_tiny", device="cpu")
SR = 24000
SECTIONS = [
    ("hook", "ആദ്യത്തെ ശമ്പളം കിട്ടി. പുതിയ ഫോൺ വാങ്ങാൻ തോന്നി. പക്ഷേ ഞാൻ വാങ്ങിയില്ല. എന്തിനെന്ന് അറിയാമോ?"),
    ("s1", "ശമ്പളത്തിൽ നിന്ന് കുറച്ച് മാറ്റി വെച്ച് ഞാൻ ഒരു ഹെൽത്ത് ഇൻഷുറൻസ് എടുത്തു. ആശുപത്രി ബിൽ പറഞ്ഞിട്ട് വരില്ലല്ലോ."),
    ("s2", "പിന്നെ ഓരോ മാസവും ചെറിയൊരു തുക മാറ്റി വെച്ചു. ചെറിയ തുകയാണ്, പക്ഷേ മുടക്കില്ല."),
    ("s3", "രണ്ട് മൂന്ന് മാസത്തെ ശമ്പളത്തിന് തുല്യമായപ്പോൾ അത് എൻ്റെ എമർജൻസി ഫണ്ട് ആയി. ഇനി അത്യാവശ്യം വന്നാൽ ആരുടെയും മുന്നിൽ കൈ നീട്ടേണ്ട."),
    ("s4", "ഫോൺ വേണ്ടേ? വേണം. പക്ഷേ ഇതിന് ശേഷം."),
    ("close", "ഇനിയാണ് ശരിക്കുള്ള ചോദ്യം: ബാക്കി പണം എന്ത് ചെയ്യും? അടുത്ത വീഡിയോയിൽ പറയാം."),
    ("disc", "ഇത് ഒരു ഉദാഹരണം മാത്രം, ഉപദേശമല്ല."),
]
random.seed(7)
parts, tl, t = [], [], 0.0
def add_silence(sec):
    global t
    parts.append(np.zeros(int(sec * SR), dtype=np.float32)); t += sec
add_silence(0.3)
for si, (sid, text) in enumerate(SECTIONS):
    sents = [s.strip() for s in re.findall(r"[^.?]+[.?]", text)]
    for k, s in enumerate(sents):
        w = np.asarray(tts.synthesize(s, voice="male", speed=1.15, seed=si * 10 + k), dtype=np.float32)
        tl.append({"sec": sid, "text": s, "start": round(t, 3), "end": round(t + len(w) / SR, 3)})
        parts.append(w); t += len(w) / SR
        if k < len(sents) - 1:
            add_silence(random.uniform(0.22, 0.38))
    if si < len(SECTIONS) - 1:
        add_silence(random.uniform(0.55, 0.7))
add_silence(1.2)
wav = np.concatenate(parts)
tts.save_wav(wav, D + "/build/narr_raw.wav")
json.dump({"total": round(t, 3), "items": tl}, open(D + "/build/timeline.json", "w"), ensure_ascii=False, indent=1)
print("total", round(t, 1), "s;", len(tl), "sentences")
for x in tl: print(x["sec"], x["start"], x["end"])
