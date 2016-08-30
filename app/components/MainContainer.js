var React = require('react');
var Movies = require('./Movies');
var PaginationLinks = require('./PaginationLinks');
var ViewToggleButton = require('./ViewToggleButton');
var ScrollTopButton = require('./ScrollTopButton');

var MainContainer = (props) => {

  var userButton;
  if (props.mobile){
    userButton = (
      <ScrollTopButton
        scrollTopVisible={props.scrollTopVisible}
        handleScrollTop={props.handleScrollTop}
      />
    )
  } else {
    userButton = (
      <ViewToggleButton
        itemView={props.itemView}
        handleViewChange={props.handleViewChange}
      />
    )
  };

  return (
    <div className={props.mobile ?
      "main-container-mobile" :
      "main-container"}
      >
      {userButton}
      <Movies
         movies={props.movies}
         gridLength={props.gridLength}
         mobile={props.mobile}
         itemView={props.itemView}
         rating={props.rating}
         personSearch={props.personSearch}
       />
    </div>
  )
}

module.exports = MainContainer;
