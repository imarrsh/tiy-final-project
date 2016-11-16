var Backbone = require('backbone');

var ParseModel = Backbone.Model.extend({
  // model layer for parse server
  idAttribute: 'objectId'
});

var ParseCollection = Backbone.Collection.extend({
  // collection layer to handle the parse server
});

module.exports = {
  ParseModel: ParseModel,
  ParseCollection: ParseCollection
};
