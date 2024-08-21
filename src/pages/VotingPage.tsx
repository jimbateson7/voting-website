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
import React, {useCallback, useEffect, useState} from "react";
import {VoteResults} from "../components/VoteResults";
import {SharingControls} from "./SharingControls";
import {Video} from "react-datocms/dist/types/VideoPlayer";
import {VideoControl} from "../components/VideoControl";
import {StructuredText} from "react-datocms";   
import { render } from 'datocms-structured-text-to-plain-text';
import {getVideoPageJson} from "../repositories/VideoPage/request";
import {TVideoPage} from "../components/VideoPage";
import {getVotingPageJson} from "../repositories/VotingPage/request";

export const localStorageVotingIdKey = "voterId";
export const localStorageWatchedIdKey = "voterWatched";



export interface TVotingPage {
    introVideoId: string | undefined;
   
    videoThumbnail: {responsiveImage:{src:string}} | undefined;
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

export interface TVotingQueryProps
{
    locale:string
    id:string
}
export const VotingResultsFrame = ({questionId}: {questionId:string}) => {
   return( <Row key={questionId}>
        <div className="frame">
            <div className="frame-content">
                <h2 id="results-heading">Voting Results</h2>
                {<VoteControls questionId={questionId} showStatistics={true}/>}
                <Row style={{paddingTop: 20}}>
                    <Col></Col>
                    <Col> <VoteResults questionId={questionId}/></Col>
                    <Col></Col>
                </Row>

            </div>
        </div>

    </Row>)
}
const VotingPage = (queryProps: TVotingQueryProps) => {


    
    
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
   
            navigator.share({url:link, title:mainQuestionText})
            
        });
        setLinkAdded(true);
    })


    const initialState: TVotingPage =
        {
            introVideoId: undefined,
            introText: "",

            mainVideo: {id: "", video: {}},
            postVoteVideoId: undefined,
            showIntroVideo: false,
            showSharePanel: false,
            showStatistics: false,
            videoThumbnail: undefined

        }
    const [data, setData] = useState<TVotingPage>(initialState);
    const props = data;
    const fetchData = useCallback(async () => {
        
        
        let dataFetched = await getVotingPageJson(queryProps.id, queryProps.locale);

        setData(dataFetched);
    }, [queryProps])

    useEffect(() => {
        fetchData().catch(console.error);


    }, [queryProps]);
    
    const mainQuestionText = props.questions ? render(props.questions[0].questionTitleSt) ?? "Please Share" : "Please Share" ;
    const showJumpButtons = false;
    return (
        <>

            {props.questions?.map(question => {

                return (<Row key={question.id}>
                    <div className="frame">
                        <div className="frame-content">
                            <Row className={"vote-controls"} >
                                <Col className={"squashToRow"}>
                                   
                                    <span className={"questionTitle"} >
                                    <StructuredText data={question.questionTitleSt}/>
                                    </span>
                                    
                                    <VoteControls voteCallBack={(b) => setVoted(b)}
                                            
                                                  questionId={question.id}
                                                  showStatistics={false}
                                                  votingPostVoteExplanation={props.votingPostVoteExplanation}
                                                  votingThankYou={props.votingThankYou}/>
                                </Col>
                                <Col className={"squashToRow"}>
                                    <VideoControl locale={queryProps.locale} fullScreenOnClick={true} datoVideo={props.mainVideo.video} ytUrl={props.introVideoId}
                                                  onFinish={onWatched} videoThumbnail={props.videoThumbnail?.responsiveImage.src}/>
                                </Col>
                            </Row>
                            <Row  style={{paddingBottom: "30px"}}>
                                <Col className="squashToRow"> <SharingControls  voted={voted} shareHeading={props.shareHeading ?? ""}
                                              shareButtonText={mainQuestionText}/></Col>
                                <Col className="squashToRow" style={{paddingBottom: "60px"}}>{watched ? <Donation/> : null}</Col>
                                
                            </Row>
                            
                            
                            {voted && showJumpButtons ? <Row style={{paddingBottom: "30px"}}>
                                <Col><a href="#share-heading" id="to-share" className="btn btn-primary">Share</a></Col>
                                <Col><a href="#results-heading" id="to-results" className="btn btn-primary">Results</a></Col>
                                {watched ? <Col ><Donation/></Col> : null}
    
                            </Row> : null}

                        </div>
                    </div>
                </Row>)

            })}
            <Row style={{marginTop: "-0.5rem"}}>
                
            </Row>

            {voted && showJumpButtons ?
                <Row>


                    {props.questions?.map(question => {
                        return (<VotingResultsFrame questionId={question.id}/>)
                    })}


                </Row> : null}


            <Row>
                <BlogList locale={queryProps.locale}/>
            </Row>


        </>
    );
};

export default VotingPage;
