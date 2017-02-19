angular.module('GimmeMusic.factory.artist', [])

.factory('ArtistFactory', function($rootScope, DEFAULTS) {
	var 
		_getLocalStorageArtist = function(){
			var artists = localStorage.getItem('GimmeMusic-artists');
			return JSON.parse(artists);
		}

		_arrayFindOne = function (haystack, needle) {
			return needle.some(function(v){
				return haystack.indexOf(v) > -1;
			});
		};

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
			var artists, key;

			artists = _getLocalStorageArtist();
			key = ~~(Math.random() * (artists.length));

			return artists[key];
		},

		_getRandomArtistInfo = function(){
			return new Promise(function(resolve, reject){
				var artist, artists, ref, genres;

				artists = _getLocalStorageArtist();

				genres = localStorage.getItem('GimmeMusic-genres');
				genres = JSON.parse(genres);
				genres = Object.keys(genres).filter(function(key, obj){
					return genres[key];
				});

				while(artist = _getRandomArtist()){
					if(_arrayFindOne(artist.genres, genres)){
						break;
					}
				}

				if($rootScope.online){
					ref = firebase.database().ref('artists/' + artist.id);

					ref.on('value', function(snapshot){
						artist = snapshot.val();

						_getStorageImage(artist.image).then(function(res){
							artist.image = res;
							artist.links = [];

							if(artist.spotify){
								artist.links.push({
									type: 'spotify',
									url: artist.spotify.uri
								});
							}

							if(artist.soundcloud){
								artist.links.push({
									type: 'soundcloud',
									url: artist.soundcloud.url
								});
							}

							resolve(artist);
						});
					}, function (errorObject) {
						console.log(errorObject);
					})
				}else{
					artist.offlineResult = true;
					artist.image = DEFAULTS.FALLBACK_IMG_URL;
					artist.links = [];

					resolve(artist);
				}

			});
		},

		_getStorageImage = function(imageName){
			return firebase.storage().ref('artists/' + imageName).getDownloadURL();
		}
	;

	return {
		getArtists: 			_getArtists,
		getRandomArtistInfo: 	_getRandomArtistInfo
	};
 });