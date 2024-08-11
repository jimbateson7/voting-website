//generate by
//https://app.contentful.com/spaces/fojlfyn3xufg/environments/staging/entries/1n9FMvYa8MWstVI19atW2w
//graphqlplayground

import {getPreview} from "../utils/preview";
import {LogQuery} from "../utils/utilities";

export function generateVideoPageQuery(slug: string) {

    const isPreview = getPreview();
    const query = `query videoPageCollectionQuery {
  allVideoPageModels(first: 1, filter: {slug: {eq:"${slug}"}} , fallbackLocales:[en, en_US]) 
  {
    
      
       id
      
      __typename
      slug
      title
      introText
      video{ytembedUrl,autoPlay,title}
      # add the fields you want to query
    
  }
}`

    LogQuery(query);

    return query;
}
