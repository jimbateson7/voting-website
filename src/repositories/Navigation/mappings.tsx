import { NavigationItem, QueryResult } from "./types";
import {
    CONTENT_URL,
    APP_CONTENTFUL_ACCESS_TOKEN,
    APP_CONTENTFUL_ENVIRONMENT,
    APP_CONTENTFUL_SPACE_ID, node_env
} from "../utils/graphQLfetch";
import {Logger} from "aws-amplify";

export const mapNavData = (root: QueryResult) => {

    
  let validNavItems: NavigationItem[] = [];
  root.data.navigationGroup.navigationItemCollection.items.map(
    (navItem, index) => {
      if (!navItem) {
        const logger = new Logger('null');
        logger.error(`nav item ${index} was null`);       
        return null;
      }
      validNavItems.push(navItem);
    }
  );

  return validNavItems;
};
