import { Button, Card } from "react-bootstrap";

function VotingCard(props) {
    let { choice, incrementVoteCount } = props;

    return (
        <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={`${choice.logo}`} />

            <Card.Body>
                <Card.Title>{choice.name}</Card.Title>
                <Button variant="success" onClick={() => incrementVoteCount(choice.choice)}>
                    Vote
                </Button>
            </Card.Body>
            <Card.Footer>Vote count: {choice.votes}</Card.Footer>
        </Card>
    );
}

export default VotingCard;