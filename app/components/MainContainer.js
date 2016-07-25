var React = require('react');
var Movies = require('./Movies');
var PaginationLinks = require('./PaginationLinks')

var MainContainer = React.createClass({
  render: function(){
    return (
      <div className="ui grid">
        <Movies movies={this.props.movies}/>
        <PaginationLinks current_page={this.props.current_page}
                 total_pages={this.props.total_pages}
                 total_entries={this.props.total_entries}
                 handlePaginationClick={this.props.handlePaginationClick}/>
      </div>
    )
  }
});

module.exports = MainContainer;
