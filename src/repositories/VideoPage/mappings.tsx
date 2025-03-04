import {QueryResult, VideoItem} from "./types";
import {TVideoPage} from "../../pages/VideoPage";


export async function mapVideoData(result: QueryResult): Promise<TVideoPage> {

    const actualPost = result?.data?.allVideoPageModels?.shift() as VideoItem;

    if (!actualPost) {
        throw new Error("no video data");
    }
    return {
        header: actualPost.title,
        introText: actualPost.introText,
        videoTitle: actualPost.mainVideo?.video?.video?.title ?? undefined,
        mainVideo: actualPost.mainVideo,
        videoThumbnail: actualPost.mainVideo?.thumbnailImage.responsiveImage.src,
   
    };
}