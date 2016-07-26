var React = require('react');

var SourceFilter = React.createClass({

  onSourceClick: function(e){
    this.collectsources()
    this.props.handleSelectedSources
  },

  contains: function(value){
    for (var i=0; i < this.props.allSources.length; i++){
      if (this.props.allSources[i] === value){
        return true;
      };
    };
    return false;
  },

  createSources: function(){
    this.getInitialState
    return this.props.allSources.map(function(source){
      return(
        <div className="item">
          <div className="ui checkbox">
            <input type="checkbox" checked={this.contains(source) ? "checked" : null}/>
            <label>
              {source}
            </label>
          </div>
        </div>
      )
    }.bind(this))
  },

  render: function(){
    return(
      <div className="source-filter">
        <div className="ui relaxed divided list">
          <h4>Sources</h4>
          {this.props.allSources.length > 0 ? this.createSources() : null}
        </div>
      </div>
    )
  }
})

module.exports = SourceFilter;
