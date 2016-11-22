var Backbone = require('backbone');

var ParseModel = require('./parseSetup').ParseModel;
var ParseCollection = require('./parseSetup').ParseCollection;

// grab the contribution model
var ContributionCollection = require('./contribution').ContributionCollection;

var Story = ParseModel.extend({
  initialize: function(){
    // var contributions = new ContributionCollection();
  },

  defaults: {
    owner: '',
    title: '',
    contributions: new ContributionCollection()
  },

  urlRoot: 'https://mt-parse-server.herokuapp.com/Classes/Story',

  save: function(key, val, options){

    // prevent from saving a lingering collection
    // there is likely some sort of leak to take care of
    // but this solves the problem for now.
    delete this.attributes.contributions;

    console.log(this, key, val, options);

    return Backbone.Model.prototype.save.call(this, key, val, options);
  }

});

var StoryCollection = ParseCollection.extend({

  model: Story,

  baseURL: 'https://mt-parse-server.herokuapp.com/Classes/Story',

  parse: function(data){
    return data.results;
  }

});

module.exports = {
  Story: Story,
  StoryCollection: StoryCollection
};
