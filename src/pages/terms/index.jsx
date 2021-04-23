import React from "react";
import TermPage from "./routes/terms";
import TermDetails from "./routes/termdetails";
import { withRouter, Switch, Route } from "react-router-dom";

function Terms(props) {
    return (
        <Switch>
            <Route path={`${props.match.url}/:termid`} component={TermDetails} />
            <Route exact path={props.match.url} component={TermPage} />
        </Switch>
    );
}

export default withRouter(Terms);
