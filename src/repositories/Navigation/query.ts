//generate by
//https://app.contentful.com/spaces/fojlfyn3xufg/environments/staging/entries/1n9FMvYa8MWstVI19atW2w
//graphqlplayground
//2EASI81WCZEAsg9bRP370U
import {getPreview} from "../utils/preview";
import {QueryBlocks} from "../Common/query";
import {LogQuery} from "../utils/utilities";

//todo rename to "Page Group"
function buildNavigationGroup(levels:number):string
{
    levels--
    if(levels >= 0)
        return `navigationItemCollection(limit: 10) {
        
        
        items {
          ${QueryBlocks.BasicNavigationItems}
          ... on ExternalLink {
            title
            url
          } 
          ... on NavigationGroup {
            title            
            sys{id}            
             ${buildNavigationGroup(levels)}
             hideInHeader
             showVideoThumbnailsInHub
          }
        }
      }`;
    return "";
}
export const navigationGroup = buildNavigationGroup(3)

export function generateNavQuery(id: string) {

    const isPreview = getPreview();
    const query =  `
  query findNavById{
  navigationGroup(id: "${id}" preview:${isPreview}) {
 
      ${navigationGroup}
      
    }
  }`;
    

  LogQuery(query)
    return query;
}
