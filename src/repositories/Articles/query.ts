//generate by
//https://app.contentful.com/spaces/fojlfyn3xufg/environments/staging/entries/1n9FMvYa8MWstVI19atW2w
//graphqlplayground

export function generatePostQuery(slug: string) {
  return `query blogPostCollectionQuery {
  blogPostCollection(where:{slug:"${slug}"}) {
 
    items {
      sys {
      id
    }
    # add the fields you want to query
    author{
      name,
      image{
url}
    }
    title,
    slug,
    body,
    description,
    bodyRichText{json},
  }
  }
}
`;
}
