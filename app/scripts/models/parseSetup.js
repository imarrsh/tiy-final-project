var Backbone = require('backbone');

// var parseHeaders = require('./parseUtils').parseHeaders;

var ParseModel = Backbone.Model.extend({
  // model layer for parse server
  idAttribute: 'objectId',
  // set up a pointer property on this model
  setPointer: function(field, className, objectId){
    this.set(field, {
      __type: 'Pointer',
      className: className,
      objectId: objectId
    });

    return this;
  },

  setFile: function(field, fileName, fileUrl){
    this.set(field, {
      __type: 'File',
      name: fileName,
      url: fileUrl
    });

    return this;
  }

});

var ParseCollection = Backbone.Collection.extend({
  // collection layer to handle the parse server
  // (clause, field, objectId, className)
  cQuery: function(param, field, options){
    var query = {
      [field]: options
    };

    this.constraint = encodeURI('?' + param + '=' + JSON.stringify(query));
    return this;
  },

  parseQuery: function(field, objectId, className){
    // this.clause = encodeURI('?' + constraints + '={"' + field + '":{"objectId":"' + objectId +
    //     '","__type":"Pointer","className":"' + className + '"}}');
    var query = {
      [field]: {
        objectId: objectId,
        className: className,
        __type: 'Pointer'
      }
    };

    // console.log(query, JSON.stringify(query));
    this.clause = encodeURI('?where=' + JSON.stringify(query));

    return this;
  },

  url: function(){
    var url = this.baseURL;

    if (this.clause) {
      url += this.clause;
    } else if (this.constraint) {
      url += this.constraint;
    }

    return url;
  }

});

module.exports = {
  ParseModel: ParseModel,
  ParseCollection: ParseCollection
};
