//generate by
//https://app.contentful.com/spaces/fojlfyn3xufg/environments/staging/entries/1n9FMvYa8MWstVI19atW2w
//graphqlplayground
import {getPreview} from "../utils/preview";
import {navigationGroup} from "../Navigation/query";
import {LogQuery} from "../utils/utilities";
import {QueryBlocks} from "../Common/query";

export function generatePostQueryPaginated(page: number, locale: string, blogsPerPage: number = 10) {

    const first: number = blogsPerPage;
    const skip: number = page * blogsPerPage;
    return generatePostQueryFrom(locale, true, undefined, first, skip);
}

function generatePostQueryFrom(locale:string, shortBlog: boolean, sentSlug: string | undefined, first: number, skip: number) {
    const queryString = sentSlug ? `, filter: {slug: {eq:"${sentSlug}"}}` : "";
    const query = `query blogPostCollectionQuery{
    allBlogPostModel${shortBlog ? "News" : "s"}(first: ${first}, skip:${skip} ${queryString}, locale:${locale}, fallbackLocales:[en, en_US]) 
    {
      
      
        id        
        title,    
        
         ${!shortBlog ? `  
        author{name,image{title,url}}       
        slug    
        image{title,url,alt}` : ""
    }
        
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

export function generatePostQuery(slug: string, locale: string) {
    const isPreview = getPreview();
    const first: number = 1;
    const skip: number = 0;
    const sentSlug: string | undefined = slug;
    return generatePostQueryFrom(locale,false, sentSlug, first, skip);
}
