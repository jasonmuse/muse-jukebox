#!/bin/sh
# Xcode Cloud runs this right after it clones the repo (it looks for ci_scripts/ next to
# MuseJukebox.xcodeproj). The project leaves the signing team blank, because GitHub's ios.yml hands
# xcodebuild the team (DEVELOPMENT_TEAM from the APPLE_TEAM_ID secret). Xcode Cloud has no such
# flag, so this fills in the team it signs for (CI_TEAM_ID) before it archives. Xcode Cloud gives
# each build its own build number (App Store Connect › Muse Jukebox › Xcode Cloud › Settings ›
# Build Number: start it at 100, above the GitHub builds already in TestFlight).
set -eu
cd "$CI_PRIMARY_REPOSITORY_PATH/ios"
project=MuseJukebox.xcodeproj/project.pbxproj
if [ -n "${CI_TEAM_ID:-}" ] && ! grep -q "DEVELOPMENT_TEAM = " "$project"; then
  sed -i '' "s/CODE_SIGN_STYLE = Automatic;/CODE_SIGN_STYLE = Automatic; DEVELOPMENT_TEAM = ${CI_TEAM_ID};/" "$project"
fi
if ! grep -q "DEVELOPMENT_TEAM = " "$project"; then
  echo "error: no signing team in $project (CI_TEAM_ID was empty)" >&2
  exit 1
fi
echo "Signing team set in $(grep -c 'DEVELOPMENT_TEAM = ' "$project") build configurations"
