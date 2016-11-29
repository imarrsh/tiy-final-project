var React = require('react');

var User = require('../models/user').User;

var AppWrapper = require('./layouts/general.jsx').AppWrapper;
var ContainerRow = require('./layouts/general.jsx').ContainerRow;
var AppHeaderMain = require('./layouts/general.jsx').AppHeaderMain;
var AppFooterMain = require('./layouts/general.jsx').AppFooterMain;

var UserDetailContainer = React.createClass({
  
  getInitialState: function(){
    return {
      user: new User()
    }
  },

  componentWillMount: function () {
    // console.log(this.state.user)
    this.getUserId()
  },

  componentWillReceiveProps: function(nextProps){
    // this.setProps({userId: nextProps.userId});
    console.log('nextprops', nextProps.userId)
    this.getUserId(nextProps);
    // this.setState({user: this.state.user});
  },

  getUserId: function(nextProps){
    var user = new User()
    , userId;
    
    nextProps ?
      userId = nextProps.userId :
      userId = this.props.userId;

    if (!userId){
      return; // bail if no user id
    }

    user.set('objectId', userId);
    user.fetch().then(() => this.setState({user: user}))

  },

  render: function () {
    var user = this.state.user
    , currentUser = User.current();

    // console.log(currentUser);
    
    return(
      <AppWrapper>
        <AppHeaderMain />
        <ContainerRow>
          <div className="col-sm-6 col-sm-offset-3">

            <div className="user-profile">
  
              <p>User Detail for {user.get('firstName')}</p>
              
              <figure className="user-profile-avatar">
                <div className="user-avatar">
                  <img src={user.get('avatar') ? user.get('avatar').url : "http://placehold.it/250x250"} 
                    alt={user.get('alias') || 'Profile Picture'} />
                </div>
                <figcaption>
                  <h2 className="user-alias">{user.get('alias') || 'Alias not set'}</h2>
                  <div className="location">
                    {user.get('location') || null}
                  </div>
                </figcaption>
              </figure>
              
              <div className="user-profile-details">
                <div className="full-name">
                  {user.get('firstName') + ' ' + user.get('lastName')}
                </div>
                <div className="email">
                  {user.get('email')}
                </div>
                <div className="bio">
                  {user.get('bio')}
                </div>
              </div>

              {(user.get('objectId') === currentUser.get('objectId')) ? 
                <div className="user-profile-controls">
                  <a href={'#user/' + user.get('objectId') + '/edit/'} 
                    className="btn btn-primary">
                      Edit Profile
                  </a>
                </div> 
              : null }

            </div>

          </div>

        </ContainerRow>

      </AppWrapper>
    );
  }
});

module.exports= {
  UserDetailContainer: UserDetailContainer
};
