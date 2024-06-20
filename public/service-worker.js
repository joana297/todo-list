const urlsToCache = [
    '/',
    '/index.html',
    '/static/css/main.5c0b1687.css',
    '/static/js/main.51dbcccc.js',
    '/fail.jpg',
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

this.addEventListener('activate', (event) => {
    var cacheWhitelist = ['my-app-cache'];
    event.waitUntil(caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
            if (cacheWhitelist.indexOf(key) === -1)
                return caches.delete(key);
        }));
    })
    );
});

this.addEventListener('fetch', (event) => {
    if (event.request.url.includes('/api/')) {
        event.respondWith(
            caches.match(event.request)
                .then((response) => {
                    return response || fetch(event.request).then(
                        (response) => {
                            caches.open('my-app-cache').then((cache) => {
                                cache.put(event.request, response.clone());
                            });
                            return response;
                        });
                }).catch(() => {
                    return caches.match('../src/images/fail.jpg');
                }));
    }
});