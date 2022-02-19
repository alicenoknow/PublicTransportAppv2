import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Admin from "../components/Admin";

const HomeRoute = () => (
  <Switch>
    <Route path="/">
      <Home />
    </Route>
    <Route path="/admin">
      <Admin />
    </Route>
  </Switch>
);

export default HomeRoute;
