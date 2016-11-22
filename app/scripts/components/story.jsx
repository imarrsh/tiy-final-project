var React = require('react');

// models
var User = require('../models/user').User;
var Story = require('../models/story').Story;
// var ContributionCollection = require('../models/contribution').ContributionCollection;
// var StoryCollection = require('../models/story').StoryCollection;

var StoryFormContainer = require('./storyForm.jsx').StoryFormContainer
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

var StoryFooter = React.createClass({
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
    // console.warn(contributions)
    return(
      <div>
        {contributions.map(function(contribution){
          // console.log(contribution)
          return(
            <section className="contribution" key={contribution.get('objectId')}>
              <Row>
                <div className="col-sm-9">
                  <article>
                    <p>
                      {contribution.get('content')}
                    </p>
                  </article>
                </div>
                <div className="col-sm-3">
                  <aside>
                    <img className="avatar" src={contribution.get('contributor').avatar.url} 
                      alt={contribution.get('contributor').alias}/>
                    by {contribution.get('contributor').alias}
                  </aside>
                </div>
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
      story: new Story(),
      isContributing: false
    }
  },

  componentWillMount: function(){
    this.getStory().getContributions();
  },

  componentWillReciveProps: function(){
    this.getStory().getContributions();
  },

  componentWillUnmount: function(){
    // console.warn(this.state.story);
    // console.warn(this.state.story.get('contributions'));
    // delete this.state.story;
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

    contributions
      .parseQuery('story', story.get('objectId'), 'Story')
      .also('include', 'contributor')
      .fetch()
      .then((response) => {
        // console.log(response.results)
        story.set('contributions', contributions);
        this.setState({story: story});
      });

    return this;
  },

  handleContributing: function(){
    // console.log('handle add contribution', this.state.isContributing);
    this.setState({isContributing: !this.state.isContributing});
  },

  render: function(){
    var story = this.state.story;
    var contributions = story.get('contributions');
    var isContributing = this.state.isContributing;
    return(
      <AppWrapper>
        <AppHeaderMain />
        <ContainerRow>
          <div className="col-sm-10 col-sm-offset-1">
            <div className="story-container">
              <h1>{story.get('title')}</h1>
              
              <StoryContributuionList contributions={contributions} />

              <StoryFooter contributions={contributions} />

              <button onClick={this.handleContributing} 
                className="btn btn-primary">
                Contribute
              </button>

              {isContributing ? <StoryFormContainer thisStory={story.get('objectId')}/> : null}
            
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
