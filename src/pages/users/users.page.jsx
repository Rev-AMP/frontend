import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { DataGrid } from '@material-ui/data-grid'
import { Grid } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import { FetchUsers } from 'redux/user/action';
import UserModal from './components/UserModel.component';
import Button from 'components/Button/Button.component'

class Users extends React.Component {


    columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'full_name', headerName: 'Full name', width: 250 },
        {
            field: 'email',
            headerName: 'Email',
            width: 300
        },
        {
            field: 'profile_picture',
            headerName: 'Profile',
            width: 120,
            renderCell: (params) => (
                <img src={`${params.value??"https://media.rev-amp.tech/logo/revamp_favicon_transparent.png"}`} width={100} height={100} alt="Nothing here" />
            )
        },
        {
            field: 'type',
            headerName: 'Type',
            width: 250,
            flex: 1.5
        },
        {
            field: "Edit",
            headerName:"Edit",
            renderCell: (params) => {

                return <Button color="secondary" onClick={() => this.onEdit(params)}><EditIcon/></Button>
            }
        }

    ];

    constructor(props) {
        super(props);
        this.state = {
            //TODO: Configure for Modal
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
        this.setState({isOpen:true});
    }

    onEdit= (params) => {
        this.setState({ isOpen: true, userId: params.row.id })
    }

    render() {
        if (this.props.users) {
            return (

                <Grid item style={{ minHeight: "70vh" }}>
                    {
                        this.state.isOpen &&
                        <UserModal isOpen={this.state.isOpen} onClose={this.closeModal} userId={this.state.userId} />
                    }
                    <DataGrid rows={this.props.users} columns={this.columns} rowHeight={120} />
                </Grid>

            )
        }
        return null;
    }
}

const mapStateToProps = (state) => ({
    users: state.user.users
});

export default withRouter(connect(mapStateToProps, { FetchUsers })(Users));