import * as model from './model.js'

import icons from "url:../img/icons.svg";
import recipeView from './views/recipeView.js';
const recipeContainer = document.querySelector('.recipe');

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

const renderSpinner = function(parentEl){
  const markUp = 
  `<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
    parentEl.innerHTML = '';
    parentEl.insertAdjacentHTML('afterbegin',markUp); 
}

const controlRecipes = async function() {
  try{
  const id = window.location.hash.slice(1);

  if(!id) return;

  renderSpinner(recipeContainer);

  await model.loadRecipe(id);

  const {recipe} =  model.state;

  recipeView.render(model.state.recipe);


    console.log(recipe);
  }catch(err){
    alert(err);
  }
}

window.addEventListener('hashchange',controlRecipes);
window.addEventListener('load',controlRecipes);