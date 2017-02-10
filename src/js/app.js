angular.module('GimmeMusic', [
	'GimmeMusic.factory.artist',
	'GimmeMusic.controller.appCtrl'
])

.run(function(){
	var config = {
		apiKey: "AIzaSyArqYqldbMgAY-w5Gx7hz08a1fJeP33aWs",
		authDomain: "gimme-music-a41f6.firebaseapp.com",
		databaseURL: "https://gimme-music-a41f6.firebaseio.com",
		storageBucket: "gimme-music-a41f6.appspot.com",
		messagingSenderId: "571198339326"
	};

	firebase.initializeApp(config);
})

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

		navigator.serviceWorker.getRegistrations().then(function(registrations) {
			console.log(registrations);
		});
	}
})

// Getting SVG icons
.directive('svgSprite', function($http, $compile){
	return {
		restrict: 'E',
		replace: true,
		template: '<div class="svg-sprite" ng-bind-html="sprite | toTrustedHTML"></div>',
		link: function(scope, element, attributes){
			$http.get(attributes.svgSrc)
				.then(function(res){
					scope.sprite = res.data;
				});
		}
	};
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