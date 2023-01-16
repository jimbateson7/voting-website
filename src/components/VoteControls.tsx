import { DataStore } from "@aws-amplify/datastore";
import { Choice, Vote } from "../models";
import { useEffect, useState } from "react";
import { voteChoices } from "./VoteChoice";
import VotingCard from "./VotingCard";
import { Col, Row } from "react-bootstrap";
import { v4 as generateGuid } from "uuid";
import { FaCheckCircle, FaTimesCircle, FaQuestionCircle } from 'react-icons/fa';

export const VoteControls = () => {
    const [numYesVotes, setNumYesVotes] = useState(0);
    const [numNoVotes, setNumNoVotes] = useState(0);
    const [numDontKnowVotes, setNumDontKnowVotes] = useState(0);
    const [voted, setVoted] = useState(false);
    const [voterId, setVoterId] = useState(``);

    const localStorageKey = "voterId";

    useEffect(() => {
        let localGuid = localStorage.getItem(localStorageKey);

        // If the user has voted, show current vote counts
        if (localGuid) {
            setVoterId(localGuid);
            setVoted(true);
            fetchVoteCounts()
                .catch(console.error);
        }
    }, []);

    const fetchVoteCounts = async () => {
        setNumNoVotes(await (await DataStore.query(Vote, v => v.choice.eq(Choice.NO))).length);
        setNumYesVotes(await (await DataStore.query(Vote, v => v.choice.eq(Choice.YES))).length);
        setNumDontKnowVotes(await (await DataStore.query(Vote, v => v.choice.eq(Choice.DONT_KNOW))).length);
    };

    const SaveVoteToDb = async (choice: Choice) => {
        const hasVoted = localStorage.getItem(localStorageKey) !== null;

        if (hasVoted) {
            // TODO: Consider more robust preventative measures (e.g. log an IP address against a Vote and check against the database first)
            return;
        }

        const localGuid = generateGuid();

        await DataStore.save(new Vote({ choice: choice, voterId: localGuid }));

        localStorage.setItem(localStorageKey, localGuid);
        setVoterId(localGuid);
        setVoted(true);

        fetchVoteCounts()
            .catch(console.error);
    };

    return (
        <>
            {!voted &&
                <Row>
                    {voteChoices.map((voteChoice, index) => {
                        return (
                            <Col md={4} key={index}>
                                <VotingCard
                                    choice={voteChoice}
                                    incrementVoteCount={(choice: Choice) => SaveVoteToDb(choice)}
                                />
                            </Col>
                        );
                    })}
                </Row>
            }

            {voted && (
                <Row>
                    <h2>Thanks For Voting</h2>
                    <h3>See how others have voted:</h3>
                    <Col>
                        <FaCheckCircle style={{ color: 'green', fontSize: '3rem', padding: '.25rem' }} />
                        <h4>Yes: {numYesVotes}</h4>
                    </Col>
                    <Col>
                        <FaTimesCircle style={{ color: 'red', fontSize: '3rem', padding: '.25rem' }} />
                        <h4>No: {numNoVotes}</h4>
                    </Col>
                    <Col>
                        <FaQuestionCircle style={{ color: 'orange', fontSize: '3rem', padding: '.25rem' }} />
                        <h4>Unsure: {numDontKnowVotes}</h4>
                    </Col>
                </Row>
            )}
        </>
    );
};
