Meteor.methods({
	newWord: function(doc) {
		check(doc, Schemas.newWord);
		var data = Words.findOne({word: doc.word.toLowerCase()});

		if (data === undefined) {
			Words.insert({
					createdAt: new Date(),
					language: doc.language,
					word: doc.word,
					description: doc.description
				},
				function(error, inserted) {
					if(error) {
						throw new Meteor.Error( 500, 'There was an error processing your request' );
					}
				}
			);
			return doc.word + " has been added!";

		} else {
			throw new Meteor.Error( 500, 'Word already exists' );
		}
	},

	newUrl: function(doc) {
		check(doc, Schemas.newUrl);
		var data = Words.findOne({word: doc.relatedWords.toLowerCase()});
		var url = Urls.findOne({url: doc.url});

		if ((data !== undefined) && (url === undefined)) {
			Urls.insert(
				{
					createdAt: new Date(),
					urlType: doc.urlType,
					language: doc.language,
					url: doc.url,
					description: doc.description,
					relatedWords: data._id
				},
				function(error, inserted) {
					if (error) {
						throw new Meteor.Error( 500, 'There was an error processing your request' );
					}
				}
			);

			Words.update(
				{word: doc.relatedWords.toLowerCase()},
				{$addToSet: {relatedUrls: Urls.findOne({url: doc.url})._id}},
				function(error, inserted) {
					if (error) {
						throw new Meteor.Error( 500, 'There was an error processing your request' );
					}
				}
			);
			return doc.url + " has been added!";

		} else {
			throw new Meteor.Error(500, "Related word doesn't exist or url already exists");
		}
	},

	deleteWord: function(wordId) {
		Words.remove(wordId);
	}
});