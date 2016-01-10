//Hook for handling successfull or unsuccessfull posting of any data
let notificationHandling = {
	before: {
		method: function(doc) {
			return doc;
		}
	},
	onSuccess: function(formType, result) {
		console.log(result);
	},
	onError: function(formType, error) {
		console.log(error.reason);
		$('.alert').removeClass('hide');
		$('#warning-text').html(error.reason);
	}
};
AutoForm.addHooks(['newWord', 'newUrl', 'newComment'], notificationHandling);


//Inserts the language back into the languages field after submit
let onPostHandling = {
	after: {
		method: function(doc) {
			console.log('posted')
			$('#field-language').val(Languages.findOne({code:getLanguage()}).name);
		}
	}
}
AutoForm.addHooks(['newWord', 'newUrl'], onPostHandling);