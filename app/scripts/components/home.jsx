var React = require('react');

// models
var User = require('../models/user').User;
var StoryCollection = require('../models/story').StoryCollection;

// layouts
var AppWrapper = require('./layouts/general.jsx').AppWrapper;
var ContainerRow = require('./layouts/general.jsx').ContainerRow;
var AppHeaderMain = require('./layouts/general.jsx').AppHeaderMain;



var UserStoryList = React.createClass({
  render: function(){
    return(
      <div className="list-group">
        <h3>Your Stories</h3>
        {this.props.stories.map(function(story){
          return(
            <a href={'#stories/' + story.get('objectId') + '/'} 
              key={story.get('objectId')} className="list-group-item">
              {story.get('title')}
            </a>
          )
        })}
      </div>
    );
  }
});

var OthersStoryList = React.createClass({
  render: function(){
    return(
      <div className="list-group">
        <h3>Other Stories</h3>
        {this.props.stories.map(function(story){
          return(
            <a href={'#stories/' + story.get('objectId') + '/'} 
              key={story.get('objectId')} className="list-group-item">
              {story.get('title')}
            </a>
          )
        })}
      </div>
    );
  }
})


var HomeContainer = React.createClass({
  
  getInitialState: function(){
    return {
      userStoryCollection: new StoryCollection(),
      othersStoryCollection: new StoryCollection()
    }
  },

  componentWillMount: function(){
    this.fetchUserStories();
    this.fetchOthersStories();
  },

  fetchUserStories: function(){
    var storyCollection = this.state.userStoryCollection
    , user = User.current();
    
    storyCollection
      .parseQuery('owner', user.get('objectId'), "_User")
      .fetch()
      .then(response => {
        this.setState({userStoryCollection: storyCollection});
      });
      // .parseQuery('where', 'owner', '!equals', user.get('objectId'))
  },

  fetchOthersStories: function(){
    var storyCollection = this.state.othersStoryCollection
    , user = User.current();
    
    storyCollection
      .cQuery('where', 'owner', {
        $notInQuery: {
          where: {
            objectId: user.get('objectId')
          },
          className: "_User"
        }
      })
      .fetch()
      .then(response => {
        console.log(response.results);
        this.setState({othersStoryCollection: storyCollection});
        console.log(this.state)
      });
      // .parseQuery('where', 'owner', user.get('objectId'))

  // 'where={
  //   "post": {
  //     "$inQuery":{
  //       "where":{
  //         "image":{
  //           "$exists":true
  //         }
  //       },
  //       "className":"Post"
  //     }
  //   }
  // }'

  },

  render: function(){
    var currentUser = User.current();
    var email = currentUser.get('username');
    var userId = currentUser.get('objectId');
    return(
      <AppWrapper>
        <AppHeaderMain userId={userId} active={this.props.active} />
        <ContainerRow>
          <div>
            <h2>Hi {currentUser.get('firstName')}!</h2>
          </div>
          <div className="my-stories">
            <UserStoryList stories={this.state.userStoryCollection}/>
            <OthersStoryList stories={this.state.othersStoryCollection}/>
          </div>
        </ContainerRow>
      </AppWrapper>
    );
  }
});

module.exports = {
  HomeContainer: HomeContainer
}
