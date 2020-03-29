const populatePage = document.querySelector('.populate-recipes');
const filterFavoriteRecipes = document.querySelector('.favorites-btn');
const filterCookbook = document.querySelector('.cookbook-btn');
const mainSearchInput = document.querySelector('.search-all');
// const displayRecipeCard = document.querySelector('.display-recipe');
// const ingredientsList = document.querySelector('.ingredients-list');
const playBTN = document.getElementById('play')

mainSearchInput.addEventListener('input', searchTasks);
populatePage.addEventListener('click', function() {
  createRecipe(event)
  checkRecipe(event)
});

let user;
let currentRecipe;
let recipes = [];

window.onload = function() {
  populateRecipes();
  randomizeUser();
}

function populateRecipes() {
  recipeData.forEach(recipe => {
    populatePage.innerHTML +=
      `<section class="recipe-card" id="${recipe.id}">
      <img class="recipe-img" data-id="${recipe.id}" src="${recipe.image}">
      <section class="recipe-card-info">
        <section class="title-text">
          <h2 class="recipe-title">${recipe.name}</h2>
        </section>
        <section class="btn-container">
          <img class="recipe-card-images heart-img" data-id="${recipe.id}" src='../assets/heart-circle-outline.svg'>
          <img class="recipe-card-images play-img" data-id="${recipe.id}" src='../assets/play-outline.svg'>
          <img class="recipe-card-images book-img" data-id="${recipe.id}" src='../assets/book-outline.svg'>
        </section>
      </section>
    </section>`
  });
}


function randomizeUser() {
  let randomIndex = Math.floor(Math.random() * usersData.length);
   user = new User(usersData[randomIndex]);
   return user
}

//search recipes:
function searchTasks(event) {
  //   var filterSearch = event.target.value.toUpperCase();
  //
  //   for (var i = 0; i < toDoObjectArray.length; i++) {
  //     var toDoListIdToHide = toDoObjectArray[i].id;
  //     var toDoTitle = toDoObjectArray[i].taskTitle.toUpperCase();
  //
  //       if (toDoTitle.includes(`${filterSearch}`)) {
  //         showResults(toDoListIdToHide);
  //       } else {
  //         hideResults(toDoListIdToHide);
  //     }
  //   }
}
//
//

function createRecipe(event) {
  let currentRecipeId = event.target.dataset.id;
  if (event.target.classList.contains('recipe-img')) {
    currentRecipe = recipeData.find(recipe => recipe.id == currentRecipeId);
    let isActive = recipes.find(recipe => recipe.id == currentRecipeId);

    if (!isActive) {
      let recipe = new Recipe(currentRecipe);
      recipes.push(recipe)
      recipeDisplay(recipe)
    } else {
      recipeDisplay(isActive)
    }
  }
  //instantiates Recipe recipeCard
  //invokes recipeDisplay with recipe info

}

function recipeDisplay(recipe) {
  let displayCard = document.querySelector('.display-recipe');
  let ingredientsList = document.querySelector(".ingredients-list");
  let instructionList = document.querySelector(".instruction-list");
  document.getElementById('recipe-img-large').src = recipe.image;
  document.getElementById('recipe-title').innerHTML = recipe.name;

  ingredientsList.innerHTML = "";
  instructionList.innerHTML = "";

  recipe.ingredients.forEach(ingredient => {
    let currentRecipeName = ingredient.name
    ingredientsList.innerHTML += `
    <li>${currentRecipeName}</li>
    `
  });

  recipe.instructions.forEach(instruction => {
    let currentInstruction = instruction.instruction;
    instructionList.innerHTML += `
    <li>${currentInstruction}</li>
    `
  });

  displayCard.classList.toggle('hidden');
  //displays second page with recipe info
}

function checkRecipe(event) {
  let ingredientsList = document.querySelector(".ingredients-list");
  let instructionList = document.querySelector(".instruction-list");
  let currentPantry = user.createPantry()
  if (event.target.classList.contains('play-img')) {
    ingredientsList.innerHTML = "";
    instructionList.innerHTML = "";
    let groceryList = currentPantry.verifyIngredients(currentRecipe)
    displayGroceryList(groceryList);
  }
}

function displayGroceryList(groceryList) {
  let ingredientsList = document.querySelector(".ingredients-list");
  let instructionList = document.querySelector(".instruction-list");

  groceryList.ingredients.forEach(ingredient => {
    let currentIngredientName = ingredient.name
    let itemCost = ingredient.amountNeeded
    ingredientsList.innerHTML += `
    <li>You are missing ${currentIngredientName} and we need ${itemCost} more!</li>
    `
  });
  
  instructionList.innerHTML = `
  <h2>Estimated Cost Of Ingredients</h2>
  <p>$${groceryList.totalCost}</p>
  `
}
