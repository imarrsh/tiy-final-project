
// var $ = require('jquery'); // use jquery for demoing the api request
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
    console.warn(this.state.story.get('contributions'))
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


// Other API Setups

// ######################
// After the Deadline API
// ######################

// var data = encodeURI(storyBody);
// var key = 'key=storytelling5e836ae5397a524dc3c0a7c92c0a5cbc';

// var checkUrl = 'http://service.afterthedeadline.com/checkDocument';
// checkUrl += '?' + key + '&data=' + data;

// ######################
// TextGears API
// ######################

// var text = encodeURI(storyBody);
// // var key = 'key=GwOf05rYyp7z5LOh';
// var key = 'key=DEMO_KEY';

// var checkUrl = 'https://api.textgears.com/check.php';
// checkUrl += '?' + key + '&text=' + text;

// $.post(checkUrl) // for when the data is all one url string; TextGears, AtD


              // <TinyMCE
              //   className="form-control"
              //   content="<p>This is the initial content of the editor</p>"
              //   config={{
              //    // plugins: 'autolink link image lists print preview',
              //    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
              //   }}
              //   onChange={this.handleEditorChange} 
              // />