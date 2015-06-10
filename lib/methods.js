Meteor.methods({
	addWord: function(text) {
		Words.insert({
			text: text,
			createdAt: new Date()
		});
	},
	deleteWord: function(wordId) {
		Words.remove(wordId);
	}
});