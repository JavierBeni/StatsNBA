import React from 'react';
import { Redirect } from 'react-router-dom';

import NavbarC from '../../components/Navbar/NavbarC'
import Loading from '../../components/Loading/Loading'
import BackButton from '../../components/BackButton/BackButton'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

import { auth } from "../../firebase";
import { api_host, api_key, api_url, api_n_per_page } from '../../ApiResources'

export class Games extends React.Component {

    constructor() {
        super();
        this._isMounted = false;
        this.games = [];
        this.searchGames = this.searchGames.bind(this);
        this.state = {
            loading: true,
            authenticated: false
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

    //Check if both field are completed.
    searchGames(event) {

        event.preventDefault();
        if (event.target.team.value === "DEFAULT" || event.target.season.value === "DEFAULT")
            alert("You must choose a team and a season.");
        else {
            this._isMounted && this.setState({ loading: true, authenticated: false });
            this.games = [];
            this.getGames(1, event.target.team.value, event.target.season.value);
        }
    }

    //Get games by team and season.
    getGames(page, team, season) {
        let unirest = require("unirest");
        let currentComponent = this; console.log(team, season)
        unirest("GET", api_url + "games")
            .query({
                "page": page,
                "per_page": api_n_per_page,
                "team_ids[]": [team],
                "seasons[]": [season]
            })
            .headers({
                "x-rapidapi-host": api_host,
                "x-rapidapi-key": api_key
            })
            .end(function (res) {
                if (res.error) throw new Error(res.error);

                currentComponent.games = currentComponent.games.concat(res.body.data);
                (res.body.meta.next_page === null) ?
                    currentComponent._isMounted && currentComponent.setState({ loading: false, authenticated: true }) :
                    currentComponent.getGames(page + 1, team, season);
            });
    }

    render() {

        let teams = JSON.parse(sessionStorage.getItem('teams'));
        let listTeams = [];
        if (teams)
            listTeams = teams.data.map((team) => <option key={team.id} value={team.id}>{team.full_name}</option>);

        let d = new Date();
        let listYears = [];
        for (let index = 2000; index < d.getFullYear(); index++)
            listYears.push(<option key={index} value={index}>{index}</option>);

        let rows_players = <p></p>;
        if (this.games) {
            rows_players = this.games.map((game) =>
                <tr key={game.id}>
                    <td>{game.date.split("T")[0]}</td>
                    <td>{game.home_team.full_name}</td>
                    <td>{game.home_team_score}</td>
                    <td>{game.visitor_team.full_name}</td>
                    <td>{game.visitor_team_score}</td>
                </tr>)
        }

        if (this.state.authenticated)
            return (
                <div className="elements">
                    <NavbarC></NavbarC>
                    <div className="elements_body">
                        <Form className="search_player" onSubmit={this.searchGames}>
                            <h2 className="small_title">Games</h2>
                            <Form.Control as="select" name="team" className="mr-sm-2" defaultValue={'DEFAULT'}>
                                <option value="DEFAULT" disabled>Team...</option>
                                {listTeams}
                            </Form.Control>
                            <Form.Control as="select" name="season" className="mr-sm-2" defaultValue={'DEFAULT'}>
                                <option value="DEFAULT" disabled>Season...</option>
                                {listYears}
                            </Form.Control>
                            <Button type="submit">Submit form</Button>
                        </Form>
                        <div>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Home Team</th>
                                        <th>Home Team Score</th>
                                        <th>Visitor Team</th>
                                        <th>Visitor Team Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows_players}
                                </tbody>
                            </Table>
                            <h4>Number of resutls: <b>{rows_players.length}</b></h4>
                            <BackButton></BackButton>
                        </div>
                    </div>
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