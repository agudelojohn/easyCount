import React, { Fragment, useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { addNewRecipe } from '../../common/API/apiService';
import { IngredientSelect } from '../ingredients/IngredientSelect';

const NAMEFIELD = 'name';
const CALORIES = 'calories';
// const DESCRIPTIONFIELD = 'descript';
// const LINKFIELD = 'link';
// const INGREDIENTSACOUNT = 'ingredientsacount';

export function NewIngredient() {
  //Fields
  const [ingredientName, setIngredientName] = useState('');
  const [calories, setCalories] = useState(0);

  //Validation of fields
  const [nameInvalid, setNameInvalid] = useState();
  const [caloriesInvalid, setCaloriesInvalid] = useState();

  const saveIngredient = () => {
    console.log('saveIngredient');
    console.log(ingredientName);
    console.log(calories);
  };

  const validateFields = async (field, value) => {
    // if (field === null && value === null) {
    //   recipeName === '' ? setNameInvalid(true) : setNameInvalid(false);
    //   recipeDescription === '' ? setDescriptionInvalid(true) : setDescriptionInvalid(false);
    //   recipeLink === '' ? setLinkInvalid(true) : setLinkInvalid(false);
    //   if (recipeIngredients.length > 0) {
    //     if (
    //       recipeIngredients.find((ingredient) => ingredient.idIngredient === undefined) ===
    //       undefined
    //     ) {
    //       setIngredientsInvalid(false);
    //     } else {
    //       setIngredientsInvalid(true);
    //     }
    //   }
    //   return;
    // }
    switch (field) {
      case NAMEFIELD:
        setIngredientName(value);
        value === '' ? setNameInvalid(true) : setNameInvalid(false);
        break;
      case CALORIES:
        setCalories(value);
        value < 0 ? setCaloriesInvalid(true) : setCaloriesInvalid(false);
        break;
      //   case DESCRIPTIONFIELD:
      //     setRecipeDescription(value);
      //     value === '' ? setDescriptionInvalid(true) : setDescriptionInvalid(false);
      //     break;
      //   case LINKFIELD:
      //     setRecipeLink(value);
      //     value === '' ? setLinkInvalid(true) : setLinkInvalid(false);
      //     break;
      //   case INGREDIENTSACOUNT:
      //     setRecipeIngredientsAcount(value);
      //     if (value > 0) {
      //       if (
      //         recipeIngredients.find((ingredient) => ingredient.idIngredient === undefined) ===
      //         undefined
      //       ) {
      //         setIngredientsInvalid(false);
      //       } else {
      //         setIngredientsInvalid(true);
      //       }
      //     }
      //     break;
      default:
        break;
    }
  };

  return (
    <Fragment>
      <h1>New Ingredient</h1>
      <Form>
        <Form.Group className="mb-3" controlId="ingredientName">
          <Form.Label>Ingredient name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingredient name"
            value={ingredientName}
            onChange={(e) => validateFields(NAMEFIELD, e.target.value)}
            onBlur={(e) => validateFields(NAMEFIELD, e.target.value)}
            isInvalid={nameInvalid}
            isValid={nameInvalid !== undefined ? !nameInvalid : null}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a ingredient name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="calories">
          <Form.Label>Calories:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Calories"
            value={calories}
            onChange={(e) => validateFields(CALORIES, e.target.value)}
            onBlur={(e) => validateFields(CALORIES, e.target.value)}
            isInvalid={caloriesInvalid}
            isValid={caloriesInvalid !== undefined ? !caloriesInvalid : null}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a ingredient name.
          </Form.Control.Feedback>
        </Form.Group>

        {/* <Form.Group className="mb-3" controlId="recipeSteps">
          <Form.Label>Steps description:</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={recipeDescription}
            onChange={(e) => validateFields(DESCRIPTIONFIELD, e.target.value)}
            onBlur={(e) => validateFields(DESCRIPTIONFIELD, e.target.value)}
            isInvalid={descriptionInvalid}
            isValid={
              descriptionInvalid !== undefined ? !descriptionInvalid : null
            }
          />
          <Form.Control.Feedback type="invalid">
            Please enter a recipe description.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="recipeIngredients">
          <IngredientSelect
            totalIngredients={totalIngredients}
            recipeIngredients={recipeIngredients}
            addIngredient={addIngredient}
            subtractIngredient={subtractIngredient}
            addIngredientsSelected={addIngredientsSelected}
            addIngredientMeasure={addIngredientMeasure}
          />
          <Form.Control
            type="text"
            isInvalid={ingredientsInvalid}
            style={{ display: 'none' }}
          />
          <Form.Control.Feedback type="invalid">
            Please enter valid ingredients data.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="recipeLink">
          <Form.Label>Source link:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Source link"
            value={recipeLink}
            onChange={(e) => validateFields(LINKFIELD, e.target.value)}
            onBlur={(e) => validateFields(LINKFIELD, e.target.value)}
            isInvalid={linkInvalid}
            isValid={linkInvalid !== undefined ? !linkInvalid : null}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a recipe link.
          </Form.Control.Feedback>
        </Form.Group> */}

        <Button variant="primary" onClick={() => saveIngredient()}>
          Submit
        </Button>
      </Form>
    </Fragment>
  );
}
