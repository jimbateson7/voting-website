import Share from "../components/Share";
import "./VotingPage.scss";
import { VoteControls } from "../components/VoteControls";
import { Row } from "react-bootstrap";
interface TVotingPage {
  introVideoId: string;
  postVoteVideoId: string;
  title: string;
}
const VotingPage = (props: TVotingPage) => {
  let { introVideoId, postVoteVideoId, title } = props;
  let introVideo = `https://www.youtube.com/embed/${introVideoId}`;
  let postVideo = `https://www.youtube.com/embed/${postVoteVideoId}`;
  return (
    <>
      <Row>
        <iframe
          className="video"
          src={introVideo} // TODO: If no voterId present, append "?autoplay=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </Row>

      <Row>
        <h1>{title}</h1>

        <VoteControls postVoteVideo={postVideo}></VoteControls>
      </Row>

      <Row>
        <Share />
      </Row>
    </>
  );
};

export default VotingPage;
