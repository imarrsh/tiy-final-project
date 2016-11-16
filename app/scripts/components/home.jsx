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
    var userId = currentUser.get('objectId');
    return(
      <AppWrapper>
        <AppHeaderMain userId={userId} active={this.props.active} />
        <ContainerRow>
          <div>
            <h2>Hi {currentUser.get('firstName')}!</h2>
          </div>
        </ContainerRow>
      </AppWrapper>
    );
  }
});

module.exports = {
  HomeContainer: HomeContainer
}
