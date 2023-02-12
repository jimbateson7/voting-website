//generate by
//https://app.contentful.com/spaces/fojlfyn3xufg/environments/staging/entries/1n9FMvYa8MWstVI19atW2w
//graphqlplayground
//2EASI81WCZEAsg9bRP370U
import {DEBUG_QUERY, getPreview} from "../utils/preview";
import {LogQuery} from "../utils/utilities";

export function generateNavQuery(id: string) {

  const isPreview = getPreview();
  const query =  `
  query findNavById{
  navigationGroup(id: "${id}" preview:${isPreview}) {
 
      navigationItemCollection(limit: 10) {
        items {
          __typename
          ... on VideoPage {
            title
            slug
          }
          ... on BlogPost {
            title
            slug
          }
          ... on ExternalLink {
            title
            url
          }
          ... on NavigationGroup {
            title
            
            sys{id}
            
          }
          ... on VotingPage {
            title
            introVideo
            postVoteVideo
          }
        }
      }
    }
  }


`;
  
  LogQuery(query)
  return query;
}
