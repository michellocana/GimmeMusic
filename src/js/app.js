angular.module('GimmeMusic', [
	// Factories
	'GimmeMusic.factory.artist',
	
	// Controllers
	'GimmeMusic.controller.appCtrl',
	'GimmeMusic.controller.checkboxCtrl',

	// Directives
	'GimmeMusic.directive.artist'
])

.constant('DEFAULTS', {
	'FALLBACK_IMG_URL': './dist/img/logo.png'
})

// Internet connection watcher
.run(function($window, $rootScope) {
	$rootScope.online = navigator.onLine;

	$window.addEventListener("offline", function() {
		$rootScope.$apply(function() {
			$rootScope.online = false;
		});
	}, false);

	$window.addEventListener("online", function() {
		$rootScope.$apply(function() {
			$rootScope.online = true;
		});
	}, false);
})

// Firebase configuration
.run(function($rootScope){
	if ($rootScope.online) {
		var config = {
			apiKey: "AIzaSyArqYqldbMgAY-w5Gx7hz08a1fJeP33aWs",
			authDomain: "gimme-music-a41f6.firebaseapp.com",
			databaseURL: "https://gimme-music-a41f6.firebaseio.com",
			storageBucket: "gimme-music-a41f6.appspot.com",
			messagingSenderId: "571198339326"
		};

		firebase.initializeApp(config);
	}
})

// ServiceWorker register
.run(function(){
	if(navigator.serviceWorker){
		// navigator.serviceWorker.getRegistrations().then(
		// 	function(registrations) {
		// 		for(var i in registrations){
		// 			registrations[i].unregister();
		// 		}
		// 	}
		// );
		
		navigator.serviceWorker.register('sw.js');

		// navigator.serviceWorker.getRegistrations().then(function(registrations) {
		// 	console.log(registrations);
		// });
	}
})



// Parse string as HTML filter
.filter('toTrustedHTML', ['$sce', function($sce){
	return function(text) {
		return $sce.trustAsHtml(text);
	};
}])

// Setting spotify protocol as secure
.config([
	'$compileProvider',
	function($compileProvider){
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|spotify):/);
	}
]);