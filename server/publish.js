Meteor.publish("words", function () {
	Meteor._sleepForMs(1000);
	return Words.find({});
});

Meteor.publish("getWordResults", function(wordId) {
	Meteor._sleepForMs(2000);
	return urlData = Urls.find();
});

Meteor.publish("urls", function() {
	return Urls.find({});
});
Meteor.publish("languages", function () {
	Meteor._sleepForMs(2000);
	return Languages.find({});
});