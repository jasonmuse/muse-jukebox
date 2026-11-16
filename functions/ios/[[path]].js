// The iPhone app's source (ios/) is in the repo for GitHub's Macs to build, not for the site. Cloudflare
// Pages serves the repo as it is, so this answers everything under muse-jukebox.pages.dev/ios/ with a 404
// (Cloudflare Pages Function), and the app's code stays as private as the repo.
export function onRequest() {
  return new Response("Not found", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
