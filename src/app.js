var trackr = angular
.module('trackr',['ngRoute'])
.config(['$routeProvider',function($routeProvider) {
	
	$routeProvider
	.when('/',{
		templateUrl: 'src/views/welcome.html',
		controller: 'welcomeCtrl'
	})
	.when('/tracks',{
		templateUrl: 'src/views/tracks.html',
		controller: 'trackrCtrl'
	})
	.when('/tracks/new',{
		templateUrl: 'src/views/new_track.html',
		controller: 'newtrackCtrl'
	})
	.when('/tracks/edit/:id',{
		templateUrl: 'src/views/edit_track.html',
		controller: 'edittrackCtrl'
	});

}])
.run(['$rootScope','$location','tracks',function($rootScope, $location, tracks) {
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if (tracks.loaded_from === null) {
        if (next.templateUrl !== "views/welcome.html") {
        	$location.path("/");
        } 
      } else if (tracks.dirty) {
      	tracks.repair_ids();
      }
    });
}]);
