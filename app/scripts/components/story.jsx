var React = require('react');

// models
var User = require('../models/user').User;
var Story = require('../models/story').Story;
// var ContributionCollection = require('../models/contribution').ContributionCollection;
// var StoryCollection = require('../models/story').StoryCollection;

// layouts
var layout = require('./layouts/general.jsx');
var AppWrapper = layout.AppWrapper;
var ContainerRow = layout.ContainerRow;
var AppHeaderMain = layout.AppHeaderMain;
var Row = layout.Row;

var ContributorListItem = React.createClass({
  render: function(){
    var contributor = this.props.contributor;
    var avatar = contributor.get('avatar') ? 
      contributor.get('avatar').url  : 'https://placehold.it/100';

    return(
      <span>
        <img src={avatar} 
          alt={contributor.get('alias')}
        /> 
        {contributor.get('alias')} 
      </span>
    );
  }
});

var Footer = React.createClass({
  render: function(){
    return(
      <footer className="story-footer">
        {this.props.contributions.map(function(contribution){
          var contributor = new User(contribution.get('contributor'));
          return(
            <ContributorListItem contributor={contributor} 
              key={contributor.get('objectId') + contribution.get('objectId')}
            />
          );
        })}
      </footer>
    );
  }
});

var StoryContributuionList = React.createClass({
  render: function(){
    var contributions = this.props.contributions;
    return(
      <div>
        {contributions.map(function(contribution){
          console.log(contribution)
          return(
            <section className="contribution" key={contribution.get('objectId')}>
              <Row>
                <article>
                  <p>
                    {contribution.get('content')}
                  </p>
                </article>
                <aside>
                  Contributed by {contribution.get('contributor').alias}
                </aside>
              </Row>
            </section>
          );
        })}
      </div>
    );
  } 
});

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
      .parseQuery('story', story.get('objectId'), 'Story')
      .also('include', 'contributor')
      .fetch()
      .then((response) => {
        // console.log(response.results)
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
          <div className="col-sm-10 col-sm-offset-1">
            <div className="story-container">
              <h1>{story.get('title')}</h1>
              
              <StoryContributuionList contributions={contributions} />

              <Footer contributions={contributions} />

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
