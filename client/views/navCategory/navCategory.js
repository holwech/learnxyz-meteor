Template.navCategory.helpers({
	currentTab: function(tabName) {
		return getCategoryTab() === tabName;
	},
	getWordId: function() {
		return FlowRouter.getParam('_id');
	}
});

Template.navCategory.events({
	'click .category-tab': function(event) {
		setCategoryTab(event.currentTarget.getAttribute('id'));
	}
});