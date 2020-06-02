import React from 'react'
import NavbarC from '../../components/Navbar/NavbarC'
import { Redirect } from 'react-router-dom';

import { auth } from "../../firebase";

import './element.scss';

export class Team extends React.Component {

    constructor() {
        super();
        this._isMounted = false;
        this.id = window.location.href.split('/').slice(-1).pop();
        this.team = JSON.parse(sessionStorage.getItem('teams')).data[parseInt(this.id) - 1];
        this.logo = require('../../assets/img/teams/' + this.team.abbreviation + '.png');

        this.state = {
            loading: true,
            authenticated: false
        };
    }

    componentDidMount() {
        this._isMounted = true;
        auth.onAuthStateChanged((user) => {

            if (user) {
                this._isMounted && this.setState({ loading: false, authenticated: true });
            } else
                this._isMounted && this.setState({ loading: false, authenticated: false });
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
        console.log('no mounted');
        this._isMounted && this.setState({ loading: true, authenticated: false });
    }

    render() {

        if (this.state.authenticated) {

            return (
                <div>
                    <NavbarC></NavbarC>
                    <div className="element">
                        <div className="title_team">
                            <h1>Team: {this.team.full_name}</h1>
                            <img className="img_team" alt="logo" src={this.logo}></img>
                        </div>

                        <div className="sub_team">
                            <h3>City: {this.team.city}</h3>
                            <h3>Name: {this.team.name}</h3>
                        </div>
                        <div className="info_team">
                            <h4>Abbreviation: {this.team.abbreviation}</h4>
                            <h4>Conference: {this.team.conference}</h4>
                            <h4>Division: {this.team.division}</h4>
                        </div>


                    </div>

                </div>
            );
        }
        else
            if (this.state.loading)
                return (
                    <div>
                        <NavbarC></NavbarC>
                        <p className="elements">Loading</p>
                    </div>
                )
            else
                return <Redirect to='/' />;

    }
}