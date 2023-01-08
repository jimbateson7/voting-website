//import { DataStore } from '@aws-amplify/datastore';
//import { VoteResult } from './models';
//import React, { useEffect, useState } from "react";
//import { voteChoices } from "./VoteChoice";
//import VotingCard from "./VotingCard";
//import { Col, Row } from "react-bootstrap";
//import { API, graphqlOperation } from 'aws-amplify';
//import * as subscriptions from './graphql/subscriptions';


//export const VoteControls = () => {


//    //email stuff
//    const [emailAddress, setEmailAddress] = useState('');
//    const [error, setError] = useState(null);

//    function isValidEmail(email) {
//        return /\S+@\S+\.\S+/.test(email);
//    }

//    const handleChange = event => {
//        if (!isValidEmail(event.target.value)) {
//            setError('Email is invalid');
//        } else {
//            setError(null);
//        }

//        setEmailAddress(event.target.value);
//    };

//    //voting stuff
//    const [numYesVotes, setNumYesCotes] = useState(0);
//    const [numNoVotes, setNumNoVotes] = useState(0);
//    const [numDontKnowVotes, setNumDontKnowVotes] = useState(0);
//    const [userSubscribed, setUserSubscribed] = useState(false);

//    // do initial fetch of all the models
//    const fetchData = async () => {
//        const models = await DataStore.query(VoteResult);
//        console.log(models);
//        let numYes = 0;
//        let numNo = 0;
//        let numDk = 0;
//        models?.forEach(x => {
//            switch (x.name) {
//                case "YES":
//                    numYes++;
//                    break;
//                case "NO":
//                    numNo++;
//                    break;
//                case "DONT_KNOW":
//                    numDk++;
//                    break;
//                default:
//                    break;
//            }

//        });
//        setNumNoVotes(numNo);
//        setNumYesCotes(numYes);
//        setNumDontKnowVotes(numDk);
//    }

//    useEffect(() => {

//        // call the function
//        fetchData()
//            // make sure to catch any error
//            .catch(console.error);


//    }, [numNoVotes, numYesVotes, numDontKnowVotes]) //todo not do a whole query each time we see a sub change

//    // set up subscription for updates
//    if (!userSubscribed) { //todo unload subscription somewhere

//        const subscription = API.graphql(
//            graphqlOperation(subscriptions.onCreateVoteResult)
//        ).subscribe({
//            next: ({ provider, value }) => {


//                const name = value.data.onCreateVoteResult.name;
//                //todo no sure why this resets the counter to 0 so just forcing refresh through use effect
//                setNumDontKnowVotes(0);
//                /*
//                //todo count the change  
//                switch (name) {
//                     case "YES":
//                         setNumYesCotes(numYesVotes + 1);
//                         break;
//                     case "NO":
//                         setNumNoVotes(numNoVotes + 1);
//                         break;
//                     case "DONT_KNOW":
//                         setNumDontKnowVotes(numDontKnowVotes + 1);
//                         break;
//                     default:break;
//                 }*/


//                console.log({ provider, value });

//            },
//            error: (error) => console.warn(error)
//        });
//        setUserSubscribed(true);
//    }

//    //update vote results
//    const SaveVoteResult = async (choice) => {

//        await DataStore.save(
//            new VoteResult({
//                "name": choice,
//                "email_address": emailAddress
//            })
//        );
//    }

//    //todo something less crap
//    voteChoices[0].votes = numYesVotes;
//    voteChoices[1].votes = numNoVotes;
//    voteChoices[2].votes = numDontKnowVotes;

//    return (
//        <div>
//            <Row>
//                {voteChoices.map((voteChoice, index) => {
//                    return (
//                        <Col md={4} key={index}>
//                            <VotingCard

//                                choice={voteChoice}
//                                incrementVoteCount={(choice) => SaveVoteResult(choice)}
//                            />
//                        </Col>
//                    );
//                })}
//            </Row>
//            <div>
//                <input
//                    id="emailAddress"
//                    name="emailAddress"
//                    value={emailAddress}
//                    onChange={handleChange}
//                />

//                {error && <h2 style={{ color: 'red' }}>{error}</h2>}
//            </div>
//        </div>

//    );
//};
