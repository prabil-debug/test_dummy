# tools/align_words.py: word-level timing for ANY Malayalam narration audio
Usage: `python align_words.py narration.wav script.txt words.json` (script.txt = the exact approved Malayalam text, one paragraph or many).
Method: CTC forced alignment (ONNX multilingual aligner from the ctc-forced-aligner package, model hosted on Hugging Face), Malayalam text romanised with unidecode. No speech recognition is used, so captions use the script's own spelling.
Accuracy test (2026-11-10) on our own narration with known timings: 116 words aligned; sentence START error median 0.03 s, max 0.07 s; sentence END error median 0.07 s, max 0.79 s (one sentence where a trailing pause was absorbed). Not yet tested on the voice-service audio or on audio with a music bed (send narration WITHOUT music).
Needs: pip install ctc-forced-aligner unidecode onnxruntime numpy (the sandbox may ask for permission to run it).
