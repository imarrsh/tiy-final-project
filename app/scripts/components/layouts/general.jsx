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

// main header
var AppHeader = function(props){
  return(
    <div className="wrapper">
      {props.children}
    </div>
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
  AppHeader: AppHeader
};
