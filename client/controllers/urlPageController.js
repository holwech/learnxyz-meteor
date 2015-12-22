UrlPageController = RouteController.extend({
	action: function() {
		this.render("navBar", {to: "navBar"});
		this.render("sideMenu", {to: "sideMenu"});
		this.render("urlPage");
	},
	data: function() {
		return {_wordId: this.params._wordId, _id: this.params._id, _urlId: this.params._id};
	}
});