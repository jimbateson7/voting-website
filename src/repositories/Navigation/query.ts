//generate by
//https://app.contentful.com/spaces/fojlfyn3xufg/environments/staging/entries/1n9FMvYa8MWstVI19atW2w
//graphqlplayground
//2EASI81WCZEAsg9bRP370U
export function generateNavQuery(id: string) {
  return `
  query findNavById{
  navigationGroup(id: "${id}") {
 
      navigationItemCollection(limit: 10) {
        items {
          __typename
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
            introVideo
            postVoteVideo
          }
        }
      }
    }
  }


`;
}
