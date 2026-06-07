#!/usr/bin/env python3
"""
IndexNow URL submission tool.
Usage:
    python3 submit-indexnow.py                  # submit all URLs from sitemaps
    python3 submit-indexnow.py URL1 URL2 ...    # submit specific URLs
"""
import json
import os
import subprocess
import sys
import re
from pathlib import Path

# ---------- Load config ----------
TOOLS_DIR = Path(__file__).resolve().parent
SITE_ROOT = TOOLS_DIR.parent
CONFIG_FILE = TOOLS_DIR / "indexnow-config.json"

config = json.load(open(CONFIG_FILE))
HOST = config["host"]
KEY_LOC = config["keyLocation"]
ENDPOINT = config["endpoint"]

# Security: read API key from environment first, fall back to config.
# This lets GitHub Actions supply the key via secret, so we never
# need to commit the real key to the repo.
KEY = os.environ.get("INDEXNOW_KEY") or config.get("key", "")
if not KEY:
    print("ERROR: No API key found.", file=sys.stderr)
    print("Set INDEXNOW_KEY environment variable, or fill 'key' in", file=sys.stderr)
    print("tools/indexnow-config.json", file=sys.stderr)
    sys.exit(1)

# ---------- Collect URLs ----------
def collect_from_sitemaps():
    urls = set()
    for sitemap in sorted(SITE_ROOT.glob("sitemap*.xml")):
        if sitemap.name == "sitemapindex.xml":
            continue  # skip index, it references the others
        content = sitemap.read_text()
        for m in re.findall(r"<loc>(.*?)</loc>", content):
            urls.add(m)
    return sorted(urls)


if len(sys.argv) > 1:
    urls = sys.argv[1:]
    print(f"Using {len(urls)} URLs from command line")
else:
    urls = collect_from_sitemaps()
    print(f"Found {len(urls)} unique URLs in sitemaps (after dedup across language variants)")

if not urls:
    print("ERROR: No URLs to submit")
    sys.exit(1)

# ---------- Build payload ----------
payload = {
    "host": HOST,
    "key": KEY,
    "keyLocation": KEY_LOC,
    "urlList": urls,
}

# IndexNow max is 10,000 URLs per request
BATCH_SIZE = 10000
total = len(urls)
print(f"Submitting {total} URLs to {ENDPOINT}")
print(f"  Host: {HOST}")
print(f"  Key:  {KEY}")
print(f"  Key Location: {KEY_LOC}")
print()

submitted = 0
while submitted < total:
    batch = urls[submitted:submitted + BATCH_SIZE]
    batch_payload = {**payload, "urlList": batch}

    print(f"Submitting batch {submitted + 1}-{submitted + len(batch)} ({len(batch)} URLs)...")
    result = subprocess.run(
        [
            "curl", "-sS", "-w", "\n---HTTP_CODE:%{http_code}---\n",
            "-X", "POST", ENDPOINT,
            "-H", "Content-Type: application/json; charset=utf-8",
            "-d", json.dumps(batch_payload),
        ],
        capture_output=True, text=True, timeout=60,
    )

    code_m = re.search(r"---HTTP_CODE:(\d+)---", result.stdout)
    http_code = code_m.group(1) if code_m else "?"
    body = result.stdout.replace(f"\n---HTTP_CODE:{http_code}---\n", "").strip()

    if http_code == "200":
        print(f"  ✓ 200 OK (URLs accepted)")
    elif http_code == "202":
        print(f"  ✓ 202 Accepted (URLs received, will be crawled)")
    elif http_code == "400":
        print(f"  ✗ 400 Bad Request — check key/host/URL format")
        print(f"  Body: {body[:200]}")
        sys.exit(1)
    elif http_code == "403":
        print(f"  ✗ 403 Forbidden — key file not found or doesn't match key")
        print(f"  Verify {KEY_LOC} returns: {KEY}")
        sys.exit(1)
    elif http_code == "422":
        print(f"  ✗ 422 Unprocessable Entity — URL list invalid")
        print(f"  Body: {body[:200]}")
        sys.exit(1)
    elif http_code == "429":
        print(f"  ✗ 429 Too Many Requests — wait and retry")
        sys.exit(1)
    else:
        print(f"  ? HTTP {http_code}")
        if body:
            print(f"  Body: {body[:200]}")

    submitted += len(batch)

print()
print("Done. IndexNow will distribute to Bing, Yandex, Naver, Seznam.")
print("Expected indexation: 24-72 hours for first crawl.")
