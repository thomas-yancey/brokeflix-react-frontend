const React = require('react');

const NotSelectedSource = React.createClass({

  onAddSourceClick () {
    this.props.handleSourceChange(this.props.source);
    this.props.onMenuToggle();
  },

  render () {
    return (
      <div className="item" onClick={this.onAddSourceClick}>
        {this.props.source}
      </div>
    )
  }

});

module.exports = NotSelectedSource;
