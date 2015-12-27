Template.wordPage.onCreated(function () {
	this.subscribe("getWordUrls", Router.current().params.__originalId);
});

Template.wordPage.helpers({
	getData: function() {
		let dbObject = {
			relatedWords: this._id,
			urlType: getCategoryTab()
		};
		dbObject[getLanguage()] = {$exists: true};
		let urlData = Urls.find(dbObject).fetch();
		for(var i = 0; i < urlData.length; i++) {
			urlData[i]._wordId = this._id;
		}
		return urlData;
	}
});