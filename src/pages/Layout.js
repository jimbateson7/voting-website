
import logo from "../logo.png";

import { Link, Outlet } from "react-router-dom";
import "./Layout.scss";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { footerComponentId, headerComponentId } from "../Routing";
import {DynamicFooter} from "../components/DynamicFooter";
import React, {useRef} from "react";

import {DynamicNavList} from "../components/DynamicNavList";

const Layout = () => {
    const navBarRef  = useRef(null);
    
  return (
    <>
        <Navbar collapseOnSelect expand="lg" variant="light" bg="light"  fixed="top">
       <Container>
          <Link to="/" className="navbar-brand">
            <img
              alt="Our Planet Our People logo"
              src={logo}
            />{" "}
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
           <Navbar.Collapse id="responsive-navbar-nav">
               <Nav className="me-auto">
                   <DynamicNavList id={headerComponentId} title={"bob"}></DynamicNavList>
               </Nav>
               <Nav>
                   <Nav.Link to="memberArea" className="nav-link">
                       Member Area
                   </Nav.Link>
               </Nav>
          
           </Navbar.Collapse>
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
