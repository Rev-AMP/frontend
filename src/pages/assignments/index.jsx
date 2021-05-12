import React from "react";
import { connect } from "react-redux";

import StudentAssignments from "./views/students";
import ProfessorAssignments from "./views/professors";
import { Typography } from "@material-ui/core";
import ProfessorAssignmentsDetails from "./views/assignments";

function Assignments({ currentUser }) {
    switch (currentUser.type) {
        case "student":
            return <StudentAssignments />;
        case "professor":
            return <ProfessorAssignments />;
        default:
            return (
                <Typography color="error" variant="h1">
                    Error
                </Typography>
            );
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Assignments);
