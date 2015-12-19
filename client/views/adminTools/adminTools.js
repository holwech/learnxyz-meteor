Template.adminTools.events({
	"click #dropUrls": function(event) {
		Meteor.call("dropUrls");
	},
	"click #dropWords": function(event) {
		Meteor.call("dropWords");
	},
	"click #addLanguages": function(event) {
		Meteor.call("addLanguages");
	}
});