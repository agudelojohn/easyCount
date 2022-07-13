import React, { Fragment, useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { addNewRecipe } from "../../common/API/apiService";
import { IngredientSelect } from "../ingredients/IngredientSelect";

//Redux
import { useDispatch, useSelector } from "react-redux";

import { totalIngredientsAdd } from "./RecipesSlide";

import { getAllIngredients } from "../../common/API/apiService";

const NAMEFIELD = "name";
const DESCRIPTIONFIELD = "descript";
const LINKFIELD = "link";
//TODO: add temporal object and test connection
//TODO: add real object and use connection

export function NewRecipe() {
  const dispatch = useDispatch();
  //To bring in all posible ingredients
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const [recipeName, setRecipeName] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [recipeLink, setRecipeLink] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState([{ index:0,isOk: false }]);

  //Validation of fields
  const [nameInvalid, setNameInvalid] = useState();
  const [descriptionInvalid, setDescriptionInvalid] = useState();
  const [linkInvalid, setLinkInvalid] = useState();

  const validateFields = async (field, value) => {
    switch (field) {
      case NAMEFIELD:
        setRecipeName(value);
        value === "" ? setNameInvalid(true) : setNameInvalid(false);
        break;
      case DESCRIPTIONFIELD:
        setRecipeDescription(value);
        value === ""
          ? setDescriptionInvalid(true)
          : setDescriptionInvalid(false);
        break;
      case LINKFIELD:
        setRecipeLink(value);
        value === "" ? setLinkInvalid(true) : setLinkInvalid(false);
        break;
      default:
        break;
    }
  };

  const saveNewRecipe = () => {
    if (
      nameInvalid === false &&
      descriptionInvalid === false &&
      linkInvalid === false
    ) {
      console.log("Ok saving");
      const recipe = {
        nameRecipe: recipeName,
        description: recipeDescription,
        link: recipeLink,
        isSaved: true,
        // ingredients: [
        //   {
        //     nameIngredient: "IngredientName-1",
        //     calories: 888,
        //     soldIndividualy: true,
        //     measure: "lb",
        //     amount: 88,
        //   },
        //   {
        //     nameIngredient: "IngredientName-2",
        //     calories: 14,
        //     soldIndividualy: false,
        //     measure: "lt",
        //     amount: 14141414,
        //   },
        // ],
      };
      // addNewRecipe(recipe).then((res) => console.log(res))
    }
  };

  const addIngredient = (index) => {
    let local = recipeIngredients[index]
    local.isOk=true
    let temp = recipeIngredients
    temp.splice(index,1,local)
    setRecipeIngredients([...temp, {index,isOk:false}]);   
  };

  const subtractIngredient = (index) => {
    let temp = recipeIngredients
    temp.splice(index,1)
    setRecipeIngredients([...temp]);   
  }

  const addIngredientsSelected = (idIngredient, indexRecipeIngredients) => {
    let local = recipeIngredients[indexRecipeIngredients]
    local.ingredientsSelected=idIngredient
    let temp = recipeIngredients
    temp.splice(indexRecipeIngredients,1,local)
    setRecipeIngredients([...temp]);   
  }

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
        </Form.Group>

        <IngredientSelect
          totalIngredients={totalIngredients}
          recipeIngredients={recipeIngredients}
          addIngredient={addIngredient}
          subtractIngredient={subtractIngredient}
          addIngredientsSelected={addIngredientsSelected}
        ></IngredientSelect>

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
        </Form.Group>

        <Button variant="primary" onClick={() => saveNewRecipe()}>
          Submit
        </Button>
      </Form>
    </Fragment>
  );
}
