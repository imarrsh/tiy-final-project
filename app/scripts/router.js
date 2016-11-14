var Backbone = require('backbone');

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'login/': 'login'
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
