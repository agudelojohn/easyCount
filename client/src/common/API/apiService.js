import axios from "axios";

// const baseUrl = "https://8da0iso4rc.execute-api.us-east-1.amazonaws.com/dev_1";
const PORT = '3050'
const baseUrl = 'http://localhost:'+PORT;

export const getAllRecipes = () => {
  return axios.get(baseUrl + "/recipes");
};

export const addNewRecipe = (newRecipe) => {
return axios.post(baseUrl + "/recipes/add",newRecipe);
}

export const getAllIngredients = () => {
  return axios.get(baseUrl + "/ingredients");
}
