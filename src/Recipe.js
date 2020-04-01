if (typeof module !== 'undefined') {
   data = require('../data/ingredients');
   ingredientsData = data.ingredientsData;
}


class Recipe {
  constructor(dish) {
    this.id = dish.id;
    this.image = dish.image;
    this.name = dish.name;
    this.ingredients = this.addProperties(dish.ingredients);
    this.instructions = dish.instructions;
    this.tags = dish.tags;
    this.cost = this.totalCost();
  }

  totalCost() {
    let cost = this.ingredients.reduce((acc, ingredient) => {
      let sumOfIngredients = acc += ingredient.totalCostOfIngredient;
      return sumOfIngredients;
    }, 0);
    this.cost = cost;
    return this.cost
  }

  addProperties(ingredients) {
    let ingredientsObjs = ingredients.reduce((acc, ingredient) => {
      ingredientsData.forEach(item => {
      let isInArray = acc.find(ingredient => ingredient['name'] === item.name);
        if (ingredient.id === item.id && !isInArray) {
          ingredient['name'] = item.name;
          ingredient['totalCostOfIngredient'] = item.estimatedCostInCents * ingredient.quantity.amount;
          acc.push(ingredient);
        };
      });
      return acc;
    }, []);
    return ingredientsObjs;
  }

  returnDirections() {
    return this.instructions
  }

  // returnNeededIngredients(userIngredients) {
  //
  // }
}
if (typeof module !== 'undefined') {
  module.exports = Recipe;
}
