import React from 'react';
import { NavbarC } from '../components/Navbar/NavbarC'
import { BodyHome } from '../components/BodyHome/BodyHome'
import { Redirect } from 'react-router-dom';
import { auth } from "../firebase";
import './Home.scss';

export class Home extends React.Component {

    constructor() {
        super();
        this._isMounted = false;
        this.state = {
            loading: true,
            authenticated: false,
        };
    }

    componentDidMount() {
        this._isMounted = true;
        auth.onAuthStateChanged((user) => {

            if (user) {

                let unirest = require("unirest");
                let currentComponent = this;
                let i = 0;
                unirest("GET", "https://free-nba.p.rapidapi.com/stats")
                    .query({
                        "page": "0",
                        "per_page": "30"
                    })
                    .headers({
                        "x-rapidapi-host": "free-nba.p.rapidapi.com",
                        "x-rapidapi-key": "57f3d387bcmshd9fb6c4a083a488p1de507jsn208254e5e0cf"
                    })
                    .end(function (res) {
                        if (res.error) throw new Error(res.error);
                        i = i + 1;
                        console.log(i);
                        currentComponent._isMounted && currentComponent.setState({ loading: false, authenticated: true });
                        
                    });

            } else {
                this._isMounted && this.setState({ loading: false, authenticated: false });
            }
        });

    }

    componentWillUnmount() {
        this._isMounted = false;
        console.log('no mounted');
        this._isMounted && this.setState({ loading: true, authenticated: false });
    }

    render() {
        if (this.state.authenticated)
            return (
                <div className="home">
                    <NavbarC></NavbarC>
                    <BodyHome></BodyHome>
                </div>
            );
        else
            if (this.state.loading)
                return <p>Loading</p>
            else
                return <Redirect to='/' />;


    }
}