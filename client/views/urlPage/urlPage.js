Template.urlPage.helpers({
	getData: function() {
		return Urls.findOne({_id: this._id});
	},
	getLangData: function() {
		var data = Urls.findOne({"_id": this._id},{"data": {$elemMatch: {"language": "en"}}});
		console.log(data);
		return data;
	}
});