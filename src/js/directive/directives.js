angular.module('GimmeMusic.directive.artist', [])

// Getting SVG icons
.directive('svgSprite', function($http){
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

// Genre toggle
.directive('genre', function(){
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		template: [
			'<div>',
				'<input type="checkbox" name="genres[]" id="{{genreId}}" class="genre-checkbox" ng-checked="{{genreChecked}}">',
				'<label for="{{genreId}}" class="genre-label">',
					'<ng-transclude></ng-transclude>',
				'</label>',
			'</div>'
		].join(''),
		scope: {
			genreId: '@',
			genreChecked: '=',
			genreName: '@'
		},
		link(scope, element, attributes){
			var checkbox = element[0].querySelector('input');

			checkbox.onchange = function(event){
				var target = event.target;
				var parent = scope.$parent;
				
				parent.genres[scope.genreName] = target.checked;
				parent.updateLocalStorage(parent.genres);
			}
		}
	}
})