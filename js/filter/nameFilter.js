angular.module("qBeaconAdmin").filter("name", function() {
	return function(input) {
		var words = input.split(" ");
		words = words.map(function(w) {
			if(/^([aeiou]|da|de|do)$/.test(w)) return w;
			return w.charAt(0).toUpperCase() + w.substring(1).toLowerCase();
		});
		return words.join(" ");
	};
});