const CACHE_ID = "0.0.1.0";
const WHITELIST_CACHE = [/.+\.css$/i, /.+\.html$/i, /.+\.png$/i];
// Listen for install event, set callback
self.addEventListener('install', function (event) {
});
self.addEventListener('activate', function (event) {
	event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', (event) => {
	var request = event.request;
	event.respondWith(
		caches.match(request).then((response) => {
			if (response) {
				return response;
			}

			return fetch(request).then((response) => {
				var responseToCache = response.clone();
				caches.open(CACHE_ID).then((cache) => {
					if (WHITELIST_CACHE.some(x => x.test(request.url)))
						cache.put(request, responseToCache).catch((err) => {
							console.warn(request.url + ': ' + err.message);
						});
				});

				return response;
			});
		}));
});
