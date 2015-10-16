Schemas = {};


Schemas.newWord = new SimpleSchema({
    word: {
        type: String,
        label: "Word",
        max: 50
    },
    description: {
        type: String,
        label: "Description"
    }
});

Schemas.newUrl = new SimpleSchema({
	url: {
		type: String,
		label: "Link"
	},
	description: {
		type: String,
		label: "Description",
	},
	relatedWords: {
		type: String,
		label: "Related word"
	},
	urlType: {
		type: String,
		allowedValues: ["video", "text", "image"],
		label: "Url type"
	}
});