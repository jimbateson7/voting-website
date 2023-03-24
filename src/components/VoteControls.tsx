import {DataStore} from "@aws-amplify/datastore";
import {Choice, Vote} from "../models";
import {useCallback, useEffect, useState} from "react";
import {Button, Col, Row} from "react-bootstrap";
import {v4 as generateGuid} from "uuid";
import {FaThumbsDown, FaThumbsUp} from "react-icons/fa";
import {localStorageVotingIdKey} from "../pages/VotingPage";
import {Analytics} from "aws-amplify";

interface TVoteControls {
  voted: boolean;
  setVoted: Function;
  showStatistics: boolean;
  votingThankYou?: string;
  votingPostVoteExplanation?: string;

}

export const VoteControls = ({ voted, setVoted,showStatistics,votingThankYou,votingPostVoteExplanation}: TVoteControls) => {
  const [numYesVotes, setNumYesVotes] = useState(0);
  const [numNoVotes, setNumNoVotes] = useState(0);
  const [voteChoice, setVoteChoice] = useState<Choice | undefined>(undefined)
  

  const fetchVoteCounts = useCallback(async (checkGuid:boolean) => {
    let localGuid = localStorage.getItem(localStorageVotingIdKey);

    const votes = (await (
        await DataStore.query(Vote, (v) => v.voterId.eq(localGuid))
    ));
    const hasVoted =
        votes.length !== 0;
    setVoted(hasVoted);

    if(hasVoted)
    {
      const vote = votes[0];
      setVoteChoice(vote.choice as Choice);
    }

    if (checkGuid || hasVoted) {
      setNumNoVotes(
          await (
              await DataStore.query(Vote, (v) => v.choice.eq(Choice.NO))
          ).length
      );
      setNumYesVotes(
          await (
              await DataStore.query(Vote, (v) => v.choice.eq(Choice.YES))
          ).length
      );
    }
  }, [setVoted])
  
  
  
  
  useEffect(() => {
    let localGuid = localStorage.getItem(localStorageVotingIdKey);

    if (localGuid) {
      fetchVoteCounts(true).catch(console.error);
    }
  }, [fetchVoteCounts]);

  

  const SaveVoteToDb = async (choice: Choice) => {
    let localGuid = localStorage.getItem(localStorageVotingIdKey);

    if (!localGuid) {
      localGuid = generateGuid();
      localStorage.setItem(localStorageVotingIdKey, localGuid);
    }
    
    if (!voted || choice !== voteChoice) {

      const  existingVotes = (await (
          await DataStore.query(Vote, (v) => v.voterId.eq(localGuid))
      ));
      const hasIdAlreadyVoted =  existingVotes.length !== 0;

      
      
      if(hasIdAlreadyVoted)
      {
        await Analytics.record({
          name: 'Changed Vote',
          // Attribute values must be strings
          attributes: {
            choice: choice,
            userId: `${localGuid}`,
          }
        })
        
          const existingVote = existingVotes[0];
          await DataStore.delete( existingVote);
      }
      await Analytics.record({
        name: 'Voted',
        // Attribute values must be strings
        attributes: {
          choice: choice,
          userId: `${localGuid}`,
        }
      })
      
       await DataStore.save(
        new Vote({ choice: choice, voterId: localGuid })
      ).then((x) => {
        fetchVoteCounts(true);
      });      
      
      setVoted(true);
    }
  };

  return (
    <>
      {!voted && (
        <Row>
          <Col xs={6} md={3} lg={2} xl={1} >
            <Button
              variant="light"
              size="lg"
              onClick={() => SaveVoteToDb(Choice.YES)}
              title="Yes">
              <FaThumbsUp className="thumbs-up"/>
            </Button>
          </Col>

          <Col xs={6} md={3} lg={2} xl={1} >
            <Button
              variant="light"
              size="lg"
              onClick={() => SaveVoteToDb(Choice.NO)}
              title="No">
              <FaThumbsDown className="thumbs-down" />
            </Button>
          </Col>
        </Row>
      )}

      {voted && (
        <>
          <Row>
            <h2>{votingThankYou}</h2>
            {showStatistics ? <h3>See how others have voted:</h3> : null}
            <Col xs={6} md={3} lg={2} xl={1} className={`vote-count voted-${voteChoice === Choice.YES ? "this" : "other"}`}>
              <Button
                  variant= {voteChoice === Choice.YES ? "light" : "dark"} 
                  size="lg"
                  onClick={() => SaveVoteToDb(Choice.YES)}
                  title= {voteChoice === Choice.YES ? "You voted Yes" : "Change vote to Yes"} >                
                <FaThumbsUp className="thumbs-up"/>
              </Button>
           
              {showStatistics ? <span className="yes">{numYesVotes}</span>: null}
            </Col>
            <Col xs={6} md={3} lg={2} xl={1} className={`vote-count voted-${voteChoice === Choice.NO ? "this" : "other"}`}>
              <Button
                  variant= {voteChoice === Choice.NO ? "light" : "dark"}
                  size="lg"
                  onClick={() => SaveVoteToDb(Choice.NO)}
                 
                  title= {voteChoice === Choice.NO ? "You voted No" : "Change vote to No"} >
                <FaThumbsDown className="thumbs-down" />
              </Button>
            
              {showStatistics ? <span className="no">{numNoVotes}</span>: null}
            </Col>
            <h3>{votingPostVoteExplanation}</h3>
          </Row>
        </>
      )}
    </>
  );
};
