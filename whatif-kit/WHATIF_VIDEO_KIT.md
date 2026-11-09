# WHAT IF: reusable video kit (checklist + prompts)

How the first video ("What If the Internet Disappeared Forever?", 5:04, 1920x1080) was made, turned into a repeatable process.
Tools: Claude (cloud) for script/voice/packaging, Claude Code on your Mac for the build, Remotion for rendering. All free software.

Replace `{TOPIC}`, `{SLUG}` (e.g. `internet`), `{N}` in every prompt below.

---

## 0. Rules that apply to every video
1. **Facts:** every claim and every on-screen number gets a source before it is voiced. Mark unchecked lines `VERIFY` in the script and clear them only after checking (we caught "Tonga: a week" which was really about five weeks).
2. **Originality:** reference channels are for inspiration only. Never copy another creator's script, structure, jokes, visuals, or voice.
3. **Voice:** use a free stock voice, or a clone of **your own** voice. Clone only with a fresh consent clip ("This is my own voice and I agree to it being used for my videos"). Never clone someone else's voice.
4. **No real logos, flags or brand colours** in pictures. Brand names in captions are fine; use generic icons.
5. **Approve in stages:** 60-second test first, then section by section with stills. Don't batch-render before the look is locked.
6. **Don't promise** an upload schedule or claims you can't back up.
7. **Save work:** download important files; pushes to GitHub can be blocked by the safety check, so don't rely on it.

---

## 1. Pipeline at a glance
| # | Phase | Where | Output | Your gate |
|---|-------|-------|--------|-----------|
| 1 | Topic + angle | cloud Claude | topic, hook, section list | pick topic |
| 2 | Script + fact sheet | cloud Claude | `SCRIPT.md` (~1,000 words), VERIFY list | approve script |
| 3 | Fact-check | cloud Claude (web search) | sources, corrected lines | OK facts |
| 4 | Voice | cloud Claude | narration wav, `timeline.json`, `words.json` | listen, OK tone |
| 5 | Shot plan | cloud Claude | `SHOT_PLAN.md` (60 s test table + outline) | OK plan |
| 6 | 60-second test | Claude Code (Mac) | `{SLUG}_test60.mp4` | OK look |
| 7 | Build sections | Claude Code (Mac) | stills per section | OK each / name fixes |
| 8 | Sound mix | Claude Code (Mac) | `full_mix.wav` | listen, OK levels |
| 9 | Final render + QA | Claude Code (Mac) | `{SLUG}_full.mp4` | watch once |
| 10 | Packaging | cloud Claude | title, description, chapters, tags, thumbnail, SRT | pick options |
| 11 | Upload | you | private → review → publish | final check |

Typical time: script/voice/plan ~1-2 h, build ~1-2 h of Claude Code (about 4-7 min per section), render 30-50 min on M2 Air.

---

## 2. Phase 1-2: topic and script
**Good topic test:** a clear timeline (first hour/day/month/year), real examples you can source, a visual story, a question that makes viewers think.

**Script structure (~5:00 of narration at natural pace = ~1,000 words):**
1. Hook (30-40 s): put the viewer in the scenario, end with "Let's find out."
2. First 24 hours: the most relatable shock.
3. "It has already happened, in miniature": 2-3 real outages/events with sourced numbers.
4. System effects: how things slow down (not "instantly collapse").
5. Human/social effects.
6. After one month.
7. After one year.
8. Ending: reframe + one big question + callback to the hook.

**Style rules:** short lines, lists as quick fragments, one idea per line, deadpan humour only where it is true, no on-screen text that repeats the voice, one analogy per video.
**Storytelling rules (added after video #2):**
- Open with a concrete image or surprising number, not a definition; no more than 2 lines before the first hook.
- Vary sentence length: mix short punches with longer lines that carry an idea; avoid 6+ short lines in a row unless it is a deliberate list.
- Don't repeat the same device. Video #2 used "Now..." to start 7 sentences and "But there's a catch/trap" three times; allow each device at most twice per video.
- Cut signposting ("Here's something that surprises people", "Now the part that worries economists"): show the surprise instead.
- Every section should end on a small payoff or an open question that pulls into the next one (a re-hook about every 60-90 s).
- Prefer specific, tangible detail (a number, a place, a person) over general statements; one analogy per video, used well.
- Read the script aloud once before locking: if you run out of breath or hear a rhythm repeating, rewrite that stretch.

**Prompt (cloud Claude):**
```
Write a script for a WHAT IF video on: {TOPIC}.
Target about 1,000 words (about 5 minutes at natural pace), landscape YouTube, calm documentary tone.
Use this structure: hook, first 24 hours, real examples in miniature, system effects, human effects, after one month, after one year, ending with one big question and a callback to the hook.
Short punchy lines. Put VERIFY at the end of every line that contains a fact or number I must check. Give me a list of those facts with the source you would check. Don't copy any existing video's wording or structure.
```

---

## 3. Phase 3: fact-check
- Search each VERIFY item; prefer primary or major-outlet sources.
- If a source says something different from the script, **change the script**, then regenerate that part of the narration.
- Keep a source list for the description.

**Prompt (cloud Claude):**
```
Fact-check every VERIFY line in {SLUG}/SCRIPT.md using web search. For each, tell me: correct / correct with wording change / wrong, give the source link, and give the fixed line. Flag any number shown on screen.
```

---

## 4. Phase 4: voice (free, natural)
**Voice:** Kokoro `am_fenrir`, pitched down ~2 semitones.
Generator script: `internet-video/voice/narrate_kokoro.py` (reads `SCRIPT.md`; headings `## SECTION`; one line per sentence).

**Settings used:** speed factor 1.35, pitch shift `asetrate=24000*0.89,aresample=24000,atempo=1.1236`, loudness normalise to about -16 LUFS.

**Narration v3 rules (from video #2 feedback: "templated silence", gaps after only 3-4 words).**
Audit of video #2: only 7 distinct pause lengths in the whole video, 82 of 155 sentences paused exactly 0.45 s, 12 section breaks were all exactly 1.65 s, and 24% of the narration was silence. That is the "template" feel. v3 fixes it:
| Rule | v3 behaviour |
|------|--------------|
| Phrase groups | consecutive short sentences (6 words or fewer, up to 3) are spoken in ONE pass, so lists flow ("No notifications. No messages. You open Instagram.") |
| Pauses | never fixed; each is drawn from a range with jitter: between phrases 0.20-0.42 s, after a question 0.5-0.7 s, before a turn ("But...") 0.55-0.8 s, after a very short punch line 0.42-0.6 s |
| Section breaks | rotate 0.75 / 0.95 / 0.80 / 1.10 / 0.85 / 1.00 s (with +/-7% jitter), never 1.6 s |
| Dramatic beats | only where the script line ends with `[beat]` (1.15-1.4 s); use 1-3 per video |
| Ending hold | 2.0 s |
| Prosody | speed varies slowly (+/-4%) and per line: questions slower, short punch lines slower, long sentences slightly faster |
| Silence budget | target 14-16% silence (video #2 was 24%); no gap over 1.2 s except the final hold and tagged beats |
Generator: `whatif-kit/narrate_kokoro_v3.py` (usage: `narrate_kokoro_v3.py SCRIPT.md am_fenrir out.wav`, then the pitch/loudness step in section 4). Always run a silence audit before approving: `ffmpeg -i narration.wav -af silencedetect=noise=-38dB:d=0.7 -f null -`.
Silent stretches are also a VISUAL problem: whenever a pause is 0.7 s or longer, something on screen should still move (push-in, a counter, a small shake) and the music bed or a soft effect should carry it, so it never feels like dead air.

**Outputs to keep:** `narration_final.wav`, `timeline.json` (sentence start/end), `words.json` (word times, **corrected to the script's spelling**; the speech-to-text mishears words such as "card" and "medical").

**Prompt (cloud Claude):**
```
Generate the narration for {SLUG}/SCRIPT.md in the locked WHAT IF voice (Kokoro am_fenrir, pitched down about 2 semitones), with meaning-based pauses: 0.2-0.3 s in lists, 0.5-0.7 s between ideas, 0.8-1.0 s before dramatic lines, up to 1.6 s at section breaks, 2.5 s hold after the last question. Give me the first 60 seconds to approve, then the full file with timeline.json and word timings.
```

**If you want your own voice:** record 30-60 s in a quiet room in your narration voice plus the consent clip. Cloning here runs on CPU (about 25 s per sentence), so a 5-minute video takes about 30-60 minutes.

---

## 5. Phase 5: shot plan
One row per sentence group: time, narration, scene, motion.
- Style: flat 2D stick figures, thick dark outlines, pastel backgrounds, one accent colour per section; phones/signs/maps are the stars; one idea per scene.
- Every cut lands about 2 frames before its word. Small shake on bad-news words.
- Captions: word-by-word, bottom centre, spoken word in yellow on a dark rounded box.
- The 60-second test = hook + start of section 2.

**Prompt (cloud Claude):**
```
Write a SHOT_PLAN.md for {SLUG}: 1920x1080, 30 fps, 2D stick-figure scenes with motion graphics. Use timeline.json. Give me a detailed table for the first 60 seconds (time, narration, scene, motion) and an outline table for the rest. No real logos or flags.
```

---

## 6. Phase 6-9: Claude Code on the Mac
**Start a session:**
```bash
cd ~/wobbly-bridge-project && claude
```
Pull new files first when needed:
```bash
cd ~/wobbly-bridge-project && git pull origin claude/new-session-ddwn90
```

**Permissions you'll see:**
- "Read outside the working directories" (stills on Desktop): choose "Yes, but ask again next time".
- Don't use `cd ... && claude` inside an already running Claude Code.

**Prompt A: 60-second test**
```
Build a 60-second test of the {SLUG} video.
Read {SLUG}-video/SHOT_PLAN.md (the 60-second test table), {SLUG}-video/voice/timeline.json and words.json, and use {SLUG}-video/voice/test60.wav as the audio.
Add a NEW Remotion composition called {Slug}Test to the existing remotion-app (1920x1080, 30 fps, 60 s). Don't touch other compositions. Draw everything in React/SVG with no new heavy dependencies and no real brand logos. Follow the scene table and time each scene to timeline.json; cuts and impacts land 0-3 frames before the matching words. Every hold gets a slow push-in; small shake on bad-news beats. Captions word by word from words.json, bottom centre, large, high contrast. First render 6 or so half-size stills and show them in Preview; wait for my OK. Then render with --concurrency 1 under caffeinate to ~/Desktop/wobbly-bridge-renders/{slug}_test60.mp4 and run the frame check. Explain in plain words and ask before anything big. Don't commit anything.
```

**Prompt B: lock the voice rhythm (after the test)**
```
Lock the narration tone from the approved test. Re-space the full narration with pauses by meaning (0.2-0.3 s in lists, 0.5-0.7 s between ideas, 0.8-1.0 s before dramatic lines, up to 1.6 s at section breaks, 2.5 s hold after the last question). Save narration_final.wav with updated timeline.json and words.json. Check word timings against the waveform and use the script's spelling for captions.
```

**Prompt C: build the full video, section by section**
```
Build the rest of the video as a new composition {Slug}Full (1920x1080, 30 fps), reusing the style, characters and caption system from {Slug}Test. Follow {SLUG}-video/SHOT_PLAN.md and SCRIPT.md. Work section by section in script order: build one section, render 5-6 half-size stills, show them to me, and wait for my OK. Keep the sound-effect and light-music approach from the test. No real brand logos. Don't commit anything. Explain in plain words.
```
To go faster once the style is trusted:
```
Section {N} is OK. Build the remaining sections back to back without pausing, then render 8-10 half-size stills across them and show them together so I can review once.
```

**Fix one scene:**
```
Section {N}, still {M}: <what is wrong>. Change it to <what you want>. Re-check every on-screen number in section {N} against SCRIPT.md, then show me the updated still. Wait for my OK before continuing.
```

**Prompt D: sound mix**
```
The ending is OK. Go ahead with the sound mix: sound effects on word/picture beats and a light music bed that shifts mood by section, ducked under the voice (effects -5 dB, music -8 dB while the voice speaks). Target -14 LUFS, peaks below -1 dBTP, exact picture length. Open an audio-only copy for me to listen to, then ask before the full render.
```

**Prompt E: full render + QA**
```
The sound is good. Start the full render: 1920x1080, --concurrency 1 under caffeinate, then check every frame (black, white, frozen, jumpy) and the loudness. Save to ~/Desktop/wobbly-bridge-renders/{slug}_full.mp4.
```
Render notes (M2 Air 8 GB): about 9,100 frames took 30-50 min; keep plugged in, lid open, close heavy apps; keep 5+ GB free.

**Prompt F: SRT subtitles**
```
Create an SRT subtitle file from the final words.json using the script's spelling, in natural caption chunks (about 6-10 words, max 2 lines), and save it to my Desktop.
```

---

## 7. Phase 10: packaging
**Title rules:** under 60 characters, starts with "What If" for brand consistency, honest, curiosity without false claims. Template: `What If {thing} {happened}?`

**Description template (no links version):**
```
{One-sentence version of the question.}

{2-3 sentences: what the video covers, the timeline, the real examples.}

{One-line closing: what it shows or asks.}

Chapters:
0:00 {title}
...

What "what if" should I explore next? Tell me in the comments.
```
Chapter rules: first at 0:00, at least 3, each at least 10 s, one per line. Verify timestamps by scrubbing the uploaded video (build summaries can be off by a second).

**Tags:** 8-12, mix specific (`what if the internet disappeared`) and general (`what if scenarios`, `animated explainer`).

**Settings:** not made for kids; category Education; language English; answer the AI/altered-content question honestly (animated + synthetic narrator that isn't a real person is typically not "realistic altered content", but read YouTube's current wording).

**Thumbnail:** 1280x720, 3-4 words, one clear emotion, high contrast, readable at thumb size. Generator: `internet-video/thumbnails/make.js` (Playwright + Inter font; edit the text and colours, run `node make.js`). A/B test two options if Studio offers it.

**Channel assets (done):** profile `internet-video/branding/avatar_2.png`, banner `internet-video/branding/banner.png`, description `internet-video/CHANNEL_DESCRIPTION.md`.

**Prompt (cloud Claude):**
```
Package my new video "{TITLE IDEA}" ({length}, chapters from this list: ...). Give me: 3 title options with a recommendation, a description (no links, with chapters), 10 tags, 3 thumbnail concepts with text, and a pinned comment.
```

---

## 8. Phase 11: before you publish
- [ ] Watch the whole upload once on your phone.
- [ ] Captions uploaded (SRT) or auto-captions corrected.
- [ ] Chapter timestamps match the video.
- [ ] Title is not the file name.
- [ ] Thumbnail uploaded.
- [ ] Altered/synthetic content question answered honestly.
- [ ] All on-screen numbers and claims verified.
- [ ] Pinned comment ready.

---

## 9. Known pitfalls (from the first video)
| Problem | Cause | Fix |
|---------|-------|-----|
| Robotic narration | fixed 0.35-1.1 s gap after every sentence | pause by meaning (section 4) |
| Video shorter than planned (6:10 → 5:04) | natural pacing removes silence | write ~1,200 words for ~6 min |
| Wrong on-screen fact | script not fact-checked | step 3, check every number |
| Captions misspell words | speech-to-text errors ("car" for "card") | use the script's spelling for captions |
| Cut/caption timing off | text file timings differ from audio | snap to waveform; cuts 2 frames early |
| Characters cut off or hidden | props near frame edge or under captions | check every still; keep action above captions |
| Real-brand look | icons resembling Instagram etc. | generic icons only |
| Session context "compacted" | long chat | harmless; Claude Code re-reads files |
| GitHub push blocked | safety check on unrequested pushes | say "push it", or download files |
| Hidden usage limit | long builds on Pro plan | build section by section; resume with "continue from the last section" |

---

## 10. Files created for video #1 (examples to copy)
- `internet-video/SCRIPT.md`, `SHOT_PLAN.md`, `YOUTUBE_PACKAGE.md`, `CHANNEL_DESCRIPTION.md`
- `internet-video/voice/` (narration, timeline, words, `narrate_kokoro.py`)
- `internet-video/thumbnails/` (`thumb_A.jpg`, `thumb_B.jpg`, `thumb_C.jpg`, `make.js`)
- `internet-video/branding/` (avatar options, banner, generator scripts)
- Mac: `remotion-app/` (compositions `InternetTest`, `InternetFull`), renders in `~/Desktop/wobbly-bridge-renders/`
