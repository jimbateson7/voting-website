import "./VotingPage.scss";
// @ts-ignore
import {VoteControls} from "../components/VoteControls";
import {Col, Row} from "react-bootstrap";
import {v4 as generateGuid} from "uuid";
// @ts-ignore
import {TrackedYoutubeVideo} from "./TrackedYoutubeVideo";
import {TQuestionBlock} from "../repositories/Navigation/types";
import {BlogList} from "../components/BlogList";
import Donation from "../components/Donation";
import React, {useState} from "react";
import {VoteResults} from "../components/VoteResults";
import {SharingControls} from "./SharingControls";
import {VideoPlayer} from "react-datocms";
import {Video} from "react-datocms/dist/types/VideoPlayer";
import {VideoControl} from "../components/VideoControl";

export const localStorageVotingIdKey = "voterId";


export interface TVotingPage {
    introVideoId: string | undefined;
    postVoteVideoId: string | undefined;
    heading?: string;
    introText: string;
    votingThankYou?: string;
    votingPostVoteExplanation?: string;
    shareHeading?: string;
    shareSubHeading?: string;
    showStatistics: boolean;
    showIntroVideo: boolean;
    showSharePanel: boolean;

    questions?: TQuestionBlock[];

    mainVideo:{id:string, video:Video};
}


const MainVideo = (props: TVotingPage) => {
    const introVideo = `https://www.youtube.com/embed/${props.introVideoId}`; //?&autoplay=1`;
    const showIntroVideo = props.showIntroVideo && (props.introVideoId ? props.introVideoId?.length > 1 : false);
    
    return (<>
        {props.heading ? <h1>{props.heading}</h1> : null}
        {props.introText ? <p className="introText">{props.introText}</p> : null}
        {showIntroVideo && introVideo
            ?
            <Row>
                <TrackedYoutubeVideo autoPlay={false}
                                     showFrame={false}
                                     pageTitle={"Voting Page"}
                                     videoId={props.introVideoId}
                                     videoTitle={"Introduction Video"}/>
            </Row>
            : null
        } </>)
}
const VotingPage = (props: TVotingPage) => {

    const [voted, setVoted] = useState(false);


    let userGuid = localStorage.getItem(localStorageVotingIdKey);

    if (!userGuid) {
        userGuid = generateGuid();
        localStorage.setItem(localStorageVotingIdKey, userGuid);
    }

   
    const mainQuestionText = props.questions ? props.questions[0].questionTitle : "Please Share";
    
    return (
        <>

            {props.questions?.map(question => {
           
                return (<Row key={question.id}>
                    <div className="frame">
                        <div className="frame-content">
                            <Row className={"vote-controls"} style={{paddingBottom:"50px"}}>
                                <Col className={"squashToRow"}>
                                <h2>{question.questionTitle}</h2>
                                <VoteControls voteCallBack={(b) => setVoted(b)}
                                              video={"https://www.youtube.com/embed/qDRWzVnr4uU?&autoplay=0"}
                                              questionId={question.id}
                                              questionTitle={question.questionTitle} showStatistics={false}
                                              votingPostVoteExplanation={props.votingPostVoteExplanation}
                                              votingThankYou={props.votingThankYou}/>
                                </Col>
                                <Col className={"squashToRow"}>
                                    <VideoControl datoVideo={props.mainVideo.video} ytUrl={props.introVideoId}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col><a href="#share-heading" id="to-share">Share</a></Col>
                                <Col><a href="#results-heading" id="to-results">Results</a></Col>
                                {voted ? <Col style={{marginTop: "-12px"}}><Donation/></Col> : null}
                            </Row>
                           
                        </div>
                    </div>
                </Row>)
                
            })}
            <Row>
                <SharingControls voted={voted} shareHeading={props.shareHeading ?? ""} shareButtonText={mainQuestionText}/>
            </Row>
            
            <Row>


                {props.questions?.map(question => {
                    return (<Row key={question.id}>
                        <div className="frame">
                            <div className="frame-content">
                                <h2 id="results-heading">Voting Results</h2>
                                {<VoteControls questionId={question.id} questionTitle={""} showStatistics={true}/>}
                                <Row>
                                    <Col></Col>
                                    <Col> <VoteResults questionId={question.id}/></Col>
                                    <Col></Col>
                                </Row>
                        
                            </div>
                        </div>

                    </Row>)
                })}


            </Row>


            <Row>
                <BlogList/>
            </Row>


        </>
    );
};

export default VotingPage;
