import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "../components/Home";


const AppliedRoute = ({ component: C, props: cProps, ...rest }) =>
	<Route {...rest} render={props => <C {...props} {...cProps} />} />;

const HomeRoute = ({ childProps }) =>
    (<Router>
        <Switch>
            <AppliedRoute path="/" component={Home} props={childProps} />
        </Switch>
    </Router>);

export default HomeRoute;
