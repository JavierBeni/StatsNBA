import React from 'react';

import NavbarC from '../components/Navbar/NavbarC'
import BodyHome from '../components/BodyHome/BodyHome'
import Loading from '../components/Loading/Loading'

import { Redirect } from 'react-router-dom';
import { auth } from "../firebase";
import { api_host, api_key, api_url, api_n_per_page } from '../ApiResources'

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

                if (typeof (Storage) !== "undefined") {

                    if (JSON.parse(sessionStorage.getItem('teams')))
                        this._isMounted && this.setState({ loading: false, authenticated: true });
                    else {
                        let unirest = require("unirest");
                        let currentComponent = this;

                        unirest("GET", api_url + "teams")
                            .query({
                                "page": "1",
                                "per_page": api_n_per_page
                            })
                            .headers({
                                "x-rapidapi-host": api_host,
                                "x-rapidapi-key": api_key
                            })
                            .end(function (res) {
                                if (res.error) throw new Error(res.error);

                                sessionStorage.setItem('teams', JSON.stringify(res.body));
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
                return <Loading></Loading>
            else
                return <Redirect to='/' />;


    }
}