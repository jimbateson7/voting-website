import { mapBlogData } from "./mappings";
import { QueryResult } from "./types";
import { generatePostQuery } from "./query";
import { fetchDataContentful } from "../utils/graphQLfetch";

export const getPageJson = (slug: string) => {
  const query = generatePostQuery(slug);
  return fetchDataContentful<QueryResult>(query).then((root: QueryResult) => {
    return mapBlogData(root); //todo handle failure outside of function
  });
};

