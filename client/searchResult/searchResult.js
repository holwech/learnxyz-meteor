Template.searchResult.helpers({
  wordsIndex: () => WordsIndex,
  getCurrentTab: function() {
    if(Session.get("currentTab")) {
      return "category=" + Session.get("currentTab");
    } else {
      Session.set("currentTab", "video");
      return "category=video";
    }
  }
});