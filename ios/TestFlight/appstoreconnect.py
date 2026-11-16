#!/usr/bin/env python3
"""App Store Connect, for the cloud build's TestFlight job (.github/workflows/ios.yml): the parts of
getting a build onto your phone that would otherwise be done by hand in a browser.

    appstoreconnect.py prepare        registers the app's ID if it isn't yet, and finds the app in
                                      App Store Connect: writes the team and the app to GITHUB_OUTPUT
    appstoreconnect.py testers APP    a TestFlight group that gets every build, with everyone on the
                                      team in it, so each build shows up in their TestFlight app
    appstoreconnect.py fresh APP DAYS whether TestFlight's latest build is newer than DAYS (writes
                                      fresh=true to GITHUB_OUTPUT if so: TestFlight builds stop
                                      opening after 90 days)

It signs in with the App Store Connect API key (ASC_KEY_ID, ASC_ISSUER_ID, and the .p8 file at
ASC_KEY_PATH) using a token signed by openssl, so it needs nothing but Python 3 and openssl. It never
prints anyone's email address: the build logs may be public.
"""
import base64
import datetime
import json
import os
import re
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

API = os.environ.get("ASC_API_URL", "https://api.appstoreconnect.apple.com/v1/")
PROJECT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "MuseJukebox.xcodeproj", "project.pbxproj")
APP_NAME = "Muse Jukebox"
GROUP_NAME = "Muse Jukebox"


class Refused(Exception):
    """App Store Connect said no: its status code, and what it said"""

    def __init__(self, status, body):
        super().__init__(status)
        self.status = status
        try:
            errors = json.loads(body).get("errors") or [{}]
            self.detail = errors[0].get("detail") or errors[0].get("title") or body
        except ValueError:
            self.detail = body
        self.detail = self.detail.strip().rstrip(".")


def fail(message):
    print(f"::error::{message}")
    sys.exit(1)


def b64url(data):
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode()


def raw_signature(der):
    """openssl's ECDSA signature (DER: a sequence of two integers) as a JSON web token wants it: the
    two numbers, 32 bytes each"""
    if der[0] != 0x30:
        raise ValueError("not an ECDSA signature")
    at = 2 if der[1] < 0x80 else 2 + (der[1] & 0x7F)
    numbers = []
    for _ in range(2):
        if der[at] != 0x02:
            raise ValueError("not an ECDSA signature")
        length = der[at + 1]
        numbers.append(int.from_bytes(der[at + 2:at + 2 + length], "big"))
        at += 2 + length
    return b"".join(number.to_bytes(32, "big") for number in numbers)


def make_token():
    """A token App Store Connect takes for 15 minutes: signed with the key, ES256"""
    header = {"alg": "ES256", "kid": os.environ["ASC_KEY_ID"], "typ": "JWT"}
    now = int(time.time())
    claims = {"iss": os.environ["ASC_ISSUER_ID"], "iat": now, "exp": now + 15 * 60, "aud": "appstoreconnect-v1"}
    signing = ".".join(b64url(json.dumps(part, separators=(",", ":")).encode()) for part in (header, claims))
    signed = subprocess.run(["openssl", "dgst", "-sha256", "-sign", os.environ["ASC_KEY_PATH"]],
                            input=signing.encode(), capture_output=True)
    if signed.returncode != 0 or not signed.stdout:
        fail("openssl couldn't sign with the key in ASC_KEY: it should be everything in the .p8 file, "
             "the BEGIN and END lines too")
    return signing + "." + b64url(raw_signature(signed.stdout))


TOKEN = None


def call(method, path, body=None, query=None):
    global TOKEN
    TOKEN = TOKEN or make_token()
    url = API + path + ("?" + urllib.parse.urlencode(query) if query else "")
    request = urllib.request.Request(url, method=method, data=None if body is None else json.dumps(body).encode(),
                                     headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(request, timeout=60) as response:
            text = response.read()
    except urllib.error.HTTPError as error:
        raise Refused(error.code, error.read().decode(errors="replace")) from None
    return json.loads(text) if text else {}


def output(name, value):
    path = os.environ.get("GITHUB_OUTPUT")
    if path:
        with open(path, "a", encoding="utf-8") as outputs:
            outputs.write(f"{name}={value}\n")


def bundle_id():
    """The app's bundle ID, from the project (so it follows the project if it's changed)"""
    with open(PROJECT, encoding="utf-8") as project:
        found = {value.strip().strip('"') for value in re.findall(r"PRODUCT_BUNDLE_IDENTIFIER = ([^;]+);", project.read())}
    if len(found) != 1:
        fail(f"The project's bundle IDs don't agree ({', '.join(sorted(found)) or 'none'})")
    return found.pop()


def prepare():
    identifier = bundle_id()
    found = call("GET", "bundleIds", query={"filter[identifier]": identifier, "limit": 200})["data"]
    bundle = next((entry for entry in found if entry["attributes"]["identifier"] == identifier), None)
    if bundle:
        print(f"The app's ID, {identifier}, is registered")
    else:
        try:
            bundle = call("POST", "bundleIds", {"data": {"type": "bundleIds", "attributes": {
                "identifier": identifier, "name": APP_NAME, "platform": "IOS"}}})["data"]
        except Refused as refused:
            if refused.status == 409:
                fail(f"The app's ID, {identifier}, is taken ({refused.detail}). Change PRODUCT_BUNDLE_IDENTIFIER "
                     "in ios/MuseJukebox.xcodeproj to one of your own, or ask Claude to.")
            raise
        print(f"Registered the app's ID, {identifier}")
    # (the ID's prefix: the team's ID, for every team made since 2011)
    output("team", bundle["attributes"]["seedId"])

    apps = call("GET", "apps", query={"filter[bundleId]": identifier})["data"]
    app = next((entry for entry in apps if entry["attributes"]["bundleId"] == identifier), None)
    if app is None:
        fail(f"{APP_NAME} isn't in App Store Connect yet. Make it there: appstoreconnect.apple.com › Apps › + › "
             f"New App: iOS, name {APP_NAME}, bundle ID {identifier}, any SKU. Then re-run this job, or push again.")
    print(f"{app['attributes']['name']} is in App Store Connect")
    output("app", app["id"])


def testers(app):
    groups = call("GET", f"apps/{app}/betaGroups", query={"limit": 200})["data"]
    group = next((entry for entry in groups if entry["attributes"].get("isInternalGroup")
                  and entry["attributes"].get("hasAccessToAllBuilds")), None)
    if group:
        print(f"TestFlight group: {group['attributes']['name']} (gets every build)")
    else:
        group = call("POST", "betaGroups", {"data": {
            "type": "betaGroups",
            "attributes": {"name": GROUP_NAME, "isInternalGroup": True, "hasAccessToAllBuilds": True},
            "relationships": {"app": {"data": {"type": "apps", "id": app}}},
        }})["data"]
        print(f"Made the TestFlight group {GROUP_NAME}, which gets every build")

    users = call("GET", "users", query={"limit": 200})["data"]
    members = call("GET", f"betaGroups/{group['id']}/betaTesters", query={"limit": 200})["data"]
    present = {(member["attributes"].get("email") or "").lower() for member in members}
    added = 0
    for user in users:
        person = user["attributes"]
        email = person.get("username") or person.get("email")
        if not email or email.lower() in present:
            continue
        try:
            call("POST", "betaTesters", {"data": {
                "type": "betaTesters",
                "attributes": {"email": email, "firstName": person.get("firstName") or "", "lastName": person.get("lastName") or ""},
                "relationships": {"betaGroups": {"data": [{"type": "betaGroups", "id": group["id"]}]}},
            }})
        except Refused as refused:
            # (a tester already, for another group or app: then they're added to this one)
            if refused.status != 409:
                raise
            known = call("GET", "betaTesters", query={"filter[email]": email})["data"]
            if not known:
                raise
            call("POST", f"betaGroups/{group['id']}/relationships/betaTesters",
                 {"data": [{"type": "betaTesters", "id": known[0]["id"]}]})
        added += 1
    team = "1 person" if len(users) == 1 else f"{len(users)} people"
    print(f"{team} on the team, {added} added to the group just now: each build shows up in their TestFlight app")


def uploaded_at(text):
    """An App Store Connect date (2026-11-16T08:15:02-08:00, sometimes with fractions of a second or a Z)"""
    text = re.sub(r"\.\d+", "", text.strip()).replace("Z", "+00:00")
    return datetime.datetime.fromisoformat(text)


def fresh(app, days):
    builds = call("GET", "builds", query={"filter[app]": app, "sort": "-uploadedDate", "limit": 1})["data"]
    if not builds:
        print("TestFlight has no build of it yet")
        return
    build = builds[0]["attributes"]
    age = (datetime.datetime.now(datetime.timezone.utc) - uploaded_at(build["uploadedDate"])).days
    if build.get("expired"):
        print(f"TestFlight's latest build ({build.get('version')}) has expired")
    elif age < days:
        print(f"TestFlight's latest build ({build.get('version')}) is {age} days old: it'll do")
        output("fresh", "true")
    else:
        print(f"TestFlight's latest build ({build.get('version')}) is {age} days old: time for a new one")


def main():
    for name in ("ASC_KEY_ID", "ASC_ISSUER_ID", "ASC_KEY_PATH"):
        if not os.environ.get(name):
            fail(f"{name} isn't set")
    command = sys.argv[1:2]
    try:
        if command == ["prepare"]:
            prepare()
        elif command == ["testers"] and len(sys.argv) == 3:
            testers(sys.argv[2])
        elif command == ["fresh"] and len(sys.argv) == 4:
            fresh(sys.argv[2], int(sys.argv[3]))
        else:
            fail("usage: appstoreconnect.py prepare | testers APP | fresh APP DAYS")
    except Refused as refused:
        hint = {
            401: " Check ASC_KEY_ID and ASC_ISSUER_ID, and that ASC_KEY is the whole .p8 file.",
            403: " The key needs Admin access (App Store Connect › Users and Access › Integrations).",
        }.get(refused.status, "")
        fail(f"App Store Connect said no ({refused.status}): {refused.detail}.{hint}")


if __name__ == "__main__":
    main()
