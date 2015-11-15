Template.newWord.helpers({
	newWordSchema: function() {
		return Schemas.newWord;
	},
	fieldLanguage: function() {
		return Languages.findOne({code: getLanguage()}).name;
	},
	setReadOnly: function() {
		return true;
	}
});

