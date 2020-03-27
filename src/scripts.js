const populatePage = document.querySelector('.populate-recipes');

window.onload = function() {
  populateRecipes();
  randomizeUser();
}

function populateRecipes() {
  recipeData.forEach(recipe => {
    populatePage.innerHTML +=
    `<section class="recipe-card" id="${recipe.id}">
      <img class="recipe-img" id="${recipe.id}" src="${recipe.image}">
      <section class="recipe-card-info">
      <h2 class="recipe-title">${recipe.name}</h2>
      <img class="heart" src="http://www.w3.org/2000/svg">
      </section>
    </section>`
  });
}


function randomizeUser() {
  //create a new User each time the page loads
  // let user = new User()
  // call user.createPantry
}

//search recipes:
//function searchTasks(event) {
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
// }
//
//
