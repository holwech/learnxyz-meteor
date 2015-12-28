Template.textAreaMedium.helpers({
	newCommentSchema: function() {
		return Schemas.newComment;
	},
	fieldLanguage: function() {
		return Languages.findOne({code: getLanguage()}).name;
	},
	fieldTypeId: function() {
		return FlowRouter.getParam('_id');
	}
});