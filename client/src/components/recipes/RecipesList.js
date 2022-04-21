import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

//Bootstrap Components
import { Button, Row, Col } from "react-bootstrap";

//Components
import { RecipeCard } from "./RecipeCard";
import { RecipeObject } from "./RecipeObject";

//Constants
const baseUrl = "https://8da0iso4rc.execute-api.us-east-1.amazonaws.com";
const apiStage = "/dev_1";
const path_getData = "/getdata";
const path_getAllRecipes = "/getallrecipes";

export function RecipesList() {
  const [data, setData] = useState({ recipes: [] });

  const changeSaveData = (index, saved) => {
    const localRecipes = data.recipes;
    localRecipes[index].isSaved = saved;
    setData({ recipes: localRecipes });
  };

  const addRecipe = (index) => {
    changeSaveData(index, true);
  };

  const deleteRecipe = (index) => {
    changeSaveData(index, false);
  };

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

  useEffect(() => {}, [data.recipes]);

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
            if(localData.filter((local) => local.id === recipe.IdRecipe).length > 0){
              var newLocal = localData.map(local => {
                if(local.id === recipe.IdRecipe){
                  local.ingredients.push({ name: recipe.nameIngredient, amount: recipe.amount })
                }
                return local
              })
              localData = newLocal;
            }else{
              var newRecipe = new RecipeObject(
                recipe.IdRecipe,
                recipe.name,
                recipe.description,
                recipe.link,
                [{ name: recipe.nameIngredient, amount: recipe.amount }]
              );
              localData.push(newRecipe);
            }
          });
          if (localData.length > 0) {
            setData({ ...data.recipes, recipes: localData });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <h1 className="text-center" style={{ width: "100%" }}>
        Recipes List
      </h1>
      {data.recipes !== undefined
        ? data.recipes.map((recipe, index) => {
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
                        onClick={() => deleteRecipe(index)}
                      >
                        -
                      </Button>
                    ) : (
                      <Button
                        style={{ margin: "auto" }}
                        variant="primary"
                        onClick={() => addRecipe(index)}
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
    </div>
  );
}
