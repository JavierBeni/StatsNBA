import React from 'react'

import CardDeck from 'react-bootstrap/CardDeck'

import BodyCard from '../BodyCard/BodyCard'

import './BodyHome.scss';

import scoreboard from '../../assets/img/scoreboard.webp';
import players from '../../assets/img/players.webp';
import teams from '../../assets/img/teams.png';

//Component of home. 
function BodyHome(props) {
    return (
        <div className="cardDeck">
            <CardDeck>
                <BodyCard image={scoreboard} title="Games" text="Stats and information about games." value="games"></BodyCard>
                <BodyCard image={players} title="Games" text="Stats and information about players." value="players"></BodyCard>
                <BodyCard image={teams} title="Teams" text="Information about teams." value="teams"></BodyCard>
            </CardDeck>
        </div>
    );
}

export default BodyHome;