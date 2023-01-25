import { Document } from "@contentful/rich-text-types";
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
  description: string;
  author: Author;
  slug: string;
  image: Image;
  body: Body;
}

export interface Sys {
  id: string;
}

export interface Author {
  name: string;
  image: any;
}

export interface Body {
  json: Document;
  links: Links;
}

export interface Content {
  nodeType: string;
  data: Data3;
  content: Content2[];
}

export interface Data3 {
  target?: Target;
}

export interface Target {
  sys: Sys2;
}

export interface Sys2 {
  id: string;
  type: string;
  linkType: string;
}

export interface Content2 {
  nodeType: string;
  value?: string;
  marks?: Mark[];
  data: Data4;
  content?: Content3[];
}

export interface Mark {
  type: string;
}

export interface Data4 {
  uri?: string;
}

export interface Content3 {
  nodeType: string;
  value: string;
  marks: any[];
  data: Data5;
}

export interface Data5 {}

export interface Links {
  entries: Entries;
  assets: Assets;
}

export interface Entries {
  inline: any[];
  block: any[];
}

export interface Assets {
  block: Block[];
}

export interface Block {
  sys: Sys3;
  url: string;
  title: string;
  width: number;
  height: number;
  description: string;
}

export interface Sys3 {
  id: string;
}
