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
	},
	'focusin #searchbar': function() {
		$('#searchbar').css('background-color', '#fff');
		$('#nav-search-addon').css('background-color', '#fff').css('border', '#fff').css('color', '#555');
	},
	'focusout #searchbar': function() {
		$('#searchbar').css('background-color', '');
		$('#nav-search-addon').css('background-color', '').css('border', '').css('color', '');
	},
	'click #logout': function() {
		Meteor.logout();
	}
	
});


Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL'
});



