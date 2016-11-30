var React = require('react');

// models
var User = require('../models/user').User;

// layouts
var AppWrapper = require('./layouts/general.jsx').AppWrapper;
var ContainerRow = require('./layouts/general.jsx').ContainerRow;
var AppHeaderLogin = require('./layouts/general.jsx').AppHeaderLogin;
var Row = require('./layouts/general.jsx').Row;

var LoginFormWrapper = function(props){
  return(
    <div className="col-sm-6 col-sm-offset-3">
      <div className="login-panel">
        {props.children}
      </div>
    </div>
  );
}

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
            value="Sign Up" />
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


var LoginContainer = React.createClass({
  
  getInitialState: function(){
    return {
      username: '',
      password: '',
      isLoggingIn: true
    }
  },
  
  handleChange: function(e){
    this.setState({ [e.target.name]: e.target.value });
  },

  handleLogIn: function (e) {
    e.preventDefault();
    var creds = this.state;

    User.logIn(creds, function(){
      this.props.router.navigate('', {trigger: true});
    }.bind(this));

  },

  handleSignUp: function (e) {
    e.preventDefault();
    User.signUp(this.state, user => {
      
      this.props.router
        .navigate('user/' + user.get('objectId') + '/edit/' , {trigger: true});
    })
  },

  render: function(){
    return(
      <AppWrapper> 
        <AppHeaderLogin />
        <ContainerRow>
          <LoginFormWrapper>

            <div>

              <Row>
                <div className="col-xs-6">
                  <div onClick={() => {
                      this.setState({
                        isLoggingIn: true
                      });
                    }}
                    className="login-panel-body choose-login"
                  >
                    Login
                  </div>
                </div>
                <div className="col-xs-6">
                  <div onClick={() => {
                      this.setState({
                        isLoggingIn: false
                      });
                    }} 
                    className="login-panel-body choose-signup"
                  >
                    Sign Up
                  </div>
                </div>
              </Row>

            </div>

            {this.state.isLoggingIn ?
              <LoginForm 
                onSubmit={this.handleLogIn} 
                onChange={this.handleChange} 
              />
              :
              <SignUpForm 
                onSubmit={this.handleSignUp} 
                onChange={this.handleChange} 
              />
            } 
          </LoginFormWrapper>
        </ContainerRow>
      </AppWrapper>
    );
  }
})

module.exports = {
  LoginContainer: LoginContainer
}