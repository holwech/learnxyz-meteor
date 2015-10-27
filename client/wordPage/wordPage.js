Template.wordPage.helpers({
});

Template.wordPage.events({

});

Template.video.helpers({
	getData: function() {
		urlData = Urls.find(
			{
				relatedWords: this._id,
				urlType: "video"
			}
		).fetch();
		for(var i = 0; i < urlData.length; i++) {
			urlData[i]._wordId = this._id;
		}
		return urlData;
	}
});

Template.text.helpers({
	getData: function() {
		return Urls.find(
			{
				relatedWords: this._id,
				urlType: "text"
			}
		);
	}
});

Template.image.helpers({
	getData: function() {
		return Urls.find(
			{
				relatedWords: this._id,
				urlType: "image"
			}
		);
	}
});