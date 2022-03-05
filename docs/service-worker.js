self.importScripts('data/games.js');

// Files to cache
const cacheName = 'js13kPWA-v1';
const contentToCache = [
	'/piantoes/',
	'/piantoes/index.html',
	'/piantoes/global.css',
	'/piantoes/favicon.png',
	'/piantoes/docs/bundle.js',
	'/piantoes/docs/bundle.css',
	'/piantoes/icons/icon-32.png',
	'/piantoes/icons/icon-512.png',

	'/piantoes/resources/a3.mp3',
	'/piantoes/resources/a3_sharp.mp3',
	'/piantoes/resources/b3.mp3',
	'/piantoes/resources/base_clef.svg',
	'/piantoes/resources/c4.mp3',
	'/piantoes/resources/c4_sharp.mp3',
	'/piantoes/resources/d4.mp3',
	'/piantoes/resources/d4_sharp.mp3',
	'/piantoes/resources/e4.mp3',
	'/piantoes/resources/f4.mp3',
	'/piantoes/resources/f4_sharp.mp3',
	'/piantoes/resources/g4.mp3',
	'/piantoes/resources/g4_sharp.mp3',
	'/piantoes/resources/muted.svg',
	'/piantoes/resources/quarter_note.svg',
	'/piantoes/resources/sharp_quarter_note.svg',
	'/piantoes/resources/treble_clef.svg',
	'/piantoes/resources/unmuted.svg',
];

// Installing Service Worker
self.addEventListener('install', (e) => {
	console.log('[Service Worker] Install');
	e.waitUntil((async () => {
		const cache = await caches.open(cacheName);
		console.log('[Service Worker] Caching all: app shell and content');
		await cache.addAll(contentToCache);
	})());
});

// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
	e.respondWith((async () => {
		const r = await caches.match(e.request);
		console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
		if (r) return r;
		const response = await fetch(e.request);
		const cache = await caches.open(cacheName);
		console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
		cache.put(e.request, response.clone());
		return response;
	})());
});