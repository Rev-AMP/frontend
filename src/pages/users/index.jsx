import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import clsx from "clsx";
import { DataGrid } from "@material-ui/data-grid";
import { Grid, Typography, withStyles, IconButton } from "@material-ui/core";
import { Edit, Done, Clear, AddCircle } from "@material-ui/icons";

import { FetchUsers } from "redux/user/action";
import UserModal from "./components/UserModal";
import Loader from "components/Loader";

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
                    src={`${params.value ? `${process.env.REACT_APP_BACKEND_URL}/profile_pictures/${params.value}` : "/logos/revamp_favicon.jpg"}`}
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
            isOpen: false,
        };
    }

    componentDidMount() {
        this.props.FetchUsers();
    }

    closeModal = () => {
        this.setState({ isOpen: false, userId: null });
    };

    openModal = () => {
        this.setState({ isOpen: true, userId: null });
    };

    onEdit = (params) => {
        this.setState({ isOpen: true, userId: params.row.id });
    };

    render() {
        if (this.props.isLoading && !this.state.isOpen) {
            return <Loader />;
        }

        if (this.props.users) {
            return (
                <Grid
                    item
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                    }}
                >
                    <Grid container direction="row" justify="space-between">
                        <Typography color="primary" variant="h2" style={{ margin: 0 }}>
                            List of Users
                        </Typography>
                        <IconButton color="primary" onClick={this.openModal} style={{ margin: "1rem" }}>
                            <AddCircle fontSize="large" />
                        </IconButton>
                    </Grid>

                    <div style={{ display: "flex", height: "100%" }}>
                        <div style={{ flexGrow: 1 }}>
                            <DataGrid
                                disableSelectionOnClick={true}
                                rows={this.props.users}
                                columns={this.columns}
                                rowHeight={120}
                            />
                        </div>
                    </div>

                    {this.state.isOpen && (
                        <UserModal isOpen={this.state.isOpen} onClose={this.closeModal} userId={this.state.userId} />
                    )}
                </Grid>
            );
        }

        return null;
    }
}

const mapStateToProps = (state) => ({
    users: state.user.users,
    isLoading: state.user.isLoading,
});

export default withRouter(withStyles(styles)(connect(mapStateToProps, { FetchUsers })(Users)));
