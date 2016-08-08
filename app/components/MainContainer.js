var React = require('react');
var Movies = require('./Movies');
var PaginationLinks = require('./PaginationLinks');
var ViewToggleButton = require('./ViewToggleButton');
var ScrollTopButton = require('./ScrollTopButton');

var MainContainer = React.createClass({

  render: function(){

    var userButton;
    if (this.props.mobile){
      userButton = (<ScrollTopButton
        scrollTopVisible={this.props.scrollTopVisible}
        handleScrollTop={this.props.handleScrollTop}
      />)
    } else {
      userButton = (
        <ViewToggleButton
          itemView={this.props.itemView}
          handleViewChange={this.props.handleViewChange}
        />
      )
    };

    return (
      <div className={this.props.mobile ?
        "main-container-mobile" :
        "main-container"}
        >
        {userButton}
        <Movies
           movies={this.props.movies}
           gridLength={this.props.gridLength}
           mobile={this.props.mobile}
           itemView={this.props.itemView}
           rating={this.props.rating}
         />
      </div>
    )
  }
});

module.exports = MainContainer;
