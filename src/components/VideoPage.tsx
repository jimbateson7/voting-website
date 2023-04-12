import { useCallback, useEffect, useState } from "react";
import "./Page.scss";

import { getVideoPageJson } from "../repositories/VideoPage/request";
import {TrackedYoutubeVideo} from "../pages/TrackedYoutubeVideo";
import {extractYoutubeVideoId} from "../repositories/utils/utilities";
export interface TVideoPage {
  header: string
  introText?: string;
  videoUrl: string | undefined;
  videoTitle: string;
  autoPlay: boolean;
}
export type TArticlePage = {
  slug: string;
};
export const VideoPage = (props: TArticlePage) => {
  let { slug } = props;

  const fetchData = useCallback(async () => {
    let dataFetched = await getVideoPageJson(slug);
  
    setData(dataFetched);
  }, [slug])

  const [data, setData] = useState<TVideoPage>({
    header: "", videoTitle: "UnknownVideo", videoUrl: "", autoPlay: false
  });

  useEffect(() => {
    fetchData().catch(console.error);
  }, [slug, fetchData]);

  return (
    <>
      <h1>{data.header}</h1>
        {data.introText ? <p className="introText">{data.introText}</p> : null}
        <TrackedYoutubeVideo 
                             pageTitle={data.header} 
                             videoTitle={data.videoTitle} 
                             videoId={extractYoutubeVideoId(data.videoUrl)}
                             showFrame={true} 
                             autoPlay={data.autoPlay}></TrackedYoutubeVideo>


  </>
  );
};
