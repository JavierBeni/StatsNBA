import React from 'react';
// import { NavbarC } from '../../components/Navbar/NavbarC'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
// import { auth } from "../../firebase";

export class Players extends React.Component {

    constructor() {
        super();
        this.state = {
        };
    }


    render() {
        console.log('players');
        return (
            <div className="players">
                {/* <NavbarC></NavbarC> */}
                <p>Players</p>
            </div>
        )
    }
}