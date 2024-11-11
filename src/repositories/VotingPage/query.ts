//generate by
//https://app.contentful.com/spaces/fojlfyn3xufg/environments/staging/entries/1n9FMvYa8MWstVI19atW2w
//graphqlplayground

import {getPreview} from "../utils/preview";
import {LogQuery} from "../utils/utilities";
import {QueryBlocks} from "../Common/query";

export function generateVotingPageQuery(id: string, locale:string) {

    const isPreview = getPreview();
    const filter = "";//id ? `filter: {id: {eq:"${id}"}}, ` : "";
    const query = `query videoPageCollectionQuery {
      votingPageModel( ${filter} locale:${locale}, fallbackLocales:[en, en_US]) 
      {
        
          
         ${QueryBlocks.VotingPage}
        
      }
    }`

    console.log("here is the query")
    LogQuery(query);

    return query;
}
