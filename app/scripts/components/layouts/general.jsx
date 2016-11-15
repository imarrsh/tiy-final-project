var React = require('react');

var ContainerRow = function(props){
  return(
    <div className="container">
      <div className="row">
        {props.children}
      </div>
    </div>
  );
};

var AppHeader = function(props){
  return(
    <div className="wrapper">
      {props.children}
    </div>
  );
};

var Section = function(props){
  return(
    <section id={this.props.id}>
      {props.children}
    </section>
  );
};

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
