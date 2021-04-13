import React from "react";
import { connect } from "react-redux";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Tooltip,
    Typography,
    withStyles,
} from "@material-ui/core";
import { Delete, Pencil } from "mdi-material-ui";

import { deleteCourse, fetchCourses } from "redux/course/action";
import DataPage from "components/DataPage";
import Button from "components/Button";
import CourseModal from "./components/CourseModal";

const styles = (theme) => ({
    centerItem: theme.styles.centerItem,
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

class Courses extends React.Component {
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
            field: "course_code",
            headerName: "Code",
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "term",
            headerName: "Term",
            headerAlign: "center",
            align: "center",
            width: 350,
            valueFormatter: (params) => params.value.name,
        },
        {
            field: "year",
            headerName: "Year",
            headerAlign: "center",
            align: "center",
            width: 350,
            valueFormatter: (params) => params.row.term.year.name,
        },
        {
            field: "school",
            headerName: "School",
            headerAlign: "center",
            align: "center",
            width: 350,
            valueFormatter: (params) => params.row.term.year.school.name,
            hide: true,
        },
        {
            field: "actions",
            headerName: "Actions",
            headerAlign: "center",
            flex: 1,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <div className={this.props.classes.centerItem}>
                    <Tooltip title="Edit">
                        <IconButton color={"primary"} onClick={() => this.onEdit(params)}>
                            <Pencil />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton onClick={() => this.onDelete(params)}>
                            <Delete color={"error"} />
                        </IconButton>
                    </Tooltip>
                </div>
            ),
        },
    ];

    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            deleteConfirmAlert: false,
        };
    }

    componentDidMount() {
        this.props.fetchCourses();
    }

    closeModal = () => this.setState({ modalIsOpen: false, courseId: null });

    openModal = () => this.setState({ modalIsOpen: true, courseId: null });

    onEdit = (params) => this.setState({ modalIsOpen: true, courseId: params.row.id });

    onDelete = (params) => this.setState({ deleteConfirmAlert: true, courseId: params.row.id });

    onDeleteClose = () => this.setState({ deleteConfirmAlert: false, courseId: null });

    deleteYear = () => {
        this.props.deleteCourse(this.state.courseId);
        this.onDeleteClose();
    };

    render() {
        const { isLoading, courses, classes } = this.props;
        const { deleteConfirmAlert, modalIsOpen, courseId } = this.state;

        return (
            <>
                <DataPage
                    title="List of Courses"
                    isLoading={isLoading}
                    modalIsOpen={modalIsOpen}
                    openModal={this.openModal}
                    PopupModal={<CourseModal isOpen={modalIsOpen} onClose={this.closeModal} courseId={courseId} />}
                    objects={courses}
                    columns={this.columns}
                />
                {deleteConfirmAlert && courseId && (
                    <Dialog open={deleteConfirmAlert} onClose={this.onDeleteClose}>
                        <DialogTitle>
                            <Typography variant="h6" color="primary">
                                Delete Course?
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Deleting this <strong>Course</strong> may lead to unwanted consequences. Are you sure
                                you want to proceed?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.onDeleteClose} className={classes.error}>
                                No
                            </Button>
                            <Button onClick={this.deleteYear} className={classes.success}>
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    courses: state.course.courses,
    isLoading: state.course.isLoading,
});

export default withStyles(styles)(connect(mapStateToProps, { fetchCourses, deleteCourse })(Courses));
