var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var parseHeaders = require('./parseUtils').parseHeaders;

var User = require('./models/user').User;

var HomeContainer = require('./components/home.jsx').HomeContainer;
var LoginContainer = require('./components/login.jsx').LoginContainer;
var StoryCreateContainer = require('./components/storyNewEdit.jsx').StoryCreateContainer;
var StoryReadContainer = require('./components/story.jsx').StoryReadContainer;
var UserDetailContainer = require('./components/userDetail.jsx').UserDetailContainer;
var UserEditProfileContainer = require('./components/userNewEdit.jsx').UserEditProfileContainer;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index', // marketing page
    'dashboard/': 'dashboard', // home screen/dashboard view
    // user routes
    'user/:id/edit/': 'userNewEdit', // user profile new/edit view
    'user/:id/': 'userDetail', // user profile view
    // story routes
    'stories/': 'storiesView', // viewing all recent stories
    'stories/new/': 'storyNewEdit', // adding a new story
    'stories/:id/': 'storyView', // viewing/reading one storyView
    'stories/:id/edit/': 'storyNewEdit', // editing a story - if not concrete yet.
    'stories/:id/contribute/': 'storyContribute', // contributing to stories
    'stories/:id/contribute/:id/': 'storyContribute', // contributing to stories
    'logout/': 'logout', // logout - redirect to login
    'login/': 'login', // login/signup view - user sees this screen if not logged in
  },

  // checkUser: function(){

  //   var user = User.current();

  //   if (!user.get('sessionToken')){
  //     console.log('token is', user.get('sessionToken'));
  //     Backbone.history.navigate('login/', {trigger: true});
  //     // window.location.assign('#login/'); // vanilla js
  //   }

  // },

  gotoLogin: function(){
    this.navigate('login/', {trigger: true});
    this.login();
  },

  execute: function(callback, args, name){

    var user = User.current();
    var token = user.get('sessionToken');

    if (!token){
      console.log('token is', token);
      this.gotoLogin();
      return false;
    }

    if (callback) {
      callback.apply(this, args);
    }

  },

  initialize: function(){
    var user = User.current() || {}; // fill user up with user model

    // set headers for Parse
    parseHeaders('mtparseserver', 'thompson1', user.get('sessionToken'));

  },

  index: function(){

    // console.log('index route');
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

    // this.navigate('login/', {trigger: true});

    var self = this;
    User.logOut(function(){
      self.navigate('login/', {trigger: true});
    });
  },

  userDetail: function (userId) {
    ReactDOM.render(
      React.createElement(UserDetailContainer, { router: this, userId: userId }),
      document.getElementById('app')
    );
  },

  userNewEdit: function(userId){

    ReactDOM.render(
      React.createElement(UserEditProfileContainer, { router: this }),
      document.getElementById('app')
    );
  },

  storyNewEdit: function () {

    ReactDOM.render(
      React.createElement(StoryCreateContainer, { router: this }),
      document.getElementById('app')
    );
  },

  storyView: function(storyId){

    ReactDOM.render(
      React.createElement(StoryReadContainer, { router: this, storyId: storyId }),
      document.getElementById('app')
    );
  }

});

var router = new AppRouter();

module.exports = {
  router: router
};
