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

        <form encType="multipart/form-data" id="user-profile-img-form">
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
        
        <input 
          onChange={this.props.onChange} 
          value={user.alias} 
          type="text" 
          name="alias" 
          className="form-control"  
          placeholder="Set an alias" 
        />

        <div className="form-group">
          <div className="row">
            
            <div className="col-sm-6">
              <label htmlFor="firstName">
                First Name 
              </label>
              <input 
                onChange={this.props.onChange} 
                value={user.firstName}
                type="text"
                id="firstName" name="firstName" 
                className="form-control" 
                placeholder="First Name" 
              />
            </div>
            
            <div className="col-sm-6">
              <label htmlFor="lastName">
                Last Name
              </label>
              <input 
                onChange={this.props.onChange} 
                value={user.lastName} 
                type="text"
                id="lastName" name="lastName" 
                className="form-control" 
                placeholder="Last Name" 
              />
            </div>
          
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="email">
            Email Address
          </label>
          <input 
            onChange={this.props.onChange}
            value={user.email}
            type="text"
            id="emailx" name="email" 
            className="form-control" 
            placeholder="Email" 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="location">
            Location
          </label>
          <input 
            onChange={this.props.onChange} 
            value={user.location} 
            type="text" 
            id="location" name="location" 
            className="form-control" 
            placeholder="Location" 
          />
        </div>

        <label htmlFor="location">
          Tell others a bit about yourself
        </label>
        <textarea 
          onChange={this.props.onChange} 
          value={user.bio} 
          name="bio" id="bio" 
          cols="30" rows="2" 
          className="form-control"
          placeholder="What's your story?">
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
    user.updateAvatar(file, user => {
      // user.set('avatar.url', imgUrl)
      this.setState({user: user});
    });
  },

  render: function (){
    var user = this.state.user.toJSON();
    return(
      <AppWrapper>
        <AppHeaderMain />
        <ContainerRow>
          <div className="col-sm-6 col-sm-offset-3">

            <div className="user-profile user-profile-edit">

              <UserProfileImageForm user={user} imageUpdate={this.handleImageAutoUpload}/>
              
              <form onSubmit={this.handleSubmit} >
              
                <UserData user={user} onChange={this.handleChange}/>
              
                <div className="btn-toolbar">
                  <input type="submit" value="Save" className="btn btn-primary" />
                  <button onClick={this.handleCancel} className="btn btn-default">Cancel</button>
                </div>
              
              </form>
            </div>

          </div>
        </ContainerRow>
      </AppWrapper>
    );
  }
});

module.exports= {
  UserEditProfileContainer: UserEditProfileContainer
};
