Words =  new Mongo.Collection("words");

Words.attachSchema(new SimpleSchema({
	word: {
		type: String,
		label: "Word",
		max: 200
	},
	createdAt: {
		type: Date,
		label: "Date"
	}
}));
