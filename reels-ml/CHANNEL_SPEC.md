# Channel spec: Malayalam Instagram Reels page

Status legend: KNOWN = given by user or brief, ASK = waiting on user, DRAFT = Claude's proposal for the user to accept/change.
Folder rule: everything for this page lives in `reels-ml/`. Nothing here is shared with the English "WHAT IF" channel.

## Basics
- Page name / handle: ASK
- Niche / content type: KNOWN (2026-11-10) money, insurance and investing education for Malayalis, curiosity-led "what if" hooks; see NICHE_FINANCE_PLAN.md. Goal: sponsorship income, so education-only and compliant.
- Target audience and language: KNOWN Malayali audience, Malayalam. ASK register (colloquial vs formal), dialect (central / Malabar / southern), Malayalam-only on screen or some English words.
- Length and format: KNOWN 1080x1920 (9:16), 30 fps, MP4. DRAFT 20-35 s per Reel (verify Meta's current maximum).
- Posting plan (not promised publicly): DRAFT 3 Reels a week to start. ASK what the user can sustain, because the user reviews every script.

## Visual style
- Look in one sentence: ASK (user will upload references; study only, never copy)
- Colour palette: ASK
- Fonts: DRAFT Noto Sans Malayalam (to be proven in step 3)
- Camera/motion language: DRAFT slow push-ins, hard cuts on beats
- Backgrounds: ASK
- Captions: KNOWN large, burned in, Malayalam script, inside safe zone (top ~15%, bottom ~30% kept clear)

## Characters
- Main character(s): ASK
- Recurring props/devices: ASK
- Rules (no real people, no faces, etc.): DRAFT carry over from HANDOFF.md: no real people, brands, flags, religious or political symbols

## Voice
- Type: ASK (male/female, age, energy)
- Engine: LEADING CHOICE (user liked `tiny_hook_male.wav`; female also rated "not bad"): Indic Tiny TTS Malayalam, male voice, CC-BY-4.0 (credit AI4Bharat Rasa + model author in page notes). Still to compare: Edge voices (host blocked), LFM-MALAYALAM-TTS. No cloned voices unless it is the user's own with a consent clip.
- Measured: ~1.85-2.0 words/s at default speed (female/male), so a 60 s Reel is only ~110-130 words. Reference voice is more expressive (11.4 st pitch spread vs 8.1 female / 10.7 male) and has no digital silence (continuous bed).
- Pace and pauses: DRAFT narration v3 rules, retuned for Malayalam after measuring real words/s

## Branding
- Profile picture, bio, highlight covers, tag line: ASK
- Cover-frame style: ASK

## Content rules
- Topics to avoid / sensitivities: DRAFT neutral on religion, politics, health; no medical advice; no tragedy imagery
- Source standards: DRAFT every claim sourced, VERIFY marks, as in HANDOFF.md
- AI disclosure: DRAFT disclose AI narration and answer Meta's prompts honestly (rules to be verified)
- Script review: KNOWN the user (native speaker) reviews every script before any voice is generated

## Voice decision log
- 2026-11-10: user decided NOT to clone their voice. Options kept: (A) user records each Reel in their own voice from a Manglish reading script (best slang), processed with light EQ (A natural / B warm+bright, user to pick); (B) stock Indic Tiny TTS male voice for fast drafts. Consent clips were deleted from the working copy; no user audio is committed to the repo.
- 2026-11-10: user chose stock Indic Tiny TTS male voice, processing v1 (highpass 70 Hz, light compression, -16 LUFS; no pitch shift) for all Reels. Deeper v2 rejected.
