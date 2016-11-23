
var React = require('react');

var User = require('../models/user').User;
var Story = require('../models/story').Story;
var Contribution = require('../models/contribution').Contribution;

// tinymce dependencies
require('../vendor/jquery-1.7.0.min.js');
require('../vendor/editor_plugin2.js');


var StoryTitle =  React.createClass({
  getInitialState: function(){
    return {
      title: this.props.title
    }
  },

  render: function(){
    return(
      <input onChange={this.props.onChange}
        type="text" name="title" className="form-control" 
        placeholder="Your Story Title" />
    );
  }
});


var StoryBody = React.createClass({
  getInitialState: function(){
    return {
      text: this.props.body
    }
  },

  componentDidMount: function(){
    var self = this;
    tinyMCE.init({

      setup : function(ed) {

        ed.onInit.add(function(ed) {
          ed.pasteAsPlainText = true;
        });

        ed.onKeyUp.add(function(ed, e) {
          self.props.onChange(e, ed);
        });

      },
      
      mode : "textareas",
      plugins : "AtD,paste",
      paste_text_sticky : true,
      /* this stuff is a matter of preference: */
      theme                              : "advanced",
      theme_advanced_buttons1            : "",
      theme_advanced_buttons2            : "",
      theme_advanced_buttons3            : "",
      theme_advanced_toolbar_location    : "none",
      theme_advanced_toolbar_align       : "left",
      theme_advanced_statusbar_location  : "bottom",
      theme_advanced_path                : false,
      theme_advanced_resizing            : true,
      theme_advanced_resizing_use_cookie : false,
      gecko_spellcheck                   : false,
      browser_spellcheck                 : true,
      // "No errors were found.":
      languagetool_i18n_no_errors : {},
      // "Explain..." - shown if there is an URL with a detailed description:
      languagetool_i18n_explain : {},
      // "Ignore this error":
      languagetool_i18n_ignore_once : {},
      // "Ignore this kind of error":
      languagetool_i18n_ignore_all : {},
      // "Rule implementation":
      languagetool_i18n_rule_implementation : {},

      languagetool_i18n_current_lang : function() { return 'en_US' },
          
      // The URL of the LanguageTool API.
      languagetool_rpc_url: "https://languagetool.org/api/v2/check",
      /* edit this file to customize how LanguageTool shows errors: */
      languagetool_css_url: 'css/app.css'
    });

    // tinyMCE.activeEditor.getBody().addEventListener('keydown', this.handleLTEditorChange);

  },

  handleLTCheck: function(e){
    e.preventDefault();
    // tinyMCE.activeEditor.getBody().addEventListener('keydown', this.handleLTEditorChange)
    // console.log(tinyMCE.activeEditor);
    tinyMCE.activeEditor.execCommand("mceWritingImprovementTool", "en-US");
    return false;
  },

  handleLTEditorChange: function(e){
    // console.warn(e.target)
  },

  // for react-tinymce
  // handleEditorChange: function(e) {
  //   console.log(e.target.getContent());
  // },
  
  // handleChange: function(e){
  //   // this.setState({text: e.target.getContent()});
  //   this.setState({text: e.target.value});
  //   console.log(this.state.text)
  // },

  render: function(){
    // change text area onchange back to this onchange
    return(
      <div>
        <textarea onChange={this.props.onChange} 
          id="checktext" name="body"
          className="text form-control" rows="6"
          placeholder="Start typing your amazing story here!"
          defaultValue="Begin your story here... or paste paste it in!">
        </textarea>
        <button onClick={this.handleLTCheck} 
          className="btn btn-warning" 
          name="_action_checkText">
          Grammar Check
        </button>
      </div>

    );
  }
});


var StoryFormContainer = React.createClass({
  getInitialState: function () {
    // models
    return {
      story: new Story(),
      contribution: new Contribution()
    }
  },

  handleGrammarCheck: function(e){
    e.preventDefault();
    this.state.contribution.checkGrammar();
  },

  handleTitleChange: function(e){
    this.state.story
      .set('title', e.target.value);

    this.setState({
      story: this.state.story
    });
  },

  handleTextChange: function(e, ed){
    // console.log('handleTextChange', ed.getContent())
    this.state.contribution
      .set('content', ed.getContent());

    this.setState({
      contribution: this.state.contribution
    });

    // console.log(this.state.contribution);
  },

  handleSubmit: function(e){
    e.preventDefault();
    
    var user = User.current()
    , story = this.state.story
    , contribution = this.state.contribution;

    // set the story owner pointer
    story.setPointer('owner', '_User', user.get('objectId'));
    console.warn(story);
    story.save().then(response => {
      console.warn(response);
      var storyId = response.objectId
      contribution
        .setPointer('contributor', '_User', user.get('objectId'))
        .setPointer('story', 'Story', storyId);
      
      contribution
        .save().then(response => {
          this.props.router.navigate('stories/' + storyId + '/', {trigger: true});
        });

    });

  },

  render: function(){
    var title = this.state.story.get('title')
    , body = this.state.contribution.get('content');

    return(
      <form onSubmit={this.handleSubmit} name="checkform">
        
        { this.props.showTitle ?
            <StoryTitle onChange={this.handleTitleChange} title={title}/>
          : null }

        <StoryBody onChange={this.handleTextChange} body={body}/>

        <button onClick={this.handleGrammarCheck} 
          className="btn btn-warning">Raw API Check</button>
                  
        <input type="submit" className="btn btn-success" value="Submit"/>

      </form>
    );
  }
});

module.exports = {
  StoryFormContainer: StoryFormContainer
};
