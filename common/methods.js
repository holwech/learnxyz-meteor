Meteor.methods({

//==
//
// WORD FUNCTIONS

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
			throw new Meteor.Error(500, 'Word already exists');
		}
		if (langData === undefined) {
			throw new Meteor.Error(500, 'Undefined language');
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
		return doc.word + ' has been added!';
	},

	deleteWord: function(wordId) {
		Words.remove(wordId);
	},

	dropWords: function() {
		Words.remove({});
	},

//==
//
// URL FUNCTIONS

	newUrl: function(doc) {
		check(doc, Schemas.newUrl);
		let wordData = Words.findOne({word: doc.relatedWords.toLowerCase()});
		let langData = Languages.findOne({name: doc.language}, {code: 1});
		let code = langData.code;
		let urlData = Urls.findOne({url: doc.url});

		if (wordData === undefined) {
			throw new Meteor.Error(500, 'Related word does not exist');
		}

		if (langData === undefined) {
			throw new Meteor.Error(500, 'Undefined language');
		}
		if (urlData === undefined) {
			let dbObject = {
				createdAt: new Date(),
				urlType: doc.urlType,
				url: doc.url
			};
			dbObject[code] = {
				description: doc.description
			};
			Urls.insert(
				dbObject,
				function(error, inserted) {
					if (error) {
						throw new Meteor.Error( 500, 'There was an error processing your request. Url insertion' );
					}
				}
			);
			var insertedId = Urls.findOne({url: doc.url})._id;
			console.log(wordData._id + ' ' + insertedId)
			Urls.update(
				{_id: insertedId},
				{$addToSet: {relatedWords: wordData._id}},
				function(error, inserted) {
					if (error) {
						throw new Meteor.Error( 500, 'There was an error processing your request. Related words update');
					}
				}
			);
			Words.update(
				{word: doc.relatedWords.toLowerCase()},
				{$addToSet: {relatedUrls: insertedId}},
				function(error, inserted) {
					if (error) {
						throw new Meteor.Error(500, 'There was an error processing your request. Related url update');
					}
				}
			);
		} else if (urlData.hasOwnProperty(code)) {
			throw new Meteor.Error( 500, 'Url already exists' );
		} else if (urlData) {
			let dbObject = {};
			dbObject[code] = {description: doc.description};
			Urls.update(
				{_id: urlData._id},
				{$set: dbObject}
			);
		}
		return doc.url + ' has been added!';
	},

	dropUrls: function() {
		Urls.remove({});
	},

//==
//
// COMMENT FUNCTIONS

	newComment: function(doc) {
		check(doc, Schemas.newComment);
		if(!this.userId) {
			throw new Meteor.Error(500, 'You are not logged in');
		}
		let langData = Languages.findOne({name: doc.language}, {code: 1});
		let langCode = langData.code;
		let typeId = Urls.findOne({_id: doc.typeId})._id;
		if (typeId === undefined) {
			throw new Meteor.Error(500, 'Undefined url id');
		}
		if (langData === undefined) {
			throw new Meteor.Error(500, 'Undefined language');
		}
		Comments.insert({
				createdBy: {
					userId: this.userId,
					username: Meteor.users.findOne({_id: this.userId}).username
				},
				createdAt: new Date(),
				typeId: typeId,
				language: langCode,
				comment: doc.commentText
			},
			function(error, inserted) {
				if (error) {
					throw new Meteor.Error(500, 'There was an error processing your request. Insert comment error');
				}
			}
		);
		return "Your comment har been posted (x)";
	},

//==
//
// VOTING FUNCTIONS
	vote: function(voteType, language, wordId, urlId) {
		if(!this.userId) {
			throw new Meteor.Error(500, 'You are not logged in');
		}
		let urlData = Urls.findOne({
				_id: urlId, 
				relatedWords: wordId
			},
			function(error, inserted) {
				if (error) {
					throw new Meteor.Error(500, 'There was an error processing your request. Url vote search');
				}
			}
		);
		if (voteType !== 'downvote' || voteType !== 'upvote') {
			throw new Meteor.Error(500, 'Undefined vote type');
		}
		if (urlData === undefined) {
			throw new Meteor.Error(500, 'There was an error processing your request. Undefined relation');
		}
		if (!urlData.hasOwnProperty(language)) {
			throw new Meteor.Error(500, 'Undefined language');
		}
		let dbObject = {};
		dbObject[language] = {voting: {}};
		dbObject[language].voting[wordId] = {};
		dbObject[language].voting[wordId][voteType] = {};
		let dbIncObject = dbObject;
		let dbAddSetObject = dbObject;
		dbIncObject[language].voting[wordId][voteType] = {count: 1};
		dbAddSetObject[language].voting[wordId][voteType] = {users: this.userId};

		Urls.update(
			{_id: urlId},
			{
				$inc: dbIncObject,
				$addToSet: dbAddSetObject
			}
		);
	},




//==
//
// LANGUAGE FUNCTIONS

	addLanguages: function() {
		Lanuages.remove({});
		for (let key in isoLangs) {
			Languages.insert({
				code: key,
				name: isoLangs[key].name,
				nativeName: isoLangs[key].nativeName
			});
		}
	}
});