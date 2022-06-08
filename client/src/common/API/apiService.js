import axios from "axios";

import { RecipeObject } from "../../components/recipes/RecipeObject";
import { useDispatch } from "react-redux";

import {
    changeSaveState,
    modifyIngredientsList,
    totalRecipesAdd,
    verifyCurrentMeal,
  } from "../../components/recipes/RecipesSlide";

export const setConfiguration = (method, url, dataRequest) => {
  return {
    method: method,
    url: url,
    headers: {
      "Content-Type": "application/json",
    },
    data: dataRequest,
  };
};

export const getAllRecipes = () => {
  //Constants
  const baseUrl = "https://8da0iso4rc.execute-api.us-east-1.amazonaws.com";
  const apiStage = "/dev_1";
  const path_getData = "/getdata";
  const path_getAllRecipes = "/getallrecipes";

  //   var dataRequest = JSON.stringify({
  //     tableName: "recipe",
  //   });

  var config = setConfiguration(
    "get",
    baseUrl + apiStage + path_getAllRecipes,
    null
  );
  axios(config)
    .then(function (response) {
      var localData = [];
      if (response.data.statusCode === 200 && response.data.body.length > 0) {
        response.data.body.forEach((recipe) => {
          if (
            localData.filter((local) => local.id === recipe.IdRecipe).length > 0
          ) {
            var newLocal = localData.map((local) => {
              if (local.id === recipe.IdRecipe) {
                local.ingredients.push({
                  name: recipe.nameIngredient,
                  amount: recipe.amount,
                });
              }
              return local;
            });
            localData = newLocal;
          } else {
            var newRecipe = new RecipeObject(
              recipe.IdRecipe,
              recipe.nameRecipe,
              recipe.description,
              recipe.link,
              [{ name: recipe.nameIngredient, amount: recipe.amount }]
            );
            localData.push(newRecipe);
          }
        });
      }
      //   return localData;
      if (this.localData.length > 0) {
        useDispatch(totalRecipesAdd(localData));
      }
    })
    .catch(function (error) {
      console.log(error);
      //   return null;
    });
};
