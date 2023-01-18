import { DataStore } from "@aws-amplify/datastore";
import { Choice, Vote } from "../models";
import { useEffect, useState } from "react";
import { voteChoices } from "./VoteChoice";
import VotingCard from "./VotingCard";
import { Col, Row } from "react-bootstrap";
import { v4 as generateGuid } from "uuid";
import { FaCheckCircle, FaTimesCircle, FaQuestionCircle } from "react-icons/fa";
type TVoteControls = {
  postVoteVideo: string;
};

export const VoteControls = (props: TVoteControls) => {
  const [numYesVotes, setNumYesVotes] = useState(0);
  const [numNoVotes, setNumNoVotes] = useState(0);
  const [voted, setVoted] = useState(false);

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
        <Row className="mb-3">
          {voteChoices.map((voteChoice, index) => {
            return (
              <Col xs={6} md={2} key={index}>
                <VotingCard
                  choice={voteChoice}
                  incrementVoteCount={(choice: Choice) => SaveVoteToDb(choice)}
                />
              </Col>
            );
          })}
        </Row>
      )}

      {voted && (
        <>
          <Row className="mb-3">
            <h2>Thanks For Voting</h2>
            <h3>See how others have voted:</h3>
            <Col xs={6} md={2}>
              <FaCheckCircle
                style={{ color: "green", fontSize: "3rem", padding: ".25rem" }}
              />
              <h4>Yes: {numYesVotes}</h4>
            </Col>
            <Col xs={6} md={2}>
              <FaTimesCircle
                style={{ color: "red", fontSize: "3rem", padding: ".25rem" }}
              />
              <h4>No: {numNoVotes}</h4>
            </Col>
          </Row>
          <Row>
            <iframe
              className="video"
              src={props.postVoteVideo} // TODO: If no voterId present, append "?autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </Row>
        </>
      )}
    </>
  );
};
