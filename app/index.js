var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
  getInitialState: function(){
    return ({
      userInput: '# Albis haud tostos nubes suique flammis\n## Aureus in sanguis indefessus\nLorem markdownum displicet te fama amnes cuncta terrificam inque Demoleonta. Minus ad ignes mandabat dixerit superstitibus memor colentes meae stirpe longe servent modico, inustus?\n> Igne sororum? Plus erat abstulit latuit ira dixit **Busirin**. Tum adhuc\n> placido territa discrimina tale sit *caput calcata* sonuit, pueri apium resque\nSonum intervenit animae et sua tam lenita pudet; Hersilie cognataque pensa coniugialia ab unoque omnis. [Ima](http://fratrum.net/) loquendi frater sternentem, custodia est, oculorum ad virga quoque ut cupido. Celsoque citiussui ibi est veri quam tamen fuisset placidis residens datur!\n- Bacchi et locorum summo in tenuit orbes\n- Neque nec exul ait mihi capacis verba'
    })
  },

  handleTextChange: function(input){
    this.setState({
      userInput: input
    });
  },

  render: function(){
    return(
      <div className="container">
        <div className="column">
          <div className="col-md-6">
            <Editor userInput ={this.state.userInput} handleTextChange={this.handleTextChange} />
          </div>
          <div className="col-md-6">
            <Previewer userInput={this.state.userInput}/>
          </div>
        </div>
      </div>
    )
  }
});

var Editor = React.createClass({
  textChange: function(e){
    this.props.handleTextChange(e.target.value)
  },

  render: function(){
    return(
      <textarea rows="20" style={{width: '100%'}} onChange={this.textChange}>
        {this.props.userInput}
      </textarea>
    )
  }
});

var Previewer = React.createClass({

  createMarkup: function(input) {
    return {__html: marked(input)};
  },

  render: function(){
    return(
      <div dangerouslySetInnerHTML={this.createMarkup(this.props.userInput)} />
    )
  }
});

ReactDOM.render(<App/>,
  document.getElementById('app')
)
