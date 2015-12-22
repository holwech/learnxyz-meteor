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
		$(".alert").removeClass("hide");
		$("#warning-text").html(error.reason);
	}
};
AutoForm.addHooks(["newWord", "newUrl", "newUrlComment"], notificationHandling);

