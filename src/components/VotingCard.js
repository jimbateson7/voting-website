import { Button, Card } from "react-bootstrap";

function VotingCard(props) {
  let { choice, incrementVoteCount } = props;

  // @ts-ignore
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{choice.name}</Card.Title>
        <Button
          variant="success"
          onClick={() => incrementVoteCount(choice.choice)}
        >
          Vote
        </Button>
      </Card.Body>
    </Card>
  );
}

export default VotingCard;
