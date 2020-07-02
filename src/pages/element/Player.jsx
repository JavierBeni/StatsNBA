import React from 'react'
import { Redirect } from 'react-router-dom';

import NavbarC from '../../components/Navbar/NavbarC'
import Loading from '../../components/Loading/Loading'
import BackButton from '../../components/BackButton/BackButton'

import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'

import { auth } from "../../firebase";
import { api_host, api_key, api_url, api_n_per_page } from '../../ApiResources'

import './element.scss';

export class Player extends React.Component {

    constructor() {
        super();
        this._isMounted = false;
        this.id = window.location.href.split('/').slice(-1).pop();
        this.player = null;
        this.seachStats = this.seachStats.bind(this);
        this.state = {
            player_stats: [],
            loading: true,
            authenticated: false
        };
    }

    componentDidMount() {
        this._isMounted = true;
        auth.onAuthStateChanged((user) => {

            if (user) {
                let unirest = require("unirest");
                let currentComponent = this;

                unirest("GET", api_url + "players/" + this.id)
                    .headers({
                        "x-rapidapi-host": api_host, 
                        "x-rapidapi-key": api_key, 
                        "useQueryString": true
                    })
                    .end(function (res) {
                        if (res.error) throw new Error(res.error);
                        currentComponent.player = res.body;
                        currentComponent._isMounted && currentComponent.setState({ loading: false, authenticated: true });
                    });
            } else
                this._isMounted && this.setState({ loading: false, authenticated: false });
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
        console.log('no mounted');
        this._isMounted && this.setState({ loading: true, authenticated: false });
    }

    seachStats(event) {
        // event.preventDefault();
        console.log(event.target.value);
        let unirest = require("unirest");
        let currentComponent = this;

        this._isMounted && this.setState({ loading: true, authenticated: false });

        unirest("GET", api_url + "stats")
            .query({
                "page": "1",
                "per_page": api_n_per_page,
                "player_ids[]": [currentComponent.id],
                "seasons[]": [event.target.value]
            })
            .headers({
                "x-rapidapi-host": api_host,
                "x-rapidapi-key": api_key
            })
            .end(function (res) {
                if (res.error) throw new Error(res.error);
                console.log(res.body)
                currentComponent._isMounted && currentComponent.setState({ loading: false, authenticated: true, player_stats: res.body.data });
            });
    }

    render() {

        if (this.state.authenticated) {

            let teams = JSON.parse(sessionStorage.getItem('teams')).data;

            let rows_stats = [];
            if (this.state.player_stats)
                rows_stats = this.state.player_stats
                    .filter((stat) => stat.min)
                    .map((stat) => {

                        let home = teams[stat.game.home_team_id] ? teams[stat.game.home_team_id - 1].abbreviation : "---";
                        let visitor = teams[stat.game.visitor_team_id] ? teams[stat.game.visitor_team_id - 1].abbreviation : "---";

                        return (
                            <tr key={stat.id}>
                                <td>{home} vs {visitor}</td>
                                <td>{stat.ast}</td>
                                <td>{stat.blk}</td>
                                <td>{stat.reb}</td>
                                <td>{stat.dreb}</td>
                                <td>{stat.oreb}</td>
                                <td>{stat.pts}</td>
                                <td>{stat.stl}</td>
                                <td>{stat.fg3_pct}</td>
                                <td>{stat.fg3a}</td>
                                <td>{stat.fg3m}</td>
                                <td>{stat.fg_pct}</td>
                                <td>{stat.fga}</td>
                                <td>{stat.fgm}</td>
                                <td>{stat.ft_pct}</td>
                                <td>{stat.fta}</td>
                                <td>{stat.ftm}</td>
                                <td>{stat.pf}</td>
                                <td>{stat.min}</td>
                                <td>{stat.turnover}</td>
                            </tr>);
                    }
                    );

            let d = new Date();
            let listYears = [];
            for (let index = 2000; index < d.getFullYear(); index++)
                listYears.push(<option key={index} value={index}>{index}</option>);

            return (
                <div className="element">
                    <NavbarC></NavbarC>
                    <div className="element_body">
                        <div className="title_element">
                            <h1>Player: {this.player.first_name} {this.player.last_name}</h1>
                            <h2>Current team: {this.player.team.full_name}</h2>
                            <Form.Control as="select" name="season" className="mr-sm-2 select" defaultValue={'DEFAULT'} onChange={this.seachStats}>
                                <option value="DEFAULT" disabled>Season...</option>
                                {listYears}
                            </Form.Control>
                        </div>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Game</th>
                                    <th>AST</th>
                                    <th>BLK</th>
                                    <th>REB</th>
                                    <th>DREB</th>
                                    <th>OREB</th>
                                    <th>PTS</th>
                                    <th>STL</th>
                                    <th>3P%</th>
                                    <th>3PA</th>
                                    <th>3PM</th>
                                    <th>FG%</th>
                                    <th>FGA</th>
                                    <th>FGM</th>
                                    <th>FT%</th>
                                    <th>FTA</th>
                                    <th>FTM</th>
                                    <th>PF</th>
                                    <th>MIN</th>
                                    <th>TOV</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows_stats}
                            </tbody>
                        </Table>
                        <h4>Number of resutls: <b>{rows_stats.length}</b></h4>
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
                        <Loading className="loading"></Loading>
                    </div>
                )
            else
                return <Redirect to='/' />;

    }
}