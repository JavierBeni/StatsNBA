import React from 'react'
import './Title.scss';
import logo from '../../assets/img/nba-stats-logo.png';

function Title(props) {

    return (
        <div className="back_img">
            <img className="title_img" src={logo} alt={logo} ></img>
        </div>
    )

}

export default Title;