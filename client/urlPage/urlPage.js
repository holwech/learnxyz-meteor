Template.urlPage.helpers({
	getData: function() {
		return urlData = Urls.findOne({_id: this._id});
	}
});