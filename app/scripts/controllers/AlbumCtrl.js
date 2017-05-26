(function (){ angular.module('blocJams').controller('AlbumCtrl', ['Fixtures', 'SongPlayer', 
   function AlbumCtrl(Fixtures, SongPlayer) {
        this.albumData = Fixtures.getAlbum();
        this.songPlayer = SongPlayer;
    }]);
})();

/*
//call back method
(function() {
    function AlbumCtrl(Fixtures, SongPlayer) {
        this.albumData = Fixtures.getAlbum();
        this.songPlayer = SongPlayer;
    }
    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', 'SongPlayer',  AlbumCtrl])
})(); */