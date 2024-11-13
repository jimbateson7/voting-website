import React, {useEffect, useState} from "react";
import "./VideoOverlay.scss";

import {TVideoProps, VideoControl} from "./VideoControl";
import {SharingControls} from "./SharingControls";

type TOverlayVideoProps = TVideoProps &
    {
        show: boolean;
        onClose: () => void;
    }
const VideoOverlay = (props: TOverlayVideoProps) => {

    useEffect(() => {
        if(props.show)
            window.scrollTo(0, 0);
    }, [props.show]);
    
    if(!props.show)
    {
        return null;
    }
   
    return (
        <>
        <div id="overlay"></div>
        <div id="dato-video-player-frame" >
                
           
                    
                
                <button className="close" onClick={() => props.onClose()}>X</button>
                <div className="video-frame"></div>
                <VideoControl {...props}/>
               
                <SharingControls className={"overlay-share-buttons"} voted={true} shareHeading={"Please share...."?? ""}
                              shareButtonText={"hello world"}/>
              
                <div className={"share-text"}>
                    Watch our full <a href="#" className={"share-link"}>Climate Change Crisis</a> explanation video
                </div>
            </div>
        </>
    )
};


export default VideoOverlay