var React = require('react');

// models
var User = require('../models/user').User;
var StoryCollection = require('../models/story').StoryCollection;

// layouts
var AppWrapper = require('./layouts/general.jsx').AppWrapper;
var ContainerRow = require('./layouts/general.jsx').ContainerRow;
var AppHeaderMain = require('./layouts/general.jsx').AppHeaderMain;



var StoriesList = React.createClass({
  render: function(){
    return(
      <div className="list-group">
        {this.props.stories.map(function(story){
          return(
            <a href={'#stories/' + story.get('objectId') + '/'} key={story.get('objectId')} className="list-group-item">{story.get('title')}</a>
          )
        })}
      </div>
    );
  }
});


var HomeContainer = React.createClass({
  
  getInitialState: function(){
    return {
      storyCollection: new StoryCollection()
    }
  },

  componentWillMount: function(){
    var storyCollection = this.state.storyCollection;
    
    storyCollection.fetch().then(response => {
      this.setState({storyCollection: storyCollection});
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
            <StoriesList stories={this.state.storyCollection}/>
          </div>
        </ContainerRow>
      </AppWrapper>
    );
  }
});

module.exports = {
  HomeContainer: HomeContainer
}
