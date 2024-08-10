import React, {useEffect, useState} from "react";
import "./VoteResults.scss";
import {Video} from "react-datocms/dist/types/VideoPlayer";
import {VideoPlayer} from "react-datocms";
import {TrackedYoutubeVideo} from "../pages/TrackedYoutubeVideo";
import { extractYoutubeVideoIdSafe} from "../repositories/utils/utilities";



export const VideoControl = ({datoVideo, ytUrl, videoTitle, pageTitle}: {datoVideo: Video | undefined, ytUrl:string | undefined,pageTitle?:string ,videoTitle?:string}) => {

    const useDatoVideo = false;
   
    return (<>
    
        {datoVideo && useDatoVideo ? <VideoPlayer data={datoVideo}></VideoPlayer> :
            <TrackedYoutubeVideo autoPlay={false}
                                 showFrame={false}
                                 pageTitle={pageTitle ?? "test"}
                                 videoId={extractYoutubeVideoIdSafe(ytUrl)}
                                 videoTitle={videoTitle ?? "test"}/>
        }

    </>)
}