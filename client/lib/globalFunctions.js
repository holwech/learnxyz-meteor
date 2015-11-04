getLanguage = function() {
	if (Session.get("currentlanguage") !== undefined) {
		return Session.get("currentlanguage");
	} else {
		setLanguage("en");
		return "en";
	}
};
setLanguage = function(lang) {
	if (lang !== undefined) {
		Session.set("currentlanguage", lang);
	} else {
		Session.set("currentlanguage", "en");
	}
};