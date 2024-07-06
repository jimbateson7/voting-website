import type { StructuredText as TStructuredText } from 'datocms-structured-text-utils';

export interface QueryResult {
  data: Data;
  errors: [];
}

export interface Data {
  allBlogPostModels: Item[];
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
  body: TStructuredText; //ContentfulContent;
}

export interface Sys {
  id: string;
}

export interface Author {
  name: string;
  image: any;
}

/*
export interface ContentfulContent {
  value: Document;
  links: Link;
}*/



