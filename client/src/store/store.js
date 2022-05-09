import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from '../components/recipes/RecipesSlide';

export const store = configureStore({
    reducer:{
        recipes:recipesReducer,
    },
});