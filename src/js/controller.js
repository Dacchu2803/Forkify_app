import * as model from './model.js'
import recipeView from './views/recipeView.js';


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

const controlRecipes = async function() {
  try{
  const id = window.location.hash.slice(1);

  if(!id) return;

  recipeView.renderSpinner();

  await model.loadRecipe(id);

  const {recipe} =  model.state;

  recipeView.render(model.state.recipe);


    console.log(recipe);
  }catch(err){
    recipeView.renderError();
  }
};

const init = function(){
  recipeView.addHandlerRender(controlRecipes);
};
init();