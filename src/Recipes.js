const Recipe = require("../Recipe")
const recipes = require('../data/recipes');
const allRecipes = recipes.recipeData;

class Recipes {
  constructor() {
    this.recipes = this.createRecipes();
  }

  createRecipes() {
    let all = allRecipes.reduce((arr, recipe) => {
      let newRecipe = new Recipe(recipe);
      arr.push(newRecipe)
      return arr
    }, [])
    return all
  }
}
module.exports = Recipes;