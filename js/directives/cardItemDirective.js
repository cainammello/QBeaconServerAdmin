angular.module("qBeaconAdmin").directive("cardItem", function() {
	return {
		templateUrl: "view/cardItem.html", 
		replace: false, 
		restrict: "AE",
		transclude: true, 
		scope: {
			name: "=", 
			key: "="
		} 
	};
});