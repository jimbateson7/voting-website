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

   
    function getMetrics(event:any)
    {
        let timeWatched = 0;
        try {
            timeWatched= event.target.getCurrentTime();
        }
        catch (e)
        {
            console.log("video event play back error");
            console.log(e);
        }
        return  {amountOfVideoWatched: timeWatched};
    }
    function getAttributes(event:any)
    {
        const timeWindow = 1000;
        let timeLeftOnVideo=  "unknown";
        let playedTime = "unknown";
        let videoPlayedUntilEnd =  "unknown";
        
        try {
            timeLeftOnVideo=  (event?.target?.getDuration() ?? 0 - event?.target?.getCurrentTime() ?? 0).toString();
            playedTime =  event?.target?.getCurrentTime();
            videoPlayedUntilEnd = (event?.target?.getCurrentTime() >= (event?.target?.getDuration() - timeWindow)).toString();
        }
        catch (e) {
            console.log("video play back error");
            console.log(e);
        }
        const attributes = {
            video_title: props.videoTitle,
            userId: `${userGuid ?? ""}`,
            page: props.pageTitle,
            playedTime:playedTime,
            timeLeftOnVideo: timeLeftOnVideo,
            videoPlayedUntilEnd:videoPlayedUntilEnd
        }
        return attributes;
    }
    
    let content =(<div className="video-container">
            <div className="aspect-ratio">
                <YouTube
                        className="t-video"
                       title={props.videoTitle}
                       opts={videoOptions}
                       videoId={props.videoId}
                       onPlay={(e) => {
                                try {
                                    Analytics.record({
                                        name: 'Video_Played',
                                        metrics:getMetrics(e),
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
                                metrics:getMetrics(e),
                                attributes: getAttributes(e)
                            })}
                        }
                     
                       onEnd={(e) =>
                       {
                           
                           Analytics.record({
                           name: 'Video_Watched_To_End', 
                            metrics:getMetrics(e),
                           attributes: getAttributes(e)
                             })}
    }
    />
                </div></div>)
    
    if(!props.videoId)return <></>;
    return(
       
                props.showFrame
                ? <div className="videoIframe">
                    {content}
                    </div>
                : <>{content}</>
                
     
        );
  
}