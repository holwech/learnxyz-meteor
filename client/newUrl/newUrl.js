Template.newUrl.helpers({
	newUrlSchema: function() {
		return Schemas.newUrl;
	},
	fieldLanguage: function() {
		return Languages.findOne({code: getLanguage()}).name;
	},
	setReadOnly: function() {
		return true;
	}
});