import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../logo.svg";
import Container from "react-bootstrap/Container";
import { Outlet, Link } from "react-router-dom";
import "./Layout.scss";

const Layout = () => {
  return (
    <>
      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <Link to="/" className="navbar-brand">
            <img
              alt="Our Planet Our People logo"
              src={logo}
              width="30"
              height="30"
            />{" "}
            Our Planet Our People
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="climateInfo" className="nav-link">
                Climate Info
              </Link>
              <Link to="solution" className="nav-link">
                Is there a solution?
              </Link>
              <Link to="cop27" className="nav-link">
                COP 27
              </Link>
              <Link to="foundation" className="nav-link">
                The Foundation
              </Link>
              <Link to="test" className="nav-link">
                test content
              </Link>
            </Nav>
            <Nav>
              <Link to="memberArea" className="nav-link">
                Member Area
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main>
        <Container>
          <Outlet />
        </Container>
      </main>

      <footer className="bg-light">
        <ul>
          <li>
            <Link to="/privacy" className="nav-link">
              Privacy
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/endingMembership" className="nav-link">
              Ending Membership
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </li>
        </ul>
      </footer>
    </>
  );
};

export default Layout;
