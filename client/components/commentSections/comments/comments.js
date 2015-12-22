Template.comments.onCreated(function() {
	this.subscribe('getComments', Router.current().params._id, getLanguage());
});

Template.comments.helpers({
	comments: function() {
		return Comments.find({
			typeId: Router.current().params._id,
			language: getLanguage()
		});
	}
});