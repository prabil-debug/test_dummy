# Malayalam Instagram Reels (finance)

Plan and pipeline: `channel-kit/REELS_MALAYALAM_BRIEF.md`. Work lives in `reels-ml/`.
The English YouTube videos (all other folders) are a separate project: ignore them for Reels work.

## Audience
Malayali young earners, ~20-35, learning money basics. Goal: sponsorships.

## Tone
Friend-to-friend story, honest, educational, never advice. Disclaimer ("ഒരു ഉദാഹരണം · ഉപദേശമല്ല") only on the end card and in the caption, no top tag.

## Malayalam style
- The user is a native speaker and edits every script. Keep their text verbatim in captions and audio; put risky claims in the script notes, not silently changed.
- Short spoken sentences. Voice scripts spell English terms in Malayalam script (ഇഎംഐ); on screen, common finance words (EMI, rent, loan) appear in English, rest of the captions in Malayalam.
- One aside ("കേട്ടോ") at most. See `reels-ml/SLANG_STYLE_GUIDE.md`.

## Reel format
1080×1920, 30 fps, 60-90 s is fine. Hook in 2 s, a new shot every 2-3 s, word-by-word captions in a tight dark pill, no stroke, key number on a lime box. Safe zone: captions at y≈1126-1206, all content above y≈1250; the bottom 35% and top 14% are covered by Instagram. No "next video" teaser unless the script has one. Voice: user's ElevenLabs mp3, aligned with CTC forced alignment.
Per reel deliver: review-cut mp4, notes with flags and math check, caption pack, 3 covers.

## What has worked
- Concrete ₹ numbers in hooks and covers.
- A friend's story, then the numbers.
- Detailed props, calm character, subtle synthesised sound.

## Decisions
- Ramu is locked: 22 years old, no mundu. No blur or glow. One focus per scene, no tiny text. Number scenes may use dark data cards (trial in builds/TEST_HYBRID_*). Font: Anek Malayalam (both scripts).
- Character motion must be restrained; the user found v2 distracting.
- No cloned voices; never commit voice recordings.
- Always add risk disclaimers (mutual funds, loans, insurance) on screen and in captions, plus the AI-voice line.
- Skip fact-research for user scripts, but flag wrong or risky claims.
- No pull requests unless asked.

At the end of each task, commit and push to GitHub.
