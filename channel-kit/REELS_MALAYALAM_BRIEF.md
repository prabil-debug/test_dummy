# Brief: Malayalam Instagram Reels page (read after HANDOFF.md)

Goal: a new Instagram page for a Malayali audience, publishing short vertical Reels in MALAYALAM (not YouTube long-form). Reuse the pipeline in `channel-kit/HANDOFF.md` and `whatif-kit/WHATIF_VIDEO_KIT.md`, adapted as below.

## 1. What is different from the YouTube videos
| | YouTube "WHAT IF" | Instagram Reels (this page) |
|---|---|---|
| Format | 1920x1080, 5-6 min | 1080x1920 (9:16), roughly 15-45 s (check Meta's current maximum length) |
| Language | English (Kokoro voice) | Malayalam (Kokoro does NOT support Malayalam) |
| Hook | first 5 s | first 1-2 s, with an on-screen text hook |
| Captions | optional word captions | mandatory, large, burned in, in Malayalam script, inside the safe zone |
| Build time | ~1-2 h per video | aim for minutes per Reel with reusable templates (batch 5-7 per session) |
| Render | ~10 min per video | seconds to 2 min per Reel |
| Audio | voice + SFX + light music | voice + light bed; trending audio can only be added inside the Instagram app when posting |
| Packaging | title, description, chapters, thumbnail, tags | cover frame, caption text, 3-5 hashtags, posting time |

## 2. Malayalam voice: options to TEST first (nothing is verified for quality yet)
1. **Indic Parler-TTS** (`ai4bharat/indic-parler-tts` on Hugging Face): open weights, supports ~20 Indic languages (Malayalam listed by third-party sources; confirm on the model card), voice described by text prompts. Hugging Face hosts are already allowed in the `test-dummy-tts` environment. Check the licence field before commercial use (a third-party site claims Apache-2.0). Speed on CPU unknown.
2. **Microsoft Edge neural voices** via the `edge-tts` Python package: voices `ml-IN-MidhunNeural` (male) and `ml-IN-SobhanaNeural` (female) exist as Azure voices. It is an unofficial endpoint and needs an extra network host allowed in the container. Word-boundary timing for Malayalam is NOT confirmed: test with `edge-tts --list-voices` and `--write-subtitles`.
3. **Meta MMS-TTS Malayalam** (`facebook/mms-tts-mal`): works, but the licence is CC-BY-NC-4.0 (non-commercial only). Avoid if the page may ever be monetised.
4. Paid APIs (Google Cloud TTS, Azure) need keys and billing; only if the free options sound poor.
Task for the new chat: generate the same 20-second Malayalam sample with options 1 and 2 (and 3 for comparison), send them to the user, and let the user (a native speaker) pick. Do not assume quality; the user's ear decides.

## 3. Captions, fonts and timing in Malayalam
- Use a Malayalam font (e.g. Noto Sans Malayalam) in Remotion/Chromium and CHECK that conjuncts (ligatures) render correctly in stills before building.
- Word timing: Whisper `tiny.en` is English-only. Options: use the TTS engine's own timing events if available (Edge TTS), or a multilingual Whisper model (`small`/`medium`, supports Malayalam, accuracy must be checked), or forced alignment. The new chat must test and report.
- Captions must use the script's exact Malayalam text, not the transcription.

## 4. Writing the scripts
- Claude can draft Malayalam, but the user is the native-speaker editor: every script must be reviewed by the user before voice generation. Ask whether they want spoken/colloquial Malayalam or more formal, and any dialect preference.
- Short sentences, spoken rhythm, one idea per Reel, a hook line, a payoff, and a loop or cliffhanger ending. Keep the fact-check rule: every claim sourced, VERIFY marks, neutral on sensitive topics.
- Measure the real speaking rate (words per second) in Malayalam with the chosen voice before sizing scripts; do not reuse the English 3.4-3.7 words/s figure.

## 5. Instagram specifics (verify the starred items on Meta's Help Center before relying on them)
- Format 1080x1920, 9:16, 30 fps, MP4 (H.264, AAC audio).
- Safe zone (sources disagree): keep text and faces inside the central ~60-70% of the frame; conservative margins: about 15% at the top, 30% at the bottom, and keep the right edge clear of the like/comment/share icons. Preview inside the app before posting.
- * Maximum Reel length (commonly up to 90 s, not verified here).
- * Meta's "AI info" label / AI-generated content disclosure rules (not verified here): disclose AI narration; answer any disclosure prompts honestly.
- Do not post videos with watermarks from other apps. Do not copy other creators' Reels. No copyrighted music in the exported file.
- Page setup: handle, bio, profile picture, highlight covers; consistent posting (suggest 3-5 Reels a week); review analytics weekly (watch time, completion, shares, saves) before choosing topics.

## 6. Pipeline for the new page
1. Fill in `channel-kit/CHANNEL_SPEC_TEMPLATE.md` (niche, audience, style, character, voice, branding). The user will upload style/character references.
2. Pick the Malayalam voice (section 2) and prove captions/timing/fonts (section 3) on one sample.
3. Build ONE reusable vertical Remotion template (hook card, caption bar, character, background, end card) on the Mac, then produce Reels by swapping script/timing/art.
4. Per Reel: topic -> Malayalam script (user reviews) -> voice + timing -> build -> half-res preview -> final render -> cover frame + caption + hashtags.
5. Keep a topic bank and a posting calendar.

## 7. Where files go
Use a new folder in this repo (e.g. `reels-ml/`) and keep this page's work separate from the English channel. Do not mix the two channels' files. Follow all rules in HANDOFF.md (git, Mac, approvals, no cloned voices, no private reference frames, etc.).
