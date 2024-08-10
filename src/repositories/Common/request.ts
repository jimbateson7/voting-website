import {fetchDataContentful} from "../utils/graphQLfetch";
import {QueryResult} from "./types";
import {NavigationItem} from "../Navigation/types";
import {LogErrors, LogException} from "../utils/utilities";
import {QueryBlocks} from "./query";



function generateAllPagesQuery()
{
    const query =  `query pageQuery {
      allBlogPostModels {
       __typename
       ${QueryBlocks.BlogPost}  	
    
  }
  allVideoPageModels{
         __typename
      ${QueryBlocks.VideoPost}  	
    
  }
  allVotingPageModels{
    
    __typename
  	  ${QueryBlocks.VotingPage}  		 

    
  }
}`    
    return query;
}
function mapAllSlugs(root: QueryResult) :NavigationItem[]
{
    return root?.data?.allVideoPageModels
                .concat(root.data.allBlogPostModels)
                .concat(root.data.allVotingPageModels);
}

export const getAllNavData = () => {
    const query = generateAllPagesQuery();
    return fetchDataContentful<QueryResult>(query).then((root: QueryResult) =>
    {
    
        if(root.errors)
            LogErrors(root.errors)
       
        return mapAllSlugs(root); //todo handle failure outside of function
        
    });
};