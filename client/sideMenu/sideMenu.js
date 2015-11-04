Template.sideMenu.helpers({
	languagesIndex: () => LanguagesIndex
});


Template.sideMenu.events({
	"click #no": function(event) {
		TAPi18n.setLanguage("no");
		setLanguage("no");
	},
	"click #en": function(event) {
		TAPi18n.setLanguage("en");
		setLanguage("en");
	}
});