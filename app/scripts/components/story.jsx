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
      story: new Story()
    }
  },
  componentWillMount: function(){
    this.getStory().getContributions();
  },

  componentWillReciveProps: function(){
    this.getStory().getContributions();
  },

  getStory: function(){
    var story = this.state.story;
    var storyId = this.props.storyId;

    if (!storyId){
      return;
    }

    story.set('objectId', storyId);
    story.fetch().then(() => this.setState({story: story}))

    return this;
  },

  getContributions: function(){
    var story = this.state.story
    , contributions = story.get('contributions');
    // console.log('contributions: ',contributions);


    contributions
      .parseWhere('story', story.get('objectId'), 'Story')
      .fetch()
      .then(() => {
        story.set('contributions', contributions);
        this.setState({story: story})
      });

    return this;
  },

  render: function(){
    var story = this.state.story;
    var contributions = story.get('contributions');
    return(
      <AppWrapper>
        <AppHeaderMain />
        <ContainerRow>
          <div>
            <h1>{story.get('title')}</h1>
            <div>
              {contributions.map(function(contribution){
                return(
                  <p key={contribution.get('objectId')}>
                    {contribution.get('content')}
                  </p>
                );
              })}
            </div>
          </div>
        </ContainerRow>
      </AppWrapper>
    );
  }

});

module.exports = {
  StoryReadContainer: StoryReadContainer
};
