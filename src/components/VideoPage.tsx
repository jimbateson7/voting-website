import {useCallback, useEffect, useState} from "react";
import "./Page.scss";

import {getVideoPageJson} from "../repositories/VideoPage/request";
import {TArticlePage} from "../repositories/Common/types";
import {Video} from "react-datocms";
import {VideoControl} from "./VideoControl";
import {types} from "sass";

export interface TVideoPage {
    mainVideo: { id: string, video: Video | undefined };
    header: string
    introText?: string;
    videoTitle?: string;
    videoThumbnail?: string;
    video: { ytembedUrl: string, autoPlay: boolean, title: string }
}

export const VideoPage = (props: TArticlePage) => {
    let {slug} = props;

    const fetchData = useCallback(async () => {
        let dataFetched = await getVideoPageJson(slug);

        setData(dataFetched);
    }, [slug])

    const [data, setData] = useState<TVideoPage>({
        header: "",
        videoTitle: "UnknownVideo",
        mainVideo: {video: undefined, id: ""},
        introText: "",
        video: {title: "", autoPlay: false, ytembedUrl: ""}
    });

    useEffect(() => {
        fetchData().catch(console.error);


    }, [slug, fetchData]);

    return (
        <>
            <h1>{data.header}</h1>
            {data.introText ? <p className="introText">{data.introText}</p> : null}

            <VideoControl datoVideo={data.mainVideo.video} ytUrl={data.video.ytembedUrl} pageTitle={props.title}
                          videoTitle={data.videoTitle} videoThumbnail={data.videoThumbnail}/>

        </>
    );
};
