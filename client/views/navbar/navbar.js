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
	// 'focusin #searchbar': function() {
	// 	$('#searchbar').css('background-color', '#fff');
	// },
	// 'focusout #searchbar': function() {
	// 	$('#searchbar').css('background-color', '#00B2FF');
	// }
	// 'mouseenter #nav-search-addon, mouseenter #searchbar': function(event) {
	// 	$('#searchbar, #nav-search-addon, #nav-search-addon > i')
	// 		.css('background-color', '#fff');
	// },
	// 'mouseleave #nav-search-addon, mouseleave #searchbar': function(event) {
	// 	$('#searchbar, #nav-search-addon, #nav-search-addon > i')
	// 		.css('background-color', '#00B2FF');
	// }
});


Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL'
});



