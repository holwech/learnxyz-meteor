Template.textAreaMedium.helpers({
	newUrlCommentSchema: function() {
		return Schemas.newUrlComment;
	},
	fieldLanguage: function() {
		return Languages.findOne({code: getLanguage()}).name;
	},
	fieldUrlId: function() {
		return Router.current().params._id;
	}
});