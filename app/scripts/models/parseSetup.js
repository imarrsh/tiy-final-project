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

  // set up a file pointer
  setFile: function(field, fileName, fileUrl){
    this.set(field, {
      __type: 'File',
      name: fileName,
      url: fileUrl
    });

    return this;
  },

  // use server to increment/decrement
  // server will send back the new value
  increment: function(field, amount){
    return {
      [field]: {
        __op: 'Increment',
        amount: amount
      }
    };
  },

  decrement: function(field, amount){
    return {
      [field]: {
        __op: 'Decrement',
        amount: amount
      }
    };
  }

});

var Query = Backbone.Model.extend({});

var ParseCollection = Backbone.Collection.extend({

  deepQuery: function(param, field, options){
    var query = {
      [field]: options
    };

    this.constraint = encodeURI('?' + param + '=' + JSON.stringify(query));
    return this;
  },

  parseQuery: function(field, objectId, className){
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

  extra: '',
  also: function(key, values){
    this.extra += '&' + key + '=' + values;
    return this;
  },

  url: function(){
    var url = this.baseURL;

    if (this.clause) {
      url += this.clause;
    }

    if (this.constraint) {
      url += this.constraint;
    }

    if (this.extra){
      url += this.extra;
    }

    // for experiemental queries
    // if (this.newclause){
    //   url += this.newclause;
    // }

    return url;
  }


  // ##############################################
  // query tools for parse server:
  // NOT READY FOR PRODUCTION!!
  // ##############################################

  // example of desired usage:
  // .query('where', 'owner') // start the query
  // .meets('objectId', user.get('objectId') // set field contraints
  // .ofClass('_User') // set the class
  // .ofType('Pointer') // the the data type
  // .also('include', 'owner.alias') // & other contraints or inclusions

  , query: function(param, field){
    this.queryField = field;
    this.queryModel = new Query({ [field]: {} });

    this.newclause = encodeURI('?' + param + '=');

    return this;
  },
  // var field = function(name){
  //   query.set(name, {});
  //   return this;
  // };

  meets: function(value, id){
    var query = this.queryModel
    , field = this.queryField
    // get the current state of query
    , current = query.get(field);
    
    // set a new key/value
    current[value] = id;
    // update the state of this.queryModel
    query.set(field, current);

    return this;
  },

  ofClass: function(className){
    var query = this.queryModel
    , field = this.queryField
    , current = query.get(field);

    current.className = className;
    query.set(field, current);
    return this;
  },

  ofType: function(type){
    var query = this.queryModel
    , field = this.queryField
    , current = query.get(field);

    current.__type = type;
    query.set(field, current);
    // console.log(this);
    return this;
  },

  // also:   
  endQuery: function(){
    var query = JSON.stringify(this.queryModel.toJSON());

    this.newclause += encodeURI(query);

    return this;
  },


  // ##############################################
  // end query tools for parse server:
  // ##############################################

});

module.exports = {
  ParseModel: ParseModel,
  ParseCollection: ParseCollection
};
