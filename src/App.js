import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.scss';
import { Home } from './pages/Home'
import { Players } from './pages/Players/Players'
import { Forms } from './components/Forms/Forms'
import { Title } from './components/Title/Title'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Log} />
        {/* <Route path='/detail/:movieId' component={NavbarC} /> */}
        <Route exact path='/home' component={Home} />
        <Route exact path='/home/games' component={ Players } />
        <Route exact path='/home/players' component={ Players } />
        <Route exact path='/home/teams' component={ Players } />
        {/* <Route component={NotFound} /> */}
      </Switch>
    </Router>
  );

}

function Log() {
  return (
    <div className="App">
      <Title></Title>
      <Forms></Forms>
    </div>
  );
}


export default App;
