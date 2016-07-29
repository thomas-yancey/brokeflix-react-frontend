var React = require('react');
var SourceCheckbox = require('./SourceCheckbox');

var SourceFilter = React.createClass({

  createSources: function(){
    this.getInitialState
    return this.props.allSources.map(function(source){
      return(
        <SourceCheckbox
          key={source + this.props.selectedSources}
          source={source}
          selectedSources={this.props.selectedSources}
          handleSourceChange={this.props.handleSourceChange}
        />
      )
    }.bind(this))
  },

  render: function(){
    return(
      <div className="source-filter">
        <div className="ui relaxed horizontal divided list">
          <h4>Sources</h4>
          {this.props.allSources.length > 0 ? this.createSources() : null}
        </div>
      </div>
    )
  }
})

module.exports = SourceFilter;
