const CACHE_NAMES = {
    "dynamic": 'text-encryptor-dynamic',
    "static": 'text-encryptor-static',
    "immutable": 'text-encryptor-immutable',
};

self.addEventListener( 'install', (e) => {
    const cacheStatic = caches.open( CACHE_NAMES.static )
        .then( cache => {
            return cache.addAll([
                './',
                './index.html',
                './css/styles.css',
                './js/scripts.js',
                './manifest.webmanifest',
                './images/advertencia.svg',
                './images/buscando.png',
                './images/favicon.ico',
                './images/logo.png'
            ]);
        });

    const cacheImmutable = caches.open( CACHE_NAMES.immutable )
        .then( cache => cache.add('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&family=Quicksand:wght@300;400;500;700&display=swap'));

    e.waitUntil( Promise.all([
        cacheStatic,
        cacheImmutable
    ]));
});

self.addEventListener( 'fetch', e => {
    const response = caches.match( e.request )
        .then( resp => {
            if( resp ) return resp;
    
            return fetch( e.request ).then( newResp => {
                caches.open( CACHE_NAMES.dynamic )
                    .then( cache => {
                        cache.put( e.request, newResp ).catch( reason => reason );
                    });
                
                return newResp.clone();
            });
        });

    e.respondWith( response );
});