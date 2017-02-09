angular.module('GimmeMusic.factory.artist', [])

.factory('ArtistFactory', function() {
	var 
		_getArtists = function(){
			var ref = firebase.database().ref("artists");

			return new Promise(function(resolve, reject){
				ref.on("value", function(snapshot){
					var artists = snapshot.val();

					artists = Object.keys(artists).map(function(objectKey, index) {
						var artist = artists[objectKey];
							artist.id = objectKey;

						return artist;
					});

					resolve(artists);
				}, function (errorObject) {
					reject("The read failed: " + errorObject.code);
				});
			});
		},

		_getRandomArtist = function(){
			return new Promise(function(resolve, reject){
				var artists, artist, key, ref;

				artists = localStorage.getItem('GimmeMusic-artists');
				artists = JSON.parse(artists);

				key = ~~(Math.random() * (artists.length));

				artist = artists[key];

				ref = firebase.database().ref('artists/' + artist.id);

				ref.on('value', function(snapshot){
					artist = snapshot.val();

					_getStorageImage(artist.image).then(function(res){
						artist.image = res;
						artist.links = [
							{
								type: 'spotify',
								url: artist.spotify.uri
							}
						]

						resolve(artist);
					});
				}, function (errorObject) {
					console.log(errorObject);
				})
			});
		},

		_getStorageImage = function(imageName){
			return firebase.storage().ref('artists/' + imageName).getDownloadURL();
		}
	;

	return {
		getArtists: 		_getArtists,
		getRandomArtist: 	_getRandomArtist
	};
 });