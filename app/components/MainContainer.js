var React = require('react');
var Movies = require('./Movies');
var PaginationLinks = require('./PaginationLinks')
var $ = require('jquery')

var MainContainer = React.createClass({
  getInitialState: function(){
    if ($(window).width() < 800) {
      return ({
        mobile: true,
        itemView: true
      })
    } else {
      return ({
        mobile: false
      })
    }
  },

  componentDidMount: function(){
    window.addEventListener("resize", this.updateDimensions);
  },

  updateDimensions: function(){
    if ($(window).width() < 800) {
      this.setState({
        mobile: true,
        itemView: true
      })
    } else {
      this.setState({
        mobile: false
      })
    }
  },


  handleViewChange: function(){
    this.setState({
      itemView: !this.state.itemView
    });
  },

  render: function(){
    return (
      <div className="ui thirteen wide column main-container">
          <button className={this.state.mobile ? "tooltip" : "ui right floated button"} onClick={this.handleViewChange}>{this.state.itemView ? "Grid View" : "Item view"}</button>
          <Movies movies={this.props.movies}
             itemView={this.state.itemView}
           />
          <PaginationLinks current_page={this.props.current_page}
             total_pages={this.props.total_pages}
             total_entries={this.props.total_entries}
             handlePaginationClick={this.props.handlePaginationClick}
           />
      </div>
    )
  }
});

module.exports = MainContainer;
