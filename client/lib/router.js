Router.configure({
	layoutTemplate: "layout"
});

Router.route("/", {
	name: "home"
});

Router.route("/result/:__originalId", {
	name: "result"
});

Router.route("/result/:_wordId/:_id", {
	name: "urlPage"
});

Router.route("/tools", {
	name: "adminTools"
});