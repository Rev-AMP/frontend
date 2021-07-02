import React from "react";
import DivisionPage from "./routes/divisions";
import DivisionDetails from "./routes/divisiondetails";
import { Route, Switch, withRouter } from "react-router-dom";
import DivisionTimetable from "./routes/DivisionTimetable";

function Divisions(props) {
    return (
        <Switch>
            <Route path={`${props.match.url}/:divisionid/timetable`} component={DivisionTimetable} />
            <Route path={`${props.match.url}/:divisionid`} component={DivisionDetails} />
            <Route exact path={props.match.url} component={DivisionPage} />
        </Switch>
    );
}

export default withRouter(Divisions);
