Router.configure({
	layoutTemplate: "layout"
});

Router.route("/", {
	name: "home"
});

Router.route("/result/:_id", {
	name: "result"
});

Router.route("/adddata", {
	name: "adddata"
});