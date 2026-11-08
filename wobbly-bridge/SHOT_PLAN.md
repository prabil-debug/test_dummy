# Shot plan: The Bridge That Wobbled

Format: 1080x1920, 30 fps, ~1390 frames (~46 s). Timings are ESTIMATES (3.7 words/s + small gaps).
Once `voice.wav` and `words.json` exist, re-time every `a`/`b` frame to the real words
(rule from the skill: each visual reaction lands 0-3 frames before its word).

Adaptation notes vs. the template bridge short:
- The wobble is LATERAL (sideways), not vertical bounce. Replace `bounce` with `sway` (x offset of the deck, with
  a matching lean on the hangers/rails).
- Crowd is modern-day civilians, not soldiers. Crowd mode `march` -> `walk`, and add `sync` (steps phase-lock as
  the sway grows) and `wide` (feet spread, arms out).
- No captions/labels in picture (skill rule). Add captions later only if you decide to.

## Shots

| # | Frames | Script line | Light | Crowd | Camera (summary) | Beat / gag |
|---|--------|-------------|-------|-------|------------------|------------|
| 1 | 0-114 | "Two thousand people stepped onto a brand-new bridge, and it started to dance." | day | walk, strong sway | Flash-forward: wide 3/4 of the swaying bridge pushing in to a stumbling face | Hook. White flash at frame 114 |
| 2 | 114-205 | "London, June 2000. The Millennium Bridge, a sleek steel ribbon across the Thames..." | day | none | High aerial over Thames, slow zoom push | Establish place |
| 3 | 205-290 | "...opens to huge crowds. The engineers are proud." | day | bank | MS of engineers beaming, then a thumbs-up | Pride |
| 4 | 290-351 | "Nothing like it has ever been built." | day | bank | Low wide reveal of the sleek bridge, crane up | Pride, calm before the wobble |
| 5 | 351-430 | "Step one: a tiny sway." | day | walk | Boots CU, deck sway barely visible | Tiny sway |
| 6 | 430-505 | "Step two: people notice." | day | walk | MS of faces glancing down, eyebrows up | Notice |
| 7 | 505-612 | "Step three: they spread their feet... in time with everyone else." | day | walk -> wide/sync | Boots CU feet widen, then high wide of column swaying in step | Cause revealed |
| 8 | 612-690 | "The bridge wobbles harder. So people step in sync even more." | day | sync | Side view, rising sway, push in | Escalation |
| 9 | 690-750 | "So it wobbles harder still." | day | sync | High wide; flip-kicks on each "So" | Peak |
| 10 | 750-805 | "Luckily, it never fell." | day | none | Calm wide of the bridge, standing | Deadpan |
| 11 | 805-903 | "Unluckily, everyone was clinging to the handrails like they were on a boat." | day | clinging | MS of faces gripping rails, seasick | Gag |
| 12 | 903-1010 | "Think of a swing. A small push..." | golden | none | Park: kid on swing (two ropes!), parent pushes | Analogy |
| 13 | 1010-1122 | "Here, the crowd was the pusher, and nobody planned it." | golden->day | sync | Crossfade to boots CU in lockstep, then wide | Link swing to crowd |
| 14 | 1122-1200 | "Two days later, they closed it." | day | bank | Barrier + closed sign across the deck (unlit sign material) | Consequence |
| 15 | 1200-1284 | "Engineers added dampers to soak up the motion, and it reopened in 2002." | day | none | Insert of damper under the deck, pull back to the finished bridge | Fix |
| 16 | 1284-1390 | "Today it's rock solid. Londoners still call it the Wobbly Bridge." | day | tourists | Calm MS of tourists, crane out; one tiny wobble gag on the last word | Callback twist |

## Constants for story.ts (draft, in the template's shape)
```ts
export const FPS = 30;
export const TOTAL = 1390;
export const FLASH_AT = 114;
// crossfades at place/time changes
export const XFADE: Record<number, number> = { 12: 8, 13: 8, 14: 6, 16: 8 };
```
Camera rules from the skill apply to every shot: smootherstep glides 18-40 f, hard cuts on big reframes,
every hold pushes in 0.15-0.35 %/f (no static holds >= 4 f), 4-5 degree rolls on emphasis words,
flip-kicks (7 f) on impact words ("So", "wobbles").
DOF: close-ups cInf 12-16 px at 1080, wides/aerials 0, focus on the eyes. FOREGROUND props in about a third of shots.

## Sound cue list (for timeline.py)
- Shot 1: whoosh into the flash, low rumble of footsteps.
- 5-9: footstep rhythm that locks in and gets louder (crowd sync); creak that grows with the sway.
- 9: kick hits on each "So".
- 10-11: sudden quiet on "Luckily", comic strained creak on "boat".
- 12-13: light swing creak; footsteps return to link.
- 14: hammer/clank on the barrier.
- 16: single quiet "boing" on the final wobble.

## Readability traps to check (from the skill)
- Swing = two ropes + wide plank, kid between them, A-frame clear of the arc.
- Keep props >= 2 m from any lens; recheck after every camera move.
- Closed sign: unlit material so it stays readable.
- Use a recognisable British bridge silhouette (steel ribbon, low shallow suspension), not the template's iron chain bridge.

## Open decisions
1. Voice: your own recording or text-to-speech (needed before frames can be locked).
2. Captions on/off.
3. Whether to add a 15th "extended" shot to get closer to the skill's 55-70 s target (the script alone is ~46 s, fine for Shorts/Reels).

## Locked timings from the real voice (voice/voice.wav, voice/words.json)
Voice is 54.9 s, so TOTAL ~= 1650 frames (not 1390). Re-time the shots above proportionally to these section starts
(seconds -> frames at 30 fps):

| Section | Start (s) | Frame |
|---------|-----------|-------|
| Hook | 0.00 | 0 |
| Setting ("London,") | 4.12 | 124 |
| Action ("Step one") | 14.54 | 436 |
| Snap ("The bridge wobbles harder") | ~25.9 | ~777 |
| Luckily | 31.56 | 947 |
| Unluckily | 33.14 | 994 |
| Explanation ("Think of a swing") | 37.16 | 1115 |
| "Here, the crowd..." | 42.02 | 1261 |
| Twist ("Today it's rock solid") | 51.08 | 1532 |
| End | 54.90 | 1647 |

Notes: words.json was made with a small speech-to-text model, so hand-check it (the first word is "2" for "Two";
numbers and punctuation can be off). Voice is Piper "ryan-high" TTS.
