import {mapBlogData, mapBlogPost} from "./mappings";
import {QueryResult} from "./types";
import {generatePostQuery, generatePostQueryPaginated} from "./query";
import {fetchDataContentful} from "../utils/graphQLfetch";

export const getPageJson = (slug: string, locale: string) => {
    const query = generatePostQuery(slug, locale);
    return fetchDataContentful<QueryResult>(query).then((root: QueryResult) => {
        return mapBlogData(root); //todo handle failure outside of function
    });
};

export const getPagesJson = (pageNumber: number, locale: string, blogsPerPage: number = 10) => {
    const query = generatePostQueryPaginated(pageNumber, locale, blogsPerPage);
    return fetchDataContentful<QueryResult>(query).then((root: QueryResult) => {
        return root.data.allBlogPostModelNews.map(mapBlogPost)

    });
};