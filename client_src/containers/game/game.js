var GodGiftForm = require('containers/god-gift-form/god-gift-form.js');
var UserWealthBlock = require('containers/user-wealth/user-wealth.js');
var GiftTunnerBlock = require('containers/gift-tunner/gift-tunner.js');
var GodIndicator = require('containers/god-indicator/god-indicator.js');
var ResourceModel = require('models/resource.js');
var IndicatorModel = require('models/indicator.js');

module.exports = function Game() {

	var elem = $('<div></div>');

	var BASE_HATE = 50;
	var initialResourcesDataArray = [
		{
			name: 'Copper',
			hateEffect: 1,
			stashCount: 70
		}, {
			name: 'Gold',
			hateEffect: 4,
			stashCount: 30
		}, {
			name: 'Diamond',
			hateEffect: 10,
			stashCount: 10
		}
	];
	var tunnersArray = [];
	var resourcesModelsArray = [];

	initialResourcesDataArray.forEach(function(resourceDataObj) {

		var resourceModel = new ResourceModel();
		resourceModel.set('hateEffect', resourceDataObj.hateEffect);
		resourceModel.set('stashCount', resourceDataObj.stashCount);
		resourceModel.set('name', resourceDataObj.name);

		tunnersArray.push(new GiftTunnerBlock({
			resourceModel: resourceModel
		}));

		resourcesModelsArray.push(resourceModel);

	});

	var indicatorModel = new IndicatorModel(BASE_HATE);
	var godIndicatorsArray = [
		new GodIndicator({
			name: 'Hate',
			indicatorModel: indicatorModel
		})
	];

	var godGiftForm = new GodGiftForm({
		tunnersArray: tunnersArray,
		godIndicatorsArray: godIndicatorsArray
	});
	var userWealthBlock = new UserWealthBlock({
		resourcesModelsArray: resourcesModelsArray
	});

	// Models change observing
	Model.subscribeAll(resourcesModelsArray, function() {
		var commonHateEffect = 0;
		resourcesModelsArray.forEach(function(resourcesModel) {
			commonHateEffect +=
				resourcesModel.getCount() * resourcesModel.get('hateEffect');
		});
		indicatorModel.setCount(
			BASE_HATE -	commonHateEffect
		);
	});

	function render() {
		userWealthBlock.render();
		godGiftForm.render();

		return this;
	}
	
	elem.append(userWealthBlock.elem);
	elem.append(godGiftForm.elem);

	return {
		render: render,
		elem: elem
	};
};
