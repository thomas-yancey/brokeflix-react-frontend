const React = require('react');

const ViewToggleButton = React.createClass({

  onViewChange () {
    this.props.handleViewChange();
  },

  render () {
    return (
      <button className = "ui primary button view"
        style={{'position': 'fixed',
                'right': '0',
                'marginRight': '20px'
              }}
        onClick={this.onViewChange}>
          {this.props.itemView ?
            "Grid View" :
            "List view"
          }
      </button>
    )
  }
});

module.exports = ViewToggleButton;
