import sys, numpy as np, onnxruntime as ort, soundfile as sf
from kokoro_onnx.tokenizer import Tokenizer
voice = sys.argv[1]; out = sys.argv[2]; GS=float(sys.argv[3]); PM=float(sys.argv[4])
tok = Tokenizer(); sess = ort.InferenceSession("model.onnx")
vs = np.fromfile(f"{voice}.bin", dtype=np.float32).reshape(-1, 1, 256)
# (text, speed, pause_after_seconds)
L = [
 ("Two thousand people stepped onto a brand-new bridge, and it started to dance.", 0.95, 0.8),
 ("London, June 2000.", 0.95, 0.35),
 ("The Millennium Bridge, a sleek steel ribbon across the Thames, opens to huge crowds.", 1.0, 0.35),
 ("The engineers are proud.", 0.9, 0.35),
 ("Nothing like it has ever been built.", 0.88, 0.8),
 ("Step one: a tiny sway.", 0.88, 0.4),
 ("Step two: people notice.", 0.95, 0.35),
 ("Step three: they spread their feet to keep their balance.", 1.0, 0.3),
 ("Now every step pushes the bridge sideways, in time with everyone else.", 1.05, 0.8),
 ("The bridge wobbles harder.", 1.05, 0.2),
 ("So people step in sync even more.", 1.12, 0.15),
 ("So it wobbles harder still.", 1.2, 0.9),
 ("Luckily, it never fell.", 0.88, 0.9),
 ("Unluckily, everyone was clinging to the handrails like they were on a boat.", 0.95, 0.9),
 ("Think of a swing.", 0.9, 0.35),
 ("A small push every time it comes back, and soon it's flying.", 0.98, 0.4),
 ("Here, the crowd was the pusher, and nobody planned it.", 0.92, 0.8),
 ("Two days later, they closed it.", 0.92, 0.45),
 ("Engineers added dampers to soak up the motion, and it reopened in two thousand and two.", 1.0, 0.8),
 ("Today it's rock solid.", 0.92, 0.5),
 ("Londoners still call it the Wobbly Bridge.", 0.88, 0.0),
]
audio=[]; sr=24000
for t,sp,pause in L:
    ph = tok.phonemize(t, "en-gb"); ids = tok.tokenize(ph)
    style = vs[min(len(ids), len(vs)-1)]
    x = sess.run(None, {"input_ids": np.array([[0,*ids,0]],dtype=np.int64), "style": style, "speed": np.array([sp*GS],dtype=np.float32)})[0].squeeze()
    audio += [x, np.zeros(int(pause*PM*sr),dtype=np.float32)]
a=np.concatenate(audio); sf.write(out, a/max(1,abs(a).max()), sr); print(out, len(a)/sr)
