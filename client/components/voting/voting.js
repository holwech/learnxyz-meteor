Template.voting.events({
	'click #upvote, click #downvote': function(event) {
		Meteor.call(
			"vote", 
			event.target.id, 
			getLanguage(), 
			FlowRouter.getParam('_wordId'),
			FlowRouter.getParam('_id')
		);
	}
});

Template.voting.helpers({
	voteCount: function() {
		
	}
})