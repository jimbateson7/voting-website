import {getNavigationJson} from "../repositories/Navigation/request";
import React, {useEffect, useState} from "react";
import {NavigationItem, NavTypes} from "../repositories/Navigation/types";
import {Link} from "react-router-dom";
import {DynamicNavDropDown, TDynamicNav} from "./DynamicNav";

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
              return (
                <Link key={index} to={navItem.slug ?? ""} className="nav-link">
                  {"Vote"}
                </Link>
              );
            case NavTypes.VideoPage:
            case NavTypes.BlogPost:
              return (
                <Link key={index} to={navItem.slug ?? ""} className="nav-link">
                  {navItem.title}
                </Link>
              );
            case NavTypes.NavigationGroup:
              return (
                  navItem.hideInHeader ? null :
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
