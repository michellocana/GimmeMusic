self.addEventListener('install', event => {
	event.waitUntil(
		caches.open('static-v1')
			.then(cache => cache.addAll([
				// Static content
				'/',
				// '/index.html',

				// Images
				'/dist/img/icon-4x.png',
				'/dist/img/img.svg',

				// Stylesheets
				'/dist/css/app.min.css',

				// Fonts
				'https://fonts.googleapis.com/css?family=Comfortaa',

				// Javascripts
				'/src/js/angular.min.js',
				'/src/js/factory/artist.js',
				'/src/js/controller/appCtrl.js',
				'/src/js/app.js',
				'/src/js/firebase.js'
			]))
			.catch(err => {
				alert(err);
			})
	)
})

self.addEventListener('fetch', event => {
	// console.log(event.request);
	
	event.respondWith(
		caches.match(event.request)
			.then(response => response || fetch(event.request))
			.catch((err) => {
				console.log(err);
				// console.log(event.request);
				// cache.match('/');
			})
	)
	// const url = new URL(event.request.url);

	// console.log(url);

	// if(url.pathname.endsWidth('.jpg')){
	// 	event.respondWith(
	// 		fetch('/dist/img/icon-4x.png')
	// 	)
	// }else{
	// 	event.respondWith(
	// 		fetch('/index.html')
	// 	)
	// }

	// event.respondWith(
	// 	fetch(event.request).then(response => {
	// 		if(response === ''){
	// 			return fetch('/index.html');
	// 		}else{
	// 			return fetch('/dist/img/icon-4x.png');
	// 		}
	// 	})
	// );
});