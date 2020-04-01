const chai = require('chai');
const expect = chai.expect;

const User = require('../src/User');
const Recipe = require('../src/Recipe');
const Pantry = require('../src/Pantry')

describe('Pantry', function () {

  let user;
  let pantry;
  let recipe;


  this.beforeEach(function () {
    recipe = new Recipe({
      "id": 595736,
      "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
      "ingredients": [{

          "name": "wheat flour",
          "id": 20081,
          "quantity": {
            "amount": 1.5,
            "unit": "c"
          }
        },
        {
          "name": "bicarbonate of soda",
          "id": 18372,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        },
        {
          "name": "eggs",
          "id": 1123,
          "quantity": {
            "amount": 1,
            "unit": "large"
          }
        },
        {
          "name": "sucrose",
          "id": 19335,
          "quantity": {
            "amount": 0.5,
            "unit": "c"
          }
        },
        {
          "name": "instant vanilla pudding",
          "id": 19206,
          "quantity": {
            "amount": 3,
            "unit": "Tbsp"
          }
        },
        {
          "name": "brown sugar",
          "id": 19334,
          "quantity": {
            "amount": 0.5,
            "unit": "c"
          }
        },
        {
          "name": "salt",
          "id": 2047,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        },
        {
          "name": "fine sea salt",
          "id": 1012047,
          "quantity": {
            "amount": .24,
            "unit": "servings"
          }
        },
        {
          "name": "semi sweet chips",
          "id": 10019903,
          "quantity": {
            "amount": 2,
            "unit": "c"
          }
        },
        {
          "name": "unsalted butter",
          "id": 1145,
          "quantity": {
            "amount": 0.5,
            "unit": "c"
          }
        },
        {
          "name": "vanilla",
          "id": 2050,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        }
      ],
      "instructions": [{
          "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
          "number": 1
        },
        {
          "instruction": "Add egg and vanilla and mix until combined.",
          "number": 2
        },
        {
          "instruction": "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.",
          "number": 3
        },
        {
          "instruction": "Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt.",
          "number": 4
        },
        {
          "instruction": "Bake for 9 to 10 minutes, or until you see the edges start to brown.",
          "number": 5
        },
        {
          "instruction": "Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce.",
          "number": 6
        }
      ],
      "name": "Loaded Chocolate Chip Pudding Cookie Cups",
      "tags": [
        "antipasti",
        "starter",
        "snack",
        "appetizer",
        "antipasto",
        "hor d'oeuvre"
      ]
    })
    user = new User({
      "name": "Saige O'Kon",
      "id": 1,
      "pantry": [{
          "ingredient": 11477,
          "amount": 4
        },
        {
          "ingredient": 11297,
          "amount": 4
        },
        {
          "ingredient": 1082047,
          "amount": 10
        },
        {
          "ingredient": 20081,
          "amount": 1
        },
        {
          "ingredient": 11215,
          "amount": 5
        },
        {
          "ingredient": 2047,
          "amount": 6
        },
        {
          "ingredient": 1123,
          "amount": 8
        }
      ]
    })
    pantry = user.createPantry();

  });

  it("Should be an instance of Pantry", function () {
    expect(pantry).to.be.an.instanceof(Pantry)
  });

  it("Should return this.pantry with updated object that have names and costs", function () {

    pantry.newPantry(user.pantry)

    expect(pantry.newPantry(user.pantry)).to.deep.equal([{
      "name": "zucchini squash",
      "cost": 742,
      "ingredient": 11477,
      "amount": 4
    }, {
      "name": "flat leaf parsley leaves",
      "cost": 1030,
      "ingredient": 11297,
      "amount": 4
    }, {
      "name": "kosher salt",
      "cost": 972,
      "ingredient": 1082047,
      "amount": 10
    }, {
      "name": "wheat flour",
      "cost": 142,
      "ingredient": 20081,
      "amount": 1
    }, {
      "name": "whole garlic clove",
      "cost": 220,
      "ingredient": 11215,
      "amount": 5
    }, {
      "name": "salt",
      "cost": 280,
      "ingredient": 2047,
      "amount": 6
    }, {
      "name": "eggs",
      "cost": 472,
      "ingredient": 1123,
      "amount": 8
    }])
  });

  it("Should return an array of recipe ingredient names", function () {
    expect(pantry.findRecipeNames(recipe)).to.deep.equal(["wheat flour",
      "bicarbonate of soda", "eggs", "sucrose", "instant vanilla pudding",
      "brown sugar", "salt", "fine sea salt", "semi sweet chips",
      "unsalted butter", "vanilla"
    ])
  });

  it("Should return an array of ingredient names in the pantry", function () {

    expect(pantry.findPantryNames()).to.deep.equal(['zucchini squash',
      'flat leaf parsley leaves', 'kosher salt', 'wheat flour',
      'whole garlic clove', "salt", "eggs"
    ])

  });

  it("Should compare the two arrays of ingredient names in the pantry", function () {
    let pantryNames = ['zucchini squash',
      'flat leaf parsley leaves', 'kosher salt', 'wheat flour',
      'whole garlic clove', "salt", "eggs"
    ]

    let recipeIngredientNames = ["wheat flour",
      "bicarbonate of soda", "eggs", "sucrose", "instant vanilla pudding",
      "brown sugar", "salt", "fine sea salt", "semi sweet chips",
      "unsalted butter", "vanilla"
    ]

    expect(pantry.checkUserHasIngredients(recipeIngredientNames, pantryNames)).to.equal(false)

  });

  it("Should compare the two arrays of ingredient names in the pantry", function () {
    let pantryNames = ["wheat flour",
      "bicarbonate of soda", "eggs", "sucrose", "instant vanilla pudding",
      "brown sugar", "salt", "fine sea salt", "semi sweet chips",
      "unsalted butter", "vanilla"
    ]

    let recipeIngredientNames = ["wheat flour",
      "bicarbonate of soda", "eggs", "sucrose", "instant vanilla pudding",
      "brown sugar", "salt", "fine sea salt", "semi sweet chips",
      "unsalted butter", "vanilla"
    ]

    expect(pantry.checkUserHasIngredients(recipeIngredientNames, pantryNames)).to.equal(true)

  });

  it("Should return an array of the names of missing ingredients", function () {

    let pantryNames = ['zucchini squash',
      'flat leaf parsley leaves', 'kosher salt', 'wheat flour',
      'whole garlic clove', "salt", "eggs"
    ]

    let recipeIngredientNames = ["wheat flour",
      "bicarbonate of soda", "eggs", "sucrose", "instant vanilla pudding",
      "brown sugar", "salt", "fine sea salt", "semi sweet chips",
      "unsalted butter", "vanilla"
    ]

    let needThisStuff = ["bicarbonate of soda", "sucrose",
      "instant vanilla pudding", "brown sugar", "fine sea salt",
      "semi sweet chips", "unsalted butter", "vanilla"
    ]

    expect(pantry.returnMissingNames(recipeIngredientNames, pantryNames)).to.deep.equal(needThisStuff)

  });

  it("Should return all missing ingredient objects", function () {

    let needThisStuff = ["bicarbonate of soda", "sucrose",
      "instant vanilla pudding", "brown sugar", "fine sea salt",
      "semi sweet chips", "unsalted butter", "vanilla"
    ]

    expect(pantry.getNeededIngredients(needThisStuff, recipe)).to.deep.equal([{
        name: 'bicarbonate of soda',
        id: 18372,
        quantity: {
          amount: 0.5,
          unit: 'tsp'
        },
        totalCostOfIngredient: 291
      },
      {
        name: 'sucrose',
        id: 19335,
        quantity: {
          amount: 0.5,
          unit: 'c'
        },
        totalCostOfIngredient: 451
      },
      {
        name: 'instant vanilla pudding',
        id: 19206,
        quantity: {
          amount: 3,
          unit: 'Tbsp'
        },
        totalCostOfIngredient: 1980
      },
      {
        name: 'brown sugar',
        id: 19334,
        quantity: {
          amount: 0.5,
          unit: 'c'
        },
        totalCostOfIngredient: 279.5
      },
      {
        name: 'fine sea salt',
        id: 1012047,
        quantity: {
          amount: 0.24,
          unit: 'servings'
        },
        totalCostOfIngredient: 126.72
      },
      {
        name: 'semi sweet chips',
        id: 10019903,
        quantity: {
          amount: 2,
          unit: 'c'
        },
        totalCostOfIngredient: 506
      },
      {
        name: 'unsalted butter',
        id: 1145,
        quantity: {
          amount: 0.5,
          unit: 'c'
        },
        totalCostOfIngredient: 308.5
      },
      {
        name: 'vanilla',
        id: 2050,
        quantity: {
          amount: 0.5,
          unit: 'tsp'
        },
        totalCostOfIngredient: 463
      }
    ])
  });

  it("Should return an array of obects with a name and amount needed for recipe", function () {

    let needThisStuff = [{
        name: 'bicarbonate of soda',
        id: 18372,
        quantity: {
          amount: 0.5,
          unit: 'tsp'
        }
      },
      {
        name: 'sucrose',
        id: 19335,
        quantity: {
          amount: 0.5,
          unit: 'c'
        }
      },
      {
        name: 'instant vanilla pudding',
        id: 19206,
        quantity: {
          amount: 3,
          unit: 'Tbsp'
        }
      },
      {
        name: 'brown sugar',
        id: 19334,
        quantity: {
          amount: 0.5,
          unit: 'c'
        }
      },
      {
        name: 'fine sea salt',
        id: 1012047,
        quantity: {
          amount: 24,
          unit: 'servings'
        }
      },
      {
        name: 'semi sweet chips',
        id: 10019903,
        quantity: {
          amount: 2,
          unit: 'c'
        }
      },
      {
        name: 'unsalted butter',
        id: 1145,
        quantity: {
          amount: 0.5,
          unit: 'c'
        }
      },
      {
        name: 'vanilla',
        id: 2050,
        quantity: {
          amount: 0.5,
          unit: 'tsp'
        }
      }
    ]
    expect(pantry.getAmountsNeeded(needThisStuff, recipe)).to.deep.equal([{
        name: 'bicarbonate of soda',
        amountNeeded: 1
      },
      {
        name: 'sucrose',
        amountNeeded: 1
      },
      {
        name: 'instant vanilla pudding',
        amountNeeded: 3
      },
      {
        name: 'brown sugar',
        amountNeeded: 1
      },
      {
        name: 'fine sea salt',
        amountNeeded: 1
      },
      {
        name: 'semi sweet chips',
        amountNeeded: 2
      },
      {
        name: 'unsalted butter',
        amountNeeded: 1
      },
      {
        name: 'vanilla',
        amountNeeded: 1
      }
    ])
  });

  it("Should return total cost of all missing items", function () {

    let needThisStuff = [{
        name: 'bicarbonate of soda',
        amountNeeded: 1
      },
      {
        name: 'sucrose',
        amountNeeded: 1
      },
      {
        name: 'instant vanilla pudding',
        amountNeeded: 3
      },
      {
        name: 'brown sugar',
        amountNeeded: 1
      },
      {
        name: 'fine sea salt',
        amountNeeded: 1
      },
      {
        name: 'semi sweet chips',
        amountNeeded: 2
      },
      {
        name: 'unsalted butter',
        amountNeeded: 1
      },
      {
        name: 'vanilla',
        amountNeeded: 1
      }
    ];

    expect(pantry.getTotalCost(needThisStuff, ingredientsData)).to.deep.equal(66.00)
  });

  it("Should return total cost of all missing items", function () {

    let needThisStuff = [{
        name: 'bicarbonate of soda',
        amountNeeded: 1
      },
      {
        name: 'sucrose',
        amountNeeded: 1
      },
      {
        name: 'instant vanilla pudding',
        amountNeeded: 3
      },
      {
        name: 'brown sugar',
        amountNeeded: 1
      },
      {
        name: 'fine sea salt',
        amountNeeded: 1
      },
      {
        name: 'semi sweet chips',
        amountNeeded: 2
      },
      {
        name: 'unsalted butter',
        amountNeeded: 1
      },
      {
        name: 'vanilla',
        amountNeeded: 1
      }
    ]

    expect(pantry.createGroceryList(needThisStuff, 66.00)).to.deep.equal({
      "ingredients": [{
          name: 'bicarbonate of soda',
          amountNeeded: 1
        },
        {
          name: 'sucrose',
          amountNeeded: 1
        },
        {
          name: 'instant vanilla pudding',
          amountNeeded: 3
        },
        {
          name: 'brown sugar',
          amountNeeded: 1
        },
        {
          name: 'fine sea salt',
          amountNeeded: 1
        },
        {
          name: 'semi sweet chips',
          amountNeeded: 2
        },
        {
          name: 'unsalted butter',
          amountNeeded: 1
        },
        {
          name: 'vanilla',
          amountNeeded: 1
        }
      ],
      "totalCost": 66.00
    })
  });

  it("Should return a grocery list of items, amounts and total cost", function () {

    let pantryNames = ['zucchini squash',
      'flat leaf parsley leaves', 'kosher salt', 'wheat flour',
      'whole garlic clove', "salt", "eggs"
    ]

    let recipeIngredientNames = ["wheat flour",
      "bicarbonate of soda", "eggs", "sucrose", "instant vanilla pudding",
      "brown sugar", "salt", "fine sea salt", "semi sweet chips",
      "unsalted butter", "vanilla"
    ]

    expect(pantry.missingGroceryItems(recipeIngredientNames, pantryNames, recipe)).to.deep.equal({
      "ingredients": [{
          name: 'bicarbonate of soda',
          amountNeeded: 1
        },
        {
          name: 'sucrose',
          amountNeeded: 1
        },
        {
          name: 'instant vanilla pudding',
          amountNeeded: 3
        },
        {
          name: 'brown sugar',
          amountNeeded: 1
        },
        {
          name: 'fine sea salt',
          amountNeeded: 1
        },
        {
          name: 'semi sweet chips',
          amountNeeded: 2
        },
        {
          name: 'unsalted butter',
          amountNeeded: 1
        },
        {
          name: 'vanilla',
          amountNeeded: 1
        }
      ],
      "totalCost": 66.00
    });
  });

  it("Should return on object that we have but not enough of", function () {

    let pantryNames = ['zucchini squash',
      'flat leaf parsley leaves', 'kosher salt', 'wheat flour',
      'whole garlic clove', "salt", "eggs"
    ]

    let recipeIngredientNames = ["wheat flour",
      "bicarbonate of soda", "eggs", "sucrose", "instant vanilla pudding",
      "brown sugar", "salt", "fine sea salt", "semi sweet chips",
      "unsalted butter", "vanilla"
    ]

    expect(pantry.checkCurrentIngredients(recipeIngredientNames, pantryNames, recipe)).to.deep.equal({
      ingredients: [{
        name: 'wheat flour',
        amountNeeded: 1
      }],
      totalCost: 1.42
    })
  });

  it("Should return the an object with a combination of all properties that match", function () {

    let x = {
      ingredients: [{
          name: 'bicarbonate of soda',
          amountNeeded: 1
        },
        {
          name: 'sucrose',
          amountNeeded: 1
        },
        {
          name: 'instant vanilla pudding',
          amountNeeded: 3
        },
        {
          name: 'brown sugar',
          amountNeeded: 1
        },
        {
          name: 'fine sea salt',
          amountNeeded: 1
        },
        {
          name: 'semi sweet chips',
          amountNeeded: 2
        },
        {
          name: 'unsalted butter',
          amountNeeded: 1
        },
        {
          name: 'vanilla',
          amountNeeded: 1
        }
      ],
      totalCost: 66
    }
    let y = {
      ingredients: [{
        name: 'wheat flour',
        amountNeeded: 1
      }],
      totalCost: 1.42
    }

    expect(pantry.combineGroceryLists(x, y)).to.deep.equal({
      name: 'Grocery List',
      ingredients: [{
          name: 'bicarbonate of soda',
          amountNeeded: 1
        },
        {
          name: 'sucrose',
          amountNeeded: 1
        },
        {
          name: 'instant vanilla pudding',
          amountNeeded: 3
        },
        {
          name: 'brown sugar',
          amountNeeded: 1
        },
        {
          name: 'fine sea salt',
          amountNeeded: 1
        },
        {
          name: 'semi sweet chips',
          amountNeeded: 2
        },
        {
          name: 'unsalted butter',
          amountNeeded: 1
        },
        {
          name: 'vanilla',
          amountNeeded: 1
        },
        {
          name: 'wheat flour',
          amountNeeded: 1
        }
      ],
      totalCost: 67.42
    });
  });

  it("Should return Lets Cook!!!! All ingredients are found", function () {

    let recipe = {
      "id": 595736,
      "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
      "ingredients": [{
          "name": "wheat flour",
          "id": 20081,
          "quantity": {
            "amount": 1.5,
            "unit": "c"
          }
        },
        {
          "name": "eggs",
          "id": 1123,
          "quantity": {
            "amount": 1,
            "unit": "large"
          }
        },
        {
          "name": "salt",
          "id": 2047,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        },
        {
          "name": "zucchini squash",
          "id": 11477,
          "quantity": {
            "amount": 2,
            "unit": ""
          }
        },
        {
          "name": "flat leaf parsley leaves",
          "id": 11297,
          "quantity": {
            "amount": 0.25,
            "unit": "cup"
          }
        },
        {
          "name": "kosher salt",
          "id": 1082047,
          "quantity": {
            "amount": 0.25,
            "unit": "teaspoon"
          }
        },
        {
          "name": "whole garlic clove",
          "id": 11215,
          "quantity": {
            "amount": 1,
            "unit": "clove"
          }
        }
      ],
      "instructions": [{
          "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
          "number": 1
        },
        {
          "instruction": "Add egg and vanilla and mix until combined.",
          "number": 2
        },
        {
          "instruction": "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.",
          "number": 3
        },
        {
          "instruction": "Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt.",
          "number": 4
        },
        {
          "instruction": "Bake for 9 to 10 minutes, or until you see the edges start to brown.",
          "number": 5
        },
        {
          "instruction": "Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce.",
          "number": 6
        }
      ],
      "name": "Loaded Chocolate Chip Pudding Cookie Cups",
      "tags": [
        "antipasti",
        "starter",
        "snack",
        "appetizer",
        "antipasto",
        "hor d'oeuvre"
      ]
    }

    let user = {
      "name": "Saige O'Kon",
      "id": 1,
      "pantry": [{
          ingredient: 11477,
          amount: 4,
          name: 'zucchini squash',
          cost: 742
        },
        {
          ingredient: 11297,
          amount: 4,
          name: 'flat leaf parsley leaves',
          cost: 1030
        },
        {
          ingredient: 1082047,
          amount: 10,
          name: 'kosher salt',
          cost: 972
        },
        {
          ingredient: 20081,
          amount: 5,
          name: 'wheat flour',
          cost: 142
        },
        {
          ingredient: 11215,
          amount: 5,
          name: 'whole garlic clove',
          cost: 220
        },
        {
          ingredient: 2047,
          amount: 6,
          name: 'salt',
          cost: 280
        },
        {
          ingredient: 1123,
          amount: 8,
          name: 'eggs',
          cost: 472
        }
      ]
    }

    let pantry = new Pantry(user);

    expect(pantry.verifyIngredients(recipe)).to.equal("Lets Cook!!!!")
  });

  it("Should return an object that represents a grocery list", function () {

    let recipe = {
      "id": 595736,
      "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
      "ingredients": [{
          "name": "wheat flour",
          "id": 20081,
          "quantity": {
            "amount": 1.5,
            "unit": "c"
          }
        },
        {
          "name": "eggs",
          "id": 1123,
          "quantity": {
            "amount": 1,
            "unit": "large"
          }
        },
        {
          "name": "salt",
          "id": 2047,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        },
        {
          "name": "zucchini squash",
          "id": 11477,
          "quantity": {
            "amount": 2,
            "unit": ""
          }
        },
        {
          "name": "flat leaf parsley leaves",
          "id": 11297,
          "quantity": {
            "amount": 0.25,
            "unit": "cup"
          }
        },
        {
          "name": "kosher salt",
          "id": 1082047,
          "quantity": {
            "amount": 0.25,
            "unit": "teaspoon"
          }
        },
        {
          "name": "whole garlic clove",
          "id": 11215,
          "quantity": {
            "amount": 1,
            "unit": "clove"
          }
        }
      ],
      "instructions": [{
          "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
          "number": 1
        },
        {
          "instruction": "Add egg and vanilla and mix until combined.",
          "number": 2
        },
        {
          "instruction": "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.",
          "number": 3
        },
        {
          "instruction": "Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt.",
          "number": 4
        },
        {
          "instruction": "Bake for 9 to 10 minutes, or until you see the edges start to brown.",
          "number": 5
        },
        {
          "instruction": "Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce.",
          "number": 6
        }
      ],
      "name": "Loaded Chocolate Chip Pudding Cookie Cups",
      "tags": [
        "antipasti",
        "starter",
        "snack",
        "appetizer",
        "antipasto",
        "hor d'oeuvre"
      ]
    }

    let user = {
      "name": "Saige O'Kon",
      "id": 1,
      "pantry": [{
          ingredient: 11477,
          amount: 1,
          name: 'zucchini squash',
          cost: 742
        },
        {
          ingredient: 11297,
          amount: 4,
          name: 'flat leaf parsley leaves',
          cost: 1030
        },
        {
          ingredient: 1082047,
          amount: 10,
          name: 'kosher salt',
          cost: 972
        },
        {
          ingredient: 20081,
          amount: 5,
          name: 'wheat flour',
          cost: 142
        },
        {
          ingredient: 11215,
          amount: 5,
          name: 'whole garlic clove',
          cost: 220
        },
        {
          ingredient: 2047,
          amount: 6,
          name: 'salt',
          cost: 280
        },
        {
          ingredient: 1123,
          amount: 8,
          name: 'eggs',
          cost: 472
        }
      ]
    }

    let pantry = new Pantry(user);

    expect(pantry.verifyIngredients(recipe)).to.deep.equal({
      ingredients: [{
        name: 'zucchini squash',
        amountNeeded: 1
      }],
      totalCost: 7.42
    });
  });

  it("Should return a grocery list", function () {

    expect(pantry.verifyIngredients(recipe)).to.deep.equal({
      name: 'Grocery List',
      ingredients: [{
          name: 'bicarbonate of soda',
          amountNeeded: 1
        },
        {
          name: 'sucrose',
          amountNeeded: 1
        },
        {
          name: 'instant vanilla pudding',
          amountNeeded: 3
        },
        {
          name: 'brown sugar',
          amountNeeded: 1
        },
        {
          name: 'fine sea salt',
          amountNeeded: 1
        },
        {
          name: 'semi sweet chips',
          amountNeeded: 2
        },
        {
          name: 'unsalted butter',
          amountNeeded: 1
        },
        {
          name: 'vanilla',
          amountNeeded: 1
        },
        {
          name: 'wheat flour',
          amountNeeded: 1
        }
      ],
      totalCost: 67.42
    });

  });
})