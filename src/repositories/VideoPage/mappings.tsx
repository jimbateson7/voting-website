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
        videoTitle: actualPost.mainVideo?.video?.title ?? undefined,
        mainVideo: actualPost.mainVideo,
        video: actualPost.video
    };
}