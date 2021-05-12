import React from "react";
import { FileDownload } from "mdi-material-ui";
import { withStyles, Select, MenuItem } from "@material-ui/core";

import DataPage from "components/DataPage";

let ASSIGNMENTS = [
    {
        id: 0,
        student_name: "Alok Bhawankar",
        filename: "Alok_Assignment.pdf",
        assignment_link:
            "https://github.com/alr0cks/CollegeStuff/blob/master/AI/(PA%2006)Alok%20Bhawankar_AITheory1.pdf",
        grade: "A",
    },
    {
        id: 1,
        student_name: "Akhil Narang",
        filename: "Akhil_Assignment.pdf",
        assignment_link: "https://github.com/alr0cks/CollegeStuff/blob/master/BI/PD09_AlokBhawankar_BI_Lab1%262.pdf",
    },
    {
        id: 2,
        student_name: "Desaitama",
        filename: "Desaitama_Assignment.pdf",
        assignment_link:
            "https://github.com/alr0cks/CollegeStuff/blob/master/DFCL/PD09_AlokBhawankar_DFCL_ActiveLearning.pdf",
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

const grades = ["O", "A", "B", "C", "D", "E", "F"];

class ProfessorAssignmentsDetails extends React.Component {
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
            field: "student_name",
            headerName: "Name",
            headerAlign: "center",
            align: "center",
            flex: 2,
        },
        {
            field: "filename",
            headerName: "Filename",
            headerAlign: "center",
            align: "center",
            flex: 2,
        },
        {
            field: "actions",
            headerName: "Actions",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: (params) => (
                <a
                    href={params.row.assignment_link}
                    target="_blank"
                    rel="_noreferrer"
                    className={this.props.classes.centerItem}
                >
                    <FileDownload />
                </a>
            ),
        },
        {
            field: "grade",
            headerName: "Grade",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: (params) =>
                params.value ? (
                    <h3 className={this.props.classes.centerItem}>{params.value}</h3>
                ) : (
                    <Select className={this.props.classes.centerItem}>
                        {grades.map((item, index) => (
                            <MenuItem value={item} id={`grade-${index}`}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                ),
        },
    ];

    render() {
        const { assignments, isLoading } = this.state;
        return (
            <>
                <DataPage title="Assignments" isLoading={isLoading} objects={assignments} columns={this.columns} />
            </>
        );
    }
}

export default withStyles(styles)(ProfessorAssignmentsDetails);
