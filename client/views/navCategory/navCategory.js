Template.navCategory.helpers({
	currentTab: function(tabName) {
		return getCategoryTab() === tabName;
	}
});

Template.navCategory.events({
	'click .category-tab': function(event) {
		setCategoryTab(event.currentTarget.getAttribute('id'));
	}
});