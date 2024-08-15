import {createAnchorLinkFromTitle} from "../repositories/utils/utilities";
import "./HubCollection.scss";

import {ContentTypes, NavigationItem} from "../repositories/Navigation/types";
import {Video} from "react-datocms";
import {VideoControl} from "./VideoControl";

export type THubCollection = {
    items: NavigationItem[]
    title?: string;
    showVideoThumbNails: boolean
    parentTitle?: string;
    pageTitle?: string;
    uniqueKey?: string;
};

export type THubCard =
    {
        cardTitle?: string;
        pageTitle: string;
        
        link: string;
        uniqueKey: string;
    }
export type TVidoHubCard = THubCard &
    {
        videoTitle: string;
        videoUrl: string;
        videoThumbnail:{responsiveImage:{src:string}}
        mainVideo: { id: string, video: Video | undefined };
    }

function getOverrideFontSize(title: string): string | undefined {
    const breakPoint = 40;
    const scaleFactor = 70;
    const overrideFontSize = (title.length > breakPoint);

    if (overrideFontSize) {
        let dynamicSize = (scaleFactor / title.length);
        return `${dynamicSize / 2}rem`;
    }
    return undefined;
}

export const HubCard = (props: THubCard) => {
    const title = props.cardTitle ?? "";
    const overrideFontSizeTo = getOverrideFontSize(title);

    return (
        <a href={props.link} className={"card"} key={props.uniqueKey}>
            <div className="card-content">
                {overrideFontSizeTo
                    ? <h2 className="card-title" font-overridded={!!overrideFontSizeTo}
                          style={{fontSize: overrideFontSizeTo}}>{title}</h2>
                    : <h2 className="card-title">{title}</h2>}
            </div>
        </a>)
}
export const VideoHubCard = (props: TVidoHubCard) => {
    const title = props.cardTitle ?? "";
    const disableTitle = false;
    const overrideFontSizeTo = getOverrideFontSize(title);

    console.log(props.videoUrl);

    return (
        <div className="card video-card">
            <div className="card-content" key={props.uniqueKey}>

                <VideoControl datoVideo={props.mainVideo.video} ytUrl={props.videoUrl} pageTitle={props.pageTitle}
                              videoTitle={props.videoTitle} videoThumbnail={props.videoThumbnail?.responsiveImage?.src}/>

                { /*  <TrackedYoutubeVideo
            videoId={extractYoutubeVideoId(props.videoUrl)}
            autoPlay={false}
            showFrame={false}
            pageTitle={props.pageTitle} 
            
            videoTitle={props.videoTitle}/> */}
            </div>
        </div>)
}
export const HubCollection = (props: THubCollection) => {
    let subHubCollections: any[] = [];
    let mainHubCards: any[] = [];
    createHubCards(props.items);
    const pageTitle = props.pageTitle ?? props.parentTitle ?? "hub_page";


    function createHubCards(items: NavigationItem[]) {
        if (!items)
            return [];
        const pageTitle = props.pageTitle ?? props.parentTitle ?? "hub_page";
        items.forEach((x: NavigationItem, i) => {
            let link = x.slug ?? `#${createAnchorLinkFromTitle(x.title)}`;
            const key = `${x.title}-card-${i}`;

            switch (x.__typename) {
                case ContentTypes.NavigationGroup:
                    //add card that will link to new hub
                    mainHubCards.push(
                        <HubCard pageTitle={pageTitle} cardTitle={x.title} link={link} uniqueKey={key}/>
                    )
                    //create a new hub at the bottom

                    subHubCollections.push(<HubCollection pageTitle={pageTitle}
                                                          showVideoThumbNails={x.showVideoThumbnailsInHub ?? false}
                                                          parentTitle={props.title} title={x.title}
                                                          items={x.navigationItem} uniqueKey={"subhub" + key}/>)
                    break;
                case ContentTypes.VideoPage:

                    if (props.showVideoThumbNails) {
                        mainHubCards.push(
                            <VideoHubCard pageTitle={pageTitle} cardTitle={x.title} link={link}
                                          videoThumbnail={x.videoThumbnail}
                                          videoTitle={x.video?.title ?? ""}
                                          videoUrl={x.video?.ytembedUrl ?? ""} uniqueKey={key} mainVideo={x.mainVideo}/>
                        )
                    } else {
                        mainHubCards.push(
                            <HubCard pageTitle={pageTitle} cardTitle={x.title} link={link} uniqueKey={key}/>
                        )
                    }
                    break;
                case ContentTypes.VotingPage:
                    mainHubCards.push(
                        <HubCard pageTitle={pageTitle} cardTitle={x.cardTitle} link={link} uniqueKey={key}/>
                    )
                    break;
                default:
                    mainHubCards.push(
                        <HubCard pageTitle={pageTitle} cardTitle={x.title} link={link} uniqueKey={key}/>
                    )
                    break;
            }
        })

    }

    //  const title = props.parentTitle ? props.title + ": " + x.title : x.title;

    return (
        <div className="hub"
             key={props.uniqueKey ? `${props.title}-${props.uniqueKey}` : `${props.parentTitle}-${props.title}`}>
            {props.parentTitle ? <h2>{props.parentTitle}:</h2> : null}
            {props.title ? <h2 id={createAnchorLinkFromTitle(props.title)}>{props.title}</h2> : null}
            {mainHubCards}
            {subHubCollections}
        </div>);
}