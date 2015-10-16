Template.wordPage.helpers({
	getData: function() {
		return Urls.find(
			{
				relatedWords: this._id,
				urlType: "video"
			}
		);
	}
});

Template.wordPage.events({

})