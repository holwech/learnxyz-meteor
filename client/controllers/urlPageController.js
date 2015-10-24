UrlPageController = RouteController.extend({
	action: function() {
		this.render("navBar", {to: "navBar"});
		this.render("sideMenu", {to: "sideMenu"});
		this.render("urlPage");
	}
});