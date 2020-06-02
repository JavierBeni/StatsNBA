import React from 'react';
import NavbarC from '../components/Navbar/NavbarC'
import BodyHome from '../components/BodyHome/BodyHome'
import Loading from '../components/Loading/Loading'
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