//generate by
//https://app.contentful.com/spaces/fojlfyn3xufg/environments/staging/entries/1n9FMvYa8MWstVI19atW2w
//graphqlplayground

import {DEBUG_QUERY, getPreview} from "../utils/preview";

export function generatePostQuery(slug: string) {

 
  const isPreview = getPreview();
  const query = `query videoPageCollectionQuery {
  videoPageCollection(limit: 1,where:{slug:"${slug}"}, preview:${isPreview}) {
    items {
      sys {
        id
      }
      __typename
      slug
      title
      video{ytembedUrl,autoPlay,title}
      # add the fields you want to query
    }
  }
}`
  
  if(process.env.NODE_ENV == "development" && DEBUG_QUERY) console.log(query);
 
  return query;
}
