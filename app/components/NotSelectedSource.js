var React = require('react');

var NotSelectedSource = React.createClass({

  onAddSourceClick: function(){
    this.props.handleSourceChange(this.props.source);
    this.props.onMenuToggle();
  },

  render: function(){
    return (
      <div className="item" onClick={this.onAddSourceClick}>
        {this.props.source}
      </div>
    )
  }
});

module.exports = NotSelectedSource;
