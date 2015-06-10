HomeController = RouteController.extend({
	action: function() {
		this.render("searchBox", {to: "searchBox"});
		this.render("searchResult");
	},
})
