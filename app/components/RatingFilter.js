var React = require('react');

var RatingFilter = React.createClass({
  getInitialState: function(){
    return ({
      visibleMenu: false
    })
  },

  handleMetaCriticClick: function(e){
    this.props.handleRatingChange("metascore")
  },

  handleTomatoClick: function(e){
    this.props.handleRatingChange("tomato_meter")
  },

  onToggleMenuOpen: function(){
    this.setState({
      visibleMenu: !this.state.visibleMenu
    })
  },

  render: function(){
    var rottenTomatoesURL = "./rottentomatoes_full.png";
    var metascoreURL = "./metacritic_full.png";
    return (
      <div className="rating-container">
        <div className= {this.state.visibleMenu ?
                "ui fluid labeled icon dropdown button active visible" :
                "ui fluid labeled icon dropdown button"
             }
             onClick={ this.onToggleMenuOpen }
        >
          <i className="filter icon"></i>
          <div className="item" >
            <img src={this.props.ratingOrder === "metascore" ?
                      metascoreURL : rottenTomatoesURL
                    }
                    style={{'width': '75px'}}
            />
          </div>
          <div className={this.state.visibleMenu ?
                            "menu transition visible" :
                            "menu transition hidden"
                          }
              style={{'width': '130px'}}
          >
            <div className="ui item" onClick={this.handleTomatoClick}>
              <img className="ui image"
                src={rottenTomatoesURL}
                style={{'width': '100px'}}
              />
            </div>
            <div className="ui item" onClick={this.handleMetaCriticClick}>
              <img className="ui image"
                src={metascoreURL}
                style={{'width': '100px'}}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = RatingFilter;
