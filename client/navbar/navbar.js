Template.searchBox.events({
  "keyup #search-box": _.throttle(function(e) {
    var text = $(e.target).val().trim();
    WordSearch.search(text);
    if(Router.current().name !== "home") {
    	Router.go("/");
    }
  }, 200)
});