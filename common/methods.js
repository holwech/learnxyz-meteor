Meteor.methods({
	newWord: function(doc) {
		check(doc, Schemas.newWord);
		let langData = Languages.findOne({name: doc.language}, {code: 1});
		let code = langData.code;
		let data = Words.findOne(
			{
				word: doc.word.toLowerCase(),
				language: code
			}
		);
		if (data !== undefined) {
			throw new Meteor.Error(500, "Word already exists");
		}
		if (langData === undefined) {
			throw new Meteor.Error(500, "Undefined language");
		}

		Words.insert({
				createdAt: new Date(),
				language: code,
				word: doc.word.toLowerCase(),
				description: doc.description
			},
			function(error, inserted) {
				if(error) {
					throw new Meteor.Error( 500, 'There was an error processing your request' );
				}
			}
		);
		return doc.word + " has been added!";
	},

	newUrl: function(doc) {
		check(doc, Schemas.newUrl);
		var wordData = Words.findOne({word: doc.relatedWords.toLowerCase()});
		var langData = Languages.findOne({name: doc.language}, {code: 1});
		var code = langData.code;
		var urlData = Urls.findOne({url: doc.url});

		if (wordData === undefined) {
			throw new Meteor.Error(500, "Related word does not exist");
		}

		if (langData === undefined) {
			throw new Meteor.Error(500, "Undefined language");
		}
		if (urlData === undefined) {
			Urls.insert(
				{
					createdAt: new Date(),
					urlType: doc.urlType,
					url: doc.url,
				},
				function(error, inserted) {
					if (error) {
						throw new Meteor.Error( 500, 'There was an error processing your request' );
					}
				}
			);
			Urls.update(
				{	urlType: doc.urlType},
				{
					$addToSet: {
						relatedWords: wordData._id,
						data: {
							language: code,
							description: doc.description,
						}
					}
				}
			);
		} else {
			urlData = Urls.findOne(
				{
					url: doc.url,
					data: {$elemMatch: {language: code}}
				}
			);
			if (urlData === undefined) {
				Urls.update(
					{	urlType: doc.urlType},
					{
						$addToSet: {
							relatedWords: wordData._id,
							data: {
								language: code,
								description: doc.description,
							}
						}
					}
				);
			} else {
				throw new Meteor.Error( 500, 'Url already exists' );
			}
		}

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
	},

	newUrlComment: function() {

	},

	deleteWord: function(wordId) {
		Words.remove(wordId);
	},

	dropUrls: function() {
		Urls.remove({});
	},
	dropWords: function() {
		Words.remove({});
	},
	addLanguages: function() {
		Lanuages.remove({});
		for (var key in isoLangs) {
			Languages.insert({
				code: key,
				name: isoLangs[key].name,
				nativeName: isoLangs[key].nativeName
			});
		}
	}
});