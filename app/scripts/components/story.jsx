var React = require('react');

// models
var User = require('../models/user').User;
var Story = require('../models/story').Story;
// var ContributionCollection = require('../models/contribution').ContributionCollection;
// var StoryCollection = require('../models/story').StoryCollection;

// layouts
var AppWrapper = require('./layouts/general.jsx').AppWrapper;
var ContainerRow = require('./layouts/general.jsx').ContainerRow;
var AppHeaderMain = require('./layouts/general.jsx').AppHeaderMain;



var StoryReadContainer = React.createClass({
  getInitialState: function(){
    return {
      story: new Story(),
      // contributions: new ContributionCollection()
    }
  },
  componentWillMount: function(){
    this.getStory();
  },

  componentWillReciveProps: function(){
    this.getStory();
  },

  getStory: function(){
    var story = this.state.story;
    var storyId = this.props.storyId;

    if (!storyId){
      return;
    }

    story.set('objectId', storyId);
    story.fetch().then(() => this.setState({story: story}))
  },

  render: function(){
    var story = this.state.story;
    return(
      <AppWrapper>
        <AppHeaderMain />
        <ContainerRow>
          <div>
            <h1>{story.get('title')}</h1>
          </div>
        </ContainerRow>
      </AppWrapper>
    );
  }

});

module.exports = {
  StoryReadContainer: StoryReadContainer
}