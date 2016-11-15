var React = require('react');

// layouts
var AppWrapper = require('./layouts/general.jsx').AppWrapper;
var ContainerRow = require('./layouts/general.jsx').ContainerRow;
// models
var User = ('../models/user').User;

var SignUpForm = React.createClass({
  render: function(){
    return(
      <div id="signup-form">
        <h2>Sign up</h2>
        <form onSubmit={this.props.onSubmit}>
          <div className="form-group">
            <input onChange={this.props.onChange} 
              name="username" type="email" 
              className="form-control" placeholder="Email" />
          </div>
          <div className="form-group">
            <input onChange={this.props.onChange} 
              name="password" type="password" 
              className="form-control" placeholder="Password" />
          </div>
          <input type="submit" 
            className="form-control btn btn-primary" 
            value="Log In" />
        </form>
      </div>
    );
  }
});

var LoginForm = React.createClass({
  render: function(){
    return(
      <div id="login-form">
        <h2>Login</h2>
        <form onSubmit={this.props.onSubmit}>
          <div className="form-group">
            <input onChange={this.props.onChange} 
              name="username" type="email" 
              className="form-control" placeholder="Email" />
          </div>
          <div className="form-group">
            <input onChange={this.props.onChange} 
              name="password" type="password" 
              className="form-control" placeholder="Password" />
          </div>
          <input type="submit" 
            className="form-control btn btn-primary" 
            value="Log In" />
        </form>
      </div>
    );
  }
});

var LoginFormWrapper = function(props){
  return(
    <div className="col-sm-6 col-sm-offset-3">
      {props.children}
    </div>
  );
}

var LoginContainer = React.createClass({
  handleChange: function(){

  },
  
  handleLogIn: function (e) {
    e.preventDefault();
    console.log('handleLogIn');
    User.logIn();
  },

  handleSignUp: function (e) {
    e.preventDefault();
    console.log('handleSignUp');
  },

  render: function(){
    return(
      <AppWrapper>
        <ContainerRow>
          <LoginFormWrapper>

            <LoginForm onSubmit={this.handleLogIn} onChange={this.handleChange}/>

            <SignUpForm onSubmit={this.handleSignUp} />

          </LoginFormWrapper>
        </ContainerRow>
      </AppWrapper>
    );
  }
})

module.exports = {
  LoginContainer: LoginContainer
}