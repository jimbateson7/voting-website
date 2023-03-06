import {getNavigationJson} from "../repositories/Navigation/request";
import React, {useCallback, useEffect, useState} from "react";
import {NavigationItem, ContentTypes} from "../repositories/Navigation/types";
import Nav from "react-bootstrap/Nav";
import {NavDropdown} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";

export type TDynamicNav = {
  id: string;
  title?: string;
  onSelect?: ()=>{};
};


export const DynamicNavList = (props: TDynamicNav) => {
  let { id, onSelect } = props;

  const fetchData = useCallback(async () => {
    let dataFetched = await getNavigationJson(id);
    setData(dataFetched);
  }, [id])
  
  const [data, setData] = useState<NavigationItem[]>();

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);
  return (
    <>
      {data &&
        data.map((navItem, index) => {
          switch (navItem.__typename) {
            case ContentTypes.ExternalLink:
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
            case ContentTypes.VotingPage:
              return (
                <Nav.Link onClick={onSelect} as={NavLink} key={index} to={navItem.slug ?? ""} className="nav-link">
                  {"Vote"}
                </Nav.Link>
              );
            case ContentTypes.VideoPage:
            case ContentTypes.BlogPost:
              return (
              
                <Nav.Link onClick={onSelect} as={NavLink} key={index} to={navItem.slug ?? ""} className="nav-link">
                  {navItem.title}
                </Nav.Link>
              );
            case ContentTypes.NavigationGroup:
              return (            
              <NavDropdown key={index} title={navItem.title ?? "_"} id="basic-nav-dropdown">
                <DynamicNavList onSelect={onSelect} id={navItem?.sys?.id ?? "123"}></DynamicNavList>
              </NavDropdown>
              );
            default:
              return <></>;
          }
        })}
    </>
  );
};
