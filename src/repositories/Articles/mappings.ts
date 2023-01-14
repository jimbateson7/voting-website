import { QueryResult } from "./types";
import { TPage } from "../../components/Page";
import {
  CONTENT_URL,
  REACT_APP_CONTENTFUL_ACCESS_TOKEN,
  REACT_APP_CONTENTFUL_ENVIRONMENT,
  REACT_APP_CONTENTFUL_SPACE_ID,
} from "../utils/graphQLfetch";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

//import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
//import {richTextFromMarkdown} from "@contentful/rich-text-from-markdown";

export async function mapBlogData(data: QueryResult): Promise<TPage> {
  if (data.errors) {
    console.log(data.errors);
    console.log("Space Id:" + REACT_APP_CONTENTFUL_SPACE_ID);
    console.log("Token:" + REACT_APP_CONTENTFUL_ACCESS_TOKEN);
    console.log("environment:" + REACT_APP_CONTENTFUL_ENVIRONMENT);
    console.log("url:" + CONTENT_URL);
  }
  const actualPost = data.data.blogPostCollection.items[0];
  //   const document = await richTextFromMarkdown(actualPost.body);
  const react = documentToReactComponents(actualPost.bodyRichText);
  const model: TPage = {
    header: actualPost.title,
    body: actualPost.body,
    richText: react,
  };
  return model;
}
