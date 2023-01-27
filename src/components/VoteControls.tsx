import { DataStore } from "@aws-amplify/datastore";
import { Choice, Vote } from "../models";
import { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { v4 as generateGuid } from "uuid";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

interface TVoteControls {
  voted: boolean;
  setVoted: Function;
}

export const VoteControls = ({ voted, setVoted }: TVoteControls) => {
  const [numYesVotes, setNumYesVotes] = useState(0);
  const [numNoVotes, setNumNoVotes] = useState(0);

  const localStorageKey = "voterId";

  useEffect(() => {
    let localGuid = localStorage.getItem(localStorageKey);

    if (localGuid) {
      fetchVoteCounts(true).catch(console.error);
    }
  }, [voted]);

  const fetchVoteCounts = async (checkGuid: boolean) => {
    let localGuid = localStorage.getItem(localStorageKey);

    const hasVoted =
      (await (
        await DataStore.query(Vote, (v) => v.voterId.eq(localGuid))
      ).length) != 0;
    setVoted(hasVoted);

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

    if (!voted) {
      //todo is this strong enough for what we need now? or should we still try and save ip or something?
      //im thinking we add rate limiting and call it a day on this :)

      const hasIdAlreadyVoted =
        (await (
          await DataStore.query(Vote, (v) => v.voterId.eq(localGuid))
        ).length) != 0;

      if (!hasIdAlreadyVoted) {
        await DataStore.save(
          new Vote({ choice: choice, voterId: localGuid })
        ).then((x) => {
          fetchVoteCounts(true);
        });
      }
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
            <Col xs={4} md={3} lg={2} xl={1} className="vote-count">
              <FaThumbsUp className="thumbs-up" />
              <span className="yes">{numYesVotes}</span>
            </Col>
            <Col xs={4} md={3} lg={2} xl={1} className="vote-count">
              <FaThumbsDown className="thumbs-down" />
              <span className="no">{numNoVotes}</span>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
