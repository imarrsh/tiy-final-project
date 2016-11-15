var Backbone = require('backbone');

var ParseModel = require('./parseSetup').ParseModel;
var ParseCollection = require('./parseSetup').ParseCollection;

var Contribution = ParseModel.extend({

});

var ContributionCollection = ParseCollection.extend({
  model: Contribution
});

module.exports = {
  Contribution: Contribution,
  ContributionCollection: ContributionCollection
};
