var React = require('react');
var Movies = require('./Movies');
var PaginationLinks = require('./PaginationLinks')

var MainContainer = React.createClass({
  getInitialState: function(){
    return({
      itemView: false
    })
  },

  handleViewChange: function(){
    this.setState({
      itemView: !this.state.itemView
    });
  },

  render: function(){
    return (
      <div className="ui thirteen wide column main-container">
          <button className="ui right floated button" onClick={this.handleViewChange}>{this.state.itemView ? "Grid View" : "Item view"}</button>
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
