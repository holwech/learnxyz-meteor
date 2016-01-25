Template.comments.onCreated(function() {
	this.subscribe('getComments', FlowRouter.getParam('_id'), getLanguage());
});

Template.comments.helpers({
	comments: function() {
		return Comments.find({commentedOn: FlowRouter.getParam('_id')});
	}
});