import React, { Fragment, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { RecipeObject } from "./RecipeObject";
import { addNewRecipe } from "../../common/API/apiService";

const saveNewRecipe = () => {
  console.log("saveNewRecipe")
  const object = new RecipeObject(null, "nameFromTest", "descriptionFromTest", "linkFromTest", "ingredientsFromTest")
  addNewRecipe(object).then((res) => console.log(res))  
}
//TODO: add temporal object and test connection
//TODO: add real object and use connection

export function NewRecipe() {
  return (
    <Fragment>
      <h1>New Recipe Component</h1>
      <Form>
        <Form.Group className="mb-3" controlId="recipeName">
          <Form.Label>Recipe name:</Form.Label>
          <Form.Control type="text" placeholder="Recipe name" />
        </Form.Group>

        {/* TODO: Ingredient list -> Select + Add new Ingredient */}

        <Form.Group className="mb-3" controlId="recipeSteps">
          <Form.Label>Steps description:</Form.Label>
          <Form.Control as="textarea" rows={5} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="recipeLink">
          <Form.Label>Source link:</Form.Label>
          <Form.Control type="text" placeholder="Source link" />
        </Form.Group>

        <Button variant="primary" onClick={()=>saveNewRecipe()}>
          Submit
        </Button>
      </Form>
    </Fragment>
  );
}
