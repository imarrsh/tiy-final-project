var Backbone = require('backbone');

var ParseModel = require('./parseSetup').ParseModel;
var ParseCollection = require('./parseSetup').ParseCollection;

var Contribution = ParseModel.extend({
  defaults: {
    content: '',
    order: 0,
    upvotes: 0,
    downvotes: 0
  },

  urlRoot: 'https://mt-parse-server.herokuapp.com/Classes/StoryContribution',

  checkGrammar: function(text){
    //######################
    // LanguageTool API
    //######################
    this.fetch({
      beforeSend: function(xhr){
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Accept', 'application/json');
      },
      type: 'POST',
      url: 'https://languagetool.org/api/v2/check',
      data: {
        text: this.get('content'),
        language: 'en-US',
        enabledOnly: false
      }
    }).then(function(response){
      console.log(response);
    });

  },

  deleteSegment: function(){
    this.destroy();
  },

  updateSegment: function(){
    var data = {content: this.get('content')};
    this.fauxPatch(data);

    // this.save({}, {
    //   data: JSON.stringify(data),
    //   contentType: 'application/json'
    // });
  },

  vote: function(bool){
    // true is an upvote, false is a downvote
    var upvotes = this.get('upvotes')
    , downvotes = this.get('downvotes')
    , data;

    // using a quick patch-like method from
    // parseSetup.js
    if (bool) {
      data = this.increment('upvotes', 1);
      this.fauxPatch(data);

    } else {
      data = this.increment('downvotes', 1);
      this.fauxPatch(data);

    }
  }

});

var ContributionCollection = ParseCollection.extend({
  model: Contribution,

  baseURL: 'https://mt-parse-server.herokuapp.com/Classes/StoryContribution',

  parse: function(data){
    return data.results;
  }
});

module.exports = {
  Contribution: Contribution,
  ContributionCollection: ContributionCollection
};
