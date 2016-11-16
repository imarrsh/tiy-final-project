var React = require('react');

var User = require('../models/user').User;

// layouts
var AppWrapper = require('./layouts/general.jsx').AppWrapper;
var ContainerRow = require('./layouts/general.jsx').ContainerRow;
var AppHeaderMain = require('./layouts/general.jsx').AppHeaderMain;

var UserEditProfileContainer = React.createClass({
  
  getInitialState: function () {
    return{
      user: User.current()
    }
  },

  handleChange: function (e) {
    var user = this.state.user;
    user.set(e.target.name, e.target.value);

    this.setState(user);
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var user = this.state.user;
    user.auth().save();
  },

  render: function () {
    var user = this.state.user;
    return(
      <AppWrapper>
        <ContainerRow>
          <AppHeaderMain />
          <div>
            <form onSubmit={this.handleSubmit}>
              <input onChange={this.handleChange} type="text" name="firstName" 
                className="form-control" value={user.get('firstName')} />
              <input onChange={this.handleChange} type="text" name="lastName" 
                className="form-control" value={user.get('lastName')} />
              <input type="file" name="profileImg" />
              <input type="submit" value="Save" />
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
