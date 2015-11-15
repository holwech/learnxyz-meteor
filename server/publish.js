Meteor.publish("words", function () {
	return Words.find({});
});
Meteor.publish("urls", function() {
	return Urls.find({});
});
Meteor.publish("languages", function () {
	return Languages.find({});
});