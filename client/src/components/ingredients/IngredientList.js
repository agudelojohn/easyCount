import React, { Fragment } from "react";
import { Card, Container, Row, Col, Table } from "react-bootstrap";

export function IngredientList({ listData }) {
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
          {listData === undefined
            ? null
            : listData.map((ingredient, index) => {
                return (
                  <tr key = {ingredient.name}>
                    <td>{ingredient.name}</td>
                    <td>{ingredient.amount}</td>
                    <td>{ingredient.measure}</td>
                  </tr>
                );
              })}
        </tbody>
      </Table>
    </Fragment>
  );
}
