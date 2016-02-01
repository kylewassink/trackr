trackr.controller('welcomeCtrl', ['$scope', 'tracks', '$location', function($scope, tracks, $location){

	$scope.has_local = tracks.contains_local();
	$scope.local = tracks.get_local();
	$scope.load_string = '';
	$scope.scratch_clicked = false;
	$scope.string_clicked = false;


	$scope.from_scratch = function() {

		if(!$scope.scratch_clicked && $scope.has_local) {
			$scope.scratch_clicked = true;
			return;
		}

		tracks.loaded_from = 'scratch';
		tracks.erase_local();
		$location.path('/tracks/new');
	};

	$scope.from_local = function() {
		tracks.loaded_from = 'local';
		tracks.get_local(true);
		$location.path('/tracks');
	};

	$scope.from_string = function() {

		if(!$scope.string_clicked){
			$scope.string_clicked = true;
			return;
		}
		var history = JSON.parse($scope.load_string);
		tracks.name = history.name;
		tracks.tracks = history.tracks;
		tracks.loaded_from = 'string';
		$location.path('/tracks');

	};
	
}]);