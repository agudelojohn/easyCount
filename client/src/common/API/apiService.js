import axios from 'axios';

// const baseUrl = "https://8da0iso4rc.execute-api.us-east-1.amazonaws.com/dev_1";
const PORT = '3050';
const baseUrl = 'http://localhost:' + PORT + '/V1';

export const getAllRecipes = () => {
  return axios.get(baseUrl + '/recipe');
};

export const addNewRecipe = (newRecipe) => {
  return axios.post(baseUrl + '/recipe', newRecipe);
};

export const getAllIngredients = () => {
  return axios.get(baseUrl + '/ingredient');
};
