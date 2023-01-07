
import {Container} from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';
import {withAuthenticator, Button, Heading, Text} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function MemberArea({ signOut, user }) {
    return (

        <Container className="app">
            <Heading level={1}>Hello {user.username}</Heading>
            <Button onClick={signOut}>Sign out</Button>

            
            <Text> Hello {user.username} your so cool! </Text>

        </Container>
    );
}

export default withAuthenticator(MemberArea);
