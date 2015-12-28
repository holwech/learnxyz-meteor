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