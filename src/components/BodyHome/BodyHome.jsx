import React, { Component } from 'react'
import { Redirect, BrowserRouter as Router } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CardDeck from 'react-bootstrap/CardDeck'
import { Players } from '../../pages/Players/Players'

import './BodyHome.scss';
import scoreboard from '../../assets/img/scoreboard.webp';
import players from '../../assets/img/players.webp';
import teams from '../../assets/img/teams.png';

export class BodyHome extends Component {

    constructor() {
        super();
        this.redirectToTarget = this.redirectToTarget.bind(this);
        this.state = {
            loading: true,
            authenticated: false,
            redirect: ""
        };
    }

    redirectToTarget(event) {

        switch (event.target.value) {
            case "games":
                this.setState({ redirect: "games" });
                break;
            case "players":
                this.setState({ redirect: "players" });
                break;
            case "teams":
                this.setState({ redirect: "teams" });
                break;
            default:
                this.setState({ redirect: "" });
                break;
        }
    }

    render() {
        // const { Title, Poster, Actors, Metascore, Plot } = this.state.movie

        let { redirect } = this.state;
        switch (redirect) {
            case "games":
                // return <Redirect to='/home/games' />;
                return <Redirect to='/home/teams' />;
            case "players":
                return <div className="Players">
                    <Players></Players>
                </div>
            case "teams":
                return <Redirect to='/home/teams' />;
            default:
                return (
                    <div className="cardDeck">
                        <CardDeck>
                            <Card className="card">
                                <Card.Img variant="top" src={scoreboard} className="imageCard" />
                                <Card.Body className="bodyCard">
                                    <Card.Title>Games</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                        </Card.Text>
                                    <Button variant="primary">See games stats</Button>
                                </Card.Body>
                            </Card>
                            <Card className="card">
                                <Card.Img variant="top" src={players} className="imageCard" />
                                <Card.Body className="bodyCard">
                                    <Card.Title>Players</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                        </Card.Text>
                                    <Button variant="primary" value="players" onClick={this.redirectToTarget}>See players stats</Button>
                                </Card.Body>
                            </Card>
                            <Card className="card">
                                <Card.Img variant="top" src={teams} className="imageCard" />
                                <Card.Body className="bodyCard">
                                    <Card.Title>Teams</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                        </Card.Text>
                                    <Button variant="primary">See teams stats</Button>
                                </Card.Body>
                            </Card>
                        </CardDeck>
                    </div>

                );

                break;
        }


    }
}