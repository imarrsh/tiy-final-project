var Backbone = require('backbone');

// var parseHeaders = require('./parseUtils').parseHeaders;

var ParseModel = Backbone.Model.extend({
  // model layer for parse server
  idAttribute: 'objectId'
});

var ParseCollection = Backbone.Collection.extend({
  // collection layer to handle the parse server
  parseWhere: function(field, objectId, className){
    this.clause = encodeURI('?where={"' + field + '":{"objectId":"' + objectId +
        '","__type":"Pointer","className":"' + className + '"}}');

    return this;
  },

  url: function(){
    var url = this.baseURL;

    if (this.clause) {
      url += this.clause;
    }

    return url;
  }

});

module.exports = {
  ParseModel: ParseModel,
  ParseCollection: ParseCollection
};
