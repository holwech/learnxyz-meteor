FlowRouter.route('/tools', {
	name: 'tools',
	action: function() {
		BlazeLayout.render(
			'layout',
			{
				sideMenu: 'sideMenu', 
				navBar: 'navBar',
				main: 'adminTools'
			}
		);
	}
});

FlowRouter.route('/', {
	name: 'home',
	action: function() {
		BlazeLayout.render(
			'layout',
			{
				sideMenu: 'sideMenu', 
				navBar: 'navBar',
				main: 'searchResult'
			}
		);
	}
});

FlowRouter.route('/result/:_id', {
	name: 'result',
	action: function() {
		BlazeLayout.render(
			'layout',
			{
				sideMenu: 'sideMenu', 
				navBar: 'navBar',
				main: 'wordPage'
			}
		);
	}
});

FlowRouter.route('/result/:_wordId/:_id', {
	name: 'urlPage',
	action: function() {
		BlazeLayout.render(
			'layout',
			{
				sideMenu: 'sideMenu', 
				navBar: 'navBar',
				main: 'urlPage'
			}
		);
	}
});

FlowRouter.route('/new-word', {
	name: 'newWord',
	action: function() {
		BlazeLayout.render(
			'layout',
			{
				sideMenu: 'sideMenu', 
				navBar: 'navBar',
				main: 'newWord'
			}
		);
	}
});

FlowRouter.route('/login', {
	name: 'login',
	action: function() {
		BlazeLayout.render(
			'layout',
			{
				sideMenu: 'sideMenu',
				navBar: 'navBar',
				main: 'loginUser'
			}
		)
	}
});


FlowRouter.route('/register', {
	name: 'register',
	action: function() {
		BlazeLayout.render(
			'layout',
			{
				sideMenu: 'sideMenu',
				navBar: 'navBar',
				main: 'newUser'
			}
		)
	}
});
