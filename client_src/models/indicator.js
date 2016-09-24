module.exports = Model.createModel({
	init: function(count) {
		this.attributes.count = count || 0;
	},
	inc: function(count) {
		this.setCount(this.getCount() + (count || 1));
	},
	dec: function(count) {
		this.setCount(this.getCount() - (count || 1));
	},
	getCount: function() {
		return this.get('count') || 0;
	},
	setCount: function(count) {
		this.set('count', count);
	}
});