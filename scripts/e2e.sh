#!/usr/bin/env bash
# HTTP-level E2E for the familyverse rebuild (#16): session guard, feed
# contract, validation error codes, membership-vs-person delete semantics,
# register -> MailHog -> confirm, invite restriction, cross-family isolation.
# Plus #20 auth hardening: min-8 password, confirmation resend (re-register
# and POST /api/register/resend), expired/invalid token handling.
# Prereqs: dev stack running and seeded (docker compose up) — the seeded
# content asserts below pin the DEFAULT dataset (SEED_FAMILY=trump, #21).
# Usage:   ./scripts/e2e.sh   (override target with E2E_BASE=http://host:port)
set -u
REPO="$(cd "$(dirname "$0")/.." && pwd)"
WORK="$(mktemp -d)"; cd "$WORK"
BASE="${E2E_BASE:-http://localhost:3000}"
J1=j1.txt J2=j2.txt
rm -f $J1 $J2 feed.json fams.json create.json
PASS=0; FAIL=0
ok()  { echo "PASS  $1"; PASS=$((PASS+1)); }
bad() { echo "FAIL  $1"; FAIL=$((FAIL+1)); }
expect() { if [ "$2" = "$3" ]; then ok "$1 [$2]"; else bad "$1 — got '$2' want '$3'"; fi; }

login() { # jar email password — NextAuth v4 wants the field named csrfToken
  local csrf url
  csrf=$(curl -s -c "$1" $BASE/api/auth/csrf | python3 -c 'import json,sys;print(json.load(sys.stdin)["csrfToken"])')
  url=$(curl -s -b "$1" -c "$1" -X POST $BASE/api/auth/callback/credentials \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode "email=$2" --data-urlencode "password=$3" \
    --data-urlencode "csrfToken=$csrf" --data-urlencode "json=true" \
    | python3 -c 'import json,sys;print(json.load(sys.stdin).get("url",""))')
  case "$url" in
    *error*|*csrf*) echo "LOGIN FAILED for $2 -> $url" ;;
    *) echo "login ok: $2" ;;
  esac
}

confirm_email() { # email -> prints token (via psql; MailHog delivery asserted separately)
  docker compose -f "$REPO/docker-compose.yml" exec -T postgres \
    psql -U familyverse -d familyverse -tAc \
    "SELECT \"confirmationToken\" FROM \"User\" WHERE email='$1'" | tr -d '[:space:]'
}

mailhog_total() { # -> MailHog's message total (HTTP API on :8025, #20 resend checks)
  curl -s http://localhost:8025/api/v2/messages \
    | python3 -c 'import json,sys;print(json.load(sys.stdin)["total"])'
}

echo "--- 1. auth & session guard"
expect "unauth / redirects to /login" \
  "$(curl -s -o /dev/null -w '%{http_code}' $BASE/)" "307"
if curl -s $BASE/login | grep -q "Create account"; then ok "login page renders tabbed AuthCard"; else bad "login page AuthCard markup"; fi
if curl -s $BASE/register | grep -q "Sign in"; then ok "register page renders tabbed AuthCard"; else bad "register page AuthCard markup"; fi

login $J1 demo@familyverse.local demo123
expect "demo login session" "$(curl -s -o /dev/null -w '%{http_code}' -b $J1 $BASE/api/families)" "200"

FAM_ID=$(curl -s -b $J1 $BASE/api/families | python3 -c 'import json,sys;print(json.load(sys.stdin)[0]["id"])')
echo "      demo family id=$FAM_ID"
# Regression for the profile-crumb 400 (params destructured the wrong key).
expect "family details 200" "$(curl -s -o /dev/null -w '%{http_code}' -b $J1 $BASE/api/families/$FAM_ID)" "200"

echo "--- 2. feed shape & seeded content"
curl -s -b $J1 $BASE/api/families/$FAM_ID/people -o feed.json
python3 - <<'EOF' && ok "feed: flat shape, 28/33/6, Trump names, 11 pictures, bio, no raw picturePath, Friedrich deceased, board slip dropped" || bad "feed shape/content asserts"
import json
f = json.load(open('feed.json'))
assert set(f) == {'people', 'parentChild', 'partnerships'}, f.keys()
assert (len(f['people']), len(f['parentChild']), len(f['partnerships'])) == (28, 33, 6)
names = {p['fullName'] for p in f['people']}
assert {'Friedrich Trumpf','Elisabeth Christ','Donald Trump','Melania Trump','Ivanka Trump','Barron Trump'} <= names
assert sum(1 for p in f['people'] if p['pictureUrl']) == 11
assert all('picturePath' not in p for p in f['people'])
friedrich = next(p for p in f['people'] if p['fullName'] == 'Friedrich Trumpf')
assert friedrich['bio'] and '**barber and restaurateur**' in friedrich['bio']
assert friedrich['deathDate'] is not None
# #21: the board recorded Elisabeth (Friedrich's wife) as his child — dropped.
elisabeth = next(p for p in f['people'] if p['fullName'] == 'Elisabeth Christ')
assert not any(e['childId'] == elisabeth['id'] for e in f['parentChild'])
assert any(e['role'] == 'BIOLOGICAL' for e in f['parentChild'])
assert all(k['kind'] == 'MARRIED' for k in f['partnerships'])
EOF

DONALD=$(python3 -c "import json;f=json.load(open('feed.json'));print(next(p['id'] for p in f['people'] if p['fullName']=='Donald Trump'))")
DONALD_JR=$(python3 -c "import json;f=json.load(open('feed.json'));print(next(p['id'] for p in f['people'] if p['fullName']=='Donald Trump Jr.'))")
IVANKA=$(python3 -c "import json;f=json.load(open('feed.json'));print(next(p['id'] for p in f['people'] if p['fullName']=='Ivanka Trump'))")
DONALD_PIC=$(python3 -c "import json;f=json.load(open('feed.json'));print(next(p['pictureUrl'] for p in f['people'] if p['fullName']=='Donald Trump'))")

expect "picture proxy serves jpeg to a session" \
  "$(curl -s -o /dev/null -w '%{http_code} %{content_type}' -b $J1 "$BASE$DONALD_PIC")" "200 image/jpeg"

echo "--- 3. create person with roles + partnership"
CRE=$(curl -s -b $J1 -X POST "$BASE/api/families/$FAM_ID/people" \
  -F "fullName=E2E Orphan" -F "gender=Non-binary" -F "birthDate=2000-01-02" \
  -F "deathDate=" -F "birthPlace=Testville" -F "bio=**e2e**" \
  -F "parents=[{\"parentId\":$DONALD,\"role\":\"FOSTER\"},{\"parentId\":$IVANKA,\"role\":\"LEGAL_GUARDIAN\"}]" \
  -F "partnerships=[{\"personId\":$IVANKA,\"kind\":\"COHABITATION\"}]" \
  -o create.json -w '%{http_code}')
expect "POST person 201" "$CRE" "201"
python3 - <<'EOF' && ok "create response: person + 2 role edges + 1 canonical partnership" || bad "create response asserts"
import json
r = json.load(open('create.json'))
assert r['person']['fullName'] == 'E2E Orphan'
assert r['person']['gender'] == 'Non-binary'
assert len(r['parentChild']) == 2 and {e['role'] for e in r['parentChild']} == {'FOSTER', 'LEGAL_GUARDIAN'}
assert len(r['partnerships']) == 1 and r['partnerships'][0]['kind'] == 'COHABITATION'
p = r['partnerships'][0]
assert p['personAId'] < p['personBId'], 'canonical order violated'
EOF
A_ID=$(python3 -c "import json;print(json.load(open('create.json'))['person']['id'])")

echo "--- 4. validation error codes"
RESP=$(curl -s -b $J1 -X POST "$BASE/api/families/$FAM_ID/people" -F "fullName=NoGender" -w $'\n%{http_code}')
expect "missing gender -> 400" "${RESP##*$'\n'}" "400"
BODY=${RESP%$'\n'*}
expect "missing gender code" "$(python3 -c "import json;print(json.loads('''$BODY''').get('code'))")" "MISSING_FIELD"
BODY=$(curl -s -b $J1 -X POST "$BASE/api/families/$FAM_ID/people" -F "fullName=X" -F "gender=Female" -F 'parents=[{"parentId":999999,"role":"BIOLOGICAL"}]')
expect "dangling parent -> BAD_REFERENCE" "$(python3 -c "import json;print(json.loads('''$BODY''').get('code'))")" "BAD_REFERENCE"
# PNG is a VALID type here (jpg|jpeg|png|webp by magic bytes), so a
# PNG-with-garbage would pass — use a GIF header, which must be rejected.
printf 'GIF89a-definitely-not-allowed' > fake.gif
BODY=$(curl -s -b $J1 -X PATCH "$BASE/api/people/$A_ID" -F "picture=@fake.gif")
expect "bad magic bytes -> PICTURE_INVALID_TYPE" "$(python3 -c "import json;print(json.loads('''$BODY''').get('code'))")" "PICTURE_INVALID_TYPE"
python3 -c "open('big.jpg','wb').write(b'\xff\xd8\xff' + b'\0' * (5*1024*1024))"
BODY=$(curl -s -b $J1 -X PATCH "$BASE/api/people/$A_ID" -F "picture=@big.jpg")
expect "oversize -> PICTURE_TOO_LARGE" "$(python3 -c "import json;print(json.loads('''$BODY''').get('code'))")" "PICTURE_TOO_LARGE"

echo "--- 5. PATCH desired-full-set semantics"
curl -s -b $J1 -X PATCH "$BASE/api/people/$A_ID" \
  -F "fullName=E2E Orphan Renamed" -F "gender=Not said" \
  -F "parents=[{\"parentId\":$DONALD_JR,\"role\":\"BIOLOGICAL\"}]" \
  -F "partnerships=[]" -o patch.json -w '%{http_code}' > patch.code
expect "PATCH 200" "$(cat patch.code)" "200"
python3 - <<'EOF' && ok "PATCH: rename, canonical gender, parents replaced (2->1), partnership set cleared" || bad "PATCH asserts"
import json
r = json.load(open('patch.json'))
assert r['person']['fullName'] == 'E2E Orphan Renamed'
assert r['person']['gender'] == 'Not said'
assert len(r['parentChild']) == 1 and r['parentChild'][0]['parentId'] is not None
assert r['partnerships'] == []
EOF

echo "--- 6. picture upload / proxy / remove / unlink"
printf '\xff\xd8\xff\xe0\x00\x10JFIF\x00' > tiny.jpg
P1=$(curl -s -b $J1 -X PATCH "$BASE/api/people/$A_ID" -F "picture=@tiny.jpg")
PURL=$(python3 -c "import json;print(json.loads('''$P1''')['person']['pictureUrl'])")
expect "uploaded pictureUrl set" "$( [ -n "$PURL" ] && echo yes )" "yes"
expect "proxy serves uploaded file" "$(curl -s -o /dev/null -w '%{http_code}' -b $J1 "$BASE$PURL")" "200"
P2=$(curl -s -b $J1 -X PATCH "$BASE/api/people/$A_ID" -F "removePicture=true")
expect "pictureUrl cleared" "$(python3 -c "import json;print(json.loads('''$P2''')['person']['pictureUrl'])")" "None"
expect "old file unlinked (proxy 404)" "$(curl -s -o /dev/null -w '%{http_code}' -b $J1 "$BASE$PURL")" "404"
expect "proxy rejects non-UUID name" "$(curl -s -o /dev/null -w '%{http_code}' -b $J1 "$BASE/api/pictures/evil.png")" "404"

echo "--- 7. membership delete keeps the person (#5 deliberate change)"
expect "DELETE membership 200" \
  "$(curl -s -b $J1 -X DELETE "$BASE/api/families/$FAM_ID/people/$A_ID" -o /dev/null -w '%{http_code}')" "200"
curl -s -b $J1 $BASE/api/families/$FAM_ID/people -o feed2.json
expect "feed back to 28 people" "$(python3 -c "import json;print(len(json.load(open('feed2.json'))['people']))")" "28"
expect "orphaned person row persists (psql)" \
  "$(docker compose -f "$REPO/docker-compose.yml" exec -T postgres psql -U familyverse -d familyverse -tAc "SELECT count(*) FROM \"Person\" WHERE id=$A_ID" | tr -d '[:space:]')" "1"
expect "orphan is invisible to API (no shared family) -> 403" \
  "$(curl -s -o /dev/null -w '%{http_code}' -b $J1 $BASE/api/people/$A_ID)" "403"

echo "--- 8. person delete cascades + picture cleanup"
curl -s -b $J1 -X POST "$BASE/api/families/$FAM_ID/people" \
  -F "fullName=E2E Doomed" -F "gender=Male" -F "picture=@tiny.jpg" -o create2.json
B_ID=$(python3 -c "import json;print(json.load(open('create2.json'))['person']['id'])")
expect "DELETE person 200" \
  "$(curl -s -b $J1 -X DELETE "$BASE/api/people/$B_ID" -o /dev/null -w '%{http_code}')" "200"
expect "person gone -> 404" \
  "$(curl -s -o /dev/null -w '%{http_code}' -b $J1 $BASE/api/people/$B_ID)" "404"
curl -s -b $J1 $BASE/api/families/$FAM_ID/people -o feed3.json
expect "feed still 28" "$(python3 -c "import json;print(len(json.load(open('feed3.json'))['people']))")" "28"

echo "--- 9. register -> MailHog -> confirm -> login -> create family"
expect "register e2e-one 201" \
  "$(curl -s -X POST $BASE/api/register -H 'Content-Type: application/json' \
      -d '{"email":"e2e-one@familyverse.local","password":"secret123","website_url":""}' -o /dev/null -w '%{http_code}')" "201"
expect "honeypot rejected" \
  "$(curl -s -X POST $BASE/api/register -H 'Content-Type: application/json' \
      -d '{"email":"bot@familyverse.local","password":"secret123","website_url":"http://spam"}' -o /dev/null -w '%{http_code}')" "400"
expect "MailHog received >=1 message" \
  "$( [ "$(mailhog_total)" -ge 1 ] && echo yes )" "yes"
# #20 D7: the minimum is 8 — a 6-char password must be refused pre-insert.
expect "6-char password rejected 400" \
  "$(curl -s -X POST $BASE/api/register -H 'Content-Type: application/json' \
      -d '{"email":"short-pw@familyverse.local","password":"secret1","website_url":""}' -o /dev/null -w '%{http_code}')" "400"
expect "6-char attempt created no account" \
  "$(curl -s -X POST $BASE/api/register/resend -H 'Content-Type: application/json' \
      -d '{"email":"short-pw@familyverse.local"}' -o /dev/null -w '%{http_code}')" "404"
# #20 D2: re-registering an UNCONFIRMED email resends (fresh token) instead of
# 409ing — assert the MailHog total actually grows.
MSGS=$(mailhog_total)
expect "re-register unconfirmed email 200 (resends)" \
  "$(curl -s -X POST $BASE/api/register -H 'Content-Type: application/json' \
      -d '{"email":"e2e-one@familyverse.local","password":"secret123","website_url":""}' -o /dev/null -w '%{http_code}')" "200"
expect "re-register delivered a second message" \
  "$( [ "$(mailhog_total)" -gt "$MSGS" ] && echo yes )" "yes"
# #20 D2: the /confirm page's resend affordance posts to this endpoint.
MSGS=$(mailhog_total)
expect "resend endpoint 200 for pending email" \
  "$(curl -s -X POST $BASE/api/register/resend -H 'Content-Type: application/json' \
      -d '{"email":"e2e-one@familyverse.local"}' -o /dev/null -w '%{http_code}')" "200"
expect "resend endpoint delivered a message" \
  "$( [ "$(mailhog_total)" -gt "$MSGS" ] && echo yes )" "yes"
expect "resend endpoint 404 for unknown email" \
  "$(curl -s -X POST $BASE/api/register/resend -H 'Content-Type: application/json' \
      -d '{"email":"nobody-at-all@familyverse.local"}' -o /dev/null -w '%{http_code}')" "404"
TOKEN=$(confirm_email e2e-one@familyverse.local)
expect "confirmation token stored" "$( [ -n "$TOKEN" ] && echo yes )" "yes"
expect "confirm 200" \
  "$(curl -s -X POST $BASE/api/register/confirm -H 'Content-Type: application/json' -d "{\"token\":\"$TOKEN\"}" -o /dev/null -w '%{http_code}')" "200"
# #20 D2: the invalid-token reply the /confirm UI turns into its human message
# + resend form (the form itself is client-rendered — only the API half is
# assertable over HTTP here; eyeball the affordance in a browser).
expect "confirm invalid token 400" \
  "$(curl -s -X POST $BASE/api/register/confirm -H 'Content-Type: application/json' \
      -d '{"token":"not-a-real-token"}' -o /dev/null -w '%{http_code}')" "400"
expect "re-register confirmed email still 409" \
  "$(curl -s -X POST $BASE/api/register -H 'Content-Type: application/json' \
      -d '{"email":"e2e-one@familyverse.local","password":"secret123","website_url":""}' -o /dev/null -w '%{http_code}')" "409"
expect "resend endpoint 409 once confirmed" \
  "$(curl -s -X POST $BASE/api/register/resend -H 'Content-Type: application/json' \
      -d '{"email":"e2e-one@familyverse.local"}' -o /dev/null -w '%{http_code}')" "409"

login $J2 e2e-one@familyverse.local secret123
expect "e2e-one login (no families yet)" \
  "$(curl -s -o /dev/null -w '%{http_code}' -b $J2 $BASE/api/families)" "200"
expect "e2e-one has zero families" "$(curl -s -b $J2 $BASE/api/families)" "[]"
expect "create family 201" \
  "$(curl -s -b $J2 -X POST $BASE/api/families -H 'Content-Type: application/json' -d '{"name":"E2E Family"}' -o /dev/null -w '%{http_code}')" "201"
E2E_FAM=$(curl -s -b $J2 $BASE/api/families | python3 -c 'import json,sys;print(json.load(sys.stdin)[0]["id"])')
expect "empty-family feed is well-formed" \
  "$(curl -s -b $J2 $BASE/api/families/$E2E_FAM/people)" \
  "$(echo '{"people":[],"parentChild":[],"partnerships":[]}')"

echo "--- 10. cross-family isolation + invite restriction"
expect "e2e-one cannot read demo person -> 403" \
  "$(curl -s -o /dev/null -w '%{http_code}' -b $J2 $BASE/api/people/$DONALD)" "403"
expect "e2e-one cannot read demo feed -> 403" \
  "$(curl -s -o /dev/null -w '%{http_code}' -b $J2 $BASE/api/families/$FAM_ID/people)" "403"
expect "e2e-one cannot edit demo person -> 403" \
  "$(curl -s -o /dev/null -w '%{http_code}' -b $J2 -X PATCH $BASE/api/people/$DONALD -F 'bio=x')" "403"
expect "register e2e-two 201" \
  "$(curl -s -X POST $BASE/api/register -H 'Content-Type: application/json' \
      -d '{"email":"e2e-two@familyverse.local","password":"secret123","website_url":""}' -o /dev/null -w '%{http_code}')" "201"
TOK2=$(confirm_email e2e-two@familyverse.local)
# #20 D2: expire the token, show the dead end (410), then climb out via the
# resend endpoint — the rotated token must confirm.
docker compose -f "$REPO/docker-compose.yml" exec -T postgres \
  psql -U familyverse -d familyverse -c \
  "UPDATE \"User\" SET \"confirmationTokenExpiry\" = now() - interval '1 hour' WHERE email='e2e-two@familyverse.local'" >/dev/null
expect "expired token 410" \
  "$(curl -s -X POST $BASE/api/register/confirm -H 'Content-Type: application/json' -d "{\"token\":\"$TOK2\"}" -o /dev/null -w '%{http_code}')" "410"
expect "resend endpoint re-issues 200" \
  "$(curl -s -X POST $BASE/api/register/resend -H 'Content-Type: application/json' \
      -d '{"email":"e2e-two@familyverse.local"}' -o /dev/null -w '%{http_code}')" "200"
TOK2=$(confirm_email e2e-two@familyverse.local)
expect "rotated token confirms 200" \
  "$(curl -s -X POST $BASE/api/register/confirm -H 'Content-Type: application/json' -d "{\"token\":\"$TOK2\"}" -o /dev/null -w '%{http_code}')" "200"
expect "invite family-less user 201" \
  "$(curl -s -b $J1 -X POST $BASE/api/families/$FAM_ID/members -H 'Content-Type: application/json' \
      -d '{"email":"e2e-two@familyverse.local"}' -o /dev/null -w '%{http_code}')" "201"
expect "users list contains e2e-two (self excluded)" \
  "$(curl -s -b $J1 $BASE/api/families/$FAM_ID/users | python3 -c 'import json,sys;u=json.load(sys.stdin);print("yes" if any(x["email"]=="e2e-two@familyverse.local" for x in u) and all(x["email"]!="demo@familyverse.local" for x in u) else "no")')" "yes"
expect "re-invite -> 409" \
  "$(curl -s -b $J1 -X POST $BASE/api/families/$FAM_ID/members -H 'Content-Type: application/json' \
      -d '{"email":"e2e-two@familyverse.local"}' -o /dev/null -w '%{http_code}')" "409"
expect "inviting a user already in a family -> 409 (restriction kept)" \
  "$(curl -s -b $J1 -X POST $BASE/api/families/$FAM_ID/members -H 'Content-Type: application/json' \
      -d '{"email":"e2e-one@familyverse.local"}' -o /dev/null -w '%{http_code}')" "409"
TWO_ID=$(curl -s -b $J1 $BASE/api/families/$FAM_ID/users | python3 -c 'import json,sys;u=json.load(sys.stdin);print(next(x["id"] for x in u if x["email"]=="e2e-two@familyverse.local"))')
expect "non-member cannot list users -> 403" \
  "$(curl -s -o /dev/null -w '%{http_code}' -b $J2 $BASE/api/families/$FAM_ID/users)" "403"
expect "remove invited user 200" \
  "$(curl -s -b $J1 -X DELETE $BASE/api/families/$FAM_ID/members/$TWO_ID -o /dev/null -w '%{http_code}')" "200"
expect "users list empty again" "$(curl -s -b $J1 $BASE/api/families/$FAM_ID/users)" "[]"
expect "remove missing member -> 404" \
  "$(curl -s -o /dev/null -w '%{http_code}' -b $J1 -X DELETE $BASE/api/families/$FAM_ID/members/$TWO_ID)" "404"

echo
echo "==================== RESULT: $PASS passed, $FAIL failed ===================="
[ "$FAIL" -eq 0 ]
