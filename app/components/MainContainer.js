var React = require('react');
var Movies = require('./Movies');
var PaginationLinks = require('./PaginationLinks')

var MainContainer = React.createClass({

  onViewChange: function(){
    this.props.handleViewChange();
  },

  render: function(){
    return (
      <div className={this.props.mobile ?
        "main-container-mobile" :
        "main-container"}
        >
        <button
          className={this.props.mobile ?
            "tooltip" :
            "ui button view-button"
          }
          onClick={this.onViewChange}>
            {this.props.itemView ?
              "Grid View" :
              "Item view"
            }
        </button>
        <Movies
           movies={this.props.movies}
           gridLength={this.props.gridLength}
           mobile={this.props.mobile}
           itemView={this.props.itemView}
         />
      </div>
    )
  }
});

module.exports = MainContainer;
