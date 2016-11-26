
var React = require('react');

var User = require('../models/user').User;
var Story = require('../models/story').Story;
var Contribution = require('../models/contribution').Contribution;

var StoryFormContainer = require('./storyForm.jsx').StoryFormContainer;
// layouts
var AppWrapper = require('./layouts/general.jsx').AppWrapper;
var ContainerRow = require('./layouts/general.jsx').ContainerRow;
var AppHeaderMain = require('./layouts/general.jsx').AppHeaderMain;


var StoryCreateContainer = React.createClass({
  getInitialState: function(){
    return {
      story: new Story()
    }
  },

  render: function(){
    // console.warn(this.state.story.get('contributions'))
    return(
      <AppWrapper>
        <AppHeaderMain />
        <ContainerRow>

          <StoryFormContainer 
            showTitle={true} 
            router={this.props.router}
          />

        </ContainerRow>
      </AppWrapper>
    );
  }

});

module.exports = {
  StoryCreateContainer: StoryCreateContainer
};
