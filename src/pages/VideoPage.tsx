import {useCallback, useEffect, useState} from "react";
import "./Page.scss";

import {getVideoPageJson} from "../repositories/VideoPage/request";
import {TArticlePage} from "../repositories/Common/types";
import {Video} from "react-datocms";
import {VideoControl} from "../components/VideoControl";


export interface TVideoPage {
    mainVideo: { id: string, video: Video | undefined };
    header: string
    introText?: string;
    videoTitle?: string;
    videoThumbnail?: string;
    video: { ytembedUrl: string, autoPlay: boolean, title: string }
}

export const VideoPage = (props: TArticlePage) => {
    let {slug, locale} = props;

    const fetchData = useCallback(async () => {
        let dataFetched = await getVideoPageJson(slug, locale);

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

            <VideoControl locale={locale} fullScreenOnClick={false} datoVideo={data.mainVideo.video} pageTitle={props.title}
                          videoTitle={data.videoTitle} videoThumbnail={data.videoThumbnail}/>

        </>
    );
};
