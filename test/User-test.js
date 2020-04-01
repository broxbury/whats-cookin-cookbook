const chai = require('chai');
const expect = chai.expect;

const User = require('../src/User');
const Recipe = require('../src/Recipe');

describe('User', function() {
  let user;
  let recipe1;
  let recipe2;
  let recipe3;
  beforeEach(function() {
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
          "amount": 5
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
    });

    recipe1 = new Recipe({
      "id": 595736,
      "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
      "ingredients": [{
        "id": 20081,
        "quantity": {
          "amount": 1.5,
          "unit": "c"
        }
      }],
      "name": "Loaded Chocolate Chip Pudding Cookie Cups",
    });

    recipe2 = new Recipe({
      "id": 678353,
      "image": "https://spoonacular.com/recipeImages/678353-556x370.jpg",
      "ingredients": [{
        "id": 1009016,
        "quantity": {
          "amount": 1.5,
          "unit": "cups"
        }
      }],
      "name": "Maple Dijon Apple Cider Grilled Pork Chops"
    });

    recipe3 = new Recipe({
      "id": 412309,
      "image": "https://spoonacular.com/recipeImages/412309-556x370.jpeg",
      "ingredients": [{
        "id": 1002030,
        "quantity": {
          "amount": 4,
          "unit": "teaspoons"
        }
      }],
      "name": "Dirty Steve's Original Wing Sauce",
    });
  });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', function() {
    expect(user).to.be.an.instanceof(User);
  });

  it('should store ingredients in the pantry', function() {
    expect(user.pantry).to.deep.equal([{
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
        "amount": 5
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
    ]);
  });

  it('should instantiate a new Pantry instance', function() {
    user.createPantry();
    expect(user.createPantry()).to.eql({
      pantryId: 1,
      pantry: [{
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
    });
  });

  it('should add a recipe to the favRecipes array', function() {

    expect(user.favRecipes, []);
    user.addFavRecipe(recipe1);
    user.addFavRecipe(recipe2);
    user.addFavRecipe(recipe3);
    expect(user.favRecipes).to.deep.equal([recipe1, recipe2, recipe3]);
  });

  it('should remove a recipe from the favRecipes array', function() {

    user.addFavRecipe(recipe1);
    user.addFavRecipe(recipe2);
    user.addFavRecipe(recipe3);

    user.removeFavRecipe(recipe2);
    expect(user.favRecipes).to.deep.equal([recipe1, recipe3]);

  });

  it('should add a recipe to the cookBook array', function() {

    expect(user.cookBook, []);
    user.addToCookBook(recipe1);
    user.addToCookBook(recipe2);
    user.addToCookBook(recipe3);
    expect(user.cookBook).to.deep.equal([recipe1, recipe2, recipe3]);
  });

  it('should remove a recipe from the cookBook array', function() {

    user.addToCookBook(recipe1);
    user.addToCookBook(recipe2);
    user.addToCookBook(recipe3);

    user.removeFromCookBook(recipe2);
    expect(user.cookBook).to.deep.equal([recipe1, recipe3]);

  });
});
