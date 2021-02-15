import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import clsx from "clsx";
import { IconButton, withStyles } from "@material-ui/core";
import { Clear, Done, Edit } from "@material-ui/icons";

import { FetchUsers } from "redux/user/action";
import UserModal from "./components/UserModal";
import DataPage from "components/DataPage";

const styles = (theme) => ({
    centerItem: theme.styles.centerItem,
    green: {
        color: theme.palette.success.main,
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
            field: "profile_picture",
            headerName: "Picture",
            headerAlign: "center",
            flex: 1.5,
            renderCell: (params) => (
                <img
                    className={this.props.classes.centerItem}
                    src={`${
                        params.value
                            ? `${process.env.REACT_APP_BACKEND_URL}/profile_pictures/${params.value}`
                            : "/logos/revamp_favicon.jpg"
                    }`}
                    width={100}
                    height={100}
                    alt="Nothing here"
                />
            ),
        },
        {
            field: "type",
            headerName: "Type",
            headerAlign: "center",
            align: "center",
            flex: 1.5,
        },
        {
            field: "is_active",
            headerName: "Active",
            headerAlign: "center",
            flex: 1.2,
            renderCell: (params) =>
                params.value ? (
                    <Done className={clsx(this.props.classes.centerItem, this.props.classes.green)} />
                ) : (
                    <Clear color="error" className={this.props.classes.centerItem} />
                ),
        },
        {
            field: "Edit",
            headerName: "Edit",
            headerAlign: "center",
            flex: 1,
            sortable: false,
            renderCell: (params) => (
                <IconButton
                    className={this.props.classes.centerItem}
                    color={"primary"}
                    onClick={() => this.onEdit(params)}
                >
                    <Edit />
                </IconButton>
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
        this.props.FetchUsers();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.users !== prevProps.users && this.props.users) {
            this.setState({ modalIsOpen: false });
        }
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

export default withRouter(withStyles(styles)(connect(mapStateToProps, { FetchUsers })(Users)));
