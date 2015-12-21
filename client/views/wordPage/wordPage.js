Template.wordPage.onCreated(function () {
	this.subscribe("getWordUrls", Router.current().params.__originalId);
});

Template.wordPage.helpers({
	getData: function() {
		urlData = Urls.find(
			{
				relatedWords: this._id,
				urlType: Session.get("currentTab")
			}
		).fetch();
		for(var i = 0; i < urlData.length; i++) {
			urlData[i]._wordId = this._id;
		}
		return urlData;
	}
});