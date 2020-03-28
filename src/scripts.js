const populatePage = document.querySelector('.populate-recipes');
const filterFavoriteRecipes = document.querySelector('.favorites-btn');
const filterCookbook = document.querySelector('.cookbook-btn');
const mainSearchInput = document.querySelector('.search-all');

mainSearchInput.addEventListener('input', searchTasks);
populatePage.addEventListener('click', createRecipe);


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
  let user = new User(usersData[randomIndex]);
  user.createPantry();
  console.log(user);
  console.log(user.createPantry());
  //create a new User each time the page loads
  // let user = new User()
  // call user.createPantry
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
    let currentRecipe = recipeData.find(recipe => recipe.id == currentRecipeId);
    let isActive = recipes.find(recipe => recipe.id == currentRecipeId);

    if (!isActive) {
      let recipe = new Recipe(currentRecipe);
      recipes.push(recipe)
      console.log(recipes);
    } else {
      recipeDisplay(isActive)
    }
  }
  //instantiates Recipe recipeCard
  //invokes recipeDisplay with recipe info

}

function recipeDisplay(recipe) {


  //displays second page with recipe info
}
