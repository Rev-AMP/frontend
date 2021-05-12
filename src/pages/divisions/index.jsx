import React from "react";
import TermPage from "./routes/divisions";
import TermDetails from "./routes/divisiondetails";
import { withRouter, Switch, Route } from "react-router-dom";

function Divisions(props) {
    return (
        <Switch>
            <Route path={`${props.match.url}/:divisionid`} component={TermDetails} />
            <Route exact path={props.match.url} component={TermPage} />
        </Switch>
    );
}

export default withRouter(Divisions);
