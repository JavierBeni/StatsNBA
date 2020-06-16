import React from 'react'
import Form from 'react-bootstrap/Form'

//Part of form in case of sign up.
function SignUp(props) {
    return (
        <Form.Group>
            <Form.Group className="sign_in">
                <Form.Label>SIGN UP</Form.Label>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" defaultValue={props.email || ''} placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Repeat password</Form.Label>
                <Form.Control type="password" name="r_password" placeholder="Password" />
            </Form.Group>
            {props.diff_pass === true && <Form.Text id="diff_pass">Differents passwords</Form.Text>}
        </Form.Group>
    );
}

export default SignUp;