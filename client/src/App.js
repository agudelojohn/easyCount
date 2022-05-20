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
              className="btn btn-light"
              style={smallRightMargin}
              activeclassname="active"
            >
              Recieps list
            </NavLink>
            {/* <Link to='/recipesList' className='btn btn-success'>
                      New recipe
                  </Link> */}
            {/* <Link to='/recipesList' className='btn btn-success'>
                      Total ingredients
                  </Link> */}
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <Routes>
          <Route path="/recipesList" element={<RecipesList />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </Router>
  );
}

//TODO: Add components missing
