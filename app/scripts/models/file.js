var Backbone = require('backbone');

var ParseModel = require('./parseSetup').ParseModel;

var parseHeaders = require('../parseUtils').parseHeaders;

var FileModel = ParseModel.extend({
  defaults: {
    name: 'default.jpg'
  },

  baseURL: 'https://mt-parse-server.herokuapp.com/files/',

  urlRoot: function(){
    var url = this.baseURL;

    if (this.get('name')){
      url += this.get('name');
    }

    return url;
  },

  // utility for preparing a file for upload
  prepare: function(file){
    var fileData = {
      name: file.name,
      type: file.type,
      data: file
    };

    this.set(fileData);

    return this;
  },

  save: function(attributes, options){
    // set attr and options to empty obj if undefined
    attributes = attributes || {};
    options = options || {};

    // this.set(attributes);

    var file = this.get('data'); // file data

    options.data = file;
    options.beforeSend = function(xhr){
      xhr.setRequestHeader('X-Parse-Application-Id', 'mtparseserver');
      xhr.setRequestHeader('X-Parse-REST-API-Key', 'thompson1');
      xhr.setRequestHeader('Content-Type', file.type);
    };
    // perhaps some parse options
    options.processData = false;
    options.contentType = false;

    return Backbone.Model.prototype.save.call(this, attributes, options);
  }
});

module.exports = {
  FileModel: FileModel
};
