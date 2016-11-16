var React = require('react');

var UserDetailContainer = React.createClass({
  render: function () {
    var user = User.current();
    return(
      <div>
        <h2>User Detail for {user.username}</h2>
      </div>
    );
  }
});

module.exports= {
  UserDetailContainer: UserDetailContainer
};
