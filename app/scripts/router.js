var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var LoginContainer = require('./components/login.jsx').LoginContainer;
var StoryCreateComponent = require('./components/storyNewEdit.jsx').StoryCreateComponent;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index', // home screen/dashboard view
    'login/': 'login', // login/signup view - user sees this screen if not logged in
    // user routes
    'user/:id/': 'userDetail', // user profile view
    'user/:id/edit/': 'userNewEdit', // user profile new/edit view
    // story routes
    'stories/': 'storiesView', // viewing all recent stories
    'stories/new/': 'storyNewEdit', // adding a new story
    'stories/:id/': 'storyView', // viewing/reading one storyView
    'stories/:id/edit/': 'storyNewEdit', // editing a story - if not concrete yet.
    'stories/:id/contribute/': 'storyContribute', // contributing to stories
    'stories/:id/contribute/:id/': 'storyContribute' // contributing to stories
  },
  initialize: function(){},

  index: function(){
    console.log('index route');
  },

  login: function(){
    console.log('login route');

    ReactDOM.render(
      React.createElement(LoginContainer),
      document.getElementById('app')
    );
  },

  storyNewEdit: function () {

    ReactDOM.render(
      React.createElement(StoryCreateComponent),
      document.getElementById('app')
    );
  }

});

var router = new AppRouter();

module.exports = {
  router: router
};
