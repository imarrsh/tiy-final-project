var React = require('react');

var UserEditProfileContainer = React.createClass({
  
  handleSubmit: function (e) {
    e.preventDefault();
    console.log('submit');
  },

  render: function () {
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" className="username" />
          <input type="submit" value="Save" />
        </form>
      </div>
    );
  }
});

module.exports= {
  UserEditProfileContainer: UserEditProfileContainer
};
