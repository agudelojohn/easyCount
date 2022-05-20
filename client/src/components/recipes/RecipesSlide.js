import { createSlice } from "@reduxjs/toolkit";
import { Days, Meals } from "../days/EnumDays";
import { IngredientObject } from "../ingredients/IngredientObject";

const initialRecipesPerDay = {
  [Days.MONDAY]:{
    [Meals.BREAKFAST]:{},
    [Meals.LUNCH]:{},
    [Meals.DINNER]:{}
  },
  [Days.TUESDAY]:{
    [Meals.BREAKFAST]:{},
    [Meals.LUNCH]:{},
    [Meals.DINNER]:{}
  },
  [Days.WEDNESDAY]:{
    [Meals.BREAKFAST]:{},
    [Meals.LUNCH]:{},
    [Meals.DINNER]:{}
  },
  [Days.THURSDAY]:{
    [Meals.BREAKFAST]:{},
    [Meals.LUNCH]:{},
    [Meals.DINNER]:{}
  },
  [Days.FRIDAY]:{
    [Meals.BREAKFAST]:{},
    [Meals.LUNCH]:{},
    [Meals.DINNER]:{}
  },
  [Days.SATURDAY]:{
    [Meals.BREAKFAST]:{},
    [Meals.LUNCH]:{},
    [Meals.DINNER]:{}
  },
  [Days.SUNDAY]:{
    [Meals.BREAKFAST]:{},
    [Meals.LUNCH]:{},
    [Meals.DINNER]:{}
  }
}

const initialState = {
  recipesSelected: [],
  totalRecipes: [],
  ingredientsList: {},
  currentDay: Days.MONDAY,
  currentMeal: Meals.BREAKFAST,
  totalRecipesAdded: 0,
  recipesPerDay: initialRecipesPerDay,
};

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
      let recipe = localRecipes.find((recipe) => recipe.id === id);
      recipe.isSaved = !recipe.isSaved;
      if (type === "Add") {
        let previusRecipe = state.recipesPerDay[state.currentDay][state.currentMeal];
        if(Object.entries(previusRecipe).length === 0)
          state.totalRecipesAdded += 1;
        }
        let curentDayRecieps = state.recipesPerDay[state.currentDay]
        curentDayRecieps[state.currentMeal] = recipe;
        curentDayRecieps[state.currentMeal].isReady = true;
        curentDayRecieps.isReady = curentDayRecieps[Meals.BREAKFAST].isReady && curentDayRecieps[Meals.LUNCH].isReady && curentDayRecieps[Meals.DINNER].isReady;
      
      if (type === "Del") {
        state.totalRecipesAdded -= 1;
        let curentDayRecieps = state.recipesPerDay[state.currentDay]
        curentDayRecieps[state.currentMeal] = {};
        curentDayRecieps.isReady = curentDayRecieps[Meals.BREAKFAST].isReady && curentDayRecieps[Meals.LUNCH].isReady && curentDayRecieps[Meals.DINNER].isReady;
      }
    },
    setCurrentDay: (state, action) => {
      state.currentDay = action.payload
    },
    setCurrentMeal: (state, action) => {
      state.currentMeal = action.payload
    },
    verifyCurrentMeal: (state) => {
      let previusRecipe = state.recipesPerDay[state.currentDay][state.currentMeal];
      if(Object.entries(previusRecipe).length !== 0){
        previusRecipe.isSaved = false;
      }
    }
  },
});

//Actions
export const { totalRecipesAdd, modifyIngredientsList, changeSaveState, setCurrentDay, setCurrentMeal, verifyCurrentMeal } =
  RecipesSlide.actions;

export default RecipesSlide.reducer;
