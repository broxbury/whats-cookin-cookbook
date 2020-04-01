const populatePage = document.querySelector('.populate-recipes');
const navBtns = document.querySelector('.header-btns');
const mainSearchInput = document.querySelector('.search-all');
const recipeTagContainer = document.querySelector('.tag-container');

navBtns.addEventListener("click", function () {
  displayFavRecipes(event);
  displayCookbookRecipes(event);
});
mainSearchInput.addEventListener('input', searchRecipes);
recipeTagContainer.addEventListener('click', filterByTag)
populatePage.addEventListener('click', function () {
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
          <img class="recipe-card-images heart-img" data-id="${recipe.id}"
            src='../assets/heart-circle-outline.svg'>
          <img class="recipe-card-images book-img" data-id="${recipe.id}"
            src='../assets/book-outline.svg'>
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
    let currentIngredientName = ingredient.name
    ingredientsList.innerHTML += `
    <li>${currentIngredientName}: ${ingredient.quantity.amount} ${ingredient.quantity.unit}</li>
    `
  });

  recipe.instructions.forEach(instruction => {
    let currentInstruction = instruction.instruction;
    instructionList.innerHTML += `
    <li>${instruction.number}) ${currentInstruction}</li>
    `
  });

  displayCard.classList.toggle('hidden');
  //displays second page with recipe info
}

function checkRecipe(event) {
  let ingredientsList = document.querySelector(".ingredients-list");
  let instructionList = document.querySelector(".instruction-list");
  let currentPantry = user.createPantry();
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
  <h2>Cost Of Ingredients</h2>
  <p class="grocery-total">$${groceryList.totalCost}</p>
  `
}

function closeWindow() {
  let displayCard = document.querySelector('.display-recipe');
  displayCard.classList.toggle('hidden')
}

function favoriteRecipeHandler(event) {
  let currentId = event.target.dataset.id
  let currentRecipe = recipeData.find(recipe => recipe.id == currentId);
  if (event.target.classList.contains("heart-img")) {
    if (user.favRecipes.includes(currentRecipe)) {
      user.removeFavRecipe(currentRecipe)
      deactiveFavImg(currentId)
    } else {
      user.addFavRecipe(currentRecipe)
      activeFavImg(currentId)
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
  if (event.target.classList.contains("book-img")) {
    if (user.cookBook.includes(currentRecipe)) {
      user.removeFromCookBook(currentRecipe)
      deactiveBookImg(currentId)
    } else {
      user.addToCookBook(currentRecipe)
      activeBookImg(currentId)
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

function filterByTag(event) {
  let currentTag = event.target
  let tagId = event.target.id
  if (currentTag.classList.contains('tag-img')) {
    displayRecipesByTag(tagId);
  }
}

function displayRecipesByTag(tagId) {
  let allCards = document.querySelectorAll('.recipe-card');
  allCards.forEach(card => card.classList.remove('hidden'));

  recipeData.forEach(recipe => {
    let currentRecipe = document.querySelector(`.recipe-card[data-id="${recipe.id}"]`)
    if (!recipe.tags.includes(tagId)) {
      currentRecipe.classList.add('hidden');
    }
  });
}

function displayFavRecipes(event) {
  if (event.target.classList.contains("favorites-btn")) {
    let allRecipes = document.querySelectorAll(".recipe-card")
    allRecipes.forEach(recipe => recipe.classList.remove('hidden'));
    recipeData.forEach(recipe => {
      let currentRecipe = document.querySelector(`.recipe-card[data-id="${recipe.id}"]`);
      let isFavorite = user.favRecipes.find(dish => dish.id === recipe.id);
      if (!isFavorite) {
        currentRecipe.classList.add('hidden')
      }
    });
  }
}

function displayCookbookRecipes(event) {
  if (event.target.classList.contains("cookbook-btn")) {
    let allRecipes = document.querySelectorAll(".recipe-card")
    allRecipes.forEach(recipe => recipe.classList.remove('hidden'));
    recipeData.forEach(recipe => {
      let currentRecipe = document.querySelector(`.recipe-card[data-id="${recipe.id}"]`);
      let isInCookbook = user.cookBook.find(dish => dish.id === recipe.id);
      if (!isInCookbook) {
        currentRecipe.classList.add('hidden');
      }
    });
  }
}