import "../VotingPage.scss";
import {VoteControls} from "../../components/VoteControls";
import {Col, Row} from "react-bootstrap";
import {v4 as generateGuid} from "uuid";
import Donation from "../../components/Donation";
import React, {useCallback, useEffect, useState} from "react";

import {VideoControl} from "../../components/VideoControl";
import {StructuredText} from "react-datocms";
import {render} from 'datocms-structured-text-to-plain-text';

import {SharingControls} from "../../components/SharingControls";
import {Choice} from "../../models";
import VideoOverlay from "../../components/VideoOverlay";
import {localStorageVotingIdKey, localStorageWatchedIdKey, TVotingPageExtended} from "../VotingPage";




export const VotingPageOption3 = (props: TVotingPageExtended) => {


    
    const lwatchedString = localStorage.getItem(localStorageWatchedIdKey);
    const lwatched = lwatchedString ? lwatchedString === "true" : false;

    const [voted, setVoted] = useState(lwatched);
    const [watched, setWatched] = useState(false);
    const [usePostThankYou, setUsePostThankyou] = useState(false);

    let userGuid = localStorage.getItem(localStorageVotingIdKey);

    if (!userGuid) {
        userGuid = generateGuid();
        localStorage.setItem(localStorageVotingIdKey, userGuid);
    }

    function onWatched() {
        setWatched(true);
        
        localStorage.setItem(localStorageWatchedIdKey, "true");
    }
    function onModalWatched() {
     //   setUsePostThankyou(true);

    
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


   
    const [showOverlay, setShowOverlay] = useState(false);
    function voteChanged(choice:Choice)
    {
        console.log("show overlay")
        setShowOverlay(true)
    }
    function modalClosed()
    {
        setShowOverlay(false);
        setUsePostThankyou(true)
        
    }
    useEffect(() => {
        
        if(voted)
        {
            const targetHeading = document.getElementById('share-heading');
            console.log("targetHeading 2", targetHeading);
            targetHeading?.scrollIntoView({behavior: 'smooth'});
        }


    }, [showOverlay]);
    const mainQuestionText = props.questions ? render(props.questions[0].questionTitleSt) ?? "Please Share" : "Please Share" ;
    const showJumpButtons = false;
    return (
        <>
      
            <VideoOverlay altVideo={props.videos?.thankYouVideo?.video} show={showOverlay} onClose={() => {modalClosed()}}
                          locale={props.locale} fullScreenOnClick={true} datoVideo={ props.videos?.thankYouVideo?.video?.video }
                          onFinish={onModalWatched} videoThumbnail={props.videos?.thankYouVideo?.thumbnailImage?.responsiveImage.src}/> 


            <div className={showOverlay ? "ignore-container" : ""}>
                {props.questions?.map((question, index) => {

                    return (

                        <Row key={question.id}>
                            <div className="frame">
                                <div className="frame-content">
                                    <Row className={"vote-controls"}>
                                        <Col className={"squashToRow pad50"}>

                                            <div className="questionTitle extra-padding">
                                                <StructuredText data={question.questionTitleSt}/>
                                            </div>
                                            <div className="extra-padding">
                                                <VoteControls voteResultCallBack={(b) => setVoted(b)}
                                                              voteChangedCallBack={(v) => voteChanged(v)}
                                                              agreeVoteText={props.agreeVoteText}
                                                              disagreeVoteText={props.disagreeVoteText}
                                                              questionId={question.id}
                                                              showStatistics={false}

                                                />
                                            </div>
                                        </Col>
                    
                                    </Row>


                                    {voted && showJumpButtons ? <Row style={{paddingBottom: "30px"}}>
                                        <Col><a href="#share-heading" id="to-share"
                                                className="btn btn-primary">Share</a></Col>

                                        <Col><a href="#results-heading" id="to-results"
                                                className="btn btn-primary">Results</a></Col>
                                        {watched ? <Col><Donation/></Col> : null}

                                    </Row> : null}

                                </div>
                            </div>
                        </Row>)

                })}
                <Row style={{marginTop: "-0.5rem"}}>

                </Row>
                <SharingControls voted={voted} shareHeading={props.shareHeading ?? ""}
                                 shareButtonText={mainQuestionText}/>
                {voted ? <>
                        <hr/>
                        <div style={{width: "50%", marginLeft: "25%"}} key={"second-video"}>

                            <div className="card video-card">
                                <div className="card-content" key={"second-video"}>

                                    <VideoControl fullScreenOnClick={true}
                                                  datoVideo={props?.videos?.prop2?.video?.video}
                                                  pageTitle={"share"}
                                                  videoTitle={"share"}
                                                  videoThumbnail={props?.videos?.prop2?.thumbnailImage?.responsiveImage?.src}/>

                                </div>
                            </div>
                        </div>
                    
                    
                  
                    <hr/>
                    <div style={{textAlign: "center"}}>
                        <StructuredText data={props.donateText}/>
                    </div>
                    <Donation/>
                    </>
                    :null}
        </div>


</>
)
    ;
};

