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
});

var Experiment = React.createClass({
  render: function(){
    return(
      <div className="list-group">
        <h3>New Query</h3>
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
      othersStoryCollection: new StoryCollection(),
      experimentStoryCollection: new StoryCollection()
    }
  },

  componentWillMount: function(){
    this.fetchUserStories();
    this.fetchOthersStories();
    this.experimental();
  },

  fetchUserStories: function(){
    var storyCollection = this.state.userStoryCollection
    , user = User.current();
    
    storyCollection
      .parseQuery('owner', user.get('objectId'), "_User")
      .also('include', 'owner.alias')
      .fetch()
      .then(response => {
        // console.log(response.results);
        this.setState({userStoryCollection: storyCollection});
      });
  
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
        this.setState({othersStoryCollection: storyCollection});
      });

  },

  experimental: function(){
    var storyCollection = this.state.experimentStoryCollection
    , user = User.current();

    storyCollection
      .query('where', 'owner')
        // .field('owner')
        .meets('objectId', user.get('objectId'))
        .ofClass('_User')
        .ofType('Pointer')
        .endQuery()
      .fetch()
      .then(response => {
        console.log(response.results)
          this.setState({experimentStoryCollection: storyCollection});
      });
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

            <Experiment stories={this.state.experimentStoryCollection}/>

          </div>
        </ContainerRow>
      </AppWrapper>
    );
  }
});

module.exports = {
  HomeContainer: HomeContainer
}


  // experimental ideas & stuff:
  // .parseQuery('where', 'owner', user.get('objectId'))

  // .query('where', 'owner') // start the query
  // .meets('objectId', user.get('objectId') // set field contraints
  // .ofClass('_User') // set the class
  // .ofType('Pointer') // the the data type
  // .also('include', 'owner.alias') // also add any other information you'd like
  // .fetch()

  // parse $inQuery example
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