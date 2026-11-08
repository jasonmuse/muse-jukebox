// Byte ranges for the songs (Cloudflare Pages Function, on muse-jukebox.pages.dev/audio/*).
// Pages' static files answer every Range request with the whole file (200), and iPhones won't play audio
// without proper 206 slices (Safari's <audio>, AVPlayer: Muse Penguin's radio). This serves each song from the
// site's own files, sliced to the range asked for. Not used by GitHub Pages (it serves files as they are).
export async function onRequest({ request, env }) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response(null, { status: 405, headers: { Allow: "GET, HEAD" } });
  }
  const asset = await env.ASSETS.fetch(new Request(request.url, { headers: { "Accept-Encoding": "identity" } }));
  const headers = new Headers(asset.headers);
  headers.set("Accept-Ranges", "bytes");
  headers.delete("Content-Encoding");
  const range = request.headers.get("Range");
  if (asset.status !== 200 || !range) {
    return new Response(request.method === "HEAD" ? null : asset.body, { status: asset.status, headers });
  }
  const body = await asset.arrayBuffer();
  const size = body.byteLength;
  const m = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
  let start = NaN;
  let end = NaN;
  if (m && m[1] === "" && m[2] !== "") {  // (the last n bytes)
    start = Math.max(0, size - parseInt(m[2], 10));
    end = size - 1;
  } else if (m && m[1] !== "") {
    start = parseInt(m[1], 10);
    end = m[2] === "" ? size - 1 : Math.min(parseInt(m[2], 10), size - 1);
  }
  if (!(start >= 0) || start >= size || start > end) {
    return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}`, "Accept-Ranges": "bytes" } });
  }
  headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
  headers.set("Content-Length", String(end - start + 1));
  return new Response(request.method === "HEAD" ? null : body.slice(start, end + 1), { status: 206, headers });
}
