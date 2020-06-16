import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import history from '../../history.js';

//Redirect to one of three options of body.
function redirectToTarget(event) {
    history.push('/home/' + event.target.value);
}

//Card of one of three options in body page
function TeamCard(props) {
    return (
        <Card className="card">
            <Card.Img variant="top" src={props.image} className="imageCard" />
            <Card.Body className="bodyCard">
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>{props.text}</Card.Text>
                <Button variant="primary" value={props.value} onClick={redirectToTarget}>See {props.value} stats</Button>
            </Card.Body>
        </Card>
    );
}

export default TeamCard;
