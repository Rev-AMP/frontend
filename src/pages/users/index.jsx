import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import clsx from "clsx";
import { IconButton, Typography, withStyles, Avatar } from "@material-ui/core";
import { Clear, Done, Edit } from "@material-ui/icons";

import { FetchUsers } from "redux/user/action";
import { FetchSchools } from "redux/school/action";
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
            hide: true,
        },
        {
            field: "school",
            headerName: "School",
            headerAlign: "center",
            align: "center",
            width: 350,
            renderCell: (params) => (
                <Typography variant="body2" style={{ width: "100%" }} color={params.value ? "textPrimary" : "error"}>
                    {params.value ?? "No associated school"}
                </Typography>
            ),
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
            field: "Edit",
            headerName: "Edit",
            headerAlign: "center",
            flex: 1,
            sortable: false,
            filterable: false,
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
            users: this.props.users,
        };
    }

    componentDidMount() {
        this.props.FetchUsers();
        this.props.FetchSchools();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let { users, schools } = this.props;
        if ((prevProps.schools !== schools || prevProps.users !== users) && schools.length && users.length) {
            for (let i = 0; i < users.length; i++) {
                const school = schools.find((school) => school.id === users[i].school);
                users[i].school = school ? school.name : undefined;
            }
            this.setState({ users });
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
                objects={this.state.users}
                columns={this.columns}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.user.users,
    isLoading: state.user.isLoading || state.school.isLoading,
    schools: state.school.schools,
});

export default withRouter(withStyles(styles)(connect(mapStateToProps, { FetchUsers, FetchSchools })(Users)));
