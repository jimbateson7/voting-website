import React from "react";
import {createAnchorLinkFromTitle} from "../repositories/utils/utilities";
import "./HubCollection.scss";
import {VideoEmbed} from "./VideoEmbed";

export type THubCollection = {
    items: []
    title?:string;
};

export type THubCard =
{
    title: string;
    link: string;
    key:number;
}
export type TVidoHubCard =THubCard &
{
    videoTitle:string;
    videoUrl:string;
} 
export const HubCard = (props:THubCard) =>{
    return (
        <a href={props.link} className={"card"} key={props.key}>
        <div className="card-content">
            <h2>{props.title}</h2>
        </div>
    </a>)
}
export const VideoHubCard = (props:TVidoHubCard) =>{
    return (
        <div className="card-content card video-card">
        <a href={props.link}><h3>{props.title}</h3></a>
        <VideoEmbed title={props.videoTitle} url={props.videoUrl} autoplay={false}/>
    </div>)
}
export const HubCollection = (props: THubCollection) =>{
    let subHubCollections: any[] = [];
    let mainHubCards: any[] = [];
    createNavItems(props.items);
    
    function createNavItems(items:[]) {
        if(!items)
            return [];
       

        items.forEach((x:any,i) => {
            let link = x.slug ?? `#${createAnchorLinkFromTitle(x.title)}`;

            switch (x.__typename) {
                case "NavigationGroup":
                    //add card that will link to new hub
                    mainHubCards.push(
                        <HubCard title={x.title} link={link} key={i}/>
                    )
                    //create a new hub at the bottom              
                    subHubCollections.push(<HubCollection title={x.title} items={x.navigationItemCollection?.items}/>)
                    break;
                case "VideoPage":
                    mainHubCards.push(
                        <VideoHubCard title={x.title} link={link} videoTitle={x.video.title}
                                      videoUrl={x.video.ytembedUr} key={i}/>
                    )
                    break;
                default:
                    mainHubCards.push(
                        <HubCard title={x.title} link={link} key={i}/>
                    )
                    break;
            }
        })
        
    }
    
    return (
        <div className="hub">
            {props.title ? <h2 id={createAnchorLinkFromTitle(props.title)}>{props.title}</h2> : null}
           
            <div className="cards">
            {mainHubCards}</div>
            <hr/>
           
            {subHubCollections}
        </div>);       
      
}