// Files to cache
const cacheName = 'piantoesSW-v1';
const contentToCache = [
	// './',
	'./index.html',
	'./global.css',
	'./favicon.png',
	'./build/bundle.js',
	'./build/bundle.css',

	'./icons/icon-32.png',
	'./icons/icon-192.png',
	'./icons/icon-512.png',

	// TODO(feat): get notes working again
	// './resources/a3.mp3',
	// './resources/a3_sharp.mp3',
	// './resources/b3.mp3',
	// './resources/base_clef.svg',
	// './resources/c4.mp3',
	// './resources/c4_sharp.mp3',
	// './resources/d4.mp3',
	// './resources/d4_sharp.mp3',
	// './resources/e4.mp3',
	// './resources/f4.mp3',
	// './resources/f4_sharp.mp3',
	// './resources/g4.mp3',
	// './resources/g4_sharp.mp3',

	'./resources/muted.svg',
	'./resources/quarter_note.svg',
	'./resources/sharp_quarter_note.svg',
	'./resources/treble_clef.svg',
	'./resources/unmuted.svg',
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