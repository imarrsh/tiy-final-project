var React = require('react');

var User = require('../../models/user').User;

var NavDropdown = require('react-bootstrap').NavDropdown;
var MenuItem = require('react-bootstrap').MenuItem;

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
    <section className={this.props.className} id={this.props.id || null}>
      {props.children}
    </section>
  );
};

// header container wrapper
var AppHeaderWrap = function(props){
  return(
    <header className="app-header">
      <ContainerRow>
        <nav className="header-nav">
          <a className="navbar-brand navbar-logo" href="">
            <img src="images/spark-a-story.svg" className="logo" alt="Spark-a-Story" />
          </a>
            {props.children}
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

      <ul className="nav nav-pills pull-right">

        <li className="nav-desktop"><a href="#">Home</a></li>
        <li className="nav-desktop"><a href="#stories/new/">New Story</a></li>
        <NavDropdown 
          title={user.get('alias') || 'Actions'} 
          id="nav-dropdown"
        >
          <MenuItem 
            className="nav-mobile" 
            href="#"
          >
            Home
          </MenuItem>
          <MenuItem 
            className="nav-mobile" 
            href="#stories/new/"
          >
            New Story
          </MenuItem>
          <MenuItem 
            href={'#user/' + user.get('objectId') + '/'}
          >
            View Profile
          </MenuItem>
          <MenuItem divider />
          <MenuItem href="#logout/">Log out</MenuItem>
        </NavDropdown>
        <li>
          <div className="user-avatar user-avatar-sm">
            <a href={'#user/' + user.get('objectId') + '/'}>
              <img
                src={user.get('avatar') ? 
                  user.get('avatar').url : null } 
                alt={user.get('alias')} 
              />
            </a>
          </div>
        </li>

      </ul>
    </AppHeaderWrap>
  );
};

// login header nav
var AppHeaderLogin = function(props){
  return(
    <AppHeaderWrap>
      <ul className="nav nav-pills pull-right">
        <li><a href="">Login</a></li>
        <li><a href="">Sign Up</a></li>
      </ul>
    </AppHeaderWrap>
  );
};

var AppFooterWrap = function(props){
  return(
    <footer className="footer">
      {props.children}
    </footer>
  );
};

var AppFooterMain =  function(props){
  var user = User.current();
  return(
    <AppFooterWrap>
      <ContainerRow>
        <nav className="footer-nav">
          <ul className="nav nav-pills">
            <li className="info">Spark-a-Story, an app built by Marshall Thompson</li>
            <li className="pull-right"><a href="#overview/">Overview</a></li>
          </ul>
        </nav>
      </ContainerRow>
    </AppFooterWrap>
  );
};

// general wrapper
var AppWrapper = function(props){
  return(
    <div className={'wrapper'}>
      <div className="main-content">
        {props.children}
      </div>
      <AppFooterMain />
    </div>
  );
};


module.exports = {
  AppWrapper: AppWrapper,
  ContainerRow: ContainerRow,
  Row: Row,
  Section: Section,
  AppHeaderLogin: AppHeaderLogin,
  AppHeaderMain: AppHeaderMain,
  AppFooterMain: AppFooterMain
};
