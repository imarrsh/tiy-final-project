var _ = require('underscore');
var Backbone = require('backbone');

var ParseModel = require('./parseSetup').ParseModel;
var ParseCollection = require('./parseSetup').ParseCollection;

// grab the contribution collection
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
    // this didnt work out when updating the title of story
    // delete this.attributes.contributions;

    return Backbone.Model.prototype.save.call(this, key, val, options);
  },

  deleteStory: function(callback){

    var contributions = this.get('contributions');
    // make a clone of the contributions and perform detroy on each one
    // a normal forEach will skip elements and cause some 
    // references to be unedefined
    _.each(_.clone(contributions.models), function(contribution){
      contribution.destroy();
    });

    this.destroy().then(() => {
      callback();
    });

  },

  updateTitle: function(title, callback){
    
    var newTitle = {title: title};

    this.fauxPatch(newTitle);
    
    callback();
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
