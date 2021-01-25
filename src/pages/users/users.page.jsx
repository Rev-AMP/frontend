import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { DataGrid } from '@material-ui/data-grid'
import { Grid } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { FetchUsers } from 'redux/user/action';
import UserModal from './components/UserModel.component';
import Button from 'components/Button/Button.component'

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
            align: 'center',
            width: 250,
            renderCell: (params) => (
                <img src={`${params.value ?? "/logos/revamp_favicon_transparent.png"}`} width={100} height={100} style={{ marginLeft: "auto", marginRight: "auto" }} alt="Nothing here" />
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
            field: "Edit",
            headerName: "Edit",
            headerAlign: 'center',
            flex: 1,
            renderCell: (params) => {
                return <Button color="secondary" onClick={() => this.onEdit(params)}><EditIcon /></Button>
            }
        },
        {
            field: "Delete",
            headerName: "Delete",
            headerAlign: 'center',
            flex: 1,
            renderCell: (params) => {
                return <Button color="secondary"><DeleteIcon /></Button>
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
        this.setState({ isOpen: false });
    }

    openModal = () => {
        this.setState({ isOpen: true });
    }

    onEdit = (params) => {
        this.setState({ isOpen: true, userId: params.row.id })
    }

    render() {
        if (this.props.isLoading && !this.state.isOpen) {
            return (
                <Grid container justify="center" alignContent="center">
                    <img src={process.env.PUBLIC_URL + "miscellaneous/loader.gif"} alt="loading" />
                </Grid>
            );
        }

        if (this.props.users) {
            return (

                <Grid item style={{ minHeight: "70vh" }}>
                    {
                        this.state.isOpen &&
                        <UserModal isOpen={this.state.isOpen} onClose={this.closeModal} userId={this.state.userId} />
                    }
                    <DataGrid autoPageSize={true} rows={this.props.users} columns={this.columns} rowHeight={120} />
                </Grid>

            )
        }
        return null;
    }
}

const mapStateToProps = (state) => ({
    users: state.user.users,
    isLoading: state.user.isLoading
});

export default withRouter(connect(mapStateToProps, { FetchUsers })(Users));