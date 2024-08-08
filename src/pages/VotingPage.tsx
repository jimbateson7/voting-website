import Share from "../components/Share";
import "./VotingPage.scss";
// @ts-ignore
import {VoteControls} from "../components/VoteControls";
import {Button, Col, Row} from "react-bootstrap";
import {v4 as generateGuid} from "uuid";
// @ts-ignore
import {TrackedYoutubeVideo} from "./TrackedYoutubeVideo";
import {TQuestionBlock} from "../repositories/Navigation/types";
import {BlogList} from "../components/BlogList";
import Donation from "../components/Donation";
import {FaEnvelope, FaExternalLinkAlt, FaFacebook, FaInstagram, FaLinkedin, FaTwitter} from "react-icons/fa";
import React, {useEffect, useState} from "react";
import {Doughnut} from "react-chartjs-2";
import {VoteResults} from "../components/VoteResults";
import WhyDonate from "../components/WhyDonateEmbed";

export const localStorageVotingIdKey = "voterId";


interface TVotingPage {
  introVideoId: string | undefined;
  postVoteVideoId: string | undefined;
  heading?: string;
  introText:string;
  votingThankYou?: string;
  votingPostVoteExplanation?: string;
  shareHeading?: string;
  shareSubHeading?: string;
  showStatistics: boolean;
  showIntroVideo: boolean; 
  showSharePanel: boolean;

  questions?: TQuestionBlock[];
}



const VotingPage = (props: TVotingPage) => {
  
  const [voted, setVoted] = useState(false);
  let { introVideoId, postVoteVideoId, showIntroVideo, showSharePanel} = props;
  //pretty sure both of these are meant to be auto-play, but should probably think of something to use extractYoutubeVideoUrl
  let introVideo = `https://www.youtube.com/embed/${introVideoId}`; //?&autoplay=1`; 
  let postVideo = postVoteVideoId ?  `https://www.youtube.com/embed/${postVoteVideoId}?&autoplay=1` : undefined;
  showIntroVideo = showIntroVideo && (introVideoId ? introVideoId?.length > 1 : false);
  let userGuid = localStorage.getItem(localStorageVotingIdKey);
  
  if (!userGuid) {
    userGuid = generateGuid();
    localStorage.setItem(localStorageVotingIdKey, userGuid);
  }
  
  function record(text:string)
  {
    
  }

  const shareHeader = document.getElementById('share-heading');
  const resultsHeader = document.getElementById('results-heading');
  
  
  //todo https://www.freecodecamp.org/news/use-the-youtube-iframe-api-in-react/
  return (
    <>
      {props.heading ? <h1>{props.heading}</h1>: null}
      {props.introText ? <p className="introText">{props.introText}</p>: null}
      {showIntroVideo && introVideo
          ?
          <Row>
            <TrackedYoutubeVideo autoPlay={false}
                                 showFrame={false}
                                 pageTitle={"Voting Page"}
                                 videoId={introVideoId}
                                 videoTitle={"Introduction Video"}/>
          </Row>
          : null
      }


      {props.questions?.map( question =>
      {
          return (<Row key={question.id}>
          <div className="frame">
            <div className="frame-content">
             
              <VoteControls  voteCallBack={ (b) => setVoted(b)} video={"https://www.youtube.com/embed/qDRWzVnr4uU?&autoplay=0"} questionId={question.id} questionTitle={question.questionTitle} showStatistics={false} votingPostVoteExplanation={props.votingPostVoteExplanation} votingThankYou={props.votingThankYou} />
              <Row>
                <Col><a href="#share-heading" id="to-share"  >Share</a></Col>
                <Col><a href="#results-heading" id="to-results">Results</a></Col>
                {voted ? <Col style={{marginTop: "-12px"}}><Donation/></Col> : null}
              </Row>
              <br/>
            </div>
          </div>
        </Row>)
      })}


      <Row>
        <h2 id="share-heading" className={voted ? "voted" : ""}>{props.shareHeading}</h2>

        <div className="social-links">
          <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A//ourplanetourpeople.com" target="_blank"
             rel="noreferrer">
            <FaFacebook onClick={() => record("Facebook")}
                        style={{color: '#4267B2', fontSize: '3rem', padding: '.25rem'}}/>
          </a>

          <a href="https://twitter.com/intent/tweet?text=Should%20our%20action%20plans%20be%20based%20on%20responding%20to%20worst%20case%20scenarios?%20Cast%20your%20vote%20at%20https%3A//ourplanetourpeople.com"
             target="_blank" rel="noreferrer">
            <FaTwitter onClick={() => record("Twitter")}
                       style={{color: '#1DA1F2', fontSize: '3rem', padding: '.25rem'}}/>
          </a>

          <a href="https://www.linkedin.com/shareArticle?mini=true&url=https%3A//ourplanetourpeople.com"
             target="_blank"
             rel="noreferrer">
            <FaLinkedin onClick={() => record("LinkedIn")}
                        style={{color: '#2D62C1', fontSize: '3rem', padding: '.25rem'}}/>
          </a>

          <a href="https://www.instagram.com/">
            <FaInstagram onClick={() => record("Instagram")} style={{fontSize: '3rem', padding: '.25rem'}}/>
          </a>

          <a href="mailto:?subject=Should%20our%20action%20plans%20be%20based%20on%20responding%20to%20worst%20case%20scenarios?&body=Cast%20your%20vote%20at%20https%3A//ourplanetourpeople.com">
            <FaEnvelope onClick={() => record("Email")}
                        style={{color: '#F5BA48', fontSize: '3rem', padding: '.25rem'}}/>
          </a>

          <a id="copy-link" href="http://wwww.ourplanetourpeople.com">
            <FaExternalLinkAlt onClick={() => record("Copy")}
                               style={{color: '#F5BA48', fontSize: '3rem', padding: '.25rem'}}/>
          </a>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
   

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
                    <br/>
                    <br/>
                    <br/>
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
