import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

import { auth } from "../../firebase";

import './Navbar.scss';

//Funtion to logout.
function handleLogOutClick(event) {
    auth.signOut().then(function () {
        console.log('logout');
        sessionStorage.removeItem('teams');
    }).catch(function (error) {
        console.log(error);
    });

}

//Component navbar. Present in all pages.
function NavbarC(props) {
    return (
        <Navbar bg="dark" variant="dark" expand="md" >
            <Navbar.Brand href="/home">Stats NBA</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/home/games">Games</Nav.Link>
                    <Nav.Link href="/home/players">Players</Nav.Link>
                    <Nav.Link href="/home/teams">Teams</Nav.Link>
                </Nav>
                <Nav className="logOut">
                    <Button variant="outline-danger" onClick={handleLogOutClick}>Log Out</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarC;