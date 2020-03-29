const populatePage = document.querySelector('.populate-recipes');
const filterFavoriteRecipes = document.querySelector('.favorites-btn');
const filterCookbook = document.querySelector('.cookbook-btn');
const mainSearchInput = document.querySelector('.search-all');
// const displayRecipeCard = document.querySelector('.display-recipe');
// const ingredientsList = document.querySelector('.ingredients-list');
const playBTN = document.getElementById('play')

mainSearchInput.addEventListener('input', searchRecipes);
populatePage.addEventListener('click', function() {
  createRecipe(event)
  checkRecipe(event)
  favoriteRecipeHandler(event)
  cookBookHandler(event)
});

let user;
let currentRecipe;
let recipes = [];

window.onload = function () {
  populateRecipes();
  randomizeUser();
}

function populateRecipes() {
  recipeData.forEach(recipe => {
    populatePage.innerHTML +=
      `<section class="recipe-card" data-id="${recipe.id}">
      <img class="recipe-img" data-id="${recipe.id}" src="${recipe.image}">
      <section class="recipe-card-info">
        <section class="title-text">
          <h2 class="recipe-title">${recipe.name}</h2>
        </section>
        <section class="btn-container">
          <img class="recipe-card-images heart-img" data-id="${recipe.id}" src='../assets/heart-circle-outline.svg'>
          <img class="recipe-card-images book-img" data-id="${recipe.id}" src='../assets/book-outline.svg'>
        </section>
      </section>
    </section>`
  });
}

// function populateRecipesArray() {
//   recipeData.forEach(recipe => {
//     if (!recipes.includes(recipe)) {
//       recipes.push(recipe);
//     }
//   });
// }


function randomizeUser() {
  let randomIndex = Math.floor(Math.random() * usersData.length);
  user = new User(usersData[randomIndex]);
  return user
}

//search recipes:
function searchRecipes(event) {
  let filterSearch = event.target.value.toUpperCase();

  recipeData.forEach(recipe => {
    let recipeId = recipe.id;
    let recipeTitle = recipe.name.toUpperCase();
    if (recipeTitle.includes(`${filterSearch}`)) {
      showResults(recipeId);
    } else {
      hideResults(recipeId);
    }
  });
}

function hideResults(recipeId) {
  let hideRecipe = document.querySelector(`.recipe-card[data-id="${recipeId}"]`);
  hideRecipe.classList.add('hidden');
}

function showResults(recipeId) {
  let showRecipe = document.querySelector(`.recipe-card[data-id="${recipeId}"]`);
  showRecipe.classList.remove('hidden');
}


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

function closeWindow() {
  let displayCard = document.querySelector('.display-recipe');
  displayCard.classList.toggle('hidden')
}

function favoriteRecipeHandler(event) {
  let currentId = event.target.dataset.id
  let currentRecipe = recipeData.find(recipe => recipe.id == currentId);
  // console.log(currentRecipe)
  if (event.target.classList.contains("heart-img")) {
    if (user.favRecipes.includes(currentRecipe)) {
      user.removeFavRecipe(currentRecipe)
      deactiveFavImg(currentId)
      // console.log("remove", user.favRecipes)
    } else {
      user.addFavRecipe(currentRecipe)
      activeFavImg(currentId)
      // console.log("add", user.favRecipes)
    }
  }
}

function activeFavImg(currentId) {
  let activeImg = document.querySelector(`.heart-img[data-id='${currentId}']`)
  activeImg.src = "../assets/heart-circle.svg"
  return
}

function deactiveFavImg(currentId) {
  let deActive = document.querySelector(`.heart-img[data-id='${currentId}']`)
  deActive.src = "../assets/heart-circle-outline.svg"
  return
}

function cookBookHandler(event) {
  let currentId = event.target.dataset.id
  let currentRecipe = recipeData.find(recipe => recipe.id == currentId);
  // console.log(currentRecipe)
  if (event.target.classList.contains("book-img")) {
    if (user.cookBook.includes(currentRecipe)) {
      user.removeFromCookBook(currentRecipe)
      deactiveBookImg(currentId)
      // console.log("remove", user.favRecipes)
    } else {
      user.addToCookBook(currentRecipe)
      activeBookImg(currentId)
      // console.log("add", user.favRecipes)
    }
  }
}

function activeBookImg(currentId) {
  let activeImg = document.querySelector(`.book-img[data-id='${currentId}']`)
  activeImg.src = "../assets/book.svg"
  return
}

function deactiveBookImg(currentId) {
  let deActive = document.querySelector(`.book-img[data-id='${currentId}']`)
  deActive.src = "../assets/book-outline.svg"
  return
}