import { QueryResult } from "./types";
import { TPage } from "../../components/Page";
import {
  CONTENT_URL,
  APP_CONTENTFUL_ACCESS_TOKEN,
  APP_CONTENTFUL_ENVIRONMENT,
  APP_CONTENTFUL_SPACE_ID, node_env,
} from "../utils/graphQLfetch";
import { richTextToReactNode } from "./contentfulRenderFunction";

export async function mapBlogData(result: QueryResult): Promise<TPage> {
  if (result.errors) {
    console.log("Errors reported:");
    console.log(result.errors);
    console.log("Space Id:" + APP_CONTENTFUL_SPACE_ID);
    console.log("Token:" + APP_CONTENTFUL_ACCESS_TOKEN);
    console.log("environment:" + APP_CONTENTFUL_ENVIRONMENT);
    console.log("system environment:" +node_env);
    console.log("url:" + CONTENT_URL);
  }
  const actualPost = result.data.blogPostCollection.items[0];

  let react = null;
  try {
    react = richTextToReactNode(actualPost.body.json, actualPost.body.links);
  } catch (e) {
    console.log(e);
  }

  const model: TPage = {
    header: actualPost.title,
    heroImageUrl: actualPost.image?.url,
    heroImageAltText: actualPost.image?.description,
    richText: react,
  };
  return model;
}
