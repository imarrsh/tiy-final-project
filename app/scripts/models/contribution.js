var Backbone = require('backbone');

var ParseModel = require('./parseSetup').ParseModel;
var ParseCollection = require('./parseSetup').ParseCollection;

var Contribution = ParseModel.extend({
  defaults: {
    user: 'anon',
    content: '',
    order: 0
  },

  rootUrl: 'https://mt-parse-server.herokuapp.com/Classes/StoryContribution',

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
