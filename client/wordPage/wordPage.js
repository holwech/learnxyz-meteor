Template.wordPage.helpers({
	data: function() {
		return Words.findOne({_id: this._id});
	}
});

Template.wordPage.events({
	"keypress #search-box": function(event) {
		Router.go("/");
	}
})