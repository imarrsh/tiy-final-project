var React = require('react');

// layouts
var layout = require('./layouts/general.jsx')
, AppWrapper = layout.AppWrapper
, ContainerRow = layout.ContainerRow
, AppHeaderLogin = layout.AppHeaderLogin
, Row = layout.Row;


var AppOverview = React.createClass({
  render: function(){
    return(
      <AppWrapper>
        <AppHeaderLogin />

        <section className="hero" id="hero">
          <ContainerRow>

            <div className="heading-tagline">
              <h1>Tell a story with&nbsp;others</h1>
              <h2>Gather ‘round and collaborate on shared stories.</h2>
            </div>

          </ContainerRow>
        </section>

        <section id="feature-grammar" className="feature-section">
          <ContainerRow>

            <div className="col-md-6">
              <h1>Check Your Grammar</h1>
              <p>With the <a href="https://languagetool.org">LangaugeTool API</a>, we provide a way for you to check the grammar of your stories and contributions. Simply enter your story text and hit the Check Grammar Button.</p>
            </div>

            <div className="col-md-6">
              <img src="images/grammar.png" alt="Grammar check"/>
            </div>

          </ContainerRow>
        </section>

        <section id="feature-collaborate" className="feature-section">
          <ContainerRow>
            
            <div className="col-md-5">
              <img src="images/collab.png" alt="Collaboration is easy!"/>
            </div>

            <div className="col-md-7">
              <h1>Collaborate With Others</h1>
              <p>Contributing to an existing story is easy&mdash;click or tap on an existing story and click Contribute. Whether you are starting a new story or adding a segment conribution, you can easily add or edit segments with story editor with a click of a button.</p>
            </div>

          </ContainerRow>
        </section>

        <section id="feature-vote" className="feature-section">
          <ContainerRow>

            <div className="col-md-8">
              <h1>Vote on Segments</h1>
              <p>Make it known that the story segment is good! Upvote&ndash;or downvote&ndash;each segment to let contributors know how their content was received.</p>
            </div>

            <div className="col-md-4">
              <img src="images/vote.png" alt="Upvote and downvote segments"/>
            </div>

          </ContainerRow>
        </section>

        <section id="get-started" className="cta">
          <ContainerRow>

              <div className="center-content">
                <a href="#login/">Get Started!</a>
              </div>

          </ContainerRow>
        </section>


      </AppWrapper>
    );
  }
});

module.exports = {
  AppOverview: AppOverview
};
