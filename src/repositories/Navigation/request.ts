import {QueryResult} from "./types";
import {generateNavQuery} from "./query";
import {fetchDataDato} from "../utils/graphQLfetch";
import {mapNavData} from "./mappings";

export const getNavigationJson = (id: string, locale:string) => {
    const query = generateNavQuery(id,locale);


    return fetchDataDato<QueryResult>(query).then((root: QueryResult) => {

        //todo handle failure outside of function
        return mapNavData(root);
    });
};

