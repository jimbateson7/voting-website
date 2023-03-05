import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import { DynamicNavList } from "./DynamicNavList";

export type TDynamicNav = {
  id: string;
  title?: string;
};

export const DynamicNavDropDown = (props: TDynamicNav) => {
  let { id, title } = props;

  return (
    <NavDropdown title={title ?? "_"} id="basic-nav-dropdown">
      <DynamicNavList id={id}></DynamicNavList>
    </NavDropdown>
  );
};
export const DynamicNav = (props: TDynamicNav) => {
  let { id, title } = props;

  return (
    <>
      <Nav className="me-auto">
        <DynamicNavList id={id} title={title}></DynamicNavList>
      </Nav>
      <Nav>
        <Link to="memberArea" className="nav-link">
          Member Area
        </Link>
      </Nav>
</>
  );
};
