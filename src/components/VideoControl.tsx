import React, {useEffect, useRef, useState} from "react";
import "./VideoControl.scss"
import {Video} from "react-datocms/dist/types/VideoPlayer";
import {VideoPlayer} from "react-datocms";
import {TrackedYoutubeVideo} from "../pages/TrackedYoutubeVideo";
import {extractYoutubeVideoIdSafe} from "../repositories/utils/utilities";
import {defaultLanguage} from "../languages";
import {Interface} from "node:readline";


export const VideoControl = ({
                                 onFinish,
                                 datoVideo,
                                 videoThumbnail,
                                 fullScreenOnClick,
                                 locale
                             }: {
    onFinish?: () => void,
    datoVideo: Video | undefined,
    videoThumbnail?: string,
    pageTitle?: string,
    videoTitle?: string,
    fullScreenOnClick: boolean,
    locale?: string
}) => {

       
    
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
    
    if(datoVideo)
    {
        datoVideo["default_subtitles_lang"] = "es";
        datoVideo["defaultsubtitles"]="es";
    }
    useEffect(() => {
        
       // videoPlayer.replaceWith(newVideoPlayer)
        
    }, []);



    function findElementInShadowRoot(root:HTMLElement, selector:string): HTMLElement | null {
        const element = root.querySelector(selector) as HTMLElement;
        if (element) {
            return element;
        }

        if (root.shadowRoot) {
            return findElementInShadowRoot(root.shadowRoot as unknown as HTMLElement, selector);
        }

        return null;
    }
    
    useEffect(() => {
        if(!locale)
            return;
        
        const intervalId = setInterval(() => {
            
            interface VideoPlayerType extends HTMLElement{src:string}
            const videoParent = document.querySelector("mux-player") as HTMLElement;
            const videoPlayer = findElementInShadowRoot(videoParent, "mux-video") as VideoPlayerType;
            if(!videoPlayer)
                return;
                            
            videoPlayer.src += `&default_subtitles_lang=${locale}`;            
            clearInterval(intervalId); // Stop polling when element is found            
        }, 500); // Adjust polling interval as needed

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);
    
    return (<div id="dato-video-player">
        <div className="video-overlay"onClick={forcePause}></div>
        <div className="video-frame" ></div>

         <VideoPlayer

                thumbnailTime={0}
                poster={videoThumbnail}
                onEnded={onEnd}
                onPlay={onPlay}
                onPause={onPause}
                accentColor="#57b3d9"
                data={datoVideo}></VideoPlayer>

    </div>)
}