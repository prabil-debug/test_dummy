# Visual upgrade v2 for the stick-figure style (richer, but not overdone)

Apply to new builds (body-count video first). Keep the same characters and line style; improve depth, motion, colour and polish.

## What to add
1. **Depth:** 3 layers max (background, midground, foreground) with slow parallax drift (at most 2% of frame width over a scene). A soft ground shadow under characters. A very light vignette (about 8%).
2. **Character life:** blinking every 3-5 s, small eyebrow and mouth changes on key words, an idle bob, squash-and-stretch on pop-ins (ease-out-back), arms with slight follow-through. Characters react to the narration (look at the number, shrug, lean in).
3. **Colour:** one palette per section (3 main colours + neutrals), a soft gradient sky or wall, and a very subtle grain (under 3% opacity). Keep the outline colour #14142b. Accent colour reserved for the one thing the viewer should look at.
4. **Camera:** slow push-in on every hold; an occasional gentle pan; section changes with a quick whip or iris wipe (at most 12 frames). Keep one camera move per scene.
5. **Motion graphics:** eased counter roll-ups, bars that grow, callout lines that draw on, highlight swipes on key words, a number-above-the-head device for this video. All with consistent easing.
6. **Props and detail:** 2-3 context props per scene (window, plant, phone, sign) so scenes feel lived-in; reuse a small library so the style stays consistent.
7. **Captions:** keep the word-by-word highlight; add a tiny scale pop on the highlighted word.
8. **Sound sync:** whoosh on transitions, tick on counters, soft pop on pop-ins (already in the mix), plus gentle room tone per scene.

## Don't overdo it (hard limits)
- At most 3 animated elements at once besides the characters' idle motion; one clear focal point per frame.
- At most 4 colours per scene (plus outline); no rainbow, no neon.
- No particle storms, no constant camera shake; shakes only on one impact word per section.
- Background motion must stop or slow during key counters and numbers.
- Transitions at most 12 frames; no spinning or zooming transitions.
- Keep render time reasonable (target under 15 minutes for the full video at concurrency 1).
- Squint test: if the key thing isn't obvious when the still is shrunk to thumbnail size, remove something.

## QA
Review about 12 stills across the video and one 20-second motion clip before the full render. Check: readability, focal point, colour balance, no overlapping text, and that motion fills every pause of 0.7 s or longer without becoming busy.
