
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
        type="text" name="title" className="form-control title-field" 
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

        ed.onKeyUp.add(function(ed, e, c, d) {
          // console.log(ed.getContent());
          self.props.onChange(ed.getContent()); 
        });

        ed.onChange.add(function(ed, c){
          // console.log(c.content)
          self.props.onChange(c.content);
        });
      },
      
      mode : 'textareas',
      plugins : 'AtD,paste',
      paste_text_sticky : true,
      /* this stuff is a matter of preference: */
      theme                              : 'advanced',
      theme_advanced_buttons1            : '',
      theme_advanced_buttons2            : '',
      theme_advanced_buttons3            : '',
      theme_advanced_toolbar_location    : 'none',
      theme_advanced_toolbar_align       : 'left',
      theme_advanced_statusbar_location  : 'bottom',
      theme_advanced_path                : false,
      theme_advanced_resizing            : true,
      theme_advanced_resizing_use_cookie : false,
      gecko_spellcheck                   : false,
      browser_spellcheck                 : true,
      // 'No errors were found.':
      languagetool_i18n_no_errors : {},
      // 'Explain...' - shown if there is an URL with a detailed description:
      languagetool_i18n_explain : {},
      // 'Ignore this error':
      languagetool_i18n_ignore_once : {},
      // 'Ignore this kind of error':
      languagetool_i18n_ignore_all : {},
      // 'Rule implementation':
      languagetool_i18n_rule_implementation : {},

      languagetool_i18n_current_lang : function() { return 'en_US' },
          
      // The URL of the LanguageTool API.
      languagetool_rpc_url: 'https://languagetool.org/api/v2/check',
      /* edit this file to customize how LanguageTool shows errors: */
      languagetool_css_url: 'css/app.css'
    });

  },

  render: function(){
    // change text area onchange back to this onchange
    return(
      <div>
        <textarea onChange={this.props.onChange} 
          id="checktext" name="body"
          className="text form-control" rows="6"
          placeholder="Begin your story here... or paste it in!"
          value={this.state.text}>
        </textarea>
      </div>

    );
  }
});


var StoryFormContainer = React.createClass({
  getInitialState: function () {
    // models
    return {
      story: new Story(),
      contribution: this.props.contribution || new Contribution(),
      previousContent: ''
    }
  },

  componentWillMount: function(){
    var contribution = this.state.contribution;
    if (this.props.story){
      // console.log('mounted')
      this.setState({story: this.props.story});
    }

    // if the editor gets called from a segment
    if (this.props.isAnEdit) {
      contribution.set('content', this.props.content);
      this.setState({
        contribution: contribution,
        previousContent: contribution.get('content') 
      });
    }
  },

  handleGrammarCheck: function(e){
    e.preventDefault();
    this.state.contribution.checkGrammar();
  },

  handleTitleChange: function(e){
    this.setState({
      story: this.state.story
    });

    this.state.story
      .set('title', e.target.value);
  },

  handleTextChange: function(content){
    this.state.contribution
      .set('content', content);

    this.setState({
      contribution: this.state.contribution
    });
  },

  handleSubmit: function(e){
    e.preventDefault();
    
    var user = User.current()
    , story = this.state.story
    , contribution = this.state.contribution
    , data;

    // check if if the story came from the server
    if (!story.isNew()) {
      // console.log('story is NOT new');

      if (this.props.isAnEdit) {
        // console.log('this is an edit!');
        // update the content only
        contribution.updateSegment();
      
        this.setState({contribution: contribution});
        
        this.props.toggleEditorVisibility();

      } else {

      // set the contribition' contributor
      // if user is making a fresh contribution
      this.setContributor(user, story.get('objectId'), 
        (response, contribution) => {
          
          // contribution doesnt have user information 
          // attached at this point so add it for display purposes...
          contribution.set('contributor', user.toJSON());
          this.props.addContribution(contribution);

          // reset the state
          this.setState({contribution: new Contribution()});
          
          // call the parent componets toggle
          this.props.toggleEditorVisibility();
        });
      }

    } else {

      // console.log('story is NEW');
      // set the story owner & pointer instead
      story
        .setPointer('owner', '_User', user.get('objectId'))
        .save().then(response => {
          var storyId = response.objectId;

          this.setContributor(user, storyId, () => {
            this.props.router
              .navigate('stories/' + storyId + '/', {trigger: true});
          });

        });
    }
  },

  setContributor: function(user, storyId, callback){
    // set the pointers for the contribution and story
    var contribution = this.state.contribution;

    contribution
      .setPointer('contributor', '_User', user.get('objectId'))
      .setPointer('story', 'Story', storyId)
      .save().then(response => {
        // console.log(contribution);
        callback(response, contribution);
      });

  },

  handleCheck: function(e){
    e.preventDefault();
    tinyMCE.activeEditor.execCommand("mceWritingImprovementTool", "en-US");
    return false;
  },

  handleCancel: function(e){
    e.preventDefault();
    var contribution = this.state.contribution;
    contribution.set('content', this.state.previousContent);

    this.setState({
      contribution: contribution
    });
    
    this.props.toggleEditorVisibility();
  },


  render: function(){
    var title = this.state.story.get('title')
    , body = this.state.contribution.get('content');
    // console.log(this.state.story);

    return(
      <div className="panel panel-default">
        <div className="panel-body">

          <form onSubmit={this.handleSubmit} name="checkform">
            
            { this.props.showTitle ?
                <StoryTitle 
                  onChange={this.handleTitleChange}
                  title={title}
                />
              : null }
          
            <StoryBody 
              onChange={this.handleTextChange}
              body={body}
            />
            
            <div className="btn-toolbar">
              <button onClick={this.handleCheck} 
                className="btn btn-warning btn-sm" 
                name="_action_checkText">
                Grammar Check
              </button>
              <input type="submit" 
                className="btn btn-success btn-sm" 
                value="Submit"
              />
              {!this.props.newStory ?
                <button onClick={this.handleCancel} 
                  className="btn btn-default btn-sm" 
                  name="">
                  Cancel
                </button>
                : null }

            </div>
            
          </form>
        </div>
      </div>
    );
  }
});

module.exports = {
  StoryFormContainer: StoryFormContainer
};
