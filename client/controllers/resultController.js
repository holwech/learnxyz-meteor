ResultController = RouteController.extend({
	action: function() {
		this.render("navBar", {to: "navBar"});
		this.render("navCategory", {to: "navCategory"});
		this.render("sideMenu", {to: "sideMenu"});
		this.render("wordPage");
		this.render("videos", {to: "category"})
//		this.render(this.params.query.category, {to: "category"})
	},
	data: function() {
		return {_id: Meteor.Collection.ObjectID(this.params._id), category: this.params.query.category};
	}
});
