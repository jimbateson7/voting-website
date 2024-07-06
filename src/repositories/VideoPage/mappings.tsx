import {QueryResult, VideoItem} from "./types";
import {TVideoPage} from "../../components/VideoPage";

export async function mapVideoData(result: QueryResult): Promise<TVideoPage> {
  
  const actualPost = result.data.allVideoPageModels.shift() as VideoItem;

  if(!actualPost)
  {
    throw new Error("no video data");
  }
  return {
    header: actualPost.title,
    autoPlay: actualPost.video.autoPlay,
    videoTitle: actualPost.video.title,
    introText: actualPost.introText,
    videoUrl: actualPost.video.ytembedUrl,
  };
}