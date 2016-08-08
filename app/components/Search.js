var React = require('react');


var Search = React.createClass({

  getDefaultProps: function(){
    titleSearch: "";
  },

  onTextChange: function(e){
    this.props.handleTitleSearchChange(e.target.value)
  },

  onSearchClick: function(){
    this.props.getMoviesFromServer();
  },

  render: function(){
    return (
      <div className="title-search-container">
        <div className={this.props.mobile ? "ui fluid input" : "ui fluid input" }>
          <input type="text"
            placeholder="title, actor or director"
            onChange={this.onTextChange}
            value={this.props.titleSearch}
          />
        </div>
      </div>
    )
  }
});

module.exports = Search;
