import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { auth } from "../../firebase";
import './Navbar.scss';

export class NavbarC extends React.Component {

    constructor() {
        super();
        this.handleLogOutClick = this.handleLogOutClick.bind(this);
        this.state = {
            isSigningIn: true
        };
    }

    handleLogOutClick(event) {
        auth.signOut().then(function() {
            console.log('logout');
          }).catch(function(error) {
            // An error happened.
          });
          
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="md">
                <Navbar.Brand href="#home">Stats NBA</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                    </Nav>
                    <Form inline id="FormNavbar">
                        <Form.Control type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    <Nav className="logOut">
                        <Button variant="outline-danger" onClick={this.handleLogOutClick}>Log Out</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}