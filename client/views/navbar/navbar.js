Template.navBar.helpers({
	wordsIndex: function() {
		return WordsIndex;
	},
	currentLanguage: function() {
		return getLanguage();
	},
	attrInput: function() {
		return {
			class: 'form-control col-lg-8',
			id: 'searchbar',
			// placeholder: function() {
			// 	return TAPi18n.__('searchbar');
			// }
		};
	},
	isAdmin: function() {
		return Meteor.user().profile.admin;
	}
}); 

Template.navBar.events({
	'keydown #searchbar': function(event) {
		FlowRouter.go('/');
	}
});


Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL'
});



