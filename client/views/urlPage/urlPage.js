Template.urlPage.onCreated(function () {
	this.subscribe("getUrlData", FlowRouter.getParam('_id'));
});

Template.urlPage.helpers({
	getData: function() {
		let data = Urls.findOne({_id: FlowRouter.getParam('_id')});
		return {url: data.url, description: data.description};
	}
});