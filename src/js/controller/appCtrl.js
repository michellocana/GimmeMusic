angular.module('GimmeMusic.controller.appCtrl', [])

.controller('AppCtrl', ['$scope', '$timeout', '$http', 'ArtistFactory', function($scope, $timeout, $http, ArtistFactory){
	$scope.button = document.querySelector('button');
	$scope.img = document.querySelector('img');
	$scope.text = document.querySelector('.artist-name');

	$scope.isAnimating = false;

	$scope.buttonPhrases = [
		'It will rock!',
		'Drop the bass!',
		'Pop it!',
		'Feel the Rhythm!',
		'How about that?',
		'Oh yeh!',
	];

	$scope.getArtist = function(){
		if (!$scope.isAnimating) {
			$scope.isAnimating = !$scope.isAnimating;

			ArtistFactory.getRandomArtist().then(function(result){
				var storage = firebase.storage();
				var pathReference = storage.ref('artists/' + result.image);

				pathReference.getDownloadURL().then(function(url) {
					$scope.newArtist = result;
					var img = new Image();

					$scope.newArtist.image = url;

					img.src = url;

					img.onload = function(){
						$scope.changeLabel($scope.newArtist);
					};
				})
			});
		}
	};

	$scope.changeLabel = function(data){
		var randomKey = ~~(Math.random() * ($scope.buttonPhrases.length));
		var newLabel = $scope.buttonPhrases[randomKey];
		$scope.buttonLabel = newLabel;

		if($scope.artist){
			$scope.blinkImg(data);
		}else{
			$scope.$apply(function(){
				$scope.artist = data;
			});
		}

		$timeout(function(){
			$scope.isAnimating = !$scope.isAnimating;
		}, 900);
	};

	$scope.blinkImg = function(data){
		var 
			duration = 1000, // ms
			startTime = new Date().getTime(),
			timeEllapsed = 0,
			updatedData = false,
			getAnimationProgress = function(ellapsed, duration){
				return ellapsed  < duration / 2 ? 
					   1 - ellapsed  / (duration / 2) : 
					   (ellapsed  / (duration / 2)) - 1;
			}
		;

		$scope.img.style.transition = 'none';

		$scope.icons = document.querySelectorAll('.artist-link-icon');

		$scope.icons.forEach(function(icon){
			icon.style.width = '5rem';
			icon.style.height = '5rem';
			icon.style.animation = 'none';
		});

		var frame = function(){
			timeEllapsed = new Date().getTime() - startTime;

			if (!updatedData && timeEllapsed > duration / 2) {
				updatedData = !updatedData;

				$scope.$apply(function(){
					$scope.artist = data;
				});
			}

			var opacity = getAnimationProgress(timeEllapsed, duration);

			// Concatenating all nodes that will be animated into an array
			var elems = Array.prototype.map.call($scope.icons, function(icon){
				return icon;
			});

			elems.push($scope.img);
			elems.push($scope.text);

			elems.forEach(function(icon){
				icon.style.opacity = opacity;
			});

			if(timeEllapsed <= duration){
				requestAnimationFrame(frame);
			}else{
				cancelAnimationFrame(frame);
			}
		};

		requestAnimationFrame(frame);
	};
}])