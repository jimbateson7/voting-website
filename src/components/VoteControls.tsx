import {DataStore} from "@aws-amplify/datastore";
import {Choice, Vote} from "../models";
import {useEffect, useState} from "react";
import {Button, Col, Row} from "react-bootstrap";
import {v4 as generateGuid} from "uuid";
import {FaThumbsDown, FaThumbsUp} from "react-icons/fa";

interface TVoteControls {
  voted: boolean;
  setVoted: Function;
}

export const VoteControls = ({ voted, setVoted }: TVoteControls) => {
  const [numYesVotes, setNumYesVotes] = useState(0);
  const [numNoVotes, setNumNoVotes] = useState(0);
  const [voteChoice, setVoteChoice] = useState<Choice | undefined>(undefined)
  const localStorageKey = "voterId";

  useEffect(() => {
    let localGuid = localStorage.getItem(localStorageKey);

    if (localGuid) {
      fetchVoteCounts(true).catch(console.error);
    }
  }, []);

  const fetchVoteCounts = async (checkGuid: boolean) => {
    let localGuid = localStorage.getItem(localStorageKey);

    const votes = (await (
        await DataStore.query(Vote, (v) => v.voterId.eq(localGuid))
    ));
    const hasVoted =
      votes.length != 0;
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
  };

  const SaveVoteToDb = async (choice: Choice) => {
    let localGuid = localStorage.getItem(localStorageKey);

    if (!localGuid) {
      localGuid = generateGuid();
      localStorage.setItem(localStorageKey, localGuid);
    }
    
    if (!voted || choice != voteChoice) {

      const  existingVotes = (await (
          await DataStore.query(Vote, (v) => v.voterId.eq(localGuid))
      ));
      const hasIdAlreadyVoted =  existingVotes.length != 0;
    
      if(hasIdAlreadyVoted)
      {
          const existingVote = existingVotes[0];
          await DataStore.delete( existingVote);
      }
      
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
          <Col xs={6} md={2}>
            <Button
              variant="light"
              size="lg"
              onClick={() => SaveVoteToDb(Choice.YES)}
              title="Yes">
              <FaThumbsUp className="thumbs-up"/>
            </Button>
          </Col>

          <Col xs={6} md={2}>
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
            <h2>Thanks For Voting</h2>
            <h3>See how others have voted:</h3>
            <Col xs={4} md={3} lg={2} xl={1} className={`vote-count voted-${voteChoice === Choice.YES ? "this" : "other"}`}>
              <FaThumbsUp className={`thumbs-up`}  onClick={() => SaveVoteToDb(Choice.YES)}/>
              <span className="yes">{numYesVotes}</span>
            </Col>
            <Col xs={4} md={3} lg={2} xl={1} className={`vote-count voted-${voteChoice === Choice.NO ? "this" : "other"}`}>
              <FaThumbsDown className={`thumbs-down`}  onClick={() => SaveVoteToDb(Choice.NO)}/>
              <span className="no">{numNoVotes}</span>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
