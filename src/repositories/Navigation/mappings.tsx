import { NavigationItem, QueryResult } from "./types";
import {
    CONTENT_URL,
    APP_CONTENTFUL_ACCESS_TOKEN,
    APP_CONTENTFUL_ENVIRONMENT,
    APP_CONTENTFUL_SPACE_ID, node_env
} from "../utils/graphQLfetch";

export const mapNavData = (root: QueryResult) => {

    if (root.errors) {
        console.log("Errors reported:");
        console.log(root.errors);
        console.log("Space Id:" + APP_CONTENTFUL_SPACE_ID);
        console.log("Token:" + APP_CONTENTFUL_ACCESS_TOKEN);
        console.log("environment:" + APP_CONTENTFUL_ENVIRONMENT);
        console.log("system environment:" +node_env);
        console.log("url:" + CONTENT_URL);
    }
    
  let validNavItems: NavigationItem[] = [];
  root.data.navigationGroup.navigationItemCollection.items.map(
    (navItem, index) => {
      if (!navItem) {
        console.log(`nav item ${index} was null`);
        return null;
      }
      validNavItems.push(navItem);
    }
  );

  return validNavItems;
};
