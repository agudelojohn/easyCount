import React, { Fragment } from "react";
import { Table } from "react-bootstrap";
//Redux
import { useSelector } from 'react-redux';


export function IngredientList() {

  //Redux selectors
  const ingredientsList = useSelector((state) => state.recipes.ingredientsList)
  const totalRecipesAdded = useSelector((state) => state.recipes.totalRecipesAdded);
  return (
    <Fragment>
      <h3>Ingredients List</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Amount</th>
            <th>Measure</th>
          </tr>
        </thead>
        <tbody>
          {
            Object.entries(ingredientsList).length === 0
              ? null
              : Object.keys(ingredientsList).map((key) => {
                  return (
                    <tr key={key}>
                      <td>{ingredientsList[key].name}</td>
                      <td>{ingredientsList[key].amount}</td>
                      <td>{ingredientsList[key].measure}</td>
                    </tr>
                  );
                })
          }
        </tbody>
      </Table>
      <h3>Total recipes: {totalRecipesAdded}</h3>
    </Fragment>
  );
}
