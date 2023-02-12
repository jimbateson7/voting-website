import {  useEffect, useState } from "react";

import "./Page.scss";

import {getVideoPageJson} from "../repositories/VideoPage/request";
export interface TVideoPage {
  header: string;
  videoUrl: string;
  videoTitle: string;
  autoPlay:boolean;
}
export type TArticlePage = {
  slug: string;
};
export const VideoPage = (props: TArticlePage) => {
  let { slug } = props;
  async function fetchData() {
    let dataFetched = await getVideoPageJson(slug);
    setData(dataFetched);
  }
  const [data, setData] = useState<TVideoPage>({
    header: "...", videoTitle: "UnknownVideo", videoUrl: "", autoPlay:false
  });

  useEffect(() => {
    fetchData().catch(console.error);
  }, [slug]);

  return (
    <>   
      <h1>{data.header}</h1>
      <div className={"videoIframe"}>
        <iframe
            className="video"
            src={data.videoUrl} //todo autoplay
            title={data.videoTitle}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
        ></iframe>
      </div>

    </>
  );
};
