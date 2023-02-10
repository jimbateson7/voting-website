
import type { Document, Link } from '@contentful/rich-text-types';
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

export interface Image {
  title: string;
  url: string;
  description: string;
}

export interface Item {
  sys: Sys;
  title: string;
  author: Author;
  slug: string;
  image: Image;
  body: ContentfulContent;
}

export interface Sys {
  id: string;
}

export interface Author {
  name: string;
  image: any;
}

export interface ContentfulContent {
  json: Document;
  links: Link;
}



