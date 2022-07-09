import axios from "axios";

// const baseUrl = "https://8da0iso4rc.execute-api.us-east-1.amazonaws.com/dev_1";
const PORT = '3050'
const baseUrl = 'http://localhost:'+PORT;


// const setConfiguration = (method, url, dataRequest) => {
//   return {
//     method: method,
//     url: url,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     data: dataRequest,
//   };
// };

export const getAllRecipes = () => {
  return axios.get(baseUrl + "/recipes");
};

export const addNewRecipe = (newRecipe) => {
return axios.post(baseUrl + "/crud",newRecipe);
}
