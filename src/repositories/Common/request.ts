import {fetchDataContentful} from "../utils/graphQLfetch";
import {QueryResult} from "./types";
import {NavigationItem} from "../Navigation/types";
import {LogErrors, LogException} from "../utils/utilities";



function generateAllPagesQuery()
{
    const query =  `query navQuery {
  blogPostCollection {
    items {
  		 slug
  		 __typename
      # add the fields you want to query
    }
  }
  videoPageCollection{
    items {
  		 slug
  		 __typename
      # add the fields you want to query
    }
  }
  votingPageCollection{
    items {
    __typename
  	  introVideo
      postVoteVideo
      title
  		 
      # add the fields you want to query
    }
  }
}`    
    return query;
}
function mapAllSlugs(root: QueryResult) :NavigationItem[]
{
    // todo there may be something a bit smarter we can do in graphql 
    return root.data.videoPageCollection.items
                .concat(root.data.blogPostCollection.items)
                .concat(root.data.votingPageCollection.items);
}

export const getAllNavData = () => {
    const query = generateAllPagesQuery();
    return fetchDataContentful<QueryResult>(query).then((root: QueryResult) => {
        if(root.errors)
            LogErrors(root.errors)
       
        return mapAllSlugs(root); //todo handle failure outside of function
    });
};