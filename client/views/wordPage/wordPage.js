Template.wordPage.onCreated(function () {
	this.subscribe("getWordUrls", FlowRouter.getParam('_id'));
});

Template.wordPage.helpers({
	getData: function() {
		let _wordId = FlowRouter.getParam('_id');
		let dbObject = {
			relatedWords: _wordId,
			urlType: getCategoryTab()
		};
		dbObject[getLanguage()] = {$exists: true};
		let urlData = Urls.find(dbObject).fetch();
		for(let i = 0; i < urlData.length; i++) {
			urlData[i]._wordId = _wordId;
		}
		return urlData;
	},
	getWordId: function() {
		return FlowRouter.getParam('_id');
	},
	getUrlId: function() {
		return this._id;
	}
});