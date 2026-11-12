import sys, os, json, onnxruntime, numpy as np
from ctc_forced_aligner import (load_audio, generate_emissions, preprocess_text, get_alignments, get_spans,
                                postprocess_results, ensure_onnx_model, MODEL_URL, Tokenizer)
audio_path, text_path, out_path = sys.argv[1:4]
mp = os.path.expanduser("~/ctc_forced_aligner/model.onnx"); os.makedirs(os.path.dirname(mp), exist_ok=True)
ensure_onnx_model(mp, MODEL_URL)
sess = onnxruntime.InferenceSession(mp); tok = Tokenizer()
wave = load_audio(audio_path)
emissions, stride = generate_emissions(sess, wave, batch_size=4)
text = " ".join(open(text_path, encoding="utf-8").read().split())
tokens_starred, text_starred = preprocess_text(text, romanize=True, language="mal")
segments, scores, blank = get_alignments(emissions, tokens_starred, tok)
spans = get_spans(tokens_starred, segments, blank)
words = postprocess_results(text_starred, spans, stride, scores)
json.dump(words, open(out_path, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("words aligned:", len(words)); print(words[:2])
