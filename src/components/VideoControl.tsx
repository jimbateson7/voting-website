import React from "react";
import "./VideoControl.scss"
import {Video} from "react-datocms/dist/types/VideoPlayer";
import {VideoPlayer} from "react-datocms";
import {TrackedYoutubeVideo} from "../pages/TrackedYoutubeVideo";
import {extractYoutubeVideoIdSafe} from "../repositories/utils/utilities";


export const VideoControl = ({onFinish, datoVideo, ytUrl, videoTitle, pageTitle,videoThumbnail}: {
    onFinish?: () => void,
    datoVideo: Video | undefined,
    videoThumbnail?: string,
    ytUrl: string | undefined,
    pageTitle?: string,
    videoTitle?: string
}) => {

    
    const useDatoVideo = !ytUrl;

    return (<>
        
        {datoVideo && useDatoVideo ? <VideoPlayer
            
                thumbnailTime={0}
                poster={videoThumbnail}
                onEnded={onFinish}          
                onPlay={onFinish}
                accentColor="#57b3d9"
              
                data={datoVideo}></VideoPlayer> :
            <TrackedYoutubeVideo autoPlay={false}
                                 showFrame={false}
                                 pageTitle={pageTitle ?? "test"}
                                 onFinish={onFinish}
                                 videoId={extractYoutubeVideoIdSafe(ytUrl)}
                                 videoTitle={videoTitle ?? "test"}/>
        }

    </>)
}