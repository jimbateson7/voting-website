import React, { useEffect, useState } from "react";
import { NavigationItem, NavTypes } from "../repositories/Navigation/types";
import { getNavigationJson } from "../repositories/Navigation/request";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";

export type TDynamicNav = {
  id: string;
  title?: string;
};

export const DynamicNavList = (props: TDynamicNav) => {
  let { id } = props;

  async function fetchData() {
    let dataFetched = await getNavigationJson(id);
    setData(dataFetched);
  }

  const [data, setData] = useState<NavigationItem[]>();

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);
  return (
    <>
      {data &&
        data.map((navItem, index) => {
          switch (navItem.__typename) {
            case NavTypes.ExternalLink:
              return (
                <a
                  key={index}
                  href={navItem.url ?? ""}
                  className="nav-link"
                  data-test="full link"
                >
                  {navItem.title}
                </a>
              );
            case NavTypes.VotingPage:
            case NavTypes.BlogPost:
              return (
                <Link key={index} to={navItem.slug ?? ""} className="nav-link">
                  {navItem.title}
                </Link>
              );
            case NavTypes.NavigationGroup:
              return (
                <DynamicNavDropDown
                  key={index}
                  id={navItem?.sys?.id ?? "123"}
                  title={navItem.title}
                ></DynamicNavDropDown>
              );
            default:
              return <></>;
          }
        })}
    </>
  );
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
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <DynamicNavList id={id} title={title}></DynamicNavList>
      </Nav>
      <Nav>
        <Link to="memberArea" className="nav-link">
          Member Area
        </Link>
      </Nav>
    </Navbar.Collapse>
  );
};
