trackr.service('tracks', function(){

	var self = this;

	this.new = function(description,today,days) {
		self.repair_ids();
		var track = {
			id: self.tracks.length,
			description: description,
			count: (today? 1 + days : 0 + days),
			last_entry: (today? new Date().valueOf() : (days === 0 ? null : ((new Date()) - (1000 * 60 * 60 * 24)).valueOf()))
		};
		self.tracks.push(track);
		self.set_local();
	};

	this.update_description = function(id, description) {
		self.tracks[id].description = description;
		self.set_local();
	};

	//Returns boolean for whether or not the given task id was already completed today. Note that this function will return false if overdue
	this.is_done_today = function(id) {
		var track = self.tracks[id];
		//if never done before, it's not done today
		if (track.last_entry === null) {
			return false;
		} 

		var last_done = new Date(track.last_entry);
		var today = new Date();

		//if last done day, month, and year match, then it was done today already
		if (last_done.getDate() === today.getDate() && last_done.getFullYear() === today.getFullYear() && last_done.getMonth() === today.getMonth()) {
			return true;
		} 
		//else it is not done today.
		else {
			return false;
		}
	};

	//Mark task at given index/id as done for today
	this.task_complete = function(id) {
		var track = self.tracks[id];
		if (self.is_done_today(id)) {			
			return;
		}
		track.count = track.count + 1;
		track.last_entry = new Date().valueOf();
		self.set_local();
	};

	this.is_task_overdue = function(id) {
		var track = self.tracks[id];
		//if never done before, it's not overdue
		if (track.last_entry === null) {
			return false;
		} 

		var last_done = new Date(track.last_entry);
		var today = new Date();
		var yesterday = new Date(today - (1000 * 60 * 60 * 24));

		//if it's already done for today, it's not overdue
		if (self.is_done_today(id)) {
			return false;
		}
		//if it was done yesterday, it is not overdue
		else if (last_done.getDate() === yesterday.getDate() && last_done.getFullYear() === yesterday.getFullYear() && last_done.getMonth() === yesterday.getMonth()) {
			return false;
		}
		//else it is overdue
		else {
			return true;
		}
	};

	this.delete_task = function(id) {
		self.repair_ids();
		if(self.tracks.length === 1) {
			self.tracks = [];
		} else {
			self.tracks.splice(id,1);			
		}	
		self.set_local();
	};

	//aligns array index with id value of object at that index
	this.repair_ids = function(only_if_dirty) {
		only_if_dirty = (typeof(only_if_dirty) !== 'undefined' ? only_if_dirty : true);
		if (!only_if_dirty || self.dirty) {
			for (var i = 0; i < self.tracks.length; i++) {
				if(i !== self.tracks[i].id) {
					self.tracks[i].id = i;
				}	
			}
			self.dirty = false;
		}
	};

	this.export = function() {
		self.repair_ids();
		var state = {
			name: self.name,
			tracks: self.tracks
		};
		return angular.toJson(state);
	};

	this.contains_local = function() {
		return (localStorage.getItem("trackr") !== null);
	};

	this.get_local = function(save_service) {
		save_service = (typeof(save_service) !== 'undefined' ? save_service : false);
		var state = JSON.parse(localStorage.getItem('trackr'));
		if(save_service) {
			self.dirty = true; 
			self.loaded_from = "local";
			self.name = state.name;
			self.tracks = state.tracks;
		}
		return state;
	};

	this.set_local = function() {
		localStorage.setItem('trackr',self.export());
	};

	this.stats = function() {
		tracks = self.tracks.length;
		days = 0;
		for(x=0;x<self.tracks.length;x++) {
			days = days + self.tracks[x].count;
		}
		return {
			tracks: tracks,
			days: days
		};
	};

	this.dirty = true;
	this.loaded_from = null;
	this.name = null;
	this.tracks = [];

});
