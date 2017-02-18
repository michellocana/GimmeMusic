angular.module('GimmeMusic.controller.checkboxCtrl', [])

.controller('CheckboxCtrl', ['$scope', function($scope){
	$scope.init = function(){
		// Getting selected genres
		if(!localStorage.getItem('GimmeMusic-genres')){
			$scope.genres = {
				edm: 	true, 
				pop: 	true, 
				rock: 	true, 
				rap: 	true 
			};

			$scope.updateLocalStorage($scope.genres);
		}else{
			$scope.genres = JSON.parse(localStorage.getItem('GimmeMusic-genres'));
		}
	};

	$scope.updateLocalStorage = function(obj){
		localStorage.setItem('GimmeMusic-genres', JSON.stringify(obj));
	};
}])
