import YouTube, {YouTubeProps} from "react-youtube";
import {Analytics} from "aws-amplify";
import {localStorageVotingIdKey} from "./VotingPage";

export interface TrackedVideoProps {
    pageTitle: string;
    videoTitle: string;
    videoId?:string;
    showFrame: boolean;
    autoPlay: boolean;
}
export const TrackedYoutubeVideo = (props: TrackedVideoProps) => {
    let userGuid = localStorage.getItem(localStorageVotingIdKey);
    const videoOptions: YouTubeProps['opts'] = {

        playerVars: {
            autoplay: props.autoPlay,
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        },
    };

    const timeWindow = 1000;

    let content = <YouTube
                        className="video"
                       title={props.videoTitle}
                       opts={videoOptions}
                       videoId={props.videoId}
                       onPlay={() => Analytics.record({
                           name: 'Video Started',
                           // Attribute values must be strings
                           attributes: {
                               title: props.videoTitle,
                               userId: `${userGuid}`,
                               page: props.pageTitle
                           },
                           immediate: true
                       })}
                        
                       onEnd={(e) => Analytics.record({
                           name: 'Video Ended',

                           // Attribute values must be strings
                           metrics: {timeWatched: e.target.getCurrentTime()},                           
                           immediate: true,
                           attributes: {
                               
                               title: props.videoTitle,
                               userId: `${userGuid}`,
                               page: props.pageTitle,
                               playedTime: e.target.getCurrentTime().toString(),
                               timeLeftOnVideo: (e.target.getSimpleDuration() - e.target.getCurrentTime()).toString(),
                               videoPlayedUntilEnd: (e.target.getCurrentTime() >= (e.target.getSimpleDuration() - timeWindow)).toString()
                           }
                       })}
    />
    
    if(!props.videoId)return <></>;
    return (props.showFrame
            ? (

                <div className="videoIframe">

                    {content}
                </div>)
            : (
            <>{content}</>
            )
    );
  
}