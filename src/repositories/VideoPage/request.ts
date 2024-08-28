import {generateVideoPageQuery} from "./query";
import {fetchDataDato} from "../utils/graphQLfetch";
import {QueryResult} from "./types";
import {mapVideoData} from "./mappings";


export const getVideoPageJson = (slug: string, locale:string) => {
    const query = generateVideoPageQuery(slug, locale);
    return fetchDataDato<QueryResult>(query).then((root: QueryResult) => {
        return mapVideoData(root);
    });
};

