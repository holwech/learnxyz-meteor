Template.urlPage.onCreated(function () {
	this.subscribe("getUrlData", Router.current().params._id);
});

Template.urlPage.helpers({
	getData: function() {
		var data = Urls.findOne({_id: this._id});
		var description = "";
		for(var i = 0; i < data.data.length; i++) {
			if (data.data[i].language === getLanguage()) {
				description = data.data[i].description;
			}

		}
		return {url: data.url, description: description};
	}
});