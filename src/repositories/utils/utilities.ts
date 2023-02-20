import {
    APP_CONTENTFUL_ACCESS_TOKEN,
    APP_CONTENTFUL_ENVIRONMENT,
    APP_CONTENTFUL_SPACE_ID,
    CONTENT_URL,
    node_env
} from "./graphQLfetch";
import {ContentTypes, NavigationItem} from "../Navigation/types";
import {getNavigationJson} from "../Navigation/request";
import {DEBUG_QUERY} from "./preview";
import {getLogger} from "../../utils/logger";

function isEmptyOrSpaces(str : string){
    return str === null || str.match(/^ *$/) !== null;
}

export function createAnchorLinkFromTitle(link:string) :string
{
    let text = `${link}`;
    text = text.trim().toLowerCase();
    text = text.replace(" ", "-");
    return text;
}

export const extractYoutubeVideoId = (fullUrl?: string): string | undefined => {
    if (!fullUrl  || isEmptyOrSpaces(fullUrl)) return undefined;

    //this way someone can add a "watch/embed/share/the id" yt link and it will still work
    return  fullUrl.slice(-11);
};

export const extractYoutubeVideoUrl = (video: string, autoPlay: boolean = false): string | undefined => {
    let videoId = extractYoutubeVideoId(video);
    if(!videoId)
        return undefined;
    
    let autoPlayUrl = autoPlay ? 1 : 0;
    let videoUrl = `https://www.youtube.com/embed/${videoId}?&autoplay=${autoPlayUrl}`;
    return videoUrl;
};

export function LogLinks(sentLinks:any)
{
    const logger = getLogger('Footer Log');
    if(process.env.NODE_ENV === "development" && DEBUG_QUERY) {
        logger.info("Fetching link data");
        logger.info(sentLinks);
    }
}
export function LogQuery(query:string)
{
    const logger = getLogger('Query Log');
    logger.info("Query called is:")
    logger.info(query);
    logger.info("EOF Query")

    //if(process.env.NODE_ENV == "development" && DEBUG_QUERY) console.log(query);
}

export function HandleErrors(result:any) {
    const logger = getLogger('Query Error');
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

export async function flattenNavigationRoute(
    id: string
): Promise<NavigationItem[]> {

    let dataFetched = await getNavigationJson(id);
    let childIds: string[] = dataFetched
        .filter((x) => x.__typename == ContentTypes.NavigationGroup)
        .map((x) => x.sys?.id ?? "INVALID")
        .filter((x) => x != "INVALID");
    for (const childId of childIds) {
        dataFetched = dataFetched.concat(await flattenNavigationRoute(childId));
    }
    return dataFetched;
}