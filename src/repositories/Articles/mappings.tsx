import { QueryResult } from "./types";
import { TPage } from "../../components/Page";
import {
  CONTENT_URL,
  REACT_APP_CONTENTFUL_ACCESS_TOKEN,
  REACT_APP_CONTENTFUL_ENVIRONMENT,
  REACT_APP_CONTENTFUL_SPACE_ID,
} from "../utils/graphQLfetch";

import { richTextToReactNode } from "./contentfulRenderOptions";

export async function mapBlogData(result: QueryResult): Promise<TPage> {
  if (result.errors) {
    console.log("Errors reported:" + result.errors);
    console.log("Space Id:" + REACT_APP_CONTENTFUL_SPACE_ID);
    console.log("Token:" + REACT_APP_CONTENTFUL_ACCESS_TOKEN);
    console.log("environment:" + REACT_APP_CONTENTFUL_ENVIRONMENT);
    console.log("url:" + CONTENT_URL);
  }
  const actualPost = result.data.blogPostCollection.items[0];

  let react = null;
  try {
    react = richTextToReactNode(actualPost.body.json);
  } catch (e) {
    console.log(e);
  }

  const model: TPage = {
    header: actualPost.title,

    richText: react,
  };
  return model;
}
