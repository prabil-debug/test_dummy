# Slang and voice style guide (derived from the user's own spoken story, 2026-11-10)
Goal: scripts that sound like the user talking, read by the stock male voice. The user is the final editor of every line.

## How the user actually talks (patterns from their dictation)
- Friend-to-friend storytelling, first person, honest about not knowing ("വലിയ ഐഡിയ ഒന്നും ഇല്ലായിരുന്നു").
- Spoken endings and tags: ...അല്ലേ, ...കേട്ടോ, ...ഇല്ലല്ലോ, ഓക്കെ, അപ്പോൾ, പിന്നെ.
- Local verbs and slang: "ബിരിയാണി അടിച്ചു", "പണി പഠിച്ചു", "എപ്പോഴാ പണി വരികയെന്ന് അറിയില്ലല്ലോ", "എങ്ങനെയൊക്കെയോ".
- Comfortable English words in Malayalam script: ഐഡിയ, ഹെൽത്ത് ഇൻഷുറൻസ്, ഫ്രണ്ട്സ്, എമർജൻസി ഫണ്ട്, സാലറി (alongside ശമ്പളം).
- Small asides that make it human: "...ഒറ്റയ്ക്കല്ല കേട്ടോ", "വലിയ പൈസയൊന്നും ഇല്ല കേട്ടോ".

## Script rules for the stock voice
1. Short spoken sentences (about 4 to 12 words); the TTS handles these best.
2. One aside per Reel ("കേട്ടോ" / "അല്ലേ"), not more.
3. Write numbers and English terms in Malayalam letters; no acronyms (spell SIP, EMI as ലെറ്ററുകൾ or avoid).
4. Prefer the user's real words to textbook Malayalam ("പണി", "അടിച്ചു", "പൈസ" over "തൊഴിൽ", "കഴിച്ചു", "പണം") when it sounds natural to the user.
5. Spelling tweaks for pronunciation go in a respelling map (below), never in the caption; captions use the proper spelling.
6. After each posted Reel: user lists words that sounded wrong; I add them to the map.

## Pronunciation watchlist (to test and fill from user feedback)
ഹെൽത്ത് ഇൻഷുറൻസ്, എമർജൻസി ഫണ്ട്, ഇൻവെസ്റ്റ്മെന്റ്, ഫ്രണ്ട്സ്, ഐഡിയ, സൈബർ പാർക്ക്, പതിനായിരം, chillu words (അച്ഛൻ്റെ), colloquial contractions (എപ്പോഴാ, എന്താ).
Respelling map (empty until the user reports errors): word -> respelling

## Voice processing (DECIDED 2026-11-10: user prefers v1, the voice already posted; v2 deeper is NOT used)
v1 = current. v2 = about 1 semitone deeper (asetrate 0.9439 + atempo 1.0594), +2.5 dB at 140 Hz, -1.5 dB at 300 Hz, +2.5 dB at 3.2 kHz, light compression, -16 LUFS.

## Ending rule (user, 2026-11-10)
Do NOT end every Reel with "അടുത്ത വീഡിയോയിൽ പറയാം". Default ending: a short payoff or callback line, then the disclaimer. Use a teaser only when the user asks for one. Target length about 60 s (about 115 to 125 spoken words at the current voice).
