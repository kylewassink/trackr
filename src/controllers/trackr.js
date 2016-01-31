trackr.controller('trackrCtrl', ['$scope','$location','tracks', function($scope,$location,tracks){

	//fix any dirty data loaded
	tracks.repair_ids(false);
	
	$scope.tracks = tracks;
	$scope.export_string = "";
	$scope.export_clicked = false;
	
	$scope.button_status = function(id) {
		if(tracks.is_task_overdue(id)) {
			return "Overdue";
		} else if (!tracks.is_done_today(id)) {
			return "Mark Complete";
		} else {
			return "Completed";
		}
	};

	$scope.goto = function(base, param) {
		$location.path(base + param);
	};

	$scope.export = function() {
		var history = tracks.export();
		$scope.export_string = history;
	};

	$scope.$watch('tracks',function(newVal, oldVal) {
		if(tracks.tracks.length !== 0 && tracks.loaded_from !== null) {
			tracks.set_local();
		}
	});
	
}]);