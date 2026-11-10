import sys, json, re, random, numpy as np
D = "/tmp/claude-0/-home-user-test-dummy/47e1ffcc-1af7-5e8e-bef1-43b065556665/scratchpad"
sys.path.insert(0, D + "/dl_tiny")
from indic_tiny_tts import TinyTTS
tts = TinyTTS(D + "/dl_tiny", device="cpu")
SR = 24000
SECTIONS = [
 ("hook", "മൂന്നാം മാസം, ശമ്പളം പതിനഞ്ചാം തീയതി തന്നെ തീർന്നു. പൈസ എവിടെ പോയി?"),
 ("s1", "അതുകൊണ്ട് ഒരു ഗൂഗിൾ ഷീറ്റ് ഉണ്ടാക്കി, ഓരോ ചെലവും എഴുതി. ഷീറ്റിൽ നാല് കോളം: തീയതി, എന്ത്, എത്ര, ആവശ്യമോ ആഗ്രഹമോ. കഴിഞ്ഞ മാസവും ഈ മാസവും താരതമ്യം ചെയ്തു."),
 ("s2", "വലിയ ചെലവൊന്നും ആയിരുന്നില്ല, കേട്ടോ. ചായ, ഓൺലൈൻ ഓർഡർ, സ്നാക്സ്. ചെറിയ ചെലവുകൾ കൂടിക്കൂടി വലുതായി."),
 ("s3", "വാടക, ഭക്ഷണം, യാത്ര ആവശ്യം. ബാക്കി പലതും ആഗ്രഹം. ആവശ്യം അൻപത്, ആഗ്രഹം മുപ്പത്, സേവിങ്സ് ഇരുപത്. ഇതൊരു പൊതുവായ രീതിയാണ്, എൻ്റെ ശമ്പളത്തിൽ അങ്ങനെ പറ്റില്ലായിരുന്നു."),
 ("s4", "ഏറ്റവും പ്രധാനം ഇതാണ്. മാസം അഞ്ഞൂറ് രൂപ ഞാൻ അപ്സ്കില്ലിങ്ങിന് മാറ്റി വെച്ചു, ഒരു ഓൺലൈൻ കോഴ്സിന്. ശമ്പളം കൂടണമെങ്കിൽ ഞാൻ വളരണം. കോഴ്സ് പഠിക്കുമ്പോൾ ജോലിയിൽ പുതിയ കാര്യങ്ങൾ ചെയ്യാൻ പറ്റും. പ്രമോഷൻ ഉറപ്പൊന്നുമില്ല, പക്ഷേ ശ്രമിക്കണം."),
 ("close", "അടുത്ത മാസം ശമ്പളം പതിനഞ്ചിന് തീർന്നില്ല. എഴുതി വെച്ചാൽ പൈസ എവിടെ പോകുന്നു എന്ന് കാണാം."),
 ("disc", "ഇത് ഒരു ഉദാഹരണം മാത്രം, ഉപദേശമല്ല."),
]
random.seed(31)
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
        w = np.asarray(tts.synthesize(s, voice="male", speed=1.15, seed=500 + si * 10 + k), dtype=np.float32)
        tl.append({"sec": sid, "text": s, "start": round(t, 2), "end": round(t + len(w)/SR, 2)})
        parts.append(w); t += len(w)/SR
        if k < len(sents) - 1: sil(random.uniform(0.25, 0.42))
    if si < len(SECTIONS) - 1: sil(random.uniform(0.7, 0.95))
sil(0.8)
wav = np.concatenate(parts)
tts.save_wav(wav, D + "/samples/reel007b_src.wav")
json.dump({"total": round(t, 2), "items": tl}, open(D + "/samples/reel007b_timeline.json", "w"), ensure_ascii=False, indent=1)
print("words", words, "total", round(t, 1), "s")
