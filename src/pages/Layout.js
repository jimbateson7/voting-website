
import logo from "../logo.png";

import { Link, Outlet } from "react-router-dom";
import "./Layout.scss";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { footerComponentId, headerComponentId } from "../Routing";
import {DynamicFooter} from "../components/DynamicFooter";
import React, {useRef, useState} from "react";

import {DynamicNavList} from "../components/DynamicNavList";

const Layout = () => {

    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => setExpanded(!expanded);
  return (
    <>
        <Navbar  expanded={expanded} collapseOnSelect expand="lg" variant="light" bg="light" fixed="top" >            
       <Container>
          <Link to="/" className="navbar-brand">
            <img
              alt="Our Planet Our People logo"
              src={logo}
              onClick={toggleExpanded}
            />{" "}
          </Link>
          <Navbar.Toggle onClick={() => setExpanded(!expanded)} aria-controls="responsive-navbar-nav" />
           <Navbar.Collapse id="responsive-navbar-nav">
               <Nav className="me-auto">
                   <DynamicNavList id={headerComponentId} onSelect={() => {setExpanded(false)}}></DynamicNavList>
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
