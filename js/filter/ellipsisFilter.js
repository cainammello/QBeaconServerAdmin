angular.module("qBeaconAdmin").filter("ellipsis", function() {

	var __length = 10;
	var __sufix = "...";

	return function(input, length, sufix) {
		length = length || __length;
		sufix = sufix || __sufix;
		
		if(input.length <= length) return input;
		return input.substring(0, length) + sufix;
	}
});