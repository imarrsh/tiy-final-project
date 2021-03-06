var React = require('react');

var Modal = require('react-bootstrap').Modal;
var Popover = require('react-bootstrap').Popover;
var Tooltip = require('react-bootstrap').Tooltip;
var Button = require('react-bootstrap').Button;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;


var NuModal = React.createClass({
  getInitialState: function() {
    return { showModal: false };
  },

  close: function() {
    this.setState({ showModal: false });
  },

  open: function() {
    this.setState({ showModal: true });
  },

  render: function() {
    /* props: delete btn text, delete item name
    var popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    var tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );
    */
    // props: delete btn text, delete item name, delete method
    return (
      <div style={{'display': 'inline'}}>
        <Button
          bsStyle="default"
          className="btn-red"
          bsSize="xs"
          onClick={this.open}
        >
          {this.props.icon} {this.props.buttonText}
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Delete {this.props.context}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Really delete this {this.props.context}?
          </Modal.Body>
          <Modal.Footer>
            <Button 
              bsStyle="danger" 
              onClick={this.props.action}
            >
              Delete
            </Button>
            
            <Button onClick={this.close}>No, don't</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

module.exports = {
  NuModal: NuModal
}