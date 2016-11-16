var React = require('react');

// models
var User = require('../models/user').User;

// layouts
var AppWrapper = require('./layouts/general.jsx').AppWrapper;
var ContainerRow = require('./layouts/general.jsx').ContainerRow;
var AppHeaderMain = require('./layouts/general.jsx').AppHeaderMain;

var HomeContainer = React.createClass({
  render: function(){
    var currentUser = User.current();
    var email = currentUser.get('username');
    return(
      <AppWrapper>
        <AppHeaderMain />
        <ContainerRow>
          <div>
            <h2>Hi {email}!</h2>
          </div>
        </ContainerRow>
      </AppWrapper>
    );
  }
});

module.exports = {
  HomeContainer: HomeContainer
}
