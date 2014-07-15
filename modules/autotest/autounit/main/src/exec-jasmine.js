(function(window) {

	var jasmineEnv = jasmine.getEnv();
	jasmineEnv.updateInterval = 1000;

	var htmlReporter = new jasmine.HtmlReporter();
	jasmineEnv.addReporter(htmlReporter);

	jasmineEnv.specFilter = function(spec) {
		return htmlReporter.specFilter(spec);
	};

	var jasmineEnv = jasmine.getEnv();
	jasmineEnv.updateInterval = 1000;

	var txtReporter = new TextReporter();

	window.txtReporter = txtReporter;
	txtReporter.onRunnerFinished(function(text) {
		var reporter = window.txtReporter; 
		console.log(this);
		window.parent.next(text);
	});

	jasmineEnv.addReporter(txtReporter);

	var currentWindowOnload = window.onload;
	window.onload = function() {
		if (currentWindowOnload) {
			currentWindowOnload();
		}
		execJasmine();
	};

	function execJasmine() {
		jasmineEnv.execute();
	}

})(window);