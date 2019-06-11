import React, { Component, Fragment } from "react";
import App from "./App";
import { Route, Switch, Redirect } from "react-router-dom";
import IndividualList from "./components/IndividualList";

export default class Routes extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/list/:list_id" exact component={IndividualList} />
          <Redirect to="/" />
        </Switch>
      </Fragment>
    );
  }
}
