import { generatePostQuery } from "./query";
import { fetchDataContentful } from "../utils/graphQLfetch";
import {QueryResult} from "./types";
import {mapVideoData} from "./mappings";


export const getVideoPageJson = (slug: string) => {
  const query = generatePostQuery(slug);
  return fetchDataContentful<QueryResult>(query).then((root: QueryResult) => {    
    return mapVideoData(root);
  });
};

