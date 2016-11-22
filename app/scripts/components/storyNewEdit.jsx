
// var $ = require('jquery'); // use jquery for demoing the api request
var React = require('react');
var User = require('../models/user').User;
var Story = require('../models/story').Story;
var Contribution = require('../models/contribution').Contribution;

// var TinyMCE = require('react-tinymce'); // react version of tinymce


var ContributionContainer = require('./contribute.jsx').ContributionContainer


// layouts
var AppWrapper = require('./layouts/general.jsx').AppWrapper;
var ContainerRow = require('./layouts/general.jsx').ContainerRow;
var AppHeaderMain = require('./layouts/general.jsx').AppHeaderMain;

var StoryCreateContainer = React.createClass({
  
  getInitialState: function () {
    // models
    return {
      story: new Story(),
      contribution: new Contribution()
    }
  },

  // submit models to their respective endpoints 
  // glue 'em together with the user
  handleSubmit: function(e){
    e.preventDefault();
    
    var user = User.current()
    , story = this.state.story
    , contribution = this.state.contribution;

    // // log some stately stuff
    // console.log(
    //   'submit event,',
    //   user.get('objectId'), user.get('alias'),
    //   ',',
    //   story.get('title'),
    //   ',', 
    //   contribution.get('content')
    // );

    // set the story owner pointer
    story.setPointer('owner', '_User', user.get('objectId'));
    story.save().then(response => {
      var storyId = response.objectId
      contribution
        .setPointer('contributor', '_User', user.get('objectId'))
        .setPointer('story', 'Story', storyId);
      
      contribution
        .save().then(response => {
          this.props.router.navigate('stories/' + storyId + '/', {trigger: true});
        });

    });
    
    // set the contribution pointer to user and story
    this.state.contribution
      .setPointer('contributor', '_User', user.get('objectId'))
      .setPointer('story', 'Story', story.get('objectId'));

    // pseudo code
    // model.save().then(response => {
    //   response.fetch().then(response => {
    //     model2.save().then(respsonse => {

    //     });
    //   });
    // });


    // console.log('story model: ', this.state.story);
    // this.state.story.save();

    // this.contribution.save();

  },


  handleTitleChange: function(e){
    var story = this.state.story;

    story.set('title', e.target.value);
    this.setState({story: story});
  },

  handleTextChange: function(e){
    var contribution = this.state.contribution;
    console.log(e.target.value)
    contribution.set('content', e.target.value);
    this.setState({contribution: contribution});
  },

  handleGrammarCheck: function(e){
    e.preventDefault();
    this.state.contribution.checkGrammar();
  },

  // handleEditorChange(e) {
  //   console.log(e.target.getContent());
  // },

  render: function(){
    
    return(
      <AppWrapper>
        <AppHeaderMain />
        <ContainerRow>

          <div>
            <form onSubmit={this.handleSubmit} name="checkform">
              <input onChange={this.handleTitleChange} type="text" name="title" className="form-control" 
                placeholder="Your Story Title" />

              <ContributionContainer 
                onChange={this.handleTextChange} 
                onCheck={this.handleGrammarCheck}
              />

            </form>
          </div>

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