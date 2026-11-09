# Shot plan: What If India Had Only 200 Million People?

Format: 1920x1080 landscape, 30 fps, about 380 s (6:19), about 11,400 frames.
Timings come from `voice/timeline.json` (sentence times) and `voice/words.json` (word times for captions). The narration is locked (Fenrir, natural pauses).
Style: same 2D stick-figure look as the internet video (flat colour, thick dark outlines, pastel backgrounds, one accent colour per section, word-by-word captions, small shakes on key words, slow push-in on every hold, cuts 2 frames before their word). Reuse the shared drawing kit and caption system from `InternetFull`.

## Guardrails for this topic (important)
- **No national flag, no tricolour palette, no religious or caste symbols.** Use neutral colours.
- **No precise national borders.** Borders are politically sensitive. Draw the country as a stylised dot-grid or soft blob shape, never a detailed outline. Never label disputed regions.
- **No stereotypes.** Show varied, ordinary people (different clothes, skin tones, ages). No "poverty tourism" imagery.
- **No real brand logos.** Generic icons only (train, bus, phone, school).
- **Neutral tone in visuals:** never show "the crowd" as a problem face; the story is trade-offs, not blame.

## Recurring visual devices
- **People dots:** a field of tiny stick figures. 1.46 billion is shown as a dense field; 200 million as a sparse field of the same area. Reuse for density, farms and the ending.
- **One in six / one in forty:** 6 figures with 1 lit; 40 figures with 1 lit. Appears in the hook and again in the last lines (callback).
- **Counters:** large number counters that roll up or down on their words (490 → 67, 1,500 m³, $2,800 → $21,500, 8M–20M jobs).
- **Balance scale:** "strain / strength" for the ending.

## Sections
| Time | Section | Accent | Key scenes and motion |
|------|---------|--------|-----------------------|
| 0:00-0:22 | THE QUESTION | deep blue | Row of 6 figures, one lights up ("one in six"); "1.46 billion" counter rolls up; 40-figure grid, one lights up ("one in forty"); dot-shape of the country stays the same while the crowd dots thin out ("same rivers, same borders"); three question cards pop: calm city, wallet, empty train seat; title card on "Let's find out" |
| 0:22-0:40 | THE RULES | slate grey | "Nobody disappears": crowd dots freeze and glow; timeline bar from 1901 ("238 million") to a stop mark at 200M; icons land: land, river, rain cloud ("monsoon"), dashed border-free outline |
| 0:40-1:20 | SPACE | warm orange | Density gauge 490 → 67 with a Mexico comparison tile (generic shape, no flag); busy morning: packed train and bus and classroom; then the same scenes with a free seat, shorter school-gate queue, flat with a spare room; cities with gaps between buildings; coins thin out over railway/road/school icons for "fewer taxpayers"; split "Luckily / Unluckily" card |
| 1:20-1:53 | WATER, LAND AND AIR | aqua | Water tank gauge at 1,500 m³ with a "stressed below 1,700" line; tank refills to ~7x on "seven times as much"; farmland and forest grow; fewer cars/factories; then a smaller crowd with more cars each and smoke ("it's about how they live") |
| 1:53-2:24 | FARMS AND FOOD | green | Field split into small plots as families grow: 2.3 → 1.08 hectares counter; "86 percent" plots highlighted; with 200M, plots stay larger, a tractor works a bigger field; "maybe" shrug; farmer with more land |
| 2:24-3:22 | THE MONEY QUESTION | gold | Pie labelled "4.3 trillion" ÷ 1.46B → "$2,800" figure; same pie ÷ 200M → "$21,500", confetti; "Here's the trap": pie shrinks as worker and customer icons vanish; "hands and buyers" icons; median-age bars (29 vs 39 vs 40); rich/poor small-country cards |
| 3:22-3:56 | JOBS | coral | Young people queue to a job board; counter "8 million to 20 million new jobs a year"; far fewer arrive in the 200M version; wage tag rises; then shop with fewer customers; "demand comes from people" |
| 3:56-4:32 | MORE PEOPLE, MORE IDEAS | purple | Meal vs idea: one meal eaten once, one lightbulb shared by everyone at once; Nobel medal tag ("2018"); crowd of thinkers vs a smaller group; "fewer scientists, engineers, founders" icons fade |
| 4:32-4:49 | A SMALLER GIANT | teal | Horizontal bars of country sizes with names (no flags): a 200M bar sits among the top ten; "smaller giant" label |
| 4:49-5:16 | THE SLOWDOWN | mint | Fertility gauge 1.9 vs 2.1 "steady" line; population line graph rises to a peak (~1.7 billion, early 2060s) then falls |
| 5:16-5:32 | FIFTY YEARS LATER | dusk blue | Age pyramid shifts older; fewer workers carry more older people; "different problems" |
| 5:32-5:54 | TWO MORNINGS | peach | Split screen: crowded bus + full classroom vs seat + smaller class; school further away; parents with a smaller pay packet; "nobody wins everything" |
| 5:54-6:19 | THE REAL ANSWER | deep blue (callback) | Balance scale: strain vs strength; "one in six" figure row returns; "one in forty" grid returns; final question held on screen; slow fade to black over the 2.5 s tail |

## Build order (Claude Code on the Mac)
1. Build the first three sections (0:00-1:20) as the **look test**: stills, then approve.
2. Build the rest section by section with stills, or in a batch once the style is trusted.
3. Sound mix, then full render, then frame check.

## Technical notes
- New composition `IndiaFull` (1920x1080, 30 fps, about 11,400 frames), next to `InternetFull`. Reuse `kit` (Figure, Phone, Stage, Spinner, Txt) and the caption component.
- Audio: `voice/narration_fenrir.wav` first; replace with the full mix after the sound step.
- Check word timings against the waveform; use the script's spelling for captions (numbers: "1.46", "$21,500", "2,800").
- Render settings from the kit: `--concurrency 1`, caffeinate, 1920x1080. Expect about 40-60 minutes for 11,400 frames on the M2 Air.
- Every on-screen number must match `SCRIPT.md` and `FACTS.md`.
