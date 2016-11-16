var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var User = require('./models/user').User;

var HomeContainer = require('./components/home.jsx').HomeContainer;
var LoginContainer = require('./components/login.jsx').LoginContainer;
var StoryCreateContainer = require('./components/storyNewEdit.jsx').StoryCreateContainer;
var UserDetailContainer = require('./components/userDetail.jsx').UserDetailContainer;
var UserEditProfileContainer = require('./components/userNewEdit.jsx').UserEditProfileContainer;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index', // home screen/dashboard view
    'login/': 'login', // login/signup view - user sees this screen if not logged in
    'logout/': 'logout', // logout - redirect to login
    // user routes
    'user/:id/edit/': 'userNewEdit', // user profile new/edit view
    'user/:id/': 'userDetail', // user profile view
    // story routes
    'stories/': 'storiesView', // viewing all recent stories
    'stories/new/': 'storyNewEdit', // adding a new story
    'stories/:id/': 'storyView', // viewing/reading one storyView
    'stories/:id/edit/': 'storyNewEdit', // editing a story - if not concrete yet.
    'stories/:id/contribute/': 'storyContribute', // contributing to stories
    'stories/:id/contribute/:id/': 'storyContribute' // contributing to stories
  },

  initialize: function(){
  },

  index: function(){
    console.log('index route');
    ReactDOM.render(
      React.createElement(HomeContainer, { router: this }),
      document.getElementById('app')
    );
  },

  login: function(){
    console.log('login route');

    ReactDOM.render(
      React.createElement(LoginContainer, { router: this }),
      document.getElementById('app')
    );
  },

  logout: function(){
    console.log('logout route');
    User.logOut(function(){
      this.navigate('login/', {trigger: true});
    }.bind(this));
  },

  userDetail: function (userId) {
    ReactDOM.render(
      React.createElement(UserDetailContainer, { router: this }),
      document.getElementById('app')
    );
  },

  userNewEdit: function(userId){

    ReactDOM.render(
      React.createElement(UserEditProfileContainer),
      document.getElementById('app')
    );
  },

  storyNewEdit: function () {

    ReactDOM.render(
      React.createElement(StoryCreateContainer),
      document.getElementById('app')
    );
  }

});

var router = new AppRouter();

module.exports = {
  router: router
};
