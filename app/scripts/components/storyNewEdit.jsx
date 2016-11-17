// window.tinymce = require('../utilities/tiny_mce.js');

var $ = require('jquery'); // use jquery for demoing the api request
var React = require('react');
// var TinyMCE = require('react-tinymce'); // react version of tinymce
var User = require('../models/user').User;
var Story = require('../models/story').Story;
var Contribution = require('../models/contribution').Contribution;


// tinymce dependencies
// require('../utilities/langs/en.js');
// require('../utilities/tiny_mce.js');
// require('../utilities/editor_plugin2.js');
// require('../utilities/editor_template.js');
// require('../utilities/editor_plugin.js');

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

  componentDidMount: function(){
    // tinyMCE.init({
    //   mode : "textareas",
    //   plugins : "AtD,paste",
    //   paste_text_sticky : true,
    //   setup : function(ed) {
    //      ed.onInit.add(function(ed) {
    //          ed.pasteAsPlainText = true;
    //      });
    //   },  
    //   /* translations: */
    //   languagetool_i18n_no_errors : {
    //      // "No errors were found.":
    //      // "de-DE": "Keine Fehler gefunden."
    //   },
    //   languagetool_i18n_explain : {
    //      // "Explain..." - shown if there is an URL with a detailed description:
    //      // "de-DE": "Mehr Informationen..."
    //   },
    //   languagetool_i18n_ignore_once : {
    //      // "Ignore this error":
    //      // "de-DE": "Hier ignorieren"
    //   },
    //   languagetool_i18n_ignore_all : {
    //      // "Ignore this kind of error":
    //      // "de-DE": "Fehler dieses Typs ignorieren"
    //   },
    //   languagetool_i18n_rule_implementation : {
    //      // "Rule implementation":
    //      // "de-DE": "Implementierung der Regel"
    //   },

    //   languagetool_i18n_current_lang : function() { return 'en_US' },
          
    //   // The URL of your LanguageTool server.
    //   // If you use your own server here and it's not running on the same domain 
    //   // as the text form, make sure the server gets started with '--allow-origin ...' 
    //   // and use 'https://your-server/v2/check' as URL: 
        
    //   // languagetool_rpc_url: "https://languagetool.org/api/v2/check",
    //   /* edit this file to customize how LanguageTool shows errors: */
    //   languagetool_css_url:
    //      "https://www.languagetool.org/online-check/" +
    //      "tiny_mce/plugins/atd-tinymce/css/content.css",
    //   /* this stuff is a matter of preference: */
    //   theme                              : "advanced",
    //   theme_advanced_buttons1            : "",
    //   theme_advanced_buttons2            : "",
    //   theme_advanced_buttons3            : "",
    //   theme_advanced_toolbar_location    : "none",
    //   theme_advanced_toolbar_align       : "left",
    //   theme_advanced_statusbar_location  : "bottom",
    //   theme_advanced_path                : false,
    //   theme_advanced_resizing            : true,
    //   theme_advanced_resizing_use_cookie : false,
    //   gecko_spellcheck                   : false
    // });
  },

  handleSubmit: function(e){
    e.preventDefault();
  },

  handleTitleChange: function(e){
    var story = this.state.story;

    story.set('title', e.target.value);
    this.setState({story: story});
  },

  handleTextChange: function(e){
    var contribution = this.state.contribution;

    contribution.set('content', e.target.value);
    this.setState({contribution: contribution});
  },

  handleGrammarCheck: function(e){
    e.preventDefault();
    this.state.contribution.checkGrammar();
  },

  //  handleEditorChange(e) {
  //   console.log(e.target.getContent());
  // },

  render: function(){
    
    return(
      <AppWrapper>
        <AppHeaderMain />
        <ContainerRow>

          <div>
            <form onSubmit={this.handleSubmit}>
              <input onChange={this.handleTitleChange} type="text" name="title" className="form-control" 
                placeholder="Your Story Title" />
              <textarea onChange={this.handleTextChange} name="contribution" 
                rows="5" className="form-control" 
                placeholder="Your amazing story body">
              </textarea>
              
              <button onClick={this.handleGrammarCheck} className="btn btn-warning">Check Grammar</button>
              
              <input type="submit" className="btn btn-success" value="Submit"/>

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

// <TinyMCE
//  content="<p>This is the initial content of the editor</p>"
//  config={{
//    plugins: 'autolink link image lists print preview',
//    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
//  }}
//  onChange={this.handleEditorChange} 
// />

// API Setups

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
// 
 
 
//  init tinyMCE
  // console.log(TinyMCE);
    // tinyMCE.init({
    //   mode : "textareas",
    //   plugins : "AtD,paste",
    //   paste_text_sticky : true,
    //   setup : function(ed) {
    //      ed.onInit.add(function(ed) {
    //          ed.pasteAsPlainText = true;
    //      });
    //   },  
    //   /* translations: */
    //   languagetool_i18n_no_errors : {
    //      // "No errors were found.":
    //      "de-DE": "Keine Fehler gefunden."
    //   },
    //   languagetool_i18n_explain : {
    //      // "Explain..." - shown if there is an URL with a detailed description:
    //      "de-DE": "Mehr Informationen..."
    //   },
    //   languagetool_i18n_ignore_once : {
    //      // "Ignore this error":
    //      "de-DE": "Hier ignorieren"
    //   },
    //   languagetool_i18n_ignore_all : {
    //      // "Ignore this kind of error":
    //      "de-DE": "Fehler dieses Typs ignorieren"
    //   },
    //   languagetool_i18n_rule_implementation : {
    //      // "Rule implementation":
    //      "de-DE": "Implementierung der Regel"
    //   },

    //   languagetool_i18n_current_lang :
    //      function() { return document.checkform.lang.value; },
          
    //   // The URL of your LanguageTool server.
    //   // If you use your own server here and it's not running on the same domain 
    //   // as the text form, make sure the server gets started with '--allow-origin ...' 
    //   // and use 'https://your-server/v2/check' as URL: 
        
    //   // languagetool_rpc_url: "https://languagetool.org/api/v2/check",
    //   /* edit this file to customize how LanguageTool shows errors: */
    //   languagetool_css_url:
    //      "https://www.languagetool.org/online-check/" +
    //      "tiny_mce/plugins/atd-tinymce/css/content.css",
    //   /* this stuff is a matter of preference: */
    //   theme                              : "advanced",
    //   theme_advanced_buttons1            : "",
    //   theme_advanced_buttons2            : "",
    //   theme_advanced_buttons3            : "",
    //   theme_advanced_toolbar_location    : "none",
    //   theme_advanced_toolbar_align       : "left",
    //   theme_advanced_statusbar_location  : "bottom",
    //   theme_advanced_path                : false,
    //   theme_advanced_resizing            : true,
    //   theme_advanced_resizing_use_cookie : false,
    //   gecko_spellcheck                   : false
    // });