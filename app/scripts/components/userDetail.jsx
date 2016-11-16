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
    return(
      <AppWrapper>
        <ContainerRow>
          <AppHeaderMain userId={user.get('objectId')}/>

          <div>
            <h2>User Detail for {user.get('firstName')}</h2>
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
