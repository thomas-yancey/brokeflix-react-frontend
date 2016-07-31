var React = require('react');

var SourceCheckbox = React.createClass({
  onCheckBoxClick: function(){
    this.props.handleSourceChange(this.props.source);
  },

  contains: function(value){
    for (var i=0; i < this.props.selectedSources.length; i++){
      if (this.props.selectedSources[i] === value){
        return true;
      };
    };
    return false;
  },

  render: function(){
    return (
      <div className="item">
        <div className="ui checkbox">
          <input type="checkbox" onClick={this.onCheckBoxClick}
              checked={this.contains(this.props.source) ? "checked" : null}/>
          <label>
            {this.props.source}
          </label>
        </div>
      </div>
    )
  }
})

module.exports = SourceCheckbox;
