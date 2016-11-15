var Backbone = require('backbone');

var ParseModel = require('./parseSetup').ParseModel;
var ParseCollection = require('./parseSetup').ParseCollection;

var Story = ParseModel.extend({

});

var StoryCollection = ParseCollection.extend({
  model: Story
});

module.exports = {
  Story: Story,
  StoryCollection: StoryCollection
};
