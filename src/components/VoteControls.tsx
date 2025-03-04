import {DataStore} from "@aws-amplify/datastore";
import {Choice, Vote} from "../models";
import {useCallback, useEffect, useState} from "react";
import {Button, Col, Row} from "react-bootstrap";
import {v4 as generateGuid} from "uuid";
import {FaThumbsDown, FaThumbsUp} from "react-icons/fa";
import {localStorageVotingIdKey} from "../pages/VotingPage";

import {recordUse} from "../utils/analytics";
import {getCountry} from "../repositories/utils/country";


export interface TVoteControls {
    showStatistics: boolean,
    votingThankYou?: string,
    votingPostVoteExplanation?: string,
    questionId: string,
    voteResultCallBack?: (voted: boolean) => void,
    voteChangedCallBack?: (choice: Choice) => void,
    agreeVoteText?: string,
    disagreeVoteText?: string,
    allowVoting?: boolean
}

export const VoteControls = ({
                                 showStatistics,
                                 questionId,
                                 voteResultCallBack,
                                 voteChangedCallBack,
                                 agreeVoteText,
                                 disagreeVoteText,
                                 allowVoting
                             }: TVoteControls) => {
    const [numYesVotes, setNumYesVotes] = useState(0);
    const [numNoVotes, setNumNoVotes] = useState(0);
    let numYesVotesStr = numYesVotes < 10 ? `0${numYesVotes}` : `${numYesVotes}`;
    let numNoVotesStr = numNoVotes < 10 ? `0${numNoVotes}` : `${numNoVotes}`;

    function splitText(text: string): [string, string] {
        const words = text.split(' ');
        const firstWord = words.shift() || '';
        const restOfText = words.join(' ');

        return [firstWord, restOfText];
    }

    numYesVotesStr = numYesVotes > 1000 ? `${Math.floor(numYesVotes / 1000)}k` : numYesVotesStr;
    numNoVotesStr = numNoVotes > 1000 ? `${Math.floor(numNoVotes / 1000)}k` : numNoVotesStr;
    const [fetchedVotes, setFetchedVotes] = useState(false);
    const [voteChoice, setVoteChoice] = useState<Choice | undefined>(undefined)

    const voted = voteChoice != undefined;
    const fetchVoteCounts = useCallback(async () => {
        const localGuid = localStorage.getItem(localStorageVotingIdKey);
        const votes = await DataStore.query(Vote, (v) => v.and(v => [v.voterId.eq(localGuid), v.questionId.eq(questionId)]));
        const aVote = votes.shift();
        const hasVoted = !!aVote;

        voteResultCallBack?.(hasVoted);

        if (hasVoted) {
            setVoteChoice(aVote.choice as Choice);
        }

        const noVotes = (await DataStore.query(Vote, (v) => v.and(v => [v.choice.eq(Choice.NO), v.questionId.eq(questionId)]))).length;
        const yesVotes = (await DataStore.query(Vote, (v) => v.and(v => [v.choice.eq(Choice.YES), v.questionId.eq(questionId)]))).length;

        setNumNoVotes(
            noVotes
        );
        setNumYesVotes(
            yesVotes
        );
        setFetchedVotes(true);

    }, [voteResultCallBack])


    useEffect(() => {
        const yesVoteButton = document.getElementById('vote-yes-1');
        const noVoteButton = document.getElementById('vote-no-1');
        const targetHeading = document.getElementById('share-heading-1');

        if (yesVoteButton && targetHeading) {
            yesVoteButton.addEventListener('click', () => {
                // targetHeading.scrollIntoView({behavior: 'smooth'});
            });
        }

        if (noVoteButton && targetHeading) {
            noVoteButton.addEventListener('click', () => {
                // targetHeading.scrollIntoView({behavior: 'smooth'});
            });
        }

        const video = document.getElementById('main-video');

        if (video && targetHeading) {
            video.addEventListener('ended', () => {
                // targetHeading.scrollIntoView({behavior: 'smooth'});
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
            const existingVotes = await DataStore.query(Vote, (v) => v.and(v => [v.voterId?.eq(localGuid), v.questionId?.eq(questionId)]))
            const aExistingVote = existingVotes.shift();
            const hasIdAlreadyVoted = !!aExistingVote;
            const country = getCountry() as string;

            if (hasIdAlreadyVoted) {
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
                }, localGuid)

                await DataStore.delete(aExistingVote);
            } else {
                try {
                    recordUse({
                        name: 'Voted',
                        immediate: true,
                        // Attribute values must be strings
                        attributes: {
                            choice: `${choice?.toString()}`,
                            userId: `${localGuid?.toString()}`,
                            questionId: `${questionId?.toString()}`,
                            country: `${country}`
                        }
                    }, localGuid)
                } catch (e) {

                    console.log(e);
                }
            }

            await DataStore.save(
                new Vote({choice: choice, voterId: localGuid, questionId: questionId, country: country})
            ).then((x) => {
                fetchVoteCounts().then(() => {
                    setFetchedVotes(true)
                    setVoteChoice(choice);
                });
            });
        }
    };

    function userChangedVote(choice: Choice) {
        if(!allowVoting)
            return;
        SaveVoteToDb(choice);
        voteChangedCallBack?.(choice);
    }

    if (!fetchedVotes) {
        fetchVoteCounts().then(() => setFetchedVotes(true));
    }

    /*scroll down after voting so please share and donat is more prominate*/
    const [disagreeTextFirstWord, disagreeTextRest] = splitText(disagreeVoteText || ' ');
    const [agreeTextFirstWord, agreeTextRest] = splitText(agreeVoteText || ' ');

    return (
        <>
            <div className={"voteControlRow"}>
                <div className={`voteCol`}>
                    <Button
                        className={`btn-${voteChoice === Choice.YES ? "light" : "dark"}`}
                        id="vote-yes"
                        disabled={!allowVoting}
                        size="lg"
                        onClick={() => userChangedVote(Choice.YES)}
                        title={voteChoice === Choice.YES ? "You voted Yes" : "Change vote to Yes"}>
                        <FaThumbsUp className="thumbs-up"/>
                        {showStatistics ? <span className="yes">{numYesVotesStr}</span> : null}
                    </Button>
                    <p><strong>{agreeTextFirstWord}</strong> {agreeTextRest}</p>
                </div>
                <div className={`voteCol `}>
                    <Button
                        className={`btn-${voteChoice === Choice.NO ? "light" : "dark"}`}
                        size="lg"
                        onClick={() => userChangedVote(Choice.NO)}
                        disabled={!allowVoting}
                        id="vote-no"
                        title={voteChoice === Choice.NO ? "You voted No" : "Change vote to No"}>
                        <FaThumbsDown className="thumbs-down"/>
                        {showStatistics ? <span className="no">{numNoVotesStr}</span> : null}
                    </Button>
                    <p><strong>{disagreeTextFirstWord}</strong> {disagreeTextRest}</p>

                </div>
            </div>
        </>
    );
};
