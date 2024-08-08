import {DataStore} from "@aws-amplify/datastore";
import {Choice, Vote} from "../models";
import {useCallback, useEffect, useState} from "react";
import {Button, Col, Row} from "react-bootstrap";
import {v4 as generateGuid} from "uuid";
import {FaThumbsDown, FaThumbsUp} from "react-icons/fa";
import {localStorageVotingIdKey} from "../pages/VotingPage";

import {recordUse} from "../utils/analytics";
import {getCountry} from "../repositories/utils/country";
import {VoteResults} from "./VoteResults";
import Share from "./Share";

interface TVoteControls {
  questionTitle:string;
  showStatistics: boolean;
  votingThankYou?: string;
  votingPostVoteExplanation?: string;
  questionId: string;
  video?: string;
  voteCallBack?: (voted: boolean) => void;
}
export const VoteControls = ({ showStatistics,votingThankYou,votingPostVoteExplanation,questionId,questionTitle, video,voteCallBack}: TVoteControls) => {
  const [numYesVotes, setNumYesVotes] = useState(0);
  const [numNoVotes, setNumNoVotes] = useState(0);
  const [fetchedVotes, setFetchedVotes] = useState(false);
  const [voteChoice, setVoteChoice] = useState<Choice | undefined>(undefined)

  const voted = voteChoice != undefined;
  
  const fetchVoteCounts = useCallback(async () => {

    const localGuid = localStorage.getItem(localStorageVotingIdKey);


    const votes =   await DataStore.query(Vote, (v) => v.and(v => [v.voterId.eq(localGuid), v.questionId.eq(questionId)] ));
    
    
    const aVote = votes.shift();
    const hasVoted =!!aVote;
    
    if(voteCallBack)
    {
      voteCallBack(hasVoted);
    }
    
    if(hasVoted)
    {      
      setVoteChoice(aVote.choice as Choice);
    }

  
      const noVotes =  (await DataStore.query(Vote, (v) => v.and(v=> [v.choice.eq(Choice.NO), v.questionId.eq(questionId)]) )).length;
      const yesVotes =  (await DataStore.query(Vote, (v) => v.and(v=> [v.choice.eq(Choice.YES), v.questionId.eq(questionId)]))).length;
      
      
      setNumNoVotes(
          noVotes
      );
      setNumYesVotes(
          yesVotes
      );
      setFetchedVotes(true);

  }, [voteChoice,voteCallBack])
     
  
  useEffect(() => {

    const yesVoteButton = document.getElementById('vote-yes');
    const noVoteButton = document.getElementById('vote-no');
    const targetHeading = document.getElementById('share-heading');

    if(yesVoteButton && targetHeading) {
      yesVoteButton.addEventListener('click', () => {
        targetHeading.scrollIntoView({behavior: 'smooth'});
      });
    }

    if(noVoteButton && targetHeading) {
      noVoteButton.addEventListener('click', () => {
        targetHeading.scrollIntoView({behavior: 'smooth'});
      });
    }

    const video = document.getElementById('main-video');
   
    if(video && targetHeading) {
      video.addEventListener('ended', () => {
        targetHeading.scrollIntoView({behavior: 'smooth'});
      });
    }
    
    fetchVoteCounts().catch(console.error);
       
    
  }, [fetchVoteCounts]);

  

  const SaveVoteToDb = async (choice: Choice) => {
    let localGuid = localStorage.getItem(localStorageVotingIdKey);

    if (!localGuid) {
      localGuid = generateGuid();
      localStorage.setItem(localStorageVotingIdKey, localGuid);
    }
    
    if (!voted || choice !== voteChoice) {

      const  existingVotes =   await DataStore.query(Vote, (v) => v.and(v => [v.voterId?.eq(localGuid), v.questionId?.eq(questionId)]))
      
      const aExistingVote = existingVotes.shift();
      const hasIdAlreadyVoted =  !!aExistingVote;
      const country = getCountry() as string;
      
      if(hasIdAlreadyVoted)
      {
         recordUse({
          name: 'Changed_Vote',
          //immediate: true,
          // Attribute values must be strings
          attributes: {
            choice: `${choice?.toString()}`,
            userId: `${localGuid?.toString()}`,
            questionId: `${questionId?.toString()}`,
            country: `${country}`
          }
        },localGuid)        
         
          await DataStore.delete( aExistingVote);
      }
      else {
        try {
          recordUse({
            name: 'Voted',
            immediate: true,
            // Attribute values must be strings
            attributes: {
              choice: `${choice?.toString()}`,
              userId: `${localGuid?.toString()}`,
              questionId: `${questionId?.toString()}`,
              country: `${country}`            }
          },localGuid)
        } catch (e) {
          
          console.log(e);
        }
      }
      
       await DataStore.save(
        new Vote({ choice: choice, voterId: localGuid, questionId:questionId,country:country })
      ).then((x) => {
        fetchVoteCounts();
      });      
      
      
    }
  };
    
  if(!fetchedVotes)
  {
     fetchVoteCounts().then( () => setFetchedVotes(true));
  }

  /*scroll down after voting so please share and donat is more prominate*/
  
  return (
      <>
   

            <Row>

              <Col  xs lg="4">
                <Row> <Col  xs lg="3"/><Col><h3 /* style="text-align:left"*/>{questionTitle} </h3></Col></Row>
                <Row>
                  <Col  xs lg="3"/>
                 
                <Col  className={`vote-count voted-${voteChoice === Choice.YES ? "this" : "other"}`}>
                  <Button
                      id="vote-yes"
                      variant={voteChoice === Choice.YES ? "light" : "dark"}
                      size="lg"
                      onClick={() => SaveVoteToDb(Choice.YES)}
                      title={voteChoice === Choice.YES ? "You voted Yes" : "Change vote to Yes"}>
                    <FaThumbsUp className="thumbs-up"/>
                    {showStatistics ? <span className="yes">{numYesVotes}</span> : null}
                  </Button>
             
                </Col>
                <Col  className={`vote-count voted-${voteChoice === Choice.NO ? "this" : "other"}`}>
                  <Button
                      variant={voteChoice === Choice.NO ? "light" : "dark"}
                      size="lg"
                      onClick={() => SaveVoteToDb(Choice.NO)}
                      id="vote-no"
                      title={voteChoice === Choice.NO ? "You voted No" : "Change vote to No"}>
                    <FaThumbsDown className="thumbs-down"/>
                    {showStatistics  ? <span className="no">{numNoVotes}</span> : null}
                  </Button>
  
                  
                </Col>
             
                </Row>
                
             </Col>
              { video ?
              <Col>

                <Share voted={voted} postVoteVideo={video} shareText={"Please Share"} shareSubText={""} />
              </Col> : null}
            
            </Row>

            


        <br/>
      
      </>
  );
};
