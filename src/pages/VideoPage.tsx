import {useCallback, useEffect, useState} from "react";
import "./Page.scss";

import {getVideoPageJson} from "../repositories/VideoPage/request";
import {TArticlePage} from "../repositories/Common/types";
import {Video} from "react-datocms";
import {VideoControl} from "../components/VideoControl";
import {VideoReferenceControl} from "../components/VideoReferenceControl";


import {Col, Row} from "react-bootstrap";

export interface TVideoPage {
    mainVideo: { id: string, video:{video: Video | undefined} } | undefined;
    header: string
    introText?: string;
    videoTitle?: string;
    videoThumbnail?: string;

}
function getLastSlugPart(slug: string, separator: string = '/'): string | undefined {
    if (!slug) {
        return undefined; // Handle empty or null slugs
    }
    const parts = slug.split(separator);
    return parts.pop();
}

export const VideoPage = (props: TArticlePage) => {
    let {slug, locale} = props;

    const fetchData = useCallback(async () => {
        var videoName = getLastSlugPart(slug);
        let dataFetched = await getVideoPageJson(videoName ?? "", locale);

        setData(dataFetched);
    }, [slug])

    const [data, setData] = useState<TVideoPage>({
        header: "",
        videoTitle: "UnknownVideo",
        mainVideo:  undefined,
        introText: "",
    });
    
    const [timeStamp, setTimeStamp] = useState<number>(0);
    
    useEffect(() => {
        fetchData().catch(console.error);


    }, [slug, fetchData]);

    return (
        <>
            <h1>{data.header}</h1>  
            {data.introText ? <p className="introText">{data.introText}</p> : null}
        
           <Row>
               <Col xs={12} md={8}>
                    <VideoControl locale={locale} fullScreenOnClick={false} datoVideo={data?.mainVideo?.video?.video ?? undefined} pageTitle={props.title}
                          videoTitle={data.videoTitle} videoThumbnail={data.videoThumbnail} onProgress={setTimeStamp} />
               </Col>
               <Col xs={12} md={4}>
                    <VideoReferenceControl currentTimeStamp={timeStamp}/>
               </Col>
           </Row>
        </>
    );
};
