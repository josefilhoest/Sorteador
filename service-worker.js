const CACHE_NAME = 'sorteador-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './scripts.js',
  './manifest.json',
  './img/pngwing.com.png'
];

// Instalar o Service Worker e cachear arquivos
self.addEventListener('install', (event) => {
  console.log('Service Worker instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache aberto. Cacheando arquivos...');
        return cache.addAll(ASSETS_TO_CACHE)
          .catch((error) => {
            console.warn('Alguns arquivos não puderam ser cacheados:', error);
            return cache.addAll([
              './index.html',
              './style.css',
              './scripts.js',
              './manifest.json'
            ]);
          });
      })
  );
  self.skipWaiting();
});

// Ativar o Service Worker e remover caches antigos
self.addEventListener('activate', (event) => {
  console.log('Service Worker ativando...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Strategy: Cache First, Fall back to Network
self.addEventListener('fetch', (event) => {
  // Pular requisições não-GET e externas
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Se houver no cache, retorna
        if (response) {
          console.log('Arquivo cacheado:', event.request.url);
          return response;
        }

        // Caso contrário, tenta a rede
        return fetch(event.request)
          .then((response) => {
            // Valida a resposta
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }

            // Clona a resposta
            const responseToCache = response.clone();

            // Cachea a resposta para futuras requisições
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Se offline e não houver cache, retorna uma página offline
            console.log('Offline - arquivo não disponível:', event.request.url);
            return new Response('Você está offline. Este conteúdo não está disponível.', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});
