import { createSlice } from "@reduxjs/toolkit";

import { Days, Meals } from "../days/EnumDays";


import { IngredientObject } from "../ingredients/IngredientObject";

//TODO: Define all inicial states
const initialState = {
  recipesSelected: [],
  totalRecipes: [],
  ingredientsList: {},
  curentDay: Days.MONDAY,
  currentMeal: Meals.BREAKFAST,
  totalRecipesAdded: 0,
  recipesPerDay: "",
};

//TODO: Add all reducers
export const RecipesSlide = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    totalRecipesAdd: (state, action) => {
      state.totalRecipes = action.payload;
    },
    modifyIngredientsList: (state, action) => {
      const id = action.payload.id;
      const type = action.payload.type;
      let ingredientsFromRecipe = state.totalRecipes.find((element) => element.id === id).ingredients;
      if (type === "Add") {
        ingredientsFromRecipe.map((ingredient) => {
          let ingredientToAdd = state.ingredientsList[ingredient.name];
          if (ingredientToAdd === undefined) {
            ingredientToAdd = new IngredientObject(
              ingredient.name,
              ingredient.amount,
              "lt"
            );
          } else {
            ingredientToAdd.amount += ingredient.amount;
          }
          
          let localIngredients = state.ingredientsList !== {} ? new Map(Object.entries(state.ingredientsList)) : new Map();
          localIngredients.set(ingredientToAdd.name,ingredientToAdd);
          state.ingredientsList = Object.fromEntries(localIngredients);
        });
      }
      if (type === "Del") {
        ingredientsFromRecipe.map((ingredient) => {
          let ingredientToDelete = state.ingredientsList[ingredient.name];
          ingredientToDelete.amount -= ingredient.amount;          
          let localIngredients = new Map(Object.entries(state.ingredientsList));
          localIngredients.set(ingredientToDelete.name,ingredientToDelete);
          state.ingredientsList = Object.fromEntries(localIngredients);
        });
      }
    },
    changeSaveState: (state, action) => {
      const id = action.payload.id;
      const type = action.payload.type;
      let localRecipes = state.totalRecipes;
      localRecipes.map((recipe) => {
        if (recipe.id === id) {
          recipe.isSaved = !recipe.isSaved;
        }
      });
      if (type === "Add") {
        state.totalRecipesAdded += 1;
      }
      if (type === "Del") {
        state.totalRecipesAdded -= 1;
      }
    },
  },
});

//TODO: Add all actions acording to reducers
//Actions
export const { totalRecipesAdd, modifyIngredientsList, changeSaveState } =
  RecipesSlide.actions;

export default RecipesSlide.reducer;
