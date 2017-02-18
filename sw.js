self.addEventListener('install', event => {
	event.waitUntil(
		caches.open('static-v1')
			.then(cache => cache.addAll([
				// Static content
				'./index.html',

				// Images
				'./dist/img/icon-4x.png',
				'./dist/img/img.svg',
				'./dist/img/logo.png',

				// Stylesheets
				'./dist/css/app.min.css',

				// Fonts
				'https://fonts.googleapis.com/css?family=Comfortaa',

				// Javascripts
				'./src/js/angular.min.js',
				'./src/js/factory/artist.js',
				'./src/js/directive/directives.js',
				'./src/js/controller/appCtrl.js',
				'./src/js/app.js',
				'./src/js/firebase.js'
			]))
			.catch(err => {
				console.log(err);
			})
	)
})

self.addEventListener('fetch', event => {
	event.respondWith(
		caches
			.match(event.request)
			.then(cached => fetch(event.request))
			.catch((err) => {
				const url = new URL(event.request.url);

				// Responding with default image
				if(url.pathname.endsWith('.jpg') || url.pathname.endsWith('.png')){
					return fetch('dist/img/logo.png');
				}

				console.log(err);
			})
	)
});