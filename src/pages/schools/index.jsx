import React from "react";
import { withRouter } from "react-router-dom";
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
import { Delete, Edit } from "@material-ui/icons";

import { fetchSchools, deleteSchool } from "redux/school/action";
import SchoolModal from "./components/SchoolModal";
import DataPage from "components/DataPage";
import Button from "components/Button";

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

class Schools extends React.Component {
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
            headerName: "Full name",
            headerAlign: "center",
            align: "center",
            flex: 2,
        },
        {
            field: "head",
            headerName: "Head",
            headerAlign: "center",
            align: "center",
            flex: 2,
        },
        {
            field: "actions",
            headerName: "Actions",
            headerAlign: "center",
            flex: 1,
            sortable: false,
            renderCell: (params) => (
                <div className={this.props.classes.centerItem}>
                    <Tooltip title="Edit">
                        <IconButton color={"primary"} onClick={() => this.onEdit(params)}>
                            <Edit />
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
        this.props.fetchSchools();
    }

    closeModal = () => this.setState({ modalIsOpen: false, schoolId: null });

    openModal = () => this.setState({ modalIsOpen: true, schoolId: null });

    onEdit = (params) => this.setState({ modalIsOpen: true, schoolId: params.row.id });

    onDelete = (params) => this.setState({ deleteConfirmAlert: true, schoolId: params.row.id });

    onDeleteClose = () => this.setState({ deleteConfirmAlert: false, schoolId: null });

    deleteSchool = () => {
        this.props.deleteSchool(this.state.schoolId);
        this.onDeleteClose();
    };

    render() {
        const { isLoading, schools, classes } = this.props;
        const { modalIsOpen, schoolId, deleteConfirmAlert } = this.state;

        return (
            <>
                <DataPage
                    title="List of Schools"
                    isLoading={isLoading}
                    modalIsOpen={modalIsOpen}
                    openModal={this.openModal}
                    PopupModal={<SchoolModal isOpen={modalIsOpen} onClose={this.closeModal} schoolId={schoolId} />}
                    objects={schools}
                    columns={this.columns}
                />
                {deleteConfirmAlert && schoolId && (
                    <Dialog open={deleteConfirmAlert} onClose={this.onDeleteClose}>
                        <DialogTitle>
                            <Typography variant="h6" color="primary">
                                Delete Year?
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Deleting this <strong>School</strong> may lead to unwanted consequences like deletion of
                                <strong> Users</strong>, <strong>Years</strong>, <strong>Terms</strong> and{" "}
                                <strong>Courses</strong> belong to this <strong>School</strong>. Are you sure you want
                                to proceed?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.onDeleteClose} className={classes.error}>
                                No
                            </Button>
                            <Button onClick={this.deleteSchool} className={classes.success}>
                                yes
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    schools: state.school.schools,
    isLoading: state.school.isLoading,
});

export default withRouter(withStyles(styles)(connect(mapStateToProps, { fetchSchools, deleteSchool })(Schools)));
