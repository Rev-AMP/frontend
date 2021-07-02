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
import { Delete, Pencil } from "mdi-material-ui";

import { fetchTimeSlots, deleteTimeSlot } from "redux/timeslots/action";
import TimeSlotModal from "./components/TimeSlotModal";
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

class TimeSlots extends React.Component {
    columns = [
        {
            field: "id",
            headerName: "ID",
            headerAlign: "center",
            align: "center",
            width: 350,
            type: "number",
            hide: true,
        },
        {
            field: "school",
            headerName: "School",
            headerAlign: "center",
            align: "center",
            valueGetter: (params) => params.row.school.name,
            flex: 2,
        },
        {
            field: "start_time",
            headerName: "Start Time",
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "end_time",
            headerName: "End Time",
            headerAlign: "center",
            align: "center",
            flex: 1,
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
        this.props.fetchTimeSlots();
    }

    closeModal = () => this.setState({ modalIsOpen: false, timeslotId: null });

    openModal = () => this.setState({ modalIsOpen: true, timeslotId: null });

    onEdit = (params) => this.setState({ modalIsOpen: true, timeslotId: params.row.id });

    onDelete = (params) => this.setState({ deleteConfirmAlert: true, timeslotId: params.row.id });

    onDeleteClose = () => this.setState({ deleteConfirmAlert: false, timeslotId: null });

    deleteTimeSlot = () => {
        this.props.deleteTimeSlot(this.state.timeslotId);
        this.onDeleteClose();
    };

    render() {
        const { isLoading, timeslots, classes } = this.props;
        const { modalIsOpen, timeslotId, deleteConfirmAlert } = this.state;

        return (
            <>
                <DataPage
                    title="List of Time Slots"
                    isLoading={isLoading}
                    modalIsOpen={modalIsOpen}
                    openModal={this.openModal}
                    PopupModal={
                        <TimeSlotModal isOpen={modalIsOpen} onClose={this.closeModal} timeslotId={timeslotId} />
                    }
                    objects={timeslots}
                    columns={this.columns}
                />
                {deleteConfirmAlert && timeslotId && (
                    <Dialog open={deleteConfirmAlert} onClose={this.onDeleteClose}>
                        <DialogTitle>
                            <Typography variant="h6" color="primary">
                                Delete Time Slot?
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Deleting this <strong>Time Slot</strong> may lead to unwanted consequences like deletion
                                of <strong>Lectures</strong> belonging to this <strong>Time Slot</strong>. Are you sure
                                you want to proceed?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.onDeleteClose} className={classes.error}>
                                No
                            </Button>
                            <Button onClick={this.deleteTimeSlot} className={classes.success}>
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
    timeslots: state.timeslot.timeslots,
    isLoading: state.timeslot.isLoading,
});

export default withRouter(withStyles(styles)(connect(mapStateToProps, { fetchTimeSlots, deleteTimeSlot })(TimeSlots)));
