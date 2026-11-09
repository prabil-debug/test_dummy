# HANDOFF: how we make animated "what if" YouTube videos (read this first in any new chat)

This file carries everything learned while building channel #1 (WHAT IF) so a new chat or a new channel can start fast.
Channel #1 files: `whatif-kit/WHATIF_VIDEO_KIT.md` (full pipeline and prompts), `internet-video/`, `india-200m/`, `ram-setu/`, `covid-never-ended/` (examples of every deliverable).

## 1. The person and how to work with them
- Beginner with terminals. Give ONE command per code block, say exactly which window it goes in (plain Terminal `%` vs Claude Code `>`), and wait for their screenshot.
- Prefers: direct answer first, concise by default, honest pushback, trade-offs, practical steps. Ask clarifying questions before assuming; accept "go with your picks".
- Mac: M2 MacBook Air, 8 GB RAM, fanless, Claude Pro plan. Keep it plugged in for renders; never run two renders at once.
- Mac project folder: `~/wobbly-bridge-project` (clone of GitHub `prabil-debug/test_dummy`, branch `claude/new-session-ddwn90`). Remotion app: `remotion-app/`. Renders: `~/Desktop/wobbly-bridge-renders/`.
- They paste prompts into the wrong window sometimes: pasting a Claude Code prompt in the cloud chat does nothing; remind them which window.
- They will not always say what they want after a long message; read carefully, answer the real question.

## 2. Roles: what runs where
| Job | Where |
|-----|-------|
| Topic, script, fact-check, narration (Kokoro TTS), shot plan, thumbnails, packaging | Cloud Claude session (this repo, a container) |
| Building the animation (Remotion/React/SVG), sound mix, render, frame QA, SRT | Claude Code on the user's Mac |
| Upload, analytics, comments | The user |

## 3. Pipeline (approval gates in bold)
1. Topic + angle (suggestions first). **User picks.**
2. Research with web search; write `SCRIPT.md` + `FACTS.md` (VERIFY marks). **User approves/locks.**
3. Narration v3 (see section 5). **User listens.**
4. `SHOT_PLAN.md` with guardrails. **User OK.**
5. Claude Code: look test (first 3 sections, 6 stills) **OK** -> rest of sections -> sound mix -> half-res draft **watch** -> full render -> frame QA -> SRT.
6. Packaging: title, description with chapters (no links unless asked), tags, pinned comment, 3 thumbnails. **User picks.**
Time per video: script/voice/plan 1-2 h; Claude Code build 1-2 h; renders ~10 min (2D SVG, 1080p).

## 4. Rules that matter
- Facts: every number sourced; mark unverified lines VERIFY; correct the user's numbers politely (India is 1.46B not 1.5B). Health/religion/politics topics: neutral, respectful, balanced, no blame, no medical advice.
- Originality: never copy another channel's script/structure/visuals/voice. References are for style only.
- Voice: free stock voice (Kokoro). Clone a voice ONLY if it is the user's own, with a fresh consent clip ("This is my own voice, and I agree to it being used for my videos"). They once gave inconsistent claims about a reference voice: never clone from other creators' videos.
- No real brand logos, flags, borders (use stylised shapes), religious symbols, or political imagery. Treat deaths/tragedy as plain counters or abstract visuals, no victims.
- On-screen numbers must match the script and FACTS.md.
- AI disclosure: say "Narration is AI-generated" in the description; answer YouTube's synthetic-content question honestly; hold potentially inappropriate comments for review on sensitive topics.

## 5. Narration engine v3 (do not regress)
Problem found: fixed pauses = "templated silence" (7 distinct pause values, 24% silence, identical 1.65 s section gaps).
v3 (file `whatif-kit/narrate_kokoro_v3.py`): speak consecutive short sentences in ONE pass (phrase groups), pauses drawn from ranges with jitter (0.20-0.42 s between phrases, 0.5-0.7 after questions, 0.55-0.8 before a turn like "But", 0.42-0.6 after short punch lines), section breaks rotate 0.75-1.1 s, `[beat]` marker at line end = 1.15-1.4 s (use 1-3 per video), final hold 2.0 s, slow speed variation +/-4%, silence budget 14-16%. Always audit: `ffmpeg -i narration.wav -af silencedetect=noise=-38dB:d=0.7 -f null -`.
Pipeline: `narrate_kokoro_v3.py SCRIPT.md am_fenrir out.wav` -> pitch/loudness: `ffmpeg -i out.wav -af "asetrate=24000*0.89,aresample=24000,atempo=1.1236,loudnorm=I=-16:TP=-1.5" -ar 48000 narration.wav` -> word timings with faster-whisper tiny.en (pass audio as a float32 16 kHz numpy array to avoid an `av` bug) mapped onto the script's own spelling (`align_words.py`).
Script parsing: ignores everything before the first `## ` heading (a bug once read the "Markers:" note aloud). Write numbers/years as words in the script (e.g. "twenty twenty-two") or add them to the SPOKEN map; add respellings for hard names in the NAMES map (e.g. Rameswaram -> Raa-may-shwuh-rum). Avoid acronyms like "WHO" (read as "who").
Chosen voice for channel #1: Kokoro `am_fenrir`, pitched down ~2 semitones. Other voices available: bm_george, am_michael, bm_fable, etc.
Setup in a fresh cloud container: `python3 -m venv v; v/bin/pip install kokoro-onnx soundfile numpy faster-whisper`; download `onnx/model.onnx` and `voices/<voice>.bin` from Hugging Face `onnx-community/Kokoro-82M-v1.0-ONNX`. The container network is restricted: use the environment `test-dummy-tts` (allows huggingface.co, cdn-lfs.huggingface.co, cdn-lfs-us-1.hf.co, cas-bridge.xethub.hf.co, us.aws.cdn.hf.co, cas-server.xethub.hf.co) or request those hosts.
More expressive free alternative: Chatterbox (default voice, no cloning) needs `setuptools<81` and takes ~25 s per sentence on CPU.

## 6. Storytelling rules
- First 5 seconds: a concrete surprising line (a true fact or a vivid image), no definitions.
- A curiosity loop every 30-40 s: end each section on a question that the next section answers.
- Vary sentence length; avoid repeated devices ("Now...", "But there's a catch" at most twice); no signposting ("Here's something that surprises people"); one analogy; callback ending with a final open question.
- Balanced tone on contested topics; real examples "in miniature"; "can we do it today?" angle when relevant.
- Aim 5-6.5 min; ~3.4-3.7 spoken words per second all-in with v3.

## 7. Claude Code on the Mac: patterns that worked
- Prompts live in `whatif-kit/WHATIF_VIDEO_KIT.md` (A-F). Build: look test of first 3 sections -> rest -> sound mix -> half-res draft (`--scale 0.5`, `--concurrency 1`, caffeinate) -> full render -> frame QA -> SRT.
- Permissions: choose "Yes, but ask again next time" for reads outside the project (Desktop stills). Never press `x` in the shell-details panel (stops the render).
- A terminal command pasted into Claude Code is ignored; Claude Code prompts pasted into Terminal fail.
- Two Claude Code tabs at once: fine for building, never render both at once (8 GB).
- Full render of ~11,000 frames took ~10 min at 1080p, concurrency 1.
- If a connection drops mid-response, resend: "Continue where you left off".
- Dead air rule: when narration pauses >= 0.7 s, something on screen keeps moving.

## 8. GitHub / git behaviour
- Repo `prabil-debug/test_dummy`, branch `claude/new-session-ddwn90`. A stop hook asks to commit and push after every turn; push when the hook asks. Unprompted pushes were sometimes blocked by the auto-mode classifier ("unrequested commit"): if blocked, stop and ask the user to say "push it".
- Do not open pull requests unless asked. Do not commit the skill's private reference frames (`claude-animated-shorts` references): study only, never publish.
- Never commit voice clones or other people's audio.

## 9. Per-channel things to define (fill in for each new channel)
See `CHANNEL_SPEC_TEMPLATE.md`: name, niche, audience, language, video style (format, camera, motion, colours, fonts), characters (design, expressions, palette), voice, branding (profile, banner, thumbnail style), length, upload plan, sensitivity list.
Reusable code to adapt: thumbnails `internet-video/thumbnails/make.js` (Playwright SVG, Inter font), banner `internet-video/branding/make_banner.js`, avatars `make_avatar.js`; Remotion kit (Figure/Stage/Txt/captions) lives in the Mac's `remotion-app/src/videos/`.

## 10. Known facts about the content shipped so far
Channel #1 "WHAT IF": videos 1 (internet disappeared, 5:04), 2 (India with 200M people, 6:19), in production: Ram Setu (6:00), COVID never ended (5:12). Analytics not yet reviewed: ask for CTR, retention graph, traffic sources before choosing topics.
