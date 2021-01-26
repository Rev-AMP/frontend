import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import clsx from "clsx";
import { DataGrid } from '@material-ui/data-grid'
import { Grid, Typography, withStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { FetchUsers } from 'redux/user/action';
import UserModal from './components/UserModal';
import Button from 'components/Button/Button.component'
import Loader from "components/Loader";

const styles = theme => ({
    centered: {
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    green: {
        color: theme.palette.success.main
    }
});

class Users extends React.Component {
    columns = [
        {
            field: 'id',
            headerName: 'ID',
            headerAlign: 'center',
            align: 'center',
            width: 70
        },
        {
            field: 'full_name',
            headerName: 'Full name',
            headerAlign: 'center',
            align: 'center',
            width: 400
        },
        {
            field: 'email',
            headerName: 'Email',
            headerAlign: 'center',
            align: 'center',
            width: 400
        },
        {
            field: 'profile_picture',
            headerName: 'Picture',
            headerAlign: 'center',
            width: 250,
            renderCell: (params) => (
                <img className={this.props.classes.centered} src={`${params.value ?? "/logos/revamp_favicon.jpg"}`} width={100} height={100} alt="Nothing here" />
            )
        },
        {
            field: 'type',
            headerName: 'Type',
            headerAlign: 'center',
            align: 'center',
            width: 250
        },
        {
            field: 'is_active',
            headerName: 'Active',
            headerAlign: 'center',
            width: 250,
            renderCell: (params) => (
                params.value ? <DoneIcon className={clsx(this.props.classes.centered, this.props.classes.green)} /> : <ClearIcon color="error" className={this.props.classes.centered} />
            )
        },
        {
            field: "Edit",
            headerName: "Edit",
            headerAlign: 'center',
            flex: 1,
            sortable: false,
            renderCell: (params) => {
                return <Button onClick={() => this.onEdit(params)}><EditIcon /></Button>
            }
        }
    ];

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    componentDidMount() {
        this.props.FetchUsers();
    }

    closeModal = () => {
        this.setState({ isOpen: false, userId: null });
    }

    openModal = () => {
        this.setState({ isOpen: true, userId: null });
    }

    onEdit = (params) => {
        this.setState({ isOpen: true, userId: params.row.id })
    }

    render() {
        if (this.props.isLoading && !this.state.isOpen) {
            return (
                <Loader />
            );
        }

        if (this.props.users) {
            return (
                <Grid item style={{ minHeight: "80vh" }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography color='primary'><h1>List of Users</h1></Typography>
                        <Button style={{ maxWidth: 0 }} onClick={this.openModal}><AddCircleIcon fontSize='large' /></Button>
                    </div>

                    <DataGrid disableSelectionOnClick={true} rows={this.props.users} columns={this.columns} rowHeight={120} />

                    {
                        this.state.isOpen &&
                        <UserModal isOpen={this.state.isOpen} onClose={this.closeModal} userId={this.state.userId} />
                    }
                </Grid>
            );
        }

        return null;
    }
}

const mapStateToProps = (state) => ({
    users: state.user.users,
    isLoading: state.user.isLoading
});

export default withRouter(
    withStyles(styles)(
        connect(mapStateToProps, { FetchUsers })(Users)
    )
);