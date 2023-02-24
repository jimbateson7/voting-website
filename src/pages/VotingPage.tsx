import Share from "../components/Share";
import "./VotingPage.scss";
import { VoteControls } from "../components/VoteControls";
import { Row } from "react-bootstrap";
import YouTube, {YouTubeProps} from "react-youtube";
import {Analytics} from "aws-amplify";
import {v4 as generateGuid} from "uuid";
import {analyticsEnabled} from "../App";

export const localStorageKey = "voterId";
interface TVotingPage {
  introVideoId: string | undefined;
  postVoteVideoId: string | undefined;
  title: string;
  heading?: string;
  introText:string;
  votingThankYou?: string;
  votingPostVoteExplanation?: string;
  shareHeading?: string;
  shareSubHeading?: string;
  showStatistics: boolean;
  showIntroVideo: boolean;
  showSharePanel: boolean;
  voted: boolean;
  setVoted: Function;
}

const VotingPage = (props: TVotingPage) => {
  let { introVideoId, postVoteVideoId, title, showIntroVideo, showSharePanel, voted, setVoted } = props;
  //pretty sure both of these are meant to be auto-play, but should probably think of something to use extractYoutubeVideoUrl
  let introVideo = `https://www.youtube.com/embed/${introVideoId}`; //?&autoplay=1`; 
  let postVideo = postVoteVideoId ?  `https://www.youtube.com/embed/${postVoteVideoId}?&autoplay=1` : undefined;

  let userGuid = localStorage.getItem(localStorageKey);

  if (!userGuid) {
    userGuid = generateGuid();
    localStorage.setItem(localStorageKey, userGuid);
  }

  const videoOptions: YouTubeProps['opts'] = {

    playerVars: {     
      autoplay: 0,
      allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    },
  };

  const timeWindow = 1000;
  //todo https://www.freecodecamp.org/news/use-the-youtube-iframe-api-in-react/
  return (
    <>
      {props.heading ? <h1>{props.heading}</h1>: null}
      <p className="introText">{props.introText}</p>
      {showIntroVideo && introVideo
        ?
          <Row>
          <YouTube className="intro-video"
                   title="Introduction Video"
                   opts={videoOptions}
                   videoId={introVideoId} 
                   onPlay={ () => analyticsEnabled ? Analytics.record({
                     name: 'videoStarted',
                     // Attribute values must be strings
                     attributes: { title: 'intro video', userId: `${userGuid}`, page:"voting page"  }
                   }) : null }
               
                   onEnd={ (e) => analyticsEnabled ? Analytics.record({
                     name: 'videoEnded',
                     
                     // Attribute values must be strings
                     metrics: { timeWatched: e.target.getCurrentTime() },   
                     attributes: { title: 'intro video', 
                                  userId: `${userGuid}`, 
                                  page:"voting page", 
                                  playedTime: e.target.getCurrentTime().toString(),
                                  timeLeftOnVideo: (e.target.getSimpleDuration() - e.target.getCurrentTime()).toString(),
                                  videoPlayedUntilEnd: (e.target.getCurrentTime() >= (e.target.getSimpleDuration() - timeWindow)).toString()}
                   }) : null }
          /> </Row>
        : null
      }

   
      
      <Row>
        <div className="frame">
          <div className="frame-content">
            <h2 className="question">{title}</h2>
            <VoteControls voted={voted} setVoted={setVoted} showStatistics={props.showStatistics} votingPostVoteExplanation={props.votingPostVoteExplanation} votingThankYou={props.votingThankYou} />
          </div>
        </div>
      </Row>

      {showSharePanel
        ? <Row>
            <Share postVoteVideo={postVideo} shareText={props.shareHeading} shareSubText={props.shareSubHeading} />
          </Row>
        : null
      }
    </>
  );
};

export default VotingPage;
