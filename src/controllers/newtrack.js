trackr.controller('newtrackCtrl', ['$scope','tracks','$location', function($scope,tracks,$location){

	$scope.task_desc = '';
	$scope.task_today = false;
	$scope.task_days_done = parseInt(0);

	$scope.save = function() {
		tracks.new($scope.task_desc, $scope.task_today, parseInt($scope.task_days_done));
		$location.path('/tracks');
	};
	
}]);