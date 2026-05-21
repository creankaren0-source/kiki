/**
 * Service Worker for 发发 · AI 发型顾问
 *
 * 功能：
 * - 缓存静态资源
 * - 离线访问支持
 * - 网络优先策略
 *
 * 安装：需要在 HTTPS 环境（localhost 除外）
 */

const CACHE_NAME = 'hair-advisor-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
];

// 安装事件 - 缓存静态资源
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// 拦截请求 - 缓存优先策略
self.addEventListener('fetch', (event) => {
  // 仅处理 GET 请求
  if (event.request.method !== 'GET') {
    return;
  }

  // 跳过非 HTTP(s) 请求
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cached) => {
        // 缓存优先：如果缓存存在，立即返回
        if (cached) {
          // 后台更新缓存
          fetchAndCache(event.request);
          return cached;
        }

        // 无缓存，网络请求
        return fetchAndCache(event.request);
      })
      .catch((error) => {
        console.error('[SW] Fetch failed:', error);
        // 返回离线页面或默认响应
        return caches.match('/index.html');
      })
  );
});

// 获取并缓存
async function fetchAndCache(request) {
  try {
    const response = await fetch(request);

    // 只缓存成功的响应
    if (!response.ok) {
      return response;
    }

    // 克隆响应以供缓存
    const responseClone = response.clone();
    caches.open(CACHE_NAME)
      .then((cache) => cache.put(request, responseClone))
      .catch((err) => {
        console.warn('[SW] Cache put failed:', err);
      });

    return response;
  } catch (error) {
    console.error('[SW] Fetch error:', error);
    throw error;
  }
}

// 监听消息
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
