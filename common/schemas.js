Schemas = {};


Schemas.newWord = new SimpleSchema({
	word: {
		type: String,
		label: function() {
			return TAPi18n.__('form_word');
		},
		max: 50
	},
	description: {
		type: String,
		label: function() {
			return TAPi18n.__('form_description');
		}
	},
	language: {
		type: String,
		label: function() {
			return TAPi18n.__('form_language');
		},
		autoValue: function() {
			return getLanguage();
		}
	}
});

Schemas.newUrl = new SimpleSchema({
	url: {
		type: String,
		label: function() {
			return TAPi18n.__('form_url');
		}
	},
	description: {
		type: String,
		label: function() {
			return TAPi18n.__('form_description');
		}
	},
	relatedWords: {
		type: String,
		label: function() {
			return TAPi18n.__('form_relatedWords');
		}
	},
	urlType: {
		type: String,
		allowedValues: ["video", "text", "image"],
		label: function() {
			return TAPi18n.__('form_urlType');
		}
	},
	language: {
		type: String,
		label: function() {
			return TAPi18n.__('form_language');
		}
	}
});

Schemas.newUrlComment = new SimpleSchema({
	commentText: {
		type: String,
		label: "Write a comment (x)",
		autoform: {
			rows: 3
		}
	}
});