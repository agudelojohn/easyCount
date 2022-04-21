import React from "react";
import { Container } from "react-bootstrap";

import { RecipesList } from "./components/recipes/RecipesList";
import { RecipeInput } from "./components/recipes/RecipeInput";

export function App() {
  return (
    <Container>
      <RecipesList />
      {/* <RecipeInput /> */}
    </Container>
  );
}
