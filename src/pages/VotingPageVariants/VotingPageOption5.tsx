import "../VotingPage.scss";

import Donation from "../../components/Donation";
import React, {useEffect, useState} from "react";
import {VideoControl} from "../../components/VideoControl";
import {render} from 'datocms-structured-text-to-plain-text';
import {SharingControls} from "../../components/SharingControls";
import {TVideos, TVotingPageExtended} from "../VotingPage";
import {Button, Container, Fade} from "react-bootstrap";
import {QuestionComponent} from "../../components/QuestionComponent";

import {Choice} from "../../models";
import {StructuredText} from "react-datocms";
import {TStagedFlowProps} from "./TStagedFlowProps";
import {VotingPageOption3} from "./VotingPageOption3";


const StagedFlow = (props: TVotingPageExtended) => {
    const [stage, setStage] = useState(0);
    
    const totalQuestions = (props.questions?.length ?? 0);
    
    
    const videoStage = 0;
    const questionStage = 1;

    const totalStages = questionStage+1; // Number of steps in the flow
    const nextStage = () => setStage((prev) => Math.min(prev + 1, totalStages - 1));
    const prevStage = () => setStage((prev) => Math.max(prev - 1, 0));
    const originalVoteCallback = props.voteChangedCallBack;
    //add additional call to the callback

    const extendedVoteCallback = (voted: Choice) => {
        originalVoteCallback?.(voted); // Call the original function if it exists
         nextStage(); // Call the additional function
    };
    return (
        <Container className="d-flex flex-column align-items-center justify-content-between mt-3"
                   style={{ minHeight: "70vh", position: "relative" }} // Ensures height consistency
        
        >

          
                    {/* Stage Video */}
                    <Fade in={stage === videoStage} unmountOnExit>
                        <div>
                            <p style={{fontSize:"1.5rem"}}> Scientists are openly saying that the management of climate change ‘isn’t fit for purpose’</p>
                            <p style={{fontSize:"1.5rem"}}> We need a big change if we are to preserve a liveable planet for the next generation.</p>
                            <VideoControl locale={props.locale} fullScreenOnClick={true}
                                          datoVideo={props.videos?.prop1?.video?.video }
                                          onFinish={() => {
                                              if (props.watchedCallBack) props.watchedCallBack();
                                              nextStage();
                                          }}
                                          videoThumbnail={props.videos?.prop1.thumbnailImage?.responsiveImage.src}/>

                        </div>
                    </Fade>

                    {/* Stage Questions */}
                   
                        <Fade in={stage === questionStage} unmountOnExit>
                            <VotingPageOption3 {...props}/>
                        </Fade>
                      
        
        </Container>
    );
};


export const VotingPageOption5 = (props: TVotingPageExtended) => {


    const {voted, watched} = props;

    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {

        if (voted) {
            const targetHeading = document.getElementById('share-heading');
            console.log("targetHeading 2", targetHeading);
           // targetHeading?.scrollIntoView({behavior: 'smooth'});
        }


    }, [showOverlay]);

    return (
        <>
           <StagedFlow {...props}></StagedFlow>

        </>
    )
        ;
};


