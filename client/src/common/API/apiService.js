import axios from "axios";

// const baseUrl = "https://8da0iso4rc.execute-api.us-east-1.amazonaws.com/dev_1";
const baseUrl = 'https://62aa67e0371180affbd4d8a4.mockapi.io/mockpuapi/';


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
  return axios.get(baseUrl + "/getallrecipes");
};

export const addNewRecipe = (newRecipe) => {
return axios.post(baseUrl + "/crud",newRecipe);
}
