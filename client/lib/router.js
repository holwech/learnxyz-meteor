Router.configure({
	layoutTemplate: "layout"
});

Router.route("/", {
	name: "home"
});

Router.route("/result/:_id", {
	name: "result"
});

Router.route("/newWord", {
	name: "newWord"
});

Router.route("/newUrl", {
	name: "newUrl"
});