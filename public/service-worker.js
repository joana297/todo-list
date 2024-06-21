const urlsToCache = [
    '/',
    '/index.html',
    '/lists',
    //'/lists/*',
    '/404',
    '/static/css/main.5c0b1687.css',
    '/static/js/main.51dbcccc.js',
    //'/static/js/bundle.js',
    '/static/media/list-bottom.09e86ceb44b010591d14.svg',
    '/static/media/list-mid.27c0231770dbb081c1bf.svg',
    '/static/media/list-top.0f9951ebec067a6e04e2.svg.svg'
];

this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('my-app-cache')
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

this.addEventListener('fetch', (event) => {
    //if (event.request.method === 'GET') {
        event.respondWith(
            caches.match(event.request)
                .then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }

                    return fetch(event.request).then((networkResponse) => {
                        let responseClone = networkResponse.clone();

                        caches.open('my-app-cache').then((cache) => {
                            cache.put(event.request, responseClone);
                        });

                        return networkResponse;
                    });
                }).catch(() => {
                    return caches.match('/404');
                })
        );
    //}
});

this.addEventListener('activate', (event) => {
    var cacheWhitelist = ['my-app-cache'];
    event.waitUntil(caches.keys()
        .then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (cacheWhitelist.indexOf(key) === -1)
                    return caches.delete(key);
            }));
        })
    );
});