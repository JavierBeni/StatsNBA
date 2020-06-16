import React from 'react';
import { Router, Route } from "react-router-dom";
import './App.scss';
import { Home } from './pages/Home'
import { Games } from './pages/elements/Games'
import { Players } from './pages/elements/Players'
import { Player } from './pages/element/Player'
import { Teams } from './pages/elements/Teams'
import { Team } from './pages/element/Team'
import { Forms } from './components/Forms/Forms'
import Title from './components/Title/Title'
import history from './history';


function App() {
  // return (
  //   <Router>
  //     <Switch>
  //       <Route exact path='/' component={Log} />
  //       {/* <Route path='/detail/:movieId' component={NavbarC} /> */}
  //       <Route exact path='/home' component={Home} />
  //       <Route exact path='/home/games' component={ Players } />
  //       <Route exact path='/home/players' component={ Players } />
  //       <Route exact path='/home/teams' component={ Players } />
  //       {/* <Route component={NotFound} /> */}
  //     </Switch>
  //   </Router>
  // );

  return (
    < Router history={history} >
      <Route exact path='/' component={Log} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/home/games' component={Games} />
      <Route exact path='/home/players' component={Players} />
      <Route path='/home/players/detail/:id' component={Player} />
      <Route exact path='/home/teams' component={Teams} />
      <Route path='/home/teams/detail/:id' component={Team} />
    </Router >


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
