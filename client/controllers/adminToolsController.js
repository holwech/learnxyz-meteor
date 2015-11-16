AdminToolsController = RouteController.extend({
	action: function() {
		this.render("navBar", {to: "navBar"});
		this.render("sideMenu", {to: "sideMenu"});
		this.render("adminTools");
		this.render("newWord", {to: "leftField1"});
		this.render("newUrl", {to: "rightField1"});
	}
});