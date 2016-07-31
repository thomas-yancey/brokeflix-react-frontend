var React = require('react');

var SelectedSource = React.createClass({
  onDeleteIconClick: function(){
    this.props.handleSourceChange(this.props.source);
  },

  render: function(){
    return (
      <a className="ui label transition visible" style={{'display': 'inline-block'}}>
        {this.props.source}
        <i
          className="delete icon"
          onClick={this.onDeleteIconClick}
        >
        </i>
      </a>
    )
  }
});

module.exports = SelectedSource;
