import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
// import { FaAngleRight } from "@react-icons/all-files/fa/FaAngleRight";
// import { FaAngleLeft } from "@react-icons/all-files/fa/FaAngleLeft";
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

export function IngredientSelect({
  totalIngredients,
  recipeIngredients,
  addIngredient,
  subtractIngredient,
  addIngredientsSelected,
  addIngredientMeasure,
}) {
  if (recipeIngredients !== undefined) {
    return recipeIngredients.map((ingredient, i) => {
      return (
        <Row key={i} style={{ marginBottom: '10px' }}>
          <Col sm={9}>
            <Form.Select
              isValid={ingredient.isValid}
              isInvalid={ingredient.isInvalid}
              onChange={(e) => addIngredientsSelected(e.target.value, i)}
              value={ingredient.idIngredient}
              aria-label="Default select example"
            >
              <option>Select a valid ingredient</option>
              {totalIngredients !== undefined
                ? totalIngredients.map((ingredientData) => {
                    return (
                      <option value={ingredientData.idIngredient} key={ingredientData.idIngredient}>
                        {ingredientData.nameIngredient}
                      </option>
                    );
                  })
                : null}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please enter a valid measure for the ingredient.
            </Form.Control.Feedback>
          </Col>
          <Col sm={1}>
            <Form.Control
              type="text"
              placeholder={
                ingredient.idIngredient
                  ? totalIngredients.find(
                      (ingredientData) =>
                        parseInt(ingredientData.idIngredient) === parseInt(ingredient.idIngredient)
                    ).measure
                  : undefined
              }
              disabled
              readOnly
            />
          </Col>
          <Col sm={1}>
            <Form.Control
              type="text"
              onChange={(e) => addIngredientMeasure(e.target.value, i)}
            ></Form.Control>
          </Col>
          <Col sm={1}>
            {ingredient.isOk === false ? (
              <Button
                variant="primary"
                onClick={() => addIngredient(i)}
                disabled={ingredient.isValid === true ? false : true}
              >
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
