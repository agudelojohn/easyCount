import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//Components
import { RecipesList } from "./components/recipes/RecipesList";
import { Home } from './components/home/Home';

export function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/recipesList" element={<RecipesList/>} />
          <Route path="/" element={<Home/>} />
        </Routes>
      </Container>
    </Router>
  );
}
