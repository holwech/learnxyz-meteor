Template.newWord.helpers({
	newWordSchema: function() {
		return Schemas.newWord;
	}
});

var passLanguage = {
	before: {
		method: function(doc) {
			console.log(doc.language);
			return doc;
		}
	}
};
AutoForm.addHooks(["newWord"], passLanguage);

