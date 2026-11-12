import sys, json, re, random, numpy as np
D = "/tmp/claude-0/-home-user-test-dummy/47e1ffcc-1af7-5e8e-bef1-43b065556665/scratchpad"
sys.path.insert(0, D + "/dl_tiny")
from indic_tiny_tts import TinyTTS
tts = TinyTTS(D + "/dl_tiny", device="cpu")
SR = 24000
SECTIONS = [
 ("hook", "രണ്ടാം മാസത്തെ ശമ്പളം കിട്ടിയപ്പോൾ ഞാൻ ബിരിയാണി വാങ്ങിയില്ല. പകരം വേറൊരു കാര്യം ചെയ്തു."),
 ("s1", "ശമ്പളം കിട്ടിയ ദിവസം തന്നെ കുറച്ച് പൈസ മാറ്റി വെച്ചു. ചെലവാക്കുന്നതിന് മുമ്പ്. ബാക്കി വരുന്നത് മാറ്റി വെക്കാമെന്ന് വിചാരിച്ചാൽ, ഒന്നും ബാക്കി വരില്ല."),
 ("s2", "ഒരു അത്യാവശ്യം വന്നാൽ ആരോടും ചോദിക്കാതെ എടുക്കാൻ ഒരു പൈസ. അതാണ് എമർജൻസി ഫണ്ട്. ജോലി പോയാലും, ആശുപത്രിയിൽ പോകേണ്ടി വന്നാലും, വണ്ടി കേടായാലും, ഇത് ഒരു സമാധാനമാണ്."),
 ("s3", "എത്ര വേണം? പൊതുവേ പറയുന്നത് മൂന്ന് മുതൽ ആറ് മാസത്തെ ചെലവ്. ഞാൻ തുടങ്ങിയത് ഒരു മാസത്തെ ചെലവിൽ നിന്നാണ്. ചെറുതായി തുടങ്ങിയാൽ മതി. പക്ഷേ മുടക്കരുത്."),
 ("s4", "ഈ പൈസ വേറെ ഒരു അക്കൗണ്ടിൽ ഇട്ടു. ഫോൺ വാങ്ങാനും ബിരിയാണി അടിക്കാനും എടുക്കില്ല, കേട്ടോ. ആവശ്യം വന്നാൽ ഉടനെ എടുക്കാൻ പറ്റണം, അതാണ് ഇതിൻ്റെ കാര്യം."),
 ("s5", "കുറച്ച് മാസം കഴിഞ്ഞപ്പോൾ ബൈക്ക് കേടായി. ആരോടും കടം ചോദിക്കേണ്ടി വന്നില്ല. അന്ന് തോന്നി, ആ ബിരിയാണി ഒഴിവാക്കിയത് നന്നായെന്ന്."),
 ("close", "ഒരു ബിരിയാണി കുറവ്. ഒരു ടെൻഷൻ കുറവ്."),
 ("disc", "ഇത് ഒരു ഉദാഹരണം മാത്രം, ഉപദേശമല്ല."),
]
random.seed(21)
parts, tl, t = [], [], 0.0
def sil(sec):
    global t
    parts.append(np.zeros(int(sec*SR), dtype=np.float32)); t += sec
sil(0.2)
words = 0
for si, (sid, text) in enumerate(SECTIONS):
    sents = [s.strip() for s in re.findall(r"[^.?:]+[.?:]", text)]
    for k, s in enumerate(sents):
        words += len(s.split())
        w = np.asarray(tts.synthesize(s, voice="male", speed=1.15, seed=300 + si * 10 + k), dtype=np.float32)
        tl.append({"sec": sid, "text": s, "start": round(t, 2), "end": round(t + len(w)/SR, 2)})
        parts.append(w); t += len(w)/SR
        if k < len(sents) - 1: sil(random.uniform(0.25, 0.42))
    if si < len(SECTIONS) - 1: sil(random.uniform(0.7, 0.95))
sil(0.8)
wav = np.concatenate(parts)
tts.save_wav(wav, D + "/samples/reel006b_src.wav")
json.dump({"total": round(t, 2), "items": tl}, open(D + "/samples/reel006b_timeline.json", "w"), ensure_ascii=False, indent=1)
print("words", words, "total", round(t, 1), "s")
