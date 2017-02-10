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

// .controller('AppCtrl', ['$scope', '$timeout', '$http', 'ArtistFactory', function($scope, $timeout, $http, ArtistFactory){
// 	$scope.button = document.querySelector('button');
// 	$scope.img = document.querySelector('img');
// 	$scope.text = document.querySelector('.artist-name');

// 	$scope.isAnimating = false;

// 	console.log(ArtistFactory);

// 	$scope.buttonPhrases = [
// 		'It will rock!',
// 		'Drop the bass!',
// 		'Pop it!',
// 		'Feel the Rhythm!',
// 		'How about that?',
// 		'Oh yeh!',
// 	];

// 	$scope.getArtist = function(){
// 		if (!$scope.isAnimating) {
// 			console.log("will get artist");
// 			$scope.isAnimating = !$scope.isAnimating;

// 			$scope.artists = [
// 				{
// 					name: 'Flume',
// 					image: 'https://i.scdn.co/image/72e229bba3cbb402a13117987ce1c42df4af10c6',
// 					links: [
// 						{type: 'soundcloud', 	url: 'https://soundcloud.com/flume'},
// 						{type: 'spotify', 		url: 'spotify:artist:6nxWCVXbOlEVRexSbLsTer'},
// 						{type: 'youtube', 		url: 'https://www.youtube.com/user/FlumeAUS'}
// 					]
// 				},
// 				{
// 					name: 'Drake',
// 					image: 'http://www.billboard.com/files/media/drake-laughing-nov-2015-billboard-650.jpg',
// 					links: [
// 						{type: 'spotify', 		url: 'spotify:artist:3TVXtAsR1Inumwj472S9r4'},
// 						{type: 'youtube', 		url: 'https://www.youtube.com/user/DrakeVEVO'}
// 					]
// 				},
// 				{
// 					name: 'Rihanna',
// 					image: 'http://www.ibackgroundwallpaper.com/wp-content/uploads/2015/03/Rihanna-2015-Wallpaper-Ultra-hd-4k.jpg',
// 					links: [
// 						{type: 'soundcloud', 	url: 'https://soundcloud.com/rihanna'},
// 						{type: 'spotify', 		url: 'spotify:artist:5pKCCKE2ajJHZ9KAiaK11H'},
// 						{type: 'youtube', 		url: 'https://www.youtube.com/user/RihannaVEVO'}
// 					]
// 				}
// 			];

// 			$scope.newArtist = $scope.artists[~~(Math.random() * ($scope.artists.length))];
// 			var img = new Image();

// 			img.src = $scope.newArtist.image;

// 			img.onload = function(){
// 				$scope.changeLabel($scope.newArtist);
// 			};

// 		}else{
// 			console.log("click blocked");
// 		}
// 	};

// 	$scope.changeLabel = function(data){
// 		var randomKey = ~~(Math.random() * ($scope.buttonPhrases.length));
// 		var newLabel = $scope.buttonPhrases[randomKey];
// 		$scope.buttonLabel = newLabel;

// 		if($scope.artist){
// 			$scope.blinkImg(data);
// 		}else{
// 			$scope.$apply(function(){
// 				$scope.artist = data;
// 			});
// 		}

// 		$timeout(function(){
// 			$scope.isAnimating = !$scope.isAnimating;
// 		}, 900);
// 	};

// 	$scope.blinkImg = function(data){
// 		var 
// 			duration = 1000, // ms
// 			startTime = new Date().getTime(),
// 			timeEllapsed = 0,
// 			updatedData = false,
// 			getAnimationProgress = function(ellapsed, duration){
// 				return ellapsed  < duration / 2 ? 
// 					   1 - ellapsed  / (duration / 2) : 
// 					   (ellapsed  / (duration / 2)) - 1;
// 			}
// 		;

// 		$scope.img.style.transition = 'none';

// 		$scope.icons = document.querySelectorAll('.artist-link-icon');

// 		$scope.icons.forEach(function(icon){
// 			icon.style.width = '5rem';
// 			icon.style.height = '5rem';
// 			icon.style.animation = 'none';
// 		});

// 		var frame = function(){
// 			timeEllapsed = new Date().getTime() - startTime;

// 			if (!updatedData && timeEllapsed > duration / 2) {
// 				updatedData = !updatedData;

// 				$scope.$apply(function(){
// 					$scope.artist = data;
// 				});
// 			}

// 			var opacity = getAnimationProgress(timeEllapsed, duration);

// 			// Concatenating all nodes that will be animated into an array
// 			var elems = Array.prototype.map.call($scope.icons, function(icon){
// 				return icon;
// 			});

// 			elems.push($scope.img);
// 			elems.push($scope.text);

// 			elems.forEach(function(icon){
// 				icon.style.opacity = opacity;
// 			});

// 			if(timeEllapsed <= duration){
// 				requestAnimationFrame(frame);
// 			}else{
// 				cancelAnimationFrame(frame);
// 			}
// 		};

// 		requestAnimationFrame(frame);
// 	};

// }])

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