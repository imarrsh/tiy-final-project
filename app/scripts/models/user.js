var $ = require('jquery');
var Backbone = require('backbone');
var router = require('../router');
// parse layer
var ParseModel = require('./parseSetup').ParseModel;
var ParseCollection = require('./parseSetup').ParseCollection;
// headers
var parseHeaders = require('../parseUtils').parseHeaders;

// set user model to interface with parse
var ParseUser = ParseModel.extend({

  save: function(attributes, options){

    delete this.attributes.createdAt;
    delete this.attributes.updatedAt;

    return Backbone.Model.prototype.save.apply(this, arguments);
  }

}, {
  // class methods go here, if any
});

var User = ParseUser.extend({

  urlRoot: 'https://mt-parse-server.herokuapp.com/users',

  auth: function(){
    // set headers
    parseHeaders('mtparseserver', 'thompson1', this.get('sessionToken'));
    return this;
  },

  updateProfile: function(callback){
    // do some work on the user profile
    this.auth().save().then(response => {
      localStorage.setItem('user', JSON.stringify(this.toJSON()));
      callback();
    });
  }

}, {
  // class methods
  logIn: function(userCredentials, callback){

    var user = new User();
    user.auth();

    user.urlRoot = function(){
      return 'https://mt-parse-server.herokuapp.com/login' +
        '?username=' + encodeURI(userCredentials.username) +
        '&password=' + encodeURI(userCredentials.password);
    };

    user.fetch()
      .then(function(response){

        user.set('sessionToken', response.sessionToken);
        user.set('username', response.username);
        user.set('objectId', response.objectId);

        user.auth();

        localStorage.setItem('user', JSON.stringify(user.toJSON()));

        callback(user);

      });

  },

  signUp: function(userCredentials, callback){
    // instantiate user
    var user = new User();
    // set up url
    user.urlRoot = function(){
      return 'https://mt-parse-server.herokuapp.com/users';
    };
    // call user auth
    user.auth();

    user.save(userCredentials)
      .then(function(response){
        // console.log(response);
        localStorage.setItem('user', JSON.stringify());
      });

  },

  logOut: function (callback) {
    // get the current user
    var user = new User(JSON.parse(localStorage.getItem('user')));
    // set up url
    user.urlRoot = function(){
      return 'https://mt-parse-server.herokuapp.com/logout';
    };
    user.auth();

    user.fetch({
      url: user.urlRoot(),
      // beforeSend: user.auth(),
      type: 'POST'
    }).then(response => {
      localStorage.setItem('user', JSON.stringify(response));
      callback(); // callback for a route
    });

  },

  current: function(){
    var user = new User(JSON.parse(localStorage.getItem('user')));
    // console.log(user);
    return user;

  }

});

module.exports = {
  User: User
};