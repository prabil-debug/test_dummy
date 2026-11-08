# Shot plan: What If the Internet Disappeared Forever?

Format: 1920x1080 landscape, 30 fps, 2D stick-figure scenes + motion graphics, ~370 s (6:10).
Timings below come from voice/timeline.json (draft narration, Fenrir). Re-lock after any script or voice change.
Voice: Kokoro "am_fenrir", pitched down ~2 semitones. Captions ON (use voice/words.json). Light music + SFX.

## Look (2D)
- Clean off-white or soft pastel backgrounds, thick dark outlines, flat colour, one accent colour per section.
- Stick-figure people with simple faces (reuse the "dot eyes, worried brows" expression set from the bridge video).
- Phones, signs and screens are the visual stars: big, readable, one idea per scene.
- Camera: slow push-in on every hold, quick slide/cut on scene changes, small shake on bad-news beats.
- Sections get a quiet colour shift: hook cool blue, money warm amber, slowdown grey, social media purple, month/year green.

## 60-second test (the first thing to build): 0:00 - 0:59.8 (voice/test60.wav)
| Time | Narration | Scene | Motion |
|------|-----------|-------|--------|
| 0.0-2.2 | Imagine waking up tomorrow morning. | Bedroom, figure in bed, soft morning light | Slow push-in, yawn |
| 2.2-5.5 | You reach for your phone. No notifications. | Hand grabs phone, screen shows empty lock screen | Cut to phone close-up |
| 5.8-10.3 | No messages. You open Instagram. Nothing. | Instagram-style app opens to blank white and a spinner | Spinner loops, figure's face drops |
| 11.0-14.0 | You try Google. It doesn't load. | Browser, "No connection" dinosaur-style icon | Tiny shake |
| 14.6-17.9 | You restart your Wi-Fi. Still nothing. | Router with blinking red light, figure unplugs and replugs | Cut between router and face |
| 18.5-22.6 | At first... network problem. But then you look outside. | Figure shrugs, walks to window, curtain pulled back | Push-in on window |
| 23.1-31.0 | Traffic lights... shops... flights... banks. | Four quick street scenes: tangled traffic lights, closed "cards not accepted" sign, departures board stuck on "DELAYED", bank queue | Fast cuts, one beat each, matching the four sentences |
| 31.5-33.8 | And then... on the radio. | Retro radio on a table, sound-wave rings | Slow zoom, dim lights |
| 34.3-38.9 | The internet is gone. Everywhere. And it's never coming back. | World map, glowing network lines switch off region by region | Big impact beat on "gone", flash on "never" |
| 39.4-44.0 | No explanation. No warning. No way to fix it. | Three stamp-style cards slam in: NO EXPLANATION, NO WARNING, NO FIX | Kick on each |
| 44.5-51.5 | What happens to the world... Let's find out. | Slow pull-back from a lone figure with a dead phone on a quiet street | Title card fades in after "find out" |
| 52.6-59.8 | The first few hours... flooded with calls. | Call-centre scene, phones ringing, figure overwhelmed | Hard cut into section two |

Acceptance for the test: scenes read at a glance, captions are legible, cuts land on the words, and the whole 60 s renders on the M2 Air in a few minutes.

## Rest of the video (outline, to detail after the test)
| Section | Start | Core visuals |
|---------|-------|--------------|
| First 24 hours | 52.6 s | Crowd at the supermarket checkout, card declined, cashier holds up "CASH ONLY" |
| Already happened, in miniature | 93.7 s | Three mini-news-cards: 2021 outage, Egypt 2011, Tonga cable; then a zoom-out to "now remove the rest of the world" |
| World slows down | 132.4 s | Hospital records room, supermarket empty shelf counter, factory with unplugged conveyor; "moving blindly" with a figure walking blindfolded |
| Without social media | 177.5 s | App icons popping like bubbles, figures going outside, park, library, radio, then a sad remote-worker figure |
| After one month | 233.3 s | Radio tower, post office, paper maps, undersea cable cross-section |
| After one year | 279.2 s | Classrooms, textbooks, closed borders, kid with no search bar |
| Ending | 328.7 s | Callback to the bedroom, figure with a paper map; final question held on screen with a slow fade |

## Technical notes
- Build with Remotion in the same project (new composition, 1920x1080), no three.js needed, so renders should be much faster than the bridge video.
- Captions: word-level from words.json; check numbers and names by hand ("Wi-Fi", "WhatsApp", "Instagram").
- Sound: build cue list from timeline.json (impact hits, UI beeps, radio static, footsteps). Light music bed, ducked under the voice.
- Channel branding: use a non-trademarked app look (rounded square icons with generic marks) to avoid reproducing real logos.
