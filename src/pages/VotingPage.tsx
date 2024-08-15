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
import React, {useEffect, useState} from "react";
import {VoteResults} from "../components/VoteResults";
import {SharingControls} from "./SharingControls";
import {Video} from "react-datocms/dist/types/VideoPlayer";
import {VideoControl} from "../components/VideoControl";
import {StructuredText} from "react-datocms";   
import { render } from 'datocms-structured-text-to-plain-text';

export const localStorageVotingIdKey = "voterId";
export const localStorageWatchedIdKey = "voterWatched";

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

    mainVideo: { id: string, video: Video };
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
                                     onFinish={() => {
                                         console.log("finished")
                                     }}
                                     pageTitle={"Voting Page"}
                                     videoId={props.introVideoId}
                                     videoTitle={"Introduction Video"}/>
            </Row>
            : null
        } </>)
}
const VotingPage = (props: TVotingPage) => {

    const lwatchedString = localStorage.getItem(localStorageWatchedIdKey);
    const lwatched = lwatchedString ? lwatchedString === "true" : false;

    const [voted, setVoted] = useState(lwatched);
    const [watched, setWatched] = useState(false);

    let userGuid = localStorage.getItem(localStorageVotingIdKey);

    if (!userGuid) {
        userGuid = generateGuid();
        localStorage.setItem(localStorageVotingIdKey, userGuid);
    }

    function onWatched() {
        setWatched(true);
        localStorage.setItem(localStorageWatchedIdKey, "true");
    }

    const [linkAdded, setLinkAdded] = useState(false);
    
    useEffect(() => {
        if (linkAdded)
            return;

        const copyLink = document.getElementById('copy-link') as HTMLLinkElement;
        if(!copyLink)
            return;
        
        copyLink.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior

            // Get the link's href attribute
            const link = copyLink.href;

            // Create a temporary text area to hold the link
            const tempInput = document.createElement('textarea');
            tempInput.value = link;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);


            // Provide feedback to the user (optional)
            alert('Link copied to clipboard!');
        });
        setLinkAdded(true);
    })


    const mainQuestionText = props.questions ? render(props.questions[0].questionTitleSt) ?? "Please Share" : "Please Share" ;

    return (
        <>

            {props.questions?.map(question => {

                return (<Row key={question.id}>
                    <div className="frame">
                        <div className="frame-content">
                            <Row className={"vote-controls"} style={{paddingBottom: "50px"}}>
                                <Col className={"squashToRow"}>
                                   
                                    <span className={"questionTitle"} >
                                    <StructuredText data={question.questionTitleSt}/>
                                    </span>
                                    <VoteControls voteCallBack={(b) => setVoted(b)}
                                                  video={"https://www.youtube.com/embed/qDRWzVnr4uU?&autoplay=0"}
                                                  questionId={question.id}
                                                  showStatistics={false}
                                                  votingPostVoteExplanation={props.votingPostVoteExplanation}
                                                  votingThankYou={props.votingThankYou}/>
                                </Col>
                                <Col className={"squashToRow"}>
                                    <VideoControl datoVideo={props.mainVideo.video} ytUrl={props.introVideoId}
                                                  onFinish={onWatched}/>
                                </Col>
                            </Row>

                            {voted ? <Row style={{paddingBottom: "30px"}}>
                                <Col><a href="#share-heading" id="to-share" className="btn btn-secondary">Share</a></Col>
                                <Col><a href="#results-heading" id="to-results" className="btn btn-secondary">Results</a></Col>
                                {watched ? <Col ><Donation/></Col> : null}
    
                            </Row> : null}

                        </div>
                    </div>
                </Row>)

            })}
            <Row>
                <SharingControls voted={voted} shareHeading={props.shareHeading ?? ""}
                                 shareButtonText={mainQuestionText}/>
                {voted ? <Row style={{paddingBottom: "30px"}}>
                    {watched ? <Col ><Donation/></Col> : null}
                </Row> : null}
            </Row>

            {voted ?
                <Row>


                    {props.questions?.map(question => {
                        return (<Row key={question.id}>
                            <div className="frame">
                                <div className="frame-content">
                                    <h2 id="results-heading">Voting Results</h2>
                                    {<VoteControls questionId={question.id} showStatistics={true}/>}
                                    <Row style={{paddingTop: 20}}>
                                        <Col></Col>
                                        <Col> <VoteResults questionId={question.id}/></Col>
                                        <Col></Col>
                                    </Row>

                                </div>
                            </div>

                        </Row>)
                    })}


                </Row> : null}


            <Row>
                <BlogList/>
            </Row>


        </>
    );
};

export default VotingPage;
