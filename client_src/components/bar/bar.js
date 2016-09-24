module.exports = function Bar(options) {

	var elem = $('<div></div>');
	var model = options.model;

	model.subscribe(function() {
		render();
	});

	function render() {
		elem.html(App.templates['bar']({
			progress: Array(model.getCount())
		}));
		return this;
	}

	return {
		render: render,
		elem: elem,
		getCount: function() {
			return model.getCount();
		}
	}
};
