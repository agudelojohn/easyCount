import React, {useState} from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { FaAngleRight } from "@react-icons/all-files/fa/FaAngleRight";
import { FaAngleLeft } from "@react-icons/all-files/fa/FaAngleLeft";

export function IngredientSelect({
  totalIngredients,
  recipeIngredients,
  addIngredient,
  subtractIngredient,
  addIngredientsSelected
}) {
  if (recipeIngredients !== undefined) {
    return recipeIngredients.map((ingredient, i) => {
      return (
        <Row key={i} style={{marginBottom:'10px'}}>
          <Col sm={11}>
            <Form.Select onChange={(e)=>addIngredientsSelected(e.target.value, i)} value={ingredient.ingredientsSelected} aria-label="Default select example" >
              <option>Select a valid ingredient</option>
              {totalIngredients!==undefined?totalIngredients.map(ingredientData=>{return(<option value={ingredientData.idIngredient} key={ingredientData.idIngredient}>{ingredientData.nameIngredient}</option>)}):null}
            </Form.Select>
          </Col>
          <Col sm={1}>
            {ingredient.isOk === false ? (
              <Button variant="primary" onClick={() => addIngredient(i)}>
                <FaAngleRight />
              </Button>
            ) : (
              <Button variant="danger" onClick={() => subtractIngredient(i)}>
                <FaAngleLeft />
              </Button>
            )}
          </Col>
        </Row>
      );
    });
  }
}
