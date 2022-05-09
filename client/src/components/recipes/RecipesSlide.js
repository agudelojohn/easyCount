import { createSlice } from '@reduxjs/toolkit'

//TODO: Define all inicial states
const initialState = {
  value: 0,
}

//TODO: Add all reducers
export const RecipesSlide = createSlice({
    name:'recipes',
    initialState,
    reducers:{
        recipeAdition: (state, action) => {
            state.value += 1
            state.recipesSelected = action.payload
        },
    }
});

//TODO: Add all actions acording to reducers
//Actions
export const { recipeAdition } = RecipesSlide.actions;

export default RecipesSlide.reducer;