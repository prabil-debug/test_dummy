# Project instructions for Claude Code (copy to CLAUDE.md in the channel's project folder)

You are helping a beginner build animated YouTube videos with Remotion (React/SVG), on an M2 MacBook Air with 8 GB RAM.
Read `channel-kit/HANDOFF.md` and this channel's spec before doing anything.

Rules:
- Explain in plain words; ask before anything big or irreversible; never commit unless asked.
- Build one look test first (6 half-size stills), then wait for approval.
- Never render two things at once. Use `--concurrency 1` and caffeinate. Draft at `--scale 0.5` first; ask before the full render.
- Follow the shot plan and its guardrails exactly (no real logos, no flags, no precise borders, no victims, no politics, etc.).
- Whenever the narration pauses >= 0.7 s, something on screen must keep moving.
- Cuts land 2 frames before their word; check word timings against the waveform; use the script's spelling for captions.
- Every on-screen number must match the script's fact sheet.
- Do a frame-by-frame QA and create an SRT file after the full render.
