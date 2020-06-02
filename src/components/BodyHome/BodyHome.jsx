import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CardDeck from 'react-bootstrap/CardDeck'

import history from '../../history.js';

import './BodyHome.scss';

import scoreboard from '../../assets/img/scoreboard.webp';
import players from '../../assets/img/players.webp';
import teams from '../../assets/img/teams.png';


function redirectToTarget(event) {

    switch (event.target.value) {
        case "games":
            history.push('/home/games');
            break;
        case "players":
            history.push('/home/players');
            break;
        case "teams":
            history.push('/home/teams');
            break;
        default:
            break;
    }
}

function BodyHome(props) {

    return (
        <div className="cardDeck">
            <CardDeck>
                <Card className="card">
                    <Card.Img variant="top" src={scoreboard} className="imageCard" />
                    <Card.Body className="bodyCard">
                        <Card.Title>Games</Card.Title>
                        <Card.Text>
                            Stats and information about games.
                        </Card.Text>
                        <Button variant="primary" value="games" onClick={redirectToTarget}>See games stats</Button>
                    </Card.Body>
                </Card>
                <Card className="card">
                    <Card.Img variant="top" src={players} className="imageCard" />
                    <Card.Body className="bodyCard">
                        <Card.Title>Players</Card.Title>
                        <Card.Text>
                            Stats and information about players.
                        </Card.Text>
                        <Button variant="primary" value="players" onClick={redirectToTarget}>See players stats</Button>
                    </Card.Body>
                </Card>
                <Card className="card">
                    <Card.Img variant="top" src={teams} className="imageCard" />
                    <Card.Body className="bodyCard">
                        <Card.Title>Teams</Card.Title>
                        <Card.Text>
                            Information about teams.
                        </Card.Text>
                        <Button variant="primary" value="teams" onClick={redirectToTarget}>See teams stats</Button>
                    </Card.Body>
                </Card>
            </CardDeck>
        </div>

    );

}

export default BodyHome;