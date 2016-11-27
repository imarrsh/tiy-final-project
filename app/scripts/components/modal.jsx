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

    return (
      <div>
        <Button
          bsStyle="danger"
          bsSize="xs"
          onClick={this.open}
        >
          Delete Story
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Story</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Really Delete this story?
          </Modal.Body>
          <Modal.Footer>
            <Button 
              bsStyle="danger" 
              onClick={this.props.deleteStory}
            >
              Delete
            </Button>
            
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

module.exports = {
  NuModal: NuModal
}