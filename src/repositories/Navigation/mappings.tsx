import { NavigationItem, QueryResult } from "./types";

export const mapNavData = (root: QueryResult) => {
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
