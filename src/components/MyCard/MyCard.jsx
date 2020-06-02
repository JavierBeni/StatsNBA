import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import history from '../../history.js';
import './MyCard.scss';

function redirectToTarget(event) {
    console.log(event.target.value);
    history.push('/home/teams/detail/' + event.target.value);
}

function MyCard(props) {

    return (
        <Card className="card">
            <Card.Img variant="top" className="imageCard" />
            <Card.Body className="bodyMyCard">
                <Card.Title>{props.team.full_name}</Card.Title>
                {/* <Card.Text>Conference: {props.team.conference}</Card.Text>
                <Card.Text>Division: {props.team.division}</Card.Text> */}
                <Button variant="danger" value={props.team.id} onClick={redirectToTarget}>See team details</Button>
            </Card.Body>
        </Card>
    );
}

export default MyCard;

//value="games" onClick={this.redirectToTarget}