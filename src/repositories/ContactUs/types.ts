export interface QueryResult {
  data: Data;
  errors: [];
}

export interface Data {
  blogPostCollection: BlogPostCollection;
}

export interface BlogPostCollection {
  items: Item[];
}

export interface Item {
  sys: Sys;
  author: Author;
  title: string;
  slug: string;
  body: string;
  description: string;
}

export interface Sys {
  id: string;
}

export interface Author {
  name: string;
  image: any;
}
