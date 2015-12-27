Template.urlPage.onCreated(function () {
	this.subscribe("getUrlData", Router.current().params._id);
});

Template.urlPage.helpers({
	getData: function() {
		let data = Urls.findOne({_id: this._id});
		let description = "";
		description = data[getLanguage()].description;
		return {url: data.url, description: description};
	}
});