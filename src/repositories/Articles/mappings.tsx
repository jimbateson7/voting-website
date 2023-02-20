import { QueryResult } from "./types";
import { TPage } from "../../components/Page";
import {
  CONTENT_URL,
  APP_CONTENTFUL_ACCESS_TOKEN,
  APP_CONTENTFUL_ENVIRONMENT,
  APP_CONTENTFUL_SPACE_ID, node_env,
} from "../utils/graphQLfetch";
import { richTextToReactNode } from "./contentfulRenderFunction";
import {getLogger} from "../../utils/logger";

export async function mapBlogData(result: QueryResult): Promise<TPage> {
  
  const actualPost = result.data.blogPostCollection.items[0];
  
  let react = null;
  try {
    react = richTextToReactNode(actualPost.body.json, actualPost.body.links);
  } catch (e) {
    const logger = getLogger('Exception');
    logger.error(e);
  }

  const model: TPage = {
    header: actualPost.title,
    heroImageUrl: actualPost.image?.url,
    heroImageAltText: actualPost.image?.description,
    richText: react,
  };
  return model;
}
