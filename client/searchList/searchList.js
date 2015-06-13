var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
var fields = ['text'];

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
  }
});

Template.searchResult.rendered = function() {
  WordSearch.search('');
};