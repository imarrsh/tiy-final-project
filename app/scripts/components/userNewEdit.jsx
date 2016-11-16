var React = require('react');

var User = require('../models/user').User;

// layouts
var AppWrapper = require('./layouts/general.jsx').AppWrapper;
var ContainerRow = require('./layouts/general.jsx').ContainerRow;
var AppHeaderMain = require('./layouts/general.jsx').AppHeaderMain;

var UserEditProfileContainer = React.createClass({
  
  handleSubmit: function (e) {
    e.preventDefault();
    console.log('submit');
  },

  render: function () {
    var user = User.current();
    return(
      <AppWrapper>
        <ContainerRow>
          <AppHeaderMain />
          <div>
            <form onSubmit={this.handleSubmit}>
              <input type="text" name="firstName" className="form-control" value={user.get('firstName')} />
              <input type="text" name="lastName" className="form-control" value={user.get('lastName')} />
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
