import React, { Fragment, useState , useEffect } from "react";

import { Button, Row, Col } from "react-bootstrap";

import { RecipeCard } from "./RecipeCard";
import { RecipeObject } from "./RecipeObject";

const example = new RecipeObject("nameData", "descriptionData", "https:...", [
  { name: "ingr1", amount: "15 gr" },
  { name: "ingr2", amount: "15 pcs" },
]);

const example2 = new RecipeObject("nameData..2", "descriptionData", "https:...", [
    { name: "ingr1", amount: "2 gr" },
    { name: "ingr2", amount: "2 pcs" },
  ]);
example.setInformation("information Data");

// var recipes = [example, example, example];

export function RecipesList() {

  const [data, setData] = useState({recipes:[example,example2]});

  const changeSaveData = (index, saved) => {
    const localRecipes = data.recipes;
    localRecipes[index].isSaved = saved;
    setData({recipes:localRecipes})
  }

  const addRecipe = (index) => {
    changeSaveData(index, true);
  };

  const deleteRecipe = (index) => {
    changeSaveData(index, false);
  };

  useEffect(() => {

  },[data.recipes])

  return (
    <div>
      <h1 className="text-center" style={{ width: "100%" }}>
        Recipes List
      </h1>
      {data.recipes !== undefined ? data.recipes.map((recipe, index) => {
        return (
          <Fragment key={index}>
            <Row>
              <Col xs={9} md={9}>
                <RecipeCard recipeData={recipe} />
              </Col>
              <Col xs={3} md={3}>
                {recipe.isSaved ? 
                    <Button style={{ margin: "auto" }} variant="danger" onClick={() => deleteRecipe(index)}>-</Button> : 
                    <Button style={{ margin: "auto" }} variant="primary" onClick={() => addRecipe(index)} >+</Button>
                }
              </Col>
            </Row>
            <br></br>
          </Fragment>
        );
      }):null}
    </div>
  );
}
