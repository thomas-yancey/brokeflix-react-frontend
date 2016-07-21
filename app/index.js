var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var _ = require('underscore');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var ReactTransitionGroup = require('react-addons-transition-group');

// You can add recipes to local storage
// You can
var App = React.createClass({
  render: function(){
    return(
      <RecipeContainer/>
    )
  }
});

var RecipeContainer = React.createClass({
  getInitialState: function() {

    var currRecipesStorage = localStorage.recipes;
    if (currRecipesStorage === undefined){
      localStorage.setItem('recipes','')
      currRecipesStorage = localStorage.recipes;
    };

    var currRecipes = {};
    if (!$.isEmptyObject(currRecipesStorage)){
      currRecipes = JSON.parse(currRecipesStorage);
    };

    var sortedRecipes = this.sortRecipes(currRecipes);

    return ({
      recipes: sortedRecipes
    })
  },

  getLocalStorageRecipes: function(){
    var recipeString = localStorage.recipes;

    recipes = {};
    if (recipeString.length === 0){
      recipes = {}
    } else {
      recipes = JSON.parse(recipeString)
    };
    return recipes;
  },

  sortRecipes: function(recipeObject){
    sortedRecipes = {};
    Object.keys(recipeObject).sort().map(function(item){
      sortedRecipes[item] = recipeObject[item]
    });
    return sortedRecipes;
  },

  submitEdit: function(updateItem,updateIngredients,item){
    var currRecipes = this.state.recipes;
    delete currRecipes[item];
    currRecipes[updateItem] = updateIngredients;
    localStorage.setItem('recipes', JSON.stringify(currRecipes));
    var newRecipes = JSON.parse(localStorage.recipes);
    var sortedRecipes = this.sortRecipes(newRecipes);
    this.setState({
      recipes: sortedRecipes
    })
  },

  handleDelete: function(item){
    var recipes = this.state.recipes;
    delete recipes[item]
    localStorage.setItem('recipes',JSON.stringify(recipes));
    newRecipes = JSON.parse(localStorage.recipes);
    this.setState({
      recipes: newRecipes
    })
  },

  handleRecipeSubmit: function(item,ingredients){
    var recipes = this.state.recipes;
    recipes[item] = ingredients;
    localStorage.setItem('recipes', JSON.stringify(recipes));
    var currRecipes = JSON.parse(localStorage.recipes);
    var sortedRecipes = this.sortRecipes(currRecipes);
    this.setState({
      recipes: sortedRecipes
    });
  },

  render: function(){
    return(
      <div className="container">
        <h1>Recipes</h1>
        <NewRecipe handleRecipeSubmit={this.handleRecipeSubmit}/>
          <RecipeList recipes={this.state.recipes}
            submitEdit={this.submitEdit}
            handleDelete={this.handleDelete}/>
      </div>
    )
  }
});

var RecipeList = React.createClass({

  render:function(){
    var recipes = Object.keys(this.props.recipes).map(function(recipeKey,idx){
      return (
        <Recipe key={idx + recipeKey}
         item={recipeKey}
         ingredients={this.props.recipes[recipeKey]}
         submitEdit={this.props.submitEdit}
         handleDelete={this.props.handleDelete}/>)
      }.bind(this))
    return(
        <div className="card-columns">
          {recipes}
        </div>
    )
  }
});

var Recipe = React.createClass({
  getInitialState: function(){
    return ({
      visibleList: false,
      visibleModal: false,
    })
  },

  visibleClick: function(){
    this.setState({
      visibleList: !this.state.visibleList
    })
  },

  deleteClick: function(){
    this.props.handleDelete(this.props.item);
  },

  editClick: function(){
    this.setState({
      visibleModal: true
    })
  },

  handleModalClose: function(){
    this.setState({
      visibleModal: false
    })
  },

  render: function(){

    var ingredientList = this.props.ingredients.map(function(ingredient,idx){
      return(
        <li className="list-group-item" key={ingredient + idx}>
          {ingredient}
        </li>
      );
    });

    var ingredientsUl = ""
    if (this.state.visibleList){
      ingredientsUl = (
        <ul className="list-group list-group-flush" key={this.props.ingredients}>
          {ingredientList}
        </ul>
      )
    };

    return(
    <div className="card">
      <div className="card-block">
        <h2 className="card-title">{this.props.item}</h2>
        <button className="btn btn-primary" onClick={this.visibleClick}>View</button>
        <button className="btn" onClick={this.deleteClick}>Delete</button>
        <button className="btn" onClick={this.editClick}>Edit</button>
        <EditRecipe
          submitEdit={this.props.submitEdit}
          ingredients={this.props.ingredients}
          item={this.props.item}
          visibleModal={this.state.visibleModal}
          handleModalClose={this.handleModalClose}/>
        <ReactCSSTransitionGroup key={this.props.item}
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {ingredientsUl}
        </ReactCSSTransitionGroup>
      </div>
    </div>
    )
  }
});

var EditRecipe = React.createClass({
  getInitialState: function(){
    return ({
      item: this.props.item,
      ingredients: this.props.ingredients.toString()
    })
  },

  itemChange: function(e){
    this.setState({
      item: e.target.value
    })
  },

  ingredientsChange: function(e){
    this.setState({
      ingredients: e.target.value
    })
  },

  closeModal: function(){
    this.props.handleModalClose();
  },

  handleSubmit: function(e){
    e.preventDefault();
    var item = this.state.item.trim();
    var ingredients = this.state.ingredients.trim().split(",");
    this.props.submitEdit(item, ingredients, this.props.item)
    this.closeModal()
  },

  render: function(){
    return(
      <div className="modal" style={this.props.visibleModal ? {display: 'block'} : {display: 'none'}}>
        <div className="modal-content">
          <span onClick={this.closeModal} className="close">x</span><br/>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group row">
                <label className="col-sm-2 form-control-label">Item</label>
                <div className="col-sm-10">
                  <input className="form-control" onChange={this.itemChange} type="text" value={this.state.item}/>
                </div>

                <label className="col-sm-2 form-control-label">Ingredients</label>
                <div className="col-sm-10">
                  <textarea className="form-control" value={this.props.ingredients} rows="5" id="comment">
                  </textarea>
                </div>
                <input type="submit" value="edit recipe" className="btn"/>
              </div>
          </form>
        </div>
      </div>
    )
  }
});

var NewRecipe = React.createClass({
  getInitialState: function(){
    return ({
      item: "",
      ingredients: ""
    })
  },

  itemChange: function(e){
    this.setState({
      item: e.target.value
    })
  },

  ingredientsChange: function(e){
    this.setState({
      ingredients: e.target.value
    })
  },

  OnFormSubmit: function(e){
    e.preventDefault();
    var item = this.state.item.trim();
    var ingredients = this.state.ingredients.trim().split(",");
    this.props.handleRecipeSubmit(item, ingredients, this.props.item);
    this.setState({
      item: "",
      ingredients: ""
    })
  },


  render: function(){
    return(
      <form onSubmit={this.OnFormSubmit}>
        <div className="form-group row">
          <label className="col-sm-2 form-control-label">New Item</label>
          <div className="col-sm-10">
            <input className="form-control" onChange={this.itemChange} value={this.state.item} type="text"/>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-2 form-control-label">Ingredients</label>
          <div className="col-sm-10">
            <input className="form-control"
              onChange={this.ingredientsChange}
              value={this.state.ingredients}
              placeholder="enter ingredients comma seperated"
              type="text"/>
          </div>
        </div>
        <div className="form-group row">
            <button type="submit" className="btn btn-primary">Add item</button>
        </div>
      </form>
    )
  }
});

ReactDOM.render(<App/>,document.getElementById('app'))
