Urls =  new Mongo.Collection("urls");

Words =  new Mongo.Collection("words");
WordsIndex = new EasySearch.Index({
  collection: Words,
  fields: ["word"],
  engine: new EasySearch.MongoDB()
});

Languages = new Mongo.Collection("languages");
LanguagesIndex = new EasySearch.Index({
  collection: Languages,
  fields: ["name","nativeName"],
  engine: new EasySearch.MongoDB()
});