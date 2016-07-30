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
        <PaginationLinks
           current_page={this.props.current_page}
           total_pages={this.props.total_pages}
           total_entries={this.props.total_entries}
           handlePaginationClick={this.props.handlePaginationClick}
         />
      </div>
    )
  }
});

module.exports = MainContainer;
