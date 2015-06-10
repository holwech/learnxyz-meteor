Template.results.helpers({
	words: function () {
		return Words.find({});
	}
});

Template.results.events({
	"click .word": function() {
		Meteor.call("deleteWord", this._id);
	}
});