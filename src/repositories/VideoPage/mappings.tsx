import {QueryResult, VideoItem} from "./types";
import {TVideoPage} from "../../components/VideoPage";
import {extractYoutubeVideoId, HandleErrors} from "../utils/utilities";

export async function mapVideoData(result: QueryResult): Promise<TVideoPage> {


  HandleErrors(result);
  const actualPost = result.data.videoPageCollection.items[0] as VideoItem;
 
  const model: TVideoPage = {
    header: actualPost.title,
    autoPlay: actualPost.video.autoPlay,
    videoTitle: actualPost.video.title,
    videoUrl: actualPost.video.ytembedUrl,
  };
  return model;
}