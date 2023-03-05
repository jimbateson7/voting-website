import {QueryResult, VideoItem} from "./types";
import {TVideoPage} from "../../components/VideoPage";
import {extractYoutubeVideoUrl, HandleErrors} from "../utils/utilities";

export async function mapVideoData(result: QueryResult): Promise<TVideoPage> {
  
  const actualPost = result.data.videoPageCollection.items[0] as VideoItem;
   const video = extractYoutubeVideoUrl(actualPost.video.ytembedUrl,actualPost.video.autoPlay)
  const model: TVideoPage = {
    header: actualPost.title,
    autoPlay: actualPost.video.autoPlay,
    videoTitle: actualPost.video.title,
       
    videoUrl: video,
  };
  return model;
}