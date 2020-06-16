import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import history from '../../history.js';

import './TeamCard.scss';

//Redirect to details of a team.
function redirectToTarget(event) {
    console.log(event.target.value);
    history.push('/home/teams/detail/' + event.target.value);
}

//Card of team in teams page
function TeamCard(props) {

    let logo = require('../../assets/img/teams/' + props.team.abbreviation + '.png');
    return (
        <Card className="card">
            <Card.Img variant="top" className="imageCard" />
            <Card.Body className="bodyMyCard">
                <img className="img_team" style={{height: "10vh", minHeight: "50px"}} alt="logo" src={logo}></img>
                <Card.Title><span style={{fontFamily: props.team.abbreviation + 'Font', fontSize: "120%"}}>{props.team.name}</span></Card.Title>
                <Button variant="primary" value={props.team.id} onClick={redirectToTarget}>See details</Button>
            </Card.Body>
        </Card>
    );
}

export default TeamCard;
