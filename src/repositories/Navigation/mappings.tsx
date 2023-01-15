import { QueryResult } from "./types";

export const mapNavData = (root: QueryResult) => {
  return root.data.navigationGroup.navigationItemCollection.items;
};
