var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index', // home screen/dashboard view
    'login/': 'login', // login/signup view - user sees this screen if not logged in
    // user routes
    // 'user/': 'user',
    'user/:id/': 'userDetail', // user profile view
    'user/:id/edit': 'userNewEdit', // user profile new/edit view
    // story routes
    'stories/': 'storiesView', // viewing all recent stories
    'stories/new': 'storyNewEdit', // adding a new story
    'stories/:id': 'storyView', // viewing/reading one storyView
    'stories/:id/edit': 'storyNewEdit', // editing a story - if not concrete yet.
    'stories/:id/contribute': 'storyContribute', // contributing to stories
  },
  initialize: function(){},
  index: function(){
    console.log('index route');
  }

});

var router = new AppRouter();

module.exports = {
  router: router
};
