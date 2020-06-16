import React from 'react'
import Button from 'react-bootstrap/Button'
import history from '../../history.js';
import './BackButton.scss';

function go_back() {
    history.goBack();
}

//Button return to previous page
function BackButton(props) {
    return (
        <div className="back_button">
            <Button variant="danger" onClick={go_back}>Go back</Button>
        </div>
    )
}

export default BackButton;