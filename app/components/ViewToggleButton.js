var React = require('react');

var ViewToggleButton = React.createClass({

  onViewChange: function(){
    this.props.handleViewChange();
  },



  render: function(){
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
