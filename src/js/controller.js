import * as model from './model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';


const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

if(module.hot){
  module.hot.accept();
}

const controlRecipes = async function() {
  try{
  const id = window.location.hash.slice(1);

  if(!id) return;

  recipeView.renderSpinner();

  resultsView.update(model.getSearchResultsPage());

  await model.loadRecipe(id);

  const {recipe} =  model.state;

  recipeView.render(model.state.recipe);

    // console.log(recipe);
  }catch(err){
    recipeView.renderError();
  }
};

const controlSearchResults =  async function(){
try{
  resultsView.renderSpinner();
  const query = searchView.getQuery();
  if(!query) return;
  await model.loadSearchResults(query);
  resultsView.render(model.getSearchResultsPage());
  paginationView.render(model.state.search)
}catch(err){
  console.log(err);
}
}

const controlPagination = function(goToPage){
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search)
}

const controlServings = function(newServings){
  model.updateServings(newServings);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}
const controlAddBookmark = function(){
  model.addBookMark(model.state.recipe);
  console.log(model.state.recipe);
}

const init = function(){
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandleSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();