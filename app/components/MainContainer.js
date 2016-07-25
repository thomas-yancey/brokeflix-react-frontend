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
      <div className="main-container">
        <div className={this.state.itemView ? "container" : null}>
          <div onClick={this.handleViewChange}>itemviewchange</div><br/>
          <br/>
          <Movies movies={this.props.movies}
                  itemView={this.state.itemView}/>
          <PaginationLinks current_page={this.props.current_page}
                   total_pages={this.props.total_pages}
                   total_entries={this.props.total_entries}
                   handlePaginationClick={this.props.handlePaginationClick}/>
        </div>
      </div>
    )
  }
});

module.exports = MainContainer;
