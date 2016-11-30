var _ = require('underscore');
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

var NuModal = require('./modal.jsx').NuModal;

// ############################
// Story Segment List Item
// ############################

var StoryContributuionListItem = React.createClass({
  
  getInitialState: function(){
    return {
      contribution: this.props.contribution,
      upvotes: 0,
      downvotes: 0,
      isEditing: false
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

  editSegment: function(){
    this.setState({isEditing: !this.state.isEditing});
  },

  toggleEditorVisibility: function(){
    this.setState({isEditing: !this.state.isEditing});
  },

  render: function(){
    var contribution = this.state.contribution
    , contributor    = contribution.get('contributor')
    , currentUserId  = this.props.currentUser.get('objectId');

    return(

      <section className="story-segment"> 
            
        <article className="panel panel-custom"> 

        {(this.state.isEditing) ?
          <StoryFormContainer 
            story={this.props.story}
            router={this.props.router}
            addContribution={this.addContribution}
            updateContribution={this.updateContribution}
            content={contribution.get('content')}
            isAnEdit={this.state.isEditing}
            contribution={contribution}
            toggleEditorVisibility={this.toggleEditorVisibility}
          />
         : // hopefully the input has been sanitized at some point
          <div className="panel-body segment-content"
            dangerouslySetInnerHTML={{
              __html: contribution.get('content')
            }} 
          /> }

          <div className="panel-footer panel-footer-mini clearfix">
            <div className="btn-toolbar btn-toolbar-inline">
              <div className="btn-group">
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

            </div>

            <div className="contributor-profile">
              <a href={'#user/' + contributor.objectId + '/'}
                className="story-segment-profile">
              
                  <img className="avatar"
                    src={contributor.avatar ? contributor.avatar.url : null} 
                    alt={contributor.alias}
                  />
                <span className="alias">{contributor.alias}</span>
              </a>
            </div>


            <div className="pull-right">
              
              {(contributor.objectId === currentUserId) ?
                <div className="btn-toolbar btn-toolbar-inline">

                  <button
                    onClick={this.editSegment}
                    className="btn btn-default btn-xs btn-green"
                  >
                    <i className="glyphicon glyphicon-edit" /> Edit
                  </button>

                  <NuModal
                    action={() => this.props.deleteSegment(contribution)}
                    context={'Contribution'}
                    icon={<i className="glyphicon glyphicon-remove" />}
                    buttonText={'Delete'}
                  />
                  {/*<button 
                      onClick={() => this.props.deleteSegment(contribution)}
                      className="btn btn-danger btn-xs"
                    >
                    <i className="glyphicon glyphicon-remove" />
                  </button>*/}
                                          
                </div>

              : null }

            </div>

          </div>

        </article>
    
      </section>

    );
  }

});

// ############################
// Story Segments Container
// ############################

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
      <div>
        {contributions.map(contribution => {
          // console.log(contribution)
          return( 
            <StoryContributuionListItem 
              key={contribution.get('objectId')}
              story={this.props.story}
              contribution={contribution}
              handleVote={self.props.handleVote}
              deleteSegment={self.props.deleteSegment}
              currentUser={this.props.currentUser}
            />

          );
        })}

      </div>
    );
  } 
});

// ########################################################
// Side Container: Story owner and contributors
// ########################################################

var StoryAside = React.createClass({
  
  uniqueContributors: function(){
    var contributions = this.props.contributions;

    var contributors = contributions.map(contribution => {
      return contribution.get('contributor');
    });

    var result = _.uniq(contributors, function(contributor){
      return contributor.objectId;
    });

    return result;

  },

  render: function(){
    var story = this.props.story
    , owner = story.get('owner')
    , contributors = this.uniqueContributors();
    return(
      <div className="panel panel-default">
        <div className="panel-body">

          <aside className="story-aside">
            <h4>Story sparked by:</h4>

            <div className="owner-detail">
              <a href={'#user/' + owner.objectId + '/'}>
                <div className="user-avatar user-avatar-md">
                  <img className="avatar"
                    src={owner.avatar ? owner.avatar.url : null} 
                    alt={owner.alias}
                  />
                </div>
                <div className="owner-alias">
                  {owner.alias}
                </div>
              </a>
            </div>

            <hr />

            <h4>Contributors</h4>

            <div className="list-group">

              {contributors
                .map(contributor => {
                  return(
                    <a
                      href={'#user/' + contributor.objectId + '/'} 
                      className="list-group-item" 
                      key={contributor.objectId}
                    >
                      <img className="user-avatar user-avatar-xs"
                        src={contributor.avatar ?
                          contributor.avatar.url :
                          null } 
                        alt={contributor.alias}
                      /> 
                       {' ' + contributor.alias} 
                    </a>
                  );
                })}

            </div>

          </aside>

        </div>
      </div>
    )
  }
});

// ############################
// Main Container
// ############################

var StoryReadContainer = React.createClass({
  
  getInitialState: function(){
    return {
      story: new Story(),
      isContributing: false,
      currentUser: User.current(),
      isEditingTitle: false
    }
  },

  componentWillMount: function(){
    this.getStory().getContributions();
  },

  componentWillReciveProps: function(nextProps){
    // console.log('componentWillReciveProps', nextProps);
    this.getStory().getContributions();
  },

  componentWillUnmount: function(){
    
    // still has issues, somtimes...
    var story = this.state.story
    , contributions = story.get('contributions');
    
    // clear the collection
    // debugger;
    contributions.reset();

    // clear the queries
    delete contributions.clause;
    delete contributions.extra;

    // set it back to the story model
    story.set('contributions', contributions);

    // set the state
    this.setState({story: story});
    
  },

  getStory: function(){
    var story = this.state.story;
    var storyId = this.props.storyId;

    if (!storyId){
      return;
    }

    story
      .set('objectId', storyId);

    story
      .fetch({data: {'include': 'owner'}})
      .then(() => this.setState({story: story}))

    return this;
  },

  getContributions: function(){
    var story = this.state.story
    , contributions = story.get('contributions');

    contributions
      .parseQuery('story', story.get('objectId'), 'Story')
      .also('include', 'contributor')
      .also('order', 'createdAt')
      .fetch()
      .then((response) => {
        story.set('contributions', contributions);
        this.setState({story: story});
      });

    return this;
  },

  toggleEditorVisibility: function(){
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
    // console.log('adding:', contribution);
    
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

  handleTitleChange: function(e){
    var story = this.state.story;
    story.set('title', e.target.value);

    this.setState({story: story});
  },

  updateTitle: function(e){
    e.preventDefault();
    var story = this.state.story
    , title = story.get('title');

    // console.log(story.get('contributions'))

    story.updateTitle(title, () => {
      this.setState({
        story: story
      });
      
      this.setState({
        isEditingTitle: !this.state.isEditingTitle
      })
    });
  },

  render: function(){
    var story = this.state.story
    , contributions = story.get('contributions')
    , isContributing = this.state.isContributing
    , currentUserId = this.state.currentUser.get('objectId');

    // console.log(story);
    
    return(
      <AppWrapper>
        <AppHeaderMain />
        <ContainerRow>
          <div className="story-container">
            <div className="col-sm-12">
              {// display delete/edit toolbar if current user is owner
                (currentUserId === story.get('owner').objectId) ?
                <div className="btn-toolbar">
                  <NuModal
                    buttonText={'Delete Story'}
                    action={this.deleteStory}
                    context={'Story'}
                  />
                  <button
                    onClick={() => this.setState({
                      isEditingTitle: !this.state.isEditingTitle
                    })}
                    className="btn btn-default btn-xs btn-green">Edit Title
                  </button>
                </div>
              : null }

              <div className="row">

                <div className="col-sm-9">
                  {(this.state.isEditingTitle) ?

                    <div className="story-title-edit">
                      <div className="form-inline">

                        <form onSubmit={this.updateTitle}>
                          <input
                            onChange={this.handleTitleChange}
                            className="form-control" 
                            type="text" 
                            value={story.get('title')} 
                          />
                          <input
                            type="submit"
                            value="Save"
                            className="btn btn-success"
                          />
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              this.setState({
                                isEditingTitle: !this.state.isEditingTitle
                              });
                            }}
                            className="btn btn-default"
                          >
                            Cancel
                          </button>

                        </form>
                      </div>
                    </div>
                      
                    : <h1 className="storyhead">
                        {story.get('title')}
                      </h1>
                  }

                  <h4 className="subhead">{
                      story.get('contributions').length
                    } contributions
                  </h4>
                  <StoryContributuionList 
                    story={story}
                    contributions={contributions} 
                    deleteSegment={this.deleteSegment}
                    handleVote={this.handleVote}
                    currentUser={this.state.currentUser}
                  />

                  <button onClick={this.toggleEditorVisibility} 
                    className="btn btn-primary">
                    {(isContributing) ? 'Nevermind' : 'Contribute'}
                  </button>

                  {// display editor component if contributing 
                    isContributing ? 
                    <StoryFormContainer 
                      story={story}
                      router={this.props.router}
                      addContribution={this.addContribution}
                      toggleEditorVisibility={this.toggleEditorVisibility}
                    /> 
                    : null}

                </div>
                <div className="col-sm-3"> 
                  <StoryAside 
                    story={story}
                    contributions={contributions}
                  />
                </div>

              </div>

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
