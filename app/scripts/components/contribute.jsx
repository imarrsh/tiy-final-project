// window.tinymce = require('../utilities/tiny_mce.js');
var React = require('react');

// var TinyMCE = require('react-tinymce'); // react version of tinymce

// tinymce dependencies
// require('../utilities/langs/en.js');
require('../utilities/tiny_mce.js');
require('../utilities/editor_plugin2.js');
// require('../utilities/editor_template.js');
// require('../utilities/editor_plugin.js');
// 

var ContributionContainer = React.createClass({

  componentDidMount: function(){
    tinyMCE.init({
      mode : "textareas",
      plugins : "AtD,paste",
      paste_text_sticky : true,
      setup : function(ed) {
         ed.onInit.add(function(ed) {
             ed.pasteAsPlainText = true;
         });
      },  
      /* translations: */
      languagetool_i18n_no_errors : {
         // "No errors were found.":
         // "de-DE": "Keine Fehler gefunden."
      },
      languagetool_i18n_explain : {
         // "Explain..." - shown if there is an URL with a detailed description:
         // "de-DE": "Mehr Informationen..."
      },
      languagetool_i18n_ignore_once : {
         // "Ignore this error":
         // "de-DE": "Hier ignorieren"
      },
      languagetool_i18n_ignore_all : {
         // "Ignore this kind of error":
         // "de-DE": "Fehler dieses Typs ignorieren"
      },
      languagetool_i18n_rule_implementation : {
         // "Rule implementation":
         // "de-DE": "Implementierung der Regel"
      },

      languagetool_i18n_current_lang : function() { return 'en_US' },
          
      // The URL of your LanguageTool server.
      // If you use your own server here and it's not running on the same domain 
      // as the text form, make sure the server gets started with '--allow-origin ...' 
      // and use 'https://your-server/v2/check' as URL: 
        
      // languagetool_rpc_url: "https://languagetool.org/api/v2/check",
      /* edit this file to customize how LanguageTool shows errors: */
      languagetool_css_url:
         "https://www.languagetool.org/online-check/" +
         "tiny_mce/plugins/atd-tinymce/css/content.css",
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
      gecko_spellcheck                   : false
    });
  },

  // for react-tinymce
  //  handleEditorChange(e) {
  //   console.log(e.target.getContent());
  // },

  render: function(){
    return(
      <div>
        <textarea onChange={this.props.onChange} name="contribution" 
          rows="5" className="form-control" 
          placeholder="Your amazing story body">
        </textarea>
        <button onClick={this.props.onCheck} className="btn btn-warning">Check Grammar</button>
                  
        <input type="submit" className="btn btn-success" value="Submit"/>
      </div>
    );
  }
});

module.exports = {
  ContributionContainer: ContributionContainer
}


// TinyMCE Component

// <TinyMCE
//  content="<p>This is the initial content of the editor</p>"
//  config={{
//    plugins: 'autolink link image lists print preview',
//    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
//  }}
//  onChange={this.handleEditorChange} 
// />