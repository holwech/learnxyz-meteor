Template.sideMenu.onCreated(function () {
	this.subscribe("languages");
});

Template.sideMenu.helpers({
	languagesIndex: function() {
		return LanguagesIndex;
	},
	attrInput: function() {
		return {
			class: "form-control col-lg-8",
			placeholder: function() {
				return TAPi18n.__('lang_searchbar');
			}
		};
	}
});


Template.sideMenu.events({
	"click #languageList": function(event) {
		if (event.target.tagName !== "INPUT") {
			setLanguage(event.target.id);
		}
	}
});