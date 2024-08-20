import {generateVideoPageQuery} from "./query";
import {fetchDataContentful} from "../utils/graphQLfetch";
import {QueryResult} from "./types";
import {mapVideoData} from "./mappings";


export const getVideoPageJson = (slug: string, locale:string) => {
    const query = generateVideoPageQuery(slug, locale);
    return fetchDataContentful<QueryResult>(query).then((root: QueryResult) => {
        return mapVideoData(root);
    });
};

