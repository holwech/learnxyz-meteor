Template.navCategory.helpers({
	currentTab: function(tabName) {
		return Session.get("currentTab") === tabName;
	}
});

Template.navCategory.events({
	"click .category-tab": function(event) {
		Session.set("currentTab", event.currentTarget.getAttribute("id"));
	}
});