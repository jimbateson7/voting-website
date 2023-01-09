import { DataStore } from "@aws-amplify/datastore";
import { Choice, Vote } from "../models";
import React, { useEffect, useState } from "react";
import { voteChoices } from "./VoteChoice";
import VotingCard from "./VotingCard";
import { Col, Row } from "react-bootstrap";
import { v4 as generateGuid } from "uuid";

export const VoteControls = () => {
  //voting stuff
  const [numYesVotes, setNumYesCotes] = useState(0);
  const [numNoVotes, setNumNoVotes] = useState(0);
  const [numDontKnowVotes, setNumDontKnowVotes] = useState(0);
  const [voted, setVoted] = useState(false);
  const [userGuid, setUserGuid] = useState(``);

  const localStorageKey = "userGuid";
  function forgetUser() {
    setVoted(false);
    localStorage.setItem(localStorageKey, "");
  }

  useEffect(() => {
    let localGuid = localStorage.getItem(localStorageKey);

    if (localGuid) {
      setVoted(true);
      // now get vote results, call the function
      fetchData()
        // make sure to catch any error
        .catch(console.error);
    }
    if (!localGuid || localGuid.length < 1) {
      localGuid = generateGuid();
      localStorage.setItem(localStorageKey, localGuid);
    }

    setUserGuid(localGuid);
  }, []);

  // do initial fetch of all the models
  const fetchData = async () => {
    const models = await DataStore.query(Vote);
    console.log(models);
    let numYes = 0;
    let numNo = 0;
    let numDk = 0;
    models?.forEach((x) => {
      switch (x.choice) {
        case Choice.YES:
          numYes++;
          break;
        case Choice.NO:
          numNo++;
          break;
        case Choice.DONT_KNOW:
          numDk++;
          break;
        default:
          break;
      }
    });
    setNumNoVotes(numNo);
    setNumYesCotes(numYes);
    setNumDontKnowVotes(numDk);
  };

  //update vote results
  const SaveVoteResult = async (choice: Choice) => {
    await DataStore.save(new Vote({ choice: choice }));
    setVoted(true);
    // now get vote results, call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  };

  return (
    <div>
      <Row>
        {voteChoices.map((voteChoice, index) => {
          return (
            <Col md={4} key={index}>
              <VotingCard
                choice={voteChoice}
                incrementVoteCount={(choice: Choice) => SaveVoteResult(choice)}
              />
            </Col>
          );
        })}
      </Row>
      {voted && (
        <Row>
          <h2>Thanks For Voting</h2>
          <p>See how others have voted:</p>
          <Col>
            <h3>Number of yes votes: {numYesVotes}</h3>
          </Col>
          <Col>
            <h3>Number of no votes: {numNoVotes}</h3>
          </Col>
          <Col>
            <h3>Number of dunno votes: {numDontKnowVotes}</h3>
          </Col>
          <h3> You unique id {userGuid}</h3>
          <Row>
            <button onClick={forgetUser}>Forget Me </button>
          </Row>
        </Row>
      )}
    </div>
  );
};
