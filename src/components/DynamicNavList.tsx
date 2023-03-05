import {getNavigationJson} from "../repositories/Navigation/request";
import React, {useCallback, useEffect, useState} from "react";
import {NavigationItem, ContentTypes} from "../repositories/Navigation/types";
import {Link} from "react-router-dom";
import {DynamicNavDropDown, TDynamicNav} from "./DynamicNav";
import Nav from "react-bootstrap/Nav";

export const DynamicNavList = (props: TDynamicNav) => {
  let { id } = props;

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
                <Nav.Link key={index} href={navItem.slug ?? ""} className="nav-link">
                  {"Vote"}
                </Nav.Link>
              );
            case ContentTypes.VideoPage:
            case ContentTypes.BlogPost:
              return (
              
                <Nav.Link key={index} href={navItem.slug ?? ""} className="nav-link">
                  {navItem.title}
                </Nav.Link>
              );
            case ContentTypes.NavigationGroup:
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
