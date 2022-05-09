import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const RecipesSlide = createSlice({
    name:'recipes',
    initialState,
    reducers:{
        recipeAdition: (state) => {
            state.value += 1;
        }
    }
});

//Actions
export const { recipeAdition } = RecipesSlide.actions;

export default RecipesSlide.reducer;