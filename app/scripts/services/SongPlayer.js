(function() {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};
        var currentAlbum = Fixtures.getAlbum();
        
        var getSongIndex = function(song){
            return currentAlbum.songs.indexOf(song);
        };
        SongPlayer.currentSong = null;
        
        // we dont need to create a max property because a default is set in seekBar.js directive
        SongPlayer.volume = {
            current: 80
        }
        
        SongPlayer.setVolume = function(value = 80) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(value)
            }
        };
        
        //@desc: current playback time(secs) of currently playing song. @type: number
        SongPlayer.currentTime = null;
        
        //desc: set current time(secs) of currently playing song. @param {number} time
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        
        /**
         * @desc Buzz object audio file
         * @type {Object}
         */
        var currentBuzzObject = null;
        
        /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
        var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong();
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });
            
            SongPlayer.currentSong = song;
         };
        
        // stopSong made to clear and stop playing object. and stop repeating code
        // this doesnt work for setSong because song hasnt been defined yet.
        var stopSong = function() {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        }
        
        var playSong = function(song){
            currentBuzzObject.play();
            song.playing = true;
        }
        /**
         * @function play
         * @desc Play current or new song
         * @param {Object} song
         */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
             } else if (SongPlayer.currentSong === song) {
                 if (currentBuzzObject.isPaused()) {
                     playSong(song);
                 }
            }
        };
        /**
         * @function pause
         * @desc Pause current song
         * @param {Object} song
         */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;     
        };
        // .previous attribute function changes attributes
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                stopSong()
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex > currentAlbum.songs.length -1) {
               stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        }
        
        
        
        return SongPlayer;
    }
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();