import "../VotingPage.scss";

import Donation from "../../components/Donation";
import React, {useEffect, useState} from "react";
import {SharingControls} from "../../components/SharingControls";
import {TVotingPageExtended} from "../VotingPage";
import {Button, Col, Container, Fade, Row} from "react-bootstrap";
import {QuestionComponent} from "../../components/QuestionComponent";
import {Choice} from "../../models";
import {StructuredText} from "react-datocms";
import {TStagedFlowProps} from "./TStagedFlowProps";
import { VideoControl } from "../../components/VideoControl";

const StagedFlow = (props: TStagedFlowProps) => {
    const [stage, setStage] = useState(0);
    
    const totalQuestions = (props.questions?.length ?? 0);
    
       
    const openingStage = 0;
    const questionStage = 1;    
    const videoStage = questionStage + totalQuestions;
    const shareStage = videoStage + 1;
    const detailStage = shareStage + 1;
    const donateStage = detailStage + 1;
    const totalStages = donateStage+1; // Number of steps in the flow
    const nextStage = () => setStage((prev) => Math.min(prev + 1, totalStages - 1));
    const prevStage = () => setStage((prev) => Math.max(prev - 1, 0));
    const originalVoteCallback = props.voteChangedCallBack;
    
    var questionOne = props.questions && props.questions.length > 1 ? props.questions[0] : null;
    var questionTwo =  props.questions && props.questions.length > 1 ? props.questions[1] : null;
    
   
    //add additional call to the callback

    const extendedVoteCallback = (voted: Choice) => {
        originalVoteCallback?.(voted); // Call the original function if it exists
         nextStage(); // Call the additional function
    };

    if(!questionOne || !questionTwo)
    {
        console.log("no questions")
        return ( <></>);
    }
    return (
        <Container className="frame"
                   style={{ minHeight: "70vh", position: "relative" }} // Ensures height consistency
        
        >

            <Row >
            <div >
                <div className="frame-content vote-controls" >
                    {/* Stage Video */}
                    <Fade in={stage === videoStage} unmountOnExit>
                        <div style={{ height: '70vh' }}>
                            <div className={"verticalFrameCentre"}>
                            
                            <VideoControl locale={props.locale} fullScreenOnClick={true}
                                          datoVideo={props.videos?.thankYouVideo?.video?.video}
                                          onFinish={() => {
                                              if (props.watchedCallBack) props.watchedCallBack();
                                              nextStage();
                                          }} 
                                         
                                          videoThumbnail={props.videos?.thankYouVideo.thumbnailImage?.responsiveImage.src}/>
                            </div>
                        </div>
                    </Fade>

                    <Fade in={stage === openingStage} unmountOnExit>
                        <div style={{ height: '70vh', paddingRight:"50px"}}>
                            <div className={"verticalFrameCentre"} >
                                <div style={{fontSize:"1.5rem"}}>
                                    <StructuredText data={props.openingText}/>
                                </div>
                            </div>
                        </div>
                       
                    </Fade>

                    {/* Stage Questions */}
                 
                    <Fade in={stage === questionStage } unmountOnExit>
                        <Row className={"vote-controls"}>
                            <Col className={"squashToRow pad50"}>
    
                                <QuestionComponent {...props}                                                  
                                                   {...questionOne}
                                                   voteChangedCallBack={extendedVoteCallback}/>
                            </Col>
    
                            <Col className={"videoColumn squashToRow squashToRow50"}>
                                <VideoControl locale={props.locale} fullScreenOnClick={true}
                                              datoVideo={ props.videos?.prop1?.video?.video  }
                                                    leftShift={-50}
                                              onFinish={() => {
                                                  if (props.watchedCallBack) props.watchedCallBack();
                                                  nextStage();
                                              }}
                                              videoThumbnail={ props.videos?.prop1.thumbnailImage?.responsiveImage.src} />
                            </Col>
                        </Row>
                    </Fade>
                    
                    <Fade in={stage === questionStage+1 } unmountOnExit>
                        <Row className={"vote-controls"}>
                            <Col className={"squashToRow pad50"}>

                                <QuestionComponent {...props}
                                                   {...questionTwo}
                                                   voteChangedCallBack={extendedVoteCallback}/>
                            </Col>

                            <Col className={"videoColumn squashToRow squashToRow50"}>
                                <VideoControl locale={props.locale} fullScreenOnClick={true}
                                              datoVideo={ props.videos?.prop2?.video?.video  }
                                                    leftShift={-50}
                                              onFinish={() => {
                                                  if (props.watchedCallBack) props.watchedCallBack();
                                                  nextStage();
                                              }}
                                              videoThumbnail={ props.videos?.prop2.thumbnailImage?.responsiveImage.src} />
                            </Col>
                        </Row>
                    </Fade>

                    {/* Stage: Sharing */}
                    <Fade in={stage === shareStage} unmountOnExit>
                        <div style={{ height: '70vh' }}>
                            <div >
                              
                                    <SharingControls voted={true} shareHeading="Share this!" shareButtonText="Share Now"/>
        
                              
                            </div>
                        </div>
                    </Fade>

                    {/* Stage Details */}
                 
                    <Fade in={stage === detailStage} unmountOnExit>
                        <div style={{ height: '70vh' }}>
                            <div className={"verticalFrameCentre"}>
                            <VideoControl locale={props.locale} fullScreenOnClick={true}
                                          datoVideo={props.videos?.detailVideo?.video?.video}
                                          onFinish={() => {
                                              if (props.watchedCallBack) props.watchedCallBack();
                                              nextStage();
                                          }}
                                          videoThumbnail={props.videos?.detailVideo.thumbnailImage?.responsiveImage.src}/>
                            </div>
                        </div>
                    </Fade>
                    
                    
                    {/* Stage: Donation */}
                    <Fade in={stage === donateStage} unmountOnExit>
                        <div style={{ height: '70vh' }}>                           
                            <div className={"verticalFrameCentre"}>
                                <div>
                                    <div style={{textAlign: "center", paddingRight:"30px"}}>
                                        <StructuredText data={props.donateText}/>
                                    </div>
                                     <Donation/>
                                </div>
                            </div>
                        </div>
                    </Fade>
                </div>
            </div>
            {/* Navigation Buttons */}
            <div  className="d-flex justify-content-center gap-3 w-100"
                  style={{
                      position: "absolute",
                      bottom: "-10px",
                      left: 0,
                      right: 0,
                      zIndex: 9999,
                      textAlign: "center"
                  }}>
                <Button variant="secondary" onClick={prevStage} disabled={stage === 0}>
                    <i className="bi bi-arrow-left">←</i>
                </Button>
                <p> {stage+1}/{totalStages}</p>
                <Button variant="primary" onClick={nextStage} disabled={stage === totalStages - 1}>
                    <i className="bi bi-arrow-right">→</i>
                </Button>
            </div>
            </Row>
        </Container>
    );
};


export const VotingPageOption2B = (props: TVotingPageExtended) => {


    const {voted, watched} = props;

    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {

        if (voted) {
            const targetHeading = document.getElementById('share-heading');
            console.log("targetHeading 2", targetHeading);
            //targetHeading?.scrollIntoView({behavior: 'smooth'});
        }   


    }, [showOverlay]);

    return (
        <>
           <StagedFlow {...props}></StagedFlow>

        </>
    )
        ;
};


