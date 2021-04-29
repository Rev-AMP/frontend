import React from "react";
import { connect } from "react-redux";
import {
    withStyles,
    Tooltip,
    IconButton,
    Dialog,
    DialogTitle,
    Typography,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Eye, Delete, Pencil } from "mdi-material-ui";

import { fetchDivisions, deleteDivision } from "redux/division/action";

import DataPage from "components/DataPage";
import Button from "components/Button";
import DivisionModal from "../components/DivisionModal";

const useStyles = (theme) => ({
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

class DivisionPage extends React.Component {
    columns = [
        {
            field: "id",
            headerName: "Division ID",
            headerAlign: "center",
            align: "center",
            width: 350,
            hide: true,
        },
        {
            field: "division_code",
            headerName: "Division Code",
            headerAlign: "center",
            align: "center",
            width: 150,
        },
        {
            field: "full_name",
            headerName: "Professor Name",
            headerAlign: "center",
            align: "center",
            width: 250,
            valueFormatter: ({ row }) => `${row.professor.user.full_name}`,
        },
        {
            field: "professor_id",
            headerName: "Professor ID",
            headerAlign: "center",
            align: "center",
            width: 250,
            hide: true,
        },
        {
            field: "course_name",
            headerName: "Course",
            headerAlign: "center",
            align: "center",
            width: 350,
            valueFormatter: ({ row }) => `${row.course.name}`,
        },
        {
            field: "course_id",
            headerName: "Course",
            headerAlign: "center",
            align: "center",
            width: 350,
            hide: true,
        },
        {
            field: "number_of_batches",
            headerName: "Number of Batches",
            headerAlign: "center",
            align: "center",
            width: 250,
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
                    <Tooltip title="View">
                        <Link to={`${this.props.match.url}/${params.row.id}`}>
                            <IconButton color={"primary"}>
                                <Eye />
                            </IconButton>
                        </Link>
                    </Tooltip>
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
            deleteConfirmAlert: false,
            modalIsOpen: false,
        };
    }

    componentDidMount() {
        this.props.fetchDivisions();
    }

    onDelete = (params) => this.setState({ deleteConfirmAlert: true, divisionId: params.row.id });

    onDeleteClose = () => this.setState({ deleteConfirmAlert: false, divisionId: null });

    closeModal = () => this.setState({ modalIsOpen: false, divisionId: null });

    openModal = () => this.setState({ modalIsOpen: true, divisionId: null });

    onEdit = (params) => this.setState({ modalIsOpen: true, divisionId: params.row.id });

    deleteDivision = () => {
        this.props.deleteDivision(this.state.divisionId);
        this.onDeleteClose();
    };

    render() {
        const { isLoading, divisions, classes } = this.props;
        const { deleteConfirmAlert, divisionId, modalIsOpen } = this.state;
        return (
            <>
                <DataPage
                    title="List of Divisions"
                    isLoading={isLoading}
                    objects={divisions}
                    columns={this.columns}
                    PopupModal={
                        <DivisionModal isOpen={modalIsOpen} onClose={this.closeModal} divisionId={divisionId} />
                    }
                    modalIsOpen={modalIsOpen}
                    openModal={this.openModal}
                />
                {deleteConfirmAlert && divisionId && (
                    <Dialog open={deleteConfirmAlert} onClose={this.onDeleteClose}>
                        <DialogTitle>
                            <Typography variant="h6" color="primary">
                                Delete Division?
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>Are you sure you want to proceed?</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            {/* Class Names are reversed so that confirming the deletion is red in colour */}
                            <Button onClick={this.onDeleteClose} className={classes.success}>
                                No
                            </Button>
                            <Button onClick={this.deleteDivision} className={classes.error}>
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
    divisions: state.division.divisions,
    isLoading: state.division.isLoading,
});

export default withStyles(useStyles)(connect(mapStateToProps, { fetchDivisions, deleteDivision })(DivisionPage));
