import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import clsx from "clsx";
import { IconButton, withStyles, Avatar, Tooltip } from "@material-ui/core";
import { Clear, Done, Edit } from "@material-ui/icons";

import { fetchUsers } from "redux/user/action";
import { fetchSchools } from "redux/school/action";
import UserModal from "./components/UserModal";
import DataPage from "components/DataPage";

const styles = (theme) => ({
    centerItem: theme.styles.centerItem,
    green: {
        color: theme.palette.success.main,
    },
    avatar: {
        height: 55,
        width: 55,
        ...theme.styles.avatar,
    },
});

class Users extends React.Component {
    columns = [
        {
            field: "id",
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
            align: "center",
            width: 350,
        },
        {
            field: "email",
            headerName: "Email",
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
            hide: true,
        },
        {
            field: "profile_picture",
            headerName: "Profile Picture",
            headerAlign: "center",
            flex: 1,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Avatar
                    className={clsx(this.props.classes.centerItem, this.props.classes.avatar)}
                    src={params.value}
                    alt={(params.row.full_name ?? params.row.email).toUpperCase()}
                />
            ),
            hide: true,
        },
        {
            field: "type",
            headerName: "Type",
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "is_active",
            headerName: "Active",
            headerAlign: "center",
            flex: 1,
            renderCell: (params) =>
                params.value ? (
                    <Done className={clsx(this.props.classes.centerItem, this.props.classes.green)} />
                ) : (
                    <Clear color="error" className={this.props.classes.centerItem} />
                ),
        },
        {
            field: "actions",
            headerName: "Actions",
            headerAlign: "center",
            flex: 1,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
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
        };
    }

    componentDidMount() {
        this.props.fetchUsers();
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false, userId: null });
    };

    openModal = () => {
        this.setState({ modalIsOpen: true, userId: null });
    };

    onEdit = (params) => {
        this.setState({ modalIsOpen: true, userId: params.row.id });
    };

    render() {
        return (
            <DataPage
                title="List of Users"
                isLoading={this.props.isLoading}
                modalIsOpen={this.state.modalIsOpen}
                openModal={this.openModal}
                PopupModal={
                    <UserModal isOpen={this.state.modalIsOpen} onClose={this.closeModal} userId={this.state.userId} />
                }
                objects={this.props.users}
                columns={this.columns}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.user.users,
    isLoading: state.user.isLoading,
});

export default withRouter(withStyles(styles)(connect(mapStateToProps, { fetchUsers, fetchSchools })(Users)));
