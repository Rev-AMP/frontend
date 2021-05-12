import React from "react";
import clsx from "clsx";
import { Check, Close, Delete, FileUpload } from "mdi-material-ui";
import { IconButton, Tooltip, withStyles } from "@material-ui/core";

import DataPage from "components/DataPage";

let ASSIGNMENTS = [
    {
        id: 0,
        name: "Lab Assignment 4",
        professor: "Prof. Harley Quinn",
        subject: "AI/ML",
        submitted: false,
    },
    {
        id: 1,
        name: "Theory Assignment 1",
        professor: "Prof. John Doe",
        subject: "OOP",
        submitted: true,
        grade: "O",
    },
    {
        id: 2,
        name: "Theory Assignment 2",
        professor: "Prof. Harry Potter",
        subject: "PPL",
        submitted: true,
        grade: "B",
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

class StudentAssignments extends React.Component {
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
            hide: true,
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
            width: 350,
        },
        {
            field: "submitted",
            headerName: "Status",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: (params) =>
                params.value ? (
                    <Check className={clsx(this.props.classes.centerItem, this.props.classes.green)} />
                ) : (
                    <Close color="error" className={this.props.classes.centerItem} />
                ),
        },
        {
            field: "grade",
            headerName: "Grade",
            headerAlign: "center",
            align: "center",
            flex: 1,
            valueFormatter: (params) => (params.value ? params.value : "-"),
        },
        {
            field: "actions",
            headerName: "Actions",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: (params) =>
                params.row.submitted ? (
                    <Tooltip title="Delete">
                        <IconButton
                            className={this.props.classes.centerItem}
                            onClick={() => this.onDelete(params.row.id)}
                        >
                            <Delete color={"error"} />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Upload">
                        <div className={this.props.classes.centerItem}>
                            <input
                                type="file"
                                name="file"
                                style={{ display: "none" }}
                                ref={(fileInput) => (this.fileInput = fileInput)}
                                onChange={() => this.fileUpload(params.row.id)}
                            />
                            <IconButton onClick={() => this.fileInput.click()}>
                                <FileUpload color={"primary"} />
                            </IconButton>
                        </div>
                    </Tooltip>
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

export default withStyles(styles)(StudentAssignments);
