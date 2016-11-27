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


var StoryContributuionListItem = React.createClass({
  
  getInitialState: function(){
    return {
      contribution: this.props.contribution,
      upvotes: 0,
      downvotes: 0
    }
  },

  componentWillReceiveProps(nextProps){
    // console.log(nextProps)
  },

  componentWillMount: function(){
    this.setState({
      upvotes: this.state.contribution.get('upvotes')
    });

    this.setState({
      downvotes: this.state.contribution.get('downvotes')
    });
  },

  // this could be beter - its thanksgiving and im tired
  handleVote: function(bool, contribution){
  
    var up = this.state.upvotes
    , down = this.state.downvotes;

    // set some ui state
    if (bool) {
      up++;
      this.setState({upvotes: up});  
    } else {
      down++;
      this.setState({downvotes: down});
    }
    
    // hand off to model logic
    this.props.handleVote(bool, contribution);
  },

  render: function(){
    var contribution = this.state.contribution
    , contributor = contribution.get('contributor');

    return(
      <div className="panel panel-default">
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
                  <a href={'#user/' + contribution.get('contributor').objectId + '/'}
                    className="story-segment-profile">
                    <div>
                      <img className="avatar"
                        src={contributor.avatar ? contributor.avatar.url : null} 
                        alt={contributor.alias}
                      />
                    </div>
                    by {contributor.alias}
                  </a>
                  <div className="btn-toolbar">
                    <button 
                      onClick={() => this.props.deleteSegment(contribution)}
                      className="btn btn-danger btn-xs">
                      <i className="glyphicon glyphicon-remove" />
                    </button>

                    <button className="btn btn-success btn-xs">
                      <i className="glyphicon glyphicon-edit" />
                    </button>

                    <button 
                      onClick={() => this.handleVote(true, contribution)}
                      className="btn btn-default btn-xs">
                      <i className="glyphicon glyphicon-arrow-up" /> 
                        {this.state.upvotes || 0 }
                    </button>

                    <button 
                      onClick={() => this.handleVote(false, contribution)}
                      className="btn btn-default btn-xs">
                      <i className="glyphicon glyphicon-arrow-down" /> 
                        {this.state.downvotes || 0}
                    </button>

                  </div>
                </aside>
              </div>
            </Row>
          </section>
        </div>
      </div>
    );
  }

});


var StoryContributuionList = React.createClass({
  getInitialState: function(){
    return {
      contributions: this.props.contributions
    }
  },

  render: function(){
    var self = this;
    var contributions = this.state.contributions;
    // console.warn(contributions)
    return(
      <div className="panel-body">
        {contributions.map(function(contribution){
          // console.log(contribution)
          return( 
            <StoryContributuionListItem 
              key={contribution.get('objectId')}
              contribution={contribution}
              handleVote={self.props.handleVote}
              deleteSegment={self.props.deleteSegment}
            />

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

  componentWillReciveProps: function(nextProps){
    console.log('componentWillReciveProps', nextProps);
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
        story.set('contributions', contributions);
        this.setState({story: story});
      });

    return this;
  },

  handleContributing: function(){
    this.setState({
      isContributing: !this.state.isContributing
    });
  },

  deleteStory: function(contribution){
    var story = this.state.story;

    story.deleteStory(() => {
      this.props.router.navigate('', {trigger: true});
    });
    
  },

  deleteSegment: function(contribution){
    // console.log('delete segment');
    contribution.deleteSegment();

    this.setState({story: this.state.story});
  },

  addContribution: function(contribution){
    console.log('adding:', contribution);
    
    var story = this.state.story
    , contributions = story.get('contributions');

    contributions.add(contribution);
    story.set('contributions', contributions);

    this.setState({story: story});
  },

  handleVote: function(vote, contribution){
    contribution.vote(vote)

    this.state.story
      .set('contributions')
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
                <button 
                  onClick={this.deleteStory}
                  className="btn btn-danger btn-xs">Delete Story
                </button>
                <button
                  className="btn btn-success btn-xs">Edit
                </button>
              </div>

              <h1>{story.get('title')}</h1>
              
              <div className="panel panel-default">
                <div className="panel-body">

                  <StoryContributuionList 
                    contributions={contributions} 
                    deleteSegment={this.deleteSegment}
                    handleVote={this.handleVote}
                  />

                </div>
                <div className="panel-footer">

                  <StoryFooter contributions={contributions} />

                </div>
              </div>

              <button onClick={this.handleContributing} 
                className="btn btn-primary">
                {(isContributing) ? 'Nevermind' : 'Contribute'}
              </button>

              {isContributing ? 
                <StoryFormContainer 
                  story={story}
                  router={this.props.router}
                  addContribution={this.addContribution}
                  handleContributing={this.handleContributing}
                /> 
                : null}
            
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
