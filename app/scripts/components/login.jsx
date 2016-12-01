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

var ErrComponent = React.createClass({
  render: function(){
    return(
      <div className="alert alert-danger">
        {this.props.error}
      </div>      
    );
  }
})

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
          
          {this.props.error ?
            <ErrComponent error={this.props.error} />
          : null}

          <input type="submit" 
            className="form-control btn btn-signup" 
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

          {this.props.error ?
            <ErrComponent error={this.props.error} />
          : null}

          <input type="submit" 
            className="form-control btn btn-login" 
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
      isLoggingIn: true,
      error:'',
      selected: 'login'
    }
  },
  
  handleChange: function(e){
    this.setState({ [e.target.name]: e.target.value });
  },

  handleLogIn: function (e) {
    e.preventDefault();
    
    var creds = {
      username: this.state.username,
      password: this.state.password
    };

    User.logIn(creds, (user, err) => {
      if (!err){
        this.props.router.navigate('', {trigger: true});
      } else {
        console.log(err)
        this.setState({error: err});
      }
    });

  },

  handleSignUp: function (e) {
    e.preventDefault();

    var creds = {
      username: this.state.username,
      password: this.state.password
    };
    
    User.signUp(creds, (user, err) => {
      if (!err){
        this.props.router
          .navigate('user/' + user.get('objectId') + 
            '/edit/' , {trigger: true});
      } else {
        // console.log(err)
        this.setState({error: err});
      }
    })  
  },

  isActive:function(className, value){
    return className + ((value===this.state.selected) ? ' active' : '');
  },

  render: function(){
    return(
      <AppWrapper> 
        <AppHeaderLogin />
        <ContainerRow>
          <LoginFormWrapper>

            <div>

              <Row>
                <div className="login-select">
                  <div className="col-xs-6">
                    <div onClick={() => {
                        this.setState({
                          selected: 'login',
                          isLoggingIn: true
                        });
                      }}
                      className={this.isActive(
                        'login-panel-body choose-login', 
                        'login'
                      )}
                    >
                      Login
                    </div>
                  </div>
                  <div className="col-xs-6">
                    <div onClick={() => {
                        this.setState({
                          selected: 'signup',
                          isLoggingIn: false
                        });
                      }} 
                      className={this.isActive(
                        'login-panel-body choose-signup', 
                        'signup'
                      )}
                    >
                      Sign Up
                    </div>
                  </div>
                </div>
              </Row>

            </div>

            {this.state.isLoggingIn ?
              <LoginForm 
                onSubmit={this.handleLogIn} 
                onChange={this.handleChange}
                error={this.state.error} 
              />
              :
              <SignUpForm 
                onSubmit={this.handleSignUp} 
                onChange={this.handleChange}
                error={this.state.error} 
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