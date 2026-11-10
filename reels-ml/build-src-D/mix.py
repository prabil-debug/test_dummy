import json, subprocess, numpy as np, soundfile as sf
D = "/tmp/claude-0/-home-user-test-dummy/47e1ffcc-1af7-5e8e-bef1-43b065556665/scratchpad/build2"
SR = 48000
subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", D + "/narr_raw.wav", "-af", "highpass=f=70,acompressor=threshold=-24dB:ratio=3:attack=5:release=80:makeup=3", "-ar", str(SR), "-ac", "1", D + "/narr48.wav"], check=True)
voice, _ = sf.read(D + "/narr48.wav", dtype="float32")
if voice.ndim > 1: voice = voice[:, 0]
tl = json.load(open(D + "/timeline.json")); ev = json.load(open(D + "/events.json"))
N = int(tl["total"] * SR) + SR // 2
out = np.zeros(N, dtype=np.float32)
t = np.arange(N) / SR

# soft original pad (own synthesis, no samples): slow chord loop C - Am - F - G
chords = [[261.63, 329.63, 392.0], [220.0, 261.63, 329.63], [174.61, 220.0, 261.63], [196.0, 246.94, 293.66]]
bed = np.zeros(N, dtype=np.float32)
seg = 8.0
for i, ch in enumerate(chords * 6):
    a, b = int(i * seg * SR), int(min(N, (i + 1) * seg * SR))
    if a >= N: break
    tt = t[a:b] - t[a]
    env = np.minimum(1, tt / 2.0) * np.minimum(1, (seg - tt) / 2.0)
    s = np.zeros(b - a, dtype=np.float32)
    for f in ch:
        for det in (-0.6, 0.6):
            s += np.sin(2 * np.pi * (f + det) * tt) * 0.3 + np.sin(2 * np.pi * (f * 2 + det) * tt) * 0.08
    bed[a:b] += s * env * 0.1
# gentle pulse
bed *= (0.85 + 0.15 * np.sin(2 * np.pi * t / 4.0))
bed *= 0.5

# duck bed under the voice
vv = np.zeros(N, dtype=np.float32); vv[:len(voice)] = voice[:N]
win = SR // 20
rms = np.sqrt(np.convolve(vv ** 2, np.ones(win) / win, mode="same"))
duck = 1.0 - 0.55 * np.clip(rms / 0.05, 0, 1)
duck = np.convolve(duck, np.ones(SR // 5) / (SR // 5), mode="same")
out += vv + bed * duck * 1.0

def add(sig, at, g):
    a = int(at * SR)
    if a >= N: return
    b = min(N, a + len(sig)); out[a:b] += sig[: b - a] * g

def ding(f=1318.5, dur=0.45):
    tt = np.arange(int(dur * SR)) / SR
    return (np.sin(2 * np.pi * f * tt) + 0.4 * np.sin(2 * np.pi * f * 2.76 * tt)) * np.exp(-tt * 9)

def pop():
    tt = np.arange(int(0.12 * SR)) / SR
    f = 500 + 900 * np.exp(-tt * 40)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 30)

def click():
    tt = np.arange(int(0.08 * SR)) / SR
    return (np.random.RandomState(3).randn(len(tt)) * 0.4 + np.sin(2 * np.pi * 180 * tt)) * np.exp(-tt * 60)

for x in ev["ding"]: add(ding(), x, 0.11)
for x in ev["pop"]: add(pop(), x, 0.14)
for x in ev["click"]: add(click(), x, 0.12)
# bill bounce + shield flash whoosh
w = np.random.RandomState(5).randn(int(0.4 * SR)); tt = np.arange(len(w)) / SR
add(np.convolve(w, np.ones(60) / 60, mode="same") * np.sin(np.pi * tt / 0.4), ev["bill"], 0.06)

out = np.clip(out, -1, 1)
sf.write(D + "/mix_pre.wav", out, SR)
subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", D + "/mix_pre.wav", "-af", "loudnorm=I=-14:TP=-1.5:LRA=5", "-ar", "48000", D + "/mix_final.wav"], check=True)
print("mix done", round(N / SR, 1), "s")
