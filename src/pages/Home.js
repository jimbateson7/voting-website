import Share from "../components/Share";
import "./Home.scss";
import { VoteControls } from "../components/VoteControls";
import { Row } from "react-bootstrap";

const Home = () => {
  return (
    <div className="home">
      <Row>
        <div>
          <iframe
            className="video"
            src="https://www.youtube.com/embed/HkZk-E8kHx0" // ?autoplay=1
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        <h1 className={"h1"}>
          Should our action plans be based on responding to worst case
          scenarios?
        </h1>
      </Row>
      <VoteControls></VoteControls>
      <Row>
        <Share />
      </Row>
    </div>
  );
};

export default Home;
