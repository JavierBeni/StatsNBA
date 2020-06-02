import React from 'react';
import { Redirect } from 'react-router-dom';
import NavbarC from '../../components/Navbar/NavbarC'
import Loading from '../../components/Loading/Loading'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
import { auth } from "../../firebase";

export class Games extends React.Component {

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

                let unirest = require("unirest");
                let currentComponent = this;

                unirest("GET", "https://free-nba.p.rapidapi.com/games")
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
                        currentComponent._isMounted && currentComponent.setState({ loading: false, authenticated: true });
                        console.log(res.body);
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
                <div className="games">
                    <NavbarC></NavbarC>
                    <p>Players</p>
                </div>
            );
        else
            if (this.state.loading)
                return (
                    <div className="games">
                        <NavbarC></NavbarC>
                        <Loading></Loading>
                    </div>
                )
            else
                return <Redirect to='/' />;




    }
}