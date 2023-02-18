import { useEffect, useState } from "react";
import { NavigationItem } from "../repositories/Navigation/types";
import { getNavigationJson } from "../repositories/Navigation/request";
import { Link } from "react-router-dom";
import {DEBUG_QUERY} from "../repositories/utils/preview";
import {LogLinks} from "../repositories/utils/utilities";
import {flattenNavigationRoute} from "../FlattenNavigationRoute";

export const DynamicFooter = ({ id }) => {
  const [links, setLinks] = useState([{ link: "privacy", title: "privacy" }]);

  async function fetchData() {
    const slugs = await flattenNavigationRoute(id);
    const sentLinks = slugs.map((x) => ({ link: x.slug, title: x.title }));
    setLinks(sentLinks);
    
    LogLinks(sentLinks)
    
  }

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  return (
    <footer className="bg-light">
      <ul>
        {links &&
          links.map((x,index) => {
            return (
              <li key={index}>
                <Link to={`/${x.link}`} className="nav-link">
                  {x.title}
                </Link>
              </li>
            );
          })}
      </ul>
    </footer>
  );
};
