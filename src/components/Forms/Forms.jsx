import React, { Component } from 'react'
import './Forms.scss';
// import PropTypes from 'prop-types'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { auth } from "../../firebase";
import { Redirect } from 'react-router-dom';

export class Forms extends Component {

    constructor() {
        super();
        this.handleSignInClick = this.handleSignInClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            diff_pass: false,
            email: '',
            isSigningIn: true,
            redirect: false
        };
    }

    //Check if is signing in or up.
    handleSignInClick(event) {
        this.setState({ isSigningIn: !this.state.isSigningIn });
    }

    //Funtion to sign in with firebase
    signIn(email, password) {

        let currentComponent = this;
        auth.setPersistence("session")
            .then(function () {
                // Existing and future Auth states are now persisted in the current session only.
                // Closing the window would clear any existing state even if a user forgets to sign out.
                // New sign-in will be persisted with session persistence.
                return auth.signInWithEmailAndPassword(email, password).then(
                    function () {
                        currentComponent.setState({ diff_pass: false, redirect: true });
                    })
                    .catch(function (error) {

                        var errorMessage = error.message;
                        alert('Error: ' + errorMessage);
                    });
            })
            .catch(function (error) {
                var errorMessage = error.message;
                alert('Error: ' + errorMessage);
            });
    }

    //Sin up with firebase. After sign up, sign in automatically.
    signUp(email, password) {

        let currentComponent = this;
        auth.setPersistence("session")
            .then(function () {
                // Existing and future Auth states are now persisted in the current session only.
                // Closing the window would clear any existing state even if a user forgets to sign out.
                // New sign-in will be persisted with session persistence.
                return auth.createUserWithEmailAndPassword(email, password).then(
                    function () {
                        currentComponent.setState({ diff_pass: false, redirect: true });
                    })
                    .catch(function (error) {

                        var errorMessage = error.message;
                        alert('Error: ' + errorMessage);
                    });
            })
            .catch(function (error) {
                var errorMessage = error.message;
                alert('Error: ' + errorMessage);
            });
    }

    //Check the field of form. After, sign in or sign up.
    handleSubmit(event) {
        event.preventDefault();

        let email = event.target.email.value;
        let password = event.target.password.value;

        if (email.length < 4) {//Mininum 4 characters
            alert('Please enter a longer email address.');
            return;
        }
        if (password.length < 6) {//Mininum 4 characters in password
            alert('Please enter a longer password. Minimun 6 characters');
            return;
        }

        if (this.state.isSigningIn) 
            this.signIn(email, password);
        else 
            if (event.target.r_password.value !== password) //Check if both password fields have same characters
                this.setState({ diff_pass: true });
            else
                this.signUp(email, password);
    }

    render() {

        let { redirect } = this.state;
        if (redirect) return <Redirect to='/home' />;

        return (
            <Form onSubmit={this.handleSubmit} id="FormSign">

                {this.state.isSigningIn ?
                    <SignIn email={this.state.email}></SignIn> :
                    <SignUp email={this.state.email} diff_pass={this.state.diff_pass}></SignUp>}

                <Form.Group controlId="formBasicCheckbox" id="submit">
                    <Form.Check label="Check me out" type="checkbox" />
                    <Button variant="danger" type="submit">Submit</Button>
                </Form.Group>

                <hr></hr>

                <Form.Group controlId="formBasicCheckbox">
                    <Form.Label className="footer">
                        No account?
                        <Button id="sign" onClick={this.handleSignInClick} variant="link">
                            Sign Up
                        </Button>
                        here
                    </Form.Label>
                </Form.Group>
            </Form>
        );
    }
}