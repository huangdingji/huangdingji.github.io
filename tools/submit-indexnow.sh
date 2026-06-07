#!/bin/bash
# submit-indexnow.sh
# Submit all sitemap URLs to IndexNow (Bing, Yandex, Naver, Seznam)
# Usage:
#   ./tools/submit-indexnow.sh                # submit all URLs from sitemaps
#   ./tools/submit-indexnow.sh URL1 URL2 ...  # submit specific URLs
#
# Requirements: curl, python3 (for sitemap parsing)

set -e

CONFIG="$(dirname "$0")/indexnow-config.json"
HOST=$(python3 -c "import json; print(json.load(open('$CONFIG'))['host'])")
KEY=$(python3 -c "import json; print(json.load(open('$CONFIG'))['key'])")
KEY_LOC=$(python3 -c "import json; print(json.load(open('$CONFIG'))['keyLocation'])")
ENDPOINT=$(python3 -c "import json; print(json.load(open('$CONFIG'))['endpoint'])")

SITE_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# ---------- collect URLs ----------
if [ $# -gt 0 ]; then
  URLS="$@"
  echo "Using $# URLs from command line"
else
  # Parse sitemapindex.xml → all sitemap-*.xml → all <loc>
  echo "Collecting URLs from sitemaps in $SITE_ROOT ..."
  URLS=""
  for sitemap in "$SITE_ROOT"/sitemap-*.xml "$SITE_ROOT"/sitemap.xml; do
    [ -f "$sitemap" ] || continue
    while IFS= read -r u; do
      [ -z "$u" ] && continue
      URLS="$URLS $u"
    done < <(grep -oE '<loc>[^<]+</loc>' "$sitemap" | sed -E 's#</?loc>##g')
  done
  # Also include the key verification URL (IndexNow will fail if you only submit sitemaps without checking the key)
  URLS="$URLS https://$HOST/$KEY.txt"
  URL_COUNT=$(echo $URLS | wc -w)
  echo "Found $URL_COUNT URLs in sitemaps"
fi

# ---------- chunk into batches of 10000 (IndexNow max) ----------
BATCH_SIZE=10000
URL_ARR=($URLS)
TOTAL=${#URL_ARR[@]}
echo "Total URLs to submit: $TOTAL"

SUBMITTED=0
while [ $SUBMITTED -lt $TOTAL ]; do
  REMAINING=$((TOTAL - SUBMITTED))
  COUNT=$((REMAINING < BATCH_SIZE ? REMAINING : BATCH_SIZE))

  # Build JSON payload
  PAYLOAD=$(python3 -c "
import json, sys
host = '$HOST'
key = '$KEY'
key_loc = '$KEY_LOC'
urls = '''${URL_ARR[@]:$SUBMITTED:$COUNT}'''.split()
print(json.dumps({
    'host': host,
    'key': key,
    'keyLocation': key_loc,
    'urlList': urls
}, indent=2))
")

  echo "Submitting batch $((SUBMITTED+1))-$((SUBMITTED+COUNT)) ..."
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$ENDPOINT" \
    -H "Content-Type: application/json; charset=utf-8" \
    -d "$PAYLOAD")

  if [ "$HTTP_CODE" = "200" ]; then
    echo "  ✓ 200 OK (URLs accepted)"
  elif [ "$HTTP_CODE" = "202" ]; then
    echo "  ✓ 202 Accepted (URLs received, will be crawled)"
  elif [ "$HTTP_CODE" = "400" ]; then
    echo "  ✗ 400 Bad Request — check key, host, or URL format"
    exit 1
  elif [ "$HTTP_CODE" = "403" ]; then
    echo "  ✗ 403 Forbidden — key file not found or doesn't match key"
    echo "  Make sure $KEY_LOC returns: $KEY"
    exit 1
  elif [ "$HTTP_CODE" = "422" ]; then
    echo "  ✗ 422 Unprocessable Entity — URL list invalid"
    exit 1
  elif [ "$HTTP_CODE" = "429" ]; then
    echo "  ✗ 429 Too Many Requests — wait and retry"
    exit 1
  else
    echo "  ? HTTP $HTTP_CODE"
  fi

  SUBMITTED=$((SUBMITTED + COUNT))
done

echo ""
echo "Done. IndexNow will distribute to Bing, Yandex, Naver, Seznam."
echo "Expected indexation: 24-72 hours for first crawl."
