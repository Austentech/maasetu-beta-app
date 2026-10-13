#!/bin/bash
# VLM rubric evaluation of the six Services illustration candidates.
set -e
DIR=/home/z/my-project/scripts/services-candidates

RUBRIC="You are an art director QA-ing an illustration for a premium Indian maternal healthcare website (MaaSetu). Evaluate this illustration against this rubric and answer each point concisely:
1. SUBJECT: Is the woman clearly, unmistakably pregnant? Indian appearance? Describe pose and expression.
2. ANATOMY: Inspect hands (count fingers, structure), face, proportions, pregnancy bump plausibility. List ANY defects precisely.
3. TEXT ARTIFACTS: Is there ANY text, lettering, gibberish writing, or pseudo-text anywhere (including on floating icons, charts, calendars, documents)? This is a disqualifier for print-quality use.
4. STYLE: Cel-shaded semi-realistic illustration with clean dark line art on a warm cream background? Does it match a warm premium healthcare brand (burgundy/red/peach palette)?
5. COMPOSITION: Clear focal point, generous whitespace, calm premium mood?
6. VERDICT: score /10 and one-line verdict (ACCEPT / REVISE / REJECT)."

for f in hero-a hero-b hero-c consult-a consult-b consult-c; do
  echo "=== $f ==="
  z-ai vision -p "$RUBRIC" "$DIR/$f.png" -o "$DIR/vlm-$f.json" 2>/dev/null | tail -1
done
echo "ALL EVALS DONE"
