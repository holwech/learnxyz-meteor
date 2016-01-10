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
		let data = Urls.findOne({_id: FlowRouter.getParam('_id')});
		console.log(data);
		return 'lol';
	}
})