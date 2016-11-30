var $ = require('jquery');
var Backbone = require('backbone');
var router = require('../router');
// parse layer
var ParseModel = require('./parseSetup').ParseModel;
var ParseCollection = require('./parseSetup').ParseCollection;

// file uploads
var FileModel = require('./file').FileModel;

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
  
  // defaults: {
  //   avatar: {
  //     url: 'http://mt-parse-server.herokuapp.com/files/mtparseserver/0c9f43751c0ab5df0326b1922755dd60_default.png"'
  //   }
  // },

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
  },

  updateAvatar: function(file, callback){
    var img = new FileModel();
  
    // save to file endpoint
    img.prepare(file)
      .save().then(resp => {
        console.log(resp);
        var newPhotoUrl = resp.url
        , newPhotoName = resp.name;
        // now that the image has been saved,
        // set the file pointer on the user profile
        this.setFile('avatar', newPhotoName, newPhotoUrl)
          .save().then(() => {

            localStorage.setItem('user', JSON.stringify(this.toJSON()));

            callback(this);
          });
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

    user.fetch({
      error: function(response, xhr){
        var errorMsg = JSON.parse(xhr.responseText);
        console.log('msg', errorMsg.error);
        callback(user,errorMsg);
      }
    }).then(function(response){
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
    var user = new User()
    , defaultPic = '0c9f43751c0ab5df0326b1922755dd60_default.png'
    , defaultPicUrl = 'http://mt-parse-server.herokuapp.com/files/mtparseserver/' + 
                       defaultPic;
    // set up url
    user.urlRoot = function(){
      return 'https://mt-parse-server.herokuapp.com/users';
    };

    if (user.attributes.sessionToken){

      console.log('left over token...');
      delete user.attributes.sessionToken;

    }

    user
      .setFile('avatar', defaultPic, defaultPicUrl)
      .save(userCredentials)
      .then(function(response){
        
        user.auth();
        
        // somehow makes it back to the model in here
        // sending a password back to parse creates
        // a new session token and invalidates the old one
        delete user.attributes.password;

        localStorage.setItem('user', JSON.stringify(user.toJSON()));

        callback(user);
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
