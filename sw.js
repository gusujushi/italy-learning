/* Service Worker：让程序可以离线使用。
 * - 程序外壳（页面、脚本、样式、课程数据）：网络优先，断网时用缓存；
 * - 音频（audio/*.mp3，约 31 MB）：不预先缓存。在「设置与计划」里点“下载全部音频”后写入 isola-audio-v1，之后离线可播；
 *   音频请求常带 Range 头，所以只从已缓存的完整文件里切片回答，没缓存就直接走网络。 */
const VERSION = 'v2';
const SHELL = 'isola-shell-' + VERSION;
const AUDIO = 'isola-audio-v1';

const FILES = [
  './', 'index.html', 'manifest.webmanifest', 'css/app.css',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png',
  'js/italian.js', 'js/course.js', 'js/srs.js', 'js/morph.js', 'js/grammar.js', 'js/plan.js', 'js/lesson.js', 'js/exgen.js',
  'data/meta.js', 'data/pron.js',
  'data/island1.js', 'data/island2.js', 'data/island3.js', 'data/island4.js', 'data/island5.js',
  'data/island6.js', 'data/island7.js', 'data/island8.js', 'data/island9.js',
  'audio/manifest.js',
  'js/ui.js', 'js/store.js', 'js/sound.js', 'js/ai.js', 'js/widgets.js', 'js/exercise-ui.js',
  'js/view-home.js', 'js/lesson-read.js', 'js/lesson-shadow.js', 'js/view-lesson.js', 'js/view-words.js',
  'js/view-review.js', 'js/view-lab.js', 'js/view-me.js', 'js/view-settings.js', 'js/app.js',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('isola-shell-') && k !== SHELL).map(k => caches.delete(k))))
      .then(() => self.clients.claim()));
});

async function rangeFromCache(req, res) {
  const m = /bytes=(\d*)-(\d*)/.exec(req.headers.get('range') || '');
  const buf = await res.arrayBuffer();
  const size = buf.byteLength;
  let start = m && m[1] ? parseInt(m[1], 10) : 0;
  let end = m && m[2] ? parseInt(m[2], 10) : size - 1;
  if (m && !m[1] && m[2]) { start = Math.max(0, size - parseInt(m[2], 10)); end = size - 1; }
  end = Math.min(end, size - 1);
  return new Response(buf.slice(start, end + 1), {
    status: 206,
    headers: { 'Content-Type': res.headers.get('Content-Type') || 'audio/mpeg', 'Content-Range': 'bytes ' + start + '-' + end + '/' + size, 'Content-Length': String(end - start + 1), 'Accept-Ranges': 'bytes' },
  });
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  if (/\/audio\/[^/]+\/[^/]+\.mp3$/.test(url.pathname)) {
    e.respondWith((async () => {
      const cache = await caches.open(AUDIO);
      const hit = await cache.match(url.pathname.replace(/^.*\/audio\//, 'audio/'));
      if (hit) return req.headers.get('range') ? rangeFromCache(req, hit) : hit;
      return fetch(req);
    })());
    return;
  }

  e.respondWith((async () => {
    const cache = await caches.open(SHELL);
    try {
      const res = await fetch(req);
      if (res && res.ok && res.type === 'basic') cache.put(req, res.clone());
      return res;
    } catch (err) {
      const hit = await cache.match(req, { ignoreSearch: true });
      if (hit) return hit;
      if (req.mode === 'navigate') { const idx = await cache.match('index.html'); if (idx) return idx; }
      throw err;
    }
  })());
});
