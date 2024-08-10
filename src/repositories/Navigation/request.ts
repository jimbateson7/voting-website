import {QueryResult} from "./types";
import {generateNavQuery} from "./query";
import {fetchDataContentful} from "../utils/graphQLfetch";
import {mapNavData} from "./mappings";

export const getNavigationJson = (id:string) => {
  const query = generateNavQuery(id);
    
 
  return fetchDataContentful<QueryResult>(query).then((root: QueryResult) => {
    console.log("query is")
    console.log(query)
    console.log("root is")
    console.log(root);
    const mapped = mapNavData(root); //todo handle failure outside of function
    console.log("Mapped data is")
    console.log(mapped);
    
    return mapped;
  });
};

