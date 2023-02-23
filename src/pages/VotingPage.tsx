import Share from "../components/Share";
import "./VotingPage.scss";
import { VoteControls } from "../components/VoteControls";
import { Row } from "react-bootstrap";
import {useEffect} from "react";

interface TVotingPage {
  introVideoId: string | undefined;
  postVoteVideoId: string | undefined;
  title: string;
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

  const checkElapsedTime = (e:any) => {
    console.log(e);
    const duration = e.target.getDuration();
    const currentTime = e.target.getCurrentTime();
    if (currentTime / duration > 0.95) {
      
    }
  };
  
  return (
    <>
      {showIntroVideo && introVideo
        ? <Row>
            <iframe
              className="intro-video"
              src={introVideo} // TODO: If no voterId present, append "?autoplay=1"
              title="YouTube video player"
              frameBorder="0"
             // onLoad={ () => window.addEventListener('message', onMessageReceived, false)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen>
            </iframe>
            <YouTube
                videoId={introVideo}
                onStateChange={(e) => checkElapsedTime(e)}
            />
          </Row>
        : null
      }

      <Row>
        <div className="frame">
          <div className="frame-content">
            <h1>{title}</h1>
            <VoteControls voted={voted} setVoted={setVoted} showStatistics={props.showStatistics} />
          </div>
        </div>
      </Row>

      {showSharePanel
        ? <Row>
            <Share postVoteVideo={postVideo} />
          </Row>
        : null
      }
    </>
  );
};

export default VotingPage;
