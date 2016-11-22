angular.module('qBeaconAdmin').factory("adminService", function($http, apiValue) {

	var __getAll = function(modelName) {
		return $http.get(apiValue.baseURL + modelName);
	};

	var __save = function(modelName, object) {
		return $http.post(apiValue.baseURL + modelName, object);
	};

	var __update = function(modelName, object) {
		return $http.put(apiValue.baseURL + modelName, object);
	};

	var __remove = function(modelName, object) {
		return $http.delete(apiValue.baseURL + modelName + "/" + object.key);
	};

	var __updateBeacons = function() {
		return $http.get(apiValue.baseURL + "updateBeacons");
	};

	return {
		getAll: __getAll, 
		save: __save, 
		update: __update, 
		remove: __remove, 
		updateBeacons: __updateBeacons
	}

});