import { createSlice } from "@reduxjs/toolkit";

import { Days, Meals } from "../days/EnumDays";

//TODO: Define all inicial states
const initialState = {
  recipesSelected: [],
  totalRecipes: [],
  ingredientsList: [],
  curentDay: Days.MONDAY,
  currentMeal: Meals.BREAKFAST,
  totalRecipesAdded:0
};

//TODO: Add all reducers
export const RecipesSlide = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    recipeAdition: (state, action) => {
      state.value += 1;
      // state.recipesSelected.push(action.payload)
    },
    totalRecipesAdd: (state, action) => {
      state.totalRecipes = action.payload;
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
      if(type === 'Add'){state.totalRecipesAdded += 1;}
      if(type === 'Del'){state.totalRecipesAdded -= 1;}
    },
  },
});

//TODO: Add all actions acording to reducers
//Actions
export const { recipeAdition, totalRecipesAdd, changeSaveState } =
  RecipesSlide.actions;

export default RecipesSlide.reducer;
