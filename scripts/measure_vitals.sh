#!/usr/bin/env bash
# Measure performance vitals per route against the standalone production
# server (:3100). Each route uses an isolated agent-browser session
# (fresh context => empty HTTP cache) and reads the Performance API.
# Honest caveat: no network throttling — lab numbers, not field data.
set -uo pipefail

BASE=http://127.0.0.1:3100
VITALS_JS='(()=>{
  const nav = performance.getEntriesByType("navigation")[0];
  const paints = performance.getEntriesByType("paint");
  const fcp = paints.find(p=>p.name==="first-contentful-paint");
  let lcp = 0;
  const lcps = performance.getEntriesByType("largest-contentful-paint");
  if (lcps.length) lcp = lcps[lcps.length-1].startTime;
  let cls = 0;
  performance.getEntriesByType("layout-shift").forEach(s=>{
    if(!s.hadRecentInput) cls += s.value;
  });
  return JSON.stringify({
    fcp: fcp ? Math.round(fcp.startTime) : null,
    lcp: lcp ? Math.round(lcp) : null,
    cls: Math.round(cls*1000)/1000,
    transferKB: nav ? Math.round(nav.transferSize/1024) : null,
    transferEncKB: nav ? Math.round(nav.decodedBodySize/1024) : null,
    loadMs: nav ? Math.round(nav.loadEventEnd) : null
  });
})()'

measure () { # $1=route $2=session-name $3=viewport
  agent-browser --session "$2" set viewport $3 >/dev/null 2>&1
  agent-browser --session "$2" open "$BASE$1" >/dev/null 2>&1
  agent-browser --session "$2" wait --load networkidle >/dev/null 2>&1
  agent-browser --session "$2" wait 800 >/dev/null 2>&1
  echo "$1 [$3] $(agent-browser --session "$2" eval "$VITALS_JS" 2>/dev/null)"
  agent-browser --session "$2" close >/dev/null 2>&1
}

echo "== production vitals (standalone :3100, no throttling) =="
for r in / /about /services /patients /doctors /contact /privacy /terms; do
  measure "$r" "vitals-$(echo $r | tr '/' '_')" "1440 900"
done
measure "/" "vitals-home-mobile" "390 844"
measure "/about" "vitals-about-mobile" "390 844"
measure "/services" "vitals-services-mobile" "390 844"
