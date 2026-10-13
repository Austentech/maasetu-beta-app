#!/bin/bash
# Illustration 2 candidates: doctor consultation & follow-up scene
set -e
DIR=/home/z/my-project/scripts/services-candidates
mkdir -p "$DIR"

STYLE="Premium healthcare editorial illustration, cel-shaded semi-realistic digital art style with clean dark line art of uniform weight and soft airbrushed shading with subtle rim light, warm flat cream background with generous whitespace, calm reassuring premium maternal-healthcare mood, natural anatomy with correct hands and faces, warm Indian skin tones, no text anywhere in the image"

z-ai image -p "A warm in-person medical consultation: an Indian female gynecologist in her forties wearing a white coat over a deep burgundy blouse, seated behind a small clinic desk, leaning slightly forward, listening attentively with a kind smile and warm eye contact. Across the desk a pregnant Indian woman in a soft peach maternity dress sits holding her baby bump, mid-conversation, gesturing gently with one hand. On the desk between them a pregnancy timeline chart and a small folder. A subtle dotted line with tiny calendar and heartbeat icons floats above them. Eye-level view, two figures facing each other across the desk. $STYLE" -o "$DIR/consult-a.png" -s 1024x1024

z-ai image -p "A warm in-person medical consultation: an Indian female gynecologist in a white coat sits on a low stool angled toward a pregnant Indian woman in a deep burgundy maternity dress who is seated in an armchair, both leaning slightly toward each other in genuine attentive conversation; the doctor holds a clipboard with a care plan and nods reassuringly while the mother rests one hand on her baby bump. A small side table with a potted plant and a subtle dotted follow-up path with tiny calendar and heart icons above them. Eye-level view, composition of two seated figures in conversation. $STYLE" -o "$DIR/consult-b.png" -s 1024x1024

z-ai image -p "A warm in-person medical consultation: an Indian female doctor in a white coat over a peach blouse sits across a rounded clinic table from a pregnant Indian woman in a burgundy dress, the doctor writing a follow-up plan in a notebook while looking up listening attentively to the mother, who holds a small notebook and rests her other hand on her baby bump, both with kind engaged expressions. On the table a pregnancy chart and a cup of chai. A subtle dotted line with tiny heart and calendar icons connects them. Eye-level view, two figures facing each other. $STYLE" -o "$DIR/consult-c.png" -s 1024x1024

echo "CONSULT CANDIDATES DONE"
