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
import { Delete } from "mdi-material-ui";

import {
    fetchDivision,
    fetchStudentsForSelectedDivision,
    deleteStudentFromSelectedDivision,
    addStudentsToSelectedDivision,
} from "redux/division/action";

import DataPage from "components/DataPage";
import Button from "components/Button";
import AddStudentsModal from "components/AddStudentsModal";
import AddStudentsResponseModal from "components/AddStudentsResponseModal";

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
    greenText: {
        color: theme.palette.success.main,
    },
});

class DivisionPage extends React.Component {
    columns = [
        {
            field: "id",
            headerName: "ID",
            headerAlign: "center",
            align: "center",
            width: 350,
            hide: true,
        },
        {
            field: "full_name",
            headerName: "Name",
            headerAlign: "center",
            align: "center",
            width: 350,
            valueFormatter: ({ row }) => `${row.user.full_name}`,
        },
        {
            field: "email",
            headerName: "Email ID",
            headerAlign: "center",
            align: "center",
            width: 350,
            valueFormatter: ({ row }) => `${row.user.email}`,
        },
        {
            field: "school",
            headerName: "School",
            headerAlign: "center",
            align: "center",
            width: 350,
            valueFormatter: ({ row }) => `${row.term.year.school.name}`,
        },
        {
            field: "year",
            headerName: "Year",
            headerAlign: "center",
            align: "center",
            width: 350,
            valueFormatter: ({ row }) => `${row.term.year.name}`,
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
            divisionId: this.props.match.params.divisionid,
            deleteConfirmAlert: false,
            modalIsOpen: false,
            responseModal: false,
        };
    }

    componentDidMount() {
        this.props.fetchDivision(this.state.divisionId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.selectedDivision !== this.props.selectedDivision && this.props.selectedDivision) {
            this.props.fetchStudentsForDivision();
        }

        if (prevProps.addStudentsResponse !== this.props.addStudentsResponse && this.props.addStudentsResponse) {
            this.setState({ responseModal: true });
        }
    }

    onDelete = ({ row }) =>
        this.setState({ deleteConfirmAlert: true, studentId: row.id, studentName: row.user.full_name });

    onDeleteClose = () => this.setState({ deleteConfirmAlert: false, studentId: null, studentName: null });

    deleteStudent = () => {
        this.props.deleteStudentFromDivision(this.state.studentId);
        this.onDeleteClose();
    };

    openModal = () => this.setState({ modalIsOpen: true });

    closeModal = () => this.setState({ modalIsOpen: false });

    closeResponseModal = () => this.setState({ responseModal: false });

    render() {
        const { isLoading, studentsForDivision, selectedDivision, classes, addStudentsResponse } = this.props;
        const { deleteConfirmAlert, studentId, studentName, modalIsOpen, responseModal } = this.state;

        //! Not the best logic, but works for now
        const divisionCode = selectedDivision ? selectedDivision.division_code : "";

        return (
            <>
                <DataPage
                    title={`Division Code: ${divisionCode}`}
                    isLoading={isLoading}
                    objects={studentsForDivision}
                    columns={this.columns}
                    modalIsOpen={modalIsOpen}
                    openModal={this.openModal}
                    PopupModal={
                        <AddStudentsModal
                            isOpen={modalIsOpen}
                            onClose={this.closeModal}
                            addStudentsAction={this.props.addStudentsToDivision}
                            isLoading={isLoading}
                            selectedElement={selectedDivision}
                        />
                    }
                />

                {deleteConfirmAlert && studentId && (
                    <Dialog open={deleteConfirmAlert} onClose={this.onDeleteClose}>
                        <DialogTitle>
                            <Typography variant="h6" color="primary">
                                Delete Student?
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Are you sure you want to delete <strong>{studentName}</strong> from{" "}
                                <strong>{`Division Code: ${divisionCode}`}</strong>?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            {/* Class Names are reversed so that confirming the deletion is red in colour */}
                            <Button onClick={this.onDeleteClose} className={classes.success}>
                                No
                            </Button>
                            <Button onClick={this.deleteStudent} className={classes.error}>
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}

                {addStudentsResponse && (
                    <AddStudentsResponseModal
                        isOpen={responseModal}
                        onClose={this.closeResponseModal}
                        addStudentsResponse={addStudentsResponse}
                    />
                )}
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    studentsForDivision: state.division.studentsForDivision,
    isLoading: state.division.isLoading,
    selectedDivision: state.division.selectedDivision,
    addStudentsResponse: state.division.addStudentsResponse,
});

export default withStyles(styles)(
    connect(mapStateToProps, {
        fetchDivision,
        fetchStudentsForDivision: fetchStudentsForSelectedDivision,
        deleteStudentFromDivision: deleteStudentFromSelectedDivision,
        addStudentsToDivision: addStudentsToSelectedDivision,
    })(DivisionPage)
);
