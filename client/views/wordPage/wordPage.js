Template.wordPage.onCreated(function () {
	this.subscribe("getWordUrls", FlowRouter.getParam('_id'));
});

Template.wordPage.events({
	'click #upvote, click #downvote': function(event) {
		Meteor.call('vote', event.target.id, getLanguage(), FlowRouter.getParam('_id'), this._id);
	}
});

Template.wordPage.helpers({
	urlData: function() {
		let _wordId = FlowRouter.getParam('_id');
		let dbObject = {
			relatedWords: _wordId,
			urlType: getCategoryTab()
		};
		let urlData = Urls.find(dbObject).fetch();
		for(let i = 0; i < urlData.length; i++) {
			urlData[i]._wordId = _wordId;
		}
		return urlData;
	},
	wordId: function() {
		return FlowRouter.getParam('_id');
	},
	urlId: function() {
		return this._id;
	},
	voteCount: function() {
		let data = Urls.findOne({_id: this._id});
		data = data['voting'][FlowRouter.getParam('_id')];
		return data.upvote.count - data.downvote.count;
	}
});