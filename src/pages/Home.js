import Share from "../components/Share";
import "./Home.scss";
import { VoteControls } from "../components/VoteControls";
import { Row } from "react-bootstrap";

const Home = () => {
    return (
        <>
            <Row>
                <iframe
                    className="video"
                    src="https://www.youtube.com/embed/HkZk-E8kHx0" // TODO: If no voterId present, append "?autoplay=1"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen>
                </iframe>
            </Row>

            <Row>
                <h1>
                    Should our action plans be based on responding to worst case
                    scenarios?
                </h1>

                <VoteControls></VoteControls>
            </Row>

            <Row>
                <Share />
            </Row>
        </>
    );
};

export default Home;
