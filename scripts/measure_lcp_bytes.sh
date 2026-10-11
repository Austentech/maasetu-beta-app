#!/usr/bin/env bash
# LCP (buffered PerformanceObserver) + shipped-byte audit per route,
# against the standalone production server on :3100.
set -uo pipefail
BASE=http://127.0.0.1:3100

LCP_JS='new Promise(res=>{let l=0;new PerformanceObserver(list=>{const e=list.getEntries();if(e.length)l=e[e.length-1].startTime;}).observe({type:"largest-contentful-paint",buffered:true});setTimeout(()=>res(Math.round(l)),1600)})'

BYTES_JS='(()=>{
  const nav = performance.getEntriesByType("navigation")[0];
  const r = performance.getEntriesByType("resource");
  let js=0, fonts=0, imgs=0, other=0, njs=0;
  r.forEach(e=>{
    const n = e.name.split("?")[0];
    const kb = (e.transferSize||0)/1024;
    if (n.endsWith(".js")||n.includes("/chunks/")||n.includes("/_next/static/chunks")) { js+=kb; njs++; }
    else if (n.endsWith(".woff2")||n.endsWith(".woff")) fonts+=kb;
    else if (n.includes("/_next/image")||n.endsWith(".png")||n.endsWith(".svg")) imgs+=kb;
    else other+=kb;
  });
  return JSON.stringify({docKB:Math.round((nav?nav.transferSize:0)/1024), jsKB:Math.round(js), jsFiles:njs, fontKB:Math.round(fonts), imgKB:Math.round(imgs), otherKB:Math.round(other)});
})()'

echo "== LCP + bytes (production standalone :3100, no throttling) =="
for spec in "/:1440:900" "/:390:844" "/about:1440:900" "/services:1440:900" "/patients:1440:900"; do
  route="${spec%%:*}"; rest="${spec#*:}"; w="${rest%%:*}"; h="${rest##*:}"
  s="lcp-$(echo "$route" | tr '/' '_')-$w"
  agent-browser --session "$s" set viewport "$w" "$h" >/dev/null 2>&1
  agent-browser --session "$s" open "$BASE$route" >/dev/null 2>&1
  agent-browser --session "$s" wait --load networkidle >/dev/null 2>&1
  agent-browser --session "$s" wait 700 >/dev/null 2>&1
  lcp=$(agent-browser --session "$s" eval "$LCP_JS" 2>/dev/null | tail -1)
  bytes=$(agent-browser --session "$s" eval "$BYTES_JS" 2>/dev/null | tail -1)
  echo "$route ${w}x${h}: LCP=${lcp}ms  bytes=${bytes}"
  agent-browser --session "$s" close >/dev/null 2>&1
done
