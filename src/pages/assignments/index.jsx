import React from "react";
import { connect } from 'react-redux';
import StudentAssignments from "./views/students";

function Assignments({ currentUser }) {
    return (currentUser.type === "student" ? <StudentAssignments /> : <p>Error</p>);
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Assignments);