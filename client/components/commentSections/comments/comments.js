Template.comments.onCreated(function() {
	this.subscribe('getComments', FlowRouter.getParam('_id'), getLanguage());
});

Template.comments.helpers({
	comments: function() {
		return Comments.find({
			typeId: FlowRouter.getParam('_id'),
			language: getLanguage()
		});
	}
});