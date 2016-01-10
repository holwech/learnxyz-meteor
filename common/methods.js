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
			throw new Meteor.Error('word-exists', 'Word already exists (x)');
		}
		if (langData === undefined) {
			throw new Meteor.Error('language-undefined', 'Undefined language (x)');
		}
		let dbObject = {
			createdAt: new Date(),
			language: code,
			createdBy: {
				userId: this.userId,
				username: Meteor.users.findOne({_id: this.userId}).username
			},
			description: doc.description.trim(),
			word: doc.word.toLowerCase().trim(),
			relatedUrls: []
		};
		Words.insert(
			dbObject,
			function(error, inserted) {
				if(error) {
					throw new Meteor.Error('word-insert-db', 'There was an error processing your request (x)');
				}
			}
		);
		return doc.word + ' has been added! (x)';
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
		let langData = Languages.findOne({name: doc.language.trim()}, {code: 1});
		let code = langData.code;
		//Error handling
		if (langData === undefined) {
			throw new Meteor.Error('language-undefined', 'Undefined language (x)');
		}
		let wordData = Words.findOne({word: doc.relatedWords.toLowerCase().trim()});
		let urlData = Urls.findOne({url: doc.url.trim(), language: code});
		if (wordData === undefined) {
			throw new Meteor.Error('related-word-not-exists', 'Related word does not exist (x)');
		}
		//If the url is already added to the system, only the voting-object for the specific word will
		//be added here.
		if (urlData !== undefined) {
			if(urlData.voting.hasOwnProperty(wordData._id)) {
				throw new Meteor.Error('url-and-related-word-exists', 'The url already exists for this language and related word is already added. (x)');
			}
			let dbObject = {voting: {}};
			dbObject.voting[wordData._id] = {
				upvote: {
					count: 0,
					users: []
				},
				downvote: {
					count: 0,
					users: []
				}
			};
			Urls.update(
				{_id: urlData._id},
				dbObject
			);
			return doc.url + ' has been added! (x)';
		}
		//If the url has never been added for this language before.
		let dbObject = {
			createdAt: new Date(),
			language: code,
			createdBy: {
				userId: this.userId,
				username: Meteor.users.findOne({_id: this.userId}).username
			},
			description: doc.description.trim(),
			urlType: doc.urlType,
			url: doc.url.trim(),
			voting: {},
			relatedWords: []
		};
		dbObject.voting[wordData._id] = {
			upvote: {
				count: 0,
				users: []
			},
			downvote: {
				count: 0,
				users: []
			}
		};
		Urls.insert(
			dbObject,
			function(error, inserted) {
				if (error) {
					throw new Meteor.Error('url-insert-db', 'There was an error processing your request. (x)' );
				}
			}
		);
		let insertedId = Urls.findOne({url: doc.url})._id;
		Urls.update(
			{_id: insertedId},
			{$addToSet: {relatedWords: wordData._id}},
			function(error, inserted) {
				if (error) {
					throw new Meteor.Error('related-word-update-db', 'There was an error processing your request. (x)');
				}
			}
		);
		Words.update(
			{word: doc.relatedWords.toLowerCase().trim()},
			{$addToSet: {relatedUrls: insertedId}},
			function(error, inserted) {
				if (error) {
					throw new Meteor.Error('related-url-update-db', 'There was an error processing your request. (x)');
				}
			}
		);
		return doc.url + ' has been added! (x)';
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
			throw new Meteor.Error('logget-out', 'You are not logged in. (x)');
		}
		let langData = Languages.findOne({name: doc.language}, {code: 1});
		let code = langData.code;
		let typeId = Urls.findOne({_id: doc.typeId})._id;
		if (typeId === undefined) {
			throw new Meteor.Error('url-undefined', 'Undefined url. (x)');
		}
		if (langData === undefined) {
			throw new Meteor.Error('language-undefined', 'Undefined language. (x)');
		}
		Comments.insert({
				language: code,
				createdBy: {
					userId: this.userId,
					username: Meteor.users.findOne({_id: this.userId}).username
				},
				createdAt: new Date(),
				commentedOn: typeId,
				comment: doc.commentText
			},
			function(error, inserted) {
				if (error) {
					throw new Meteor.Error('comment-insert-db', 'There was an error processing your request. Insert comment error (x)');
				}
			}
		);
		return 'Your comment har been posted (x)';
	},

//==
//
// VOTING FUNCTIONS
	vote: function(voteType, language, wordId, urlId) {
		if(!this.userId) {
			throw new Meteor.Error('logged-out', 'You are not logged in. (x)');
		}
		let urlData = Urls.findOne({
				_id: urlId, 
				relatedWords: wordId
			}
		);
		if (voteType !== 'downvote' && voteType !== 'upvote') {
			throw new Meteor.Error('vote-type-undefined', 'Undefined vote type. (x)');
		}
		if (urlData === undefined) {
			throw new Meteor.Error('relation-undefined', 'Undefined relation. (x)');
		}
		if (!urlData.hasOwnProperty(language)) {
			throw new Meteor.Error('language-undefined', 'Undefined language. (x)');
		}
		//Sets the inverse of voteType
		let invVoteType = (voteType === 'upvote') ? 'downvote' : upvote;
		let userUpvotes = urlData['voting'][wordId]['upvote']['user'];
		let userDownvotes = urlData['voting'][wordId]['downvote']['user'];
		//If user has not upvoted or downvoted this relation.
		if(userUpvotes.indexOf(this.userId) === -1 && userDownvotes.indexOf(this.userId) === -1) {
			Urls.update({
					_id: urlId
				},
				{
					$inc: {'.voting.' + wordId + '.' + voteType + '.count': 1},
					$addToSet: {'.voting.' + wordId + '.' + voteType + '.users': this.userId}
				}
			);
		//If user wants to undo a vote
		} else if((userUpvotes.indexOf(this.userId) !== -1 && voteType === 'upvote') ||
							(userDownvotes.indexOf(this.userId) !=== -1 && voteType === 'downvote')) {
			Urls.update(
				{_id: urlId}
				{
					$
				}
			);
		}


		let dbIncObject = {};
		let dbAddSetObject = {};

		dbIncObject[language + '.voting.' + wordId + '.' + voteType + '.count'] = 1;
		dbAddSetObject[language + '.voting.' + wordId + '.' + voteType + '.users'] = this.userId;
		console.log(dbIncObject);
		console.log(dbAddSetObject);
		Urls.update(
			{_id: urlId},
			{
				$inc: dbIncObject,
				$addToSet: dbAddSetObject
			},
			function(error, inserted) {
				if (error) {
					throw new Meteor.Error('vote-db', 'There was an error processing your request. (x)');
				}
			}
		);
	},




//==
//
// LANGUAGE FUNCTIONS

	addLanguages: function() {
		Languages.remove({});
		for (let key in isoLangs) {
			Languages.insert({
				code: key,
				name: isoLangs[key].name,
				nativeName: isoLangs[key].nativeName
			});
		}
	}
});
