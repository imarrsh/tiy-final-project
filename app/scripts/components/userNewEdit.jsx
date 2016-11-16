var React = require('react');

var User = require('../models/user').User;

// layouts
var AppWrapper = require('./layouts/general.jsx').AppWrapper;
var ContainerRow = require('./layouts/general.jsx').ContainerRow;
var AppHeaderMain = require('./layouts/general.jsx').AppHeaderMain;

var UserProfileImage = React.createClass({
  
  render: function(){
    var user = this.props.user;
    return(
      <figure className="user-profile-avatar">
        <div className="user-avatar">
          <img src={user.avatar || "http://placehold.it/150x150"} 
            alt={user.alias || 'Profile Picture'} />
              <input type="file" name="profileImg" />
        </div>
      </figure>
    );
  }

});

var UserData = React.createClass({
  render: function(){
    var user = this.props.user;
    return(
      <div className="form-group">
        <input onChange={this.props.onChange} type="text" name="alias" 
          className="form-control" value={user.alias} placeholder="Set an alias" />
        <input onChange={this.props.onChange} type="text" name="firstName" 
          className="form-control" value={user.firstName} placeholder="First Name" />
        <input onChange={this.props.onChange} type="text" name="lastName" 
          className="form-control" value={user.lastName} placeholder="Last Name" />
        <input onChange={this.props.onChange} type="text" name="email" 
          className="form-control" value={user.email} placeholder="Email" />
      </div>
    )
  }

});

var UserEditProfileContainer = React.createClass({
  
  getInitialState: function (){
    return{
      user: User.current()
    }
  },

  handleChange: function (e){
    var user = this.state.user;
    user.set(e.target.name, e.target.value);

    this.setState(user);
  },

  handleSubmit: function (e){
    e.preventDefault();
    var user = this.state.user;

    user.updateProfile(() => {
      this.props.router
        .navigate('/user/' + user.get('objectId') + '/', { trigger: true });
    });

  },

  handleCancel: function(e){
    e.preventDefault();
    window.history.back(); // just go back!
  },

  render: function (){
    var user = this.state.user.toJSON();
    return(
      <AppWrapper>
        <ContainerRow>
          <AppHeaderMain />
          <div>
            <form onSubmit={this.handleSubmit} >

              <UserProfileImage user={user} />

              <UserData user={user} onChange={this.handleChange}/>

              <input type="submit" value="Save" className="btn btn-primary" />
              <button onClick={this.handleCancel} className="btn btn-default">Cancel</button>

            </form>
          </div>
        </ContainerRow>
      </AppWrapper>
    );
  }
});

module.exports= {
  UserEditProfileContainer: UserEditProfileContainer
};
