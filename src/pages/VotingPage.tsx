import "./VotingPage.scss";
import {VoteControls} from "../components/VoteControls";
import {Col, Row} from "react-bootstrap";
import {v4 as generateGuid} from "uuid";
import {TQuestionBlock} from "../repositories/Navigation/types";
import {BlogList} from "../components/BlogList";
import Donation from "../components/Donation";
import React, {useCallback, useEffect, useState} from "react";
import {VoteResults} from "../components/VoteResults";
import {Video} from "react-datocms/dist/types/VideoPlayer";
import {VideoControl} from "../components/VideoControl";
import {StructuredText, StructuredTextDocument} from "react-datocms";   
import { render } from 'datocms-structured-text-to-plain-text';
import {getVotingPageJson} from "../repositories/VotingPage/request";
import {SharingControls} from "../components/SharingControls";

export const localStorageVotingIdKey = "voterId";
export const localStorageWatchedIdKey = "voterWatched";



export interface TVotingPage {

    agreeVoteText: string;

    disagreeVoteText: string;
    donateText?: { value: StructuredTextDocument };

    heading?: string;
    introText: string;
    mainVideo: { id: string, video: Video };
    postVoteVideo?: { id: string, video: Video };
    questions?: TQuestionBlock[];

    shareHeading?: string;

    shareSubHeading?: string;
    showIntroVideo: boolean;
    showSharePanel: boolean;
    showStatistics: boolean;
    videoThumbnail: { responsiveImage: { src: string } } | undefined;
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
            agreeVoteText: "",
            disagreeVoteText: "",
            donateText: undefined,
            postVoteVideo: undefined,
            introText: "",
            mainVideo: {id: "", video: {}},
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
                                <Col className={"squashToRow pad50"}>
                                   
                                    <div className="questionTitle extra-padding" >
                                    <StructuredText data={question.questionTitleSt}/>
                                    </div>
                                    <div className="extra-padding" >
                                    <VoteControls voteCallBack={(b) => setVoted(b)}
                                                  agreeVoteText={props.agreeVoteText}
                                                  disagreeVoteText={props.disagreeVoteText}
                                                  questionId={question.id}
                                                  showStatistics={false}
                                                  
                                                  />
                                    </div>
                                </Col>
                                <Col className={"squashToRow squashToRow50"}>
                                    <VideoControl locale={queryProps.locale} fullScreenOnClick={true} datoVideo={props.mainVideo.video} 
                                                  onFinish={onWatched} videoThumbnail={props.videoThumbnail?.responsiveImage.src}/>
                                </Col>
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
            <SharingControls  voted={voted} shareHeading={props.shareHeading ?? ""}
                              shareButtonText={mainQuestionText}/>
            <hr/>
            <div style={{textAlign:"center"}}>
            <StructuredText data={props.donateText}/>
            </div>
            <Donation/>
            


        </>
    );
};

export default VotingPage;
