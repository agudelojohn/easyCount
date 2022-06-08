import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

//Components
import { RecipesList } from "./components/recipes/RecipesList";
import { Home } from "./components/home/Home";
import { NewRecipe } from "./components/recipes/NewRecipe";

export function App() {
  const smallRightMargin = {
    marginRight: "15px",
  };
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Easy Count</Navbar.Brand>
          <Nav className="me-auto">
            <NavLink
              to="/"
              className="btn btn-light "
              style={smallRightMargin}
              activeclassname="active"
            >
              Home
            </NavLink>
            <NavLink
              to="/recipesList"
              className="btn btn-success"
              style={smallRightMargin}
              activeclassname="active"
            >
              Recipes list
            </NavLink>
            <NavLink
              to="/newRecipe"
              className="btn btn-success"
              style={smallRightMargin}
              activeclassname="active"
            >
              New recipe
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <Routes>
          <Route path="/recipesList" element={<RecipesList />} />
          <Route path="/newRecipe" element={<NewRecipe />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </Router>
  );
}
