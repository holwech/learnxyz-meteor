Meteor.publish('words', function () {
	return Words.find({});
});

Meteor.publish('getWordUrls', function(wordId) {
	Meteor._sleepForMs(500);
	return urlData = Urls.find({relatedWords: wordId});
});

Meteor.publish('getUrlData', function(urlId) {
	Meteor._sleepForMs(500);
	return Urls.find({_id: urlId});
});

Meteor.publish('urls', function() {
	return Urls.find({});
});

Meteor.publish('languages', function () {
	return Languages.find({});
});

Meteor.publish('getComments', function(typeId, language) {
	return Comments.find({
		typeId: typeId,
		language: language
	});
});