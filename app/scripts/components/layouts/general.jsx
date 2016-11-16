var React = require('react');

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
          <ul>
            {props.children}
          </ul>
        </nav>
      </ContainerRow>
    </header>
  );
}

// main header nav
var AppHeaderMain = function(props){
  return(
    <AppHeaderWrap>
      <li><a href="#">Home</a></li>
      <li><a href={'#user/' + props.userId + '/'}>Profile</a></li>
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
    <div className="wrapper">
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
