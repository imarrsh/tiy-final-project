var React = require('react');

var User = require('../models/user').User;

// layouts
var AppWrapper = require('./layouts/general.jsx').AppWrapper;
var ContainerRow = require('./layouts/general.jsx').ContainerRow;
var AppHeaderMain = require('./layouts/general.jsx').AppHeaderMain;

var UserProfileImageForm = React.createClass({
  getInitialState: function(){
    return {
      profileImg: ''
    }
  },

  handleImageClick: function(e){
    // console.log(e.target);
    this.refs.profileImg.click();
  },

  handleChange: function(e){
    // get the file that was just added
    var file = e.target.files[0];
    // send up to parent component 
    this.props.imageUpdate(file);
  },

  render: function(){
    var user = this.props.user;
    return(
      <figure className="user-profile-avatar">
        <div className="user-avatar" onClick={this.handleImageClick}>
          <div className="edit">
            <img src={user.avatar ? user.avatar.url : "http://placehold.it/150x150"} 
              alt={user.alias || 'Profile Picture'} />
          </div>
        </div>

        <form encType="multipart/form-data">
          <input onChange={this.handleChange} ref="profileImg" 
            type="file" name="profileImg" />
        </form>

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
        <input onChange={this.props.onChange} type="text" name="location" 
          className="form-control" value={user.location} placeholder="Location" />
        <textarea onChange={this.props.onChange} value={user.bio} name="bio" id="bio" 
          cols="30" rows="5" className="form-control"
          placeholder="Tell others a bit about yourself!">
        </textarea>
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

  // image upload handler
  handleImageAutoUpload: function(file){
    var user = this.state.user;
    // pass file to user model method
    user.updateAvatar(file);
  },

  render: function (){
    var user = this.state.user.toJSON();
    return(
      <AppWrapper>
        <AppHeaderMain />
        <ContainerRow>
          <div>

            <UserProfileImageForm user={user} imageUpdate={this.handleImageAutoUpload}/>

            <form onSubmit={this.handleSubmit} >

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
