HomeController = RouteController.extend({
	subscriptions: function() {
		return Meteor.subscribe("languages");
	},
	action: function() {
		this.render("navBar", {to: "navBar"});
		this.render("searchResult");
		if (this.ready()) {
			this.render("sideMenu", {to: "sideMenu"})
		} else {
			this.render("localLoading", {to: "sideMenu"});
		}
	}
})
