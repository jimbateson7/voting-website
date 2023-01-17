import { useEffect, useState } from "react";
import { NavigationItem } from "../repositories/Navigation/types";
import { getNavigationJson } from "../repositories/Navigation/request";
import { Link } from "react-router-dom";
import { flattenNavigationRoute } from "../App";

export const DynamicFooter = ({ id }) => {
  const [links, setLinks] = useState([{ link: "privacy", title: "privacy" }]);

  async function fetchData() {
    let slugs = await flattenNavigationRoute(id);
    let sentLinks = slugs.map((x) => ({ link: x.slug, title: x.title }));
    setLinks(sentLinks);
    console.log(sentLinks);
  }

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  return (
    <footer className="bg-light">
      <ul>
        {links &&
          links.map((x) => {
            return (
              <li>
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
