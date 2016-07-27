var React = require('react');


var TitleSearch = React.createClass({

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
        <h4>Title search</h4>
        <div className="ui input">
          <input type="text"
            placeholder="Title search"
            onChange={this.onTextChange}
            value={this.props.titleSearch}
          />
        </div>
        <button className="ui button" onClick={this.onSearchClick}>Search title</button>
      </div>
    )
  }
});

module.exports = TitleSearch;
