import {useCallback, useEffect, useState} from "react";
import "./Page.scss";

import {getVideoPageJson} from "../repositories/VideoPage/request";
import {TArticlePage} from "../repositories/Common/types";
import {Video} from "react-datocms";
import {TVideoProps} from "../components/VideoControl";
import {TReference, TReferenceProps} from "../components/VideoReferenceControl";
import {VideoWithReference} from "./VideoWithReference";

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

const _references: TReference[] = [
    { time: 14, title: "Should we know?", pdfLink: "https://www.datocms-assets.com/136385/1739562417-1-should-we-know.pdf" },
    { time: 26, title: "What is Hothouse Earth", pdfLink: "https://www.datocms-assets.com/136385/1739562418-2-what-is-hothouse-earth.pdf" },
    { time: 79, title: "The EEI", pdfLink: "https://www.datocms-assets.com/136385/1739562417-3-the-earth-energy-imbalance.pdf" }, //Getting Hotter More Quickly
    { time: 88, title: "Getting Hotter More Quickly", pdfLink: "https://www.datocms-assets.com/136385/1739562417-4-we-are-getting-hotter-more-quickly.pdf" },
    { time: 116, title: "Methane", pdfLink: "https://www.datocms-assets.com/136385/1739562417-5-methane.pdf" },
    { time: 176, title: "Human Emissions", pdfLink: "https://www.datocms-assets.com/136385/1739562417-6-the-investigation.pdf" },
    { time: 182, title: "The Investigation", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" }, //176
];
/* useful for testing
const _references: Reference[] = [
    { time: 4, title: "Should we know?", pdfLink: "https://www.datocms-assets.com/136385/1739562417-1-should-we-know.pdf" },
    { time: 6, title: "What is Hothouse Earth", pdfLink: "https://www.datocms-assets.com/136385/1739562418-2-what-is-hothouse-earth.pdf" },
    { time: 9, title: "The EEI", pdfLink: "https://www.datocms-assets.com/136385/1739562417-3-the-earth-energy-imbalance.pdf" }, //Getting Hotter More Quickly
    { time: 18, title: "Getting Hotter More Quickly", pdfLink: "https://www.datocms-assets.com/136385/1739562417-4-we-are-getting-hotter-more-quickly.pdf" },
    { time: 26, title: "Methane", pdfLink: "https://www.datocms-assets.com/136385/1739562417-5-methane.pdf" },
    { time: 29, title: "Human Emissions", pdfLink: "https://www.datocms-assets.com/136385/1739562417-6-the-investigation.pdf" },
    { time: 32, title: "The Investigation", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" }, //176
];*/


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
    
   
    
    useEffect(() => {
        fetchData().catch(console.error);


    }, [slug, fetchData]);

    return (
        <>
            <h1>{data.header}</h1>  
            {data.introText ? <p className="introText">{data.introText}</p> : null}

            <VideoWithReference currentTimeStamp={0} references={_references} locale={locale} fullScreenOnClick={false} datoVideo={data?.mainVideo?.video?.video ?? undefined} pageTitle={props.title}
                                videoTitle={data.videoTitle} videoThumbnail={data.videoThumbnail} ></VideoWithReference>
        </>
    );
};
