# Style proposal and build plan (DRAFT, user to approve)
Based on the reference study (`REFERENCE_ANALYSIS.md`). We copy the technique, not the identity.

## Our own identity (differs from the reference on purpose)
- Hero: a stickman with a yellow thorthu (towel) over one shoulder and round glasses, curly top-knot hair, NO red headband, NO spiky black hair. Name: user to choose.
- Side characters: coloured stickmen with simple faces; recurring "Ammayi" (aunt) with a bun.
- Palette (draft): warm yellow #F2B705, teal #1B9AAA, coral #EF476F, cream #FFF4E0, dark navy #1B2A41. Ground band: warm brown/terracotta.
- Rule pill: coral, white text. Hook key phrase: yellow-green highlight.
- Captions: white, heavy rounded Malayalam font (Noto Sans Malayalam Bold / Anek Malayalam Bold, to be proven), thick dark outline, 2-5 words per chunk, lower third. Rule title at the top.
- Series tag "PART N", end card with comment prompt and follow line.

## Frame (1080x1920, 30 fps)
Safe zone: top 15% (about 290 px) and bottom 30% (about 580 px) kept clear of critical text/faces except captions, which sit in the lower third just above the bottom 20%; right 12% kept clear of the like/share icons. Verify in the app.

## Per-Reel build
1. Script (Claude draft, user approves) -> 2. voice (Indic Tiny TTS male/female, x1.1 to x1.2) + timings -> 3. shot plan (one scene per sentence, change every 2-3 s) -> 4. Remotion template on the Mac (hook card, rule pill, caption bar, character poses, props, end card) -> 5. half-res preview -> final render -> cover frame + caption + 3-5 hashtags.
Reusable props: fridge, candle, torch, phone/battery meter, sadya leaf, cups, buses, houses, palms.

## Still unproven (do next, before the first build)
- Malayalam font rendering (conjuncts, chillu) in Chromium/Remotion at 1080x1920.
- Caption timing: TTS has no word timestamps; use forced alignment on the known script, or phrase-level timing from the sentence chunks (the model already splits at punctuation).
- Instagram maximum length, AI-label rules and safe-zone numbers (verify on Meta's Help Center).
