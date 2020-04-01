if (typeof module !== 'undefined') {
  data = require('../data/ingredients');
  ingredientsData = data.ingredientsData;
  Pantry = require('../src/Pantry');
}

class User {
  constructor(person) {
    this.id = person.id;
    this.name = person.name;
    this.favRecipes = [];
    this.cookBook = [];
    this.pantry = person.pantry;
  }

  createPantry() {
    const pantry = new Pantry(this);
    return pantry;
  }

  addFavRecipe(recipe) {
    if (!this.favRecipes.includes(recipe)) {
      this.favRecipes.push(recipe);
    }
    return this.favRecipes
  }

  removeFavRecipe(recipe) {
    let deleteRecipe = this.favRecipes.indexOf(recipe);
    this.favRecipes.splice(deleteRecipe, 1);
  }

  addToCookBook(recipe) {
    if (!this.cookBook.includes(recipe)) {
      this.cookBook.push(recipe);
    }
  }

  removeFromCookBook(recipe) {
    let deleteRecipe = this.cookBook.indexOf(recipe);
    this.cookBook.splice(deleteRecipe, 1);
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}