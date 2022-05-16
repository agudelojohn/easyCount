import axios from "axios";
import React, { Fragment, useEffect } from "react";
//Bootstrap Components
import { Button, Col, Row } from "react-bootstrap";
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { IngredientList } from "../ingredients/IngredientList";
//Components
import { RecipeCard } from "./RecipeCard";
import { RecipeObject } from "./RecipeObject";
import { changeSaveState, modifyIngredientsList, totalRecipesAdd } from './RecipesSlide';
import { DaySelector } from '../days/DaySelector';

//Constants
const baseUrl = "https://8da0iso4rc.execute-api.us-east-1.amazonaws.com";
const apiStage = "/dev_1";
const path_getData = "/getdata";
const path_getAllRecipes = "/getallrecipes";

export function RecipesList() {

  const dispatch = useDispatch();

  //Redux selectors
  const selectorTotalRecipes = useSelector((state) => state.recipes.totalRecipes)
  const selectorTotalRecipesAdded = useSelector((state) => state.recipes.totalRecipesAdded)

  const setConfiguration = (method, url, dataRequest) => {
    return {
      method: method,
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
      data: dataRequest,
    };
  };

  //To bring in all posible recipes
  useEffect(() => {
    var dataRequest = JSON.stringify({
      tableName: "recipe",
    });

    var config = setConfiguration(
      "get",
      baseUrl + apiStage + path_getAllRecipes,
      null
    );
    axios(config)
      .then(function (response) {
        if (response.data.statusCode === 200 && response.data.body.length > 0) {
          var localData = [];
          response.data.body.forEach((recipe) => {
            if (localData.filter((local) => local.id === recipe.IdRecipe).length > 0
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
          
          if (localData.length > 0) {
            dispatch(totalRecipesAdd(localData))
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  
  return (
    <Fragment>
      <h1 className="text-center" style={{ width: "100%" }}>
        Recipes List
      </h1>
      <Row>
        <Col xs={8}>
          {selectorTotalRecipes !== undefined
            ? selectorTotalRecipes.map((recipe, index) => {
                return (
                  <Fragment key={index}>
                    <Row>
                      <Col xs={9} md={9}>
                        <RecipeCard recipeData={recipe} />
                      </Col>
                      <Col xs={3} md={3}>
                        {recipe.isSaved ? (
                          <Button
                            style={{ margin: "auto" }}
                            variant="danger"
                            onClick={() => {
                              dispatch(changeSaveState({id:recipe.id,type:'Del'}));
                              dispatch(modifyIngredientsList({id:recipe.id,type:'Del'}));
                            }}
                          >
                            -
                          </Button>
                        ) : (
                          <Button
                            style={{ margin: "auto" }}
                            variant="primary"
                            onClick={() => {
                              dispatch(changeSaveState({id:recipe.id,type:'Add'}));
                              dispatch(modifyIngredientsList({id:recipe.id,type:'Add'}));
                            }}
                          >
                            +
                          </Button>
                        )}
                      </Col>
                    </Row>
                    <br></br>
                  </Fragment>
                );
              })
            : null}
        </Col>
        <Col xs={4}>
          <DaySelector />
          <IngredientList/>
        </Col>
      </Row>
    </Fragment>
  );
}

//TODO: the day must be selected when selecting a recipe of the list
//TODO: agregar recetas a los días, que a su vez servirá de fuente de datos para el day picker
//TODO: Add interactions with Redux store (add, delete, read)