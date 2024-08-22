
import {fetchDataDato} from "../utils/graphQLfetch";
import {QueryResult} from "./types";
import { mapVotingPage} from "./mappings";
import {generateVotingPageQuery} from "./query";
import {LogQuery} from "../utils/utilities";


export const getVotingPageJson = (slug: string, locale:string) => {
    const query = generateVotingPageQuery(slug, locale);

    return fetchDataDato<QueryResult>(query).then((root: QueryResult) => {
        return mapVotingPage(root);
    });
};

