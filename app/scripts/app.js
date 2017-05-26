(function() {
    function config($stateProvider,$locationProvider){
        //$locationProvider, which is part of Angular's core, configures an application's paths. By default, Angular prefixes routes with #!, known as Hashbang mode. This is a convention for showing that a page load is triggered by JavaScript.
        //For example, if we navigate to a state with the path /album, the full URL will read localhost:3000/#!/album instead of localhost:3000/album. It doesn't look nice, but we can disable it. Add the following code to the config function.
    $locationProvider
     .html5Mode({
         enabled: true,
         requireBase: false
     });
        //By setting the html5Mode method's enabled property to true, the hashbang URLs are disabled; that is, users will see clean URLs without the hashbang. Setting the requireBase property to false is unrelated to the hashbang issue, but is one way to avoid a common $location error.
     $stateProvider
        .state('landing', {
            url: '/',
            controller: 'LandingCtrl as landing',
            templateUrl: '/templates/landing.html'
        })
        .state('album',{
            url: '/album',
            controller: 'AlbumCtrl as album',
            templateUrl: '/templates/album.html'
        })
        .state('collection', {
            //url is what the url will be when instantiated 
            url: '/collection',
            controller: 'CollectionCtrl as collection',
            //templateURL is path/directory to the template file
            templateUrl: '/templates/collection.html'
        });
    }
    angular
        .module('blocJams',['ui.router'])
        .config(config);
            
})();
