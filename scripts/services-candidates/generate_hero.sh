#!/bin/bash
# MaaSetu Services page illustration candidates
# Style DNA matched to existing hero-consultation.png / about-consultation.png:
# cel-shaded semi-realistic digital illustration, clean dark line art, soft
# airbrushed shading, warm cream background, Indian characters, brand palette.
set -e
DIR=/home/z/my-project/scripts/services-candidates
mkdir -p "$DIR"

STYLE="Premium healthcare editorial illustration, cel-shaded semi-realistic digital art style with clean dark line art of uniform weight and soft airbrushed shading with subtle rim light, warm flat cream background with generous whitespace, calm reassuring premium maternal-healthcare mood, natural anatomy with correct hands and faces, warm Indian skin tones, no text anywhere in the image"

# ---------- Illustration 1 candidates: expecting mother, calm care context ----------
z-ai image -p "A serene pregnant Indian woman in her late twenties standing in gentle three-quarter view, both hands softly cradling her baby bump, wearing a flowing deep burgundy maternity dress with a soft peach dupatta draped over one shoulder, dark hair in a low bun with a small white flower, peaceful gentle smile, eyes softly closed. Around her float subtle care-coordination motifs: a delicate dotted arc path with tiny calendar and heart icons in muted red. Soft peach ground shadow beneath her feet. Single figure composition. $STYLE" -o "$DIR/hero-a.png" -s 1024x1024

z-ai image -p "A serene pregnant Indian woman in her late twenties standing in side profile, one hand resting protectively on her baby bump, the other arm relaxed at her side, wearing an elegant deep burgundy maternity anarkali dress with a peach dupatta, dark hair in a low bun, calm content expression looking softly ahead. Behind her a tall arch window shape in pale peach, beside her a small potted plant, and a delicate dotted path with tiny heart marks floating near the bump. Soft ground shadow. Single figure composition. $STYLE" -o "$DIR/hero-b.png" -s 1024x1024

z-ai image -p "A serene pregnant Indian woman in her late twenties seated gracefully on a low wooden bench in three-quarter view, both hands cradling her baby bump, wearing a flowing deep burgundy dress with a peach dupatta over one shoulder, dark hair in a soft low bun with a small flower, peaceful smile, eyes gently closed. Above and around her, a subtle dotted arc with tiny calendar, envelope and heart icons floats like a gentle care timeline. Soft peach shadow beneath the bench. Single figure composition. $STYLE" -o "$DIR/hero-c.png" -s 1024x1024

echo "HERO CANDIDATES DONE"
