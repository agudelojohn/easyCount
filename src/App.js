import React from "react";
import { Container } from "react-bootstrap";

import { RecipesList } from "./components/recipes/RecipesList";

export function App() {
  return (
    <Container>
      <RecipesList />
    </Container>
  );
}
