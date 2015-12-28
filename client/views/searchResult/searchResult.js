Template.searchResult.onCreated(function () {
	this.subscribe("words");
});

Template.searchResult.helpers({
	wordsIndex: function() {
		return WordsIndex;
	},
	getCurrentTab: function() {
		return 'category=' + getCategoryTab();
	},
	getWordId: function() {
		return this.__originalId;
	}
});


