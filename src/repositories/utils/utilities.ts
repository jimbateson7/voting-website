
import {
    APP_CONTENTFUL_ACCESS_TOKEN,
    APP_CONTENTFUL_ENVIRONMENT,
    APP_CONTENTFUL_SPACE_ID,
    CONTENT_URL,
    node_env
} from "./graphQLfetch";
import { Logger } from 'aws-amplify';
import {DEBUG_QUERY} from "./preview";

export const extractYoutubeVideoId = (fullUrl?: string): string => {
    if (!fullUrl) return "Invalid Video";

    //this way someone can add a "watch/embed/share/the id" yt link and it will still work
    const youtubeId = fullUrl.slice(-11);

    return youtubeId;
};

export const extractYoutubeVideoUrl = (video: string, autoPlay: boolean = false): string => {
    let videoId = extractYoutubeVideoId(video);
    let autoPlayUrl = autoPlay ? 1 : 0;
    let videoUrl = `https://www.youtube.com/embed/${videoId}?&autoplay=${autoPlayUrl}`;
    return videoUrl;
};

export function LogLinks(sentLinks:any)
{
    const logger = new Logger('Footer Log');
    if(process.env.NODE_ENV === "development" && DEBUG_QUERY) {
        logger.info("Fetching link data");
        logger.info(sentLinks);
    }
}
export function LogQuery(query:string)
{
    const logger = new Logger('Query Log');
    logger.info("Query called is:")
    logger.info(query);
    logger.info("EOF Query")

    //if(process.env.NODE_ENV == "development" && DEBUG_QUERY) console.log(query);
}

export function HandleErrors(result:any) {
    const logger = new Logger('Query Error');
    if (result.errors) {
        logger.error("Errors reported:");
        logger.error(result.errors);
        logger.error("Space Id:" + APP_CONTENTFUL_SPACE_ID);
        logger.error("Token:" + APP_CONTENTFUL_ACCESS_TOKEN);
        logger.error("environment:" + APP_CONTENTFUL_ENVIRONMENT);
        logger.error("system environment:" + node_env);
        logger.error("url:" + CONTENT_URL);
    }
}
