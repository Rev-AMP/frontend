import React from "react";
import { connect } from "react-redux";
import { IconButton, Tooltip, withStyles } from "@material-ui/core";
import { Clear, Done, Edit } from "@material-ui/icons";

import { fetchAdmins } from "redux/admin/action";
import DataPage from "components/DataPage";
import clsx from "clsx";
import AdminModal from "./components/AdminModal";

const styles = (theme) => ({
    centerItem: theme.styles.centerItem,
    green: {
        color: theme.palette.success.main,
    },
});

class Admins extends React.Component {
    columns = [
        {
            field: "user_id",
            headerName: "ID",
            headerAlign: "center",
            align: "center",
            width: 70,
            type: "number",
        },
        {
            field: "full_name",
            headerName: "Full name",
            headerAlign: "center",
            valueFormatter: (params) => params.row.user.full_name,
            align: "center",
            width: 350,
            hide: true,
        },
        {
            field: "email",
            headerName: "Email",
            headerAlign: "center",
            valueFormatter: (params) => params.row.user.email,
            align: "center",
            width: 350,
        },
        {
            field: "user",
            headerName: "User",
            headerAlign: "center",
            flex: 1,
            renderCell: (params) =>
                params.row.permissions.isAllowed("user") ? (
                    <Done className={clsx(this.props.classes.centerItem, this.props.classes.green)} />
                ) : (
                    <Clear color="error" className={this.props.classes.centerItem} />
                ),
        },
        {
            field: "admin",
            headerName: "Admin",
            headerAlign: "center",
            flex: 1,
            renderCell: (params) =>
                params.row.permissions.isAllowed("admin") ? (
                    <Done className={clsx(this.props.classes.centerItem, this.props.classes.green)} />
                ) : (
                    <Clear color="error" className={this.props.classes.centerItem} />
                ),
        },
        {
            field: "school",
            headerName: "School",
            headerAlign: "center",
            flex: 1,
            renderCell: (params) =>
                params.row.permissions.isAllowed("school") ? (
                    <Done className={clsx(this.props.classes.centerItem, this.props.classes.green)} />
                ) : (
                    <Clear color="error" className={this.props.classes.centerItem} />
                ),
        },
        {
            field: "year",
            headerName: "Year",
            headerAlign: "center",
            flex: 1,
            renderCell: (params) =>
                params.row.permissions.isAllowed("year") ? (
                    <Done className={clsx(this.props.classes.centerItem, this.props.classes.green)} />
                ) : (
                    <Clear color="error" className={this.props.classes.centerItem} />
                ),
        },
        {
            field: "term",
            headerName: "Term",
            headerAlign: "center",
            flex: 1,
            renderCell: (params) =>
                params.row.permissions.isAllowed("term") ? (
                    <Done className={clsx(this.props.classes.centerItem, this.props.classes.green)} />
                ) : (
                    <Clear color="error" className={this.props.classes.centerItem} />
                ),
        },
        {
            field: "course",
            headerName: "Course",
            headerAlign: "center",
            flex: 1,
            renderCell: (params) =>
                params.row.permissions.isAllowed("course") ? (
                    <Done className={clsx(this.props.classes.centerItem, this.props.classes.green)} />
                ) : (
                    <Clear color="error" className={this.props.classes.centerItem} />
                ),
        },
        {
            field: "cbcs",
            headerName: "CBCS",
            headerAlign: "center",
            flex: 1,
            renderCell: (params) =>
                params.row.permissions.isAllowed("cbcs") ? (
                    <Done className={clsx(this.props.classes.centerItem, this.props.classes.green)} />
                ) : (
                    <Clear color="error" className={this.props.classes.centerItem} />
                ),
            valueFormatter: (params) => params.row.permissions.isAllowed("cbcs"),
        },
        {
            field: "actions",
            headerName: "Actions",
            headerAlign: "center",
            flex: 1,
            sortable: false,
            filterable: false,
            renderCell: (params) =>
                params.row.user.type !== "superuser" && (
                    <Tooltip title="Edit">
                        <IconButton
                            className={this.props.classes.centerItem}
                            color={"primary"}
                            onClick={() => this.onEdit(params)}
                        >
                            <Edit />
                        </IconButton>
                    </Tooltip>
                ),
        },
    ];

    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            deleteConfirmAlert: false,
            adminId: null,
        };
    }

    componentDidMount() {
        this.props.fetchAdmins();
    }

    closeModal = () => this.setState({ modalIsOpen: false, adminId: null });

    openModal = () => this.setState({ modalIsOpen: true, adminId: null });

    onEdit = (params) => this.setState({ modalIsOpen: true, adminId: params.row.id });

    render() {
        const { isLoading, admins } = this.props;
        const { modalIsOpen, adminId } = this.state;
        return (
            <DataPage
                title="List of Admins"
                isLoading={isLoading}
                modalIsOpen={modalIsOpen}
                openModal={this.openModal}
                PopupModal={<AdminModal isOpen={modalIsOpen} onClose={this.closeModal} adminId={adminId} />}
                objects={admins}
                columns={this.columns}
                disableCreate
            />
        );
    }
}

const mapStateToProps = (state) => ({
    admins: state.admin.admins,
    isLoading: state.admin.isLoading,
});

export default withStyles(styles)(connect(mapStateToProps, { fetchAdmins })(Admins));
