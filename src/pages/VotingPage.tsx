import Share from "../components/Share";
import "./VotingPage.scss";
// @ts-ignore
import {VoteControls} from "../components/VoteControls";
import {Row} from "react-bootstrap";
import {v4 as generateGuid} from "uuid";
// @ts-ignore
import {TrackedYoutubeVideo} from "./TrackedYoutubeVideo";
import {TQuestionBlock} from "../repositories/Navigation/types";

export const localStorageVotingIdKey = "voterId";


interface TVotingPage {
  introVideoId: string | undefined;
  postVoteVideoId: string | undefined;
  heading?: string;
  introText:string;
  votingThankYou?: string;
  votingPostVoteExplanation?: string;
  shareHeading?: string;
  shareSubHeading?: string;
  showStatistics: boolean;
  showIntroVideo: boolean; 
  showSharePanel: boolean;

  questions?: TQuestionBlock[];
}

const VotingPage = (props: TVotingPage) => {
  let { introVideoId, postVoteVideoId, showIntroVideo, showSharePanel} = props;
  //pretty sure both of these are meant to be auto-play, but should probably think of something to use extractYoutubeVideoUrl
  let introVideo = `https://www.youtube.com/embed/${introVideoId}`; //?&autoplay=1`; 
  let postVideo = postVoteVideoId ?  `https://www.youtube.com/embed/${postVoteVideoId}?&autoplay=1` : undefined;
  showIntroVideo = showIntroVideo && (introVideoId ? introVideoId?.length > 1 : false);
  let userGuid = localStorage.getItem(localStorageVotingIdKey);
  
  if (!userGuid) {
    userGuid = generateGuid();
    localStorage.setItem(localStorageVotingIdKey, userGuid);
  }
  
  
  //todo https://www.freecodecamp.org/news/use-the-youtube-iframe-api-in-react/
  return (
    <>
      {props.heading ? <h1>{props.heading}</h1>: null}
      {props.introText ? <p className="introText">{props.introText}</p>: null}
      {showIntroVideo && introVideo
          ?
          <Row>
            <TrackedYoutubeVideo autoPlay={false}
                                 showFrame={false}
                                 pageTitle={"Voting Page"}
                                 videoId={introVideoId}
                                 videoTitle={"Introduction Video"}/>
          </Row>
          : null
      }


      {props.questions?.map( question =>
      {
          return (<Row key={question.id}>
          <div className="frame">
            <div className="frame-content">
              <h2 className="question"> {question.questionTitle}</h2>
              <VoteControls questionId={question.id} showStatistics={props.showStatistics} votingPostVoteExplanation={props.votingPostVoteExplanation} votingThankYou={props.votingThankYou} />

            </div>
          </div>
        </Row>)
      })}

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
