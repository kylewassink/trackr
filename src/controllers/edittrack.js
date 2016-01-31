trackr.controller('edittrackCtrl', ['$scope','$routeParams','$location','tracks', function($scope, $routeParams, $location, tracks){
	
	$scope.new_desc = '';
	$scope.track = tracks.tracks[$routeParams.id];	
	$scope.delete_clicked = false;

	$scope.update_description = function() {
		tracks.update_description($routeParams.id,$scope.new_desc);
		$location.path('/tracks');
	};

	$scope.delete = function() {
		if(!$scope.delete_clicked) {
			$scope.delete_clicked = true;
			return;
		}
		tracks.delete_task($routeParams.id);
		$location.path('/tracks');
	};

	$scope.goto = function(base, param) {
		$location.path(base + param);
	};

}]);