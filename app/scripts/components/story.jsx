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
            <div className="panel panel-default" key={contribution.get('objectId')}>
              <div className="panel-body">
                <section className="story-segment"> 
                  <Row>
                    <div className="col-sm-9">
                      
                      <article // hopefully the input has been sanitized at some point
                        dangerouslySetInnerHTML={{
                          __html: contribution.get('content')
                        }} 
                      />  
                
                    </div>
                    <div className="col-sm-3">
                      <aside>
                        <div>
                          <img className="avatar" 
                            src={contribution.get('contributor').avatar.url} 
                            alt={contribution.get('contributor').alias}
                          />
                        </div>
                        by {contribution.get('contributor').alias}
                        <div className="btn-toolbar">
                          <button className="btn btn-danger btn-xs">X</button>
                          <button className="btn btn-success btn-xs">E</button>
                        </div>
                      </aside>
                    </div>
                  </Row>
                </section>
              </div>
            </div>
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

  handleDelete: function(){
    // console.log('handleDelete')
    // console.log(this.state.story);

    this.state.story.deleteStory(() => {
      this.props.router.navigate('', {trigger: true});
    });
    
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
              <div className="btn-toolbar">
                <button onClick={this.handleDelete}className="btn btn-danger btn-xs">Delete Story</button>
                <button className="btn btn-success btn-xs">Edit</button>
              </div>

              <h1>{story.get('title')}</h1>
              
              <div className="panel panel-default">
                <div className="panel-body">
                  <StoryContributuionList contributions={contributions} />
                </div>
                <div className="panel-footer">
                  <StoryFooter contributions={contributions} />
                </div>
              </div>
              <button onClick={this.handleContributing} 
                className="btn btn-primary">
                Contribute
              </button>

              {isContributing ? <StoryFormContainer storyId={story.get('objectId')}/> : null}
            
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
