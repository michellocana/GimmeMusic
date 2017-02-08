angular.module('GimmeMusic.factory.artist', [])

.factory('ArtistFactory', function() {
	var ref = firebase.database().ref("artists");

	var _getArtists = function(){
		return new Promise(function(resolve, reject){
			ref.on("value", function(snapshot){
				var artists = snapshot.val();

				artists = Object.keys(artists).map(function(objectKey, index) {
					return artists[objectKey];
				});

				resolve(artists);
			}, function (errorObject) {
				reject("The read failed: " + errorObject.code);
			});
		});
	};

	var _getRandomArtist = function(){
		return new Promise(function(resolve, reject){
			_getArtists().then(function(res){
				var key = ~~(Math.random() * (res.length));

				resolve(res[key])
			});
		});
	}

	return {
		getArtists: 		_getArtists,
		getRandomArtist: 	_getRandomArtist
	};
 });