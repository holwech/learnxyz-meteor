Meteor.methods({
	newWord: function(doc) {
		check(doc, Schemas.newWord);
		var data = Words.findOne({word: doc.word});
		if (data === undefined) {
			Words.insert({
				word: doc.word.toLowerCase(),
				description: doc.description,
				createdAt: new Date()
			});
			console.log(doc.word + " has been added!");
		} else {
			console.log("Word already exists");
		}
	},
	newUrl: function(doc) {
		check(doc, Schemas.newUrl);
		var data = Words.findOne({word: doc.relatedWords.toLowerCase()});
		if (data !== undefined) {
			Urls.update(
				{url: doc.url},
			{
				$set: 
				{
					url: doc.url,
					description: doc.description,
					urlType: doc.urlType,
					createdAt: new Date()
				},
				$addToSet: {relatedWords: data._id}
			},
				{ upsert: true}
			);
			Words.update(
				{word: doc.relatedWords.toLowerCase()},
				{$addToSet: {relatedUrls: Urls.findOne({url: doc.url})._id}}
			);
			console.log("Url added")
		} else {
			console.log("Url not added, word does not exist");
		}
	},
	deleteWord: function(wordId) {
		Words.remove(wordId);
	}
});