import React from 'react'
// import './Title.scss';
import loading from '../../assets/img/loading.gif';

function Loading(props) {

    return (
        <div className="loading">
            <img className="loading_img" src={loading} alt={loading} ></img>
        </div>
    )

}

export default Loading;