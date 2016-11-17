var Backbone = require('backbone');

var ParseModel = require('./parseSetup').ParseModel;
var ParseCollection = require('./parseSetup').ParseCollection;

// grab the contribution model
var ContributionCollection = require('./contribution').ContributionCollection;

var Story = ParseModel.extend({
  initialize: function(){
    var contributions = new ContributionCollection();
  },

  defaults: {
    owner: '',
    title: '',
    contributions: new ContributionCollection()
  },

  urlRoot: 'https://mt-parse-server.herokuapp.com/Classes/Story'

});

var StoryCollection = ParseCollection.extend({
  
  model: Story,

  url: 'https://mt-parse-server.herokuapp.com/Classes/Story',

  parse: function(data){
    return data.results;
  }

});

module.exports = {
  Story: Story,
  StoryCollection: StoryCollection
};
