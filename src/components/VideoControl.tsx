import React, {useEffect, useState} from "react";
import "./VideoControl.scss"
import {Video} from "react-datocms/dist/types/VideoPlayer";
import {VideoPlayer} from "react-datocms";

export type TVideoProps = {
    onFinish?: () => void,
    onPause?: () => void,
    onPlay?: () => void,
    datoVideo: Video | undefined,
    videoThumbnail?: string,
    pageTitle?: string,
    videoTitle?: string,
    fullScreenOnClick: boolean,
    locale?: string
    autoPlay?: boolean
}


interface MuxPlayer {
    play(): void;
    pause(): void;
    stop(): void;
    seek(time: number): void;
    getDuration(): number;
    getCurrentTime(): number;
    setVolume(volume: number): void;
    getVolume(): number;
    mute(): void;
    unmute(): void;
    isMuted(): boolean;
    requestFullscreen(): void;
    exitFullscreen(): void;
    webkitRequestFullscreen(): void;
    msRequestFullscreen(): void;
}

export const VideoControl = ({
                                 onFinish,
                                 onPlay,
                                 onPause,
                                 datoVideo,
                                 videoThumbnail,
                                 fullScreenOnClick,
                                 locale,
                                 autoPlay = false
                             }: TVideoProps) => {

    const [goFullScreenOnClick    , setGoFullScreenOnClick] = useState(fullScreenOnClick)

    // Function to toggle fullscreen
    function goFullScreen() {
        const player = document.querySelector("mux-player");
       /* const videoElement = player as unknown as MuxPlayer;
        if(!videoElement)
        {
            return; 
        }
        if (videoElement.requestFullscreen) {
            videoElement.requestFullscreen();
        } else if (videoElement.webkitRequestFullscreen) {
            videoElement.webkitRequestFullscreen();

        } else if (videoElement.msRequestFullscreen) {
            videoElement.msRequestFullscreen();

        }*/
    }
    
    const onVideoPlay = () =>
    {        
        const videoPlayer = document.getElementById('dato-video-player');
        if(goFullScreenOnClick) {
            goFullScreen();     
            setGoFullScreenOnClick(false);
        }        
        
        if(onPlay)
            onPlay();
    }
    const onVideoEnd = () =>
    {
        const videoPlayer = document.getElementById('dato-video-player');
        videoPlayer?.classList.remove('fullscreen');
        
        if(onFinish)
            onFinish();
    }

    const onVideoPause = () =>
    {
        const videoPlayer = document.getElementById('dato-video-player');
        

        if(onPause)
            onPause();
        
        return videoPlayer;
    }
    const forcePause  = () =>
    {
        const videoPlayer = document.querySelector("mux-player") as unknown as MuxPlayer

        videoPlayer.pause();
    }

    const forcePlay  = () =>
    {
        const videoPlayer = document.querySelector("mux-player") as unknown as MuxPlayer

        videoPlayer.play();
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
            //forcePause();
            clearInterval(intervalId); // Stop polling when element is found            
        }, 500); // Adjust polling interval as needed

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);
    //forcePause();

    
    return (<div id="dato-video-player">
        <div className="video-overlay"onClick={forcePause}></div>
        <div className="video-frame" ></div>

         <VideoPlayer

                thumbnailTime={0}
                poster={videoThumbnail}
                autoPlay={autoPlay}
                onEnded={onVideoEnd}
                onPlay={onVideoPlay}
                onPause={onVideoPause}
                accentColor="#57b3d9"
                data={datoVideo}></VideoPlayer>

    </div>)
}