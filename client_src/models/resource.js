module.exports = Model.createModel({
	init: function(options) {
		$.extend(this.attributes, options);
	},
	inc: function() {
		this.set('stashCount', this.get('stashCount') - 1);
		this.setCount(this.getCount() + 1);
	},
	dec: function() {
		this.set('stashCount', this.get('stashCount') + 1);
		this.setCount(this.getCount() - 1);
	},
	getCount: function() {
		return this.get('count') || 0;
	},
	setCount: function(count) {
		this.set('count', count);
	}
});