import sys, numpy as np, onnxruntime as ort, soundfile as sf
from kokoro_onnx.tokenizer import Tokenizer
voice = sys.argv[1]; out = sys.argv[2]; GS=float(sys.argv[3]); PM=float(sys.argv[4])
tok = Tokenizer(); sess = ort.InferenceSession("model.onnx")
vs = np.fromfile(f"{voice}.bin", dtype=np.float32).reshape(-1, 1, 256)
# (text, speed, pause_after_seconds)
L = [
 ("Two thousand people stepped onto a brand-new bridge,",0.95,0.3),("and it started to dance.",0.88,1.0),
 ("London, June 2000.",0.92,0.5),("The Millennium Bridge, a sleek steel ribbon across the Thames,",1.0,0.2),("opens to huge crowds.",0.95,0.5),
 ("The engineers are proud.",0.88,0.5),("Nothing like it has ever been built.",0.85,1.0),
 ("Step one:",0.85,0.3),("a tiny sway.",0.85,0.6),("Step two:",0.92,0.25),("people notice.",0.9,0.5),
 ("Step three:",1.0,0.2),("they spread their feet to keep their balance.",1.0,0.4),
 ("Now every step pushes the bridge sideways,",1.05,0.15),("in time with everyone else.",1.0,1.0),
 ("The bridge wobbles harder.",1.0,0.3),("So people step in sync even more.",1.1,0.25),("So it wobbles harder still.",1.18,1.0),
 ("Luckily,",0.85,0.3),("it never fell.",0.85,1.1),("Unluckily,",0.88,0.4),
 ("everyone was clinging to the handrails like they were on a boat.",0.95,1.0),
 ("Think of a swing.",0.88,0.6),("A small push every time it comes back,",0.95,0.2),("and soon it's flying.",0.92,0.6),
 ("Here, the crowd was the pusher,",0.92,0.3),("and nobody planned it.",0.88,1.0),
 ("Two days later,",0.9,0.25),("they closed it.",0.88,0.6),
 ("Engineers added dampers to soak up the motion,",0.98,0.2),("and it reopened in two thousand and two.",0.95,1.0),
 ("Today it's rock solid.",0.9,0.7),("Londoners still call it the Wobbly Bridge.",0.85,0.0),
]
audio=[]; sr=24000
for t,sp,pause in L:
    ph = tok.phonemize(t, "en-gb"); ids = tok.tokenize(ph)
    style = vs[min(len(ids), len(vs)-1)]
    x = sess.run(None, {"input_ids": np.array([[0,*ids,0]],dtype=np.int64), "style": style, "speed": np.array([sp*GS],dtype=np.float32)})[0].squeeze()
    audio += [x, np.zeros(int(pause*PM*sr),dtype=np.float32)]
a=np.concatenate(audio); sf.write(out, a/max(1,abs(a).max()), sr); print(out, len(a)/sr)
