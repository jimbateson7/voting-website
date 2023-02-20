import { NavigationItem, QueryResult } from "./types";
import {getLogger} from "../../utils/logger";


export const mapNavData = (root: QueryResult) => {
    
  let validNavItems: NavigationItem[] = [];
  root.data.navigationGroup.navigationItemCollection.items.forEach(
    (navItem, index) => {
      if (!navItem) {
         
        const logger =  getLogger('Nav-Info')
        logger.error(`nav item ${index} was null`);       
        return null;
      }
      
        validNavItems.push(navItem);
    }
  );
    
  return validNavItems;
};
