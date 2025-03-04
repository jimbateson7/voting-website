import {Col, Row} from "react-bootstrap";
import {VoteControls} from "../components/VoteControls";
import {VoteResults} from "../components/VoteResults";
import React from "react";

export const VotingResultsFrame = ({questionId}: { questionId: string }) => {
    return (<Row key={questionId}>
        <div className="frame">
            <div className="frame-content">
                <h2 id="results-heading">Voting Results</h2>
                {<VoteControls questionId={questionId} showStatistics={true} allowVoting={false}/>}
                <Row style={{paddingTop: 20}}>
                    <Col></Col>
                    <Col> <VoteResults questionId={questionId}/></Col>
                    <Col></Col>
                </Row>

            </div>
        </div>

    </Row>)
}