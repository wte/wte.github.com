(function(window) {
	var Math = function() {}

	Math.prototype = {
		add : function(x, y) {
			return x + y; 
		}, 

		minus : function(x, y) {
			return x - y;
		}
	}

	window.Math = new Math();
})(window);