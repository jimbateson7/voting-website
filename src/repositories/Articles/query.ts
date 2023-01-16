//generate by
//https://app.contentful.com/spaces/fojlfyn3xufg/environments/staging/entries/1n9FMvYa8MWstVI19atW2w
//graphqlplayground

export function generatePostQuery(slug: string) {
  return `query blogPostCollectionQuery{
    blogPostCollection(limit: 1, where: {slug: "test"}) {
      items {
        sys {
          id
        }
        title,
        description,
        author{name,image{title,url}}
        slug
        description
        image{title,url}
        body {
          json
          
          links {
            entries {
              inline {
                sys {
                  id
                }
                __typename
                ... on BlogPost {
                  title
                  slug
                }
              }
              block {
                sys {
                  id
                }
                __typename
            
                ... on VideoEmbed {
                  __typename
                  embedUrl{url}
                  title
                }
                 ... on  GenericImage{
                  __typename
                  image{url}
                  title
                  
                }
                ... on  YoutubeVideoEmbed{
                  __typename
                  ytembedUrl
                  title
                  
                }
              }
            }
            assets {
              block {
                sys {
                  id
                }
                url
                title
                width
                height
                description
              }
            }
          }
        }
      }
    }
  }
`;
}
