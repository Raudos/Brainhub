import React from 'react';
import { HashRouter as Router, Route, Redirect } from "react-router-dom";

// Components
import Menu from "src/components/Menu/index";
import EventCreator from "src/components/EventCreator/index";
import EventsList from "src/components/EventsList/index";
import EventDetails from "src/components/EventDetails/index";

export const Routes = props => (
  <React.Fragment>
    <Route path={"/"} component={Menu} />

    <div className="routes-container">
      <Route exact path="/" render={() => <Redirect to="/events"/>}/>

      <Route path={'/events'} component={EventsList} />

      <Route path={'/eventCreator'} exact component={EventCreator} />

      <Route path={`/events/:id`} exact component={EventDetails} />
    </div>
  </React.Fragment>
);

export default props => (
  <Router>
    <div className="router-container">
      <Routes />
    </div>
  </Router>
);
