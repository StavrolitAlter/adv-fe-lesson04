module.exports = function TuneControls(options) {

	var elem = $('<div></div>');
	var model = options.model;

	function render() {
		elem.html(App.templates['tune-controls']({}));
		subscribeHandlers();

		return this;
	}

	function subscribeHandlers() {
		elem.find('.tune-controls__inc').click(function() {
			model.inc();
		});
		elem.find('.tune-controls__dec').click(function() {
			model.dec();
		});
	}

	return {
		render: render,
		elem: elem
	}
};