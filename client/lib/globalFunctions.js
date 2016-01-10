getLanguage = function() {
	if (Session.get('currentlanguage') !== undefined) {
		return Session.get('currentlanguage');
	} else {
		setLanguage('en');
		return 'en';
	}
};

setLanguage = function(lang) {
	if (lang !== undefined) {
		Session.set('currentlanguage', lang);
		TAPi18n.setLanguage(lang);
		setSearchLanguage(lang);
	} else {
		Session.set('currentlanguage', 'en');
		TAPi18n.setLanguage('en');
		setSearchLanguage('en');
	}
};

setSearchLanguage = function(lang) {
	WordsIndex.getComponentMethods()
		.addProps('language', lang);
};


getCategoryTab = function() {
	if (Session.get('currentTab') === undefined) {
		setCategoryTab('video');
		return Session.get('currentTab');
	} else {
		return Session.get('currentTab');
	}
};

setCategoryTab =  function(category) {
	Session.set('currentTab', category);
};