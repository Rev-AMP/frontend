import React from "react";
import clsx from "clsx";
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
import { Close, Check, Pencil, Delete } from "mdi-material-ui";

import { fetchTerms, deleteTerm } from "redux/term/action";
import DataPage from "components/DataPage";
import Button from "components/Button";
import TermModal from "./components/TermModal";

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

class TermPage extends React.Component {
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
            field: "year",
            headerName: "Year",
            headerAlign: "center",
            align: "center",
            width: 350,
            valueFormatter: (params) => params.value.name,
            hide: true,
        },
        {
            field: "school",
            headerName: "School",
            headerAlign: "center",
            align: "center",
            width: 350,
            valueFormatter: (params) => params.row.year.school.name,
            hide: true,
        },
        {
            field: "start_date",
            type: "date",
            headerName: "Start Date",
            headerAlign: "center",
            align: "center",
            flex: 1.5,
        },
        {
            field: "end_date",
            type: "date",
            headerName: "End Date",
            headerAlign: "center",
            align: "center",
            flex: 1.5,
        },
        {
            field: "has_electives",
            headerName: "Electives",
            headerAlign: "center",
            flex: 1,
            renderCell: (params) =>
                params.value ? (
                    <Check className={clsx(this.props.classes.centerItem, this.props.classes.green)} />
                ) : (
                    <Close color="error" className={this.props.classes.centerItem} />
                ),
        },
        {
            field: "is_active",
            headerName: "Active",
            headerAlign: "center",
            flex: 1,
            renderCell: (params) =>
                params.value ? (
                    <Check className={clsx(this.props.classes.centerItem, this.props.classes.green)} />
                ) : (
                    <Close color="error" className={this.props.classes.centerItem} />
                ),
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
        this.props.fetchTerms();
    }

    closeModal = () => this.setState({ modalIsOpen: false, termId: null });

    openModal = () => this.setState({ modalIsOpen: true, termId: null });

    onEdit = (params) => this.setState({ modalIsOpen: true, termId: params.row.id });

    onDelete = (params) => this.setState({ deleteConfirmAlert: true, termId: params.row.id });

    onDeleteClose = () => this.setState({ deleteConfirmAlert: false, termId: null });

    deleteYear = () => {
        this.props.deleteTerm(this.state.termId);
        this.onDeleteClose();
    };

    render() {
        const { isLoading, terms, classes } = this.props;
        const { deleteConfirmAlert, modalIsOpen, termId } = this.state;

        return (
            <>
                <DataPage
                    title="List of Terms"
                    isLoading={isLoading}
                    modalIsOpen={modalIsOpen}
                    openModal={this.openModal}
                    PopupModal={<TermModal isOpen={modalIsOpen} onClose={this.closeModal} termId={termId} />}
                    objects={terms}
                    columns={this.columns}
                />
                {deleteConfirmAlert && termId && (
                    <Dialog open={deleteConfirmAlert} onClose={this.onDeleteClose}>
                        <DialogTitle>
                            <Typography variant="h6" color="primary">
                                Delete Term?
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Deleting this <strong>Term</strong> may lead to unwanted consequences like deletion of
                                courses that belong to this <strong>Year</strong>. Are you sure you want to proceed?
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
    terms: state.term.terms,
    isLoading: state.term.isLoading,
});

export default withStyles(styles)(connect(mapStateToProps, { fetchTerms, deleteTerm })(TermPage));
