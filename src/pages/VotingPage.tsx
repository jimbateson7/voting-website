﻿import Share from "../components/Share";
import "./VotingPage.scss";
import { VoteControls } from "../components/VoteControls";
import { Row } from "react-bootstrap";

interface TVotingPage {
  introVideoId: string;
  postVoteVideoId: string;
  title: string;
  showIntroVideo: boolean;
  showSharePanel: boolean;
  voted: boolean;
  setVoted: Function;
}

const VotingPage = (props: TVotingPage) => {
  let { introVideoId, postVoteVideoId, title, showIntroVideo, showSharePanel, voted, setVoted } = props;
  let introVideo = `https://www.youtube.com/embed/${introVideoId}`;
  let postVideo = `https://www.youtube.com/embed/${postVoteVideoId}`;
  return (
    <>
      {showIntroVideo
        ? <Row>
            <iframe
              className="intro-video"
              src={introVideo} // TODO: If no voterId present, append "?autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen>
            </iframe>
          </Row>
        : null
      }

      <Row>
        <div className="frame">
          <div className="frame-content">
            <h1>{title}</h1>
            <VoteControls voted={voted} setVoted={setVoted} />
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
