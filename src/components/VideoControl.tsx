import React, {useEffect} from "react";
import "./VideoControl.scss"
import {Video} from "react-datocms/dist/types/VideoPlayer";
import {VideoPlayer} from "react-datocms";
import {TrackedYoutubeVideo} from "../pages/TrackedYoutubeVideo";
import {extractYoutubeVideoIdSafe} from "../repositories/utils/utilities";


export const VideoControl = ({onFinish, datoVideo, ytUrl, videoTitle, pageTitle,videoThumbnail,fullScreenOnClick}: {
    onFinish?: () => void,
    datoVideo: Video | undefined,
    videoThumbnail?: string,
    ytUrl: string | undefined,
    pageTitle?: string,
    videoTitle?: string
    fullScreenOnClick:boolean,
}) => {

    
    const useDatoVideo = !ytUrl;

    
    const onPlay = () =>
    {        
        const videoPlayer = document.getElementById('dato-video-player');
        if(fullScreenOnClick)
            videoPlayer?.classList.add('fullscreen');
        
        if(onFinish)
            onFinish();
    }
    const onEnd = () =>
    {
        const videoPlayer = document.getElementById('dato-video-player');
        videoPlayer?.classList.remove('fullscreen');
        
        if(onFinish)
            onFinish();
    }

    const onPause = () =>
    {
        const videoPlayer = document.getElementById('dato-video-player');
        videoPlayer?.classList.remove('fullscreen');

        if(onFinish)
            onFinish();
        
        return videoPlayer;
    }
    const forcePause  = () =>
    {
        const videoPlayer = document.querySelector("mux-player") as unknown as {pause:()=>{}}

        videoPlayer.pause();
    }

    return (<div id="dato-video-player">
        <div className="video-overlay"onClick={forcePause}></div>
        <div className="video-frame" ></div>

        {datoVideo && useDatoVideo ? <VideoPlayer


                thumbnailTime={0}
                poster={videoThumbnail}
                onEnded={onEnd}
                onPlay={onPlay}
                onPause={onPause}
                accentColor="#57b3d9"


                data={datoVideo}></VideoPlayer> :
            <TrackedYoutubeVideo autoPlay={false}
                                 showFrame={false}
                                 pageTitle={pageTitle ?? "test"}
                                 onFinish={onFinish}
                                 videoId={extractYoutubeVideoIdSafe(ytUrl)}
                                 videoTitle={videoTitle ?? "test"}/>
        }


    </div>)
}