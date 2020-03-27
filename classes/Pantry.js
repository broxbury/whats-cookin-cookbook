const data = require('../data/ingredients');
const allIngredients = data.ingredientsData;

class Pantry {
  constructor(user) {
    this.pantryId = user.id
    this.pantry = this.newPantry(user.pantry);
  }
  // METHODS THAT ARE USED FOR KEY:VALUE PAIRS //
  newPantry(pantry) {
    let newPantry = pantry.reduce((acc, listItem1) => {
      allIngredients.forEach((listItem2) => {
        if (listItem2.id === listItem1.ingredient) {
          listItem1['name'] = listItem2.name
          listItem1['cost'] = listItem2.estimatedCostInCents
          acc.push(listItem1)
          return
        }
      })
      return acc
    }, [])
    return newPantry
  }

  // -START-- MethodHandler1 --START- //
  verifyIngredients(recipe) {
    let recipeNames = this.findRecipeNames(recipe)

    let pantryIngredientNames = this.findPantryNames()
    let hasIngredients =
      this.checkUserHasIngredients(recipeNames, pantryIngredientNames)
    if (hasIngredients === false) {
      let missingGroceryList1 = this.missingGroceryItems(recipeNames, pantryIngredientNames, recipe);
      let missingGroceryList2 = this.checkCurrentIngredients(recipeNames, pantryIngredientNames, recipe)
      let finalGroceryList = this.combineGroceryLists(missingGroceryList1, missingGroceryList2);
      return finalGroceryList
    } else if (hasIngredients === true) {
      let doubleCheck = this.checkCurrentIngredients(recipeNames, pantryIngredientNames, recipe)
      if (doubleCheck.ingredients.length === 0) {
        return "Lets Cook!!!!"
      } 
      return doubleCheck
    }
  }
  // -END-- MethodHandler1 --END- //

  // -START-- Secondary MethodHandlers --START--//
  missingGroceryItems(recipeNames, pantryIngredientNames, recipe) {
    let missingIngredients =
      this.returnMissingNames(recipeNames, pantryIngredientNames);
    let neededIngredients = this.getNeededIngredients(missingIngredients, recipe);
    let amountOfNeededIngredients = this.getAmountsNeeded(neededIngredients, recipe);
    let totalCost = this.getTotalCost(amountOfNeededIngredients, recipe);
    let groceryList = this.createGroceryList(amountOfNeededIngredients, totalCost);
    return groceryList
  }

  checkCurrentIngredients(recipeNames, pantryIngredientNames, recipe) {
    let matchedIngredients = this.returnMatchingNames(recipeNames, pantryIngredientNames)
    let pantryIngredients = this.getPantryIngredients(matchedIngredients);
    let missingAmounts = this.checkAmountsNeeded(pantryIngredients, recipe);
    let missingCost = this.getTotalCost(missingAmounts, recipe);
    let groceryList = this.createGroceryList(missingAmounts, missingCost);
    return groceryList
  }
  // -END-- Secondary MethodHandlers --END- //

  // -START-- These are the function declorations for MethodHandler 1 --START- //
  findRecipeNames(recipe) {
    let recipeName = recipe.ingredients.map(ingredient => {
      return ingredient.name
    })
    return recipeName
  }

  findPantryNames() {
    let pantryIngredientNames = this.pantry.map(ingredient => {
      return ingredient.name
    })
    return pantryIngredientNames
  }

  checkUserHasIngredients(recipeNames, pantryIngredientNames) {
    return recipeNames.every(ingredient =>
      pantryIngredientNames.includes(ingredient))
  }

  returnMissingNames(recipeNames, pantryIngredientNames) {
    var missingNames = recipeNames.filter((name) => !pantryIngredientNames.includes(name));
    return missingNames
  }

  returnMatchingNames(recipeNames, pantryIngredientNames) {
    var missingNames = recipeNames.filter((name) => pantryIngredientNames.includes(name));
    return missingNames
  }

  getNeededIngredients(missingIngredients, recipe) {
    let missing = recipe.ingredients.reduce((acc, ingredient) => {
      missingIngredients.forEach((name) => {
        if (name === ingredient.name) {
          acc.push(ingredient)
          return acc
        }
      })
      return acc
    }, [])
    return missing
  }

  getPantryIngredients(missingIngredients) {
    let missing = this.pantry.reduce((acc, ingredient) => {
      missingIngredients.forEach((name) => {
        if (name === ingredient.name) {
          acc.push(ingredient)
          return acc
        }
      })
      return acc
    }, [])
    return missing
  }

  getAmountsNeeded(neededIngredients, recipe) {
    let neededAmounts = neededIngredients.reduce((acc, ingredient) => {
      recipe.ingredients.forEach((item) => {
        let needed = {}
        if (item.name === ingredient.name) {
          let amounts = item.quantity.amount;
          let rounded = Math.ceil(amounts)
          needed.name = item.name;
          needed.amountNeeded = rounded
          acc.push(needed)
        }
      })
      return acc
    }, []);
    return neededAmounts
  }

  checkAmountsNeeded(pantryIngredients, recipe) {
    let neededAmounts = pantryIngredients.reduce((acc, ingredient) => {
      recipe.ingredients.forEach((item) => {
        let needed = {}
        if ((item.name === ingredient.name && ingredient.amount <= item.quantity.amount)) {
          let recipeAmount = item.quantity.amount;
          let pantryAmount = ingredient.amount;
          let difference = Math.abs(pantryAmount - recipeAmount);
          let rounded = Math.ceil(difference);
          needed.name = item.name;
          needed.amountNeeded = rounded;
          acc.push(needed)
        }
      })
      return acc
    }, []);
    return neededAmounts
  }

  getTotalCost(amountOfNeededIngredients) {
    let cost = allIngredients.reduce((num, item) => {
      amountOfNeededIngredients.forEach((ingredient) => {
        if (item.name === ingredient.name) {
          num += (ingredient.amountNeeded * item.estimatedCostInCents)
        }
      })
      return num
    }, 0)
    cost = cost / 100
    return cost
  }

  createGroceryList(amountOfNeededIngredients, totalCost) {
    let groceryList = {}
    groceryList.ingredients = amountOfNeededIngredients
    groceryList.totalCost = totalCost
    return groceryList
  }

  combineGroceryLists(missingGroceryList1, missingGroceryList2) {
    let finalList = {
      name: "Grocery List",
      ingredients: [],
      totalCost: undefined
    };

    missingGroceryList1.ingredients.forEach((list1) => {
      if (!finalList.ingredients.includes(list1)) {
        finalList.ingredients.push(list1)
        return finalList.ingredients
      }
    })
    missingGroceryList2.ingredients.forEach((list2) => {
      if (!finalList.ingredients.includes(list2)) {
        finalList.ingredients.push(list2)
        return finalList.ingredients
      }
    })
    finalList.totalCost = (missingGroceryList1.totalCost + missingGroceryList2.totalCost)
    return finalList
  }
}
// -END-- These are the function declorations for MethodHandler 1 --END- //
module.exports = Pantry;