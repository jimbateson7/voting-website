import Navbar from "react-bootstrap/Navbar";
import logo from "../logo.svg";
import Container from "react-bootstrap/Container";
import { Link, Outlet } from "react-router-dom";
import "./Layout.scss";
import { DynamicNav } from "../components/DynamicNav";
import { footerComponentId, headerComponentId } from "../App";
import { DynamicFooter } from "./DynamicFooter";

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
          <DynamicNav id={headerComponentId}></DynamicNav>
        </Container>
      </Navbar>

      <main>
        <Container>
          <Outlet />
        </Container>
      </main>

      <DynamicFooter id={footerComponentId}></DynamicFooter>
    </>
  );
};

export default Layout;
