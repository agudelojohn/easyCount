import React, { Fragment, useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { addNewRecipe } from '../../common/API/apiService';
import { IngredientSelect } from '../ingredients/IngredientSelect';

//Redux
import { useDispatch, useSelector } from 'react-redux';

import { totalIngredientsAdd } from './RecipesSlide';

import { getAllIngredients } from '../../common/API/apiService';

const NAMEFIELD = 'name';
const DESCRIPTIONFIELD = 'descript';
const LINKFIELD = 'link';
const INGREDIENTSACOUNT = 'ingredientsacount';

export function NewRecipe() {
  const dispatch = useDispatch();
  //To bring in all posible ingredients
  useEffect(() => {
    getAllIngredients()
      .then(function (response) {
        const status = response.status;
        const data = response.data;

        if (status === 200 && data.length > 0) {
          dispatch(totalIngredientsAdd(data));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  let totalIngredients = useSelector((state) => state.recipes.totalIngredients);

  //Fields
  const [recipeName, setRecipeName] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [recipeLink, setRecipeLink] = useState('');
  const [recipeIngredientsAcount, setRecipeIngredientsAcount] = useState(0);
  const [recipeIngredients, setRecipeIngredients] = useState([
    { index: 0, isOk: false },
  ]);

  //Validation of fields
  const [nameInvalid, setNameInvalid] = useState();
  const [descriptionInvalid, setDescriptionInvalid] = useState();
  const [linkInvalid, setLinkInvalid] = useState();
  const [ingredientsInvalid, setIngredientsInvalid] = useState();

  const validateFields = async (field, value) => {
    if (field === null && value === null) {
      recipeName === '' ? setNameInvalid(true) : setNameInvalid(false);
      recipeDescription === ''
        ? setDescriptionInvalid(true)
        : setDescriptionInvalid(false);
      recipeLink === '' ? setLinkInvalid(true) : setLinkInvalid(false);
      if (recipeIngredients.length > 0) {
        if (
          recipeIngredients.find(
            (ingredient) => ingredient.idIngredient === undefined
          ) === undefined
        ) {
          setIngredientsInvalid(false);
        } else {
          setIngredientsInvalid(true);
        }
      }
      return;
    }
    switch (field) {
      case NAMEFIELD:
        setRecipeName(value);
        value === '' ? setNameInvalid(true) : setNameInvalid(false);
        break;
      case DESCRIPTIONFIELD:
        setRecipeDescription(value);
        value === ''
          ? setDescriptionInvalid(true)
          : setDescriptionInvalid(false);
        break;
      case LINKFIELD:
        setRecipeLink(value);
        value === '' ? setLinkInvalid(true) : setLinkInvalid(false);
        break;
      case INGREDIENTSACOUNT:
        setRecipeIngredientsAcount(value);
        if (value > 0) {
          if (
            recipeIngredients.find(
              (ingredient) => ingredient.idIngredient === undefined
            ) === undefined
          ) {
            setIngredientsInvalid(false);
          } else {
            setIngredientsInvalid(true);
          }
        }
        break;
      default:
        break;
    }
  };

  const saveNewRecipe = () => {
    validateFields(INGREDIENTSACOUNT, recipeIngredients.length);
    validateFields(null, null);
    if (
      nameInvalid === false &&
      descriptionInvalid === false &&
      linkInvalid === false &&
      ingredientsInvalid === false
    ) {
      const ingredients = recipeIngredients.map((ingredient) => {
        return {
          idIngredient: ingredient.idIngredient,
          amount: ingredient.measure,
        };
      });

      const newRecipe = {
        nameRecipe: recipeName,
        description: recipeDescription,
        link: recipeLink,
        isSaved: true,
        ingredients,
      };
      addNewRecipe(newRecipe).then((res) => {
        if (res.status === 201) {
          console.log(res.data);
          window.location.reload(true);
        }
      });
    }
  };

  const addIngredient = (index) => {
    let local = recipeIngredients[index];
    local.isOk = true;
    let temp = recipeIngredients;
    temp.splice(index, 1, local);
    setRecipeIngredients([...temp, { index, isOk: false }]);
  };

  const subtractIngredient = (index) => {
    let temp = recipeIngredients;
    temp.splice(index, 1);
    setRecipeIngredients([...temp]);
  };

  const addIngredientsSelected = (idIngredient, indexRecipeIngredients) => {
    if (idIngredient != 'Select a valid ingredient') {
      let local = recipeIngredients[indexRecipeIngredients];
      local.idIngredient = idIngredient;
      local.isValid = false;
      local.isInvalid = true;
      let temp = recipeIngredients;
      temp.splice(indexRecipeIngredients, 1, local);
      setRecipeIngredients([...temp]);
    }
  };

  const addIngredientMeasure = (measure, indexRecipeIngredients) => {
    let local = recipeIngredients[indexRecipeIngredients];
    if (measure.match(/^\d+$/) && measure !== undefined) {
      local.measure = measure;
      local.isValid = true;
      local.isInvalid = false;
      setIngredientsInvalid(false);
    } else {
      local.isValid = false;
      local.isInvalid = true;
      setIngredientsInvalid(true);
    }
    let temp = recipeIngredients;
    temp.splice(indexRecipeIngredients, 1, local);
    setRecipeIngredients([...temp]);
  };

  return (
    <Fragment>
      <h1>New Recipe Component</h1>
      <Form>
        <Form.Group className="mb-3" controlId="recipeName">
          <Form.Label>Recipe name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Recipe name"
            value={recipeName}
            onChange={(e) => validateFields(NAMEFIELD, e.target.value)}
            onBlur={(e) => validateFields(NAMEFIELD, e.target.value)}
            isInvalid={nameInvalid}
            isValid={nameInvalid !== undefined ? !nameInvalid : null}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a recipe name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="recipeSteps">
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
        </Form.Group>

        <Button variant="primary" onClick={() => saveNewRecipe()}>
          Submit
        </Button>
      </Form>
    </Fragment>
  );
}
