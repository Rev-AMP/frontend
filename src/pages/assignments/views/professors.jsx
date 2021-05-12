import React from "react";
import { Delete, Eye } from "mdi-material-ui";
import { IconButton, Tooltip, withStyles } from "@material-ui/core";

import DataPage from "components/DataPage";
import { Link } from "react-router-dom";

let ASSIGNMENTS = [
    {
        id: 0,
        name: "Lab Assignment 4",
        professor: "Prof. Harley Quinn",
        subject: "AI/ML",
        division: "1",
    },
    {
        id: 1,
        name: "Theory Assignment 1",
        professor: "Prof. John Doe",
        subject: "OOP",
        division: "3",
    },
    {
        id: 2,
        name: "Theory Assignment 2",
        professor: "Prof. Harry Potter",
        subject: "PPL",
        division: "2",
    },
];

const styles = (theme) => ({
    centerItem: theme.styles.centerItem,
    green: {
        color: theme.palette.success.main,
    },
    error: {
        color: theme.palette.error.main,
        "&:hover": {
            backgroundColor: theme.palette.error.main,
            color: "#000000",
        },
    },
    success: {
        color: theme.palette.success.main,
        "&:hover": {
            backgroundColor: theme.palette.success.main,
            color: "#000000",
        },
    },
});

class ProfessorAssignments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            assignments: ASSIGNMENTS,
            isLoading: false,
        };
    }

    columns = [
        {
            field: "id",
            headerName: "ID",
            headerAlign: "center",
            align: "center",
            width: 70,
        },
        {
            field: "name",
            headerName: "Name",
            headerAlign: "center",
            align: "center",
            width: 350,
        },
        {
            field: "professor",
            headerName: "Professor",
            headerAlign: "center",
            align: "center",
            width: 350,
        },
        {
            field: "subject",
            headerName: "Course",
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "division",
            headerName: "Division",
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "actions",
            headerName: "Actions",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: (params) => (
                <div className={this.props.classes.centerItem}>
                    <Tooltip title="View">
                        <Link to={`assignments/${params.row.id}`}>
                            <IconButton color={"primary"}>
                                <Eye />
                            </IconButton>
                        </Link>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton onClick={() => this.onDelete(params.row.id)}>
                            <Delete color={"error"} />
                        </IconButton>
                    </Tooltip>
                </div>
            ),
        },
    ];

    fileUpload = (id) => {
        const { assignments } = this.state;
        assignments[id].submitted = true;

        this.setState(assignments);
    };

    onDelete = (id) => {
        const { assignments } = this.state;
        assignments[id].submitted = false;

        this.setState(assignments);
    };

    render() {
        const { assignments, isLoading } = this.state;
        return (
            <>
                <DataPage title="Assignments" isLoading={isLoading} objects={assignments} columns={this.columns} />
            </>
        );
    }
}

export default withStyles(styles)(ProfessorAssignments);
