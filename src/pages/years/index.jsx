import React from "react";
import { connect } from "react-redux";
import {
    IconButton,
    Typography,
    withStyles,
    Dialog,
    DialogContentText,
    DialogTitle,
    DialogContent,
    DialogActions,
    Tooltip,
} from "@material-ui/core";
import { Pencil, Delete } from "mdi-material-ui";

import { fetchYears, deleteYear } from "redux/year/action";
import DataPage from "components/DataPage";
import Button from "components/Button";
import YearModal from "./components/YearModal";

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

class Years extends React.Component {
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
            field: "school",
            headerName: "School",
            headerAlign: "center",
            align: "center",
            width: 350,
            valueFormatter: (params) => (params.value ? params.value.name : "No associated school"),
        },
        {
            field: "start_year",
            type: "number",
            headerName: "Start Year",
            headerAlign: "center",
            align: "center",
            valueFormatter: (params) => `${params.value}`,
            flex: 1,
        },
        {
            field: "end_year",
            type: "number",
            headerName: "End Year",
            headerAlign: "center",
            align: "center",
            valueFormatter: (params) => `${params.value}`,
            flex: 1,
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
        this.props.fetchYears();
    }

    closeModal = () => this.setState({ modalIsOpen: false, yearId: null });

    openModal = () => this.setState({ modalIsOpen: true, yearId: null });

    onEdit = (params) => this.setState({ modalIsOpen: true, yearId: params.row.id });

    onDelete = (params) => this.setState({ deleteConfirmAlert: true, yearId: params.row.id });

    onDeleteClose = () => this.setState({ deleteConfirmAlert: false, yearId: null });

    deleteYear = () => {
        this.props.deleteYear(this.state.yearId);
        this.onDeleteClose();
    };

    render() {
        const { isLoading, years, classes } = this.props;
        const { deleteConfirmAlert, modalIsOpen, yearId } = this.state;

        return (
            <>
                <DataPage
                    title="List of Years"
                    isLoading={isLoading}
                    modalIsOpen={modalIsOpen}
                    openModal={this.openModal}
                    PopupModal={<YearModal isOpen={modalIsOpen} onClose={this.closeModal} yearId={yearId} />}
                    objects={years}
                    columns={this.columns}
                />
                {deleteConfirmAlert && yearId && (
                    <Dialog open={deleteConfirmAlert} onClose={this.onDeleteClose}>
                        <DialogTitle>
                            <Typography variant="h6" color="primary">
                                Delete Year?
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Deleting this <strong>Year</strong> may lead to unwanted consequences like deletion of
                                terms and courses belong to this <strong>Year</strong>. Are you sure you want to
                                proceed?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.onDeleteClose} className={classes.error}>
                                No
                            </Button>
                            <Button onClick={this.deleteYear} className={classes.success}>
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
    years: state.year.years,
    isLoading: state.year.isLoading,
});

export default withStyles(styles)(connect(mapStateToProps, { fetchYears, deleteYear })(Years));
