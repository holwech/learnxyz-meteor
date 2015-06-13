ResultController = RouteController.extend({
	action: function() {
		this.render("navBar", {to: "navBar"});
		this.render("sideMenu", {to: "sideMenu"})
		this.render("wordPage");
	},
	data: function() {
		return {_id: this.params._id};
	}
});
