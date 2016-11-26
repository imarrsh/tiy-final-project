var React = require('react');

var User = require('../../models/user').User;

var Row = function(props){
  return(
      <div className="row">
        {props.children}
      </div>
  );
};

// container+row block
var ContainerRow = function(props){
  return(
    <div className="container">
      <Row>
        {props.children}
      </Row>
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
      <li className="pull-right">
        <div className="user-avatar user-avatar-sm">
          <img
            src={user.get('avatar').url} 
            alt={user.get('alias')} 
          />
        </div>
      </li>
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
  Row: Row,
  Section: Section,
  AppHeaderMain: AppHeaderMain,
  AppHeaderLogin: AppHeaderLogin
};
