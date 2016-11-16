var React = require('react');

var User = require('../../models/user').User;

// container+row block
var ContainerRow = function(props){
  return(
    <div className="container">
      <div className="row">
        {props.children}
      </div>
    </div>
  );
};

// generic section tag 
var Section = function(props){
  return(
    <section id={this.props.id}>
      {props.children}
    </section>
  );
};

// header container wrapper
var AppHeaderWrap = function(props){
  return(
    <header className="app-header">
      <ContainerRow>
        <nav>
          <ul className="nav nav-pills">
            {props.children}
          </ul>
        </nav>
      </ContainerRow>
    </header>
  );
};

// main header nav
var AppHeaderMain = function(props){
  var user = User.current();
  return(
    <AppHeaderWrap>
      <li><a href="#">Home</a></li>
      <li><a href="#stories/new/">New Story</a></li>
      <li><a href={'#user/' + user.get('objectId') + '/'}>Profile</a></li>
      <li><a href="#logout/">Logout</a></li>
    </AppHeaderWrap>
  );
};

// login header nav
var AppHeaderLogin = function(props){
  return(
    <AppHeaderWrap>
      <li><a href="">Login</a></li>
      <li><a href="">Sign Up</a></li>
    </AppHeaderWrap>
  );
};

// general wrapper
var AppWrapper = function(props){
  return(
    <div className={'wrapper ' + props.pageClass}>
      {props.children}
    </div>
  );
};


module.exports = {
  AppWrapper: AppWrapper,
  ContainerRow: ContainerRow,
  Section: Section,
  AppHeaderMain: AppHeaderMain,
  AppHeaderLogin: AppHeaderLogin
};
