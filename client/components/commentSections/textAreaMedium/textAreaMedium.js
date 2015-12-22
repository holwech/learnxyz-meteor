Template.textAreaMedium.helpers({
	newCommentSchema: function() {
		return Schemas.newComment;
	},
	fieldLanguage: function() {
		return Languages.findOne({code: getLanguage()}).name;
	},
	fieldTypeId: function() {
		return Router.current().params._id;
	}
});