import React from "react";
import { connect } from 'react-redux';
import StudentAssignments from "./views/students";
import ProfessorAssignmentsDetails from "./views/assignments";

function Assignments({ currentUser }) {
    switch (currentUser.type) {
        case "student": return <StudentAssignments />;
        case "professor": return <ProfessorAssignmentsDetails /> ;
        default: return <p>Unknown</p>;
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Assignments);