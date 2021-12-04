import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "../components/Home";


const AppliedRoute = ({ component: C, props: cProps, ...rest }) =>
	<Route {...rest} render={props => <C {...props} {...cProps} />} />;

const HomeRoute = ({ childProps }) =>
    (<Router>
        <AppliedRoute path="/" component={Home} props={childProps} />
    </Router>);

export default HomeRoute;
