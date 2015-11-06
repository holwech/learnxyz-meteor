var newData = {
	before: {
		method: function(doc) {
			return doc;
		}
	},
	onSuccess: function(formType, result) {
		console.log(result);
	},
	onError: function(formType, error) {
		console.log(error);
	}
};

AutoForm.addHooks(["newWord", "newUrl"], newData);