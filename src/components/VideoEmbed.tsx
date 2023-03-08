import React from "react";
import {extractYoutubeVideoUrl} from "../repositories/utils/utilities";

export type TVideoEmbed = {
    title: string;
    url:string |undefined;
    autoplay:boolean
};

export const VideoEmbed = (props: TVideoEmbed) =>{
    
    const videoUrl = extractYoutubeVideoUrl(props.url ?? "", props.autoplay)
    return (props.url ? (<div className={"videoIframe"}>
        <iframe
            className="video"
            src={videoUrl}
            title={props.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
        ></iframe>
    </div>) : null);
}