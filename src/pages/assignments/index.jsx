import React from "react";
import { connect } from "react-redux";

import StudentAssignments from "./views/students";
import ProfessorAssignments from "./views/professors";
import { Typography } from "@material-ui/core";
import ProfessorAssignmentsDetails from "./views/assignments";
import { Route, Switch } from "react-router-dom";

function Assignments({ currentUser }) {
    let component = null;
    switch (currentUser.type) {
        case "student":
            component = StudentAssignments;
            break;
        case "professor":
            component = ProfessorAssignments;
            break;
        default:
            return (
                <Typography color="error" variant="h1">
                    Error
                </Typography>
            );
    }

    console.log(component);

    return (
        <Switch>
            <Route path={`/assignments/:assignmentid`} component={ProfessorAssignmentsDetails} />
            <Route exact path="/assignments" component={component} />
        </Switch>
    );
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Assignments);
