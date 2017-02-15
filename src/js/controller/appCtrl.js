angular.module('GimmeMusic.controller.appCtrl', [])

.controller('AppCtrl', ['$rootScope', '$scope', '$timeout', '$http', 'ArtistFactory', function($rootScope, $scope, $timeout, $http, ArtistFactory){
	$scope.button = document.querySelector('button');
	$scope.img = document.querySelector('img');
	$scope.text = document.querySelector('.artist-name');

	$scope.buttonPhrases = [
		'It will rock!',
		'Drop the bass!',
		'Pop it!',
		'Feel the Rhythm!',
		'How about that?',
		'Oh yeh!',
	];

	$scope.init = function(){
		if($rootScope.online){
			$scope.canClick = false;

			ArtistFactory.getArtists().then(function(result){
				var artists = result.map(function(artist){
					return {
						id: artist.id,
						name: artist.name
					}
				});

				artists = JSON.stringify(artists);

				localStorage.setItem('GimmeMusic-artists', artists);

				$scope.canClick = true;
			});
		}else{
			$scope.canClick = true;
		}
	};

	$scope.getArtist = function(){
		if ($scope.canClick) {
			$scope.canClick = !$scope.canClick;

			ArtistFactory.getRandomArtist()
				.then($scope.handleArtist)
				.then($scope.changeLabel)
		}
	};

	$scope.handleArtist = function(result){
		return new Promise(function(resolve, reject){
			$scope.newArtist = result;
			var img = new Image();

			$scope.newArtist.image = result.image;

			img.src = result.image;

			img.onload = function(){
				resolve($scope.newArtist)
			};
		})
	};

	$scope.toggleAnimationState = function(){
		$scope.canClick = !$scope.canClick
	};

	$scope.changeLabel = function(data){
		if($scope.artist){
			// Animation image change
			$scope.blinkImg(data).then($scope.toggleAnimationState);
		}else{
			$scope.$apply(function(){
				$scope.artist = data;
				$scope.toggleAnimationState();
			});
		}
	};

	$scope.blinkImg = function(data){
		return new Promise(function(resolve, reject){
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
					resolve();
				}
			};

			requestAnimationFrame(frame);
		});
	};
}])