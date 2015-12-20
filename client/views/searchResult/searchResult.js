Template.searchResult.onCreated(function () {
	this.subscribe("words");
});

Template.searchResult.helpers({
	wordsIndex: function() {
		return WordsIndex;
	},
	getCurrentTab: function() {
		if(Session.get("currentTab")) {
			return "category=" + Session.get("currentTab");
		} else {
			Session.set("currentTab", "video");
			return "category=video";
		}
	}
});


