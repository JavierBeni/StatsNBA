import React from 'react';
import { Redirect } from 'react-router-dom';

import NavbarC from '../../components/Navbar/NavbarC'
import TeamCard from '../../components/TeamCard/TeamCard'
import Loading from '../../components/Loading/Loading'
import BackButton from '../../components/BackButton/BackButton'

import CardColumns from 'react-bootstrap/CardColumns'
import { auth } from "../../firebase";

import './elements.scss';

export class Teams extends React.Component {

    constructor() {
        super();
        this._isMounted = false;
        this.state = {
            loading: true,
            authenticated: false,
            redirect: ""
        };
    }

    componentDidMount() {
        this._isMounted = true;
        auth.onAuthStateChanged((user) => {

            (user) ?
                this._isMounted && this.setState({ loading: false, authenticated: true }) :
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

            // console.log(JSON.parse(sessionStorage.getItem('teams')));
            let teams = JSON.parse(sessionStorage.getItem('teams'));
            let listCards = <p>No teams</p>;
            if (teams) {
                listCards = teams.data.map((team) => <TeamCard key={team.id} team={team}></TeamCard>);
                console.log(listCards);
            }

            return (
                <div className="elements">
                    <NavbarC></NavbarC>
                    <div className="elements_body">
                        <h2 className="small_title">Teams</h2>
                        <CardColumns className="card_columns">
                            {listCards}
                        </CardColumns>
                        <BackButton></BackButton>
                    </div>

                </div>
            );
        }
        else
            if (this.state.loading)
                return (
                    <div>
                        <NavbarC></NavbarC>
                        <Loading></Loading>
                    </div>
                )
            else
                return <Redirect to='/' />;

    }
}