const populatePage = document.querySelector('.populate-recipes');

window.onload = populateRecipes();


function populateRecipes() {
  recipeData.forEach(recipe => {
    populatePage.innerHTML +=
    `<section class="recipe-card" id="${recipe.id}">
      <img class="recipe-img" id="${recipe.id}" src="${recipe.image}">
    </section>`
  });
}
