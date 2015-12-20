ResultController = HomeController.extend({
	action: function() {
		this.render("navBar", {to: "navBar"});
		this.render("sideMenu", {to: "sideMenu"});
		this.render("navCategory", {to: "navCategory"});
		this.render(this.params.query.category, {to: "category"});
		this.render("wordPage");
	},
	data: function() {
		return {__originalId: this.params.__originalId, _id: this.params.__originalId, category: this.params.query.category};
	}
});