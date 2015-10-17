Template.wordPage.helpers({
	getText: function() {
		return  this.test;
	},
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