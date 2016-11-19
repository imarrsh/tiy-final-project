var React = require('react');

var User = require('../models/user').User;

var AppWrapper = require('./layouts/general.jsx').AppWrapper;
var ContainerRow = require('./layouts/general.jsx').ContainerRow;
var AppHeaderMain = require('./layouts/general.jsx').AppHeaderMain;

var UserDetailContainer = React.createClass({
  
  getInitialState: function(){
    return {
      user: User.current()
    }
  },

  componentWillMount: function () {
    this.getUserId()
  },

  componentWillReceiveProps: function(){
    this.getUserId();
  },

  getUserId: function(){
    var user = this.state.user; 

    var userId = this.props.userId;

    // if not editing a recipe then return now
    if (!userId){
      return;
    }

    user.set('objectId', userId);
    user.fetch().then(() => this.setState({user: user}))

  },

  render: function () {
    var user = User.current();
    console.log(user.toJSON());
    return(
      <AppWrapper>
        <ContainerRow>
          <AppHeaderMain />
          <p>User Detail for {user.get('firstName')}</p>

          <figure className="user-profile-avatar">
            <div className="user-avatar">
              <img src={user.get('profileImage').url || "http://placehold.it/250x250"} 
                alt={user.get('alias') || 'Profile Picture'} />
            </div>
            <figcaption>
              <h2 className="user-alias">{user.get('alias') || 'Alias not set'}</h2>
            </figcaption>
          </figure>

          <div className="user-profile-details">
            <div className="full-name">
              {user.get('firstName') + ' ' + user.get('lastName')}
            </div>
            <div className="email">
              {user.get('email')}
            </div>
          </div>

          <div className="user-profile-controls">
            <a href={'#user/' + user.get('objectId') + '/edit/'} 
              className="btn btn-primary">
                Edit Profile
            </a>
          </div>

        </ContainerRow>
      </AppWrapper>
    );
  }
});

module.exports= {
  UserDetailContainer: UserDetailContainer
};
