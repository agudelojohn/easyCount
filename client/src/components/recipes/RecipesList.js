// import axios from "axios";
import React, { Fragment, useEffect } from "react";
//Bootstrap Components
import { Button, Col, Row } from "react-bootstrap";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { IngredientList } from "../ingredients/IngredientList";
//Components
import { RecipeCard } from "./RecipeCard";
import { RecipeObject } from "./RecipeObject";
import {
  changeSaveState,
  modifyIngredientsList,
  totalRecipesAdd,
  verifyCurrentMeal,
} from "./RecipesSlide";
import { DaySelector } from "../days/DaySelector";

//common
import { getAllRecipes } from "../../common/API/apiService";



export function RecipesList() {
  const dispatch = useDispatch();
  let localData;

  //Redux selectors
  const selectorTotalRecipes = useSelector(
    (state) => state.recipes.totalRecipes
  );
  let currentDay = useSelector((state) => state.recipes.currentDay);
  let currentMeal = useSelector((state) => state.recipes.currentMeal);
  let recipesPerDay = useSelector((state) => state.recipes.recipesPerDay);
  let currentRecipeInDay = useSelector(
    (state) => state.recipes.recipesPerDay[currentDay][currentMeal]
  );

  //To bring in all posible recipes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getAllRecipes();
  }, []);

  useEffect(() => {
    localData = selectorTotalRecipes;
  }, [selectorTotalRecipes]);

  // useEffect(() => {
  //   if (this.localData.length > 0) {
  //     dispatch(totalRecipesAdd(localData));
  //   }
  // }, [dispatch, localData]);

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
                        <RecipeCard
                          recipeData={recipe}
                          borderStyle={
                            recipe.id ===
                            recipesPerDay[currentDay][currentMeal].id
                              ? "danger"
                              : "light"
                          }
                        />
                      </Col>
                      <Col xs={3} md={3}>
                        {recipe.isSaved ? (
                          recipe.id ===
                          recipesPerDay[currentDay][currentMeal].id ? (
                            <Button
                              style={{ margin: "auto" }}
                              variant="danger"
                              onClick={() => {
                                dispatch(
                                  changeSaveState({
                                    id: recipe.id,
                                    type: "Del",
                                  })
                                );
                                dispatch(
                                  modifyIngredientsList({
                                    id: recipe.id,
                                    type: "Del",
                                  })
                                );
                              }}
                            >
                              -
                            </Button>
                          ) : null
                        ) : (
                          <Button
                            style={{ margin: "auto" }}
                            variant="primary"
                            onClick={() => {
                              if (
                                Object.entries(currentRecipeInDay).length !== 0
                              ) {
                                dispatch(
                                  modifyIngredientsList({
                                    id: currentRecipeInDay.id,
                                    type: "Del",
                                  })
                                );
                              }
                              dispatch(verifyCurrentMeal());
                              dispatch(
                                changeSaveState({ id: recipe.id, type: "Add" })
                              );
                              dispatch(
                                modifyIngredientsList({
                                  id: recipe.id,
                                  type: "Add",
                                })
                              );
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
          <IngredientList />
        </Col>
      </Row>
    </Fragment>
  );
}
