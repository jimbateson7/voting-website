import YouTube, {YouTubeProps} from "react-youtube";
import {Analytics} from "aws-amplify";
import {localStorageVotingIdKey} from "./VotingPage";
import "./TrackedYoutubeVideo.scss";
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

   

    function getAttributes(event:any)
    {
        const timeWindow = 1000;
        const attributes = {
            video_title: props.videoTitle,
            userId: `${userGuid ?? ""}`,
            page: props.pageTitle,
            playedTime: event.target.getCurrentTime().toString(),
            timeLeftOnVideo: (event.target.getDuration() - event.target.getCurrentTime()).toString(),
            videoPlayedUntilEnd: (event.target.getCurrentTime() >= (event.target.getDuration() - timeWindow)).toString()
        }
        return attributes;
    }
    
    let content = <YouTube
                        className="t-video"
                       title={props.videoTitle}
                       opts={videoOptions}
                       videoId={props.videoId}
                       onPlay={(e) => {
                                try {
                                    Analytics.record({
                                        name: 'Video_Played',
                                        metrics: {timeWatched: e.target.getCurrentTime()},
                                        attributes: getAttributes(e)
                                    })
                                }
                                 catch (e) {
                                    console.log("failed to analyse") 
                                     console.log(e);
                                 }
                            }
                        }
                        onPause={(e) =>
                        {
                            Analytics.record({
                                name: 'Video_Paused',
                                metrics: {timeWatched: e.target.getCurrentTime()},
                                attributes: getAttributes(e)
                            })}
                        }
                     
                       onEnd={(e) =>
                       {
                           
                           Analytics.record({
                           name: 'Video_Watched_To_End',                           
                           metrics: {timeWatched: e.target.getCurrentTime()},
                           attributes: getAttributes(e)
                             })}
    }
    />
    
    if(!props.videoId)return <></>;
    return(
        <div className="video-container">
            <div className="aspect-ratio">
                {props.showFrame
                ? <div className="videoIframe">
                    {content}
                    </div>
                : <>{content}</>
                }
            </div>
        </div>
        );
  
}