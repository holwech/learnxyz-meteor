Meteor.publish('words', function () {
	return Words.find({});
});

Meteor.publish('getWordUrls', function(wordId) {
	return Urls.find({relatedWords: wordId});
});

Meteor.publish('voteCount', function(wordId, urlId) {
	return Urls.find({_id: urlId});
});

Meteor.publish('getUrlData', function(urlId) {
	return Urls.find({_id: urlId});
});

Meteor.publish('urls', function() {
	return Urls.find({});
});

Meteor.publish('languages', function () {
	return Languages.find({});
});

Meteor.publish('getComments', function(typeId, language) {
	return Comments.find({commentedOn: typeId});
});

