var React = require('react')

var PaginationLinks = React.createClass({
  handleClick: function(pageNumber){
    this.props.handlePaginationClick(pageNumber);
  },
  createLinkArray: function(){
    var counter = this.props.current_page;
    var linkArray = [];

    if (counter > 1){
      counter -= 1
    };

    for (var i=counter; i < counter + 4; i++){
      if (i > this.props.total_pages){
        break;
      }
      linkArray.push(i);
    };
    return linkArray;
  },

  render: function(){
    this.createLinkArray();
    var linkArray = this.createLinkArray();
    var paginationLinks = linkArray.map(function(pageNumber){
      return (<a className={pageNumber === this.props.current_page ? "active item" : "item"}
                onClick={this.handleClick.bind(null,pageNumber)}>{pageNumber}</a>)
      }.bind(this))
    paginationLinks.unshift(<a className="item" onClick={this.handleClick.bind(null,1)}>1st</a>)
    paginationLinks.push(<a className="item" onClick={this.handleClick.bind(null,this.props.total_pages)}>{this.props.total_pages}</a>)
    return (
      <div className="ui pagination menu">
        {paginationLinks}
      </div>
    )
  }
});

module.exports = PaginationLinks;
