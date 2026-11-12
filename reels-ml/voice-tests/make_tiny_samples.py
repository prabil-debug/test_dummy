"""Make Malayalam voice samples with sulabhkatiyar/indic-tiny-tts-malayalam (CC-BY-4.0, credit: AI4Bharat Rasa).
Run on the Mac:  python3 make_tiny_samples.py
Writes female/male wav files to ~/Desktop/ml-voice-samples/ . Needs: torch numpy safetensors huggingface_hub soundfile."""
import sys, time, pathlib
from huggingface_hub import snapshot_download

REPO = "sulabhkatiyar/indic-tiny-tts-malayalam"
folder = snapshot_download(REPO, ignore_patterns=["onnx/*", "assets/*", "samples/*"])
sys.path.insert(0, folder)
from indic_tiny_tts import TinyTTS

tts = TinyTTS(folder, device="cpu")
out = pathlib.Path.home() / "Desktop" / "ml-voice-samples"
out.mkdir(parents=True, exist_ok=True)

LINES = {
    "1_same_as_mms": "കേരളത്തിൽ മഴക്കാലത്ത് എങ്ങനെ സുരക്ഷിതരായിരിക്കാം? ആദ്യം, വെള്ളത്തിൽ നടക്കരുത്.",
    "2_hook": "കേരളത്തിൽ സുനാമി വന്നാൽ എങ്ങനെ രക്ഷപ്പെടാം? ഒന്നാമത്തെ റൂൾ, കടൽ പിന്നോട്ട് പോയാൽ ഓടുക.",
}
for name, text in LINES.items():
    for voice in ("female", "male"):
        for speed in (1.0, 1.15):
            t = time.time()
            wav = tts.synthesize(text, voice=voice, speed=speed, seed=0)
            f = out / f"{name}_{voice}_speed{speed}.wav"
            tts.save_wav(wav, str(f))
            print(f.name, round(len(wav) / 24000, 1), "s audio,", round(time.time() - t, 1), "s")
print("Done. Files are in", out)
