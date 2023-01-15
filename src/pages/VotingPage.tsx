import Share from "../components/Share";
import "./VotingPage.scss";
import { VoteControls } from "../components/VoteControls";
import { Row } from "react-bootstrap";
interface TVotingPage
{
    introVideo:string,
    postVoteVideo:string,
}
const VotingPage = (props:TVotingPage) => {
    let { introVideo,postVoteVideo } = props;
    introVideo = introVideo ?? "";
    return (
        <>
            <Row>
                <iframe
                    className="video"
                    src={introVideo} // TODO: If no voterId present, append "?autoplay=1"
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

export default VotingPage;
