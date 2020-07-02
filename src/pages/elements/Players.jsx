import React from 'react';
import { Redirect } from 'react-router-dom';

import NavbarC from '../../components/Navbar/NavbarC'
import Loading from '../../components/Loading/Loading'
import BackButton from '../../components/BackButton/BackButton'

import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import history from '../../history.js';
import Button from 'react-bootstrap/Button'

import { auth } from "../../firebase";
import { api_host, api_key, api_url, api_n_per_page } from '../../ApiResources'

import './elements.scss';

export class Players extends React.Component {

    constructor() {
        super();
        this._isMounted = false;
        this.players = [];
        this.searchPlayers = this.searchPlayers.bind(this);
        this.playerDetails = this.playerDetails.bind(this);

        this.state = {
            authenticated: false,
            loading: true,
            players: [],
            redirect: ""
        };
    }

    //If name longer than 4 characters, allow search players.
    searchPlayers(event) {
        event.preventDefault();

        if (event.target.player.value.length < 4)
            alert("Name must have at least 4 characters");
        else {
            this._isMounted && this.setState({ loading: true, authenticated: false });
            this.players = [];

            for (let index = 1; index <= 2; index++)
                this.getPlayers(index.toString(), event.target.player.value);
        }
    }

    //Redict to stats of player.
    playerDetails(id) {
        history.push('/home/players/detail/' + id);
    }

    //Get player by name.
    getPlayers(page, name) {
        let unirest = require("unirest");
        let currentComponent = this;
        unirest("GET", api_url + "players")
            .query({
                "page": page,
                "per_page": api_n_per_page,
                "search": name
            })
            .headers({
                "x-rapidapi-host": api_host,
                "x-rapidapi-key": api_key
            })
            .end(function (res) {
                if (res.error) throw new Error(res.error);

                currentComponent.players = currentComponent.players.concat(res.body.data)
                if (res.body.meta.next_page === null)
                    currentComponent._isMounted && currentComponent.setState({ loading: false, authenticated: true, players: currentComponent.players });
            });
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
        this._isMounted && this.setState({ authenticated: false, loading: true });
    }

    render() {

        let rows_players = [];
        if (this.state.players)
            rows_players = this.state.players.map((player) =>
                <tr key={player.id} onClick={(e) => this.playerDetails(player.id)}>
                    <td>{player.first_name}</td>
                    <td>{player.last_name}</td>
                    <td>{player.position}</td>
                    <td>{player.height_feet}</td>
                    <td>{player.team.full_name}</td>
                </tr>);


        if (this.state.authenticated)
            return (
                <div className="elements">
                    <NavbarC></NavbarC>
                    <div className="elements_body">
                        <Form className="search_player" onSubmit={this.searchPlayers}>
                            <h2 className="small_title">Players</h2>
                            <Form.Control className="mr-sm-2" name="player" placeholder="Search" type="text" />
                            <Button type="submit">Submit form</Button>
                        </Form>
                        <div>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Position</th>
                                        <th>Height feet</th>
                                        <th>Team</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows_players}
                                </tbody>
                            </Table>
                            <div>
                                <h4>Number of resutls: <b>{rows_players.length}</b></h4>
                                <h4>Leyend of the position: <b>C</b>=CENTER; <b>G</b>=GUARD; <b>F</b>=FORWARD</h4>
                            </div>
                        </div>
                        <BackButton></BackButton>
                    </div>
                </div>
            );
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