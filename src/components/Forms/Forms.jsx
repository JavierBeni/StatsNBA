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

    // static propTypes = {
    //     match: PropTypes.shape({
    //         params: PropTypes.object,
    //         isExact: PropTypes.bool,
    //         path: PropTypes.string,
    //         url: PropTypes.string
    //     })
    // }

    constructor() {
        super();
        this.handleSignInClick = this.handleSignInClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            isSigningIn: true,
            email: '',
            diff_pass: false,
            redirect: false
        };
    }

    handleSignInClick(event) {
        console.log("/home");
        this.setState({ isSignIn: !this.state.isSignIn });
    }

    // handleChange(event) {
    //     console.log(event.target.email.value);
    // }

    signIn(email, password) {
        // console.log(keep_session)
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
                        // var errorCode = error.code;
                        var errorMessage = error.message;
                        alert('Error: ' + errorMessage);
                    });
            })
            .catch(function (error) {
                var errorMessage = error.message;
                alert('Error: ' + errorMessage);
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        // alert('A name was submitted: ' + this.state.isSignIn);
        let email = event.target.email.value;
        let password = event.target.password.value;

        if (email.length < 4) {
            alert('Please enter a longer email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a longer password.');
            return;
        }
        if (this.state.isSigningIn) {
            this.signIn(email, password);
            event.preventDefault();
        }
        else {
            if (event.target.r_password.value !== password) {
                this.setState({ diff_pass: true });
                event.preventDefault();
            } else {
                this.signIn(email, password);
                event.preventDefault();
            }
        }

    }

    render() {
        // const { Title, Poster, Actors, Metascore, Plot } = this.state.movie
        const isSigningIn = this.state.isSigningIn;
        const { redirect } = this.state;
        if (redirect) return <Redirect to='/home' />;

        return (
            <Form onSubmit={this.handleSubmit} id="FormSign">
                {isSigningIn ? <SignIn email={this.state.email}></SignIn> : <SignUp email={this.state.email} diff_pass={this.state.diff_pass}></SignUp>}
                <Form.Group id="submit" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
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