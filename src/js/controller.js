import * as model from './model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';


const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////
if(module.hot){
  module.hot.accept();
}

const controlRecipes = async function() {
  try{
  const id = window.location.hash.slice(1);

  if(!id) return;

  recipeView.renderSpinner();

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
  // console.log(model.state.search.results);
  resultsView.render(model.state.search.results);
}catch(err){
  console.log(err);
}
}


const init = function(){
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandleSearch(controlSearchResults);
};
init();