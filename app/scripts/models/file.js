var Backbone = require('backbone');
var ParseModel = require('./parseSetup').ParseModel;

var FileModel = ParseModel.extend({
  save: function(key, val, options){ // mode.save() - annotated source

    return Backbone.Model.prototype.save.call(this, key, val, options);
  }
});

module.exports = {
  FileModel: FileModel
};
