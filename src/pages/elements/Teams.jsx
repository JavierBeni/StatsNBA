import React from 'react';
import { Redirect } from 'react-router-dom';
import NavbarC from '../../components/Navbar/NavbarC'
import MyCard from '../../components/MyCard/MyCard'
import Loading from '../../components/Loading/Loading'
// import Form from 'react-bootstrap/Form'
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

            if (user) {

                if (typeof (Storage) !== "undefined") {

                    if (JSON.parse(sessionStorage.getItem('teams'))) {
                        this._isMounted && this.setState({ loading: false, authenticated: true });
                    }
                    else {
                        let unirest = require("unirest");
                        let currentComponent = this;

                        unirest("GET", "https://free-nba.p.rapidapi.com/teams")
                            .query({
                                "page": "0",
                                "per_page": "100"
                            })
                            .headers({
                                "x-rapidapi-host": "free-nba.p.rapidapi.com",
                                "x-rapidapi-key": "57f3d387bcmshd9fb6c4a083a488p1de507jsn208254e5e0cf"
                            })
                            .end(function (res) {
                                if (res.error) throw new Error(res.error);

                                sessionStorage.setItem('teams', JSON.stringify(res.body));
                                console.log(JSON.parse(sessionStorage.getItem('teams')).data);
                                currentComponent._isMounted && currentComponent.setState({ loading: false, authenticated: true });
                            });
                    }
                }
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

            console.log(JSON.parse(sessionStorage.getItem('teams')));
            let teams = JSON.parse(sessionStorage.getItem('teams'));
            let listCards = <p>No teams</p>;
            if (teams) {
                listCards = teams.data.map((team) => <MyCard key={team.id} team={team}></MyCard>);
                console.log(listCards);
            }

            return (
                <div>
                    <NavbarC></NavbarC>
                    <CardColumns className="elements">
                        {listCards}
                    </CardColumns>
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