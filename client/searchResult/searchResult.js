var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
var fields = ['word'];

WordSearch = new SearchSource('words', fields, options);

Template.searchResult.helpers({
  getWords: function() {
    return WordSearch.getData({
      transform: function(matchText, regExp) {
        return matchText.replace(regExp, "<b>$&</b>");
      },
      sort: {isoScore: -1}
    });
  },
  
  isLoading: function() {
    return WordSearch.getStatus().loading;
  },
  getCurrentTab: function() {
    if(Session.get("currentTab")) {
      return "category=" + Session.get("currentTab");
    } else {
      Session.set("currentTab", "videos");
      return "category=videos";
    }
  }
});

Template.searchResult.rendered = function() {
  WordSearch.search('');
};