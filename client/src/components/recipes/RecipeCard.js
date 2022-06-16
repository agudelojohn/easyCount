import React from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";

export function RecipeCard({ recipeData, borderStyle }) {
  return (
    <div>
      <Card style={{ width: "100%" }} border={borderStyle}>
        <Card.Body >
          <Row>
            <Col xs={12} md={6}>
              <Card.Title>{recipeData.name}</Card.Title>
            </Col>
            <Col xs={12} md={6}>
              <Card.Subtitle className="mb-2 text-muted">
                {recipeData.information}
              </Card.Subtitle>
            </Col>
          </Row>
          <Container >
            <Row>
              <Col ms={12} md={6} style={{ 'minWidth':"100%"}}>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Ingredients</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recipeData.ingredients.map((ingredient, i) => {
                      return (
                        <tr key={i}>
                          <td>{ingredient.name}</td>
                          <td>{ingredient.amount}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Col>
              <Col ms={12} md={6}>
                <Card.Text>{recipeData.description}</Card.Text>
              </Col>
            </Row>
          <Card.Link href={recipeData.link}>{recipeData.link}</Card.Link>
          </Container>
        </Card.Body>
      </Card>
    </div>
  );
}
