import React, { Component } from 'react'
import './Title.scss';
import logo from '../../assets/img/nba-stats-logo.png';

export class Title extends Component {

    render() {
        return (
            <div className="back_img">
                <img src={logo} alt={logo} ></img>
            </div>
        )
    }
}