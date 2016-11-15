var $ = require('jquery');
var React = require('react');

// layouts
var AppWrapper = require('./layouts/general.jsx').AppWrapper;
var ContainerRow = require('./layouts/general.jsx').ContainerRow;


var StoryCreateComponent = React.createClass({
  
  getInitialState: function () {
    return {
      storyBody: ''
    }
  },

  handleInputChange: function(e){
    this.setState({[e.target.name]: e.target.value})
  },

  handleGrammarCheck: function(e){
    e.preventDefault();
    
    var storyBody = this.state.storyBody;
    
    //######################
    // LanguageTool API 
    //######################
    
    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Accept', 'application/json');
      }
    })

    var checkUrl = 'https://languagetool.org/api/v2/check';
    var data = {
      text: storyBody,
      language: 'en-US',
      enabledOnly: false
    };
    
    //######################
    // After the Deadline API
    //######################
    
    // var data = encodeURI(storyBody);
    // var key = 'key=storytelling5e836ae5397a524dc3c0a7c92c0a5cbc';

    // var checkUrl = 'http://service.afterthedeadline.com/checkDocument';
    // checkUrl += '?' + key + '&data=' + data;

    //######################
    // TextGears API
    //######################
    
    // var text = encodeURI(storyBody);
    // // var key = 'key=GwOf05rYyp7z5LOh';
    // var key = 'key=DEMO_KEY';

    // var checkUrl = 'https://api.textgears.com/check.php';
    // checkUrl += '?' + key + '&text=' + text;


    //######################
    // jQuery POST to all APIs
    //######################

    $.post(checkUrl, data) // for when the data is separate; LangTool
    // $.post(checkUrl) // for when the data is all one url string; TextGears, AtD
      .then(function(response){
        console.log(response);
      });

  },

  render: function(){
    
    return(
      <AppWrapper>
        <ContainerRow>

          <div>
            <form onSubmit={this.handleGrammarCheck}>
              <textarea onChange={this.handleInputChange} name="storyBody" rows="5" className="form-control"></textarea>
              <input type="submit" value="Check Grammar" className="btn btn-primary"/>
            </form>
          </div>

        </ContainerRow>
      </AppWrapper>
    );
  }

});

module.exports = {
  StoryCreateComponent: StoryCreateComponent
};
