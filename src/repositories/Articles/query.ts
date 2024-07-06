//generate by
//https://app.contentful.com/spaces/fojlfyn3xufg/environments/staging/entries/1n9FMvYa8MWstVI19atW2w
//graphqlplayground
import {getPreview} from "../utils/preview";
import {navigationGroup} from "../Navigation/query";
import {LogQuery} from "../utils/utilities";
import {QueryBlocks} from "../Common/query";

export function generatePostQuery(slug: string) { 
  const isPreview = getPreview();
  const query = `query blogPostCollectionQuery{
    allBlogPostModels(first: 1, filter: {slug: {eq:"${slug}"}}) 
    {
      
      
        id        
        title,       
        author{name,image{title,url}}
        slug    
        image{title,url,alt}
        
        body {
              value 
              
                  links
                  {       
        
                        ... on  BlogPostModelRecord{                  
                          ${QueryBlocks.BlogPost}
                        }
                  
                         ... on  GenericImageModelRecord{
                          __typename
                          image{url}
                          title
                          
                        }
                        ... on  NavigationGroupModelRecord{
                          __typename                 
                          title
                          showVideoThumbnailsInHub
                          ${navigationGroup}
                        }
                        ... on  YoutubeVideoEmbedModelRecord{
                          __typename
                          ytembedUrl
                          title
                          autoPlay
                          
                        }
                      
                  }
            
              }
        
      }
    
  }
`;

  LogQuery(query);
  return query;
}
